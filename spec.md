# PITTHU - Admin Dashboard + Monetization System

## Current State
AdminPage.tsx exists but is basic: shows bookings table from backend actor, checks `isCallerAdmin()`. No user management, no driver assignment, no commission system, no earnings tracking.

BookRidePage.tsx has a booking flow with fare estimates but no commission/fee breakdown.

## Requested Changes (Diff)

### Add
- **Enhanced AdminPage**: Full admin dashboard with tabs: Overview, Bookings, Users, Drivers, Earnings
- **Commission system**: 15% platform commission + ₹10 convenience fee on each ride
- **FareBreakdown component**: Shows base fare, commission (15%), convenience fee (₹10), total
- **Admin Earnings tab**: Total revenue from commissions, per-booking breakdown, summary cards
- **Driver Earnings tab**: Per-driver earnings after commission deduction (driver gets 85% of base fare)
- **Mock data layer**: Since backend data may be limited, use rich mock data for the dashboard UI

### Modify
- **AdminPage**: Complete rewrite with full-featured dashboard
- **BookRidePage**: Add fare breakdown showing commission + convenience fee before confirmation
- **DriverDashboardPage**: Show earnings after commission (driver gets base fare minus 15%)

### Remove
- Nothing removed

## Implementation Plan

### Commission Logic
- Base fare: existing vehicle price
- Platform commission: 15% of base fare
- Convenience fee: ₹10 flat
- Total fare = base fare + convenience fee (commission is deducted from driver payout, not added to rider)
- Driver payout = base fare × 0.85
- Admin earnings per booking = (base fare × 0.15) + ₹10 convenience fee

### Admin Dashboard Tabs
1. **Overview**: Stats cards - Total Bookings, Active Rides, Total Revenue, Total Users, Total Drivers
2. **Bookings**: Full table with columns: BookingID, Rider, Pickup→Drop, Vehicle, Fare, Status, Driver, Actions (Assign Driver). Filter by status (All/Pending/Ongoing/Completed/Cancelled).
3. **Users**: Table of registered users with ride count and total spend
4. **Drivers**: Table of drivers with rides completed, earnings, rating, online status
5. **Earnings**: Revenue charts (mock), commission breakdown per booking, total admin revenue, driver payouts summary
