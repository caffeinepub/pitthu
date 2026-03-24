# PITTHU - Smart Travel & Safety + 3D Seat Selection Upgrade

## Current State
PITTHU is a full Uttarakhand travel/drone booking app with 50+ features across 5 modules. It has a persistent bottom nav, Book Ride page with basic SeatSelector component (flat grid), Drone Delivery page, Profile, Admin, Trip Tracking, Leaderboard pages. The SeatSelector is a simple colored grid with no vehicle shape or realistic styling.

## Requested Changes (Diff)

### Add
- **Smart Safety Hub page** (`/safety-hub`): Dashboard showing AI Road-Condition score per route ("Heavy slush at Khairna Bend"), Landslide Predictor with 2-hour warning zones, Dynamic Pahadi ETA (torque-based), Wildlife Alert feed (leopard/bear sightings), Offline Voice Nav dialect selector (Kumaoni/Garhwali toggle UI), Smart Group-Pooling matcher for remote temples.
- **AI Concierge page** (`/ai-concierge`): Trip Architect chatbot (vibe-based: "quiet mist and local food"), Multi-Modal Hub suggester (car → drone → mule), Permit Manager (scan ID, auto-apply), Battery-Drain Predictor widget, Memory Drone booking CTA, Curviness Filter (Scenic/Curvy vs Fast/Tunnel).
- **Drone Advanced page enhancements on `/drone-delivery`**: Follow My Trek Delivery mode, Reverse Logistics (Sample Collection) mode, Aarti Streaming mode, Payload Temperature AI widget, Precision Landing SLAM UI with targeting animation. Local Bazaar section (buy Pahadi daal/topis). Emergency Medicine-First mode toggle.
- **3D Realistic Seat Selector** — complete replacement of `SeatSelector.tsx`: 
  - Realistic top-view SVG vehicle shape (car/SUV for private, minibus for shared, full bus for bus)
  - Car: shows bonnet, windscreen, body outline, 4-5 seats arranged as per real car layout (front 2 seats including driver, rear bench 3 seats)
  - Bus: detailed top-view with roof outline, windows along sides, steering wheel at front, seats in 2+2 arrangement per row, aisle clearly visible
  - Seats are color-coded (available/selected/taken) with proper orientation and seat-back detail
  - "Row" labels on side, seat numbers inside each seat shape (oval/rectangular)
  - Animated seat selection with spring bounce
  - Legend below map
- Add Safety Hub and AI Concierge to bottom nav (or under a 'More' menu or as prominent cards on Home)
- Wildlife Alert widget on LandingPage hero section
- Add route for `/safety-hub` and `/ai-concierge` in App.tsx

### Modify
- `SeatSelector.tsx`: Full redesign to realistic top-view vehicle plan
- `BookRidePage.tsx`: Use new SeatSelector, add Pahadi ETA display, Curviness Filter toggle, Last-Mile Porter auto-trigger notice
- `LandingPage.tsx`: Add Wildlife Alert strip, AI Safety score for top routes, AI Concierge CTA section
- `BottomNav.tsx`: Add Safety and AI links or a 'More' overflow

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/components/RealisticSeatSelector.tsx` - full SVG-based top-view vehicle with realistic shapes for car, minibus, bus modes
2. Create `src/pages/SafetyHubPage.tsx` - AI road scores, landslide warnings, wildlife alerts, group pooling, dialect nav toggle
3. Create `src/pages/AIConciergePage.tsx` - chatbot UI, trip architect, permit manager, battery predictor, multi-modal hubs
4. Update `DroneDeliveryPage.tsx` - add Follow My Trek, Reverse Logistics, Aarti Streaming, Payload Temp, Medicine-First, Local Bazaar tabs/sections
5. Update `BookRidePage.tsx` - swap SeatSelector with RealisticSeatSelector, add Pahadi ETA, curviness filter
6. Update `LandingPage.tsx` - wildlife alert strip, safety score cards, AI Concierge CTA
7. Update `App.tsx` - add routes for safety-hub and ai-concierge
8. Update `BottomNav.tsx` - add links to new pages
