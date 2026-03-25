import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Loader2,
  Package,
  Shield,
  Video,
  Weight,
  Wind,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import CityAutocomplete from "../components/CityAutocomplete";
import { useLanguage } from "../contexts/LanguageContext";
import { useHaptic } from "../hooks/useHaptic";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useCreateBooking } from "../hooks/useQueries";

type DroneType = "fast" | "heavy";

const PRICE_PER_KG = 150;
const BASE_PRICE = 500;

export default function DroneDeliveryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [pickup, setPickup] = useState("");
  const [delivery, setDelivery] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState(1);
  const [droneType, setDroneType] = useState<DroneType>("fast");
  const [insurance, setInsurance] = useState(false);
  const [landingPhoto, setLandingPhoto] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [booked, setBooked] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanDone, setScanDone] = useState(false);
  const [altitude, setAltitude] = useState(0);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [activeTab, setActiveTab] = useState("standard");
  const [trekName, setTrekName] = useState("");
  const [trekDate, setTrekDate] = useState("");
  const [trekSupply, setTrekSupply] = useState("water");
  const [villagePickup, setVillagePickup] = useState("Munsiari");
  const [sampleType, setSampleType] = useState("blood");
  const [labDest, setLabDest] = useState("Dehradun");
  const [aartiTemple, setAartiTemple] = useState("Kedarnath");
  const [aartiDate, setAartiDate] = useState("");
  const [coldChainTemp, setColdChainTemp] = useState(4.2);
  const [bazaarOrders, setBazaarOrders] = useState<string[]>([]);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const windSpeed = useRef(Math.floor(Math.random() * 21) + 8);
  const isWindyDangerous = windSpeed.current > 20;
  const batteryLevel = useRef(Math.floor(Math.random() * 40) + 60);

  const { mutateAsync: createBooking, isPending } = useCreateBooking();
  const { tap, success } = useHaptic();
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setColdChainTemp((prev) => {
        const delta = (Math.random() - 0.5) * 0.3;
        return Math.min(8, Math.max(2, +(prev + delta).toFixed(1)));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  const heavyLiftSurcharge = droneType === "heavy" ? 500 : 0;
  const rawTotal = BASE_PRICE + weight * PRICE_PER_KG + heavyLiftSurcharge;
  const insuranceFee = insurance ? Math.round(rawTotal * 0.01) : 0;
  const promoDiscount = promoApplied ? rawTotal * 0.2 : 0;
  const estimatedPrice = Math.round(rawTotal + insuranceFee - promoDiscount);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setLandingPhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
    toast.success("Landing zone photo uploaded!");
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

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!pickup) errors.pickup = "Pickup location required";
    if (!delivery) errors.delivery = "Delivery location required";
    if (!description) errors.description = "Package description required";
    if (weight <= 0) errors.weight = "Weight must be greater than 0";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (pickup === delivery) {
      toast.error("Pickup and delivery must be different");
      return;
    }
    if (isWindyDangerous) {
      toast.error("Too windy for drone operations");
      return;
    }
    tap();
    setScanning(true);
    setScanProgress(0);
    setScanDone(false);
    let prog = 0;
    const interval = setInterval(() => {
      prog += 2;
      setScanProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        setScanDone(true);
        setTimeout(() => {
          setScanning(false);
          doBooking();
        }, 1200);
      }
    }, 60);
  };

  const doBooking = async () => {
    try {
      await createBooking({
        time: BigInt(Date.now() * 1_000_000),
        price: BigInt(estimatedPrice),
        bookingType: {
          __kind__: "drone",
          drone: {
            pickupLocation: { address: pickup, coordinates: [0, 0] },
            dropoffLocation: { address: delivery, coordinates: [0, 0] },
            packageDescription: description,
            packageWeight: weight,
          },
        },
      });
      const coins = Math.round(estimatedPrice * 0.05);
      const prevCoins = Number(localStorage.getItem("pitthu-coins") || "0");
      localStorage.setItem("pitthu-coins", String(prevCoins + coins));
      setBooked(true);
      setAltitude(120);
      success();
      toast.success(
        `Drone delivery booked! Earned ${coins} Pitthu Coins \uD83E\uDE99`,
      );
    } catch (err) {
      const msg = String(err);
      if (msg.includes("Unauthorized") || msg.includes("403")) {
        toast.error("Please log in to book your delivery");
      } else {
        toast.error("Booking failed. Please try again.");
      }
    }
  };

  const batteryColor =
    batteryLevel.current > 50
      ? "text-emerald-500"
      : batteryLevel.current > 20
        ? "text-yellow-500"
        : "text-red-500";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted" data-ocid="drone.loading_state">
        <div className="container mx-auto px-4 py-12 max-w-4xl space-y-6">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-36 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (booked) {
    return (
      <div
        className="min-h-screen bg-muted flex items-center justify-center p-4"
        data-ocid="drone.success_state"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card rounded-2xl p-12 text-center shadow-card max-w-md w-full"
        >
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h2 className="font-montserrat font-black uppercase text-2xl text-foreground mb-2">
            Delivery Booked!
          </h2>
          <p className="text-muted-foreground mb-6">
            Your drone delivery from {pickup} to {delivery} is scheduled.
          </p>
          {/* Altitude display */}
          <div className="flex items-center gap-4 mb-6 justify-center">
            <div className="text-left">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Altitude
              </p>
              <div className="flex items-end gap-1">
                <div className="relative w-6 h-24 bg-muted rounded-full overflow-hidden border border-border">
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-full"
                    initial={{ height: "0%" }}
                    animate={{ height: `${(altitude / 500) * 100}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
                <span className="font-montserrat font-bold text-sm text-foreground">
                  {altitude}m
                </span>
              </div>
            </div>
            <div className="text-sm text-left space-y-1">
              <p>
                <span className="font-bold">From:</span> {pickup}
              </p>
              <p>
                <span className="font-bold">To:</span> {delivery}
              </p>
              <p>
                <span className="font-bold">Weight:</span> {weight.toFixed(1)}{" "}
                kg
              </p>
              <p>
                <span className="font-bold">Total:</span> \u20B9{estimatedPrice}
              </p>
            </div>
          </div>
          <Button
            onClick={() => {
              setBooked(false);
              setPickup("");
              setDelivery("");
              setDescription("");
              setWeight(1);
              setPromoApplied(false);
              setAltitude(0);
            }}
            className="w-full text-white font-montserrat font-bold uppercase rounded-full"
            style={{ backgroundColor: "#0066FF" }}
            data-ocid="drone.secondary_button"
          >
            Book Another Delivery
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="relative bg-brand-blue-dark py-16 overflow-hidden">
        <img
          src="/assets/generated/drone-real-delivery.dim_600x400.jpg"
          alt="Drone"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative container mx-auto px-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-white/70 hover:text-white mb-6 font-montserrat text-sm uppercase"
            data-ocid="drone.secondary_button"
          >
            <ChevronLeft className="w-4 h-4" /> {t("back")}
          </button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#0066FF" }}
              >
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <p
                  className="font-montserrat font-bold uppercase tracking-[0.2em] text-xs"
                  style={{ color: "#4d94ff" }}
                >
                  PITTHU
                </p>
                <h1 className="font-montserrat font-black uppercase text-3xl text-white">
                  Drone Delivery
                </h1>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-white/80 text-sm">
              {[
                { icon: Zap, label: "2-4 Hour Delivery" },
                { icon: Shield, label: "Insured Packages" },
                { icon: Clock, label: "24/7 Service" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4" style={{ color: "#4d94ff" }} />{" "}
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Delivery Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {[
              { id: "standard", label: "📦 Standard" },
              { id: "trek", label: "🥾 Follow Trek" },
              { id: "reverse", label: "🔬 Reverse" },
              { id: "aarti", label: "🕉️ Aarti Live" },
              { id: "tracking", label: "📡 Live Track" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-montserrat font-bold uppercase transition-all ${activeTab === tab.id ? "text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                style={
                  activeTab === tab.id ? { backgroundColor: "#0066FF" } : {}
                }
                data-ocid={`drone.${tab.id}.tab`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "standard" && (
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Drone Type */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="font-montserrat uppercase text-lg">
                      Drone Type
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    {[
                      {
                        id: "fast" as DroneType,
                        label: "Fast Delivery",
                        icon: Zap,
                        desc: "Up to 2kg, speed optimized",
                        extra: "+\u20B90",
                      },
                      {
                        id: "heavy" as DroneType,
                        label: "Heavy Lift",
                        icon: Weight,
                        desc: "Up to 5kg, cargo specialist",
                        extra: "+\u20B9500",
                      },
                    ].map((dt) => (
                      <button
                        key={dt.id}
                        type="button"
                        onClick={() => {
                          tap();
                          setDroneType(dt.id);
                        }}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          droneType === dt.id
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-border hover:border-blue-400"
                        }`}
                        data-ocid="drone.toggle"
                      >
                        <dt.icon
                          className={`w-6 h-6 mb-2 ${droneType === dt.id ? "text-blue-600" : "text-muted-foreground"}`}
                        />
                        <p className="font-montserrat font-bold text-sm text-foreground">
                          {dt.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {dt.desc}
                        </p>
                        <p
                          className="text-xs font-bold mt-1"
                          style={{ color: "#0066FF" }}
                        >
                          {dt.extra}
                        </p>
                      </button>
                    ))}
                  </CardContent>
                </Card>

                {/* Status Widgets */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Weather */}
                  <Card
                    className={`shadow-card ${isWindyDangerous ? "border-red-400" : "border-emerald-400"}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Wind
                          className={`w-5 h-5 ${isWindyDangerous ? "text-red-500" : "text-emerald-500"}`}
                        />
                        <span className="font-montserrat font-bold text-sm">
                          Wind Speed
                        </span>
                      </div>
                      <p
                        className={`font-montserrat font-black text-2xl ${isWindyDangerous ? "text-red-500" : "text-emerald-500"}`}
                      >
                        {windSpeed.current} km/h
                      </p>
                      {isWindyDangerous ? (
                        <Badge
                          className="bg-red-100 text-red-700 mt-1 text-xs"
                          data-ocid="drone.error_state"
                        >
                          <AlertTriangle className="w-3 h-3 mr-1" /> Too Windy
                        </Badge>
                      ) : (
                        <Badge
                          className="bg-emerald-100 text-emerald-700 mt-1 text-xs"
                          data-ocid="drone.success_state"
                        >
                          \u2713 Safe to Fly
                        </Badge>
                      )}
                    </CardContent>
                  </Card>

                  {/* Battery */}
                  <Card className="shadow-card">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className={`w-5 h-5 ${batteryColor}`} />
                        <span className="font-montserrat font-bold text-sm">
                          Drone Battery
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12">
                          <svg
                            viewBox="0 0 36 36"
                            className="w-full h-full -rotate-90"
                            role="img"
                            aria-label="Battery gauge"
                          >
                            <circle
                              cx="18"
                              cy="18"
                              r="15.9"
                              fill="none"
                              stroke="currentColor"
                              className="text-muted"
                              strokeWidth="3"
                            />
                            <circle
                              cx="18"
                              cy="18"
                              r="15.9"
                              fill="none"
                              stroke="currentColor"
                              className={batteryColor}
                              strokeWidth="3"
                              strokeDasharray={`${batteryLevel.current} 100`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <span
                            className={`absolute inset-0 flex items-center justify-center text-[10px] font-bold ${batteryColor}`}
                          >
                            {batteryLevel.current}%
                          </span>
                        </div>
                        <div>
                          <p
                            className={`font-montserrat font-black text-lg ${batteryColor}`}
                          >
                            {batteryLevel.current}%
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Charged
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Delivery Details */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="font-montserrat uppercase text-lg">
                      Delivery Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label>Pickup Location *</Label>
                        <CityAutocomplete
                          id="pickup"
                          value={pickup}
                          onChange={setPickup}
                          placeholder="Select pickup"
                        />
                        {formErrors.pickup && (
                          <p className="text-xs text-destructive">
                            {formErrors.pickup}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Label>Delivery Location *</Label>
                        <CityAutocomplete
                          id="deliveryLoc"
                          value={delivery}
                          onChange={setDelivery}
                          placeholder="Select delivery"
                        />
                        {formErrors.delivery && (
                          <p className="text-xs text-destructive">
                            {formErrors.delivery}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label>Package Description *</Label>
                      <Textarea
                        placeholder="e.g., Medical supplies, warm clothing, food items..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        data-ocid="drone.textarea"
                      />
                      {formErrors.description && (
                        <p className="text-xs text-destructive">
                          {formErrors.description}
                        </p>
                      )}
                    </div>

                    {/* Weight Slider */}
                    <div className="space-y-2">
                      <Label>Package Weight (0 – 5kg)</Label>
                      <div className="text-center">
                        <span className="font-montserrat font-black text-3xl text-foreground">
                          {weight.toFixed(1)}
                        </span>
                        <span className="text-lg text-muted-foreground ml-1">
                          kg
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.1"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        className="w-full accent-blue-600"
                        data-ocid="drone.input"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0 kg</span>
                        <span>5 kg</span>
                      </div>
                      {formErrors.weight && (
                        <p className="text-xs text-destructive">
                          {formErrors.weight}
                        </p>
                      )}
                      {weight >= 5 && (
                        <p className="text-xs text-amber-600 font-medium">
                          Max capacity reached. Contact us for heavier parcels.
                        </p>
                      )}
                    </div>

                    {/* Landing Zone Photo */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Camera className="w-4 h-4" /> Landing Zone Photo
                      </Label>
                      <label
                        className="flex flex-col items-center gap-2 border-2 border-dashed border-border rounded-xl p-4 cursor-pointer hover:border-blue-400 transition-colors"
                        data-ocid="drone.dropzone"
                      >
                        {landingPhoto ? (
                          <img
                            src={landingPhoto}
                            alt="Landing zone"
                            className="w-full max-h-32 object-cover rounded-lg"
                          />
                        ) : (
                          <>
                            <Camera className="w-8 h-8 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              Upload a photo of the drop-off spot
                            </p>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoUpload}
                          data-ocid="drone.upload_button"
                        />
                      </label>
                    </div>

                    {/* Parcel Insurance */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200">
                      <Checkbox
                        id="insurance"
                        checked={insurance}
                        onCheckedChange={(c) => {
                          tap();
                          setInsurance(c === true);
                        }}
                        data-ocid="drone.checkbox"
                      />
                      <div>
                        <Label htmlFor="insurance" className="cursor-pointer">
                          <Shield className="w-4 h-4 inline mr-1.5 text-blue-600" />
                          Parcel Insurance (+1% of fare)
                        </Label>
                        {insurance && (
                          <p className="text-xs text-blue-600">
                            +\u20B9{insuranceFee} added
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Live Map with Precision Drop */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="font-montserrat uppercase text-lg flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full animate-pulse inline-block"
                        style={{ backgroundColor: "#0066FF" }}
                      />
                      Live Tracking Map
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="bg-slate-900 rounded-xl h-48 relative overflow-hidden"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(0,102,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,0.1) 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                      }}
                      data-ocid="drone.canvas_target"
                    >
                      <svg
                        className="absolute inset-0 w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-label="Drone delivery map"
                      >
                        <line
                          x1="15%"
                          y1="20%"
                          x2="85%"
                          y2="80%"
                          stroke="#0066FF"
                          strokeWidth="1.5"
                          strokeDasharray="6 4"
                          opacity="0.5"
                        />
                        {/* Precision drop target animation */}
                        <g>
                          <circle
                            cx="85%"
                            cy="80%"
                            r="18"
                            stroke="#ef4444"
                            strokeWidth="2"
                            fill="none"
                            opacity="0.8"
                          >
                            <animate
                              attributeName="r"
                              values="12;20;12"
                              dur="2s"
                              repeatCount="indefinite"
                            />
                            <animate
                              attributeName="opacity"
                              values="0.8;0.3;0.8"
                              dur="2s"
                              repeatCount="indefinite"
                            />
                          </circle>
                          <circle
                            cx="85%"
                            cy="80%"
                            r="6"
                            stroke="#ef4444"
                            strokeWidth="2"
                            fill="none"
                            opacity="1"
                          />
                          <line
                            x1="calc(85% - 20)"
                            y1="80%"
                            x2="calc(85% + 20)"
                            y2="80%"
                            stroke="#ef4444"
                            strokeWidth="1.5"
                            opacity="0.8"
                          />
                          <line
                            x1="85%"
                            y1="calc(80% - 20)"
                            x2="85%"
                            y2="calc(80% + 20)"
                            stroke="#ef4444"
                            strokeWidth="1.5"
                            opacity="0.8"
                          />
                        </g>
                      </svg>
                      <div className="absolute top-6 left-8">
                        <div
                          className="w-3 h-3 rounded-full animate-pulse"
                          style={{ backgroundColor: "#0066FF" }}
                        />
                      </div>
                      <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        animate={{ y: [-4, 4, -4] }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 2,
                          ease: "easeInOut",
                        }}
                      >
                        <Package
                          className="w-8 h-8"
                          style={{ color: "#0066FF" }}
                        />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>

                {/* Video Feed */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="font-montserrat uppercase text-lg flex items-center gap-2">
                      <Video className="w-4 h-4" style={{ color: "#0066FF" }} />{" "}
                      Live Camera Stream
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative bg-slate-900 rounded-xl h-36 flex flex-col items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
                      <Video className="relative w-10 h-10 text-slate-600 mb-2" />
                      <p className="relative text-xs text-slate-500 font-medium uppercase tracking-wider">
                        Feed activates once drone is dispatched
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Summary sidebar */}
              <div>
                <Card className="shadow-card sticky top-20">
                  <CardHeader>
                    <CardTitle className="font-montserrat uppercase text-lg">
                      Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pickup</span>
                        <span className="font-medium">
                          {pickup || "\u2014"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Delivery</span>
                        <span className="font-medium">
                          {delivery || "\u2014"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Weight</span>
                        <span className="font-medium">
                          {weight.toFixed(1)} kg
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Drone</span>
                        <span className="font-medium capitalize">
                          {droneType === "fast"
                            ? "Fast Delivery"
                            : "Heavy Lift"}
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-border pt-3 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Base</span>
                        <span>\u20B9{BASE_PRICE + weight * PRICE_PER_KG}</span>
                      </div>
                      {droneType === "heavy" && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Heavy Lift
                          </span>
                          <span>+\u20B9500</span>
                        </div>
                      )}
                      {insurance && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Insurance
                          </span>
                          <span>+\u20B9{insuranceFee}</span>
                        </div>
                      )}
                      {promoApplied && (
                        <div className="flex justify-between text-emerald-600">
                          <span>Promo (20%)</span>
                          <span>-\u20B9{Math.round(promoDiscount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center pt-2 border-t border-border">
                        <span className="font-montserrat font-bold uppercase text-sm">
                          {t("total")}
                        </span>
                        <span
                          className="font-montserrat font-black text-xl"
                          style={{ color: "#0066FF" }}
                        >
                          \u20B9{estimatedPrice}
                        </span>
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
                          data-ocid="drone.input"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={applyPromo}
                          disabled={promoApplied || !promoCode}
                          className="h-8 px-3 text-xs font-montserrat font-bold uppercase"
                          data-ocid="drone.button"
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

                    {isWindyDangerous && (
                      <div
                        className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-300 rounded-xl text-xs text-red-600 flex items-center gap-2"
                        data-ocid="drone.error_state"
                      >
                        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                        Too Windy — Drone bookings disabled ({windSpeed.current}{" "}
                        km/h)
                      </div>
                    )}

                    {!identity ? (
                      <div
                        className="rounded-xl bg-blue-50 border border-blue-200 p-4 text-center space-y-3"
                        data-ocid="drone.login_state"
                      >
                        <p className="text-blue-800 font-medium">
                          Login required to book
                        </p>
                        <p className="text-blue-600 text-sm">
                          Securely login with Internet Identity to confirm your
                          drone delivery
                        </p>
                        <Button
                          onClick={login}
                          disabled={isLoggingIn}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-montserrat font-bold uppercase tracking-wider rounded-full"
                          data-ocid="drone.primary_button"
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
                        disabled={isPending || isWindyDangerous}
                        className="w-full text-white font-montserrat font-bold uppercase tracking-wider rounded-full hover:opacity-90"
                        style={{
                          backgroundColor: isWindyDangerous
                            ? "#9ca3af"
                            : "#0066FF",
                        }}
                        onClick={() => tap()}
                        data-ocid="drone.submit_button"
                      >
                        {isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                            Booking...
                          </>
                        ) : (
                          t("bookDelivery")
                        )}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        )}

        {/* Follow My Trek Tab */}
        {activeTab === "trek" && (
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-montserrat uppercase text-lg">
                  🥾 Follow My Trek Resupply
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  A drone tracks your GPS and delivers supplies at the next
                  clearing. Perfect for high-altitude treks.
                </p>
                <div
                  className="relative bg-gradient-to-br from-emerald-900/30 to-blue-900/20 rounded-xl overflow-hidden border border-border"
                  style={{ height: 140 }}
                >
                  <svg
                    viewBox="0 0 200 70"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                    aria-label="Trek route map"
                    role="img"
                  >
                    <path
                      d="M0 55 Q30 45 50 50 Q80 35 100 28 Q130 18 150 22 Q170 15 200 12"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.5"
                      strokeDasharray="6,3"
                    />
                    <circle
                      cx="30"
                      cy="50"
                      r="6"
                      fill="#10b981"
                      opacity="0.8"
                    />
                    <circle cx="100" cy="28" r="6" fill="#f59e0b" />
                    <circle
                      cx="160"
                      cy="20"
                      r="6"
                      fill="#3b82f6"
                      opacity="0.8"
                    />
                    <text
                      x="30"
                      y="63"
                      fontSize="8"
                      fill="#10b981"
                      textAnchor="middle"
                    >
                      Start
                    </text>
                    <text
                      x="100"
                      y="41"
                      fontSize="8"
                      fill="#f59e0b"
                      textAnchor="middle"
                    >
                      You
                    </text>
                    <text
                      x="160"
                      y="13"
                      fontSize="8"
                      fill="#3b82f6"
                      textAnchor="middle"
                    >
                      Drop
                    </text>
                    <text x="175" y="45" fontSize="20" textAnchor="middle">
                      🚁
                    </text>
                  </svg>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Trekker Name</p>
                    <input
                      className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground"
                      placeholder="Your name"
                      value={trekName}
                      onChange={(e) => setTrekName(e.target.value)}
                      data-ocid="drone.trek.input"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Trek Date</p>
                    <input
                      type="date"
                      className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground"
                      value={trekDate}
                      onChange={(e) => setTrekDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Supply Type</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "water", icon: "💧", label: "Water" },
                      { id: "oxygen", icon: "🩺", label: "Oxygen" },
                      { id: "food", icon: "🍱", label: "Food" },
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setTrekSupply(s.id)}
                        className={`p-3 rounded-xl border-2 text-center transition-all ${trekSupply === s.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"}`}
                        data-ocid="drone.trek.toggle"
                      >
                        <span className="text-2xl block mb-1">{s.icon}</span>
                        <span className="text-xs font-montserrat font-bold">
                          {s.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-montserrat font-bold uppercase rounded-full"
                  onClick={() => {
                    tap();
                    toast.success(
                      "Trek resupply scheduled! Drone will follow your GPS.",
                    );
                  }}
                  data-ocid="drone.trek.submit_button"
                >
                  Schedule Trek Resupply
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Reverse Logistics Tab */}
        {activeTab === "reverse" && (
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-montserrat uppercase text-lg">
                  🔬 Reverse Logistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  Drones collect samples from remote villages and fly them to
                  city labs. Results in hours instead of days.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Village Pickup</p>
                    <Select
                      value={villagePickup}
                      onValueChange={setVillagePickup}
                    >
                      <SelectTrigger data-ocid="drone.reverse.select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Munsiari",
                          "Dharchula",
                          "Bhatwari",
                          "Niti Village",
                          "Malari",
                        ].map((v) => (
                          <SelectItem key={v} value={v}>
                            {v}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Lab Destination</p>
                    <Select value={labDest} onValueChange={setLabDest}>
                      <SelectTrigger data-ocid="drone.lab.select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["Dehradun", "Haldwani", "Nainital", "Haridwar"].map(
                          (l) => (
                            <SelectItem key={l} value={l}>
                              {l}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Sample Type</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "blood", icon: "🩸", label: "Blood" },
                      { id: "soil", icon: "🌱", label: "Soil" },
                      { id: "crop", icon: "🌾", label: "Crop" },
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSampleType(s.id)}
                        className={`p-3 rounded-xl border-2 text-center transition-all ${sampleType === s.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"}`}
                        data-ocid="drone.sample.toggle"
                      >
                        <span className="text-2xl block mb-1">{s.icon}</span>
                        <span className="text-xs font-montserrat font-bold">
                          {s.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <Button
                  className="w-full text-white font-montserrat font-bold uppercase rounded-full"
                  style={{ backgroundColor: "#0066FF" }}
                  onClick={() => {
                    tap();
                    toast.success(
                      `Pickup from ${villagePickup} to ${labDest} scheduled!`,
                    );
                  }}
                  data-ocid="drone.reverse.submit_button"
                >
                  Schedule Pickup
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Aarti Streaming Tab */}
        {activeTab === "aarti" && (
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-montserrat uppercase text-lg">
                  🕉️ Drone Aarti Live Streaming
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div
                  className="relative rounded-xl overflow-hidden border border-border"
                  style={{ height: 180 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-orange-900/50 via-amber-900/40 to-orange-950/70" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-6xl mb-2">🛕</span>
                    <p className="text-white font-montserrat font-black text-xl uppercase">
                      {aartiTemple}
                    </p>
                    <p className="text-white/70 text-xs mt-1">
                      Live 360° Drone Aarti Stream
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-red-400 text-xs font-bold">
                        LIVE
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Temple</p>
                    <Select value={aartiTemple} onValueChange={setAartiTemple}>
                      <SelectTrigger data-ocid="drone.aarti.select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Kedarnath",
                          "Tungnath",
                          "Badrinath",
                          "Yamunotri",
                          "Gangotri",
                        ].map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Watch Date</p>
                    <input
                      type="date"
                      className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground"
                      value={aartiDate}
                      onChange={(e) => setAartiDate(e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-montserrat font-bold uppercase rounded-full"
                  onClick={() => {
                    tap();
                    toast.success(
                      `Aarti stream from ${aartiTemple} booked! Link sent to your phone.`,
                    );
                  }}
                  data-ocid="drone.aarti.submit_button"
                >
                  🙏 Watch Live 360° Aarti
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Local Bazaar */}
        <div className="mt-8 pb-4">
          <h3 className="font-montserrat font-extrabold uppercase text-lg text-foreground mb-4">
            🏔️ Pahadi Bazaar — Drone Delivery
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                id: "daal",
                icon: "🫘",
                name: "Organic Pahadi Daal",
                price: "₹280/kg",
                bg: "from-amber-800 to-amber-600",
              },
              {
                id: "topi",
                icon: "🎩",
                name: "Kumaoni Topi",
                price: "₹450",
                bg: "from-red-800 to-orange-600",
              },
              {
                id: "rhodo",
                icon: "🌺",
                name: "Rhododendron Juice",
                price: "₹120/500ml",
                bg: "from-pink-800 to-rose-600",
              },
              {
                id: "buransh",
                icon: "🍶",
                name: "Buransh Sharbat",
                price: "₹180/L",
                bg: "from-purple-800 to-pink-600",
              },
            ].map((item, idx) => (
              <div
                key={item.id}
                className="rounded-xl overflow-hidden border border-border shadow-card"
                data-ocid={`drone.bazaar.item.${idx + 1}`}
              >
                <div
                  className={`h-20 bg-gradient-to-br ${item.bg} flex items-center justify-center`}
                >
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <div className="p-3">
                  <p className="font-montserrat font-bold text-xs text-foreground mb-0.5 leading-tight">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">
                    {item.price}
                  </p>
                  <Button
                    size="sm"
                    className="w-full text-xs font-montserrat font-bold uppercase rounded-full h-7 text-white"
                    style={{
                      backgroundColor: bazaarOrders.includes(item.id)
                        ? "#10b981"
                        : "#0066FF",
                    }}
                    onClick={() => {
                      tap();
                      setBazaarOrders((prev) =>
                        prev.includes(item.id) ? prev : [...prev, item.id],
                      );
                      toast.success(`${item.name} added for drone delivery!`);
                    }}
                    data-ocid={`drone.bazaar.button.${idx + 1}`}
                  >
                    {bazaarOrders.includes(item.id) ? "✓ Added" : "Order"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payload Temperature AI */}
        <div className="mt-4 mb-8">
          <Card className="shadow-card border-blue-400/30">
            <CardHeader className="pb-2">
              <CardTitle className="font-montserrat uppercase text-base">
                🌡️ Payload Temperature AI
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <p className="text-xs text-muted-foreground mb-4">
                Cold chain monitor for medicines and vaccines (2°C–8°C range).
              </p>
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">2°C</span>
                    <span className="font-montserrat font-black text-xl text-foreground">
                      {coldChainTemp.toFixed(1)}°C
                    </span>
                    <span className="text-xs text-muted-foreground">8°C</span>
                  </div>
                  <div className="bg-muted rounded-full h-3 overflow-hidden">
                    <div
                      className="h-3 rounded-full transition-all duration-700"
                      style={{
                        width: `${((coldChainTemp - 2) / 6) * 100}%`,
                        backgroundColor:
                          coldChainTemp > 7
                            ? "#ef4444"
                            : coldChainTemp < 3
                              ? "#3b82f6"
                              : "#10b981",
                      }}
                    />
                  </div>
                  <p className="text-xs text-emerald-500 mt-2 font-medium">
                    ✓ AI adjusting flight speed to maintain cold chain
                  </p>
                </div>
                <div className="w-14 h-14 rounded-full border-2 border-emerald-400 flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/20 flex-shrink-0">
                  <span className="text-xl">
                    {coldChainTemp < 3 ? "❄️" : coldChainTemp > 7 ? "🔥" : "✅"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Live Tracking Tab */}
      {activeTab === "tracking" && (
        <div className="space-y-6">
          <Card className="shadow-card overflow-hidden">
            <CardHeader>
              <CardTitle className="font-montserrat uppercase text-lg flex items-center gap-2">
                <span>📡</span> Live Drone Tracking
                <span className="ml-auto flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-100 border border-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-700 text-[10px] font-montserrat font-bold uppercase">
                    Live
                  </span>
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* SVG Mountain Terrain with animated drone */}
              <div
                className="relative bg-slate-900 overflow-hidden"
                style={{
                  height: 260,
                  backgroundImage:
                    "linear-gradient(rgba(0,102,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,0.06) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
                data-ocid="drone.tracking.canvas_target"
              >
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 360 240"
                  preserveAspectRatio="none"
                  role="img"
                  aria-label="Drone live tracking map"
                >
                  {/* Sky gradient */}
                  <defs>
                    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="rgb(10,20,50)"
                        stopOpacity="1"
                      />
                      <stop
                        offset="100%"
                        stopColor="rgb(20,40,80)"
                        stopOpacity="1"
                      />
                    </linearGradient>
                    <linearGradient id="mtnGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="rgb(40,70,120)"
                        stopOpacity="0.9"
                      />
                      <stop
                        offset="100%"
                        stopColor="rgb(20,40,80)"
                        stopOpacity="1"
                      />
                    </linearGradient>
                  </defs>
                  <rect width="360" height="240" fill="url(#skyGrad)" />
                  {/* Mountain peaks */}
                  <polygon points="0,200 60,100 120,200" fill="url(#mtnGrad)" />
                  <polygon
                    points="40,200 120,60 200,200"
                    fill="url(#mtnGrad)"
                  />
                  <polygon
                    points="100,200 200,40 300,200"
                    fill="url(#mtnGrad)"
                    opacity="0.85"
                  />
                  <polygon
                    points="200,200 300,80 360,180 360,200"
                    fill="url(#mtnGrad)"
                    opacity="0.7"
                  />
                  {/* Snow caps */}
                  <polygon
                    points="85,65 120,60 155,65 120,75"
                    fill="rgba(220,230,255,0.6)"
                  />
                  <polygon
                    points="165,45 200,40 235,45 200,55"
                    fill="rgba(220,230,255,0.7)"
                  />
                  {/* Flight path dashed arc */}
                  <path
                    d="M 30 180 Q 180 40 330 160"
                    stroke="rgba(0,120,255,0.5)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="8 5"
                  />
                  {/* Pickup pin */}
                  <circle cx="30" cy="180" r="6" fill="#10b981" />
                  <text
                    x="30"
                    y="198"
                    textAnchor="middle"
                    fill="#10b981"
                    fontSize="8"
                    fontFamily="monospace"
                  >
                    A
                  </text>
                  {/* Delivery pin */}
                  <circle cx="330" cy="160" r="6" fill="#ef4444" />
                  <text
                    x="330"
                    y="178"
                    textAnchor="middle"
                    fill="#ef4444"
                    fontSize="8"
                    fontFamily="monospace"
                  >
                    B
                  </text>
                </svg>

                {/* Animated drone */}
                <motion.div
                  className="absolute"
                  animate={{
                    left: ["8%", "50%", "88%"],
                    top: ["72%", "28%", "62%"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  style={{ transform: "translate(-50%, -50%)" }}
                >
                  <div className="relative">
                    <span className="text-3xl drop-shadow-lg select-none">
                      🚁
                    </span>
                    {/* Drone glow */}
                    <span className="absolute inset-0 rounded-full bg-blue-400/20 blur-md scale-150" />
                  </div>
                </motion.div>

                {/* Status overlay */}
                <div className="absolute top-3 left-3 glass-dark rounded-xl px-3 py-2">
                  <p className="text-white font-montserrat font-black text-xs uppercase">
                    In Flight
                  </p>
                  <p className="text-white/60 text-[10px]">
                    847m · 23 km/h · ETA 8 min
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Telemetry row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                label: "Altitude",
                value: "847m",
                icon: "📏",
                color: "text-blue-500",
              },
              {
                label: "Speed",
                value: "23 km/h",
                icon: "💨",
                color: "text-amber-500",
              },
              {
                label: "ETA",
                value: "8 min",
                icon: "⏱️",
                color: "text-emerald-500",
              },
              {
                label: "Battery",
                value: "78%",
                icon: "🔋",
                color: "text-emerald-600",
              },
            ].map((t) => (
              <Card key={t.label} className="shadow-card">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl mb-1">{t.icon}</p>
                  <p
                    className={`font-montserrat font-black text-lg ${t.color}`}
                  >
                    {t.value}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    {t.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Altitude gauge + status */}
          <Card className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-6">
                {/* Vertical altitude bar */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs text-muted-foreground">2000m</span>
                  <div className="relative w-6 h-32 bg-muted rounded-full overflow-hidden border border-border">
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full"
                      initial={{ height: "0%" }}
                      animate={{ height: "42%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">0m</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-montserrat font-black text-foreground text-lg mb-1">
                    847m Altitude
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Flying over Kedarnath valley approach
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Payload Temp
                      </span>
                      <span className="text-emerald-600 font-bold">
                        4.2°C ✓
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Wind Speed</span>
                      <span className="text-amber-600 font-bold">14 km/h</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Signal</span>
                      <span className="text-emerald-600 font-bold">
                        Strong 📶
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* No-fly Zone Scan Modal */}
      <AnimatePresence>
        {scanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-card rounded-2xl p-8 text-center max-w-sm w-full shadow-2xl"
              data-ocid="drone.modal"
            >
              <div className="relative w-24 h-24 mx-auto mb-6">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  role="img"
                  aria-label="Radar scanning animation"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="rgba(0,102,255,0.2)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    stroke="rgba(0,102,255,0.3)"
                    strokeWidth="1"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="15"
                    stroke="rgba(0,102,255,0.4)"
                    strokeWidth="1"
                    fill="none"
                  />
                  <circle cx="50" cy="50" r="3" fill="#0066FF" />
                  <line
                    x1="50"
                    y1="50"
                    x2="95"
                    y2="50"
                    stroke="rgba(0,102,255,0.6)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="radar-sweep"
                  />
                </svg>
              </div>
              {scanDone ? (
                <>
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                  <h3 className="font-montserrat font-black uppercase text-lg text-foreground">
                    Airspace Clear \u2713
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Proceeding with booking...
                  </p>
                </>
              ) : (
                <>
                  <h3 className="font-montserrat font-black uppercase text-lg text-foreground mb-2">
                    Scanning Airspace...
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Checking for no-fly zones in your area
                  </p>
                  <Progress value={scanProgress} className="w-full" />
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emergency Medicine Priority Button */}
      <button
        type="button"
        className="fixed bottom-24 right-4 z-50 w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-2xl flex items-center justify-center border-2 border-red-400 transition-all hover:scale-110"
        onClick={() => {
          tap();
          setEmergencyOpen(true);
        }}
        data-ocid="drone.emergency.button"
        title="Medicine Priority"
      >
        <span className="text-xl">🚨</span>
      </button>

      {emergencyOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
          role="presentation"
          onClick={() => setEmergencyOpen(false)}
          onKeyDown={() => {}}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-red-400"
            onClick={(e) => e.stopPropagation()}
            data-ocid="drone.emergency.dialog"
          >
            <div className="text-center mb-4">
              <span className="text-4xl">🚨</span>
              <h3 className="font-montserrat font-black text-xl text-red-600 mt-2 uppercase">
                Medicine Priority Mode
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                This overrides all drone delivery queues. Life-saving medicines
                only.
              </p>
            </div>
            <div className="space-y-3 mb-4">
              <input
                className="w-full border border-red-400 rounded-md px-3 py-2 text-sm bg-background"
                placeholder="Medicine name (e.g. Insulin, Oxygen)"
              />
              <input
                className="w-full border border-red-400 rounded-md px-3 py-2 text-sm bg-background"
                placeholder="Delivery location"
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 font-montserrat font-bold uppercase rounded-full border-red-400"
                onClick={() => setEmergencyOpen(false)}
                data-ocid="drone.emergency.cancel_button"
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-montserrat font-bold uppercase rounded-full"
                onClick={() => {
                  setEmergencyOpen(false);
                  tap();
                  toast.success("🚨 PRIORITY DELIVERY QUEUED — ETA 45 min");
                }}
                data-ocid="drone.emergency.confirm_button"
              >
                🚨 ACTIVATE PRIORITY
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
