import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Car, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import SeatSelector from "../components/SeatSelector";
import { useCreateBooking } from "../hooks/useQueries";

const locations = [
  "Dehradun",
  "Haridwar",
  "Rishikesh",
  "Mussoorie",
  "Nainital",
  "Almora",
  "Ranikhet",
  "Lansdowne",
  "Tehri",
  "Uttarkashi",
  "Chamoli",
  "Bageshwar",
  "Pithoragarh",
  "Champawat",
  "Rudraprayag",
  "Pauri",
  "Kotdwar",
];

type RideType = "private" | "shared" | "bus";

const priceMap: Record<RideType, number> = {
  private: 2500,
  shared: 800,
  bus: 350,
};

export default function BookRidePage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [rideType, setRideType] = useState<RideType>("shared");
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [booked, setBooked] = useState(false);

  const { mutateAsync: createBooking, isPending } = useCreateBooking();

  const handleToggleSeat = (seat: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat],
    );
  };

  const estimatedPrice = priceMap[rideType] * Number(passengers);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to || !date) {
      toast.error("Please fill all required fields");
      return;
    }
    if (from === to) {
      toast.error("Pickup and drop-off locations must be different");
      return;
    }
    if (rideType !== "private" && selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }
    try {
      await createBooking({
        time: BigInt(Date.now() * 1000000),
        price: BigInt(estimatedPrice),
        bookingType: {
          __kind__: "ride",
          ride: {
            pickupLocation: { address: from, coordinates: [0, 0] },
            dropoffLocation: { address: to, coordinates: [0, 0] },
            passengers: BigInt(passengers),
          },
        },
      });
      setBooked(true);
      toast.success("Booking confirmed! Your ride has been booked.");
    } catch {
      toast.error("Booking failed. Please try again.");
    }
  };

  if (booked) {
    return (
      <div
        className="min-h-screen bg-muted flex items-center justify-center p-4"
        data-ocid="booking.success_state"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card rounded-2xl p-12 text-center shadow-card max-w-md w-full"
        >
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h2 className="font-montserrat font-black uppercase text-2xl text-foreground mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-muted-foreground mb-6">
            Your {rideType} ride from {from} to {to} has been booked
            successfully.
          </p>
          <div className="bg-muted rounded-xl p-4 mb-6 text-left">
            <p className="text-sm">
              <span className="font-bold">Route:</span> {from} → {to}
            </p>
            <p className="text-sm">
              <span className="font-bold">Date:</span> {date}
            </p>
            <p className="text-sm">
              <span className="font-bold">Passengers:</span> {passengers}
            </p>
            <p className="text-sm">
              <span className="font-bold">Ride type:</span> {rideType}
            </p>
            <p className="text-sm">
              <span className="font-bold">Estimated Price:</span> ₹
              {estimatedPrice}
            </p>
          </div>
          <Button
            onClick={() => {
              setBooked(false);
              setSelectedSeats([]);
              setFrom("");
              setTo("");
            }}
            className="w-full bg-primary text-primary-foreground rounded-full font-montserrat font-bold uppercase"
            data-ocid="booking.secondary_button"
          >
            Book Another Ride
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted py-12">
      <div className="container mx-auto px-4 max-w-4xl">
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

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="font-montserrat uppercase text-lg">
                    Journey Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="from">From *</Label>
                      <Select value={from} onValueChange={setFrom}>
                        <SelectTrigger id="from" data-ocid="ride.select">
                          <SelectValue placeholder="Pickup location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((loc) => (
                            <SelectItem key={loc} value={loc}>
                              {loc}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="to">To *</Label>
                      <Select value={to} onValueChange={setTo}>
                        <SelectTrigger id="to" data-ocid="ride.select">
                          <SelectValue placeholder="Drop-off location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((loc) => (
                            <SelectItem key={loc} value={loc}>
                              {loc}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="date">Travel Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        data-ocid="ride.input"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="passengers">Passengers</Label>
                      <Select value={passengers} onValueChange={setPassengers}>
                        <SelectTrigger id="passengers" data-ocid="ride.select">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {["1", "2", "3", "4", "5", "6"].map((n) => (
                            <SelectItem key={n} value={n}>
                              {n} passenger{n !== "1" ? "s" : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="font-montserrat uppercase text-lg">
                    Ride Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {(["private", "shared", "bus"] as RideType[]).map(
                      (type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            setRideType(type);
                            setSelectedSeats([]);
                          }}
                          className={`p-4 rounded-xl border-2 text-center transition-all ${
                            rideType === type
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border hover:border-primary/50"
                          }`}
                          data-ocid="ride.toggle"
                        >
                          <p className="font-montserrat font-bold uppercase text-sm capitalize">
                            {type}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            ₹{priceMap[type]}/person
                          </p>
                        </button>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>

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
            </div>

            <div className="lg:col-span-1">
              <Card className="shadow-card sticky top-20">
                <CardHeader>
                  <CardTitle className="font-montserrat uppercase text-lg">
                    Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">From</span>
                      <span className="font-medium">{from || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">To</span>
                      <span className="font-medium">{to || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">{date || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Passengers</span>
                      <span className="font-medium">{passengers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type</span>
                      <span className="font-medium capitalize">{rideType}</span>
                    </div>
                    {selectedSeats.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Seats</span>
                        <span className="font-medium">
                          {selectedSeats.join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-montserrat font-bold uppercase text-sm">
                        Estimated Total
                      </span>
                      <span className="font-montserrat font-black text-xl text-primary">
                        ₹{estimatedPrice}
                      </span>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-montserrat font-bold uppercase tracking-wider rounded-full"
                    data-ocid="ride.submit_button"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                        Booking...
                      </>
                    ) : (
                      "Confirm Booking"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
