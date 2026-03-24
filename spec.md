# PITTHU — Full UI Overhaul (Version 6)

## Current State
PITTHU v5 is a fully functional multi-modal travel + drone delivery app for Uttarakhand with:
- LandingPage, BookRidePage, DroneDeliveryPage, TripTrackingPage, SafetyHubPage, AIConciergePage, ProfilePage, MyBookingsPage, AdminPage, LeaderboardPage
- Persistent bottom navigation, header, dark mode, language toggle
- Backend: booking creation via Internet Identity auth
- Design: blue (#primary) + orange (brand-orange) palette, Montserrat headings, card-based layouts
- Known issues: LandingPage has nesting bugs (sections inside sections), wildlife ticker overlaps hero, some cards lack visual polish

## Requested Changes (Diff)

### Add
- Vehicle selection carousel on LandingPage (Cars: Hatchback, Sedan, SUV, Luxury, Electric; Two Wheelers: Scooty, Bike, EV Scooter) with price + ETA chips
- Quick booking bar (pickup + drop inputs) directly on the hero section
- Glassmorphism hero card overlaying the hero image with the booking bar
- Weather alerts strip (rain, landslide) as a dedicated banner component
- Map/tracking visual mockup screen with route preview, driver ETA pin, live tracking dots
- Voice booking UI button (mic icon with ripple animation) on BookRidePage
- Drone delivery live tracking screen with animated drone path
- Payment screen UI: UPI (GPay, PhonePe, Paytm), Cash, Wallet with fare breakdown
- Safety features prominent section: SOS emergency button, Share Trip CTA, Driver badge

### Modify
- LandingPage: fix section nesting bug, make hero fullscreen mobile-first, add glassmorphism booking bar overlay on hero
- LandingPage: restructure sections in correct DOM order (wildlife ticker → hero stats → booking widget → vehicle carousel → destinations → testimonials → blogs → CTA)
- BookRidePage: add vehicle type carousel (car variants + two-wheelers) replacing plain ride type selector
- index.css: elevate design tokens for stronger blue-orange gradient feel, richer glassmorphism shadows
- BottomNav: ensure consistent active state, smooth transitions
- All Cards: apply consistent glassmorphism style with backdrop-blur and subtle gradient borders

### Remove
- No features removed

## Implementation Plan
1. Fix LandingPage section nesting (sections nested inside sections) — structural cleanup
2. Redesign LandingPage hero with glassmorphism booking bar overlay (pickup + drop + Book Ride CTA)
3. Add vehicle selection carousel to LandingPage with all 8 vehicle types, price + ETA
4. Add weather alerts component (rain/landslide) below hero stats
5. Redesign BookRidePage ride-type selector as a visual vehicle carousel
6. Add voice booking mic button (animated) to BookRidePage
7. Enhance PaymentScreen within BookRidePage with UPI/Cash/Wallet tabs + fare breakdown
8. Add SOS + Share Trip buttons to TripTrackingPage and BookRidePage summary
9. Update index.css with richer glassmorphism tokens and blue-orange gradient system
10. Ensure all pages are mobile-first with proper spacing and typography
