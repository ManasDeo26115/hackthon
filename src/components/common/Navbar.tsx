import React, { useState } from 'react';
import { DevanagariLogo } from './DevanagariLogo';
import { Trip, User } from '../../types';
import {
  Sun,
  Moon,
  Users,
  ChevronDown,
  PlusCircle,
  LogIn,
  RotateCcw,
  Sparkles,
  LayoutDashboard,
  Receipt,
  Vault,
  CalendarCheck,
  History,
  Scale
} from 'lucide-react';

interface NavbarProps {
  activeTrip: Trip | null;
  allTrips: Trip[];
  onSelectTrip: (tripId: string) => void;
  onCreateTripClick: () => void;
  onJoinTripClick: () => void;
  onOpenHostApprovalModal: () => void;
  pendingRequestsCount: number;
  currentUser: User;
  onSwitchUserRole: (userId: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onResetData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTrip,
  allTrips,
  onSelectTrip,
  onCreateTripClick,
  onJoinTripClick,
  onOpenHostApprovalModal,
  pendingRequestsCount,
  currentUser,
  onSwitchUserRole,
  darkMode,
  onToggleDarkMode,
  activeTab,
  onSelectTab,
  onResetData
}) => {
  const [tripDropdownOpen, setTripDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'add-expense', label: 'Add Expense', icon: Receipt },
    { id: 'vault', label: 'Trip Vault', icon: Vault },
    { id: 'planner', label: 'Planner', icon: CalendarCheck },
    { id: 'history', label: 'History', icon: History },
    { id: 'settlement', label: 'Settlement', icon: Scale },
  ];

  return (
    <header className="sticky top-0 z-40 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div className="cursor-pointer" onClick={() => onSelectTab('landing')}>
          <DevanagariLogo size="sm" showSubtitle={true} />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-amber-500/10 dark:bg-slate-800/60 p-1.5 rounded-full border border-amber-500/20">
          <button
            onClick={() => onSelectTab('landing')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'landing'
                ? 'bg-saffron-500 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-200 hover:text-saffron-600'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Home
          </button>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-saffron-500 to-amber-500 text-white shadow-md'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Trip Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setTripDropdownOpen(!tripDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-saffron-200 dark:border-slate-700 shadow-sm text-xs font-bold text-slate-800 dark:text-slate-100 hover:border-saffron-400 transition-all max-w-[160px] sm:max-w-[200px] truncate"
            >
              <span className="truncate">{activeTrip ? activeTrip.name : 'Select Trip'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-saffron-500 flex-shrink-0" />
            </button>

            {tripDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 px-3 py-1 uppercase tracking-wider">
                  Your Trips
                </div>
                <div className="space-y-1 my-1">
                  {allTrips.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        onSelectTrip(t.id);
                        setTripDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${
                        activeTrip?.id === t.id
                          ? 'bg-saffron-50 dark:bg-saffron-950/40 text-saffron-600 dark:text-amber-400 border border-saffron-200 dark:border-saffron-800/50'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <span className="truncate">{t.name}</span>
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded font-mono">
                        {t.code}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="border-t border-slate-100 dark:border-slate-700 pt-2 mt-1 space-y-1">
                  <button
                    onClick={() => {
                      onCreateTripClick();
                      setTripDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-saffron-600 dark:text-amber-400 hover:bg-saffron-50 dark:hover:bg-saffron-950/30 flex items-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Create Trip</span>
                  </button>

                  <button
                    onClick={() => {
                      onJoinTripClick();
                      setTripDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                  >
                    <LogIn className="w-4 h-4 text-amber-500" />
                    <span>Join Trip</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Pending Host Approvals */}
          {activeTrip && currentUser.role === 'host' && (
            <button
              onClick={onOpenHostApprovalModal}
              title="Host Approvals"
              className="relative p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-100 transition-all flex items-center gap-1 text-xs font-bold"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Approvals</span>
              {pendingRequestsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-md">
                  {pendingRequestsCount}
                </span>
              )}
            </button>
          )}

          {/* User Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-amber-500/10 dark:bg-slate-800 border border-amber-400/30 text-xs font-bold text-slate-800 dark:text-slate-100 hover:bg-amber-500/20 transition-all"
              title="Switch Active User Profile"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-6 h-6 rounded-full object-cover ring-2 ring-saffron-500"
              />
              <span className="hidden md:inline font-semibold max-w-[90px] truncate">
                {currentUser.name.split(' ')[0]} {currentUser.role === 'host' ? '👑' : ''}
              </span>
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 p-2 z-50">
                <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 px-3 py-1 uppercase tracking-wider">
                  Switch User Profile
                </div>
                <div className="space-y-1 my-1">
                  {activeTrip?.members.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        onSwitchUserRole(m.id);
                        setUserDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
                        currentUser.id === m.id
                          ? 'bg-amber-100 dark:bg-slate-700 text-saffron-600 dark:text-amber-300 font-bold'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <img src={m.avatar} alt={m.name} className="w-6 h-6 rounded-full object-cover" />
                      <div className="flex flex-col truncate">
                        <span className="truncate">
                          {m.name} {m.role === 'host' ? '👑 (Host)' : ''}
                        </span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {m.role === 'host' ? 'Full Access' : 'Member (Read-only Planner)'}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-saffron-100 dark:hover:bg-slate-700 transition-all"
            title="Toggle Light/Dark Theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-900" />}
          </button>

          {/* Reset Demo Data Button */}
          <button
            onClick={onResetData}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-all hidden sm:block"
            title="Reset Demo Data (Goa 2026)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
