import { Trip, Expense, VaultContribution, Reminder, ChecklistItem, PlaceToVisit, JoinRequest, User } from '../types';
import {
  SEED_TRIP,
  SEED_EXPENSES,
  SEED_VAULT_CONTRIBUTIONS,
  SEED_JOIN_REQUESTS,
  SEED_REMINDERS,
  SEED_CHECKLIST,
  SEED_PLACES
} from './seedData';

const KEYS = {
  TRIPS: 'shubh_yatra_trips',
  ACTIVE_TRIP_ID: 'shubh_yatra_active_trip_id',
  EXPENSES: 'shubh_yatra_expenses',
  VAULT: 'shubh_yatra_vault',
  JOIN_REQUESTS: 'shubh_yatra_join_requests',
  REMINDERS: 'shubh_yatra_reminders',
  CHECKLIST: 'shubh_yatra_checklist',
  PLACES: 'shubh_yatra_places',
  CURRENT_USER_ID: 'shubh_yatra_current_user_id',
  DARK_MODE: 'shubh_yatra_dark_mode'
};

export function initializeStorage() {
  if (!localStorage.getItem(KEYS.TRIPS)) {
    localStorage.setItem(KEYS.TRIPS, JSON.stringify([SEED_TRIP]));
  }
  if (!localStorage.getItem(KEYS.ACTIVE_TRIP_ID)) {
    localStorage.setItem(KEYS.ACTIVE_TRIP_ID, SEED_TRIP.id);
  }
  if (!localStorage.getItem(KEYS.EXPENSES)) {
    localStorage.setItem(KEYS.EXPENSES, JSON.stringify(SEED_EXPENSES));
  }
  if (!localStorage.getItem(KEYS.VAULT)) {
    localStorage.setItem(KEYS.VAULT, JSON.stringify(SEED_VAULT_CONTRIBUTIONS));
  }
  if (!localStorage.getItem(KEYS.JOIN_REQUESTS)) {
    localStorage.setItem(KEYS.JOIN_REQUESTS, JSON.stringify(SEED_JOIN_REQUESTS));
  }
  if (!localStorage.getItem(KEYS.REMINDERS)) {
    localStorage.setItem(KEYS.REMINDERS, JSON.stringify(SEED_REMINDERS));
  }
  if (!localStorage.getItem(KEYS.CHECKLIST)) {
    localStorage.setItem(KEYS.CHECKLIST, JSON.stringify(SEED_CHECKLIST));
  }
  if (!localStorage.getItem(KEYS.PLACES)) {
    localStorage.setItem(KEYS.PLACES, JSON.stringify(SEED_PLACES));
  }
  if (!localStorage.getItem(KEYS.CURRENT_USER_ID)) {
    localStorage.setItem(KEYS.CURRENT_USER_ID, SEED_TRIP.hostId);
  }
}

export function resetToSeedData() {
  localStorage.setItem(KEYS.TRIPS, JSON.stringify([SEED_TRIP]));
  localStorage.setItem(KEYS.ACTIVE_TRIP_ID, SEED_TRIP.id);
  localStorage.setItem(KEYS.EXPENSES, JSON.stringify(SEED_EXPENSES));
  localStorage.setItem(KEYS.VAULT, JSON.stringify(SEED_VAULT_CONTRIBUTIONS));
  localStorage.setItem(KEYS.JOIN_REQUESTS, JSON.stringify(SEED_JOIN_REQUESTS));
  localStorage.setItem(KEYS.REMINDERS, JSON.stringify(SEED_REMINDERS));
  localStorage.setItem(KEYS.CHECKLIST, JSON.stringify(SEED_CHECKLIST));
  localStorage.setItem(KEYS.PLACES, JSON.stringify(SEED_PLACES));
  localStorage.setItem(KEYS.CURRENT_USER_ID, SEED_TRIP.hostId);
}

// Getters & Setters
export function getTrips(): Trip[] {
  try {
    const data = localStorage.getItem(KEYS.TRIPS);
    return data ? JSON.parse(data) : [SEED_TRIP];
  } catch {
    return [SEED_TRIP];
  }
}

export function saveTrips(trips: Trip[]) {
  localStorage.setItem(KEYS.TRIPS, JSON.stringify(trips));
}

export function getActiveTripId(): string {
  return localStorage.getItem(KEYS.ACTIVE_TRIP_ID) || SEED_TRIP.id;
}

export function setActiveTripId(id: string) {
  localStorage.setItem(KEYS.ACTIVE_TRIP_ID, id);
}

export function getExpenses(): Expense[] {
  try {
    const data = localStorage.getItem(KEYS.EXPENSES);
    return data ? JSON.parse(data) : SEED_EXPENSES;
  } catch {
    return SEED_EXPENSES;
  }
}

export function saveExpenses(expenses: Expense[]) {
  localStorage.setItem(KEYS.EXPENSES, JSON.stringify(expenses));
}

export function getVaultContributions(): VaultContribution[] {
  try {
    const data = localStorage.getItem(KEYS.VAULT);
    return data ? JSON.parse(data) : SEED_VAULT_CONTRIBUTIONS;
  } catch {
    return SEED_VAULT_CONTRIBUTIONS;
  }
}

export function saveVaultContributions(vault: VaultContribution[]) {
  localStorage.setItem(KEYS.VAULT, JSON.stringify(vault));
}

export function getJoinRequests(): JoinRequest[] {
  try {
    const data = localStorage.getItem(KEYS.JOIN_REQUESTS);
    return data ? JSON.parse(data) : SEED_JOIN_REQUESTS;
  } catch {
    return SEED_JOIN_REQUESTS;
  }
}

export function saveJoinRequests(requests: JoinRequest[]) {
  localStorage.setItem(KEYS.JOIN_REQUESTS, JSON.stringify(requests));
}

export function getReminders(): Reminder[] {
  try {
    const data = localStorage.getItem(KEYS.REMINDERS);
    return data ? JSON.parse(data) : SEED_REMINDERS;
  } catch {
    return SEED_REMINDERS;
  }
}

export function saveReminders(reminders: Reminder[]) {
  localStorage.setItem(KEYS.REMINDERS, JSON.stringify(reminders));
}

export function getChecklist(): ChecklistItem[] {
  try {
    const data = localStorage.getItem(KEYS.CHECKLIST);
    return data ? JSON.parse(data) : SEED_CHECKLIST;
  } catch {
    return SEED_CHECKLIST;
  }
}

export function saveChecklist(checklist: ChecklistItem[]) {
  localStorage.setItem(KEYS.CHECKLIST, JSON.stringify(checklist));
}

export function getPlaces(): PlaceToVisit[] {
  try {
    const data = localStorage.getItem(KEYS.PLACES);
    return data ? JSON.parse(data) : SEED_PLACES;
  } catch {
    return SEED_PLACES;
  }
}

export function savePlaces(places: PlaceToVisit[]) {
  localStorage.setItem(KEYS.PLACES, JSON.stringify(places));
}

export function getCurrentUserId(): string {
  return localStorage.getItem(KEYS.CURRENT_USER_ID) || SEED_TRIP.hostId;
}

export function setCurrentUserId(userId: string) {
  localStorage.setItem(KEYS.CURRENT_USER_ID, userId);
}
