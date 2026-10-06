import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  PlusCircle,
  LogIn,
  Vault,
  Receipt,
  AlertTriangle,
  Scale,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Share2,
  Pencil,
  Plus,
  Trash2,
  RotateCcw,
  X,
  Check
} from 'lucide-react';
import { formatINR } from '../../utils/formatters';
import { DevanagariLogo } from '../common/DevanagariLogo';
import { BrandTitle } from '../common/BrandTitle';

interface LandingPageProps {
  onCreateTripClick: () => void;
  onJoinTripClick: () => void;
  onExploreDemoClick: () => void;
}

export interface TinyChipItem {
  id: string;
  name: string;
  emoji: string;
  amount: number;
  color: string;
  isCustom?: boolean;
}

const DEFAULT_TINY_ITEMS: TinyChipItem[] = [
  { id: '1', name: 'Toll Tax', emoji: '🛣️', amount: 120, color: 'bg-amber-100/90 text-amber-900 border-amber-300' },
  { id: '2', name: 'Water Bottles', emoji: '💧', amount: 40, color: 'bg-blue-100/90 text-blue-900 border-blue-300' },
  { id: '3', name: 'Chai & Snacks', emoji: '🍿', amount: 90, color: 'bg-orange-100/90 text-orange-900 border-orange-300' },
  { id: '4', name: 'Beach Parking', emoji: '🅿️', amount: 50, color: 'bg-emerald-100/90 text-emerald-900 border-emerald-300' },
  { id: '5', name: 'Washroom Entry', emoji: '🚻', amount: 20, color: 'bg-purple-100/90 text-purple-900 border-purple-300' },
  { id: '6', name: 'Scooter Petrol', emoji: '⛽', amount: 250, color: 'bg-rose-100/90 text-rose-900 border-rose-300' },
];

