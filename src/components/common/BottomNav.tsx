import React from 'react';
import { LayoutDashboard, PlusCircle, Vault, CalendarCheck, Scale } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onQuickAddClick: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  onQuickAddClick
}) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vault', label: 'Vault', icon: Vault },
    { id: 'add-expense', label: 'Expense', icon: PlusCircle, isMain: true },
    { id: 'planner', label: 'Planner', icon: CalendarCheck },
    { id: 'settlement', label: 'Settlement', icon: Scale },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800/80 px-2 py-1.5 shadow-2xl transition-all">
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.isMain) {
            return (
              <button
                key={tab.id}
                onClick={onQuickAddClick}
                className="relative -top-5 flex flex-col items-center justify-center group focus:outline-none"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-saffron-600 via-amber-500 to-saffron-500 text-white flex items-center justify-center shadow-lg shadow-saffron-500/40 border-4 border-white dark:border-slate-900 group-active:scale-95 transition-all">
                  <PlusCircle className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-bold text-saffron-600 dark:text-amber-400 mt-0.5">
                  + Add
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-saffron-600 dark:text-amber-400 font-bold scale-105'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] mt-0.5 font-medium">{tab.label}</span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-saffron-500 dark:bg-amber-400 mt-0.5 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
