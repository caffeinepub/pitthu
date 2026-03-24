import { Outlet } from "@tanstack/react-router";
import BottomNav from "./BottomNav";
import Footer from "./Footer";
import Header from "./Header";
import OfflineBanner from "./OfflineBanner";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <OfflineBanner />
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>
      <Footer className="hidden md:block" />
      <BottomNav />
    </div>
  );
}