export const LandingPage: React.FC<LandingPageProps> = ({
  onCreateTripClick,
  onJoinTripClick,
  onExploreDemoClick,
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // LocalStorage Persistence for Jar Total & Custom Chips
  const [jarTotal, setJarTotal] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('shubh_yatra_jar_total');
      return saved ? JSON.parse(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [tinyItems, setTinyItems] = useState<TinyChipItem[]>(() => {
    try {
      const saved = localStorage.getItem('shubh_yatra_tiny_chips');
      return saved ? JSON.parse(saved) : DEFAULT_TINY_ITEMS;
    } catch {
      return DEFAULT_TINY_ITEMS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('shubh_yatra_jar_total', JSON.stringify(jarTotal));
    } catch (e) {
      console.error(e);
    }
  }, [jarTotal]);

  useEffect(() => {
    try {
      localStorage.setItem('shubh_yatra_tiny_chips', JSON.stringify(tinyItems));
    } catch (e) {
      console.error(e);
    }
  }, [tinyItems]);

  // Inline Editing State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState<string>('');

  // Custom Chip Popover State
  const [addPopoverOpen, setAddPopoverOpen] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmoji, setCustomEmoji] = useState('🚗');
  const [customAmount, setCustomAmount] = useState('100');

  // Animation key state for coin drop bounce
  const [coinDropTrigger, setCoinDropTrigger] = useState(0);

  const emojiPresets = ['🚗', '🍔', '☕', '🎟️', '🥥', '🧼', '🛍️', '📸', '🚕', '🍹'];

  const handleAddTinyToJar = (item: TinyChipItem) => {
    setJarTotal((prev) => prev + item.amount);
    setCoinDropTrigger((prev) => prev + 1);
  };

  const handleStartEdit = (e: React.MouseEvent, item: TinyChipItem) => {
    e.stopPropagation();
    setEditingId(item.id);
    setEditAmount(item.amount.toString());
  };

  const handleSaveEdit = (id: string) => {
    const val = parseInt(editAmount, 10);
    if (!isNaN(val) && val > 0 && val <= 99999) {
      setTinyItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, amount: val } : item))
      );
    }
    setEditingId(null);
  };

  const handleAdjustEditAmount = (delta: number) => {
    const current = parseInt(editAmount, 10) || 0;
    const next = Math.max(1, Math.min(99999, current + delta));
    setEditAmount(next.toString());
  };

  const handleResetChips = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTinyItems(DEFAULT_TINY_ITEMS);
  };

  const handleAddCustomChip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName || tinyItems.length >= 12) return;

    const newChip: TinyChipItem = {
      id: `custom-${Date.now()}`,
      name: customName,
      emoji: customEmoji,
      amount: parseInt(customAmount, 10) || 100,
      color: 'bg-amber-100/90 text-amber-900 border-amber-300',
      isCustom: true,
    };

    setTinyItems((prev) => [...prev, newChip]);
    setCustomName('');
    setCustomAmount('100');
    setAddPopoverOpen(false);
  };

  const handleDeleteChip = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setTinyItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearJar = () => {
    setJarTotal(0);
  };

  const destinations = [
    'Goa 🏖️', 'Manali 🏔️', 'Jaipur 🏰', 'Kerala 🌴',
    'Leh Ladakh 🏍️', 'Rishikesh 🌊', 'Udaipur ⛵', 'Varanasi 🪔',
    'Darjeeling 🍃', 'Coorg ☕', 'Pondicherry 🌊', 'Shimla ❄️'
  ];

  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      num: '01',
      title: 'Create Trip',
      desc: 'Enter trip name, location, dates and budget. Generate a unique 8-character Trip ID in 1 click.',
      icon: PlusCircle,
    },
    {
      num: '02',
      title: 'Share Trip ID',
      desc: 'Share your Trip ID (e.g. GOA26X91) with your group via WhatsApp or link.',
      icon: Share2,
    },
    {
      num: '03',
      title: 'Host Approves',
      desc: 'The 👑 Trip Host reviews each join request for maximum privacy and control.',
      icon: ShieldCheck,
    },
    {
      num: '04',
      title: 'Track Every Rupee',
      desc: 'Add large & tiny expenses instantly. Trip Vault, budget warnings, and final settlement update live!',
      icon: Scale,
    }
  ];

  const jarCapacity = 5000;
  const jarFillPercent = Math.min(100, Math.round((jarTotal / jarCapacity) * 100));

  return (
    <div className="relative min-w-full overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-saffron-500 via-amber-400 to-saffron-600 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Hero Section with Parallax Background Image */}
      <section className="relative pt-12 pb-24 sm:pt-20 sm:pb-32 overflow-hidden">
        {/* Parallax Background Layer */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <img
            src="/images/hero-bg.jpg"
            alt="Misty Mountain Road Sunrise"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover scale-105 filter brightness-90 contrast-105"
          />
        </div>

        {/* Gradient & Grain Overlay Layer */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-saffron-950/70 via-indigo-950/60 to-[#FFF8EE] dark:to-[#0B0F19] mix-blend-multiply" />
        <div className="absolute inset-0 -z-10 mandala-pattern opacity-25 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Welcome Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/40 text-amber-200 text-sm font-semibold mb-6 shadow-lg backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
            <span>Welcome to your trip 🙏</span>
          </motion.div>

          {/* Hero Modular Animated Brand Title */}
          <div className="my-6">
            <BrandTitle variant="hero" showSubtitle={true} />
          </div>

          {/* English Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto space-y-2 mt-4"
          >
            <h2 className="font-sans text-2xl sm:text-4xl font-extrabold text-white drop-shadow-md">
              Every Trip. Every Rupee. Accounted For.
            </h2>
          </motion.div>

          {/* Main Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <button
              onClick={onCreateTripClick}
              data-cursor="Create"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-saffron-500 via-amber-500 to-saffron-600 text-white font-extrabold text-lg shadow-glow-saffron hover:shadow-glow-gold hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
            >
              <PlusCircle className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              <span>Create Trip</span>
            </button>

            <button
              onClick={onJoinTripClick}
              data-cursor="Join"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-card text-white font-extrabold text-lg shadow-lg hover:border-amber-400 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <LogIn className="w-6 h-6 text-amber-400" />
              <span>Join Trip</span>
            </button>

            <button
              onClick={onExploreDemoClick}
              data-cursor="Demo"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900/90 dark:bg-amber-400 text-white dark:text-slate-950 font-bold text-base shadow-md hover:bg-slate-800 dark:hover:bg-amber-300 transition-all flex items-center justify-center gap-2"
            >
              <span>Goa 2026 Demo 🏖️</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Hero Cards Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left"
          >
            <div className="glass-card p-6 rounded-3xl shadow-2xl relative overflow-hidden border-saffron-500/20 hover:border-saffron-500/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-saffron-500/20 text-amber-300 text-xs font-black uppercase">
                  🚗 Goa Roadtrip 2026
                </span>
                <span className="text-xs font-mono font-bold text-slate-300">ID: GOA26X91</span>
              </div>
              <div className="text-3xl font-extrabold text-white">
                ₹18,500 <span className="text-xs text-slate-300 font-normal">spent of ₹30,000</span>
              </div>
              <div className="w-full bg-white/20 h-3 rounded-full mt-4 overflow-hidden">
                <div className="bg-gradient-to-r from-saffron-500 to-amber-400 h-full w-[62%] rounded-full" />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300 mt-3">
                <span>Safe Spending (61.6%)</span>
                <span className="font-bold text-emerald-400">₹11,500 Left</span>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl shadow-2xl relative overflow-hidden border-amber-500/20 hover:border-amber-500/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Vault className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-sm text-white">Trip Vault</span>
                </div>
                <span className="text-xs text-emerald-400 font-bold">5 Members</span>
              </div>
              <div className="text-3xl font-black text-amber-300">
                ₹10,000 <span className="text-xs text-slate-300 font-normal">pool fund</span>
              </div>
              <p className="text-xs text-slate-300 mt-3">
                Each member contributed ₹2,000 upfront. Pay toll, parking & snacks directly from pool!
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl shadow-2xl relative overflow-hidden border-emerald-500/20 hover:border-emerald-500/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-sm text-white">5-Sec Quick Entry</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">Live</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-white/20 text-xs font-bold text-amber-200">💧 Water ₹40</span>
                <span className="px-3 py-1.5 rounded-xl bg-white/20 text-xs font-bold text-amber-200">🛣️ Toll ₹120</span>
                <span className="px-3 py-1.5 rounded-xl bg-white/20 text-xs font-bold text-amber-200">🍿 Chai ₹90</span>
              </div>
              <p className="text-xs text-slate-300 mt-4">
                No complex forms! Just tap preset icon & amount. Saved in under 5 seconds.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Destination Marquee Strip */}
      <div className="py-4 bg-gradient-to-r from-saffron-600 via-amber-500 to-saffron-600 text-white font-bold overflow-hidden shadow-inner select-none">
        <div className="flex whitespace-nowrap animate-shimmer space-x-8 text-sm sm:text-base tracking-widest uppercase">
          {destinations.concat(destinations).map((dest, idx) => (
            <span key={idx} className="flex items-center gap-3">
              <span>{dest}</span>
              <span className="text-amber-200">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Problem Section: EDITABLE Forgotten Money Jar */}
      <section className="py-20 bg-gradient-to-b from-amber-500/5 via-saffron-500/5 to-transparent dark:from-indigo-950/40 dark:to-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs font-bold uppercase tracking-wider mb-3">
              <AlertTriangle className="w-4 h-4" />
              The Small Expense Problem
            </div>
            <h2 className="font-sans text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
              "Who paid for the toll? Who bought the water?"
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-3 text-base sm:text-lg">
              Tap chips to drop rupees into the jar. Hover or click the price badge to edit amounts!
            </p>

            <div className="flex items-center justify-center gap-4 mt-4 text-xs font-bold text-saffron-600 dark:text-amber-400">
              <button onClick={handleResetChips} className="flex items-center gap-1 hover:underline">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset default prices</span>
              </button>
              <span>•</span>
              <button onClick={handleClearJar} className="flex items-center gap-1 text-red-500 hover:underline">
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear jar (₹0)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Chips Grid (8 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Tap chip to add to jar • Click price badge to edit ({tinyItems.length}/12 chips):
                </span>
                {tinyItems.length < 12 && (
                  <button
                    onClick={() => setAddPopoverOpen(!addPopoverOpen)}
                    className="px-3 py-1 rounded-xl bg-saffron-500 text-white text-xs font-bold shadow hover:bg-saffron-600 transition-all flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add your own</span>
                  </button>
                )}
              </div>

              {/* Add Custom Chip Popover */}
              {addPopoverOpen && (
                <form
                  onSubmit={handleAddCustomChip}
                  className="p-4 rounded-2xl glass-card border-saffron-400/50 shadow-xl space-y-3 animate-in fade-in"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">Add Custom Tiny Chip</span>
                    <button type="button" onClick={() => setAddPopoverOpen(false)} className="text-slate-400 hover:text-slate-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Chip name (e.g. Coconut)"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="col-span-2 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold"
                    />
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="Amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Emoji:</span>
                    <div className="flex gap-1 overflow-x-auto">
                      {emojiPresets.map((e) => (
                        <button
                          key={e}
                          type="button"
                          onClick={() => setCustomEmoji(e)}
                          className={`p-1 rounded-lg text-sm ${customEmoji === e ? 'bg-amber-400 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                    <button type="submit" className="ml-auto px-4 py-1.5 rounded-xl bg-saffron-500 text-white font-bold text-xs shadow">
                      Save Chip
                    </button>
                  </div>
                </form>
              )}

              {/* Chips Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tinyItems.map((item) => {
                  const isEditing = editingId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => !isEditing && handleAddTinyToJar(item)}
                      tabIndex={0}
                      aria-label={`Add ${item.name} ${formatINR(item.amount)} to jar. Click badge to edit.`}
                      className={`p-3.5 rounded-2xl shadow-md border font-bold flex items-center justify-between transition-all cursor-pointer group hover:scale-[1.02] active:scale-95 focus:ring-2 focus:ring-saffron-500 ${item.color}`}
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <span className="text-lg flex-shrink-0">{item.emoji}</span>
                        <span className="text-xs sm:text-sm truncate">{item.name}</span>
                        {item.isCustom && (
                          <button
                            onClick={(e) => handleDeleteChip(e, item.id)}
                            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 p-0.5 ml-1 transition-opacity"
                            title="Delete chip"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Editable Price Badge */}
                      {isEditing ? (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl shadow-lg border border-saffron-400 flex-shrink-0"
                        >
                          <button
                            type="button"
                            onClick={() => handleAdjustEditAmount(-10)}
                            className="w-5 h-5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-black flex items-center justify-center"
                          >
                            -
                          </button>

                          <input
                            type="number"
                            inputMode="numeric"
                            min="1"
                            max="99999"
                            autoFocus
                            value={editAmount}
                            onChange={(e) => setEditAmount(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveEdit(item.id);
                              if (e.key === 'Escape') setEditingId(null);
                            }}
                            onBlur={() => handleSaveEdit(item.id)}
                            className="w-14 px-1 text-center text-xs font-black bg-transparent text-slate-900 dark:text-white focus:outline-none"
                          />

                          <button
                            type="button"
                            onClick={() => handleAdjustEditAmount(10)}
                            className="w-5 h-5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-black flex items-center justify-center"
                          >
                            +
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSaveEdit(item.id)}
                            className="p-1 rounded-lg bg-emerald-500 text-white"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={(e) => handleStartEdit(e, item)}
                          className="px-2.5 py-1 rounded-xl bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 text-xs font-mono font-black flex items-center gap-1.5 flex-shrink-0 whitespace-nowrap hover:bg-saffron-500 hover:text-white transition-all shadow-sm"
                          title="Click to edit price"
                          aria-label={`Edit amount for ${item.name}, currently ${formatINR(item.amount)}`}
                        >
                          <span>+{formatINR(item.amount)}</span>
                          <Pencil className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: 2X LARGER Glowing Glass Jar Card (5 Cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full glass-card p-8 rounded-3xl border-2 border-amber-400/50 shadow-2xl bg-indigo-950/70 text-center relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-saffron-500/20 to-amber-500/20 rounded-full blur-2xl pointer-events-none" />

                {/* 2X Larger Glass Jar */}
                <div className="relative w-44 h-64 border-4 border-amber-400/80 rounded-b-[40px] rounded-t-2xl mx-auto flex flex-col justify-end p-2 overflow-hidden bg-slate-900/50 shadow-2xl">
                  {/* Glowing Liquid Fill Level */}
                  <motion.div
                    className="bg-gradient-to-t from-saffron-500 via-amber-400 to-amber-300 w-full rounded-b-[32px] shadow-glow-gold transition-all duration-700"
                    style={{ height: `${jarFillPercent}%` }}
                  />

                  {/* Coin Drop Bounce Visual */}
                  {coinDropTrigger > 0 && (
                    <motion.div
                      key={coinDropTrigger}
                      initial={{ y: -160, opacity: 1, scale: 1.5 }}
                      animate={{ y: 0, opacity: 0, scale: 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="absolute inset-x-0 top-6 flex justify-center text-3xl pointer-events-none"
                    >
                      🪙
                    </motion.div>
                  )}

                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-5xl drop-shadow-md">🫙</span>
                    <span className="text-xs font-black text-amber-200 mt-2 font-mono">
                      {jarFillPercent}% Full
                    </span>
                  </div>
                </div>

                {/* Counter & Live Announcement */}
                <div className="mt-6" aria-live="polite">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Total Forgotten Rupee Count
                  </span>
                  <span className="text-5xl font-black text-amber-400 mt-1 block drop-shadow-md">
                    {formatINR(jarTotal)}
                  </span>
                  <p className="text-xs text-slate-300 mt-3">
                    With <span className="font-bold text-amber-300">Shubh Yatra</span>, not a single rupee is lost!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white dark:bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 rounded-full bg-saffron-100 dark:bg-saffron-950 text-saffron-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              How It Works
            </span>
            <h2 className="font-sans text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mt-3">
              Getting Started is Super Simple
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              No complex registration. Create a trip in seconds and share with your gang.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isCurrent = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 rounded-3xl transition-all cursor-pointer border ${
                    isCurrent
                      ? 'bg-gradient-to-b from-saffron-50 to-amber-50 dark:from-slate-900 dark:to-slate-800 border-saffron-500 shadow-xl scale-105'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-saffron-500 font-mono">{step.num}</span>
                    <div className="p-3 rounded-2xl bg-saffron-500/10 text-saffron-600 dark:text-amber-400">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="font-sans text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-20 bg-amber-500/5 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-sans text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
              Tailored Features for Group Travel
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Designed for roadtrips, hill stations, beaches, and group adventures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-3xl shadow-lg border-saffron-200 dark:border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-saffron-500/10 text-saffron-600 flex items-center justify-center mb-4">
                <Vault className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                Trip Vault
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Collect initial pool contributions upfront. Spend directly for common group expenses without hassle.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl shadow-lg border-amber-200 dark:border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4">
                <Receipt className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                5-Second Quick Expenses
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Water bottles, tolls, snacks & tea. Tap big emoji chips to record expenses in under 5 seconds!
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl shadow-lg border-red-200 dark:border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-600 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                Smart Budget Warnings
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Live color-changing progress ring. Green below 75%, Amber near limit, Red pulse on over-budget.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl shadow-lg border-emerald-200 dark:border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                Final Settlement & UPI
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Optimal "Who owes whom" calculation algorithm. Pay via UPI link & download print summary report!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Tagline */}
      <footer className="py-12 bg-slate-900 text-white text-center border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-4">
          <DevanagariLogo size="md" showSubtitle={true} />
          <p className="font-sans text-xl font-bold text-amber-300">
            Every Trip. Every Rupee. Accounted For.
          </p>
          <p className="text-xs text-slate-400">
            © 2026 Shubh Yatra. Built with ❤️ for Group Travellers.
          </p>
        </div>
      </footer>
    </div>
  );
};
