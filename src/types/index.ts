export type TransportMode = 'car' | 'train' | 'bus' | 'flight' | 'bike';

export type Category = 'Travel' | 'Fooding' | 'Hotel' | 'Activity' | 'Other';

export interface User {
  id: string;
  name: string;
  avatar: string;
  upiId?: string;
  phone?: string;
  role: 'host' | 'member';
}

export interface JoinRequest {
  id: string;
  tripId: string;
  userName: string;
  phone?: string;
  upiId?: string;
  requestedAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface Expense {
  id: string;
  tripId: string;
  title: string;
  amount: number;
  category: Category;
  paidBy: string; // userId
  appliesTo: string[]; // array of userIds
  date: string; // ISO string
  isTiny?: boolean;
  isVaultPaid?: boolean;
  notes?: string;
}

export interface VaultContribution {
  id: string;
  tripId: string;
  userId: string;
  amount: number;
  date: string;
  notes?: string;
}

export interface Reminder {
  id: string;
  tripId: string;
  title: string;
  date: string;
  time: string;
  type: 'flight' | 'train' | 'hotel' | 'general';
  notes?: string;
}

export interface ChecklistItem {
  id: string;
  tripId: string;
  text: string;
  completed: boolean;
  category: 'Documents' | 'IDs' | 'Tickets' | 'Packing';
}

export interface PlaceToVisit {
  id: string;
  tripId: string;
  name: string;
  notes?: string;
  visited: boolean;
  category?: string;
}

export interface Trip {
  id: string;
  code: string; // Unique Trip ID e.g. GOA26X91
  name: string;
  destination: string;
  startLocation: string;
  startDate: string;
  returnDate: string;
  transport: TransportMode;
  expectedBudget: number;
  hostId: string;
  members: User[];
  createdAt: string;
}

export interface SettlementTransaction {
  id: string;
  fromUser: User;
  toUser: User;
  amount: number;
}
