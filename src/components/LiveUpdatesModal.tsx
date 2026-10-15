import React from 'react';
import { LIVE_UPDATES_DATA } from '../data/newsData';
import { X, Radio, Clock, ShieldAlert, Sparkles, ChevronRight } from 'lucide-react';

interface LiveUpdatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveUpdatesModal: React.FC<LiveUpdatesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-[760px] rounded-sm shadow-2xl border border-nyt-border flex flex-col my-auto relative animate-fade-in overflow-hidden max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-3.5 border-b border-nyt-border flex items-center justify-between bg-white font-sansText sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
            </span>
            <span className="text-red-700 text-xs font-black uppercase tracking-widest">
              Live Coverage
            </span>
            <span className="text-xs text-nyt-grayMuted">• Continuous Updates</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 hover:bg-neutral-100 rounded-xs text-nyt-grayMuted hover:text-black cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Heading */}
        <div className="p-6 border-b border-nyt-border bg-[#fafbfc]">
          <h2 className="font-headline text-2xl sm:text-3xl font-bold text-nyt-black leading-tight mb-2">
            Live Updates: Senate Cabinet Confirmation Hearings
          </h2>
          <p className="font-serifText text-sm sm:text-base text-nyt-grayDark">
            Lawmakers question executive selections for critical homeland and diplomatic posts as confirmation hearings enter day two on Capitol Hill.
          </p>
        </div>

        {/* Live Stream Feed */}
        <div className="p-6 overflow-y-auto space-y-6">
          {LIVE_UPDATES_DATA.map((item, idx) => (
            <div key={item.id} className="relative pl-6 border-l-2 border-neutral-300 space-y-2">
              {/* Bullet node */}
              <div className={`absolute -left-[7px] top-0 w-3 h-3 rounded-full border-2 border-white ${
                item.isBreaking ? 'bg-red-600 ring-2 ring-red-200' : 'bg-black'
              }`} />

              <div className="flex items-center gap-2 font-sansText text-xs text-nyt-grayMuted">
                <span className="font-bold text-nyt-black">{item.time}</span>
                <span>•</span>
                <span>Reporting by <strong className="text-nyt-black">{item.author}</strong></span>
                {item.isBreaking && (
                  <span className="bg-red-100 text-red-800 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-xs ml-1">
                    Key Development
                  </span>
                )}
              </div>

              <h3 className="font-headline text-lg font-bold text-nyt-black leading-snug">
                {item.title}
              </h3>

              <p className="font-serifText text-sm text-nyt-grayDark leading-relaxed">
                {item.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-nyt-border bg-neutral-50 flex items-center justify-between font-sansText text-xs text-nyt-grayMuted">
          <span>Updates automatically refresh every 60 seconds</span>
          <button
            onClick={onClose}
            className="text-nyt-black font-semibold hover:underline cursor-pointer"
          >
            Close Feed
          </button>
        </div>
      </div>
    </div>
  );
};
