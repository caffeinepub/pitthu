import { c as createLucideIcon, a6 as useNavigate, r as reactExports, j as jsxRuntimeExports, m as motion, L as Link, l as Button, A as AnimatePresence, a8 as Label, I as Input, i as ue } from "./index-hZrb6ubp.js";
import { C as CircleCheckBig } from "./circle-check-big-CFFkneeh.js";
import { A as ArrowLeft } from "./arrow-left-DLIXcLlj.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode);
const UPI_APPS = [
  { name: "GPay", color: "#4285F4", initial: "G" },
  { name: "PhonePe", color: "#5F259F", initial: "P" },
  { name: "Paytm", color: "#00BAF2", initial: "T" }
];
function PaymentPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = reactExports.useState("cash");
  const [upiId, setUpiId] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [confirmed, setConfirmed] = reactExports.useState(false);
  const [bookingId] = reactExports.useState(
    () => `PTHU${Math.floor(Math.random() * 9e4 + 1e4)}`
  );
  const fare = 450;
  const handleConfirm = async () => {
    if (selected === "upi" && !upiId.includes("@")) {
      ue.error("Enter a valid UPI ID (e.g. name@upi)");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    setConfirmed(true);
  };
  if (confirmed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 text-white flex flex-col items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { scale: 0.5, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { type: "spring", stiffness: 200, damping: 15 },
        className: "text-center",
        "data-ocid": "payment.success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block", children: [
            [0, 1, 2, 3, 4, 5, 6, 7].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "absolute w-3 h-3 rounded-full",
                style: {
                  backgroundColor: i % 2 === 0 ? "#F97316" : "#3B82F6",
                  top: "50%",
                  left: "50%"
                },
                initial: { x: 0, y: 0, opacity: 1 },
                animate: {
                  x: Math.cos(i / 8 * Math.PI * 2) * 80,
                  y: Math.sin(i / 8 * Math.PI * 2) * 80,
                  opacity: 0
                },
                transition: { duration: 0.8, delay: 0.2 }
              },
              `dot-${i}`
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-12 h-12 text-green-400" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black text-white mb-2", children: "Booking Confirmed!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 mb-6", children: "Your ride has been booked successfully" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-left mb-6 max-w-xs mx-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-sm", children: "Booking ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-orange-400 text-sm", children: bookingId })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-sm", children: "Amount Paid" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-white", children: [
                "₹",
                fare
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-sm", children: "Payment" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white capitalize text-sm", children: selected === "wallet" ? "PITTHU Wallet" : selected.toUpperCase() })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full max-w-xs bg-gradient-to-r from-blue-600 to-orange-500 text-white font-bold rounded-2xl py-4 h-auto",
              "data-ocid": "payment.primary_button",
              children: "Back to Home"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/trip-tracking", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "w-full max-w-xs mt-3 border-white/20 text-white hover:bg-white/10 rounded-2xl py-3 h-auto",
              "data-ocid": "payment.secondary_button",
              children: "Track Ride"
            }
          ) })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 text-white pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/10 backdrop-blur-md border-b border-white/20 px-4 py-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/" }),
          className: "p-2 rounded-xl hover:bg-white/10 transition-colors",
          "data-ocid": "payment.button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold", children: "Choose Payment Method" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-6 max-w-md mx-auto space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-blue-600/30 to-orange-500/30 backdrop-blur-md border border-white/20 rounded-2xl p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-sm mb-1", children: "Fare Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-4xl font-black text-white", children: [
            "₹",
            fare
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40 text-sm mb-1", children: "total" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-white/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Base Fare" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "₹320" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-white/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Hill Surcharge" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "₹80" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-white/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Taxes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "₹50" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-sm font-medium uppercase tracking-wider", children: "Select Payment Method" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.button,
        {
          type: "button",
          whileTap: { scale: 0.97 },
          onClick: () => setSelected("cash"),
          "data-ocid": "payment.radio",
          className: `w-full text-left bg-white/10 backdrop-blur-md border rounded-2xl p-4 transition-all ${selected === "cash" ? "border-orange-500 bg-orange-500/10" : "border-white/20 hover:border-white/40"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${selected === "cash" ? "bg-orange-500/20" : "bg-white/10"}`,
                children: "💵"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Cash" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-sm", children: "Pay after ride" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected === "cash" ? "border-orange-500 bg-orange-500" : "border-white/30"}`,
                children: selected === "cash" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-white" })
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          whileTap: { scale: 0.97 },
          className: `bg-white/10 backdrop-blur-md border rounded-2xl p-4 transition-all ${selected === "upi" ? "border-orange-500 bg-orange-500/10" : "border-white/20"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSelected("upi"),
                "data-ocid": "payment.radio",
                className: "w-full text-left",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${selected === "upi" ? "bg-orange-500/20" : "bg-white/10"}`,
                      children: "📱"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "UPI" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-sm", children: "GPay, PhonePe, Paytm" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected === "upi" ? "border-orange-500 bg-orange-500" : "border-white/30"}`,
                      children: selected === "upi" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-white" })
                    }
                  )
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selected === "upi" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { height: 0, opacity: 0 },
                animate: { height: "auto", opacity: 1 },
                exit: { height: 0, opacity: 0 },
                className: "overflow-hidden",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: UPI_APPS.map((app) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex-1 py-2 rounded-xl border border-white/20 text-center text-xs font-medium text-white/70",
                      style: { background: `${app.color}20` },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-7 h-7 rounded-full mx-auto mb-1 flex items-center justify-center text-sm font-bold text-white",
                            style: { background: app.color },
                            children: app.initial
                          }
                        ),
                        app.name
                      ]
                    },
                    app.name
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white/70 text-xs", children: "UPI ID" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        placeholder: "yourname@upi",
                        value: upiId,
                        onChange: (e) => setUpiId(e.target.value),
                        className: "bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-xl focus:border-blue-400",
                        "data-ocid": "payment.input"
                      }
                    )
                  ] })
                ] })
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.button,
        {
          type: "button",
          whileTap: { scale: 0.97 },
          onClick: () => setSelected("wallet"),
          "data-ocid": "payment.radio",
          className: `w-full text-left bg-white/10 backdrop-blur-md border rounded-2xl p-4 transition-all ${selected === "wallet" ? "border-orange-500 bg-orange-500/10" : "border-white/20 hover:border-white/40"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${selected === "wallet" ? "bg-orange-500/20" : "bg-white/10"}`,
                  children: "👛"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "PITTHU Wallet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-400 text-sm font-medium", children: "Balance: ₹2,450" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected === "wallet" ? "border-orange-500 bg-orange-500" : "border-white/30"}`,
                  children: selected === "wallet" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-white" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selected === "wallet" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { height: 0, opacity: 0 },
                animate: { height: "auto", opacity: 1 },
                exit: { height: 0, opacity: 0 },
                className: "overflow-hidden",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => ue.info("Top-up feature coming soon!"),
                    className: "mt-3 flex items-center gap-2 text-blue-400 text-sm font-medium hover:text-blue-300",
                    "data-ocid": "payment.secondary_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4" }),
                      " Add Money to Wallet"
                    ]
                  }
                )
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: handleConfirm,
          disabled: loading,
          className: "w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white font-bold rounded-2xl py-4 h-auto mt-2",
          "data-ocid": "payment.submit_button",
          children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.span,
              {
                animate: { rotate: 360 },
                transition: {
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear"
                },
                className: "inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              }
            ),
            "Processing..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5" }),
            " Confirm Payment ₹",
            fare
          ] })
        }
      )
    ] })
  ] });
}
export {
  PaymentPage as default
};
