import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Car, CheckCircle2, Package, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { useActor } from "../hooks/useActor";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminPage() {
  const { actor, isFetching } = useActor();

  const { data: isAdmin, isLoading: checkingAdmin } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });

  const { data: bookings, isLoading: loadingBookings } = useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookings();
    },
    enabled: !!actor && !isFetching && !!isAdmin,
  });

  if (checkingAdmin) {
    return (
      <div className="min-h-screen bg-muted py-12">
        <div
          className="container mx-auto px-4 max-w-5xl space-y-4"
          data-ocid="admin.loading_state"
        >
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-2xl p-12 text-center shadow-card max-w-md w-full"
          data-ocid="admin.error_state"
        >
          <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="font-montserrat font-black uppercase text-2xl text-foreground mb-2">
            Access Denied
          </h2>
          <p className="text-muted-foreground">
            You don't have admin privileges to view this page.
          </p>
        </motion.div>
      </div>
    );
  }

  const total = bookings?.length || 0;
  const pending =
    bookings?.filter((b) => (b.status as unknown as string) === "pending")
      .length || 0;
  const completed =
    bookings?.filter((b) => (b.status as unknown as string) === "completed")
      .length || 0;
  const cancelled =
    bookings?.filter((b) => (b.status as unknown as string) === "cancelled")
      .length || 0;

  return (
    <div className="min-h-screen bg-muted py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-montserrat font-black uppercase text-2xl text-foreground mb-1">
            Admin Panel
          </h1>
          <p className="text-muted-foreground">Manage all PITTHU bookings</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total",
              value: total,
              icon: BookOpen,
              color: "text-primary",
            },
            {
              label: "Pending",
              value: pending,
              icon: Package,
              color: "text-yellow-600",
            },
            {
              label: "Completed",
              value: completed,
              icon: CheckCircle2,
              color: "text-emerald-600",
            },
            {
              label: "Cancelled",
              value: cancelled,
              icon: XCircle,
              color: "text-red-500",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="shadow-card" data-ocid="admin.card">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    <div>
                      <p className="font-montserrat font-black text-2xl text-foreground">
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bookings table */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-montserrat uppercase text-lg">
              All Bookings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loadingBookings ? (
              <div className="p-6 space-y-3" data-ocid="admin.loading_state">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto" data-ocid="admin.table">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Fare</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings?.map((booking, i) => {
                      const isRide = booking.bookingType.__kind__ === "ride";
                      const from =
                        booking.bookingType.__kind__ === "ride"
                          ? booking.bookingType.ride.pickupLocation.address
                          : booking.bookingType.drone.pickupLocation.address;
                      const to =
                        booking.bookingType.__kind__ === "ride"
                          ? booking.bookingType.ride.dropoffLocation.address
                          : booking.bookingType.drone.dropoffLocation.address;
                      const status = booking.status as unknown as string;
                      return (
                        <TableRow
                          key={String(booking.id)}
                          data-ocid={`admin.row.${i + 1}`}
                        >
                          <TableCell className="font-mono text-xs">
                            #{String(booking.id).padStart(4, "0")}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              {isRide ? (
                                <Car className="w-3.5 h-3.5 text-primary" />
                              ) : (
                                <Package className="w-3.5 h-3.5 text-blue-500" />
                              )}
                              <span className="text-sm capitalize">
                                {isRide ? "Ride" : "Drone"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{from}</TableCell>
                          <TableCell className="text-sm">{to}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`text-xs ${statusColors[status] || ""}`}
                            >
                              {status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-montserrat font-bold text-sm">
                            ₹{Number(booking.price)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {(!bookings || bookings.length === 0) && (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center text-muted-foreground py-8"
                          data-ocid="admin.empty_state"
                        >
                          No bookings yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
