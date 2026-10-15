import React from 'react';
import { WIRECUTTER_COATS } from '../data/newsData';
import { X, Check, ShieldCheck, ThumbsUp, DollarSign, Award, ChevronRight } from 'lucide-react';

interface WirecutterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WirecutterModal: React.FC<WirecutterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const data = WIRECUTTER_COATS;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-[800px] rounded-sm shadow-2xl border border-nyt-border flex flex-col my-auto relative animate-fade-in overflow-hidden max-h-[90vh]">
        
        {/* Top Header */}
        <div className="px-6 py-3.5 border-b border-nyt-border flex items-center justify-between bg-white font-sansText sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <span className="bg-neutral-900 text-white text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-xs">
              Wirecutter
            </span>
            <span className="text-xs text-nyt-grayMuted">A New York Times Company</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 hover:bg-neutral-100 rounded-xs text-nyt-grayMuted hover:text-black cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <span className="font-sansText text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1">
              {data.category}
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl font-bold text-nyt-black leading-tight mb-2">
              {data.title}
            </h2>
            <p className="font-serifText text-base text-nyt-grayDark leading-snug">
              {data.subtitle}
            </p>
            <div className="flex items-center gap-2 text-xs font-sansText text-nyt-grayLight mt-3">
              <span>{data.author}</span>
              <span>•</span>
              <span>{data.updatedDate}</span>
            </div>
          </div>

          {/* Independent Testing Guarantee */}
          <div className="bg-[#f7f9fa] border border-[#e1e8ed] p-3.5 rounded-xs flex items-center gap-3 font-sansText text-xs text-nyt-grayDark">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>
              Wirecutter is 100% reader-supported. We independently buy and test all reviewed outerwear in severe field conditions.
            </span>
          </div>

          {/* The Top Pick Card */}
          <div className="border-2 border-black rounded-xs p-5 relative bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-black text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" />
                  Our Top Pick
                </span>
                <span className="font-sansText text-xs font-semibold text-emerald-700">
                  Rating: {data.topPick.rating}
                </span>
              </div>
              <span className="font-sansText font-bold text-lg text-nyt-black">{data.topPick.price}</span>
            </div>

            <div>
              <h3 className="font-headline text-xl font-bold text-nyt-black mb-1">
                {data.topPick.name}
              </h3>
              <p className="font-serifText text-sm text-nyt-grayDark leading-relaxed">
                {data.topPick.summary}
              </p>
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sansText text-xs pt-2">
              <div className="bg-emerald-50/60 border border-emerald-200 p-3 rounded-xs">
                <span className="font-bold text-emerald-900 block mb-2">Why It Won:</span>
                <ul className="space-y-1.5 text-emerald-950">
                  {data.topPick.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 p-3 rounded-xs">
                <span className="font-bold text-neutral-800 block mb-2">Flaws But Not Dealbreakers:</span>
                <ul className="space-y-1.5 text-neutral-700">
                  {data.topPick.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-neutral-400 font-bold shrink-0">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Budget Pick Card */}
          <div className="border border-nyt-border rounded-xs p-4 bg-nyt-subtleBg space-y-2">
            <div className="flex items-center justify-between">
              <span className="bg-neutral-200 text-neutral-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-neutral-700" />
                Budget Pick
              </span>
              <span className="font-sansText font-bold text-base text-nyt-black">{data.budgetPick.price}</span>
            </div>
            <h4 className="font-headline text-lg font-bold text-nyt-black">
              {data.budgetPick.name}
            </h4>
            <p className="font-serifText text-sm text-nyt-grayDark">
              {data.budgetPick.summary}
            </p>
          </div>

          {/* How We Tested */}
          <div className="border-t border-nyt-border pt-4 space-y-2">
            <h4 className="font-headline text-base font-bold text-nyt-black">
              How We Tested
            </h4>
            <p className="font-serifText text-xs sm:text-sm text-nyt-grayDark leading-relaxed">
              {data.howWeTested}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-nyt-border bg-neutral-50 flex items-center justify-between font-sansText text-xs text-nyt-grayMuted">
          <span>Wirecutter Testing Lab • Rigorous Field Standards</span>
          <button
            onClick={onClose}
            className="text-nyt-black font-semibold hover:underline cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
