import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  CalendarIcon,
  Car,
  CheckCircle2,
  ChevronLeft,
  CloudRain,
  Loader2,
  Mic,
  Minus,
  Moon,
  Mountain,
  Plus,
  Share2,
  ShieldCheck,
  Star,
  Sun,
  Wallet,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CityAutocomplete from "../components/CityAutocomplete";
import EmptyState from "../components/EmptyState";
import SeatSelector from "../components/SeatSelector";
import { useLanguage } from "../contexts/LanguageContext";
import { useHaptic } from "../hooks/useHaptic";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useCreateBooking } from "../hooks/useQueries";

type RideType = "private" | "shared" | "bus";
type WeatherMode = "normal" | "rain" | "night";
type BookingMode = "now" | "later";
type RideMode = "solo" | "pool";

const priceMap: Record<RideType, number> = {
  private: 2500,
  shared: 800,
  bus: 350,
};
const travelTimeMap: Record<RideType, string> = {
  private: "3-4 hrs",
  shared: "4-5 hrs",
  bus: "5-6 hrs",
};

const UPI_METHODS = [
  { id: "gpay", label: "GPay", color: "#34A853", abbr: "G" },
  { id: "phonepe", label: "PhonePe", color: "#5f259f", abbr: "P" },
  { id: "paytm", label: "Paytm", color: "#00BAF2", abbr: "\u20b9" },
];

