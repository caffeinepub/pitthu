import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  CreditCard,
  PlusCircle,
  Wallet,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

type PaymentMethod = "cash" | "upi" | "wallet";

const UPI_APPS = [
  { name: "GPay", color: "#4285F4", initial: "G" },
  { name: "PhonePe", color: "#5F259F", initial: "P" },
  { name: "Paytm", color: "#00BAF2", initial: "T" },
];

export default function PaymentPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<PaymentMethod>("cash");
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId] = useState(
    () => `PTHU${Math.floor(Math.random() * 90000 + 10000)}`,
  );

  const fare = 450;

  const handleConfirm = async () => {
    if (selected === "upi" && !upiId.includes("@")) {
      toast.error("Enter a valid UPI ID (e.g. name@upi)");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 text-white flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-center"
          data-ocid="payment.success_state"
        >
          {/* Confetti-like dots */}
          <div className="relative inline-block">
            {([0, 1, 2, 3, 4, 5, 6, 7] as const).map((i) => (
              <motion.div
                key={`dot-${i}`}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: i % 2 === 0 ? "#F97316" : "#3B82F6",
                  top: "50%",
                  left: "50%",
                }}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.cos((i / 8) * Math.PI * 2) * 80,
                  y: Math.sin((i / 8) * Math.PI * 2) * 80,
                  opacity: 0,
                }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            ))}
            <div className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
          </div>

          <h2 className="text-3xl font-black text-white mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-white/60 mb-6">
            Your ride has been booked successfully
          </p>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-left mb-6 max-w-xs mx-auto">
            <div className="flex justify-between mb-2">
              <span className="text-white/60 text-sm">Booking ID</span>
              <span className="font-mono font-bold text-orange-400 text-sm">
                {bookingId}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-white/60 text-sm">Amount Paid</span>
              <span className="font-bold text-white">₹{fare}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60 text-sm">Payment</span>
              <span className="text-white capitalize text-sm">
                {selected === "wallet"
                  ? "PITTHU Wallet"
                  : selected.toUpperCase()}
              </span>
            </div>
          </div>

          <Link to="/">
            <Button
              className="w-full max-w-xs bg-gradient-to-r from-blue-600 to-orange-500 text-white font-bold rounded-2xl py-4 h-auto"
              data-ocid="payment.primary_button"
            >
              Back to Home
            </Button>
          </Link>

          <Link to="/trip-tracking">
            <Button
              variant="outline"
              className="w-full max-w-xs mt-3 border-white/20 text-white hover:bg-white/10 rounded-2xl py-3 h-auto"
              data-ocid="payment.secondary_button"
            >
              Track Ride
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 text-white pb-10">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 px-4 py-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="p-2 rounded-xl hover:bg-white/10 transition-colors"
          data-ocid="payment.button"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">Choose Payment Method</h1>
      </div>

      <div className="px-4 pt-6 max-w-md mx-auto space-y-4">
        {/* Fare summary */}
        <div className="bg-gradient-to-r from-blue-600/30 to-orange-500/30 backdrop-blur-md border border-white/20 rounded-2xl p-5">
          <p className="text-white/60 text-sm mb-1">Fare Summary</p>
          <div className="flex items-end gap-1">
            <span className="text-4xl font-black text-white">₹{fare}</span>
            <span className="text-white/40 text-sm mb-1">total</span>
          </div>
          <div className="mt-3 space-y-1 text-sm">
            <div className="flex justify-between text-white/60">
              <span>Base Fare</span>
              <span>₹320</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Hill Surcharge</span>
              <span>₹80</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Taxes</span>
              <span>₹50</span>
            </div>
          </div>
        </div>

        {/* Payment options */}
        <p className="text-white/60 text-sm font-medium uppercase tracking-wider">
          Select Payment Method
        </p>

        {/* Cash */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => setSelected("cash")}
          data-ocid="payment.radio"
          className={`w-full text-left bg-white/10 backdrop-blur-md border rounded-2xl p-4 transition-all ${
            selected === "cash"
              ? "border-orange-500 bg-orange-500/10"
              : "border-white/20 hover:border-white/40"
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                selected === "cash" ? "bg-orange-500/20" : "bg-white/10"
              }`}
            >
              💵
            </div>
            <div>
              <p className="font-semibold">Cash</p>
              <p className="text-white/50 text-sm">Pay after ride</p>
            </div>
            <div
              className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selected === "cash"
                  ? "border-orange-500 bg-orange-500"
                  : "border-white/30"
              }`}
            >
              {selected === "cash" && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
          </div>
        </motion.button>

        {/* UPI */}
        <motion.div
          whileTap={{ scale: 0.97 }}
          className={`bg-white/10 backdrop-blur-md border rounded-2xl p-4 transition-all ${
            selected === "upi"
              ? "border-orange-500 bg-orange-500/10"
              : "border-white/20"
          }`}
        >
          <button
            type="button"
            onClick={() => setSelected("upi")}
            data-ocid="payment.radio"
            className="w-full text-left"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                  selected === "upi" ? "bg-orange-500/20" : "bg-white/10"
                }`}
              >
                📱
              </div>
              <div>
                <p className="font-semibold">UPI</p>
                <p className="text-white/50 text-sm">GPay, PhonePe, Paytm</p>
              </div>
              <div
                className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selected === "upi"
                    ? "border-orange-500 bg-orange-500"
                    : "border-white/30"
                }`}
              >
                {selected === "upi" && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </div>
          </button>

          <AnimatePresence>
            {selected === "upi" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-3">
                  {/* UPI app icons */}
                  <div className="flex gap-2">
                    {UPI_APPS.map((app) => (
                      <div
                        key={app.name}
                        className="flex-1 py-2 rounded-xl border border-white/20 text-center text-xs font-medium text-white/70"
                        style={{ background: `${app.color}20` }}
                      >
                        <div
                          className="w-7 h-7 rounded-full mx-auto mb-1 flex items-center justify-center text-sm font-bold text-white"
                          style={{ background: app.color }}
                        >
                          {app.initial}
                        </div>
                        {app.name}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    <Label className="text-white/70 text-xs">UPI ID</Label>
                    <Input
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-xl focus:border-blue-400"
                      data-ocid="payment.input"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Wallet */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => setSelected("wallet")}
          data-ocid="payment.radio"
          className={`w-full text-left bg-white/10 backdrop-blur-md border rounded-2xl p-4 transition-all ${
            selected === "wallet"
              ? "border-orange-500 bg-orange-500/10"
              : "border-white/20 hover:border-white/40"
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                selected === "wallet" ? "bg-orange-500/20" : "bg-white/10"
              }`}
            >
              👛
            </div>
            <div>
              <p className="font-semibold">PITTHU Wallet</p>
              <p className="text-green-400 text-sm font-medium">
                Balance: ₹2,450
              </p>
            </div>
            <div
              className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selected === "wallet"
                  ? "border-orange-500 bg-orange-500"
                  : "border-white/30"
              }`}
            >
              {selected === "wallet" && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
          </div>
          <AnimatePresence>
            {selected === "wallet" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toast.info("Top-up feature coming soon!")}
                  className="mt-3 flex items-center gap-2 text-blue-400 text-sm font-medium hover:text-blue-300"
                  data-ocid="payment.secondary_button"
                >
                  <PlusCircle className="w-4 h-4" /> Add Money to Wallet
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Confirm button */}
        <Button
          onClick={handleConfirm}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white font-bold rounded-2xl py-4 h-auto mt-2"
          data-ocid="payment.submit_button"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> Confirm Payment ₹{fare}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
