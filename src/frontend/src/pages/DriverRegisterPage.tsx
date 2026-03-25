import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Car,
  CheckCircle2,
  ChevronRight,
  FileText,
  Loader2,
  Mountain,
  Upload,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const STEPS = [
  { label: "Personal Info", icon: User },
  { label: "Vehicle", icon: Car },
  { label: "Documents", icon: FileText },
];

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  dob: string;
  city: string;
  vehicleType: string;
  vehicleModel: string;
  regNumber: string;
  yearMfg: string;
  seatingCapacity: string;
  licenseNumber: string;
  aadhaarNumber: string;
  profilePhoto: File | null;
  rcPhoto: File | null;
  agreed: boolean;
};

const initial: FormData = {
  fullName: "",
  phone: "",
  email: "",
  dob: "",
  city: "",
  vehicleType: "",
  vehicleModel: "",
  regNumber: "",
  yearMfg: "",
  seatingCapacity: "",
  licenseNumber: "",
  aadhaarNumber: "",
  profilePhoto: null,
  rcPhoto: null,
  agreed: false,
};

export default function DriverRegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initial);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const rcInputRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof FormData, v: any) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const validateStep = () => {
    if (step === 0) {
      if (!form.fullName || !form.phone || !form.dob || !form.city) {
        toast.error("Please fill all required fields");
        return false;
      }
      if (form.phone.length < 10) {
        toast.error("Enter a valid 10-digit phone number");
        return false;
      }
    }
    if (step === 1) {
      if (
        !form.vehicleType ||
        !form.vehicleModel ||
        !form.regNumber ||
        !form.yearMfg
      ) {
        toast.error("Please fill all vehicle details");
        return false;
      }
    }
    if (step === 2) {
      if (!form.licenseNumber || !form.aadhaarNumber) {
        toast.error("Driving license and Aadhaar are required");
        return false;
      }
      if (!form.agreed) {
        toast.error("Please accept the terms & conditions");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, 2));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleProfilePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    set("profilePhoto", file);
    const url = URL.createObjectURL(file);
    setProfilePreview(url);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1800));
    setSubmitting(false);
    toast.success(
      "Registration submitted! We'll verify and contact you within 24 hours.",
    );
    navigate({ to: "/login" });
  };

  const field = (
    label: string,
    key: keyof FormData,
    opts?: {
      type?: string;
      placeholder?: string;
      required?: boolean;
      hint?: string;
      maxLength?: number;
    },
  ) => (
    <div className="space-y-1.5">
      <Label className="text-white/80 text-sm">
        {label}{" "}
        {opts?.required !== false && <span className="text-orange-400">*</span>}
      </Label>
      <Input
        data-ocid={`driver_register.${key}_input`}
        type={opts?.type ?? "text"}
        placeholder={opts?.placeholder ?? ""}
        maxLength={opts?.maxLength}
        value={(form[key] as string) ?? ""}
        onChange={(e) => set(key, e.target.value)}
        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl focus:border-blue-400"
      />
      {opts?.hint && <p className="text-white/30 text-xs">{opts.hint}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 flex flex-col items-center px-4 py-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      <div className="w-full max-w-sm relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/login" data-ocid="driver_register.link">
            <button
              type="button"
              className="p-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div className="flex items-center gap-2">
            <Mountain className="w-6 h-6 text-orange-400" />
            <span className="text-white font-bold text-lg">
              Driver Registration
            </span>
          </div>
        </div>

        {/* Step progress */}
        <div className="flex items-center gap-2 mb-6">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const done = i < step;
            const active = i === step;
            return (
              <div key={s.label} className="flex-1">
                <div
                  className={`flex items-center gap-1.5 rounded-xl px-2 py-1.5 transition-all ${
                    active
                      ? "bg-blue-600/60 border border-blue-400/40"
                      : done
                        ? "bg-green-600/20 border border-green-400/20"
                        : "bg-white/5 border border-white/10"
                  }`}
                >
                  {done ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  ) : (
                    <Icon
                      className={`w-3.5 h-3.5 shrink-0 ${active ? "text-blue-300" : "text-white/30"}`}
                    />
                  )}
                  <span
                    className={`text-xs font-medium truncate ${active ? "text-white" : done ? "text-green-300" : "text-white/30"}`}
                  >
                    {s.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-white/50 text-xs mb-3 text-right">
          Step {step + 1} of {STEPS.length}
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <h2 className="text-white font-semibold text-base mb-2">
                  Personal Information
                </h2>
                {field("Full Name", "fullName", {
                  placeholder: "Ramesh Kumar",
                })}
                <div className="space-y-1.5">
                  <Label className="text-white/80 text-sm">
                    Phone <span className="text-orange-400">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-3 text-white/60 text-sm font-medium shrink-0">
                      +91
                    </div>
                    <Input
                      data-ocid="driver_register.phone_input"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="9876543210"
                      value={form.phone}
                      onChange={(e) =>
                        set("phone", e.target.value.replace(/\D/g, ""))
                      }
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl focus:border-blue-400"
                    />
                  </div>
                </div>
                {field("Email (optional)", "email", {
                  type: "email",
                  placeholder: "ramesh@email.com",
                  required: false,
                })}
                {field("Date of Birth", "dob", { placeholder: "DD/MM/YYYY" })}
                {field("City / District", "city", {
                  placeholder: "Dehradun, Rishikesh, Haridwar...",
                  hint: "Where you'll operate primarily",
                })}
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <h2 className="text-white font-semibold text-base mb-2">
                  Vehicle Details
                </h2>
                <div className="space-y-1.5">
                  <Label className="text-white/80 text-sm">
                    Vehicle Type <span className="text-orange-400">*</span>
                  </Label>
                  <Select
                    value={form.vehicleType}
                    onValueChange={(v) => set("vehicleType", v)}
                  >
                    <SelectTrigger
                      data-ocid="driver_register.select"
                      className="bg-white/10 border-white/20 text-white rounded-xl focus:border-blue-400"
                    >
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent className="bg-blue-950 border-white/20 text-white">
                      <SelectItem value="car">Car</SelectItem>
                      <SelectItem value="two-wheeler">Two-Wheeler</SelectItem>
                      <SelectItem value="bus">Bus</SelectItem>
                      <SelectItem value="tempo">Tempo Traveler</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {field("Vehicle Model", "vehicleModel", {
                  placeholder: "Alto, Activa, Innova...",
                })}
                {field("Registration Number", "regNumber", {
                  placeholder: "UK07 AB 1234",
                })}
                {field("Year of Manufacture", "yearMfg", {
                  placeholder: "2020",
                  type: "number",
                })}
                {field("Seating Capacity", "seatingCapacity", {
                  placeholder: "5",
                  type: "number",
                })}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <h2 className="text-white font-semibold text-base mb-2">
                  Documents & Verification
                </h2>
                {field("Driving License Number", "licenseNumber", {
                  placeholder: "UK0720XXXXXXXX",
                })}
                <div className="space-y-1.5">
                  <Label className="text-white/80 text-sm">
                    Aadhaar Number <span className="text-orange-400">*</span>
                  </Label>
                  <Input
                    data-ocid="driver_register.aadhaarNumber_input"
                    type="text"
                    inputMode="numeric"
                    maxLength={14}
                    placeholder="XXXX XXXX XXXX"
                    value={form.aadhaarNumber}
                    onChange={(e) => {
                      const raw = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 12);
                      const masked = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
                      set("aadhaarNumber", masked);
                    }}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl focus:border-blue-400 tracking-wider"
                  />
                </div>

                {/* Profile photo */}
                <div className="space-y-1.5">
                  <Label className="text-white/80 text-sm">Profile Photo</Label>
                  <button
                    type="button"
                    data-ocid="driver_register.upload_button"
                    onClick={() => profileInputRef.current?.click()}
                    className="w-full flex items-center gap-3 bg-white/10 border border-dashed border-white/30 rounded-xl p-3 cursor-pointer hover:bg-white/15 transition text-left"
                  >
                    {profilePreview ? (
                      <img
                        src={profilePreview}
                        alt="Profile preview"
                        className="w-12 h-12 rounded-full object-cover border-2 border-orange-400"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <Upload className="w-5 h-5 text-white/40" />
                      </div>
                    )}
                    <div>
                      <p className="text-white/70 text-sm">
                        {form.profilePhoto
                          ? form.profilePhoto.name
                          : "Upload profile photo"}
                      </p>
                      <p className="text-white/30 text-xs">
                        JPG, PNG up to 5MB
                      </p>
                    </div>
                  </button>
                  <input
                    ref={profileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePhoto}
                  />
                </div>

                {/* RC Photo */}
                <div className="space-y-1.5">
                  <Label className="text-white/80 text-sm">
                    Vehicle RC Photo
                  </Label>
                  <button
                    type="button"
                    data-ocid="driver_register.rc_upload_button"
                    onClick={() => rcInputRef.current?.click()}
                    className="w-full flex items-center gap-3 bg-white/10 border border-dashed border-white/30 rounded-xl p-3 cursor-pointer hover:bg-white/15 transition text-left"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <FileText
                        className={`w-5 h-5 ${form.rcPhoto ? "text-green-400" : "text-white/40"}`}
                      />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">
                        {form.rcPhoto
                          ? form.rcPhoto.name
                          : "Upload RC document"}
                      </p>
                      <p className="text-white/30 text-xs">
                        JPG, PNG, PDF up to 5MB
                      </p>
                    </div>
                  </button>
                  <input
                    ref={rcInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) =>
                      set("rcPhoto", e.target.files?.[0] ?? null)
                    }
                  />
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 pt-1">
                  <Checkbox
                    data-ocid="driver_register.checkbox"
                    id="terms"
                    checked={form.agreed}
                    onCheckedChange={(v) => set("agreed", !!v)}
                    className="border-white/30 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 mt-0.5"
                  />
                  <Label
                    htmlFor="terms"
                    className="text-white/60 text-sm leading-relaxed cursor-pointer"
                  >
                    I agree to the{" "}
                    <span className="text-orange-400 underline">
                      Terms & Conditions
                    </span>{" "}
                    and consent to background verification by PITTHU.
                  </Label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <Button
                data-ocid="driver_register.secondary_button"
                variant="outline"
                onClick={handleBack}
                className="flex-1 border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-xl h-11"
              >
                Back
              </Button>
            )}
            {step < 2 ? (
              <Button
                data-ocid="driver_register.primary_button"
                onClick={handleNext}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl h-11 font-semibold"
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                data-ocid="driver_register.submit_button"
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 bg-orange-500 hover:bg-orange-400 text-white rounded-xl h-11 font-semibold"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                )}
                {submitting ? "Submitting..." : "Submit Registration"}
              </Button>
            )}
          </div>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          Already registered?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
