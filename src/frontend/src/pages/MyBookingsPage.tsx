import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen,
  Calendar,
  Car,
  Loader2,
  LogIn,
  MapPin,
  Package,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import type { Booking } from "../backend.d";
import { Status } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useCancelBooking, useGetUserBookings } from "../hooks/useQueries";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

function BookingCard({ booking, index }: { booking: Booking; index: number }) {
  const { mutateAsync: cancelBooking, isPending } = useCancelBooking();
  const isRide = booking.bookingType.__kind__ === "ride";

  const handleCancel = async () => {
    try {
      await cancelBooking(booking.id);
      toast.success("Booking cancelled successfully");
    } catch {
      toast.error("Failed to cancel booking");
    }
  };

  const statusStr = booking.status as unknown as string;
  const date = new Date(Number(booking.time) / 1_000_000).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      data-ocid={`bookings.item.${index + 1}`}
    >
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isRide
                    ? "bg-primary/10 text-primary"
                    : "bg-brand-orange/10 text-brand-orange"
                }`}
              >
                {isRide ? (
                  <Car className="w-5 h-5" />
                ) : (
                  <Package className="w-5 h-5" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-montserrat font-bold text-foreground">
                    {isRide ? "Ride Booking" : "Drone Delivery"}
                  </h3>
                  <Badge
                    className={`text-xs border ${statusColors[statusStr] || ""}`}
                    variant="outline"
                  >
                    {statusStr}
                  </Badge>
                </div>

                {isRide && booking.bookingType.__kind__ === "ride" && (
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>
                        {booking.bookingType.ride.pickupLocation.address} →{" "}
                        {booking.bookingType.ride.dropoffLocation.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>
                        {Number(booking.bookingType.ride.passengers)} passenger
                        {Number(booking.bookingType.ride.passengers) !== 1
                          ? "s"
                          : ""}
                      </span>
                    </div>
                  </div>
                )}

                {!isRide && booking.bookingType.__kind__ === "drone" && (
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>
                        {booking.bookingType.drone.pickupLocation.address} →{" "}
                        {booking.bookingType.drone.dropoffLocation.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>
                        {booking.bookingType.drone.packageDescription} (
                        {booking.bookingType.drone.packageWeight} kg)
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{date}</span>
                  </div>
                  <span className="font-montserrat font-bold text-primary text-sm">
                    ₹{Number(booking.price)}
                  </span>
                </div>
              </div>
            </div>

            {statusStr === Status.pending || statusStr === Status.confirmed ? (
              <Button
                variant="outline"
                size="sm"
                disabled={isPending}
                onClick={handleCancel}
                className="text-destructive border-destructive/30 hover:bg-destructive/5 font-montserrat font-bold uppercase text-xs rounded-full"
                data-ocid={`bookings.delete_button.${index + 1}`}
              >
                {isPending ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  "Cancel"
                )}
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function MyBookingsPage() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const { data: bookings, isLoading, isError } = useGetUserBookings();

  if (!identity) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-2xl p-12 text-center shadow-card max-w-md w-full"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <LogIn className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-montserrat font-black uppercase text-2xl text-foreground mb-2">
            Sign In Required
          </h2>
          <p className="text-muted-foreground mb-8">
            Please sign in to view your bookings.
          </p>
          <Button
            onClick={login}
            disabled={isLoggingIn}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-bold uppercase tracking-wider rounded-full w-full"
            data-ocid="bookings.primary_button"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-primary font-montserrat font-bold uppercase tracking-[0.2em] text-xs">
                PITTHU
              </p>
              <h1 className="font-montserrat font-black uppercase text-2xl text-foreground">
                My Bookings
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground">
            View and manage your ride and drone delivery bookings
          </p>
        </motion.div>

        {isLoading && (
          <div className="space-y-4" data-ocid="bookings.loading_state">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-64" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-12" data-ocid="bookings.error_state">
            <p className="text-destructive font-medium">
              Failed to load bookings. Please try again.
            </p>
          </div>
        )}

        {!isLoading && !isError && bookings?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
            data-ocid="bookings.empty_state"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-montserrat font-bold uppercase text-xl text-foreground mb-2">
              No Bookings Yet
            </h3>
            <p className="text-muted-foreground mb-8">
              You haven't made any bookings yet. Start your mountain journey
              today!
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href="/book-ride">
                <Button
                  className="bg-primary text-primary-foreground rounded-full font-montserrat font-bold uppercase"
                  data-ocid="bookings.primary_button"
                >
                  Book a Ride
                </Button>
              </a>
              <a href="/drone-delivery">
                <Button
                  variant="outline"
                  className="rounded-full font-montserrat font-bold uppercase"
                  data-ocid="bookings.secondary_button"
                >
                  Drone Delivery
                </Button>
              </a>
            </div>
          </motion.div>
        )}

        {!isLoading && !isError && bookings && bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map((booking, i) => (
              <BookingCard
                key={String(booking.id)}
                booking={booking}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
