import { c as createLucideIcon, j as jsxRuntimeExports, R as Root, C as Content, a as cn, b as Close, X, T as Title, P as Portal, O as Overlay, r as reactExports, m as motion, d as Car, e as Card, f as CardContent, G as GOOGLE_MAPS_API_KEY, g as GeminiRouteHappenings, B as Badge, S as Shield, h as Star, u as useHaptic, i as ue, k as Share2, l as Button } from "./index-hZrb6ubp.js";
import { P as Phone } from "./phone-Whwi7IBs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "sheet", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
const initialMessages = [
  { id: 1, sender: "driver", text: "Hi, I'm on my way! 👋", time: "10:15 AM" },
  {
    id: 2,
    sender: "driver",
    text: "I'll be there in 10 minutes.",
    time: "10:16 AM"
  },
  {
    id: 3,
    sender: "driver",
    text: "I've arrived at the pickup point.",
    time: "10:24 AM"
  }
];
function TripTrackingPage() {
  const [eta, setEta] = reactExports.useState(12);
  const [progress, setProgress] = reactExports.useState(0);
  const [sosOpen, setSosOpen] = reactExports.useState(false);
  const [chatOpen, setChatOpen] = reactExports.useState(false);
  const [messages, setMessages] = reactExports.useState(initialMessages);
  const [input, setInput] = reactExports.useState("");
  const { sos: hapticSos, tap } = useHaptic();
  const chatEndRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        return p + 0.5;
      });
      setEta((e) => Math.max(0, e - 0.1));
    }, 300);
    return () => clearInterval(timer);
  }, []);
  reactExports.useEffect(() => {
    var _a;
    (_a = chatEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, []);
  const handleSOS = () => {
    hapticSos();
    setSosOpen(true);
    ue.error("SOS alert sent to emergency contacts!");
  };
  const handleShareTrip = () => {
    tap();
    const fakeLink = `https://pitthu.ai/track/${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    navigator.clipboard.writeText(fakeLink).then(() => ue.success("Trip link copied! Share with loved ones.")).catch(() => ue.info(`Trip link: ${fakeLink}`));
  };
  const sendMessage = () => {
    if (!input.trim()) return;
    tap();
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: input.trim(),
        time: (/* @__PURE__ */ new Date()).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit"
        })
      }
    ]);
    setInput("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-muted pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8 max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "w-5 h-5 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-montserrat font-black uppercase text-xl text-foreground", children: "Live Trip Tracking" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Rishikesh → Kedarnath" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-700 text-xs font-montserrat font-bold uppercase", children: "Live" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-glass mb-6 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", "data-ocid": "tracking.canvas_target", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "iframe",
                {
                  src: `https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_MAPS_API_KEY}&origin=Rishikesh,Uttarakhand&destination=Kedarnath,Uttarakhand&mode=driving`,
                  width: "100%",
                  height: "224",
                  style: { border: 0 },
                  allowFullScreen: true,
                  loading: "lazy",
                  referrerPolicy: "no-referrer-when-downgrade",
                  title: "Trip route map"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white font-montserrat font-black text-sm uppercase", children: [
                  "ETA: ",
                  Math.ceil(eta),
                  " min"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-[10px]", children: "Rishikesh → Kedarnath" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-xl px-2 py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/80 text-[10px] font-medium", children: [
                Math.round(progress),
                "% complete"
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full bg-primary transition-all duration-300",
                style: { width: `${progress}%` }
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(GeminiRouteHappenings, { from: "Rishikesh", to: "Kedarnath" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-montserrat font-black text-xl flex-shrink-0", children: "RS" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-montserrat font-bold text-foreground", children: "Ramesh Singh" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-emerald-100 text-emerald-700 border-emerald-200 text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3 h-3 mr-1" }),
                    " Verified"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1", children: [
                  [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Star,
                    {
                      className: cn(
                        "w-3.5 h-3.5",
                        s <= 4 ? "text-yellow-400 fill-yellow-400" : "text-yellow-400/40"
                      )
                    },
                    s
                  )),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1", children: "4.8 (203 trips)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Tata Sumo Gold · UP07-AB-1234" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors",
                    onClick: () => {
                      tap();
                      ue.info("Calling driver...");
                    },
                    "aria-label": "Call driver",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors",
                    onClick: () => {
                      tap();
                      setChatOpen(true);
                    },
                    "aria-label": "Chat with driver",
                    "data-ocid": "tracking.open_modal_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 bg-primary/8 rounded-xl px-4 py-3 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-primary font-montserrat font-black text-2xl", children: [
                  "Arrives in ",
                  Math.ceil(eta),
                  " min"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: "Rishikesh → Kedarnath · 156 km" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "w-8 h-8 text-primary/40" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleSOS,
                className: "flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-montserrat font-black uppercase tracking-wider rounded-2xl py-4 text-sm transition-all active:scale-95 shadow-card",
                "data-ocid": "tracking.button",
                children: "🆘 SOS Emergency"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleShareTrip,
                className: "flex items-center justify-center gap-2 bg-card hover:bg-muted border border-border text-foreground font-montserrat font-bold uppercase tracking-wider rounded-2xl py-4 text-sm transition-all active:scale-95 shadow-card",
                "data-ocid": "tracking.secondary_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }),
                  " Share Trip"
                ]
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.button,
      {
        type: "button",
        onClick: handleSOS,
        whileTap: { scale: 0.9 },
        className: "fixed bottom-24 right-4 w-14 h-14 rounded-full bg-red-600 text-white font-montserrat font-black text-sm shadow-lg z-40 hover:bg-red-700 flex items-center justify-center",
        "data-ocid": "tracking.button",
        "aria-label": "SOS",
        children: "SOS"
      }
    ),
    sosOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: [1, 1.02, 1], opacity: 1 },
        transition: { duration: 0.4 },
        className: "bg-card rounded-2xl p-8 text-center max-w-sm w-full shadow-2xl border-2 border-red-500",
        "data-ocid": "tracking.modal",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-600 font-black text-2xl", children: "SOS" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-montserrat font-black uppercase text-xl text-foreground mb-2", children: "Emergency Alert Sent!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "Your location has been sent to emergency contacts:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-lg px-4 py-2 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-foreground", children: "+91-XXXXXXXXXX" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-foreground", children: "+91-XXXXXXXXXX" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => setSosOpen(false),
              className: "w-full bg-red-600 hover:bg-red-700 text-white font-montserrat font-bold uppercase rounded-full",
              "data-ocid": "tracking.close_button",
              children: "Close"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: chatOpen, onOpenChange: setChatOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SheetContent,
      {
        side: "bottom",
        className: "h-[70vh] flex flex-col p-0",
        "data-ocid": "tracking.sheet",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "px-4 py-3 border-b border-border flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "font-montserrat uppercase text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
            " Chat with Driver"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto px-4 py-3 space-y-3", children: [
            messages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: msg.text }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: `text-[10px] mt-1 ${msg.sender === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`,
                          children: msg.time
                        }
                      )
                    ]
                  }
                )
              },
              msg.id
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: chatEndRef })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 px-4 py-3 border-t border-border flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "flex-1 border border-input rounded-full px-4 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                placeholder: "Type a message...",
                value: input,
                onChange: (e) => setInput(e.target.value),
                onKeyDown: (e) => e.key === "Enter" && sendMessage(),
                "data-ocid": "tracking.input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: sendMessage,
                className: "w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90",
                "data-ocid": "tracking.primary_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" })
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
export {
  TripTrackingPage as default
};
