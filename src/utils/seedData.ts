import { Trip, Expense, VaultContribution, Reminder, ChecklistItem, PlaceToVisit, JoinRequest, User } from '../types';

export const SEED_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Vikram Singh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    upiId: 'vikram@upi',
    phone: '+91 98765 43210',
    role: 'host'
  },
  {
    id: 'user-2',
    name: 'Ananya Roy',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    upiId: 'ananya@okicici',
    phone: '+91 98765 11111',
    role: 'member'
  },
  {
    id: 'user-3',
    name: 'Rahul Sharma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    upiId: 'rahul@paytm',
    phone: '+91 98765 22222',
    role: 'member'
  },
  {
    id: 'user-4',
    name: 'Priya Patel',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    upiId: 'priya@gpay',
    phone: '+91 98765 33333',
    role: 'member'
  },
  {
    id: 'user-5',
    name: 'Amit Verma',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    upiId: 'amit@ybl',
    phone: '+91 98765 44444',
    role: 'member'
  }
];

export const SEED_TRIP: Trip = {
  id: 'trip-goa-2026',
  code: 'GOA26X91',
  name: 'Goa Roadtrip 2026 🏖️',
  destination: 'Goa, India',
  startLocation: 'Mumbai',
  startDate: '2026-10-15',
  returnDate: '2026-10-20',
  transport: 'car',
  expectedBudget: 30000,
  hostId: 'user-1',
  members: SEED_USERS,
  createdAt: '2026-10-01T10:00:00Z'
};

export const SEED_JOIN_REQUESTS: JoinRequest[] = [
  {
    id: 'req-1',
    tripId: 'trip-goa-2026',
    userName: 'Rohan Sharma',
    phone: '+91 91234 56789',
    upiId: 'rohan@paytm',
    requestedAt: '2026-10-06T09:15:00Z',
    status: 'pending'
  },
  {
    id: 'req-2',
    tripId: 'trip-goa-2026',
    userName: 'Sneha Kapoor',
    phone: '+91 98111 22334',
    upiId: 'sneha@gpay',
    requestedAt: '2026-10-06T11:45:00Z',
    status: 'pending'
  }
];

export const SEED_VAULT_CONTRIBUTIONS: VaultContribution[] = [
  { id: 'v1', tripId: 'trip-goa-2026', userId: 'user-1', amount: 2000, date: '2026-10-02T10:00:00Z', notes: 'Initial Pool Fund' },
  { id: 'v2', tripId: 'trip-goa-2026', userId: 'user-2', amount: 2000, date: '2026-10-02T10:30:00Z', notes: 'Initial Pool Fund' },
  { id: 'v3', tripId: 'trip-goa-2026', userId: 'user-3', amount: 2000, date: '2026-10-02T11:00:00Z', notes: 'Initial Pool Fund' },
  { id: 'v4', tripId: 'trip-goa-2026', userId: 'user-4', amount: 2000, date: '2026-10-02T11:30:00Z', notes: 'Initial Pool Fund' },
  { id: 'v5', tripId: 'trip-goa-2026', userId: 'user-5', amount: 2000, date: '2026-10-02T12:00:00Z', notes: 'Initial Pool Fund' },
];

