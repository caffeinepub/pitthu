import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Location {
    address: string;
    coordinates: [number, number];
}
export type Time = bigint;
export type BookingType = {
    __kind__: "ride";
    ride: {
        dropoffLocation: Location;
        passengers: bigint;
        pickupLocation: Location;
    };
} | {
    __kind__: "drone";
    drone: {
        dropoffLocation: Location;
        packageWeight: number;
        pickupLocation: Location;
        packageDescription: string;
    };
};
export interface Booking {
    id: bigint;
    status: Status;
    time: Time;
    user: Principal;
    bookingType: BookingType;
    price: bigint;
}
export interface NewBooking {
    time: Time;
    bookingType: BookingType;
    price: bigint;
}
export enum Status {
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed",
    confirmed = "confirmed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    cancelBooking(bookingId: bigint): Promise<void>;
    createBooking(newBooking: NewBooking): Promise<bigint>;
    getAllBookings(): Promise<Array<Booking>>;
    getAllBookingsSorted(): Promise<Array<Booking>>;
    getBooking(bookingId: bigint): Promise<Booking | null>;
    getBookingsByStatus(status: Status): Promise<Array<Booking>>;
    getCallerUserRole(): Promise<UserRole>;
    getUserBookings(p: Principal): Promise<Array<Booking>>;
    isCallerAdmin(): Promise<boolean>;
}
