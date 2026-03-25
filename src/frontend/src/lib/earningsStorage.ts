import { getAllBookings } from "./bookingStorage";

export interface EarningsSummary {
  totalRevenue: number;
  totalAdminEarnings: number;
  totalDriverEarnings: number;
  totalCommission: number;
  totalConvenienceFees: number;
  completedRides: number;
}

export function getEarningsSummary(): EarningsSummary {
  const completed = getAllBookings().filter((b) => b.status === "completed");

  let totalRevenue = 0;
  let totalAdminEarnings = 0;
  let totalDriverEarnings = 0;
  let totalCommission = 0;
  let totalConvenienceFees = 0;

  for (const booking of completed) {
    const commissionFee =
      booking.commissionFee ?? Math.round(booking.fare * 0.15);
    const convenienceFee = booking.convenienceFee ?? 10;
    const driverEarnings =
      booking.driverEarnings ?? booking.fare - commissionFee;
    const adminEarnings =
      booking.adminEarnings ?? commissionFee + convenienceFee;

    totalRevenue += booking.fare + convenienceFee;
    totalCommission += commissionFee;
    totalConvenienceFees += convenienceFee;
    totalAdminEarnings += adminEarnings;
    totalDriverEarnings += driverEarnings;
  }

  return {
    totalRevenue,
    totalAdminEarnings,
    totalDriverEarnings,
    totalCommission,
    totalConvenienceFees,
    completedRides: completed.length,
  };
}
