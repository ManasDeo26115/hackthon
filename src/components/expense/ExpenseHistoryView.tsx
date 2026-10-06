import React, { useState } from 'react';
import { Trip, Expense, User } from '../../types';
import { formatINR, formatDate } from '../../utils/formatters';
import {
  History,
  Search,
  Trash2,
  Tag,
  ChevronDown,
  ChevronUp,
  Receipt
} from 'lucide-react';

interface ExpenseHistoryViewProps {
  trip: Trip;
  expenses: Expense[];
  onDeleteExpense: (expenseId: string) => void;
  currentUser: User;
  initialCategoryFilter?: string;
}

export const ExpenseHistoryView: React.FC<ExpenseHistoryViewProps> = ({
  trip,
  expenses,
  onDeleteExpense,
  currentUser,
  initialCategoryFilter = 'All'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryFilter);
  const [onlyTiny, setOnlyTiny] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ['All', 'Travel', 'Fooding', 'Hotel', 'Activity', 'Other'];

  const filteredExpenses = expenses.filter((exp) => {
    if (exp.tripId !== trip.id) return false;

    if (onlyTiny && !exp.isTiny && exp.amount > 200) return false;

    if (selectedCategory !== 'All' && exp.category !== selectedCategory) {
      return false;
    }

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const payer = trip.members.find((m) => m.id === exp.paidBy);
      return (
        exp.title.toLowerCase().includes(q) ||
        exp.category.toLowerCase().includes(q) ||
        (payer && payer.name.toLowerCase().includes(q))
      );
    }

    return true;
  });

  const isHost = currentUser.role === 'host';

  return (
    <div className="space-y-6 pb-20">
      {/* Header Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl shadow-xl border-saffron-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-500/10 text-saffron-700 dark:text-amber-300 text-xs font-bold mb-2">
              <History className="w-4 h-4 text-saffron-500" />
              <span>खर्च का इतिहास / Expense History</span>
            </div>
            <h1 className="font-devanagari text-3xl font-black text-slate-900 dark:text-white">
              सभी खर्चों की सूची ({filteredExpenses.length})
            </h1>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search Box */}
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search expenses by title, category, or paid by..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white"
            />
          </div>

          {/* Tiny Filter Toggle */}
          <button
            onClick={() => setOnlyTiny(!onlyTiny)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
              onlyTiny
                ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>केवल छोटे खर्च (Tiny Only)</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-saffron-500 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Expenses List */}
      <div className="space-y-3">
        {filteredExpenses.length === 0 ? (
          <div className="glass-card p-12 rounded-3xl text-center text-slate-400 space-y-2">
            <Receipt className="w-8 h-8 mx-auto opacity-50" />
            <p className="text-sm font-bold">कोई खर्च नहीं मिला / No Expenses Found</p>
            <p className="text-xs">Try clearing search filters or add a new expense.</p>
          </div>
        ) : (
          filteredExpenses.map((exp) => {
            const payer = trip.members.find((m) => m.id === exp.paidBy);
            const isExpanded = expandedId === exp.id;
            return (
              <div
                key={exp.id}
                className="glass-card rounded-3xl p-4 sm:p-5 shadow-md border-slate-200/60 dark:border-slate-800 transition-all hover:border-saffron-400"
              >
                <div
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {payer && (
                      <img
                        src={payer.avatar}
                        alt={payer.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-saffron-400"
                      />
                    )}
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
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
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Paid by <span className="font-semibold text-slate-800 dark:text-slate-200">{payer?.name}</span> • {exp.category} • {formatDate(exp.date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="font-black text-base sm:text-lg text-saffron-600 dark:text-amber-400 block">
                        {formatINR(exp.amount)}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {exp.appliesTo.length} members share
                      </span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs space-y-3 animate-in fade-in">
                    <div>
                      <span className="font-bold text-slate-500 block mb-1">Applies to members:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.appliesTo.map((userId) => {
                          const m = trip.members.find((u) => u.id === userId);
                          if (!m) return null;
                          return (
                            <span key={userId} className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold">
                              <img src={m.avatar} alt={m.name} className="w-3.5 h-3.5 rounded-full" />
                              <span>{m.name.split(' ')[0]}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {(isHost || exp.paidBy === currentUser.id) && (
                      <div className="flex justify-end pt-2">
                        <button
                          onClick={() => onDeleteExpense(exp.id)}
                          className="px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-300 font-bold text-xs hover:bg-red-100 transition-all flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Expense</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
