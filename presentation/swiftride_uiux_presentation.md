# 🚖 SwiftRide Ecosystem — Complete UI/UX Presentation & Module Architecture

> **SwiftRide v4.0.2** is an enterprise-grade ride-hailing & logistics ecosystem engineered for Metro Manila. This presentation showcases the UI/UX architecture, visual hierarchy, mobile device simulators, and real-time operations dashboard across all modules.

---

## 🌐 1. Web Portal & Landing Page

The landing portal serves as the primary gateway for riders, driver applicants, and enterprise clients. It features interactive ride fare estimation, fleet showcase, quick booking modals, and driver application portals.

![SwiftRide Web Portal Landing Page](C:/Users/xivaM/.gemini/antigravity-cli/brain/4f42dda0-736f-4ee6-884b-8ec90a1a832c/screenshots/01_web_landing.png)

### Key Features & UX Highlights:
- **Hero & Fare Estimator:** Real-time fare calculation across Metro Manila locations (BGC, Makati, NAIA Terminal 3, Ortigas).
- **Vehicle Options Modal:** Visual selection between Sedan, SUV, Van, and Motorcycle fleets with capacity and base fare rules.
- **Driver Recruitment Gateway:** Quick application submission flow with document uploads.

---

## ⚡ 2. Dual Live Simulator (Bento Grid)

The Dual Live Simulator enables simultaneous side-by-side simulation of the Passenger Mobile App, Driver Partner Mobile App, and central telemetry pipeline in real time.

![Dual Live Simulator Bento Grid Showcase](C:/Users/xivaM/.gemini/antigravity-cli/brain/4f42dda0-736f-4ee6-884b-8ec90a1a832c/screenshots/02_dual_simulator.png)

### Live Telemetry & Metrics:
- **Dispatch Queue:** Real-time matching between rider requests and nearest online drivers.
- **Fleet Performance Bar Chart:** Hourly trip volume analytics with optimal throughput status.
- **System Health Monitor:** Live latency, tariff rules synchronization, and payment gateway health.

---

## 📱 3. Passenger Mobile Application

Designed with an ultra-clean mobile-first interface optimized for fast 1-tap bookings, saved locations, live trip tracking, and direct driver chat.

````carousel
![03 Passenger Home Screen](C:/Users/xivaM/.gemini/antigravity-cli/brain/4f42dda0-736f-4ee6-884b-8ec90a1a832c/screenshots/03_passenger_home.png)
<!-- slide -->
![04 Passenger Book Ride Screen](C:/Users/xivaM/.gemini/antigravity-cli/brain/4f42dda0-736f-4ee6-884b-8ec90a1a832c/screenshots/04_passenger_book.png)
<!-- slide -->
![05 Passenger Ride History Screen](C:/Users/xivaM/.gemini/antigravity-cli/brain/4f42dda0-736f-4ee6-884b-8ec90a1a832c/screenshots/05_passenger_history.png)
<!-- slide -->
![06 Passenger Driver Chat Screen](C:/Users/xivaM/.gemini/antigravity-cli/brain/4f42dda0-736f-4ee6-884b-8ec90a1a832c/screenshots/06_passenger_chat.png)
<!-- slide -->
![07 Passenger User Profile Screen](C:/Users/xivaM/.gemini/antigravity-cli/brain/4f42dda0-736f-4ee6-884b-8ec90a1a832c/screenshots/07_passenger_profile.png)
````

### Module Breakdown:
1. **Home Screen:** Quick destination lookup, saved locations (Home, Work), active promo banners, and category selectors.
2. **Book Ride Screen:** Vehicle category picker (Sedan, SUV, Van, Motorcycle), estimated ETA, payment method selection (Cash, GCash, Maya, Wallet), and instant dispatch.
3. **Ride History:** Detailed ledger of completed, cancelled, and active trips with receipt breakdown and rebooking triggers.
4. **Driver Chat:** Real-time messaging channel with driver, pre-set quick replies, and call triggers.
5. **Passenger Profile:** Rating score, wallet balance top-up, payment methods, saved places, and account settings.

---

## 🚘 4. Driver Partner Mobile Application

Built specifically for drivers on the road with high contrast controls, 30-second accept countdown timer, active navigation telemetry, and daily earnings breakdown.

