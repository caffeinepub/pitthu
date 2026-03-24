import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import {
  CalendarCheck,
  Camera,
  Check,
  ChevronLeft,
  Copy,
  Package,
  Pencil,
  Trophy,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PitthuCoinsWallet from "../components/PitthuCoinsWallet";
import { useLanguage } from "../contexts/LanguageContext";
import { useHaptic } from "../hooks/useHaptic";

const REFERRAL_CODE = "PITTHU-MT42";

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [homeAddress, setHomeAddress] = useState(
    localStorage.getItem("pitthu-home") || "",
  );
  const [workAddress, setWorkAddress] = useState(
    localStorage.getItem("pitthu-work") || "",
  );
  const [coins, setCoins] = useState(0);
  const [referOpen, setReferOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { tap } = useHaptic();
  const { t } = useLanguage();

  useEffect(() => {
    setCoins(Number(localStorage.getItem("pitthu-coins") || "0"));
  }, []);

  const saveProfile = () => {
    tap();
    localStorage.setItem("pitthu-home", homeAddress);
    localStorage.setItem("pitthu-work", workAddress);
    setEditMode(false);
    toast.success("Profile saved!");
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatarSrc(ev.target?.result as string);
      toast.success("Profile photo updated!");
    };
    reader.readAsDataURL(file);
  };

  const copyReferral = () => {
    tap();
    navigator.clipboard.writeText(REFERRAL_CODE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-muted py-10 px-4">
      <div className="max-w-md mx-auto">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 font-montserrat text-sm uppercase"
          data-ocid="profile.secondary_button"
        >
          <ChevronLeft className="w-4 h-4" /> {t("back")}
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Avatar card */}
          <Card className="shadow-card">
            <CardContent className="pt-8 pb-6 flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={avatarSrc || undefined} />
                  <AvatarFallback className="bg-brand-orange text-white text-2xl font-montserrat font-bold">
                    MT
                  </AvatarFallback>
                </Avatar>
                <label
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer shadow hover:bg-primary/90"
                  aria-label="Upload photo"
                  data-ocid="profile.upload_button"
                >
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </label>
              </div>
              <div className="text-center">
                <h1 className="font-montserrat font-black uppercase text-xl text-foreground">
                  Mountain Traveler
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Uttarakhand Explorer
                </p>
              </div>
              <div className="flex gap-8 mt-2">
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center text-brand-orange">
                    <CalendarCheck className="w-4 h-4" />
                    <span className="font-montserrat font-black text-xl">
                      3
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground uppercase font-montserrat tracking-wider">
                    Bookings
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center text-brand-orange">
                    <Package className="w-4 h-4" />
                    <span className="font-montserrat font-black text-xl">
                      2
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground uppercase font-montserrat tracking-wider">
                    Drone
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pitthu Coins */}
          <PitthuCoinsWallet coins={coins} className="w-full" />

          {/* Addresses */}
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-montserrat uppercase text-base">
                  Saved Addresses
                </CardTitle>
                <button
                  type="button"
                  onClick={() => {
                    tap();
                    setEditMode(!editMode);
                  }}
                  className="flex items-center gap-1.5 text-primary text-sm font-medium"
                  data-ocid="profile.edit_button"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  {editMode ? "Cancel" : t("edit")}
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="home-addr">{t("homeAddress")}</Label>
                <Input
                  id="home-addr"
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                  placeholder="e.g., 15 Gandhi Road, Dehradun"
                  disabled={!editMode}
                  data-ocid="profile.input"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="work-addr">{t("workAddress")}</Label>
                <Input
                  id="work-addr"
                  value={workAddress}
                  onChange={(e) => setWorkAddress(e.target.value)}
                  placeholder="e.g., IT Park, Sahastradhara Road"
                  disabled={!editMode}
                  data-ocid="profile.input"
                />
              </div>
              {editMode && (
                <Button
                  onClick={saveProfile}
                  className="w-full bg-primary text-primary-foreground rounded-full font-montserrat font-bold uppercase"
                  data-ocid="profile.save_button"
                >
                  {t("save")} Addresses
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Link to="/my-bookings">
              <Button
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-montserrat font-bold uppercase rounded-full"
                data-ocid="profile.primary_button"
                onClick={() => tap()}
              >
                My Bookings
              </Button>
            </Link>
            <Link to="/leaderboard">
              <Button
                variant="outline"
                className="w-full font-montserrat font-bold uppercase rounded-full flex items-center gap-2"
                data-ocid="profile.secondary_button"
                onClick={() => tap()}
              >
                <Trophy className="w-4 h-4" /> {t("leaderboard")}
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full font-montserrat font-bold uppercase rounded-full"
              onClick={() => {
                tap();
                setReferOpen(true);
              }}
              data-ocid="profile.open_modal_button"
            >
              {t("referFriend")}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Refer & Earn Modal */}
      <Dialog open={referOpen} onOpenChange={setReferOpen}>
        <DialogContent className="sm:max-w-sm" data-ocid="profile.dialog">
          <DialogHeader>
            <DialogTitle className="font-montserrat uppercase text-center">
              Refer &amp; Earn
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Your friend gets <strong>\u20B9100 off</strong>, you earn{" "}
              <strong>500 Pitthu Coins!</strong>
            </p>
            <div className="bg-muted rounded-xl p-4 flex items-center justify-between gap-3">
              <span className="font-montserrat font-black text-xl text-foreground tracking-widest">
                {REFERRAL_CODE}
              </span>
              <button
                type="button"
                onClick={copyReferral}
                className="flex items-center gap-1.5 text-primary text-sm font-medium hover:text-primary/80"
                data-ocid="profile.button"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <Button
              className="w-full bg-brand-orange text-white font-montserrat font-bold uppercase rounded-full"
              onClick={() => {
                tap();
                setReferOpen(false);
              }}
              data-ocid="profile.confirm_button"
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
