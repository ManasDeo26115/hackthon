import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Expense, Category, Trip, User } from '../../types';
import {
  X,
  PlusCircle,
  IndianRupee,
  Users,
  Check,
  Vault,
  Tag,
  Zap,
  Sparkles
} from 'lucide-react';
import { formatINR } from '../../utils/formatters';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip;
  onSaveExpense: (newExpense: Expense) => void;
  currentUser: User;
}

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  isOpen,
  onClose,
  trip,
  onSaveExpense,
  currentUser
}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Fooding');
  const [paidBy, setPaidBy] = useState<string>(currentUser.id);
  const [appliesTo, setAppliesTo] = useState<string[]>(
    trip.members.map((m) => m.id)
  );
  const [isTiny, setIsTiny] = useState(false);
  const [isVaultPaid, setIsVaultPaid] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const categories: { id: Category; label: string; icon: string }[] = [
    { id: 'Fooding', label: '🍿 खाना / Food', icon: '🍿' },
    { id: 'Travel', label: '🚗 यात्रा / Travel', icon: '🚗' },
    { id: 'Hotel', label: '🏨 स्टे / Hotel', icon: '🏨' },
    { id: 'Activity', label: '🎯 एक्टिविटी / Activity', icon: '🎯' },
    { id: 'Other', label: '🛍️ अन्य / Other', icon: '🛍️' },
  ];

  const quickPresets = [
    { label: '💧 Water', title: '💧 Cold Water Bottle', defaultAmt: 40, category: 'Fooding' as Category, isTiny: true },
    { label: '🛣️ Toll', title: '🛣️ Highway Toll Tax', defaultAmt: 120, category: 'Travel' as Category, isTiny: true },
    { label: '🚻 Toilet', title: '🚻 Washroom Entry', defaultAmt: 20, category: 'Other' as Category, isTiny: true },
    { label: '🍿 Snacks', title: '🍿 Chai & Samosa', defaultAmt: 90, category: 'Fooding' as Category, isTiny: true },
    { label: '🅿️ Parking', title: '🅿️ Beach Parking', defaultAmt: 50, category: 'Travel' as Category, isTiny: true },
    { label: '⛽ Fuel', title: '⛽ Petrol Refuel', defaultAmt: 250, category: 'Travel' as Category, isTiny: true },
  ];

  const handleSelectPreset = (preset: typeof quickPresets[0]) => {
    setTitle(preset.title);
    setAmount(preset.defaultAmt.toString());
    setCategory(preset.category);
    setIsTiny(true);
  };

  const handleToggleMemberApplies = (userId: string) => {
    if (appliesTo.includes(userId)) {
      if (appliesTo.length === 1) return; // Must apply to at least one
      setAppliesTo(appliesTo.filter((id) => id !== userId));
    } else {
      setAppliesTo([...appliesTo, userId]);
    }
  };

  const handleSelectAllMembers = () => {
    if (appliesTo.length === trip.members.length) {
      setAppliesTo([paidBy]);
    } else {
      setAppliesTo(trip.members.map((m) => m.id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!title || isNaN(parsedAmount) || parsedAmount <= 0) return;

    const newExpense: Expense = {
      id: `exp-${Date.now()}`,
      tripId: trip.id,
      title,
      amount: parsedAmount,
      category,
      paidBy,
      appliesTo,
      date: new Date().toISOString(),
      isTiny: isTiny || parsedAmount <= 200,
      isVaultPaid
    };

    onSaveExpense(newExpense);
    setSavedSuccess(true);

    // Sparkle effect
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#F97316', '#FBBF24', '#10B981']
    });

    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg glass-card rounded-3xl shadow-2xl p-6 sm:p-8 border border-amber-400/30 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="p-2 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-amber-400">
            <Zap className="w-5 h-5" />
          </span>
          <h2 className="font-devanagari text-2xl font-black text-slate-900 dark:text-white">
            नया खर्च जोड़ें (Add Expense)
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Record a new expense for <span className="font-bold text-slate-800 dark:text-slate-200">{trip.name}</span>.
        </p>

        {savedSuccess ? (
          <div className="py-12 text-center space-y-3 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/40">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="font-devanagari text-2xl font-black text-slate-900 dark:text-white">
              खर्च दर्ज हो गया! (Expense Saved) 🎉
            </h3>
            <p className="text-xs text-slate-500">
              {title} – {formatINR(parseFloat(amount))} added to dashboard.
            </p>
          </div>
        ) : (
          <div>
            {/* Quick 5-Sec Preset Bar */}
            <div className="mb-5 p-3 rounded-2xl bg-amber-50 dark:bg-slate-800/80 border border-amber-200 dark:border-amber-700">
              <span className="text-[10px] font-black text-amber-700 dark:text-amber-300 uppercase tracking-widest block mb-2">
                ⚡ 5-Second Quick Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickPresets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(p)}
                    className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-bold shadow-sm hover:bg-saffron-500 hover:text-white transition-all border border-amber-300/50"
                  >
                    {p.label} ₹{p.defaultAmt}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category Pills */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  श्रेणी / Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        category === cat.id
                          ? 'bg-saffron-500 text-white shadow-md scale-105'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Amount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    खर्च का नाम / Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shack Dinner, Highway Toll"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    राशि / Amount (₹) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-lg font-bold text-saffron-500">₹</span>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="450"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-9 pr-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-base font-extrabold text-slate-900 dark:text-white focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Paid By (Select One Member) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  किसने भुगतान किया? / Paid By (Select 1)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {trip.members.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaidBy(m.id)}
                      className={`p-2 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all ${
                        paidBy === m.id
                          ? 'bg-amber-500 text-white border-amber-500 shadow-md scale-102'
                          : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <img src={m.avatar} alt={m.name} className="w-5 h-5 rounded-full object-cover" />
                      <span className="truncate">{m.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Applies To (Multi-select member chips + Split shortcut) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    किस-किस पर लागू? / Applies To ({appliesTo.length} members)
                  </label>
                  <button
                    type="button"
                    onClick={handleSelectAllMembers}
                    className="text-[11px] font-bold text-saffron-600 dark:text-amber-400 hover:underline"
                  >
                    {appliesTo.length === trip.members.length ? 'Clear All' : 'Select All / Split Equally'}
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {trip.members.map((m) => {
                    const isChecked = appliesTo.includes(m.id);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => handleToggleMemberApplies(m.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                          isChecked
                            ? 'bg-saffron-100 dark:bg-saffron-950/80 border border-saffron-400 text-saffron-700 dark:text-amber-300 shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-transparent'
                        }`}
                      >
                        <img src={m.avatar} alt={m.name} className="w-4 h-4 rounded-full" />
                        <span>{m.name.split(' ')[0]}</span>
                        {isChecked && <Check className="w-3 h-3 text-saffron-600 dark:text-amber-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Vault Paid Checkbox */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="flex items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isVaultPaid}
                    onChange={(e) => setIsVaultPaid(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                  />
                  <span className="flex items-center gap-1.5">
                    <Vault className="w-4 h-4 text-amber-500" />
                    <span>सामूहिक तिजोरी से भुगतान करें (Pay from Trip Vault 💰)</span>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-saffron-500 via-amber-500 to-saffron-600 text-white font-extrabold text-base shadow-glow-saffron hover:scale-[1.02] active:scale-95 transition-all mt-4"
              >
                खर्च सेव करें (Save Expense) 💾
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
