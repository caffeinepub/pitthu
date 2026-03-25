import { j as jsxRuntimeExports, L as Link, S as Shield, m as motion } from "./index-hZrb6ubp.js";
import { A as ArrowLeft } from "./arrow-left-DLIXcLlj.js";
const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "Personal Information: Name, phone number, email address, and profile photo when you register.",
      "Location Data: Real-time GPS location for booking rides and deliveries, pickup/drop coordinates.",
      "Device Information: Device type, operating system, IP address, and app version.",
      "Usage Data: App interaction logs, booking history, preferences, and settings.",
      "Payment Information: Transaction records, UPI IDs (never stored in full), and wallet balance."
    ]
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "To facilitate ride bookings and drone deliveries across Uttarakhand.",
      "To match you with available drivers and track ride progress in real-time.",
      "To process payments and maintain your PITTHU Wallet balance.",
      "To send booking confirmations, OTPs, and ride updates via SMS/notifications.",
      "To improve our services, detect fraud, and ensure safety of all users.",
      "To provide Uttarakhand-specific weather alerts and hill route optimization."
    ]
  },
  {
    title: "3. Data Storage & Security",
    content: [
      "All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.",
      "User data is stored on secure servers hosted within India, complying with IT Act 2000.",
      "We retain active user data for the duration of account existence plus 5 years.",
      "Deleted accounts are fully purged within 30 days of deletion request.",
      "Regular security audits and penetration testing are conducted quarterly."
    ]
  },
  {
    title: "4. Data Sharing",
    content: [
      "We share your name and phone with your assigned driver for coordination purposes only.",
      "We do NOT sell your personal data to third parties under any circumstances.",
      "We may share data with law enforcement agencies only when legally mandated.",
      "Anonymized, aggregated data may be used for traffic analysis and route optimization."
    ]
  },
  {
    title: "5. Your Rights",
    content: [
      "Access: Request a full copy of all personal data we hold about you.",
      "Correction: Update or correct any inaccurate information in your profile.",
      "Deletion: Request permanent deletion of your account and associated data.",
      "Portability: Export your booking history and account data in standard formats.",
      "Opt-out: Unsubscribe from marketing communications at any time from Profile Settings."
    ]
  },
  {
    title: "6. Cookies & Tracking",
    content: [
      "We use essential cookies for app functionality such as session management and authentication.",
      "Analytics cookies (anonymized) help us understand app usage patterns.",
      "You may disable non-essential cookies via your device browser settings."
    ]
  },
  {
    title: "7. Children's Privacy",
    content: [
      "PITTHU services are intended for users aged 18 years and above.",
      "We do not knowingly collect data from minors. If discovered, such data is immediately deleted."
    ]
  },
  {
    title: "8. Contact Us",
    content: [
      "Privacy Officer: Luv Maithani, PITTHU Technologies Pvt. Ltd.",
      "Email: contact@pitthu.in",
      "Address: Dehradun, Uttarakhand, India - 248001",
      "Phone: +91-135-PITTHU (748-848)",
      "Response time: Within 72 hours for all privacy-related requests."
    ]
  }
];
function PrivacyPolicyPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 text-white pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-4 py-6 flex items-center gap-3",
        style: { background: "linear-gradient(135deg, #1E3A8A, #1E40AF)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "p-2 rounded-xl hover:bg-white/10 transition-colors",
              "data-ocid": "privacy.button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold", children: "Privacy Policy" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs", children: "Last updated: March 2026" })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-6 max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 mb-6",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/80 text-sm leading-relaxed", children: [
            "PITTHU Technologies Pvt. Ltd. (",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: '"PITTHU"' }),
            ") is committed to protecting your privacy. This policy explains how we collect, use, store, and share your personal information when you use the PITTHU app or website for ride booking and drone delivery services across Uttarakhand, India."
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: sections.map((section, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: idx * 0.05 },
          className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5",
          "data-ocid": "privacy.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-orange-300 mb-3", children: section.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: section.content.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-start gap-2 text-sm text-white/75 leading-relaxed",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5 shrink-0", children: "•" }),
                  item
                ]
              },
              item.slice(0, 20)
            )) })
          ]
        },
        section.title
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 text-center text-white/40 text-xs", children: "By using PITTHU, you agree to this Privacy Policy. We may update this policy periodically — continued use constitutes acceptance of any changes." })
    ] })
  ] });
}
export {
  PrivacyPolicyPage as default
};