export default function BookRidePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [passengers, setPassengers] = useState("1");
  const [rideType, setRideType] = useState<RideType>("shared");
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [booked, setBooked] = useState(false);
  const [bookingId, setBookingId] = useState<bigint | null>(null);
  const [weatherMode, setWeatherMode] = useState<WeatherMode>("normal");
  const [rideMode, setRideMode] = useState<RideMode>("solo");
  const [hillMode, setHillMode] = useState(false);
  const [luggage, setLuggage] = useState(0);
  const [bookingMode, setBookingMode] = useState<BookingMode>("now");
  const [scheduledDateTime, setScheduledDateTime] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [selectedUPI, setSelectedUPI] = useState("gpay");
  const [biometricOpen, setBiometricOpen] = useState(false);
  const [biometricProgress, setBiometricProgress] = useState(0);
  const [biometricDone, setBiometricDone] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [paymentTab, setPaymentTab] = useState<"upi" | "cash" | "wallet">(
    "upi",
  );
  const [voiceState, setVoiceState] = useState<
    "idle" | "listening" | "processing" | "result"
  >("idle");

  const { mutateAsync: createBooking, isPending } = useCreateBooking();
  const { tap, success } = useHaptic();
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const surgeMultiplier = weatherMode !== "normal" ? 1.2 : 1;
  const baseFare = priceMap[rideType];
  const surcharge = Math.round(baseFare * 0.15 * Number(passengers));
  const hillSurcharge = hillMode ? 200 : 0;
  const rawTotal =
    baseFare * Number(passengers) * surgeMultiplier + surcharge + hillSurcharge;
  const promoDiscount = promoApplied ? rawTotal * 0.2 : 0;
  const estimatedPrice = Math.round(rawTotal - promoDiscount);
  const poolFare =
    rideMode === "pool" ? Math.round(estimatedPrice / 2) : estimatedPrice;
  const finalFare = rideMode === "pool" ? poolFare : estimatedPrice;
  const sameLocation = from && to && from === to;
  const dateStr = date ? format(date, "dd MMM yyyy") : "";
  const passengerCount = Number(passengers);

  const handleToggleSeat = (seat: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat],
    );
  };

  const applyPromo = () => {
    tap();
    if (promoCode.toUpperCase() === "MOUNTAIN20") {
      setPromoApplied(true);
      toast.success("Promo code applied! 20% off");
    } else {
      toast.error("Invalid promo code");
    }
  };

  const handleVoiceBooking = () => {
    tap();
    setVoiceState("listening");
    setTimeout(() => setVoiceState("processing"), 3000);
    setTimeout(() => setVoiceState("result"), 5000);
    setTimeout(() => setVoiceState("idle"), 8000);
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!from) errors.from = "Please select pickup city";
    if (!to) errors.to = "Please select destination";
    if (!date) errors.date = "Please select a travel date";
    if (passengerCount < 1) errors.passengers = "At least 1 passenger required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (from === to) {
      toast.error("Pickup and destination must be different");
      return;
    }
    if (rideType !== "private" && selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }
    tap();
    setBiometricOpen(true);
    setBiometricProgress(0);
    setBiometricDone(false);
    let prog = 0;
    const interval = setInterval(() => {
      prog += 5;
      setBiometricProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        setBiometricDone(true);
        setTimeout(() => {
          setBiometricOpen(false);
          doBooking();
        }, 1000);
      }
    }, 100);
  };

  const doBooking = async () => {
    try {
      const id = await createBooking({
        time: BigInt(Date.now() * 1_000_000),
        price: BigInt(finalFare),
        bookingType: {
          __kind__: "ride",
          ride: {
            pickupLocation: { address: from, coordinates: [0, 0] },
            dropoffLocation: { address: to, coordinates: [0, 0] },
            passengers: BigInt(passengers),
          },
        },
      });
      const coins = Math.round(finalFare * 0.05);
      const prevCoins = Number(localStorage.getItem("pitthu-coins") || "0");
      localStorage.setItem("pitthu-coins", String(prevCoins + coins));
      setBookingId(id);
      setBooked(true);
      success();
      toast.success(
        `Booking confirmed! Earned ${coins} Pitthu Coins \uD83E\uDE99`,
      );
    } catch (err) {
      const msg = String(err);
      if (msg.includes("Unauthorized") || msg.includes("403")) {
        toast.error("Please log in to book your ride");
      } else {
        toast.error("Booking failed. Please try again.");
      }
    }
  };

  const downloadReceipt = () => {
    tap();
    const content = [
      "PITTHU - BOOKING RECEIPT",
      "========================",
      `Booking ID: #${String(bookingId).padStart(4, "0")}`,
      `Route: ${from} \u2192 ${to}`,
      `Date: ${dateStr}`,
      `Passengers: ${passengers}`,
      `Ride Type: ${rideType}`,
      "Driver: Ramesh Singh",
      "Vehicle: Tata Sumo Gold",
      "",
      `Base Fare: \u20B9${baseFare * passengerCount}`,
      `Mountain Surcharge: \u20B9${surcharge}`,
      hillMode ? `Hill Mode Surcharge: \u20B9${hillSurcharge}` : "",
      promoApplied
        ? `Promo Discount (20%): -\u20B9${Math.round(promoDiscount)}`
        : "",
      `TOTAL: \u20B9${finalFare}`,
      "",
      "Thank you for choosing PITTHU!",
      "pitthu.ai | Safe Travels across Uttarakhand",
    ]
      .filter(Boolean)
      .join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pitthu-receipt-${bookingId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Receipt downloaded!");
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-muted py-12"
        data-ocid="ride.loading_state"
      >
        <div className="container mx-auto px-4 max-w-4xl space-y-6">
          <Skeleton className="h-8 w-48" />
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-36 w-full rounded-xl" />
            </div>
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (booked) {
    return (
      <div
        className="min-h-screen bg-muted flex items-center justify-center p-4"
        data-ocid="booking.success_state"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card rounded-2xl p-10 text-center shadow-card max-w-md w-full"
        >
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h2 className="font-montserrat font-black uppercase text-2xl text-foreground mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-muted-foreground mb-6">
            Your {rideType} ride from {from} to {to} is booked.
          </p>
          <div className="bg-muted rounded-xl p-4 mb-4 text-left text-sm space-y-1">
            <p>
              <span className="font-bold">Route:</span> {from} \u2192 {to}
            </p>
            <p>
              <span className="font-bold">Date:</span> {dateStr}
            </p>
            <p>
              <span className="font-bold">Passengers:</span> {passengers}
            </p>
            <p>
              <span className="font-bold">Driver:</span> Ramesh Singh \u2605 4.8
            </p>
            <p>
              <span className="font-bold">Total:</span> \u20B9{finalFare}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              onClick={downloadReceipt}
              variant="outline"
              className="w-full font-montserrat font-bold uppercase rounded-full"
              data-ocid="booking.secondary_button"
            >
              Download Receipt
            </Button>
            <Button
              onClick={() => {
                setBooked(false);
                setSelectedSeats([]);
                setFrom("");
                setTo("");
                setPromoApplied(false);
              }}
              className="w-full bg-primary text-primary-foreground rounded-full font-montserrat font-bold uppercase"
              data-ocid="booking.primary_button"
            >
              Book Another Ride
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 font-montserrat text-sm uppercase"
          data-ocid="ride.secondary_button"
        >
          <ChevronLeft className="w-4 h-4" /> {t("back")}
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Car className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-primary font-montserrat font-bold uppercase tracking-[0.2em] text-xs">
                PITTHU
              </p>
              <h1 className="font-montserrat font-black uppercase text-2xl text-foreground">
                Ride Booking
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground">
            Book a private car, shared cab, or bus across Uttarakhand
          </p>
        </motion.div>

        {sameLocation ? (
          <EmptyState show={true} from={from} to={to} type="ride" />
        ) : (
          <form onSubmit={handleBookNow}>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Journey Details */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="font-montserrat uppercase text-lg">
                      Journey Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label>{t("from")} *</Label>
                        <CityAutocomplete
                          value={from}
                          onChange={setFrom}
                          placeholder="Pickup location"
                          id="from"
                        />
                        {formErrors.from && (
                          <p
                            className="text-xs text-destructive"
                            data-ocid="ride.error_state"
                          >
                            {formErrors.from}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Label>{t("to")} *</Label>
                        <CityAutocomplete
                          value={to}
                          onChange={setTo}
                          placeholder="Drop-off location"
                          id="to"
                        />
                        {formErrors.to && (
                          <p
                            className="text-xs text-destructive"
                            data-ocid="ride.error_state"
                          >
                            {formErrors.to}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label>{t("date")} *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              data-ocid="ride.input"
                              className={cn(
                                "flex items-center gap-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-left",
                                !date && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="w-4 h-4" />
                              {date
                                ? format(date, "dd MMM yyyy")
                                : "Pick a date"}
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              disabled={(d) =>
                                d < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        {formErrors.date && (
                          <p
                            className="text-xs text-destructive"
                            data-ocid="ride.error_state"
                          >
                            {formErrors.date}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Label>{t("passengers")}</Label>
                        <Select
                          value={passengers}
                          onValueChange={setPassengers}
                        >
                          <SelectTrigger data-ocid="ride.select">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "1",
                              "2",
                              "3",
                              "4",
                              "5",
                              "6",
                              "7",
                              "8",
                              "9",
                              "10",
                              "11",
                              "12",
                            ].map((n) => (
                              <SelectItem key={n} value={n}>
                                {n} passenger{n !== "1" ? "s" : ""}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {passengerCount > 6 && (
                          <div className="flex gap-2 flex-wrap">
                            <Badge className="bg-purple-100 text-purple-700">
                              Group Booking
                            </Badge>
                            {passengerCount === 12 && (
                              <Badge className="bg-blue-100 text-blue-700">
                                Tempo Traveler - 12 Seats
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Voice Booking */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20">
                      <button
                        type="button"
                        onClick={handleVoiceBooking}
                        className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${voiceState !== "idle" ? "bg-red-500 text-white" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
                        data-ocid="ride.button"
                        aria-label="Voice booking"
                      >
                        <Mic className="w-5 h-5" />
                        {voiceState === "listening" && (
                          <span className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        {voiceState === "idle" && (
                          <div>
                            <p className="font-montserrat font-bold text-sm text-foreground">
                              Voice Booking
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Tap to book by voice
                            </p>
                          </div>
                        )}
                        {voiceState === "listening" && (
                          <div>
                            <p className="font-montserrat font-bold text-sm text-red-600 animate-pulse">
                              Listening...
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Say pickup and drop location
                            </p>
                          </div>
                        )}
                        {voiceState === "processing" && (
                          <div>
                            <p className="font-montserrat font-bold text-sm text-primary">
                              Processing...
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Recognising speech
                            </p>
                          </div>
                        )}
                        {voiceState === "result" && (
                          <div>
                            <p className="font-montserrat font-bold text-xs text-emerald-600">
                              ✓ Heard: Rishikesh to Badrinath
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Locations auto-filled
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Booking Mode */}
                    <div className="space-y-2">
                      <Label>Booking Time</Label>
                      <div className="flex gap-2">
                        {(["now", "later"] as BookingMode[]).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => {
                              tap();
                              setBookingMode(m);
                            }}
                            className={`px-4 py-2 rounded-full text-sm font-montserrat font-bold uppercase border-2 transition-all ${
                              bookingMode === m
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border text-muted-foreground"
                            }`}
                            data-ocid="ride.toggle"
                          >
                            {m === "now" ? "Book Now" : "Schedule for Later"}
                          </button>
                        ))}
                      </div>
                      {bookingMode === "later" && (
                        <Input
                          type="datetime-local"
                          value={scheduledDateTime}
                          onChange={(e) => setScheduledDateTime(e.target.value)}
                          min={new Date().toISOString().slice(0, 16)}
                          data-ocid="ride.input"
                          className="mt-2"
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Ride Type */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="font-montserrat uppercase text-lg">
                      Ride Type & Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {[
                        {
                          type: "private" as RideType,
                          emoji: "🚗",
                          label: "Private Car",
                          eta: "~8 min",
                        },
                        {
                          type: "shared" as RideType,
                          emoji: "🚙",
                          label: "Shared Cab",
                          eta: "~5 min",
                        },
                        {
                          type: "bus" as RideType,
                          emoji: "🚌",
                          label: "Bus",
                          eta: "~12 min",
                        },
                      ].map((v) => (
                        <button
                          key={v.type}
                          type="button"
                          onClick={() => {
                            tap();
                            setRideType(v.type);
                            setSelectedSeats([]);
                          }}
                          className={`flex-shrink-0 w-32 p-4 rounded-2xl border-2 text-center transition-all hover:-translate-y-0.5 ${
                            rideType === v.type
                              ? "border-primary bg-primary/8 shadow-glass"
                              : "border-border bg-card hover:border-primary/50"
                          }`}
                          data-ocid="ride.toggle"
                        >
                          <div className="text-4xl mb-2">{v.emoji}</div>
                          <p className="font-montserrat font-bold uppercase text-xs text-foreground">
                            {v.label}
                          </p>
                          <p className="text-xs text-primary font-semibold mt-1">
                            ₹{priceMap[v.type]}/person
                          </p>
                          <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                            {v.eta}
                          </span>
                          {rideType === v.type && (
                            <div className="mt-2 w-4 h-4 rounded-full bg-primary mx-auto flex items-center justify-center">
                              <span className="text-white text-[8px] font-black">
                                ✓
                              </span>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Solo / Pool */}
                    <div className="flex gap-2">
                      {(["solo", "pool"] as RideMode[]).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => {
                            tap();
                            setRideMode(m);
                          }}
                          className={`px-4 py-2 rounded-full text-sm font-montserrat font-bold uppercase border-2 transition-all capitalize ${
                            rideMode === m
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border text-muted-foreground"
                          }`}
                          data-ocid="ride.toggle"
                        >
                          {m === "pool" ? "Pool (Split fare)" : "Solo"}
                        </button>
                      ))}
                    </div>
                    {rideMode === "pool" && (
                      <p className="text-sm text-muted-foreground">
                        Sharing with 1 other • fare split in half
                      </p>
                    )}

                    {/* Weather / Surge */}
                    <div className="space-y-2">
                      <Label>Conditions</Label>
                      <div className="flex gap-2 flex-wrap">
                        {(["normal", "rain", "night"] as WeatherMode[]).map(
                          (w) => (
                            <button
                              key={w}
                              type="button"
                              onClick={() => {
                                tap();
                                setWeatherMode(w);
                              }}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border-2 font-medium transition-all ${
                                weatherMode === w
                                  ? w === "normal"
                                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20"
                                    : "border-red-400 bg-red-50 text-red-600 dark:bg-red-900/20"
                                  : "border-border text-muted-foreground"
                              }`}
                              data-ocid="ride.toggle"
                            >
                              {w === "normal" && (
                                <Sun className="w-3.5 h-3.5" />
                              )}
                              {w === "rain" && (
                                <CloudRain className="w-3.5 h-3.5" />
                              )}
                              {w === "night" && (
                                <Moon className="w-3.5 h-3.5" />
                              )}
                              <span className="capitalize">{w}</span>
                            </button>
                          ),
                        )}
                      </div>
                      {weatherMode !== "normal" && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <Badge className="bg-red-100 text-red-700 border-red-200">
                            1.2x Surge Pricing Active
                          </Badge>
                        </motion.div>
                      )}
                    </div>

                    {/* Hill Mode */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200">
                      <Checkbox
                        id="hill-mode"
                        checked={hillMode}
                        onCheckedChange={(c) => {
                          tap();
                          setHillMode(c === true);
                        }}
                        data-ocid="ride.checkbox"
                      />
                      <div>
                        <Label
                          htmlFor="hill-mode"
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Mountain className="w-4 h-4 text-amber-600" />
                          Hill Mode — Experienced Mountain Drivers Only
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          +\u20B9200 for specialized mountain routes
                        </p>
                      </div>
                      {hillMode && (
                        <Badge className="ml-auto bg-amber-100 text-amber-700">
                          Active
                        </Badge>
                      )}
                    </div>

                    {/* Luggage Counter */}
                    <div className="space-y-2">
                      <Label>Bags / Luggage</Label>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            tap();
                            setLuggage((l) => Math.max(0, l - 1));
                          }}
                          className="w-9 h-9 rounded-full border-2 border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                          data-ocid="ride.button"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-montserrat font-black text-2xl text-foreground w-8 text-center">
                          {luggage}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            tap();
                            setLuggage((l) => Math.min(10, l + 1));
                          }}
                          className="w-9 h-9 rounded-full border-2 border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                          data-ocid="ride.button"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <span className="text-sm text-muted-foreground">
                          bags
                        </span>
                      </div>
                      {luggage >= 3 && (
                        <p className="text-xs text-amber-600 font-medium">
                          \uD83D\uDCBC Recommended: Tempo Traveler or SUV for{" "}
                          {luggage}+ bags
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Seat Selector */}
                {rideType !== "private" && (
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="font-montserrat uppercase text-lg">
                        Select Seats
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SeatSelector
                        rideType={rideType}
                        selectedSeats={selectedSeats}
                        onToggleSeat={handleToggleSeat}
                      />
                    </CardContent>
                  </Card>
                )}

                {/* Driver Card */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="font-montserrat uppercase text-lg">
                      Your Driver
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-montserrat font-black text-xl flex-shrink-0">
                        RS
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-montserrat font-bold text-foreground">
                            Ramesh Singh
                          </h3>
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                            <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                          </Badge>
                        </div>
                        <div className="flex items-center gap-0.5 mt-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={cn(
                                "w-3.5 h-3.5",
                                s <= 4
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-yellow-400/40",
                              )}
                            />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">
                            4.8
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Tata Sumo Gold · UP07-AB-1234
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Booking Summary */}
              <div className="lg:col-span-1">
                <Card className="shadow-card sticky top-20">
                  <CardHeader>
                    <CardTitle className="font-montserrat uppercase text-lg">
                      Booking Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {t("from")}
                        </span>
                        <span className="font-medium">{from || "\u2014"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("to")}</span>
                        <span className="font-medium">{to || "\u2014"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {t("date")}
                        </span>
                        <span className="font-medium">
                          {dateStr || "\u2014"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {t("passengers")}
                        </span>
                        <span className="font-medium">{passengers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type</span>
                        <span className="font-medium capitalize">
                          {rideType}
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-border pt-3 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Base fare</span>
                        <span>
                          \u20B9
                          {Math.round(
                            baseFare * passengerCount * surgeMultiplier,
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Mountain surcharge (15%)
                        </span>
                        <span>\u20B9{surcharge}</span>
                      </div>
                      {hillMode && (
                        <div className="flex justify-between text-amber-600">
                          <span>Hill Mode</span>
                          <span>+\u20B9{hillSurcharge}</span>
                        </div>
                      )}
                      {weatherMode !== "normal" && (
                        <div className="flex justify-between text-red-500">
                          <span>Surge (1.2x)</span>
                          <span>\u26A0</span>
                        </div>
                      )}
                      {promoApplied && (
                        <div className="flex justify-between text-emerald-600">
                          <span>Promo (20%)</span>
                          <span>-\u20B9{Math.round(promoDiscount)}</span>
                        </div>
                      )}
                      {rideMode === "pool" && (
                        <div className="flex justify-between text-primary">
                          <span>Pool split</span>
                          <span>\u00F72</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Est. travel
                        </span>
                        <span>{travelTimeMap[rideType]}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-border">
                        <span className="font-montserrat font-bold uppercase text-sm">
                          {t("total")}
                        </span>
                        <motion.span
                          key={finalFare}
                          initial={{ scale: 1.2, color: "#ef4444" }}
                          animate={{ scale: 1, color: "inherit" }}
                          className="font-montserrat font-black text-xl text-primary"
                        >
                          \u20B9{finalFare}
                        </motion.span>
                      </div>
                    </div>

                    {/* Promo */}
                    <div className="space-y-1">
                      <Label className="text-xs">Promo Code</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="MOUNTAIN20"
                          value={promoCode}
                          onChange={(e) =>
                            setPromoCode(e.target.value.toUpperCase())
                          }
                          disabled={promoApplied}
                          className="uppercase text-sm h-8"
                          data-ocid="ride.input"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={applyPromo}
                          disabled={promoApplied || !promoCode}
                          className="h-8 px-3 text-xs font-montserrat font-bold uppercase"
                          data-ocid="ride.button"
                        >
                          Apply
                        </Button>
                      </div>
                      {promoApplied && (
                        <p className="text-xs text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> 20% off applied!
                        </p>
                      )}
                    </div>

                    {/* Payment Method — Tabs */}
                    <div className="space-y-2">
                      <Label className="text-xs">Payment Method</Label>
                      <div className="flex gap-1 bg-muted rounded-xl p-1">
                        {(["upi", "cash", "wallet"] as const).map((tab) => (
                          <button
                            key={tab}
                            type="button"
                            onClick={() => {
                              tap();
                              setPaymentTab(tab);
                            }}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-montserrat font-bold uppercase transition-all ${paymentTab === tab ? "bg-card shadow-xs text-foreground" : "text-muted-foreground"}`}
                            data-ocid="ride.toggle"
                          >
                            {tab === "upi"
                              ? "UPI"
                              : tab === "cash"
                                ? "Cash"
                                : "Wallet"}
                          </button>
                        ))}
                      </div>
                      {paymentTab === "upi" && (
                        <div className="flex gap-2">
                          {UPI_METHODS.map((upi) => (
                            <button
                              key={upi.id}
                              type="button"
                              onClick={() => {
                                tap();
                                setSelectedUPI(upi.id);
                              }}
                              className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all ${selectedUPI === upi.id ? "border-primary" : "border-border"}`}
                              data-ocid="ride.button"
                            >
                              <div
                                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                style={{ backgroundColor: upi.color }}
                              >
                                {upi.abbr}
                              </div>
                              <span className="text-[10px] text-muted-foreground">
                                {upi.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                      {paymentTab === "cash" && (
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
                          <span className="text-2xl">💵</span>
                          <p className="text-sm font-medium">
                            Pay ₹{finalFare} in cash to driver on arrival
                          </p>
                        </div>
                      )}
                      {paymentTab === "wallet" && (
                        <div className="flex items-center justify-between p-3 rounded-xl bg-primary/8 border border-primary/20">
                          <div className="flex items-center gap-2">
                            <Wallet className="w-5 h-5 text-primary" />
                            <div>
                              <p className="text-sm font-bold text-foreground">
                                Pitthu Wallet
                              </p>
                              <p className="text-xs text-emerald-600 font-medium">
                                Balance: ₹850
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="text-xs font-montserrat font-bold text-primary uppercase border border-primary rounded-full px-3 py-1 hover:bg-primary/10 transition-colors"
                            onClick={() => {
                              tap();
                              toast.success("Wallet balance applied!");
                            }}
                            data-ocid="ride.button"
                          >
                            Use Balance
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Safety Bar */}
                    <div className="rounded-xl border border-border p-3 bg-muted/50">
                      <p className="text-xs font-montserrat font-bold uppercase text-muted-foreground mb-2">
                        🛡️ Safety Features
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            tap();
                            toast.error(
                              "Emergency services alerted! Stay safe.",
                            );
                          }}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-montserrat font-bold uppercase rounded-lg py-2 transition-colors"
                          data-ocid="ride.button"
                        >
                          🆘 SOS
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            tap();
                            const link = `https://pitthu.ai/track/${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
                            navigator.clipboard
                              .writeText(link)
                              .then(() => toast.success("Trip link copied!"))
                              .catch(() => toast.info(`Link: ${link}`));
                          }}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-card hover:bg-muted border border-border text-foreground text-xs font-montserrat font-bold uppercase rounded-lg py-2 transition-colors"
                          data-ocid="ride.secondary_button"
                        >
                          <Share2 className="w-3 h-3" /> Share Trip
                        </button>
                        <div className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-lg py-2">
                          👤 Verified
                        </div>
                      </div>
                    </div>

                    {!identity ? (
                      <div
                        className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-center space-y-3"
                        data-ocid="ride.login_state"
                      >
                        <p className="text-amber-800 font-medium">
                          Login required to book
                        </p>
                        <p className="text-amber-600 text-sm">
                          Securely login with Internet Identity to confirm your
                          booking
                        </p>
                        <Button
                          onClick={login}
                          disabled={isLoggingIn}
                          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-montserrat font-bold uppercase tracking-wider rounded-full"
                          data-ocid="ride.primary_button"
                        >
                          {isLoggingIn ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : null}
                          Login with Internet Identity
                        </Button>
                      </div>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isPending}
                        onClick={() => tap()}
                        className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-montserrat font-bold uppercase tracking-wider rounded-full"
                        data-ocid="ride.submit_button"
                      >
                        {isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                            Booking...
                          </>
                        ) : (
                          t("confirmBooking")
                        )}
                      </Button>
                    )}
                    <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
                      <ShieldCheck className="w-4 h-4" />
                      Safety Verified Driver &amp; Insured Ride
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Biometric Modal */}
      <Dialog open={biometricOpen} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-sm" data-ocid="ride.modal">
          <DialogHeader>
            <DialogTitle className="font-montserrat uppercase text-center">
              Secure Payment
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-6 gap-4">
            <motion.div
              animate={biometricDone ? { scale: [1, 1.2, 1] } : { rotate: 360 }}
              transition={
                biometricDone
                  ? { duration: 0.4 }
                  : {
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                      ease: "linear",
                    }
              }
              className={`w-20 h-20 rounded-full flex items-center justify-center border-4 ${
                biometricDone
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-primary bg-primary/10"
              }`}
            >
              {biometricDone ? (
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              ) : (
                <span className="text-3xl">{"\uD83E\uDD37"}</span>
              )}
            </motion.div>
            <p className="font-montserrat font-bold text-foreground text-center">
              {biometricDone
                ? "Authentication Successful \u2713"
                : "Authenticating with Face ID..."}
            </p>
            <Progress value={biometricProgress} className="w-full" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
