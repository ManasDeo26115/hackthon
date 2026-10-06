import React, { useState, useEffect } from 'react';
import {
  initializeStorage,
  getTrips,
  saveTrips,
  getActiveTripId,
  setActiveTripId,
  getExpenses,
  saveExpenses,
  getVaultContributions,
  saveVaultContributions,
  getJoinRequests,
  saveJoinRequests,
  getReminders,
  saveReminders,
  getChecklist,
  saveChecklist,
  getPlaces,
  savePlaces,
  getCurrentUserId,
  setCurrentUserId,
  resetToSeedData
} from './utils/storage';
import { Trip, Expense, VaultContribution, JoinRequest, Reminder, ChecklistItem, PlaceToVisit, User } from './types';
import { calculateMemberFinancials } from './utils/settlement';
import { Navbar } from './components/common/Navbar';
import { BottomNav } from './components/common/BottomNav';
import { CustomCursor } from './components/common/CustomCursor';
import { LandingPage } from './components/landing/LandingPage';
import { TripDashboard } from './components/dashboard/TripDashboard';
import { CreateTripModal } from './components/trip/CreateTripModal';
import { JoinTripModal } from './components/trip/JoinTripModal';
import { HostApprovalModal } from './components/trip/HostApprovalModal';
import { AddExpenseModal } from './components/expense/AddExpenseModal';
import { TripVaultView } from './components/vault/TripVaultView';
import { TripPlannerView } from './components/planner/TripPlannerView';
import { ExpenseHistoryView } from './components/expense/ExpenseHistoryView';
import { SettlementView } from './components/settlement/SettlementView';

