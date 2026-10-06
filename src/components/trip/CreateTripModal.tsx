import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { TransportMode, Trip, User } from '../../types';
import { generateTripCode } from '../../utils/formatters';
import {
  Car,
  Train,
  Bus,
  Plane,
  Bike,
  X,
  Copy,
  Check,
  Share2,
  Sparkles,
  MapPin,
  Calendar,
  IndianRupee,
  Crown
} from 'lucide-react';

interface CreateTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTripCreated: (newTrip: Trip) => void;
  currentUser: User;
}

export const CreateTripModal: React.FC<CreateTripModalProps> = ({
  isOpen,
  onClose,
  onTripCreated,
  currentUser
}) => {
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [returnDate, setReturnDate] = useState(
    new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [transport, setTransport] = useState<TransportMode>('car');
  const [expectedBudget, setExpectedBudget] = useState('30000');

  const [createdTrip, setCreatedTrip] = useState<Trip | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !destination || !expectedBudget) return;

    const tripCode = generateTripCode(destination);
    const hostUser: User = {
      ...currentUser,
      role: 'host'
    };

    const newTrip: Trip = {
      id: `trip-${Date.now()}`,
      code: tripCode,
      name,
      destination,
      startLocation: startLocation || 'Home',
      startDate,
      returnDate,
      transport,
      expectedBudget: parseFloat(expectedBudget) || 30000,
      hostId: hostUser.id,
      members: [hostUser],
      createdAt: new Date().toISOString()
    };

    setCreatedTrip(newTrip);

    // Fire Confetti!
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F97316', '#FBBF24', '#10B981', '#6366F1']
    });

    onTripCreated(newTrip);
  };

  const handleCopyCode = () => {
    if (!createdTrip) return;
    navigator.clipboard.writeText(createdTrip.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    if (!createdTrip) return;
    const text = encodeURIComponent(
      `🚩 *शुभ यात्रा (Shubh Yatra)* 🚩\n\nJoin our trip "${createdTrip.name}"!\n\nDestination: ${createdTrip.destination}\nTrip ID: *${createdTrip.code}*\n\nDownload/Open Shubh Yatra app and enter Trip ID to request join!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const transportOptions: { id: TransportMode; label: string; icon: any }[] = [
    { id: 'car', label: 'कार (Car)', icon: Car },
    { id: 'train', label: 'ट्रेन (Train)', icon: Train },
    { id: 'bus', label: 'बस (Bus)', icon: Bus },
    { id: 'flight', label: 'फ्लाइट (Flight)', icon: Plane },
    { id: 'bike', label: 'बाइक (Bike)', icon: Bike },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg glass-card rounded-3xl shadow-2xl p-6 sm:p-8 border border-amber-400/30 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {!createdTrip ? (
          /* Create Form */
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-amber-400">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="font-devanagari text-2xl font-black text-slate-900 dark:text-white">
                नई यात्रा बनाएँ (Create Trip)
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              You will become the 👑 Trip Host and receive full management rights.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Trip Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  यात्रा का नाम / Trip Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Goa Roadtrip 2026 🏖️, Manali Trek 🏔️"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                />
              </div>

              {/* Destination & Starting Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    गंतव्य / Destination *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-saffron-500 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Goa, India"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full pl-9 pr-3 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    शुरुआती स्थान / Start Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai"
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    शुरू तिथि / Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-saffron-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    वापसी तिथि / Return Date
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-saffron-500"
                  />
                </div>
              </div>

              {/* Mode of Transport Chips */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  वाहन का साधन / Mode of Transport
                </label>
                <div className="flex flex-wrap gap-2">
                  {transportOptions.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = transport === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setTransport(opt.id)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-saffron-500 to-amber-500 text-white shadow-md scale-105'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Expected Budget */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  अनुमानित बजट / Expected Budget (₹) *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-lg font-bold text-saffron-500">₹</span>
                  <input
                    type="number"
                    required
                    min="1000"
                    step="1000"
                    placeholder="30000"
                    value={expectedBudget}
                    onChange={(e) => setExpectedBudget(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-base font-extrabold text-slate-900 dark:text-white focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-saffron-500 via-amber-500 to-saffron-600 text-white font-extrabold text-base shadow-glow-saffron hover:scale-[1.02] active:scale-95 transition-all mt-4"
              >
                यात्रा जनरेट करें (Generate Trip ID) 🚀
              </button>
            </form>
          </div>
        ) : (
          /* Celebratory Success Card */
          <div className="text-center py-4 space-y-5 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/40 animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>

            <h3 className="font-devanagari text-3xl font-black text-slate-900 dark:text-white">
              शुभकामनाएँ! यात्रा तैयार है 🎉
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              You are now the <span className="font-bold text-saffron-600">👑 Trip Host</span> for{' '}
              <span className="font-bold text-slate-800 dark:text-slate-200">{createdTrip.name}</span>.
            </p>

            {/* Generated Trip ID Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-saffron-50 dark:from-slate-900 dark:to-slate-800 border-2 border-dashed border-saffron-400 relative shadow-inner">
              <span className="text-[11px] font-extrabold text-saffron-600 dark:text-amber-400 uppercase tracking-widest block mb-1">
                Your Unique Trip ID
              </span>
              <div className="text-4xl font-mono font-black text-slate-900 dark:text-white tracking-widest my-2 select-all">
                {createdTrip.code}
              </div>
              <p className="text-[11px] text-slate-500">
                Share this ID with friends. They will need your approval to join.
              </p>
            </div>

            {/* Copy & Share Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCopyCode}
                className="flex-1 py-3 px-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold text-xs text-slate-800 dark:text-slate-100 hover:bg-slate-50 flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Trip ID'}</span>
              </button>

              <button
                onClick={handleWhatsAppShare}
                className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>WhatsApp पर शेयर करें</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-saffron-500 text-white font-extrabold text-sm shadow-md hover:bg-saffron-600 transition-all mt-2"
            >
              डैशबोर्ड पर जाएँ (Go to Dashboard) ➡️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
