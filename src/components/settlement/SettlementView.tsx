import React, { useState } from 'react';
import { Trip, Expense, VaultContribution, SettlementTransaction } from '../../types';
import { calculateMemberFinancials } from '../../utils/settlement';
import { formatINR } from '../../utils/formatters';
import {
  Scale,
  ArrowRight,
  CheckCircle,
  Printer,
  Share2,
  Vault,
  Receipt,
  Download,
  IndianRupee,
  Check
} from 'lucide-react';

interface SettlementViewProps {
  trip: Trip;
  expenses: Expense[];
  vaultContributions: VaultContribution[];
}

export const SettlementView: React.FC<SettlementViewProps> = ({
  trip,
  expenses,
  vaultContributions,
}) => {
  const financials = calculateMemberFinancials(trip, expenses, vaultContributions);
  const { summaries, totalSpent, vaultBalance, settlements } = financials;

  const [settledIds, setSettledIds] = useState<string[]>([]);

  const handleToggleSettled = (id: string) => {
    if (settledIds.includes(id)) {
      setSettledIds(settledIds.filter((sId) => sId !== id));
    } else {
      setSettledIds([...settledIds, id]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Printable Report Header (Visible only when printing) */}
      <div className="hidden print:block text-center border-b pb-4 mb-6">
        <h1 className="text-3xl font-black">शुभ यात्रा (Shubh Yatra) – Final Trip Settlement</h1>
        <p className="text-sm text-gray-600">
          Trip: {trip.name} • Destination: {trip.destination} • Code: {trip.code}
        </p>
      </div>

      {/* Main Screen Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden border-emerald-500/20 no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-2">
              <Scale className="w-4 h-4 text-emerald-500" />
              <span>अंतिम हिसाब / Final Settlement</span>
            </div>
            <h1 className="font-devanagari text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              "कौन किसे देगा? किससे कितना लेना है?"
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Automated optimal debt resolution algorithm for <span className="font-bold text-slate-800 dark:text-slate-200">{trip.name}</span>.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-extrabold text-xs shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>प्रिंट / PDF डाउनलोड (Print PDF)</span>
          </button>
        </div>

        {/* Overview Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase">कुल खर्च</span>
            <span className="text-lg font-black text-slate-900 dark:text-white block mt-0.5">
              {formatINR(totalSpent)}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-slate-800/60 text-center">
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase">तिजोरी शेष</span>
            <span className="text-lg font-black text-amber-600 dark:text-amber-400 block mt-0.5">
              {formatINR(vaultBalance)}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-slate-800/60 text-center">
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">प्रति सदस्य औसत</span>
            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 block mt-0.5">
              {formatINR(totalSpent / (trip.members.length || 1))}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-purple-50 dark:bg-slate-800/60 text-center">
            <span className="text-[10px] font-bold text-purple-600 dark:text-purple-300 uppercase">लेन-देन संख्या</span>
            <span className="text-lg font-black text-purple-600 dark:text-purple-300 block mt-0.5">
              {settlements.length} Transfers
            </span>
          </div>
        </div>
      </div>

      {/* "Who Owes Whom" Optimal Settlement Transfers */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl shadow-xl border-amber-400/30">
        <h2 className="font-devanagari font-black text-2xl text-slate-900 dark:text-white mb-2">
          🤝 फाइनल लेन-देन (Who Owes Whom)
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Minimal number of transactions required to completely settle all group debts.
        </p>

        {settlements.length === 0 ? (
          <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-center text-emerald-700 dark:text-emerald-300 space-y-2">
            <CheckCircle className="w-8 h-8 mx-auto" />
            <p className="font-bold text-base">सबका हिसाब चुकता है! (All Settled)</p>
            <p className="text-xs">No pending member payments required.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {settlements.map((st) => {
              const isDone = settledIds.includes(st.id);
              const upiUrl = `upi://pay?pa=${st.toUser.upiId || 'paytm@upi'}&pn=${encodeURIComponent(st.toUser.name)}&am=${st.amount}&cu=INR&tn=ShubhYatraSettlement`;
              return (
                <div
                  key={st.id}
                  className={`p-4 sm:p-5 rounded-3xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isDone
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 opacity-60'
                      : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 shadow-md hover:border-amber-400'
                  }`}
                >
                  {/* From User -> To User Row */}
                  <div className="flex items-center gap-3">
                    {/* From User */}
                    <div className="flex items-center gap-2">
                      <img src={st.fromUser.avatar} alt={st.fromUser.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-red-400" />
                      <div>
                        <span className="font-extrabold text-sm text-slate-900 dark:text-white block">
                          {st.fromUser.name.split(' ')[0]}
                        </span>
                        <span className="text-[10px] text-red-500 font-bold uppercase">देगा (Payer)</span>
                      </div>
                    </div>

                    {/* Animated Arrow */}
                    <div className="flex flex-col items-center px-2">
                      <span className="text-xs font-mono font-black text-amber-600 dark:text-amber-400">
                        {formatINR(st.amount)}
                      </span>
                      <ArrowRight className="w-5 h-5 text-amber-500 animate-pulse" />
                    </div>

                    {/* To User */}
                    <div className="flex items-center gap-2">
                      <img src={st.toUser.avatar} alt={st.toUser.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-400" />
                      <div>
                        <span className="font-extrabold text-sm text-slate-900 dark:text-white block">
                          {st.toUser.name.split(' ')[0]}
                        </span>
                        <span className="text-[10px] text-emerald-500 font-bold uppercase">पाएगा (Receiver)</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: UPI & Mark as Done */}
                  <div className="flex items-center gap-2 no-print">
                    <a
                      href={upiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                    >
                      <IndianRupee className="w-3.5 h-3.5" />
                      <span>Pay via UPI</span>
                    </a>

                    <button
                      onClick={() => handleToggleSettled(st.id)}
                      className={`px-3 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1 ${
                        isDone
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isDone ? 'Settled ✅' : 'Mark Paid'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Member Financial Balance Bars Table */}
      <div className="glass-card p-6 rounded-3xl shadow-xl border-saffron-500/20">
        <h3 className="font-devanagari font-bold text-lg text-slate-900 dark:text-white mb-4">
          सदस्यवार नेट बैलेंस (Member Net Balance Matrix)
        </h3>

        <div className="space-y-4">
          {summaries.map((s) => {
            const isReceiving = s.netBalance >= 0;
            return (
              <div
                key={s.user.id}
                className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img src={s.user.avatar} alt={s.user.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {s.user.name} {s.user.role === 'host' ? '👑' : ''}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Paid: {formatINR(s.totalPaidDirectly)} • Vault Contributed: {formatINR(s.totalVaultContributed)} • Share: {formatINR(s.totalExpenseShare)}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-base font-black ${isReceiving ? 'text-emerald-500' : 'text-red-500'}`}>
                    {isReceiving ? `+${formatINR(s.netBalance)} (Gets Back)` : `${formatINR(s.netBalance)} (Owes)`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
