import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { createRootRoute, createRoute } from "@tanstack/react-router";
import { Suspense, lazy, useState } from "react";
import Layout from "./components/Layout";
import OnboardingSlider from "./components/OnboardingSlider";
import SplashScreen from "./components/SplashScreen";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import AboutPage from "./pages/AboutPage";
import BookRidePage from "./pages/BookRidePage";
import DroneDeliveryPage from "./pages/DroneDeliveryPage";
import LandingPage from "./pages/LandingPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";

const TripTrackingPage = lazy(() => import("./pages/TripTrackingPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const LeaderboardPage = lazy(() => import("./pages/LeaderboardPage"));
const SafetyHubPage = lazy(() => import("./pages/SafetyHubPage"));
const AIConciergePage = lazy(() => import("./pages/AIConciergePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const DriverRegisterPage = lazy(() => import("./pages/DriverRegisterPage"));
const DriverDashboardPage = lazy(() => import("./pages/DriverDashboardPage"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const BookingStatusPage = lazy(() => import("./pages/BookingStatusPage"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen bg-muted p-8 space-y-4">
    <Skeleton className="h-8 w-64" />
    <Skeleton className="h-64 w-full rounded-xl" />
    <Skeleton className="h-40 w-full rounded-xl" />
  </div>
);

const rootRoute = createRootRoute({ component: Layout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});
const bookRideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/book-ride",
  component: BookRidePage,
});
const droneDeliveryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/drone-delivery",
  component: DroneDeliveryPage,
});
const myBookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/my-bookings",
  component: MyBookingsPage,
});
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});
const tripTrackingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/trip-tracking",
  validateSearch: (search: Record<string, unknown>) => ({
    bookingId: String(search.bookingId || ""),
  }),
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TripTrackingPage />
    </Suspense>
  ),
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminPage />
    </Suspense>
  ),
});
const leaderboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/leaderboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LeaderboardPage />
    </Suspense>
  ),
});
const safetyHubRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/safety-hub",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SafetyHubPage />
    </Suspense>
  ),
});
const aiConciergeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai-concierge",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AIConciergePage />
    </Suspense>
  ),
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LoginPage />
    </Suspense>
  ),
});
const driverRegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/driver-register",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DriverRegisterPage />
    </Suspense>
  ),
});
const driverDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/driver-dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DriverDashboardPage />
    </Suspense>
  ),
});
const paymentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PaymentPage />
    </Suspense>
  ),
});
const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy-policy",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PrivacyPolicyPage />
    </Suspense>
  ),
});
const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TermsPage />
    </Suspense>
  ),
});
const bookingStatusRoute = createRoute({
  validateSearch: (search: Record<string, unknown>) => ({
    bookingId: String(search.bookingId || ""),
  }),
  getParentRoute: () => rootRoute,
  path: "/booking-status",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BookingStatusPage />
    </Suspense>
  ),
});
const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFoundPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  bookRideRoute,
  droneDeliveryRoute,
  myBookingsRoute,
  profileRoute,
  aboutRoute,
  tripTrackingRoute,
  adminRoute,
  leaderboardRoute,
  safetyHubRoute,
  aiConciergeRoute,
  loginRoute,
  driverRegisterRoute,
  driverDashboardRoute,
  paymentRoute,
  privacyPolicyRoute,
  termsRoute,
  bookingStatusRoute,
  notFoundRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function AppContent() {
  const [showSplash, setShowSplash] = useState(
    () => sessionStorage.getItem("pitthu-splashed") !== "true",
  );
  const [onboarded, setOnboarded] = useState(
    () => localStorage.getItem("pitthu-onboarded") === "true",
  );

  const handleSplashComplete = () => {
    sessionStorage.setItem("pitthu-splashed", "true");
    setShowSplash(false);
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem("pitthu-onboarded", "true");
    setOnboarded(true);
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      {!onboarded && !showSplash && (
        <OnboardingSlider onComplete={handleOnboardingComplete} />
      )}
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
