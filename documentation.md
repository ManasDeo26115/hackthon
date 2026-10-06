# 📚 Documentation: शुभ यात्रा (Shubh Yatra)

Welcome to the technical documentation for **शुभ यात्रा (Shubh Yatra)**, a group trip and expense management web app built for Indian travellers.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | React 19 + TypeScript | Component-based UI logic & strict type safety |
| **Build Tool** | Vite 8 | Ultra-fast HMR and bundle compilation |
| **Styling** | Tailwind CSS v4 + PostCSS | Utility-first CSS & glassmorphism design system |
| **Icons** | Lucide React | Clean, responsive vector icons |
| **Data Visualization** | Recharts | Interactive SVG category-wise spending donut chart |
| **Animations** | Framer Motion + Canvas Confetti | Smooth entrance effects, spring transitions, celebratory bursts |
| **Typography** | Tiro Devanagari Hindi + Mukta + Poppins | Devanagari hero typography & crisp English UI text |
| **State Persistence** | LocalStorage API | Local client-side data persistence with seed data fallback |

---

## 📂 Directory Structure

```
spectra/
├── public/
│   ├── favicon.svg
│   └── images/
│       └── hero-bg.jpg            # High-res mountain sunrise background
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── BottomNav.tsx      # Mobile bottom tab navigation bar
│   │   │   ├── BrandTitle.tsx     # Syllable-split Devanagari hero text
│   │   │   ├── CustomCursor.tsx   # 60fps rAF + translate3d magnetic cursor
│   │   │   ├── DevanagariLogo.tsx # SVG logo (Compass + Route Pin + Rupee)
│   │   │   └── Navbar.tsx         # Responsive top glass bar & trip picker
│   │   ├── dashboard/
│   │   │   └── TripDashboard.tsx  # Main dashboard, budget ring & donut
│   │   ├── expense/
│   │   │   ├── AddExpenseModal.tsx# Add expense form & 5-sec quick presets
│   │   │   └── ExpenseHistoryView.tsx # Filterable expense list & search
│   │   ├── landing/
│   │   │   └── LandingPage.tsx    # Parallax hero, jar & feature section
│   │   ├── planner/
│   │   │   └── TripPlannerView.tsx# Reminders, checklists & places to visit
│   │   ├── settlement/
│   │   │   └── SettlementView.tsx # Debt resolution matrix & UPI links
│   │   ├── trip/
│   │   │   ├── CreateTripModal.tsx# 8-char code generator & WhatsApp share
│   │   │   ├── HostApprovalModal.tsx# Host approval queue for join requests
│   │   │   └── JoinTripModal.tsx  # Join request form & status screen
│   │   └── vault/
│   │       └── TripVaultView.tsx  # Pool fund tracker & contribution log
│   ├── types/
│   │   └── index.ts               # Core TypeScript data interfaces
│   ├── utils/
│   │   ├── formatters.ts          # INR currency & date formatters
│   │   ├── seedData.ts            # Goa Trip 2026 seed dataset
│   │   ├── settlement.ts          # Greedy balance matching debt solver
│   │   └── storage.ts             # LocalStorage wrapper & fallback handlers
│   ├── App.tsx                    # Root application component & routing
│   ├── index.css                  # Global Tailwind v4 styles & glass utilities
│   └── main.tsx                   # React root mounting entrypoint
├── solution.md                    # Hackathon Deliverable 1
├── user-flow.md                   # Hackathon Deliverable 2
├── idea-origin.md                 # Hackathon Deliverable 4
├── documentation.md               # Hackathon Deliverable 6
├── README.md                      # Project Readme & setup guide
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## ⚙️ Core Algorithms & Data Logic

### 1. Member Financial Calculation (`src/utils/settlement.ts`)
Calculates the exact financial breakdown for every member in a trip:
$$\text{Net Balance} = (\text{Total Direct Payments} + \text{Vault Contributions}) - \text{Total Allocated Expense Share}$$

- **Positive Net Balance**: Member paid more than their share $\rightarrow$ **Creditor (Gets money back)**.
- **Negative Net Balance**: Member paid less than their share $\rightarrow$ **Debtor (Owes money)**.

### 2. Greedy Debt Simplification Algorithm (`calculateOptimalSettlements`)
Minimizes the number of financial transactions required to settle group debts:
1. Filters members into two sorted lists: `Debtors` (sorted by descending debt) and `Creditors` (sorted by descending credit).
2. Uses a two-pointer matching approach:
   - Sets transfer amount $\Delta = \min(\text{debtor.amount}, \text{creditor.amount})$.
   - Creates a settlement record: `Debtor pays Creditor ₹Δ`.
   - Decrements both balances and advances pointers when balance reaches zero.
3. Produces a minimal transaction list (e.g. 5 members resolved in 2-3 transfers).

### 3. Devanagari Grapheme Cluster Split (`src/components/common/BrandTitle.tsx`)
Standard JavaScript string splitting (`"शुभ यात्रा".split('')`) breaks Devanagari conjuncts and halant characters (e.g. `त्` + `रा` = `त्रा`).  
To maintain correct typography:
- Segments text into grapheme clusters: `["शु", "भ", "या", "त्रा"]`.
- Renders each cluster inside its own animated `motion.span` module for staggered entrance, breathing idle motion, and hover wave effects.

### 4. 60FPS Hardware-Accelerated Cursor (`src/components/common/CustomCursor.tsx`)
- Bypasses React state updates on mouse movement to eliminate jank.
- Uses `useRef`, `requestAnimationFrame`, and `transform: translate3d(x,y,0)`.
- Applies a `0.18` linear interpolation (lerp) for the smooth outer ring follower.

---

## 🛠️ Setup & Running Instructions

```bash
# 1. Install dependencies
npm install

# 2. Start Vite dev server (Exposes local network host for mobile testing)
npx vite --host 0.0.0.0 --port 5173

# 3. Build for production
npm run build
```

---

## 🧪 Testing & Verification

- **Production Build**: Verified with `npm run build` (0 TypeScript / bundling errors).
- **Mobile Testing**: Served over local network at `http://<local-ip>:5173/` for mobile browser validation.
- **Storage Persistence**: Verifies `localStorage` updates dynamically upon adding expenses, vault contributions, or custom chips.
