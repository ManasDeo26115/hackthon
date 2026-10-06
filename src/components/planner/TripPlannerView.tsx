import React, { useState } from 'react';
import { Trip, Reminder, ChecklistItem, PlaceToVisit, User } from '../../types';
import {
  Calendar,
  CheckSquare,
  MapPin,
  Lock,
  Plus,
  Trash2,
  Check,
  Clock,
  Square,
  Sparkles,
  Plane,
  Train,
  Building,
  Briefcase
} from 'lucide-react';
import { formatDate } from '../../utils/formatters';

interface TripPlannerViewProps {
  trip: Trip;
  reminders: Reminder[];
  checklist: ChecklistItem[];
  places: PlaceToVisit[];
  currentUser: User;
  onUpdateReminders: (reminders: Reminder[]) => void;
  onUpdateChecklist: (checklist: ChecklistItem[]) => void;
  onUpdatePlaces: (places: PlaceToVisit[]) => void;
}

export const TripPlannerView: React.FC<TripPlannerViewProps> = ({
  trip,
  reminders,
  checklist,
  places,
  currentUser,
  onUpdateReminders,
  onUpdateChecklist,
  onUpdatePlaces
}) => {
  const [activeTab, setActiveTab] = useState<'reminders' | 'checklist' | 'places'>('reminders');
  const isHost = currentUser.role === 'host';

  // Forms State
  const [remTitle, setRemTitle] = useState('');
  const [remDate, setRemDate] = useState(trip.startDate);
  const [remTime, setRemTime] = useState('12:00');
  const [remNotes, setRemNotes] = useState('');

  const [chkText, setChkText] = useState('');
  const [chkCategory, setChkCategory] = useState<'Documents' | 'IDs' | 'Tickets' | 'Packing'>('Packing');

  const [plcName, setPlcName] = useState('');
  const [plcNotes, setPlcNotes] = useState('');

  // Reminder add handler
  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isHost || !remTitle) return;

    const newRem: Reminder = {
      id: `rem-${Date.now()}`,
      tripId: trip.id,
      title: remTitle,
      date: remDate,
      time: remTime,
      type: 'general',
      notes: remNotes
    };

    onUpdateReminders([...reminders, newRem]);
    setRemTitle('');
    setRemNotes('');
  };

  const handleDeleteReminder = (id: string) => {
    if (!isHost) return;
    onUpdateReminders(reminders.filter((r) => r.id !== id));
  };

  // Checklist toggle & add handler
  const handleToggleChecklist = (id: string) => {
    onUpdateChecklist(
      checklist.map((c) => (c.id === id ? { ...c, completed: !c.completed } : c))
    );
  };

  const handleAddChecklist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isHost || !chkText) return;

    const newItem: ChecklistItem = {
      id: `chk-${Date.now()}`,
      tripId: trip.id,
      text: chkText,
      completed: false,
      category: chkCategory
    };

    onUpdateChecklist([...checklist, newItem]);
    setChkText('');
  };

  const handleDeleteChecklist = (id: string) => {
    if (!isHost) return;
    onUpdateChecklist(checklist.filter((c) => c.id !== id));
  };

  // Places toggle & add handler
  const handleTogglePlace = (id: string) => {
    onUpdatePlaces(
      places.map((p) => (p.id === id ? { ...p, visited: !p.visited } : p))
    );
  };

  const handleAddPlace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isHost || !plcName) return;

    const newPlace: PlaceToVisit = {
      id: `plc-${Date.now()}`,
      tripId: trip.id,
      name: plcName,
      notes: plcNotes,
      visited: false
    };

    onUpdatePlaces([...places, newPlace]);
    setPlcName('');
    setPlcNotes('');
  };

  const handleDeletePlace = (id: string) => {
    if (!isHost) return;
    onUpdatePlaces(places.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header Banner with Role Status */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden border-saffron-500/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-500/10 text-saffron-700 dark:text-amber-300 text-xs font-bold mb-2">
              <Calendar className="w-4 h-4 text-saffron-500" />
              <span>ट्रिप प्लानर / Trip Planner</span>
            </div>
            <h1 className="font-devanagari text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              रिमाइंडर, चेकलिस्ट और घूमने की जगहें
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Organize train departures, flight check-ins, ID documents, and tourist places to visit.
            </p>
          </div>

          {/* Role Indicator Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-bold">
            {isHost ? (
              <span className="text-saffron-600 dark:text-amber-400 flex items-center gap-1.5">
                <span>👑 Host Mode: Full Edit Access</span>
              </span>
            ) : (
              <span className="text-slate-500 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-amber-500" />
                <span>Member Mode: Read-Only (Host Edit Only)</span>
              </span>
            )}
          </div>
        </div>

        {/* Tab Switcher Bar */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('reminders')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'reminders'
                ? 'bg-saffron-500 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>रिमाइंडर ({reminders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'checklist'
                ? 'bg-saffron-500 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>चेकलिस्ट ({checklist.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('places')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'places'
                ? 'bg-saffron-500 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>घूमने की जगहें ({places.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: REMINDERS */}
      {activeTab === 'reminders' && (
        <div className="space-y-6">
          {/* Host Add Reminder Form */}
          {isHost && (
            <div className="glass-card p-6 rounded-3xl shadow-lg border-amber-400/30">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Plus className="w-4 h-4 text-saffron-500" />
                <span>नया रिमाइंडर जोड़ें (Add Reminder - Host Only)</span>
              </h3>
              <form onSubmit={handleAddReminder} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input
                  type="text"
                  required
                  placeholder="e.g. Flight Departure from Mumbai"
                  value={remTitle}
                  onChange={(e) => setRemTitle(e.target.value)}
                  className="sm:col-span-2 px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                />
                <input
                  type="date"
                  value={remDate}
                  onChange={(e) => setRemDate(e.target.value)}
                  className="px-3 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                />
                <button
                  type="submit"
                  className="py-2.5 px-4 rounded-2xl bg-saffron-500 text-white font-bold text-xs shadow-md hover:bg-saffron-600"
                >
                  Save Reminder
                </button>
              </form>
            </div>
          )}

          {/* Reminders List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reminders.map((rem) => (
              <div
                key={rem.id}
                className="glass-card p-5 rounded-3xl shadow-md border-slate-200/60 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-1 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-[10px] font-black uppercase flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {rem.time || 'All Day'}
                    </span>
                    {isHost && (
                      <button
                        onClick={() => handleDeleteReminder(rem.id)}
                        className="text-slate-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                    {rem.title}
                  </h4>
                  <p className="text-xs text-saffron-600 dark:text-amber-400 font-semibold">
                    Date: {formatDate(rem.date)}
                  </p>
                  {rem.notes && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 italic">
                      "{rem.notes}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="space-y-6">
          {isHost && (
            <div className="glass-card p-6 rounded-3xl shadow-lg border-amber-400/30">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Plus className="w-4 h-4 text-saffron-500" />
                <span>सामान की लिस्ट में जोड़ें (Add Item - Host Only)</span>
              </h3>
              <form onSubmit={handleAddChecklist} className="flex gap-3">
                <input
                  type="text"
                  required
                  placeholder="e.g. Original Driving License & Sunscreen"
                  value={chkText}
                  onChange={(e) => setChkText(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                />
                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-2xl bg-saffron-500 text-white font-bold text-xs shadow-md hover:bg-saffron-600"
                >
                  Add Item
                </button>
              </form>
            </div>
          )}

          <div className="space-y-2 max-w-2xl mx-auto">
            {checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => handleToggleChecklist(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  item.completed
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 opacity-70'
                    : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-saffron-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1 rounded-lg ${item.completed ? 'bg-emerald-500 text-white' : 'border border-slate-400'}`}>
                    <Check className={`w-4 h-4 ${item.completed ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                  <span className={`font-bold text-sm ${item.completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                    {item.text}
                  </span>
                </div>

                {isHost && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChecklist(item.id);
                    }}
                    className="text-slate-400 hover:text-red-500 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PLACES TO VISIT */}
      {activeTab === 'places' && (
        <div className="space-y-6">
          {isHost && (
            <div className="glass-card p-6 rounded-3xl shadow-lg border-amber-400/30">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Plus className="w-4 h-4 text-saffron-500" />
                <span>घूमने की नई जगह जोड़ें (Add Place - Host Only)</span>
              </h3>
              <form onSubmit={handleAddPlace} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="e.g. Dudhsagar Waterfalls"
                  value={plcName}
                  onChange={(e) => setPlcName(e.target.value)}
                  className="px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                />
                <input
                  type="text"
                  placeholder="Notes (e.g. Sunset point)"
                  value={plcNotes}
                  onChange={(e) => setPlcNotes(e.target.value)}
                  className="px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                />
                <button
                  type="submit"
                  className="py-2.5 px-4 rounded-2xl bg-saffron-500 text-white font-bold text-xs shadow-md hover:bg-saffron-600"
                >
                  Add Place
                </button>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {places.map((place) => (
              <div
                key={place.id}
                onClick={() => handleTogglePlace(place.id)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer flex items-center justify-between ${
                  place.visited
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-400 opacity-75'
                    : 'glass-card border-slate-200 dark:border-slate-800 hover:border-saffron-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{place.visited ? '✅' : '📍'}</span>
                  <div>
                    <h4 className={`font-bold text-sm ${place.visited ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                      {place.name}
                    </h4>
                    {place.notes && <p className="text-xs text-slate-500">{place.notes}</p>}
                  </div>
                </div>

                {isHost && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePlace(place.id);
                    }}
                    className="text-slate-400 hover:text-red-500 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
