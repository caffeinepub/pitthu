import { createContext, useContext, useState } from "react";

type Lang = "en" | "hi";

const translations = {
  en: {
    home: "Home",
    bookings: "Bookings",
    drone: "Drone",
    profile: "Profile",
    bookNow: "Book Now",
    search: "Search",
    bookRide: "Book a Ride",
    droneDelivery: "Drone Delivery",
    myBookings: "My Bookings",
    from: "From",
    to: "To",
    date: "Date",
    passengers: "Passengers",
    confirmBooking: "Confirm Booking",
    bookDelivery: "Book Delivery",
    total: "Total",
    back: "Back",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    skip: "Skip",
    next: "Next",
    getStarted: "Get Started",
    notifications: "Notifications",
    markAllRead: "Mark all read",
    leaderboard: "Leaderboard",
    referFriend: "Refer a Friend",
    pitthuCoins: "Pitthu Coins",
    homeAddress: "Home Address",
    workAddress: "Work Address",
  },
  hi: {
    home: "होम",
    bookings: "बुकिंग",
    drone: "ड्रोन",
    profile: "प्रोफाइल",
    bookNow: "बुक करें",
    search: "खोजें",
    bookRide: "राइड बुक करें",
    droneDelivery: "ड्रोन डिलीवरी",
    myBookings: "मेरी बुकिंग",
    from: "से",
    to: "तक",
    date: "तारीख",
    passengers: "यात्री",
    confirmBooking: "बुकिंग कन्फर्म करें",
    bookDelivery: "डिलीवरी बुक करें",
    total: "कुल",
    back: "वापस",
    cancel: "रद्द करें",
    save: "सहेजें",
    edit: "संपादित करें",
    skip: "छोड़ें",
    next: "आगे",
    getStarted: "शुरू करें",
    notifications: "सूचनाएं",
    markAllRead: "सब पढ़ा",
    leaderboard: "लीडरबोर्ड",
    referFriend: "दोस्त को रेफर करें",
    pitthuCoins: "पिट्ठू कॉइन्स",
    homeAddress: "घर का पता",
    workAddress: "काम का पता",
  },
};

export type TranslationKeys = keyof typeof translations.en;

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggleLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem("pitthu-lang") as Lang) || "en";
  });

  const toggleLang = () => {
    const next = lang === "en" ? "hi" : "en";
    setLang(next);
    localStorage.setItem("pitthu-lang", next);
  };

  const t = (key: TranslationKeys): string => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
