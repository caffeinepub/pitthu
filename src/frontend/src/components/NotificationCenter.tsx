import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, CheckCheck } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    text: "Your driver Ramesh is 5 mins away 🚗",
    read: false,
    time: "2 min ago",
  },
  {
    id: 2,
    text: "Drone delivery confirmed for Kedarnath ✅",
    read: false,
    time: "15 min ago",
  },
  {
    id: 3,
    text: "Booking #1042 completed successfully 🎉",
    read: false,
    time: "1 hr ago",
  },
  {
    id: 4,
    text: "Special offer: Use MOUNTAIN20 for 20% off 🏔️",
    read: true,
    time: "3 hrs ago",
  },
  {
    id: 5,
    text: "Your referral earned ₹100 Pitthu Coins 🪙",
    read: true,
    time: "1 day ago",
  },
];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const { t } = useLanguage();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="relative w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          data-ocid="header.notification_button"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold flex items-center justify-center text-white">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 p-0 overflow-hidden"
        data-ocid="header.dropdown_menu"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h3 className="font-montserrat font-bold uppercase text-sm text-foreground">
            {t("notifications")}
          </h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllRead}
              className="text-xs text-primary h-6 px-2"
              data-ocid="header.confirm_button"
            >
              <CheckCheck className="w-3 h-3 mr-1" />
              {t("markAllRead")}
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((n) => (
            <DropdownMenuItem
              key={n.id}
              className={`flex flex-col items-start px-4 py-3 cursor-default gap-1 ${
                !n.read ? "bg-primary/5" : ""
              }`}
            >
              <div className="flex items-start gap-2 w-full">
                {!n.read && (
                  <span className="w-2 h-2 rounded-full bg-primary mt-1 flex-shrink-0" />
                )}
                <span className="text-sm text-foreground leading-snug flex-1">
                  {n.text}
                </span>
              </div>
              <span className="text-xs text-muted-foreground ml-4">
                {n.time}
              </span>
            </DropdownMenuItem>
          ))}
        </div>
        {unreadCount === 0 && (
          <div className="py-8 text-center text-sm text-muted-foreground">
            All caught up! 🎉
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
