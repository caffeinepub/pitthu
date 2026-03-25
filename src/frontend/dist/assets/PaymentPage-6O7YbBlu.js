import { c as createLucideIcon, o as useNavigate, u as useSearch, g as getAllBookings, r as reactExports, j as jsxRuntimeExports, m as motion, B as Badge, A as AnimatePresence, n as Button, aj as Copy, ak as updateBookingPayment, k as ue } from "./index-BdPBuX-3.js";
import { A as ArrowLeft } from "./arrow-left-DoS-GzhD.js";
import { C as CircleCheckBig } from "./circle-check-big-CGzblwc0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
];
const Smartphone = createLucideIcon("smartphone", __iconNode);
const OWNER_UPI_ID = "admin@okhdfcbank";
const APP_NAME = "PITTHU";
function buildUpiLink(amount, bookingId) {
  const tn = encodeURIComponent(`${APP_NAME} Ride ${bookingId}`);
  const pn = encodeURIComponent(APP_NAME);
  return `upi://pay?pa=${OWNER_UPI_ID}&pn=${pn}&am=${amount}&cu=INR&tn=${tn}`;
}
function QrCode({ upiLink }) {
  const src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-3 rounded-2xl shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: "UPI QR Code", className: "w-44 h-44" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-xs text-center", children: "Scan with any UPI app (Google Pay, PhonePe, Paytm)" })
  ] });
}
function PaymentPage() {
  const navigate = useNavigate();
  const searchRaw = useSearch({ strict: false });
  const searchBookingId = searchRaw.bookingId ? String(searchRaw.bookingId) : "";
  const searchFare = searchRaw.fare ? Number(searchRaw.fare) : 0;
  const booking = getAllBookings().find((b) => b.bookingId === searchBookingId);
  const bookingId = searchBookingId || (booking == null ? void 0 : booking.bookingId) || "";
  const fare = searchFare || (booking == null ? void 0 : booking.fare) || 0;
  const [selected, setSelected] = reactExports.useState("gpay");
  const [showQr, setShowQr] = reactExports.useState(false);
  const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
  const upiLink = buildUpiLink(fare, bookingId);
  reactExports.useEffect(() => {
    if ((booking == null ? void 0 : booking.paymentStatus) === "paid") {
      navigate({ to: "/booking-status", search: { bookingId } });
    }
  }, [booking == null ? void 0 : booking.paymentStatus, bookingId, navigate]);
  const handleGpayClick = () => {
    if (isMobile) {
      window.location.href = upiLink;
    } else {
      setShowQr(true);
    }
  };
  const handleIvePaid = (method) => {
    updateBookingPayment(bookingId, method);
    ue.success("Payment confirmed! Your ride is booked ✓");
    navigate({ to: "/booking-status", search: { bookingId } });
  };
  const handleCash = () => {
    updateBookingPayment(bookingId, "cash");
    ue.success("Cash payment noted. Pay driver on arrival.");
    navigate({ to: "/booking-status", search: { bookingId } });
  };
  const copyUpiId = () => {
    navigator.clipboard.writeText(OWNER_UPI_ID).then(() => ue.success("UPI ID copied!"));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-10 bg-slate-950/80 backdrop-blur border-b border-white/10 px-4 py-3 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/book-ride" }),
          className: "p-2 rounded-full hover:bg-white/10 transition-colors",
          "data-ocid": "payment.close_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-base", children: "Complete Payment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/40 text-xs", children: [
          "Booking #",
          bookingId
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto px-4 py-6 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          className: "bg-white/5 border border-white/10 rounded-2xl p-5",
          "data-ocid": "payment.card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-sm mb-1", children: "Amount to pay" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-4xl font-extrabold text-white", children: [
              "₹",
              fare
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs mt-1", children: "Paid via UPI" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs uppercase tracking-widest font-semibold", children: "Select Payment Method" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            whileTap: { scale: 0.98 },
            onClick: () => setSelected("gpay"),
            "data-ocid": "payment.tab",
            className: `w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${selected === "gpay" ? "border-green-500 bg-green-500/10" : "border-white/10 bg-white/5 hover:border-white/20"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-extrabold text-xl",
                  style: {
                    background: "linear-gradient(135deg,#4285F4,#34A853,#FBBC05,#EA4335)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  },
                  children: "G"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-white", children: "Google Pay" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs", children: "Instant UPI transfer" })
              ] }),
              selected === "gpay" && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500/20 text-green-400 border-green-500/30 text-xs", children: "Recommended" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            whileTap: { scale: 0.98 },
            onClick: () => setSelected("upi"),
            "data-ocid": "payment.tab",
            className: `w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${selected === "upi" ? "border-blue-400 bg-blue-500/10" : "border-white/10 bg-white/5 hover:border-white/20"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-6 h-6 text-blue-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-white", children: "PhonePe / Paytm / Other UPI" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs", children: "Pay via any UPI app" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            whileTap: { scale: 0.98 },
            onClick: () => setSelected("cash"),
            "data-ocid": "payment.tab",
            className: `w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${selected === "cash" ? "border-amber-400 bg-amber-500/10" : "border-white/10 bg-white/5 hover:border-white/20"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-amber-600/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "💵" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-white", children: "Cash" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs", children: "Pay driver on arrival" })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
        selected === "gpay" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -10 },
            className: "space-y-4",
            children: [
              !showQr ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: handleGpayClick,
                  "data-ocid": "payment.primary_button",
                  className: "w-full h-14 rounded-2xl text-base font-bold bg-green-500 hover:bg-green-400 text-white shadow-lg shadow-green-500/30",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "mr-2 font-extrabold text-lg",
                        style: {
                          background: "linear-gradient(135deg,#fff,#d0ffd0)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent"
                        },
                        children: "G"
                      }
                    ),
                    isMobile ? "Open Google Pay" : "Show QR Code"
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-white text-center", children: "Scan with Google Pay or any UPI app" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { upiLink }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 w-full", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "flex-1 text-white/80 text-sm font-mono", children: OWNER_UPI_ID }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: copyUpiId,
                      className: "text-white/50 hover:text-white transition-colors",
                      "data-ocid": "payment.secondary_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: () => handleIvePaid("gpay"),
                  variant: "outline",
                  "data-ocid": "payment.confirm_button",
                  className: "w-full h-12 rounded-2xl border-green-500/40 bg-green-500/10 text-green-400 hover:bg-green-500/20 font-semibold",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 mr-2" }),
                    "I've Paid ✓"
                  ]
                }
              )
            ]
          },
          "gpay-action"
        ),
        selected === "upi" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -10 },
            className: "space-y-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { upiLink }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 w-full", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "flex-1 text-white/80 text-sm font-mono", children: OWNER_UPI_ID }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: copyUpiId,
                      className: "text-white/50 hover:text-white transition-colors",
                      "data-ocid": "payment.secondary_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] }),
              isMobile && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => {
                    window.location.href = upiLink;
                  },
                  "data-ocid": "payment.primary_button",
                  className: "w-full h-14 rounded-2xl text-base font-bold bg-blue-600 hover:bg-blue-500 text-white",
                  children: "Open UPI App"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: () => handleIvePaid("upi"),
                  variant: "outline",
                  "data-ocid": "payment.confirm_button",
                  className: "w-full h-12 rounded-2xl border-blue-400/40 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 font-semibold",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 mr-2" }),
                    "I've Paid ✓"
                  ]
                }
              )
            ]
          },
          "upi-action"
        ),
        selected === "cash" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -10 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-amber-300 text-sm font-medium", children: [
                  "💵 Pay ₹",
                  fare,
                  " in cash to your driver on arrival."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs mt-1", children: "Driver will confirm receipt once the ride is complete." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: handleCash,
                  "data-ocid": "payment.primary_button",
                  className: "w-full h-14 rounded-2xl text-base font-bold bg-amber-500 hover:bg-amber-400 text-slate-900",
                  children: "Confirm Cash Booking"
                }
              )
            ]
          },
          "cash-action"
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-white/25 text-xs", children: [
        "Payments go directly to ",
        OWNER_UPI_ID,
        " — powered by UPI"
      ] })
    ] })
  ] });
}
export {
  PaymentPage as default
};
