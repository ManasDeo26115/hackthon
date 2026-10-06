import React, { useState } from 'react';
import { Trip, JoinRequest } from '../../types';
import { X, LogIn, Clock, AlertCircle, CheckCircle2, Search } from 'lucide-react';

interface JoinTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  allTrips: Trip[];
  onJoinRequested: (newRequest: JoinRequest) => void;
}

export const JoinTripModal: React.FC<JoinTripModalProps> = ({
  isOpen,
  onClose,
  allTrips,
  onJoinRequested,
}) => {
  const [tripCode, setTripCode] = useState('');
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [upiId, setUpiId] = useState('');
  const [submittedRequest, setSubmittedRequest] = useState<JoinRequest | null>(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanCode = tripCode.trim().toUpperCase();
    const matchedTrip = allTrips.find((t) => t.code.toUpperCase() === cleanCode);

    if (!matchedTrip) {
      setError(`Trip ID "${cleanCode}" not found! Please verify code with the host.`);
      return;
    }

    const newRequest: JoinRequest = {
      id: `req-${Date.now()}`,
      tripId: matchedTrip.id,
      userName: userName || 'New Traveller',
      phone: phone || '+91 99999 88888',
      upiId: upiId || `${userName.toLowerCase().replace(/\s+/g, '')}@upi`,
      requestedAt: new Date().toISOString(),
      status: 'pending'
    };

    setSubmittedRequest(newRequest);
    onJoinRequested(newRequest);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md glass-card rounded-3xl shadow-2xl p-6 sm:p-8 border border-amber-400/30">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedRequest ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <LogIn className="w-5 h-5" />
              </span>
              <h2 className="font-devanagari text-2xl font-black text-slate-900 dark:text-white">
                यात्रा से जुड़ें (Join Trip)
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Enter the unique 8-character Trip ID shared by your Trip Host.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-2xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-xs font-bold text-red-600 dark:text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Trip ID (e.g. GOA26X91) *
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-amber-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="GOA26X91"
                    maxLength={10}
                    value={tripCode}
                    onChange={(e) => setTripCode(e.target.value.toUpperCase())}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-base font-mono font-black tracking-widest text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  आपका नाम / Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohan Sharma"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  फ़ोन नंबर / Mobile Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 91234 56789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-saffron-500 to-amber-600 text-white font-extrabold text-base shadow-glow-gold hover:scale-[1.02] active:scale-95 transition-all mt-2"
              >
                जुड़ने के लिए रिक्वेस्ट भेजें (Request to Join) 📩
              </button>
            </form>
          </div>
        ) : (
          /* Waiting for Host Approval Screen */
          <div className="text-center py-4 space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-300 mx-auto flex items-center justify-center border-2 border-amber-400">
              <Clock className="w-8 h-8 animate-spin-slow" />
            </div>

            <h3 className="font-devanagari text-2xl font-black text-slate-900 dark:text-white">
              होस्ट की मंज़ूरी का इंतज़ार ⏳
            </h3>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-amber-700 text-left text-xs space-y-1">
              <p className="font-bold text-slate-800 dark:text-slate-200">
                Request Details:
              </p>
              <p className="text-slate-600 dark:text-slate-400">Name: {submittedRequest.userName}</p>
              <p className="text-slate-600 dark:text-slate-400">Trip ID: {tripCode}</p>
              <p className="text-slate-600 dark:text-slate-400">Status: Pending Approval</p>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              The Trip ID alone does not give access. The 👑 Trip Host will review your request and approve access shortly.
            </p>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all"
            >
              ठीक है (Got It)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