export const SEED_EXPENSES: Expense[] = [
  {
    id: 'exp-1',
    tripId: 'trip-goa-2026',
    title: 'Car Rental Advance & Expressway Pass',
    amount: 3500,
    category: 'Travel',
    paidBy: 'user-1',
    appliesTo: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'],
    date: '2026-10-02T09:00:00Z'
  },
  {
    id: 'exp-2',
    tripId: 'trip-goa-2026',
    title: 'Villa Stay Deposit (Calangute)',
    amount: 6500,
    category: 'Hotel',
    paidBy: 'user-2',
    appliesTo: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'],
    date: '2026-10-02T14:30:00Z'
  },
  {
    id: 'exp-3',
    tripId: 'trip-goa-2026',
    title: '🛣️ Highway Toll Tax',
    amount: 120,
    category: 'Travel',
    paidBy: 'user-3',
    appliesTo: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'],
    date: '2026-10-03T08:15:00Z',
    isTiny: true
  },
  {
    id: 'exp-4',
    tripId: 'trip-goa-2026',
    title: '💧 Cold Mineral Water Bottles',
    amount: 40,
    category: 'Fooding',
    paidBy: 'user-4',
    appliesTo: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'],
    date: '2026-10-03T09:30:00Z',
    isTiny: true
  },
  {
    id: 'exp-5',
    tripId: 'trip-goa-2026',
    title: '🍿 Chai & Samosa Break at Dhaba',
    amount: 160,
    category: 'Fooding',
    paidBy: 'user-5',
    appliesTo: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'],
    date: '2026-10-03T11:00:00Z',
    isTiny: true
  },
  {
    id: 'exp-6',
    tripId: 'trip-goa-2026',
    title: 'Fuel Tank Full Refuel (BPCL)',
    amount: 2500,
    category: 'Travel',
    paidBy: 'user-1',
    appliesTo: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'],
    date: '2026-10-03T13:20:00Z'
  },
  {
    id: 'exp-7',
    tripId: 'trip-goa-2026',
    title: 'Beachside Shack Dinner & Drinks',
    amount: 2800,
    category: 'Fooding',
    paidBy: 'user-2',
    appliesTo: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'],
    date: '2026-10-03T20:30:00Z'
  },
  {
    id: 'exp-8',
    tripId: 'trip-goa-2026',
    title: '🅿️ Baga Beach Parking Ticket',
    amount: 50,
    category: 'Travel',
    paidBy: 'user-3',
    appliesTo: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'],
    date: '2026-10-04T10:15:00Z',
    isTiny: true
  },
  {
    id: 'exp-9',
    tripId: 'trip-goa-2026',
    title: '🚻 Public Washroom Entry',
    amount: 20,
    category: 'Other',
    paidBy: 'user-4',
    appliesTo: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'],
    date: '2026-10-04T11:00:00Z',
    isTiny: true
  },
  {
    id: 'exp-10',
    tripId: 'trip-goa-2026',
    title: 'Fresh Coconut Water by Beach',
    amount: 150,
    category: 'Fooding',
    paidBy: 'user-5',
    appliesTo: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'],
    date: '2026-10-04T12:45:00Z',
    isTiny: true
  },
  {
    id: 'exp-11',
    tripId: 'trip-goa-2026',
    title: 'Water Sports Parasailing Combo',
    amount: 1110,
    category: 'Activity',
    paidBy: 'user-1',
    appliesTo: ['user-1', 'user-2', 'user-3', 'user-4'],
    date: '2026-10-04T15:30:00Z'
  },
  {
    id: 'exp-12',
    tripId: 'trip-goa-2026',
    title: '⛽ Scooter Petrol Top-up',
    amount: 150,
    category: 'Travel',
    paidBy: 'user-3',
    appliesTo: ['user-3', 'user-5'],
    date: '2026-10-04T18:00:00Z',
    isTiny: true
  },
  {
    id: 'exp-13',
    tripId: 'trip-goa-2026',
    title: 'Temple Flowers & Entry Tokens',
    amount: 100,
    category: 'Activity',
    paidBy: 'user-4',
    appliesTo: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'],
    date: '2026-10-05T09:30:00Z',
    isTiny: true
  },
  {
    id: 'exp-14',
    tripId: 'trip-goa-2026',
    title: 'Emergency Medicines & Sunscreen',
    amount: 300,
    category: 'Other',
    paidBy: 'user-5',
    appliesTo: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'],
    date: '2026-10-05T12:00:00Z',
    isTiny: true
  }
];

export const SEED_REMINDERS: Reminder[] = [
  {
    id: 'rem-1',
    tripId: 'trip-goa-2026',
    title: 'Car Pickup from Bandra',
    date: '2026-10-15',
    time: '06:00',
    type: 'general',
    notes: 'Collect key & check fuel level before starting highway run'
  },
  {
    id: 'rem-2',
    tripId: 'trip-goa-2026',
    title: 'Villa Check-in (Calangute)',
    date: '2026-10-15',
    time: '14:00',
    type: 'hotel',
    notes: 'Show ID cards & collect main gate security pass'
  },
  {
    id: 'rem-3',
    tripId: 'trip-goa-2026',
    title: 'Mandovi River Sunset Cruise Departure',
    date: '2026-10-17',
    time: '17:30',
    type: 'general',
    notes: 'Reach Panjim Jetty by 5:00 PM for boarding line'
  }
];

export const SEED_CHECKLIST: ChecklistItem[] = [
  { id: 'chk-1', tripId: 'trip-goa-2026', text: 'Original Aadhaar Card & Driving License', completed: true, category: 'IDs' },
  { id: 'chk-2', tripId: 'trip-goa-2026', text: 'Car RC & FASTag Recharge Check', completed: true, category: 'Documents' },
  { id: 'chk-3', tripId: 'trip-goa-2026', text: 'Villa Booking Confirmation PDF', completed: true, category: 'Tickets' },
  { id: 'chk-4', tripId: 'trip-goa-2026', text: 'Sunscreen Lotion (SPF 50+)', completed: false, category: 'Packing' },
  { id: 'chk-5', tripId: 'trip-goa-2026', text: 'Swimsuits & Sunglasses', completed: true, category: 'Packing' },
  { id: 'chk-6', tripId: 'trip-goa-2026', text: 'Portable Powerbank (20,000 mAh)', completed: false, category: 'Packing' },
];

export const SEED_PLACES: PlaceToVisit[] = [
  { id: 'plc-1', tripId: 'trip-goa-2026', name: 'Baga Beach & Shack Party', notes: 'Great nightlife and watersports', visited: true, category: 'Beach' },
  { id: 'plc-2', tripId: 'trip-goa-2026', name: 'Fort Aguada Lighthouse', notes: 'Best sunset point & panoramic sea view', visited: true, category: 'Sightseeing' },
  { id: 'plc-3', tripId: 'trip-goa-2026', name: 'Dudhsagar Waterfalls Trek', notes: 'Jeep safari through Mollem forest', visited: false, category: 'Adventure' },
  { id: 'plc-4', tripId: 'trip-goa-2026', name: 'Chapora Fort ("Dil Chahta Hai")', notes: 'Iconic movie location', visited: false, category: 'Sightseeing' },
  { id: 'plc-5', tripId: 'trip-goa-2026', name: 'Fontainhas Latin Quarter', notes: 'Colorful Portuguese houses & cafes', visited: false, category: 'Heritage' },
];