````carousel
![08 Driver Partner Home Screen](C:/Users/xivaM/.gemini/antigravity-cli/brain/4f42dda0-736f-4ee6-884b-8ec90a1a832c/screenshots/08_driver_home.png)
<!-- slide -->
![09 Driver Partner Trips Screen](C:/Users/xivaM/.gemini/antigravity-cli/brain/4f42dda0-736f-4ee6-884b-8ec90a1a832c/screenshots/09_driver_trips.png)
<!-- slide -->
![10 Driver Partner Earnings Screen](C:/Users/xivaM/.gemini/antigravity-cli/brain/4f42dda0-736f-4ee6-884b-8ec90a1a832c/screenshots/10_driver_earnings.png)
<!-- slide -->
![11 Driver Partner Chat Screen](C:/Users/xivaM/.gemini/antigravity-cli/brain/4f42dda0-736f-4ee6-884b-8ec90a1a832c/screenshots/11_driver_chat.png)
<!-- slide -->
![12 Driver Partner Profile Screen](C:/Users/xivaM/.gemini/antigravity-cli/brain/4f42dda0-736f-4ee6-884b-8ec90a1a832c/screenshots/12_driver_profile.png)
````

### Module Breakdown:
1. **Driver Home:** Online/Offline toggle, live heatmap radar, active job offer cards with pick-up/drop-off distance, fare calculation, and accept button.
2. **Trips Ledger:** Completed trip log with individual trip earnings, distance traveled, and customer rating breakdown.
3. **Earnings & Wallet:** Daily/Weekly income charts, total trip count, online hours tracked, and cashout payout request tools.
4. **Passenger Chat:** In-transit direct chat channel for coordinate updates and arrival notifications.
5. **Driver Profile:** Plate number, vehicle specs, document verification status (License, NBI, OR/CR), acceptance rate, and overall rating.

---

## 🛡️ 5. Admin Operations Dashboard

A central control tower providing dispatch overview, live GPS vehicle radar, driver onboarding audits, financial commission settlement, and customer support incident management.

````carousel
![13 Admin Dashboard Overview](C:/Users/xivaM/.gemini/antigravity-cli/brain/4f42dda0-736f-4ee6-884b-8ec90a1a832c/screenshots/13_admin_overview.png)
<!-- slide -->
![14 Admin Live Map Radar](C:/Users/xivaM/.gemini/antigravity-cli/brain/4f42dda0-736f-4ee6-884b-8ec90a1a832c/screenshots/14_admin_live_map.png)
<!-- slide -->
![15 Admin Bookings & Dispatch Audit](C:/Users/xivaM/.gemini/antigravity-cli/brain/4f42dda0-736f-4ee6-884b-8ec90a1a832c/screenshots/15_admin_bookings.png)
<!-- slide -->
![16 Admin Driver Fleet Approvals](C:/Users/xivaM/.gemini/antigravity-cli/brain/4f42dda0-736f-4ee6-884b-8ec90a1a832c/screenshots/16_admin_drivers.png)
<!-- slide -->
![17 Admin Passenger Directory](C:/Users/xivaM/.gemini/antigravity-cli/brain/4f42dda0-736f-4ee6-884b-8ec90a1a832c/screenshots/17_admin_passengers.png)
<!-- slide -->
![18 Admin Revenue & Earnings Analytics](C:/Users/xivaM/.gemini/antigravity-cli/brain/4f42dda0-736f-4ee6-884b-8ec90a1a832c/screenshots/18_admin_earnings.png)
<!-- slide -->
![19 Admin Support & Safety Desk](C:/Users/xivaM/.gemini/antigravity-cli/brain/4f42dda0-736f-4ee6-884b-8ec90a1a832c/screenshots/19_admin_support.png)
````

### Module Breakdown:
1. **Overview Panel:** Platform KPI summary (Total Passengers, Active Drivers, Revenue Today, Growth Metrics) and real-time activity feed.
2. **Live Fleet Radar:** Interactive map showing real-time GPS coordinates of online driver partners across Metro Manila.
3. **Bookings & Dispatch Audit:** Comprehensive ride table with status filtering, fare verification, distance, and timestamps.
4. **Driver Fleet Management:** Onboarding application queue, document approval/rejection workflows, and driver rating monitor.
5. **Passenger Directory:** User profiles, rating audits, completed trips count, and account statuses.
6. **Revenue & Commission:** Platform cut calculations (15% net commission), gross volume tracking, and financial analytics.
7. **Support & Safety Desk:** Incident ticketing system with priority tags, status updates, and user messaging logs.

---

## 🎨 6. Design System Specifications

| Component | Specification / Value |
| :--- | :--- |
| **Primary Accent Color** | Amber Gold (`#F59E0B` / `bg-amber-500`) |
| **Dark Palette** | Pure Black (`#000000`), Zinc 950 (`#09090B`), Zinc 900 (`#18181B`) |
| **Typography** | Inter & Display sans-serif, Mono for telemetry/data values |
| **Component Layout** | Bento Grid system with high-contrast borders (`border-zinc-800`) |
| **Icons** | Lucide React Icon Suite |
| **Map Rendering** | Leaflet / MapLibre GL / OpenStreetMap with dark custom tiles |

---

> [!NOTE]
> All captured screenshots were automatically rendered and captured from the active dev environment running at `http://localhost:3000`.
