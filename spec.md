# PITTHU - Real Earning System

## Current State
- Bookings stored with a `fare` field (total fare, no breakdown)
- AdminPage shows fare as a single number
- BookRidePage shows a fare breakdown (base fare, mountain surcharge, promo, pool split) but no platform commission or convenience fee
- No earningsStorage utility; no admin/driver earnings tracking
- AdminPage has no Earnings tab

## Requested Changes (Diff)

### Add
- `earningsStorage.ts` — utility to store/read admin and driver earnings per booking
- `commissionFee` (15% of base fare before surcharges) and `convenienceFee` (₹10 flat) to `StoredBooking`
- `driverEarnings` (fare - commission - convenience fee) and `adminEarnings` (commission + convenience fee) fields on booking
- Earnings Dashboard tab in AdminPage: total admin revenue, per-booking breakdown, driver payouts

### Modify
- `bookingStorage.ts` — add `commissionFee`, `convenienceFee`, `driverEarnings`, `adminEarnings` to `StoredBooking` interface
- `BookRidePage.tsx` — compute commission (15% of finalFare) and ₹10 convenience fee, show in fare breakdown, pass to `saveBooking`
- `AdminPage.tsx` — add Earnings tab with summary cards (total revenue, commissions, driver payouts) and per-booking earnings rows

### Remove
- Nothing

## Implementation Plan
1. Update `bookingStorage.ts`: add earnings fields to StoredBooking interface
2. Create `earningsStorage.ts`: helpers to compute totals from all bookings
3. Update `BookRidePage.tsx`: calculate commission=15% of finalFare, convenienceFee=₹10, driverPayout=finalFare-commission-convenienceFee; show in fare breakdown UI; pass all fields to saveBooking
4. Update `AdminPage.tsx`: add Earnings tab with revenue summary cards and per-booking breakdown table
