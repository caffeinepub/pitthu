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
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Clock,
  Loader2,
  Package,
  Shield,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
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

const PRICE_PER_KG = 150;
const BASE_PRICE = 500;

export default function DroneDeliveryPage() {
  const [pickup, setPickup] = useState("");
  const [delivery, setDelivery] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [booked, setBooked] = useState(false);

  const { mutateAsync: createBooking, isPending } = useCreateBooking();

  const weightNum = Number.parseFloat(weight) || 0;
  const estimatedPrice =
    weightNum > 0 ? BASE_PRICE + weightNum * PRICE_PER_KG : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !delivery || !description || !weight) {
      toast.error("Please fill all required fields");
      return;
    }
    if (pickup === delivery) {
      toast.error("Pickup and delivery locations must be different");
      return;
    }
    const w = Number.parseFloat(weight);
    if (Number.isNaN(w) || w <= 0 || w > 25) {
      toast.error("Weight must be between 0.1 and 25 kg");
      return;
    }
    try {
      await createBooking({
        time: BigInt(Date.now() * 1000000),
        price: BigInt(Math.round(estimatedPrice)),
        bookingType: {
          __kind__: "drone",
          drone: {
            pickupLocation: { address: pickup, coordinates: [0, 0] },
            dropoffLocation: { address: delivery, coordinates: [0, 0] },
            packageDescription: description,
            packageWeight: w,
          },
        },
      });
      setBooked(true);
      toast.success("Drone delivery booked successfully!");
    } catch {
      toast.error("Booking failed. Please try again.");
    }
  };

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
          <div className="bg-muted rounded-xl p-4 mb-6 text-left text-sm space-y-1">
            <p>
              <span className="font-bold">From:</span> {pickup}
            </p>
            <p>
              <span className="font-bold">To:</span> {delivery}
            </p>
            <p>
              <span className="font-bold">Package:</span> {description}
            </p>
            <p>
              <span className="font-bold">Weight:</span> {weight} kg
            </p>
            <p>
              <span className="font-bold">Estimated Price:</span> ₹
              {Math.round(estimatedPrice)}
            </p>
          </div>
          <Button
            onClick={() => {
              setBooked(false);
              setPickup("");
              setDelivery("");
              setDescription("");
              setWeight("");
            }}
            className="w-full bg-primary text-primary-foreground rounded-full font-montserrat font-bold uppercase"
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
          src="/assets/generated/drone-delivery-promo.dim_600x400.jpg"
          alt="Drone"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-brand-orange font-montserrat font-bold uppercase tracking-[0.2em] text-xs">
                  PITTHU
                </p>
                <h1 className="font-montserrat font-black uppercase text-3xl text-white">
                  Drone Delivery
                </h1>
              </div>
            </div>
            <p className="text-white/70 max-w-lg">
              Get essential items delivered by drone to any location in
              Uttarakhand — including the most remote Himalayan villages and
              trek camps.
            </p>
            <div className="flex flex-wrap gap-6 mt-6">
              {[
                { icon: Zap, label: "2-4 Hour Delivery" },
                { icon: Shield, label: "Insured Packages" },
                { icon: Clock, label: "24/7 Service" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-white/80 text-sm"
                >
                  <item.icon className="w-4 h-4 text-brand-orange" />
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="font-montserrat uppercase text-lg">
                    Delivery Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="pickup">Pickup Location *</Label>
                      <Select value={pickup} onValueChange={setPickup}>
                        <SelectTrigger id="pickup" data-ocid="drone.select">
                          <SelectValue placeholder="Select pickup" />
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
                      <Label htmlFor="deliveryLoc">Delivery Location *</Label>
                      <Select value={delivery} onValueChange={setDelivery}>
                        <SelectTrigger
                          id="deliveryLoc"
                          data-ocid="drone.select"
                        >
                          <SelectValue placeholder="Select delivery" />
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
                  <div className="space-y-1">
                    <Label htmlFor="description">Package Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="e.g., Medical supplies, warm clothing, food items..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      data-ocid="drone.textarea"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="weight">Package Weight (kg) *</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="e.g., 2.5"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      min="0.1"
                      max="25"
                      step="0.1"
                      data-ocid="drone.input"
                    />
                    <p className="text-xs text-muted-foreground">
                      Maximum weight: 25 kg
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="font-montserrat uppercase text-lg">
                    Pricing Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { range: "Up to 5 kg", price: "₹1,250" },
                      { range: "5–15 kg", price: "₹2,750" },
                      { range: "15–25 kg", price: "₹4,250" },
                    ].map((tier) => (
                      <div
                        key={tier.range}
                        className="bg-muted rounded-xl p-3 text-center"
                      >
                        <p className="font-montserrat font-bold text-sm text-foreground">
                          {tier.price}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {tier.range}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Base charge ₹500 + ₹150/kg. Final price shown in summary.
                  </p>
                </CardContent>
              </Card>
            </div>

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
                      <span className="font-medium">{pickup || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="font-medium">{delivery || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weight</span>
                      <span className="font-medium">
                        {weight ? `${weight} kg` : "—"}
                      </span>
                    </div>
                  </div>
                  {estimatedPrice > 0 && (
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-montserrat font-bold uppercase text-sm">
                          Estimated Total
                        </span>
                        <span className="font-montserrat font-black text-xl text-primary">
                          ₹{Math.round(estimatedPrice)}
                        </span>
                      </div>
                    </div>
                  )}
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-montserrat font-bold uppercase tracking-wider rounded-full"
                    data-ocid="drone.submit_button"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                        Booking...
                      </>
                    ) : (
                      "Book Delivery"
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