export function App() {
  // Initialize Storage on first load
  useEffect(() => {
    initializeStorage();
  }, []);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('shubh_yatra_dark_mode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('shubh_yatra_dark_mode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Main Application State
  const [allTrips, setAllTrips] = useState<Trip[]>(getTrips);
  const [activeTripId, setActiveTripIdState] = useState<string>(getActiveTripId);
  const [expenses, setExpensesState] = useState<Expense[]>(getExpenses);
  const [vaultContributions, setVaultContributionsState] = useState<VaultContribution[]>(getVaultContributions);
  const [joinRequests, setJoinRequestsState] = useState<JoinRequest[]>(getJoinRequests);
  const [reminders, setRemindersState] = useState<Reminder[]>(getReminders);
  const [checklist, setChecklistState] = useState<ChecklistItem[]>(getChecklist);
  const [places, setPlacesState] = useState<PlaceToVisit[]>(getPlaces);
  const [currentUserId, setCurrentUserIdState] = useState<string>(getCurrentUserId);

  const [activeTab, setActiveTab] = useState<string>('landing');
  const [historyCategoryFilter, setHistoryCategoryFilter] = useState<string>('All');

  // Modal Visibility States
  const [isCreateTripModalOpen, setIsCreateTripModalOpen] = useState(false);
  const [isJoinTripModalOpen, setIsJoinTripModalOpen] = useState(false);
  const [isHostApprovalModalOpen, setIsHostApprovalModalOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

  // Active Trip Object
  const activeTrip = allTrips.find((t) => t.id === activeTripId) || allTrips[0] || null;

  // Active User Object
  const currentUser: User = activeTrip?.members.find((m) => m.id === currentUserId) ||
    activeTrip?.members.find((m) => m.role === 'host') || {
      id: 'user-1',
      name: 'Vikram Singh',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'host'
    };

  // Pending Join Requests for active trip
  const pendingRequests = joinRequests.filter(
    (r) => r.tripId === activeTrip?.id && r.status === 'pending'
  );

  // Computed Financials
  const financials = calculateMemberFinancials(
    activeTrip,
    expenses,
    vaultContributions
  );

  // Event Handlers & State Updaters
  const handleSelectTrip = (tripId: string) => {
    setActiveTripIdState(tripId);
    setActiveTripId(tripId);
    setActiveTab('dashboard');
  };

  const handleTripCreated = (newTrip: Trip) => {
    const updatedTrips = [newTrip, ...allTrips];
    setAllTrips(updatedTrips);
    saveTrips(updatedTrips);
    setActiveTripIdState(newTrip.id);
    setActiveTripId(newTrip.id);
    setCurrentUserIdState(newTrip.hostId);
    setCurrentUserId(newTrip.hostId);
    setActiveTab('dashboard');
  };

  const handleJoinRequested = (newRequest: JoinRequest) => {
    const updated = [newRequest, ...joinRequests];
    setJoinRequestsState(updated);
    saveJoinRequests(updated);
  };

  const handleAcceptRequest = (req: JoinRequest) => {
    // Add user to active trip members
    const newMember: User = {
      id: `user-${Date.now()}`,
      name: req.userName,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${req.userName}`,
      phone: req.phone,
      upiId: req.upiId,
      role: 'member'
    };

    const updatedTrips = allTrips.map((t) => {
      if (t.id === req.tripId) {
        return { ...t, members: [...t.members, newMember] };
      }
      return t;
    });

    const updatedRequests = joinRequests.map((r) =>
      r.id === req.id ? { ...r, status: 'accepted' as const } : r
    );

    setAllTrips(updatedTrips);
    saveTrips(updatedTrips);
    setJoinRequestsState(updatedRequests);
    saveJoinRequests(updatedRequests);
  };

  const handleRejectRequest = (reqId: string) => {
    const updatedRequests = joinRequests.map((r) =>
      r.id === reqId ? { ...r, status: 'rejected' as const } : r
    );
    setJoinRequestsState(updatedRequests);
    saveJoinRequests(updatedRequests);
  };

  const handleSaveExpense = (newExpense: Expense) => {
    const updated = [newExpense, ...expenses];
    setExpensesState(updated);
    saveExpenses(updated);
  };

  const handleDeleteExpense = (expId: string) => {
    const updated = expenses.filter((e) => e.id !== expId);
    setExpensesState(updated);
    saveExpenses(updated);
  };

  const handleAddVaultContribution = (newContrib: VaultContribution) => {
    const updated = [...vaultContributions, newContrib];
    setVaultContributionsState(updated);
    saveVaultContributions(updated);
  };

  const handleUpdateReminders = (newReminders: Reminder[]) => {
    setRemindersState(newReminders);
    saveReminders(newReminders);
  };

  const handleUpdateChecklist = (newChecklist: ChecklistItem[]) => {
    setChecklistState(newChecklist);
    saveChecklist(newChecklist);
  };

  const handleUpdatePlaces = (newPlaces: PlaceToVisit[]) => {
    setPlacesState(newPlaces);
    savePlaces(newPlaces);
  };

  const handleSwitchUserRole = (userId: string) => {
    setCurrentUserIdState(userId);
    setCurrentUserId(userId);
  };

  const handleResetData = () => {
    if (window.confirm('Reset demo data to initial Goa Trip 2026?')) {
      resetToSeedData();
      setAllTrips(getTrips());
      setActiveTripIdState(getActiveTripId());
      setExpensesState(getExpenses());
      setVaultContributionsState(getVaultContributions());
      setJoinRequestsState(getJoinRequests());
      setRemindersState(getReminders());
      setChecklistState(getChecklist());
      setPlacesState(getPlaces());
      setCurrentUserIdState(getCurrentUserId());
      setActiveTab('dashboard');
    }
  };

  const handleOpenHistoryWithFilter = (cat?: string) => {
    setHistoryCategoryFilter(cat || 'All');
    setActiveTab('history');
  };

  const handleShareTripCode = () => {
    if (!activeTrip) return;
    const text = encodeURIComponent(
      `🚩 *शुभ यात्रा (Shubh Yatra)* 🚩\n\nJoin our trip "${activeTrip.name}"!\nDestination: ${activeTrip.destination}\nTrip ID: *${activeTrip.code}*\n\nOpen app and enter Trip ID!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8EE] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar
        activeTrip={activeTrip}
        allTrips={allTrips}
        onSelectTrip={handleSelectTrip}
        onCreateTripClick={() => setIsCreateTripModalOpen(true)}
        onJoinTripClick={() => setIsJoinTripModalOpen(true)}
        onOpenHostApprovalModal={() => setIsHostApprovalModalOpen(true)}
        pendingRequestsCount={pendingRequests.length}
        currentUser={currentUser}
        onSwitchUserRole={handleSwitchUserRole}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        onResetData={handleResetData}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'landing' && (
          <LandingPage
            onCreateTripClick={() => setIsCreateTripModalOpen(true)}
            onJoinTripClick={() => setIsJoinTripModalOpen(true)}
            onExploreDemoClick={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'dashboard' && activeTrip && (
          <TripDashboard
            trip={activeTrip}
            expenses={expenses}
            vaultContributions={vaultContributions}
            reminders={reminders}
            checklist={checklist}
            places={places}
            financials={financials}
            onQuickAddExpense={() => setIsAddExpenseModalOpen(true)}
            onAddVaultContribution={() => setActiveTab('vault')}
            onOpenPlanner={() => setActiveTab('planner')}
            onOpenHistory={handleOpenHistoryWithFilter}
            onOpenSettlement={() => setActiveTab('settlement')}
            currentUser={currentUser}
            onShareTrip={handleShareTripCode}
          />
        )}

        {activeTab === 'vault' && activeTrip && (
          <TripVaultView
            trip={activeTrip}
            vaultContributions={vaultContributions}
            expenses={expenses}
            onAddContribution={handleAddVaultContribution}
            currentUser={currentUser}
          />
        )}

        {activeTab === 'planner' && activeTrip && (
          <TripPlannerView
            trip={activeTrip}
            reminders={reminders}
            checklist={checklist}
            places={places}
            currentUser={currentUser}
            onUpdateReminders={handleUpdateReminders}
            onUpdateChecklist={handleUpdateChecklist}
            onUpdatePlaces={handleUpdatePlaces}
          />
        )}

        {activeTab === 'history' && activeTrip && (
          <ExpenseHistoryView
            trip={activeTrip}
            expenses={expenses}
            onDeleteExpense={handleDeleteExpense}
            currentUser={currentUser}
            initialCategoryFilter={historyCategoryFilter}
          />
        )}

        {activeTab === 'settlement' && activeTrip && (
          <SettlementView
            trip={activeTrip}
            expenses={expenses}
            vaultContributions={vaultContributions}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        onQuickAddClick={() => setIsAddExpenseModalOpen(true)}
      />

      {/* Modals */}
      <CreateTripModal
        isOpen={isCreateTripModalOpen}
        onClose={() => setIsCreateTripModalOpen(false)}
        onTripCreated={handleTripCreated}
        currentUser={currentUser}
      />

      <JoinTripModal
        isOpen={isJoinTripModalOpen}
        onClose={() => setIsJoinTripModalOpen(false)}
        allTrips={allTrips}
        onJoinRequested={handleJoinRequested}
      />

      {activeTrip && (
        <>
          <HostApprovalModal
            isOpen={isHostApprovalModalOpen}
            onClose={() => setIsHostApprovalModalOpen(false)}
            activeTrip={activeTrip}
            pendingRequests={pendingRequests}
            onAcceptRequest={handleAcceptRequest}
            onRejectRequest={handleRejectRequest}
          />

          <AddExpenseModal
            isOpen={isAddExpenseModalOpen}
            onClose={() => setIsAddExpenseModalOpen(false)}
            trip={activeTrip}
            onSaveExpense={handleSaveExpense}
            currentUser={currentUser}
          />
        </>
      )}
    </div>
  );
}
export default App;
