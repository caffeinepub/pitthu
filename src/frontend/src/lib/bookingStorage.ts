export type BookingStatus = "pending" | "accepted" | "ongoing" | "completed";

export interface StoredBooking {
  bookingId: string;
  userId: string;
  userName: string;
  phone: string;
  pickup: string;
  drop: string;
  vehicle: string;
  time: string; // ISO string
  status: BookingStatus;
  fare: number;
}

const KEY = "pitthu-bookings";

export function getAllBookings(): StoredBooking[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveBooking(booking: StoredBooking): void {
  const all = getAllBookings();
  all.unshift(booking);
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function updateBookingStatus(
  bookingId: string,
  status: BookingStatus,
): void {
  const all = getAllBookings().map((b) =>
    b.bookingId === bookingId ? { ...b, status } : b,
  );
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function generateBookingId(): string {
  return `BK${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
}
