import { Link } from "@tanstack/react-router";
import { ArrowLeft, FileText } from "lucide-react";
import { motion } from "motion/react";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By downloading, registering, or using the PITTHU application, you agree to be bound by these Terms and Conditions.",
      "If you do not agree to these terms, you must not use the PITTHU services.",
      "These terms constitute a legally binding agreement between you and PITTHU Technologies Pvt. Ltd.",
    ],
  },
  {
    title: "2. User Obligations",
    content: [
      "You must be at least 18 years of age to use PITTHU services.",
      "You must provide accurate and truthful information during registration.",
      "You are responsible for maintaining the confidentiality of your account credentials.",
      "You agree not to use the platform for any illegal, fraudulent, or abusive activities.",
      "You must comply with all applicable Indian laws and regulations while using PITTHU.",
      "You agree not to impersonate any person or entity or misrepresent your affiliation.",
    ],
  },
  {
    title: "3. Driver Terms & Obligations",
    content: [
      "Drivers must possess a valid Indian driving license appropriate for the vehicle category.",
      "Vehicles must be registered, insured, and comply with all local transport regulations.",
      "Drivers must maintain a minimum rating of 3.5 stars to remain active on the platform.",
      "Aggressive behavior, route manipulation, or fraudulent billing will result in immediate ban.",
      "Drivers are independent contractors, not employees of PITTHU Technologies Pvt. Ltd.",
      "Earnings are subject to PITTHU platform commission as communicated during onboarding.",
    ],
  },
  {
    title: "4. Booking & Cancellation Policy",
    content: [
      "Bookings are confirmed upon successful payment or cash agreement with the assigned driver.",
      "Free cancellation is allowed within 2 minutes of booking confirmation.",
      "Cancellations after 2 minutes may attract a cancellation fee of ₹30–₹100 depending on ride type.",
      "No-show cancellations (driver waiting > 5 minutes) will be charged the full cancellation fee.",
      "Drone delivery bookings are non-refundable once the drone is dispatched.",
      "PITTHU reserves the right to cancel bookings in case of adverse weather or safety concerns.",
    ],
  },
  {
    title: "5. Payment Terms",
    content: [
      "All fares displayed are estimates. Final fare may vary due to traffic, route changes, or waiting time.",
      "PITTHU Wallet funds are non-transferable and non-refundable except as per refund policy.",
      "Failed transactions will be reversed within 5–7 working days to the original payment source.",
      "Any pricing errors will be corrected and users notified before payment confirmation.",
      "Surge pricing may apply during peak hours, festivals, or adverse weather conditions in Uttarakhand.",
    ],
  },
  {
    title: "6. Safety & Emergency",
    content: [
      "PITTHU provides an SOS button for emergencies that alerts our safety team and your emergency contacts.",
      "Riders and drivers must wear seatbelts at all times on hill routes as per Motor Vehicles Act.",
      "PITTHU cooperates fully with police and emergency services during incidents.",
      "Any safety violation reported with evidence will result in immediate account suspension pending investigation.",
    ],
  },
  {
    title: "7. Limitation of Liability",
    content: [
      "PITTHU acts as a technology platform connecting riders and drivers, and is not liable for accidents or mishaps.",
      "PITTHU's maximum liability for any claim shall not exceed the fare paid for that specific booking.",
      "We are not liable for delays due to natural disasters, landslides, or government-imposed restrictions — events common in Uttarakhand hill regions.",
    ],
  },
  {
    title: "8. Governing Law & Dispute Resolution",
    content: [
      "These terms are governed by the laws of India, specifically applicable to Uttarakhand jurisdiction.",
      "Any disputes shall first be attempted to be resolved through mediation.",
      "Unresolved disputes shall be subject to exclusive jurisdiction of courts in Dehradun, Uttarakhand.",
      "Users may escalate complaints to the National Consumer Helpline (1800-11-4000) if unresolved by PITTHU.",
    ],
  },
  {
    title: "9. Contact",
    content: [
      "PITTHU Technologies Pvt. Ltd.",
      "Email: contact@pitthu.in | Legal: legal@pitthu.in",
      "Address: Dehradun, Uttarakhand, India - 248001",
      "Grievance Officer: Luv Maithani | +91-135-748848",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 text-white pb-10">
      {/* Header */}
      <div
        className="px-4 py-6 flex items-center gap-3"
        style={{ background: "linear-gradient(135deg, #C2410C, #F97316)" }}
      >
        <Link to="/">
          <button
            type="button"
            className="p-2 rounded-xl hover:bg-white/10 transition-colors"
            data-ocid="terms.button"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Terms &amp; Conditions</h1>
            <p className="text-white/60 text-xs">Last updated: March 2026</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-6 max-w-2xl mx-auto">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 mb-6"
        >
          <p className="text-white/80 text-sm leading-relaxed">
            Welcome to <strong>PITTHU</strong> — Uttarakhand's ride booking and
            drone delivery platform. Please read these Terms and Conditions
            carefully before using our services. These terms govern your use of
            the PITTHU mobile application and related services.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5"
              data-ocid="terms.panel"
            >
              <h2 className="font-bold text-orange-300 mb-3">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.content.map((item) => (
                  <li
                    key={item.slice(0, 20)}
                    className="flex items-start gap-2 text-sm text-white/75 leading-relaxed"
                  >
                    <span className="text-orange-400 mt-0.5 shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center text-white/40 text-xs">
          By using PITTHU services, you acknowledge that you have read,
          understood, and agreed to these Terms and Conditions. PITTHU reserves
          the right to update these terms with 30 days notice to registered
          users.
        </div>
      </div>
    </div>
  );
}
