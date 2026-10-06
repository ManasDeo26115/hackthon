# 💡 Solution Overview: शुभ यात्रा (Shubh Yatra)

## 📌 Problem Statement
Group trips across India — whether roadtrips to Goa, mountain getaways to Manali, or spiritual retreats to Rishikesh — frequently suffer from chaotic expense management and lost money:

1. **The Small Expense Leak**: While large bills (hotels, car rentals) are easy to remember and split, tiny recurring expenses — such as FASTag highway tolls (₹120), cold water bottles (₹40), chai & samosa breaks (₹90), beach parking tokens (₹50), and petrol top-ups — are easily forgotten or lost in WhatsApp chat groups.
2. **Social Hesitation**: Individual group members often feel awkward asking friends to transfer small change (₹20 or ₹50), leading to unfair cost distribution over a multi-day trip.
3. **Complex End-of-Trip Calculations**: Calculating who owes whom at the end of a trip with multiple payers, unequal splits, and pool contributions is tedious and prone to arguments.
4. **Lack of Indian Context**: Generic expense splitters miss Indian travel workflows like upfront pool funds (Trip Vault), FASTag toll tracking, direct UPI payment links (`upi://pay`), and Devanagari travel aesthetics.

---

## 🚀 Proposed Solution
**"शुभ यात्रा" (Shubh Yatra)** is a complete, mobile-first web application designed specifically for Indian group travellers to track every rupee seamlessly.

### Core Solution Modules:
1. **5-Second Quick Expenses & Editable Money Jar**:
   - One-tap quick entry for recurring small roadtrip expenses (Tolls, Water, Snacks, Parking, Fuel).
   - Interactive, editable "Forgotten Money Jar" showing accumulated small change that would otherwise be lost.
2. **Trip Vault (Upfront Common Pool Fund)**:
   - Group members contribute an initial pool fund (e.g. ₹2,000 each) upfront.
   - Common expenses like tolls, chai, and parking are paid directly from the vault, eliminating individual micro-transfers.
3. **Smart Budget Warnings & Real-time Progress**:
   - Color-changing progress ring: **Green** (<75%), **Amber** (75–99%), and **Red Pulse** (≥100% over-budget alert).
4. **Optimal "Who Owes Whom" Debt Settlement**:
   - A greedy balance-matching algorithm minimizes the total number of transactions needed to settle all debts.
   - Integrated **Pay via UPI** links (`upi://pay?pa=...`) for instant 1-tap settlement via GPay, Paytm, or PhonePe.
   - **Printable / Download PDF** summary report for offline sharing.
5. **Role-Based Trip Planner & Host Approvals**:
   - **👑 Trip Host**: Generates a unique 8-character Trip ID (e.g. `GOA26X91`), reviews pending join requests, and maintains edit control over trip reminders and checklists.
   - **Members**: View-only access to planner, checklist items, and full expense transparency.
