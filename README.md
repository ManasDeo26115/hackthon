# 🚩 शुभ यात्रा (Shubh Yatra)

> **"Every Trip. Every Rupee. Accounted For."**

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Contributors](#-contributors)
- [Key Features](#-key-features)
- [Hackathon Documentation Index](#-hackathon-documentation-index)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Quick Start Guide](#-quick-start-guide)
- [Mobile & Local Network Testing](#-mobile--local-network-testing)
- [Performance & Design Engineering](#-performance--design-engineering)
- [License](#-license)

---

## 📖 Overview

**शुभ यात्रा (Shubh Yatra)** is a modern, mobile-first web application designed specifically for Indian group travelers. 

During group trips across India, small cash or UPI expenses—such as FASTag tolls (₹120), chai & dhaba snacks (₹40), beach parking (₹50), and bottled water—often go unrecorded because opening a full expense app feels tedious. At the end of the trip, calculating who owes whom requires manual math, leading to awkward discussions.

**शुभ यात्रा** solves this by offering:
- 🫙 **5-Second Expense Entry** via an interactive "Forgotten Money Jar".
- 💰 **Upfront Common Pool Fund ("Trip Vault")** to pay group costs directly.
- 🤝 **Optimal Debt Minimization** with 1-tap `upi://pay` deep-links for GPay, PhonePe, and Paytm.
- 🚗 **Trip Host Approvals & 8-Character Trip Codes** for secure group joining.

---

## 👥 Contributors

| Avatar | Contributor | Role | Profile |
| :---: | :--- | :--- | :--- |
| <img src="https://github.com/ManasDeo26115.png" width="55px" style="border-radius:50%; margin:4px;"/> | **Manas Deo** | Creator & Lead Developer | [@ManasDeo26115](https://github.com/ManasDeo26115) |
| <img src="https://github.com/RajAdiiii09-ux.png" width="55px" style="border-radius:50%; margin:4px;"/> | **Raj Adiiii** | Contributor | [@RajAdiiii09-ux](https://github.com/RajAdiiii09-ux) |

---

## 🌟 Key Features

### 🫙 1. Editable "Forgotten Money Jar"
* **5-Second Quick Entry**: Tap emoji chips (Tolls 🚗, Water 💧, Snacks ☕, Parking 🅿️, Petrol ⛽) to record micro-expenses in seconds.
* **Inline Price Editing**: Click any price badge directly on the chip to edit amounts with quick preset modifiers (`+10`, `-10`, `+50`).
* **Custom Micro-Chips**: Create personalized expense chips with custom emojis, titles, and default values.
* **Glowing Glass Jar**: Visual 2X glass jar featuring dynamic fluid levels and ambient illumination that reacts as expenses add up.

### 💰 2. Trip Vault (Upfront Common Pool Fund)
* **Upfront Pool Collections**: Members contribute a set upfront amount (e.g. ₹2,000 each) into a shared trip vault.
* **Direct Vault Payments**: Pay common expenses (tolls, group meals) directly from the vault, eliminating micro-settlements entirely.
* **Real-time Balance Tracking**: Visual breakdown of remaining vault funds vs. total vault spending.

### 🚗 3. Trip ID & Host Approval Queue
* **Unique 8-Character Trip Codes**: Shareable trip keys (e.g., `GOA26X91`) with 1-click WhatsApp invite integration.
* **Trip Host Role**: The trip creator receives join requests and approves or rejects members before granting trip access.
* **Member Management**: Host can assign roles, set UPI IDs, and manage trip permissions.

### 📊 4. Smart Budget & Category Analytics
* **Color-Changing Progress Ring**: Dynamic indicator shifting from Green (<75%), Amber (75–99%), to Red Pulse (≥100% budget reached).
* **Category Spending Breakdown**: Interactive Recharts donut visualization categorizing expenses into *Travel, Fooding, Hotel, Activity, and Other*.

### 🤝 5. Optimal Debt Settlement & UPI Deep-Links
* **Minimax Debt Solver**: Greedy algorithm computes the exact minimum number of money transfers required to clear all group debts.
* **1-Tap UPI Payment Links**: Direct `upi://pay?pa=...` links launch GPay, PhonePe, or Paytm instantly with pre-filled recipient VPA and amount.
* **Printable PDF Export**: Generate clean, downloadable invoice-style trip summaries for offline archiving.

### 📝 6. Trip Planner & Itinerary
* **Reminders**: Track flight, train, and hotel check-in timings.
* **Checklists**: Interactive packing items and travel document verification with completion progress.
* **Sightseeing Spot Tracker**: Plan itinerary destinations with status tagging.

---

## 📄 Hackathon Documentation Index

This repository includes complete rulebook documentation:

| Document | Description |
| :--- | :--- |
| 💡 [`solution.md`](./solution.md) | In-depth problem statement analysis & architectural solution breakdown |
| 🗺️ [`user-flow.md`](./user-flow.md) | Step-by-step user journey, edge cases & visual Mermaid flowcharts |
| 💡 [`idea-origin.md`](./idea-origin.md) | Inspiration, real-world Indian group travel context & UX principles |
| 📚 [`documentation.md`](./documentation.md) | Comprehensive engineering spec, directory layout & algorithms |

---

## 🛠️ Tech Stack

* **Framework**: [React 19](https://react.dev/) + [TypeScript 5.8](https://www.typescriptlang.org/)
* **Build Tool**: [Vite 6](https://vitejs.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom Glassmorphic CSS
* **Animations**: [Framer Motion](https://www.framer.com/motion/) + Canvas-Confetti
* **Data Visualization**: [Recharts](https://recharts.org/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **PDF Engine**: Native HTML Print Stylesheet + JS Print Orchestrator

---

## 📂 Project Architecture

```
spectra/
├── public/
│   ├── images/          # High-resolution optimized travel hero backgrounds (.webp)
│   └── favicon.svg      # App logo & branding assets
├── src/
│   ├── components/
│   │   ├── common/      # Reusable UI components (Navbar, Footer, Custom Cursor)
│   │   ├── dashboard/   # Main trip dashboard & summary cards
│   │   ├── expense/     # Money Jar & quick expense logging modal
│   │   ├── landing/     # Cinematic parallax landing hero & feature showcase
│   │   ├── planner/     # Itinerary, checklist & travel reminders
│   │   ├── settlement/  # "Who Owes Whom" solver & UPI payment links
│   │   ├── trip/        # Trip creation, join request modal & host control panel
│   │   └── vault/       # Trip Vault common pool tracker
│   ├── types/           # TypeScript interfaces for Trips, Expenses, Vault & Users
│   ├── utils/           # Debt algorithm, currency formatters & localStorage helpers
│   ├── App.tsx          # Main application routing & state management
│   ├── index.css        # Tailwind v4 directives & glassmorphic utilities
│   └── main.tsx         # React application entry point
├── documentation.md     # Hackathon technical architecture doc
├── idea-origin.md       # Idea origin & problem context doc
├── solution.md          # Proposed solution doc
├── user-flow.md         # User flow & Mermaid diagrams doc
├── CONTRIBUTORS.md      # Project contributor details
├── README.md            # Repository documentation
└── package.json         # Dependencies & project scripts
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1. Clone the Repository
```bash
git clone https://github.com/ManasDeo26115/hackthon.git
cd hackthon
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 📱 Mobile & Local Network Testing

To test **शुभ यात्रा** on a physical mobile device connected to the same Wi-Fi network:

1. Launch Vite with host binding enabled:
   ```bash
   npx vite --host 0.0.0.0 --port 5173
   ```
2. Find your computer's local IP address (e.g. `192.168.1.5` or `10.94.92.199`).
3. Open your mobile browser and navigate to:
   ```text
   http://<YOUR-LAPTOP-IP>:5173/
   ```

---

## ⚡ Performance & Design Engineering

- **60FPS Hardware-Accelerated Cursor**: Custom cursor tracking using `requestAnimationFrame`, `translate3d(x,y,0)` transform positioning, and a `0.18` linear interpolation (lerp) follower loop that avoids React component re-renders.
- **Devanagari Grapheme Cluster Splitting**: The Devanagari brand title `"शुभ यात्रा"` is split into explicit Unicode grapheme clusters `["शु", "भ", "या", "त्रा"]` to prevent halant/ligature detachment during 3D tilt hover and staggered stagger animations.
- **Persistent Offline Storage**: All active trips, custom money jar chips, vault balances, and checklist updates are saved to `localStorage` for uninterrupted offline functionality on road trips.

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for full details.