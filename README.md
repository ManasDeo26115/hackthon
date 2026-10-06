# 🚩 शुभ यात्रा (Shubh Yatra)

> **"Every Trip. Every Rupee. Accounted For."**

A group trip and expense management web application crafted for Indian travellers.

---

## 👥 Contributors

Thanks to these wonderful people for contributing to **शुभ यात्रा (Shubh Yatra)**:

<a href="https://github.com/ManasDeo26115">
  <img src="https://github.com/ManasDeo26115.png" width="60px;" alt="Manas Deo" style="border-radius: 50%; border: 2px solid #F97316;"/>
  <sub><b>Manas Deo</b></sub>
</a>
&nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://github.com/RajAdiiii09-ux">
  <img src="https://github.com/RajAdiiii09-ux.png" width="60px;" alt="Raj Adiiii" style="border-radius: 50%; border: 2px solid #FBBF24;"/>
  <sub><b>Raj Adiiii</b></sub>
</a>

- **Manas Deo** ([@ManasDeo26115](https://github.com/ManasDeo26115)) - Creator & Lead Developer
- **Raj Adiiii** ([@RajAdiiii09-ux](https://github.com/RajAdiiii09-ux)) - Contributor & UX Specialist

---

## 🌟 Key Features

- **Devanagari Typography & Brand Title**: Integrated `<BrandTitle />` with grapheme cluster split for "शुभ यात्रा".
- **Parallax Mountain Road Hero**: Sunset golden hour backdrop with gradient layers and glassmorphic UI.
- **60FPS Custom Cursor**: Hardware-accelerated pointer follower using `requestAnimationFrame` & `translate3d`.
- **Create & Join Trip**: 8-character unique Trip ID generator with WhatsApp share link.
- **Host Approvals**: Host role management for pending join requests.
- **Trip Dashboard**: Budget summary progress ring, Trip Vault pool card, Recharts category donut, and recent transactions.
- **Editable Forgotten Money Jar**: Tap chips to collect small expenses, click price badges to inline edit amounts, add custom chips, and auto-persist in `localStorage`.
- **Trip Vault**: Per-member pool contribution tracker & live remaining balance meter.
- **Trip Planner**: Reminders, checklists with strike-through completion, and places to visit.
- **Final Settlement**: Optimal "Who Owes Whom" calculation algorithm, direct UPI payment links (`upi://pay`), and PDF print report generator.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start Vite dev server (Local + Network Host for Mobile)
npx vite --host 0.0.0.0 --port 5173

# Build for production
npm run build
```