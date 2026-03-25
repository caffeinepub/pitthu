import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "@tanstack/react-router";
import { LogIn, Mountain, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { findUserByPhone } from "../lib/userStorage";

const ADMIN_PHONE = "9999999999";

interface LoginFormProps {
  isDriver: boolean;
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  returningUser: string | null;
  onLogin: () => void;
}

function LoginForm({
  isDriver,
  name,
  setName,
  phone,
  setPhone,
  returningUser,
  onLogin,
}: LoginFormProps) {
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

      {/* Name field */}
      <div className="space-y-2">
        <Label className="text-white/80 text-sm">Your Name</Label>
        <div className="flex gap-2 items-center">
          <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-3 text-white/60 shrink-0 h-10">
            <User className="w-4 h-4" />
          </div>
          <Input
            data-ocid="login.name_input"
            type="text"
            placeholder="e.g. Rahul Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl focus:border-blue-400 focus:ring-blue-400/20"
          />
        </div>
      </div>

      {/* Returning user hint */}
      <AnimatePresence>
        {returningUser && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-xl bg-green-500/15 border border-green-400/30 p-3 text-sm text-green-200 text-center"
          >
            Welcome back,{" "}
            <span className="font-semibold text-green-100">
              {returningUser}
            </span>
            ! 👋
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phone field */}
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
        onClick={onLogin}
        disabled={!name.trim() || phone.length < 10}
        className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/20"
      >
        <LogIn className="w-4 h-4 mr-2" />
        Login / Register
      </Button>
    </motion.div>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUserFromLogin } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [activeTab, setActiveTab] = useState<"rider" | "driver">("rider");
  const [returningUser, setReturningUser] = useState<string | null>(null);

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    if (value.length === 10) {
      const existing = findUserByPhone(value);
      if (existing) {
        setReturningUser(existing.name);
        setName(existing.name);
      } else {
        setReturningUser(null);
      }
    } else {
      setReturningUser(null);
    }
  };

  const handleLogin = () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (phone.length !== 10) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }
    setUserFromLogin(name.trim(), phone, activeTab);
    toast.success(`Welcome, ${name.trim()}!`);
    if (phone === ADMIN_PHONE) {
      navigate({ to: "/admin" });
    } else if (activeTab === "driver") {
      navigate({ to: "/driver-dashboard" });
    } else {
      navigate({ to: "/" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 flex flex-col items-center justify-center px-4 py-10">
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
              setReturningUser(null);
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
              <LoginForm
                isDriver={false}
                name={name}
                setName={setName}
                phone={phone}
                setPhone={handlePhoneChange}
                returningUser={returningUser}
                onLogin={handleLogin}
              />
            </TabsContent>
            <TabsContent value="driver">
              <LoginForm
                isDriver={true}
                name={name}
                setName={setName}
                phone={phone}
                setPhone={handlePhoneChange}
                returningUser={returningUser}
                onLogin={handleLogin}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-xs text-green-300/80 text-center">
          <span className="font-semibold text-green-300">Getting started:</span>{" "}
          Enter your name + phone number to get started &nbsp;|&nbsp;{" "}
          <span className="font-mono">9999999999</span> = admin
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
