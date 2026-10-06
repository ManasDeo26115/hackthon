import React, { useState } from 'react';
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
} from 'lucide-react';
import { formatINR } from '../../utils/formatters';
import { DevanagariLogo } from '../common/DevanagariLogo';

interface LandingPageProps {
  onCreateTripClick: () => void;
  onJoinTripClick: () => void;
  onExploreDemoClick: () => void;
}

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

  const [jarTotal, setJarTotal] = useState(0);
  const tinyItems = [
    { name: '🛣️ Toll Tax', amount: 120, color: 'bg-amber-100 text-amber-800' },
    { name: '💧 Water Bottles', amount: 40, color: 'bg-blue-100 text-blue-800' },
    { name: '🍿 Chai & Samosa', amount: 90, color: 'bg-orange-100 text-orange-800' },
    { name: '🅿️ Beach Parking', amount: 50, color: 'bg-emerald-100 text-emerald-800' },
    { name: '🚻 Toilet Entry', amount: 20, color: 'bg-purple-100 text-purple-800' },
    { name: '⛽ Scooter Petrol', amount: 250, color: 'bg-red-100 text-red-800' },
  ];

  const handleAddTinyToJar = (amount: number) => {
    setJarTotal((prev) => prev + amount);
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
      tag: 'Step 1'
    },
    {
      num: '02',
      title: 'Share Trip ID',
      desc: 'Share your Trip ID (e.g. GOA26X91) with your group via WhatsApp or link.',
      icon: Share2,
      tag: 'Step 2'
    },
    {
      num: '03',
      title: 'Host Approves',
      desc: 'The 👑 Trip Host reviews each join request for maximum privacy and control.',
      icon: ShieldCheck,
      tag: 'Step 3'
    },
    {
      num: '04',
      title: 'Track Every Rupee',
      desc: 'Add large & tiny expenses instantly. Trip Vault, budget warnings, and final settlement update live!',
      icon: Scale,
      tag: 'Step 4'
    }
  ];

  return (
    <div className="relative min-w-full overflow-hidden">
      {/* Scroll Progress Bar at Top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-saffron-500 via-amber-400 to-saffron-600 z-50 origin-left"
        style={{ scaleX }}
      />

      <div className="absolute inset-0 mandala-pattern opacity-40 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 sm:pt-20 sm:pb-32 overflow-hidden bg-gradient-to-b from-saffron-500/10 via-amber-500/5 to-transparent dark:from-indigo-950/40 dark:via-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Welcome Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-saffron-500/30 text-saffron-700 dark:text-amber-300 text-sm font-semibold mb-6 shadow-sm backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
            <span>Welcome to your trip 🙏</span>
          </motion.div>

          {/* Hero Devanagari Title & Subtitle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col items-center justify-center my-4"
          >
            <h1 className="font-devanagari font-black text-6xl sm:text-8xl lg:text-9xl tracking-tight text-slate-900 dark:text-white leading-tight">
              <span className="gold-shimmer-text drop-shadow-lg">
                शुभ यात्रा
              </span>
            </h1>
            <p className="text-xl sm:text-2xl font-bold tracking-widest text-saffron-700 dark:text-amber-300 uppercase font-sans mt-2">
              Shubh Yatra
            </p>
          </motion.div>

          {/* English Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto space-y-2 mt-4"
          >
            <h2 className="font-sans text-2xl sm:text-4xl font-extrabold text-slate-800 dark:text-amber-100">
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
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-saffron-500 via-amber-500 to-saffron-600 text-white font-extrabold text-lg shadow-glow-saffron hover:shadow-glow-gold hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
            >
              <PlusCircle className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              <span>Create Trip</span>
            </button>

            <button
              onClick={onJoinTripClick}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-card text-slate-800 dark:text-slate-100 font-extrabold text-lg shadow-lg hover:border-amber-400 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <LogIn className="w-6 h-6 text-amber-500" />
              <span>Join Trip</span>
            </button>

            <button
              onClick={onExploreDemoClick}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 font-bold text-base shadow-md hover:bg-slate-800 dark:hover:bg-amber-300 transition-all flex items-center justify-center gap-2"
            >
              <span>Goa 2026 Demo 🏖️</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Floating Hero Showcase Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left"
          >
            {/* Card 1: Active Trip Preview */}
            <div className="glass-card p-6 rounded-3xl shadow-2xl relative overflow-hidden group border-saffron-500/20 hover:border-saffron-500/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-saffron-100 dark:bg-saffron-950/60 text-saffron-700 dark:text-amber-400 text-xs font-black uppercase">
                  🚗 Goa Roadtrip 2026
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">ID: GOA26X91</span>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                ₹18,500 <span className="text-xs text-slate-500 font-normal">spent of ₹30,000</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full mt-4 overflow-hidden">
                <div className="bg-gradient-to-r from-saffron-500 to-amber-400 h-full w-[62%] rounded-full" />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-3">
                <span>Safe Spending (61.6%)</span>
                <span className="font-bold text-emerald-500">₹11,500 Left</span>
              </div>
            </div>

            {/* Card 2: Trip Vault Preview */}
            <div className="glass-card p-6 rounded-3xl shadow-2xl relative overflow-hidden group border-amber-500/20 hover:border-amber-500/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Vault className="w-5 h-5 text-amber-500" />
                  <span className="font-bold text-sm text-slate-800 dark:text-slate-200">Trip Vault</span>
                </div>
                <span className="text-xs text-emerald-500 font-bold">5 Members</span>
              </div>
              <div className="text-3xl font-black text-amber-600 dark:text-amber-400">
                ₹10,000 <span className="text-xs text-slate-500 font-normal">pool fund</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                Each member contributed ₹2,000 upfront. Pay toll, parking & snacks directly from pool!
              </p>
            </div>

            {/* Card 3: Quick Expense Preview */}
            <div className="glass-card p-6 rounded-3xl shadow-2xl relative overflow-hidden group border-emerald-500/20 hover:border-emerald-500/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-emerald-500" />
                  <span className="font-bold text-sm text-slate-800 dark:text-slate-200">5-Sec Quick Entry</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Live</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-amber-300">💧 Water ₹40</span>
                <span className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-amber-300">🛣️ Toll ₹120</span>
                <span className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-amber-300">🍿 Chai ₹90</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
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

      {/* Problem Section: Tiny Expenses Forgotten Money Jar */}
      <section className="py-20 bg-amber-500/5 dark:bg-slate-900/60 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs font-bold uppercase tracking-wider mb-4">
            <AlertTriangle className="w-4 h-4" />
            The Small Expense Problem
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            "Who paid for the toll? Who bought the water?"
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mt-4 text-base sm:text-lg">
            Big bills like hotels are easy to remember. But tiny expenses add up to thousands of forgotten rupees.
            Tap tiny expense chips below to watch them collect into the jar!
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
            {/* Tappable Tiny Expense Bubbles */}
            <div className="space-y-4 text-left">
              <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider">
                Tap to drop into Forgotten Money Jar:
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {tinyItems.map((item, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddTinyToJar(item.amount)}
                    className={`p-4 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 font-bold flex items-center justify-between ${item.color}`}
                  >
                    <span>{item.name}</span>
                    <span className="text-sm bg-white/80 dark:bg-slate-900/80 px-2 py-1 rounded-lg">
                      +{formatINR(item.amount)}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Interactive Forgotten Money Jar */}
            <div className="glass-card p-8 rounded-3xl text-center relative border-amber-400/40 shadow-2xl flex flex-col items-center justify-center">
              <div className="w-28 h-36 border-4 border-amber-500/60 rounded-b-3xl rounded-t-lg relative flex flex-col justify-end p-2 overflow-hidden bg-amber-50/30 dark:bg-slate-800/30">
                <motion.div
                  className="bg-gradient-to-t from-saffron-500 to-amber-400 w-full rounded-b-2xl transition-all duration-500"
                  style={{
                    height: `${Math.min(100, (jarTotal / 1000) * 100)}%`
                  }}
                />
                <span className="absolute inset-0 flex items-center justify-center font-black text-2xl text-slate-800 dark:text-white drop-shadow">
                  🫙
                </span>
              </div>
              <div className="mt-4">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
                  Total Forgotten Rupee Count
                </span>
                <span className="text-4xl font-extrabold text-saffron-600 dark:text-amber-400 mt-1 block">
                  {formatINR(jarTotal)}
                </span>
                <p className="text-xs text-slate-400 mt-2">
                  With <span className="font-bold text-slate-700 dark:text-slate-200">Shubh Yatra</span>, not a single rupee is lost!
                </p>
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
