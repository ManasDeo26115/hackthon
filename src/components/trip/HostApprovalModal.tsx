import React from 'react';
import confetti from 'canvas-confetti';
import { JoinRequest, User, Trip } from '../../types';
import { X, Check, ShieldCheck, UserPlus, Clock, UserX } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

interface HostApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTrip: Trip;
  pendingRequests: JoinRequest[];
  onAcceptRequest: (request: JoinRequest) => void;
  onRejectRequest: (requestId: string) => void;
}

export const HostApprovalModal: React.FC<HostApprovalModalProps> = ({
  isOpen,
  onClose,
  activeTrip,
  pendingRequests,
  onAcceptRequest,
  onRejectRequest,
}) => {
  if (!isOpen) return null;

  const handleAccept = (req: JoinRequest) => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#10B981', '#FBBF24', '#F97316']
    });
    onAcceptRequest(req);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg glass-card rounded-3xl shadow-2xl p-6 sm:p-8 border border-amber-400/30">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-amber-400">
            <ShieldCheck className="w-5 h-5" />
          </span>
          <h2 className="font-devanagari text-2xl font-black text-slate-900 dark:text-white">
            होस्ट मंज़ूरी (Host Approvals) 👑
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Pending requests to join <span className="font-bold text-slate-800 dark:text-slate-200">{activeTrip.name}</span>.
        </p>

        {pendingRequests.length === 0 ? (
          <div className="text-center py-10 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
              <UserPlus className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              कोई नया रिक्वेस्ट नहीं है / No Pending Requests
            </p>
            <p className="text-xs text-slate-400">
              All join requests have been processed. Share Trip ID <span className="font-mono font-bold text-saffron-600">{activeTrip.code}</span> with friends!
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {pendingRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between gap-3 animate-in fade-in"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 text-saffron-600 dark:text-amber-300 font-bold flex items-center justify-center text-sm">
                    {req.userName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {req.userName}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <span>{req.phone}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(req.requestedAt)}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAccept(req)}
                    className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1"
                    title="Accept Member"
                  >
                    <Check className="w-4 h-4" />
                    <span className="hidden sm:inline">स्वीकार</span>
                  </button>

                  <button
                    onClick={() => onRejectRequest(req.id)}
                    className="p-2.5 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-950/60 dark:text-red-300 font-bold text-xs transition-all flex items-center gap-1"
                    title="Reject Request"
                  >
                    <UserX className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
