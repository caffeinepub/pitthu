import { o as useNavigate, r as reactExports, j as jsxRuntimeExports, aa as Link, a9 as Mountain, U as User, d as Car, t as CircleCheck, A as AnimatePresence, m as motion, ac as Label, a2 as Input, D as Select, E as SelectTrigger, F as SelectValue, H as SelectContent, I as SelectItem, ae as Checkbox, n as Button, af as ChevronRight, ag as LoaderCircle, k as ue } from "./index-DGBUShD2.js";
import { A as ArrowLeft } from "./arrow-left-jlm1km20.js";
import { F as FileText } from "./file-text-DNyLlrCP.js";
import { U as Upload } from "./upload-CagHwDww.js";
const STEPS = [
  { label: "Personal Info", icon: User },
  { label: "Vehicle", icon: Car },
  { label: "Documents", icon: FileText }
];
const initial = {
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
  agreed: false
};
function DriverRegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = reactExports.useState(0);
  const [form, setForm] = reactExports.useState(initial);
  const [profilePreview, setProfilePreview] = reactExports.useState(null);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const profileInputRef = reactExports.useRef(null);
  const rcInputRef = reactExports.useRef(null);
  const set = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));
  const validateStep = () => {
    if (step === 0) {
      if (!form.fullName || !form.phone || !form.dob || !form.city) {
        ue.error("Please fill all required fields");
        return false;
      }
      if (form.phone.length < 10) {
        ue.error("Enter a valid 10-digit phone number");
        return false;
      }
    }
    if (step === 1) {
      if (!form.vehicleType || !form.vehicleModel || !form.regNumber || !form.yearMfg) {
        ue.error("Please fill all vehicle details");
        return false;
      }
    }
    if (step === 2) {
      if (!form.licenseNumber || !form.aadhaarNumber) {
        ue.error("Driving license and Aadhaar are required");
        return false;
      }
      if (!form.agreed) {
        ue.error("Please accept the terms & conditions");
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
  const handleProfilePhoto = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
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
    ue.success(
      "Registration submitted! We'll verify and contact you within 24 hours."
    );
    navigate({ to: "/login" });
  };
  const field = (label, key, opts) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-white/80 text-sm", children: [
      label,
      " ",
      (opts == null ? void 0 : opts.required) !== false && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange-400", children: "*" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        "data-ocid": `driver_register.${key}_input`,
        type: (opts == null ? void 0 : opts.type) ?? "text",
        placeholder: (opts == null ? void 0 : opts.placeholder) ?? "",
        maxLength: opts == null ? void 0 : opts.maxLength,
        value: form[key] ?? "",
        onChange: (e) => set(key, e.target.value),
        className: "bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl focus:border-blue-400"
      }
    ),
    (opts == null ? void 0 : opts.hint) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/30 text-xs", children: opts.hint })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 flex flex-col items-center px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 overflow-hidden pointer-events-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", "data-ocid": "driver_register.link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "p-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { className: "w-6 h-6 text-orange-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-lg", children: "Driver Registration" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-6", children: STEPS.map((s, i) => {
        const Icon = s.icon;
        const done = i < step;
        const active = i === step;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center gap-1.5 rounded-xl px-2 py-1.5 transition-all ${active ? "bg-blue-600/60 border border-blue-400/40" : done ? "bg-green-600/20 border border-green-400/20" : "bg-white/5 border border-white/10"}`,
            children: [
              done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-green-400 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                Icon,
                {
                  className: `w-3.5 h-3.5 shrink-0 ${active ? "text-blue-300" : "text-white/30"}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs font-medium truncate ${active ? "text-white" : done ? "text-green-300" : "text-white/30"}`,
                  children: s.label
                }
              )
            ]
          }
        ) }, s.label);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-white/50 text-xs mb-3 text-right", children: [
        "Step ",
        step + 1,
        " of ",
        STEPS.length
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
          step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 30 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -30 },
              transition: { duration: 0.25 },
              className: "space-y-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold text-base mb-2", children: "Personal Information" }),
                field("Full Name", "fullName", {
                  placeholder: "Ramesh Kumar"
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-white/80 text-sm", children: [
                    "Phone ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange-400", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center bg-white/10 border border-white/20 rounded-xl px-3 text-white/60 text-sm font-medium shrink-0", children: "+91" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        "data-ocid": "driver_register.phone_input",
                        type: "tel",
                        inputMode: "numeric",
                        maxLength: 10,
                        placeholder: "9876543210",
                        value: form.phone,
                        onChange: (e) => set("phone", e.target.value.replace(/\D/g, "")),
                        className: "bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl focus:border-blue-400"
                      }
                    )
                  ] })
                ] }),
                field("Email (optional)", "email", {
                  type: "email",
                  placeholder: "ramesh@email.com",
                  required: false
                }),
                field("Date of Birth", "dob", { placeholder: "DD/MM/YYYY" }),
                field("City / District", "city", {
                  placeholder: "Dehradun, Rishikesh, Haridwar...",
                  hint: "Where you'll operate primarily"
                })
              ]
            },
            "step0"
          ),
          step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 30 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -30 },
              transition: { duration: 0.25 },
              className: "space-y-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold text-base mb-2", children: "Vehicle Details" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-white/80 text-sm", children: [
                    "Vehicle Type ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange-400", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: form.vehicleType,
                      onValueChange: (v) => set("vehicleType", v),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            "data-ocid": "driver_register.select",
                            className: "bg-white/10 border-white/20 text-white rounded-xl focus:border-blue-400",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select vehicle type" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-blue-950 border-white/20 text-white", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "car", children: "Car" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "two-wheeler", children: "Two-Wheeler" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "bus", children: "Bus" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "tempo", children: "Tempo Traveler" })
                        ] })
                      ]
                    }
                  )
                ] }),
                field("Vehicle Model", "vehicleModel", {
                  placeholder: "Alto, Activa, Innova..."
                }),
                field("Registration Number", "regNumber", {
                  placeholder: "UK07 AB 1234"
                }),
                field("Year of Manufacture", "yearMfg", {
                  placeholder: "2020",
                  type: "number"
                }),
                field("Seating Capacity", "seatingCapacity", {
                  placeholder: "5",
                  type: "number"
                })
              ]
            },
            "step1"
          ),
          step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 30 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -30 },
              transition: { duration: 0.25 },
              className: "space-y-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold text-base mb-2", children: "Documents & Verification" }),
                field("Driving License Number", "licenseNumber", {
                  placeholder: "UK0720XXXXXXXX"
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-white/80 text-sm", children: [
                    "Aadhaar Number ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange-400", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      "data-ocid": "driver_register.aadhaarNumber_input",
                      type: "text",
                      inputMode: "numeric",
                      maxLength: 14,
                      placeholder: "XXXX XXXX XXXX",
                      value: form.aadhaarNumber,
                      onChange: (e) => {
                        const raw = e.target.value.replace(/\D/g, "").slice(0, 12);
                        const masked = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
                        set("aadhaarNumber", masked);
                      },
                      className: "bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl focus:border-blue-400 tracking-wider"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white/80 text-sm", children: "Profile Photo" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "driver_register.upload_button",
                      onClick: () => {
                        var _a;
                        return (_a = profileInputRef.current) == null ? void 0 : _a.click();
                      },
                      className: "w-full flex items-center gap-3 bg-white/10 border border-dashed border-white/30 rounded-xl p-3 cursor-pointer hover:bg-white/15 transition text-left",
                      children: [
                        profilePreview ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: profilePreview,
                            alt: "Profile preview",
                            className: "w-12 h-12 rounded-full object-cover border-2 border-orange-400"
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5 text-white/40" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm", children: form.profilePhoto ? form.profilePhoto.name : "Upload profile photo" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/30 text-xs", children: "JPG, PNG up to 5MB" })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      ref: profileInputRef,
                      type: "file",
                      accept: "image/*",
                      className: "hidden",
                      onChange: handleProfilePhoto
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white/80 text-sm", children: "Vehicle RC Photo" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "driver_register.rc_upload_button",
                      onClick: () => {
                        var _a;
                        return (_a = rcInputRef.current) == null ? void 0 : _a.click();
                      },
                      className: "w-full flex items-center gap-3 bg-white/10 border border-dashed border-white/30 rounded-xl p-3 cursor-pointer hover:bg-white/15 transition text-left",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          FileText,
                          {
                            className: `w-5 h-5 ${form.rcPhoto ? "text-green-400" : "text-white/40"}`
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm", children: form.rcPhoto ? form.rcPhoto.name : "Upload RC document" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/30 text-xs", children: "JPG, PNG, PDF up to 5MB" })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      ref: rcInputRef,
                      type: "file",
                      accept: "image/*,.pdf",
                      className: "hidden",
                      onChange: (e) => {
                        var _a;
                        return set("rcPhoto", ((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Checkbox,
                    {
                      "data-ocid": "driver_register.checkbox",
                      id: "terms",
                      checked: form.agreed,
                      onCheckedChange: (v) => set("agreed", !!v),
                      className: "border-white/30 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 mt-0.5"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "terms",
                      className: "text-white/60 text-sm leading-relaxed cursor-pointer",
                      children: [
                        "I agree to the",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange-400 underline", children: "Terms & Conditions" }),
                        " ",
                        "and consent to background verification by PITTHU."
                      ]
                    }
                  )
                ] })
              ]
            },
            "step2"
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-6", children: [
          step > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "driver_register.secondary_button",
              variant: "outline",
              onClick: handleBack,
              className: "flex-1 border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-xl h-11",
              children: "Back"
            }
          ),
          step < 2 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              "data-ocid": "driver_register.primary_button",
              onClick: handleNext,
              className: "flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl h-11 font-semibold",
              children: [
                "Next ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-1" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              "data-ocid": "driver_register.submit_button",
              onClick: handleSubmit,
              disabled: submitting,
              className: "flex-1 bg-orange-500 hover:bg-orange-400 text-white rounded-xl h-11 font-semibold",
              children: [
                submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin mr-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 mr-2" }),
                submitting ? "Submitting..." : "Submit Registration"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-white/30 text-xs mt-6", children: [
        "Already registered?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "text-blue-400 hover:text-blue-300", children: "Login here" })
      ] })
    ] })
  ] });
}
export {
  DriverRegisterPage as default
};
