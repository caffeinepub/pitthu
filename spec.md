# PITTHU

## Current State

A driver system already exists with:
- Login page (`/login`) with Rider/Driver tabs; driver tab sets role to `driver` and redirects to `/driver-dashboard`
- `DriverDashboardPage.tsx` shows pending bookings (Available tab) and active rides (My Rides tab) with accept/reject, start ride, complete ride actions
- `bookingStorage.ts` handles status transitions: pending → accepted → ongoing → completed
- `userStorage.ts` stores roles; driver role assigned on Driver tab login

## Requested Changes (Diff)

### Add
- Auto-refresh polling every 8 seconds for new bookings (no more stale list without manual refresh)
- Completed rides tab showing finished rides with earnings summary
- Driver-only guard: redirect to `/login` if user is not logged in or not a driver/admin
- Booking count badge on header showing live pending rides count
- Storage event listener for cross-tab sync (booking created in another tab instantly appears)
- Online/Offline status toggle for driver (when offline, driver won't see new rides)

### Modify
- `loadBookings` to also load completed bookings for the new completed tab
- Stats card: make "Today" earning calculate from completed bookings of current session
- "My Rides" tab to show accepted + ongoing only (not completed, which goes to new tab)

### Remove
- Nothing removed

## Implementation Plan

1. In `DriverDashboardPage.tsx`:
   - Add `useEffect` interval (8s) for auto-refresh + `storage` event listener for cross-tab updates
   - Add `completedBookings` state filtered to `status === "completed"`
   - Add driver guard: check `user` from `useAuth`, if not present or `user.role` not `driver`/`admin`, redirect to `/login`
   - Add three tabs: `available`, `myrides`, `completed`
   - Calculate today's earnings from `completedBookings` (sum of `driverEarnings` or `fare * 0.85`)
   - Add online/offline toggle switch with `isOnline` state; when offline hide new pending bookings from available list
2. No backend or routing changes needed
