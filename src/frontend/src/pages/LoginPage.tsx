import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/firebase";
import { Link, useNavigate } from "@tanstack/react-router";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import type { ConfirmationResult } from "firebase/auth";
import { Loader2, LogIn, Mountain, Phone, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";

// PhoneOtpForm is defined outside LoginPage to prevent remount-on-render (avoids reCAPTCHA destruction)
interface PhoneOtpFormProps {
  isDriver: boolean;
  phone: string;
  setPhone: (v: string) => void;
  otp: string;
  setOtp: (v: string) => void;
  otpSent: boolean;
  loading: boolean;
  verifying: boolean;
  demoLoading: boolean;
  handleSendOTP: () => void;
  handleVerifyOTP: () => void;
  handleDemoLogin: () => void;
  handleGoogle: () => void;
}

function PhoneOtpForm({
  isDriver,
  phone,
  setPhone,
  otp,
  setOtp,
  otpSent,
  loading,
  verifying,
  demoLoading,
  handleSendOTP,
  handleVerifyOTP,
  handleDemoLogin,
  handleGoogle,
}: PhoneOtpFormProps) {
  return (
    <motion.div
      key={isDriver ? "driver" : "rider"}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {isDriver && (
        <div className="rounded-xl bg-orange-500/20 border border-orange-400/30 p-3 text-sm text-orange-200 text-center">
          Not registered yet?{" "}
          <Link
            to="/driver-register"
            className="font-semibold underline underline-offset-2 text-orange-300"
          >
            Register as Driver &rarr;
          </Link>
        </div>
      )}

      <div className="space-y-2">
        <Label className="text-white/80 text-sm">Phone Number</Label>
        <div className="flex gap-2">
          <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-3 text-white/60 text-sm font-medium shrink-0">
            +91
          </div>
          <Input
            data-ocid="login.input"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl focus:border-blue-400 focus:ring-blue-400/20"
          />
        </div>
      </div>

      <Button
        data-ocid="login.primary_button"
        onClick={handleSendOTP}
        disabled={loading || phone.length < 10}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl h-11 font-semibold transition-all"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : (
          <Phone className="w-4 h-4 mr-2" />
        )}
        {loading ? "Sending OTP..." : "Send OTP"}
      </Button>

      <AnimatePresence>
        {otpSent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 overflow-hidden"
          >
            <div className="rounded-xl bg-blue-500/10 border border-blue-400/20 p-3 text-sm text-blue-200 text-center">
              OTP sent to +91{phone}. Check your SMS.
            </div>
            <div className="space-y-2">
              <Label className="text-white/80 text-sm">Enter 6-digit OTP</Label>
              <Input
                data-ocid="login.otp_input"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl focus:border-blue-400 tracking-[0.5em] text-center text-lg font-bold"
              />
            </div>
            <Button
              data-ocid="login.submit_button"
              onClick={handleVerifyOTP}
              disabled={verifying || otp.length !== 6}
              className="w-full bg-orange-500 hover:bg-orange-400 text-white rounded-xl h-11 font-semibold"
            >
              {verifying ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <ShieldCheck className="w-4 h-4 mr-2" />
              )}
              {verifying ? "Verifying..." : "Verify & Login"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/20" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-transparent px-3 text-white/40 text-xs">OR</span>
        </div>
      </div>

      {/* Demo Login */}
      <Button
        data-ocid="login.demo_button"
        onClick={handleDemoLogin}
        disabled={demoLoading || phone.length < 10}
        variant="outline"
        className="w-full border-white/20 bg-white/5 hover:bg-green-500/10 hover:border-green-400/40 text-white/70 hover:text-white rounded-xl h-11 text-sm"
      >
        {demoLoading ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : (
          <LogIn className="w-4 h-4 mr-2" />
        )}
        Demo Login (No OTP)
      </Button>

      <Button
        data-ocid="login.secondary_button"
        variant="outline"
        onClick={handleGoogle}
        className="w-full border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-xl h-11"
      >
        <svg
          className="w-4 h-4 mr-2"
          viewBox="0 0 24 24"
          aria-label="Google"
          aria-hidden="true"
        >
          <title>Google</title>
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </Button>
    </motion.div>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUserFromLogin } = useAuth();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"rider" | "driver">("rider");
  const confirmationRef = useRef<ConfirmationResult | null>(null);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  // Initialize invisible reCAPTCHA once on mount
  useEffect(() => {
    const verifier = new RecaptchaVerifier(auth, "recaptcha-anchor", {
      size: "invisible",
    });
    recaptchaRef.current = verifier;
    return () => {
      verifier.clear();
      recaptchaRef.current = null;
    };
  }, []);

  const handleSendOTP = async () => {
    if (!phone || phone.length < 10) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }
    setLoading(true);
    try {
      // Re-create verifier if it was already used (Firebase requires a fresh one after each attempt)
      if (!recaptchaRef.current) {
        recaptchaRef.current = new RecaptchaVerifier(auth, "recaptcha-anchor", {
          size: "invisible",
        });
      }
      const fullPhone = `+91${phone.replace(/\D/g, "")}`;
      const result = await signInWithPhoneNumber(
        auth,
        fullPhone,
        recaptchaRef.current,
      );
      confirmationRef.current = result;
      setOtpSent(true);
      toast.success(`OTP sent to +91${phone}`);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to send OTP. Try again.";
      toast.error(msg);
      // Clear the verifier so a fresh one is created next attempt
      recaptchaRef.current?.clear();
      recaptchaRef.current = null;
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Enter the 6-digit OTP");
      return;
    }
    setVerifying(true);
    try {
      if (!confirmationRef.current)
        throw new Error("Session expired. Resend OTP.");
      await confirmationRef.current.confirm(otp);

      setUserFromLogin(phone, activeTab);
      const digits = phone.replace(/\D/g, "");
      const ADMIN_PHONE = "9999999999";

      if (digits === ADMIN_PHONE) {
        toast.success("Welcome, Admin! Redirecting to dashboard...");
        navigate({ to: "/admin" });
      } else if (activeTab === "driver") {
        toast.success("Welcome, Driver!");
        navigate({ to: "/driver-dashboard" });
      } else {
        toast.success("Login successful! Welcome to PITTHU");
        navigate({ to: "/" });
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Wrong OTP. Please try again.";
      toast.error(msg);
    } finally {
      setVerifying(false);
    }
  };

  const handleDemoLogin = () => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      toast.error("Enter a valid 10-digit phone number first");
      return;
    }
    setDemoLoading(true);
    setTimeout(() => {
      setUserFromLogin(digits, activeTab);
      const ADMIN_PHONE = "9999999999";
      if (digits === ADMIN_PHONE) {
        toast.success("Logged in as admin");
        navigate({ to: "/admin" });
      } else if (activeTab === "driver") {
        toast.success("Logged in as driver");
        navigate({ to: "/driver-dashboard" });
      } else {
        toast.success("Logged in as user");
        navigate({ to: "/" });
      }
      setDemoLoading(false);
    }, 600);
  };

  const handleGoogle = () => {
    toast.info("Google login coming soon");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 flex flex-col items-center justify-center px-4 py-10">
      {/* Invisible reCAPTCHA anchor — must stay in the DOM */}
      <div id="recaptcha-anchor" />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-orange-500 shadow-2xl mb-4">
            <Mountain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            PITTHU
          </h1>
          <p className="text-white/50 text-sm mt-1">
            Travel Across Uttarakhand
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
          <Tabs
            defaultValue="rider"
            onValueChange={(v) => {
              setActiveTab(v as "rider" | "driver");
              // Reset state when switching tabs
              setOtpSent(false);
              setOtp("");
              confirmationRef.current = null;
            }}
          >
            <TabsList className="w-full bg-white/10 rounded-xl mb-6">
              <TabsTrigger
                data-ocid="login.tab"
                value="rider"
                className="flex-1 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white text-white/60"
              >
                Rider Login
              </TabsTrigger>
              <TabsTrigger
                data-ocid="login.driver_tab"
                value="driver"
                className="flex-1 rounded-lg data-[state=active]:bg-orange-500 data-[state=active]:text-white text-white/60"
              >
                Driver Login
              </TabsTrigger>
            </TabsList>
            <TabsContent value="rider">
              <PhoneOtpForm
                isDriver={false}
                phone={phone}
                setPhone={setPhone}
                otp={otp}
                setOtp={setOtp}
                otpSent={otpSent}
                loading={loading}
                verifying={verifying}
                demoLoading={demoLoading}
                handleSendOTP={handleSendOTP}
                handleVerifyOTP={handleVerifyOTP}
                handleDemoLogin={handleDemoLogin}
                handleGoogle={handleGoogle}
              />
            </TabsContent>
            <TabsContent value="driver">
              <PhoneOtpForm
                isDriver={true}
                phone={phone}
                setPhone={setPhone}
                otp={otp}
                setOtp={setOtp}
                otpSent={otpSent}
                loading={loading}
                verifying={verifying}
                demoLoading={demoLoading}
                handleSendOTP={handleSendOTP}
                handleVerifyOTP={handleVerifyOTP}
                handleDemoLogin={handleDemoLogin}
                handleGoogle={handleGoogle}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-xs text-green-300/80 text-center">
          <span className="font-semibold text-green-300">Demo accounts:</span>{" "}
          Any 10-digit number = rider &nbsp;|&nbsp; Driver tab = driver
          &nbsp;|&nbsp; <span className="font-mono">9999999999</span> = admin
        </div>

        <p className="text-center text-white/40 text-sm mt-4">
          New driver?{" "}
          <Link
            to="/driver-register"
            data-ocid="login.link"
            className="text-orange-400 font-medium hover:text-orange-300 transition-colors"
          >
            Register here &rarr;
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
