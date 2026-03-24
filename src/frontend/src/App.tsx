import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { createRootRoute, createRoute } from "@tanstack/react-router";
import Layout from "./components/Layout";
import BookRidePage from "./pages/BookRidePage";
import DroneDeliveryPage from "./pages/DroneDeliveryPage";
import LandingPage from "./pages/LandingPage";
import MyBookingsPage from "./pages/MyBookingsPage";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: Layout,
});

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

const routeTree = rootRoute.addChildren([
  indexRoute,
  bookRideRoute,
  droneDeliveryRoute,
  myBookingsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}
