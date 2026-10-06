import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Trip, Expense, VaultContribution, Reminder, ChecklistItem, PlaceToVisit, User } from '../../types';
import { formatINR, formatDate } from '../../utils/formatters';
import {
  Car,
  Train,
  Bus,
  Plane,
  Bike,
  Crown,
  Share2,
  PlusCircle,
  Vault,
  Receipt,
  AlertTriangle,
  Calendar,
  CheckSquare,
  MapPin,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  Tag
} from 'lucide-react';

interface TripDashboardProps {
  trip: Trip;
  expenses: Expense[];
  vaultContributions: VaultContribution[];
  reminders: Reminder[];
  checklist: ChecklistItem[];
  places: PlaceToVisit[];
  financials: {
    summaries: any[];
    totalSpent: number;
    vaultTotalContributions: number;
    vaultExpensesTotal: number;
    vaultBalance: number;
  };
  onQuickAddExpense: () => void;
  onAddVaultContribution: () => void;
  onOpenPlanner: () => void;
  onOpenHistory: (categoryFilter?: string) => void;
  onOpenSettlement: () => void;
  currentUser: User;
  onShareTrip: () => void;
}

export const TripDashboard: React.FC<TripDashboardProps> = ({
  trip,
  expenses,
  vaultContributions,
  reminders,
  checklist,
  places,
  financials,
  onQuickAddExpense,
  onAddVaultContribution,
  onOpenPlanner,
  onOpenHistory,
  onOpenSettlement,
  currentUser,
  onShareTrip
}) => {
  const { totalSpent, vaultBalance, vaultTotalContributions, vaultExpensesTotal } = financials;
  const remainingBudget = trip.expectedBudget - totalSpent;
  const spentPercentage = Math.min(100, Math.round((totalSpent / trip.expectedBudget) * 100));

  // Determine Budget Status Color & Warning State
  let budgetColorClass = 'text-emerald-500 bg-emerald-500';
  let budgetBadgeText = 'सुरक्षित बजट (Safe Budget)';
  let budgetBorderClass = 'border-emerald-500/30';
  let isOverBudget = false;

  if (spentPercentage >= 100) {
    budgetColorClass = 'text-red-500 bg-red-500';
    budgetBadgeText = '🚨 बजट पार! (Over Budget)';
    budgetBorderClass = 'border-red-500 animate-pulse-red';
    isOverBudget = true;
  } else if (spentPercentage >= 75) {
    budgetColorClass = 'text-amber-500 bg-amber-500';
    budgetBadgeText = '⚠️ बजट चेतावनी (Near Limit)';
    budgetBorderClass = 'border-amber-500/60';
  }

  // Category Breakdown Data for Recharts Donut
  const categoryTotals: Record<string, number> = {
    Travel: 0,
    Fooding: 0,
    Hotel: 0,
    Activity: 0,
    Other: 0
  };

  expenses.forEach((e) => {
    if (e.tripId === trip.id) {
      categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    }
  });

  const pieData = [
    { name: 'Travel 🚗', value: categoryTotals.Travel, color: '#F97316' },
    { name: 'Fooding 🍿', value: categoryTotals.Fooding, color: '#FBBF24' },
    { name: 'Hotel 🏨', value: categoryTotals.Hotel, color: '#6366F1' },
    { name: 'Activity 🎯', value: categoryTotals.Activity, color: '#10B981' },
    { name: 'Other 🛍️', value: categoryTotals.Other, color: '#EC4899' },
  ].filter((item) => item.value > 0);

  const transportIcons: Record<string, any> = {
    car: Car,
    train: Train,
    bus: Bus,
    flight: Plane,
    bike: Bike
  };

  const TransportIcon = transportIcons[trip.transport] || Car;

  const quickTinyExpenses = [
    { label: '💧 Water', name: '💧 Cold Water Bottle', amount: 40, cat: 'Fooding' },
    { label: '🛣️ Toll', name: '🛣️ Highway Toll Tax', amount: 120, cat: 'Travel' },
    { label: '🚻 Toilet', name: '🚻 Washroom Entry', amount: 20, cat: 'Other' },
    { label: '🍿 Snacks', name: '🍿 Chai & Snacks', amount: 90, cat: 'Fooding' },
    { label: '🅿️ Parking', name: '🅿️ Car Parking', amount: 50, cat: 'Travel' },
    { label: '⛽ Fuel', name: '⛽ Petrol Top-up', amount: 250, cat: 'Travel' },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Trip Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border-saffron-500/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-saffron-500/10 to-amber-500/10 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-saffron-100 dark:bg-saffron-950/80 text-saffron-700 dark:text-amber-300 text-xs font-black uppercase flex items-center gap-1.5">
                <TransportIcon className="w-3.5 h-3.5" />
                <span>{trip.transport.toUpperCase()} TRIP</span>
              </span>

              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-mono font-bold">
                ID: {trip.code}
              </span>

              <button
                onClick={onShareTrip}
                className="px-3 py-1 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-saffron-700 dark:text-amber-300 text-xs font-bold transition-all flex items-center gap-1"
              >
                <Share2 className="w-3 h-3" />
                <span>Share Code</span>
              </button>
            </div>

            <h1 className="font-devanagari text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              {trip.name}
            </h1>

            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-saffron-500" />
              <span>{trip.destination}</span>
              <span>•</span>
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>{formatDate(trip.startDate)} - {formatDate(trip.returnDate)}</span>
            </p>
          </div>

          {/* Member Avatars */}
          <div className="flex items-center gap-3 bg-white/60 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-800">
            <div className="flex -space-x-2 overflow-hidden">
              {trip.members.map((m) => (
                <img
                  key={m.id}
                  src={m.avatar}
                  alt={m.name}
                  title={`${m.name} ${m.role === 'host' ? '(👑 Host)' : ''}`}
                  className={`w-9 h-9 rounded-full object-cover ring-2 ${
                    m.role === 'host' ? 'ring-saffron-500 z-10' : 'ring-white dark:ring-slate-800'
                  }`}
                />
              ))}
            </div>
            <div className="flex flex-col text-xs font-bold text-slate-700 dark:text-slate-200">
              <span className="flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-amber-500" />
                <span>Host: {trip.members.find((m) => m.role === 'host')?.name.split(' ')[0]}</span>
              </span>
              <span className="text-[10px] text-slate-400 font-normal">
                {trip.members.length} Active Travellers
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Budget & Vault Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Budget Card with Animated Ring */}
        <div className={`glass-card p-6 rounded-3xl shadow-xl relative border-2 ${budgetBorderClass} transition-all`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-devanagari font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-saffron-500" />
              <span>बजट समरी / Budget Summary</span>
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${budgetBadgeText.includes('🚨') ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'}`}>
              {budgetBadgeText}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center my-6">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
              <span className="text-[11px] font-semibold text-slate-400 block">अनुमानित बजट</span>
              <span className="text-lg font-black text-slate-900 dark:text-white block mt-0.5">
                {formatINR(trip.expectedBudget)}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-saffron-50 dark:bg-saffron-950/40">
              <span className="text-[11px] font-semibold text-saffron-600 dark:text-amber-400 block">कुल खर्च</span>
              <span className="text-lg font-black text-saffron-600 dark:text-amber-400 block mt-0.5">
                {formatINR(totalSpent)}
              </span>
            </div>

            <div className={`p-3 rounded-2xl ${remainingBudget < 0 ? 'bg-red-50 dark:bg-red-950/40 text-red-600' : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600'}`}>
              <span className="text-[11px] font-semibold block">शेष बजट</span>
              <span className="text-lg font-black block mt-0.5">
                {formatINR(remainingBudget)}
              </span>
            </div>
          </div>

          {/* Budget Animated Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>Spent {spentPercentage}%</span>
              <span>Target: {formatINR(trip.expectedBudget)}</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-4 rounded-full overflow-hidden p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-700 ${budgetColorClass}`}
                style={{ width: `${Math.min(100, spentPercentage)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Trip Vault Card */}
        <div className="glass-card p-6 rounded-3xl shadow-xl relative border-amber-400/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-devanagari font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Vault className="w-5 h-5 text-amber-500" />
              <span>सामूहिक तिजोरी / Trip Vault</span>
            </h3>
            <button
              onClick={onAddVaultContribution}
              className="px-3 py-1.5 rounded-xl bg-amber-500 text-white text-xs font-bold shadow-md hover:bg-amber-600 transition-all flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>राशि जोड़ें (Add Pool)</span>
            </button>
          </div>

          <div className="my-6">
            <div className="text-3xl font-black text-amber-600 dark:text-amber-400">
              {formatINR(vaultBalance)}{' '}
              <span className="text-xs text-slate-500 font-normal">Vault Balance Remaining</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Total Contributions: {formatINR(vaultTotalContributions)} • Paid from Vault: {formatINR(vaultExpensesTotal)}
            </p>
          </div>

          {/* Per-member Contribution Avatars Bar */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Member Pool Contributions
            </span>
            <div className="flex flex-wrap gap-2">
              {trip.members.map((m) => {
                const contrib = vaultContributions
                  .filter((v) => v.tripId === trip.id && v.userId === m.id)
                  .reduce((sum, c) => sum + c.amount, 0);
                return (
                  <div
                    key={m.id}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    <img src={m.avatar} alt={m.name} className="w-4 h-4 rounded-full" />
                    <span>{m.name.split(' ')[0]}</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">{formatINR(contrib)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Category Spending Donut Chart & Quick Tiny Expense Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown Donut Chart */}
        <div className="glass-card p-6 rounded-3xl shadow-xl lg:col-span-1 border-saffron-500/20">
          <h3 className="font-devanagari font-bold text-lg text-slate-900 dark:text-white mb-2">
            श्रेणीवार खर्च / Category Wise
          </h3>
          {pieData.length > 0 ? (
            <div className="h-56 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                    onClick={(entry) => {
                      if (entry && typeof entry.name === 'string') {
                        onOpenHistory(entry.name.split(' ')[0]);
                      }
                    }}
                    cursor="pointer"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: any) => formatINR(val)} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-slate-400 font-semibold">Total</span>
                <span className="text-base font-black text-slate-900 dark:text-white">{formatINR(totalSpent)}</span>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-slate-400">No expenses recorded yet.</div>
          )}

          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {pieData.map((item, idx) => (
              <button
                key={idx}
                onClick={() => onOpenHistory(item.name.split(' ')[0])}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:scale-105 transition-all"
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.name}:</span>
                <span className="font-mono">{formatINR(item.value)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Tiny Expense Row & Actions */}
        <div className="glass-card p-6 rounded-3xl shadow-xl lg:col-span-2 border-amber-400/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-devanagari font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-saffron-500" />
                <span>क्विक छोटे खर्च / Quick Tiny Expenses (5-Sec)</span>
              </h3>
              <button
                onClick={onQuickAddExpense}
                className="text-xs font-bold text-saffron-600 dark:text-amber-400 hover:underline"
              >
                Full Form ➡️
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Tap any chip below to quickly record small roadtrip expenses like toll, water bottle & parking!
            </p>

            {/* Big Tappable Emoji Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {quickTinyExpenses.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={onQuickAddExpense}
                  className="p-3.5 rounded-2xl bg-amber-500/10 hover:bg-saffron-500 hover:text-white dark:bg-slate-800/80 text-slate-800 dark:text-amber-300 border border-amber-500/30 font-bold text-xs flex items-center justify-between transition-all group active:scale-95 shadow-sm"
                >
                  <span className="text-sm font-extrabold">{chip.label}</span>
                  <span className="px-2 py-0.5 rounded-lg bg-white/80 dark:bg-slate-900/80 text-saffron-600 dark:text-amber-400 group-hover:text-saffron-600 text-[11px] font-mono">
                    +{formatINR(chip.amount)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={onQuickAddExpense}
              className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-saffron-500 to-amber-500 text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>नया खर्च जोड़ें (+ Add Expense)</span>
            </button>

            <button
              onClick={onOpenSettlement}
              className="flex-1 py-3 px-4 rounded-2xl bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 font-extrabold text-xs shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>फाइनल हिसाब देखें (Settlement)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Expenses List & Planner Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Expenses List Widget */}
        <div className="glass-card p-6 rounded-3xl shadow-xl lg:col-span-2 border-saffron-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-devanagari font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Receipt className="w-5 h-5 text-saffron-500" />
              <span>हाल के खर्च / Recent Expenses</span>
            </h3>
            <button
              onClick={() => onOpenHistory()}
              className="text-xs font-bold text-saffron-600 dark:text-amber-400 hover:underline"
            >
              सभी देखें ({expenses.length}) ➡️
            </button>
          </div>

          <div className="space-y-2.5">
            {expenses.slice(0, 5).map((exp) => {
              const payer = trip.members.find((m) => m.id === exp.paidBy);
              return (
                <div
                  key={exp.id}
                  onClick={() => onOpenHistory()}
                  className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800 hover:border-saffron-400 transition-all flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {payer && (
                      <img
                        src={payer.avatar}
                        alt={payer.name}
                        title={`Paid by ${payer.name}`}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-saffron-400"
                      />
                    )}
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{exp.title}</span>
                        {exp.isTiny && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-[9px] font-black uppercase">
                            Tiny
                          </span>
                        )}
                        {exp.isVaultPaid && (
                          <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 text-[9px] font-black uppercase">
                            Vault Paid
                          </span>
                        )}
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Paid by {payer?.name.split(' ')[0]} • Category: {exp.category}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-black text-sm text-saffron-600 dark:text-amber-400 block">
                      {formatINR(exp.amount)}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {exp.appliesTo.length} members
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Planner & Places Quick Widget */}
        <div className="glass-card p-6 rounded-3xl shadow-xl lg:col-span-1 border-amber-400/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-devanagari font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-500" />
                <span>रिमाइंडर & स्थान / Planner</span>
              </h3>
              <button
                onClick={onOpenPlanner}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                Manage ➡️
              </button>
            </div>

            {/* Upcoming Reminders */}
            <div className="space-y-2 mb-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Upcoming Reminders
              </span>
              {reminders.slice(0, 2).map((r) => (
                <div key={r.id} className="p-2.5 rounded-xl bg-amber-50 dark:bg-slate-800/80 text-xs font-semibold">
                  <div className="font-bold text-slate-800 dark:text-slate-200">{r.title}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {r.date} at {r.time}
                  </div>
                </div>
              ))}
            </div>

            {/* Checklists Preview */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Things to Carry
              </span>
              {checklist.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <CheckSquare className={`w-3.5 h-3.5 ${item.completed ? 'text-emerald-500' : 'text-slate-400'}`} />
                  <span className={item.completed ? 'line-through text-slate-400' : ''}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onOpenPlanner}
            className="w-full py-2.5 mt-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all text-center"
          >
            पूरा प्लानर खोलें (View Full Planner)
          </button>
        </div>
      </div>
    </div>
  );
};
