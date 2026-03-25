import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle, Copy, Smartphone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAllBookings, updateBookingPayment } from "../lib/bookingStorage";

// ── Owner UPI config ──
const OWNER_UPI_ID = "admin@okhdfcbank";
const APP_NAME = "PITTHU";

type PaymentMethod = "gpay" | "upi" | "cash";

function buildUpiLink(amount: number, bookingId: string) {
  const tn = encodeURIComponent(`${APP_NAME} Ride ${bookingId}`);
  const pn = encodeURIComponent(APP_NAME);
  return `upi://pay?pa=${OWNER_UPI_ID}&pn=${pn}&am=${amount}&cu=INR&tn=${tn}`;
}

function QrCode({ upiLink }: { upiLink: string }) {
  const src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="bg-white p-3 rounded-2xl shadow-xl">
        <img src={src} alt="UPI QR Code" className="w-44 h-44" />
      </div>
      <p className="text-white/60 text-xs text-center">
        Scan with any UPI app (Google Pay, PhonePe, Paytm)
      </p>
    </div>
  );
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const searchRaw = useSearch({ strict: false }) as Record<string, unknown>;
  const searchBookingId = searchRaw.bookingId
    ? String(searchRaw.bookingId)
    : "";
  const searchFare = searchRaw.fare ? Number(searchRaw.fare) : 0;

  // resolve booking from search params or localStorage
  const booking = getAllBookings().find((b) => b.bookingId === searchBookingId);
  const bookingId = searchBookingId || booking?.bookingId || "";
  const fare = searchFare || booking?.fare || 0;

  const [selected, setSelected] = useState<PaymentMethod>("gpay");

  const [showQr, setShowQr] = useState(false);
  const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

  const upiLink = buildUpiLink(fare, bookingId);

  useEffect(() => {
    // If already paid, skip to booking-status
    if (booking?.paymentStatus === "paid") {
      navigate({ to: "/booking-status", search: { bookingId } });
    }
  }, [booking?.paymentStatus, bookingId, navigate]);

  const handleGpayClick = () => {
    if (isMobile) {
      window.location.href = upiLink;
    } else {
      setShowQr(true);
    }
  };

  const handleIvePaid = (method: string) => {
    updateBookingPayment(bookingId, method);
    toast.success("Payment confirmed! Your ride is booked ✓");
    navigate({ to: "/booking-status", search: { bookingId } });
  };

  const handleCash = () => {
    updateBookingPayment(bookingId, "cash");
    toast.success("Cash payment noted. Pay driver on arrival.");
    navigate({ to: "/booking-status", search: { bookingId } });
  };

  const copyUpiId = () => {
    navigator.clipboard
      .writeText(OWNER_UPI_ID)
      .then(() => toast.success("UPI ID copied!"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur border-b border-white/10 px-4 py-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate({ to: "/book-ride" })}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          data-ocid="payment.close_button"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-bold text-base">Complete Payment</h1>
          <p className="text-white/40 text-xs">Booking #{bookingId}</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-5">
        {/* Fare card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5"
          data-ocid="payment.card"
        >
          <p className="text-white/50 text-sm mb-1">Amount to pay</p>
          <p className="text-4xl font-extrabold text-white">₹{fare}</p>
          <p className="text-white/40 text-xs mt-1">Paid via UPI</p>
        </motion.div>

        {/* Payment method selector */}
        <div className="space-y-3">
          <p className="text-white/50 text-xs uppercase tracking-widest font-semibold">
            Select Payment Method
          </p>

          {/* Google Pay */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected("gpay")}
            data-ocid="payment.tab"
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
              selected === "gpay"
                ? "border-green-500 bg-green-500/10"
                : "border-white/10 bg-white/5 hover:border-white/20"
            }`}
          >
            {/* GPay G logo */}
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow">
              <span
                className="font-extrabold text-xl"
                style={{
                  background:
                    "linear-gradient(135deg,#4285F4,#34A853,#FBBC05,#EA4335)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                G
              </span>
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-white">Google Pay</p>
              <p className="text-white/50 text-xs">Instant UPI transfer</p>
            </div>
            {selected === "gpay" && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                Recommended
              </Badge>
            )}
          </motion.button>

          {/* Generic UPI */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected("upi")}
            data-ocid="payment.tab"
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
              selected === "upi"
                ? "border-blue-400 bg-blue-500/10"
                : "border-white/10 bg-white/5 hover:border-white/20"
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-white">
                PhonePe / Paytm / Other UPI
              </p>
              <p className="text-white/50 text-xs">Pay via any UPI app</p>
            </div>
          </motion.button>

          {/* Cash */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected("cash")}
            data-ocid="payment.tab"
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
              selected === "cash"
                ? "border-amber-400 bg-amber-500/10"
                : "border-white/10 bg-white/5 hover:border-white/20"
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-amber-600/20 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">💵</span>
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-white">Cash</p>
              <p className="text-white/50 text-xs">Pay driver on arrival</p>
            </div>
          </motion.button>
        </div>

        {/* Action area */}
        <AnimatePresence mode="wait">
          {selected === "gpay" && (
            <motion.div
              key="gpay-action"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {!showQr ? (
                <Button
                  onClick={handleGpayClick}
                  data-ocid="payment.primary_button"
                  className="w-full h-14 rounded-2xl text-base font-bold bg-green-500 hover:bg-green-400 text-white shadow-lg shadow-green-500/30"
                >
                  <span
                    className="mr-2 font-extrabold text-lg"
                    style={{
                      background: "linear-gradient(135deg,#fff,#d0ffd0)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    G
                  </span>
                  {isMobile ? "Open Google Pay" : "Show QR Code"}
                </Button>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center gap-4">
                  <p className="font-semibold text-white text-center">
                    Scan with Google Pay or any UPI app
                  </p>
                  <QrCode upiLink={upiLink} />
                  <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 w-full">
                    <p className="flex-1 text-white/80 text-sm font-mono">
                      {OWNER_UPI_ID}
                    </p>
                    <button
                      type="button"
                      onClick={copyUpiId}
                      className="text-white/50 hover:text-white transition-colors"
                      data-ocid="payment.secondary_button"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              <Button
                onClick={() => handleIvePaid("gpay")}
                variant="outline"
                data-ocid="payment.confirm_button"
                className="w-full h-12 rounded-2xl border-green-500/40 bg-green-500/10 text-green-400 hover:bg-green-500/20 font-semibold"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                I've Paid ✓
              </Button>
            </motion.div>
          )}

          {selected === "upi" && (
            <motion.div
              key="upi-action"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center gap-4">
                <QrCode upiLink={upiLink} />
                <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 w-full">
                  <p className="flex-1 text-white/80 text-sm font-mono">
                    {OWNER_UPI_ID}
                  </p>
                  <button
                    type="button"
                    onClick={copyUpiId}
                    className="text-white/50 hover:text-white transition-colors"
                    data-ocid="payment.secondary_button"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {isMobile && (
                <Button
                  onClick={() => {
                    window.location.href = upiLink;
                  }}
                  data-ocid="payment.primary_button"
                  className="w-full h-14 rounded-2xl text-base font-bold bg-blue-600 hover:bg-blue-500 text-white"
                >
                  Open UPI App
                </Button>
              )}
              <Button
                onClick={() => handleIvePaid("upi")}
                variant="outline"
                data-ocid="payment.confirm_button"
                className="w-full h-12 rounded-2xl border-blue-400/40 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 font-semibold"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                I've Paid ✓
              </Button>
            </motion.div>
          )}

          {selected === "cash" && (
            <motion.div
              key="cash-action"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 mb-4">
                <p className="text-amber-300 text-sm font-medium">
                  💵 Pay ₹{fare} in cash to your driver on arrival.
                </p>
                <p className="text-white/40 text-xs mt-1">
                  Driver will confirm receipt once the ride is complete.
                </p>
              </div>
              <Button
                onClick={handleCash}
                data-ocid="payment.primary_button"
                className="w-full h-14 rounded-2xl text-base font-bold bg-amber-500 hover:bg-amber-400 text-slate-900"
              >
                Confirm Cash Booking
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* UPI ID info */}
        <p className="text-center text-white/25 text-xs">
          Payments go directly to {OWNER_UPI_ID} — powered by UPI
        </p>
      </div>
    </div>
  );
}
