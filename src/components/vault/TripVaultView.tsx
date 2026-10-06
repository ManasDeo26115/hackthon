import React, { useState } from 'react';
import { Trip, VaultContribution, Expense, User } from '../../types';
import { formatINR, formatDate } from '../../utils/formatters';
import { Vault, PlusCircle, Check, ArrowDownLeft, ShieldCheck, History, X } from 'lucide-react';

interface TripVaultViewProps {
  trip: Trip;
  vaultContributions: VaultContribution[];
  expenses: Expense[];
  onAddContribution: (newContrib: VaultContribution) => void;
  currentUser: User;
}

export const TripVaultView: React.FC<TripVaultViewProps> = ({
  trip,
  vaultContributions,
  expenses,
  onAddContribution,
  currentUser
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState('2000');
  const [notes, setNotes] = useState('Pool Top-Up');
  const [selectedUser, setSelectedUser] = useState<string>(currentUser.id);

  const totalContributions = vaultContributions
    .filter((v) => v.tripId === trip.id)
    .reduce((sum, c) => sum + c.amount, 0);

  const vaultExpenses = expenses.filter((e) => e.tripId === trip.id && e.isVaultPaid);
  const vaultExpensesTotal = vaultExpenses.reduce((sum, e) => sum + e.amount, 0);
  const vaultBalance = totalContributions - vaultExpensesTotal;

  const fillPercentage = totalContributions > 0 ? Math.max(0, Math.min(100, Math.round((vaultBalance / totalContributions) * 100))) : 0;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    const newContrib: VaultContribution = {
      id: `v-${Date.now()}`,
      tripId: trip.id,
      userId: selectedUser,
      amount: parsedAmount,
      date: new Date().toISOString(),
      notes
    };

    onAddContribution(newContrib);
    setModalOpen(false);
    setAmount('2000');
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden border-amber-400/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-300 text-xs font-bold mb-2">
              <Vault className="w-4 h-4 text-amber-500" />
              <span>सामूहिक तिजोरी (Trip Vault)</span>
            </div>
            <h1 className="font-devanagari text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              ग्रुप का कॉमन पूल फंड
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Collect initial pool money upfront. Pay for tolls, snacks, tea & water directly without individual payments.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-saffron-500 text-white font-extrabold text-sm shadow-glow-gold hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            <span>राशि जोड़ें (Add Pool Money)</span>
          </button>
        </div>

        {/* Vault Big Balance Meter */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-[11px] font-semibold text-slate-400 block">कुल जमा Pool</span>
                <span className="text-xl font-black text-slate-900 dark:text-white block mt-1">
                  {formatINR(totalContributions)}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40">
                <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-300 block">तिजोरी खर्च</span>
                <span className="text-xl font-black text-purple-600 dark:text-purple-300 block mt-1">
                  {formatINR(vaultExpensesTotal)}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40">
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-300 block">बची राशि</span>
                <span className="text-xl font-black text-emerald-600 dark:text-emerald-300 block mt-1">
                  {formatINR(vaultBalance)}
                </span>
              </div>
            </div>

            {/* Rising Level Animation Meter */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-500">
                <span>Vault Level ({fillPercentage}%)</span>
                <span>{formatINR(vaultBalance)} Remaining</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-4 rounded-full overflow-hidden p-0.5">
                <div
                  className="bg-gradient-to-r from-amber-500 via-saffron-500 to-emerald-400 h-full rounded-full transition-all duration-700"
                  style={{ width: `${fillPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Animated Coin Fill Visual */}
          <div className="glass-card p-4 rounded-3xl text-center border-amber-400/40 shadow-inner flex flex-col items-center justify-center">
            <span className="text-5xl mb-2">💰</span>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
              Safe Group Pool
            </span>
            <span className="text-[10px] text-slate-400 mt-1">
              Updated live with every trip expense
            </span>
          </div>
        </div>
      </div>

      {/* Member Contributions Breakdown Table */}
      <div className="glass-card p-6 rounded-3xl shadow-xl border-saffron-500/20">
        <h3 className="font-devanagari font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-saffron-500" />
          <span>सदस्यों का योगदान / Member Contributions</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trip.members.map((m) => {
            const memberContribs = vaultContributions.filter((v) => v.tripId === trip.id && v.userId === m.id);
            const sum = memberContribs.reduce((acc, c) => acc + c.amount, 0);
            return (
              <div
                key={m.id}
                className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-saffron-400" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                      {m.name} {m.role === 'host' ? '👑' : ''}
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      {memberContribs.length} deposits made
                    </p>
                  </div>
                </div>

                <span className="font-black text-sm text-amber-600 dark:text-amber-400">
                  {formatINR(sum)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Vault Expense Log */}
      <div className="glass-card p-6 rounded-3xl shadow-xl border-purple-500/20">
        <h3 className="font-devanagari font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <History className="w-5 h-5 text-purple-500" />
          <span>तिजोरी से भुगतान किए गए खर्च / Vault Expenses Log</span>
        </h3>

        {vaultExpenses.length === 0 ? (
          <p className="text-xs text-slate-400 py-6 text-center">
            No expenses paid directly from vault yet. Tick "Pay from Trip Vault" while adding expenses.
          </p>
        ) : (
          <div className="space-y-2">
            {vaultExpenses.map((exp) => (
              <div
                key={exp.id}
                className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-slate-900/60 border border-purple-200 dark:border-purple-900/50 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600">
                    <ArrowDownLeft className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                      {exp.title}
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      Category: {exp.category} • Date: {formatDate(exp.date)}
                    </p>
                  </div>
                </div>

                <span className="font-black text-sm text-purple-600 dark:text-purple-300">
                  -{formatINR(exp.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal to Add Vault Contribution */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md glass-card rounded-3xl shadow-2xl p-6 sm:p-8 border border-amber-400/30">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
                <Vault className="w-5 h-5" />
              </span>
              <h2 className="font-devanagari text-2xl font-black text-slate-900 dark:text-white">
                तिजोरी में राशि जोड़ें (Add Pool Deposit)
              </h2>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  सदस्य चुनें / Member *
                </label>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                >
                  {trip.members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.upiId || 'Pool'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  राशि / Amount (₹) *
                </label>
                <input
                  type="number"
                  required
                  min="100"
                  step="100"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-base font-extrabold text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  नोट्स / Notes
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-saffron-500 text-white font-extrabold text-base shadow-glow-gold hover:scale-[1.02] active:scale-95 transition-all mt-2"
              >
                राशि जमा करें (Deposit Funds) 💰
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
