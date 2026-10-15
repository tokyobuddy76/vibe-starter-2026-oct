import React, { useState } from 'react';
import { RECIPE_DETAILS } from '../data/newsData';
import {
  X,
  Star,
  Clock,
  Users,
  Bookmark,
  Printer,
  Check,
  Timer,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  isOpen,
  onClose,
  isSaved,
  onToggleSave
}) => {
  const [servingsMultiplier, setServingsMultiplier] = useState<number>(4);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

  // Mini Kitchen Timer state
  const [timerDuration, setTimerDuration] = useState<number>(600); // 10 minutes default
  const [timerRemaining, setTimerRemaining] = useState<number>(600);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  // Timer hook
  React.useEffect(() => {
    let interval: any;
    if (isTimerActive && timerRemaining > 0) {
      interval = setInterval(() => {
        setTimerRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timerRemaining === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timerRemaining]);

  if (!isOpen) return null;

  const toggleIngredientCheck = (idx: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const formatTimerMinSec = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-[800px] rounded-sm shadow-2xl border border-nyt-border flex flex-col my-auto relative animate-fade-in overflow-hidden max-h-[90vh]">
        
        {/* Top Header */}
        <div className="px-6 py-3 border-b border-nyt-border flex items-center justify-between bg-white font-sansText sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="bg-[#b31919] text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-xs">
              NYT Cooking
            </span>
            <span className="text-xs text-nyt-grayMuted">Tested &amp; Perfected</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleSave}
              className={`text-xs px-3 py-1 rounded-xs border transition-colors flex items-center gap-1 cursor-pointer ${
                isSaved
                  ? 'bg-black text-white border-black font-semibold'
                  : 'bg-white hover:bg-neutral-50 border-neutral-200 text-nyt-black'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'In Recipe Box' : 'Save Recipe'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 hover:bg-neutral-100 rounded-xs text-nyt-grayMuted hover:text-black cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Title & Byline */}
          <div>
            <h2 className="font-headline text-2xl sm:text-3xl font-bold text-nyt-black leading-tight mb-2">
              {RECIPE_DETAILS.title}
            </h2>
            <p className="font-sansText text-xs text-nyt-grayMuted">
              By <strong className="text-black">{RECIPE_DETAILS.author}</strong>
            </p>
          </div>

          {/* Metadata Row: Rating, Time, Yield */}
          <div className="flex flex-wrap items-center gap-6 py-3 border-y border-nyt-border font-sansText text-xs text-nyt-grayDark">
            {/* Stars */}
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-bold text-nyt-black">{RECIPE_DETAILS.rating}</span>
              <span className="text-nyt-grayLight">({RECIPE_DETAILS.ratingCount} reviews)</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-nyt-grayLight" />
              <span>{RECIPE_DETAILS.timeInfo}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-nyt-grayLight" />
              <span>{servingsMultiplier} servings</span>
            </div>
          </div>

          {/* Description */}
          <p className="font-serifText text-sm sm:text-base text-nyt-grayDark leading-relaxed">
            {RECIPE_DETAILS.summary}
          </p>

          {/* Kitchen Helper Bar: Servings scaler & Kitchen Timer */}
          <div className="bg-[#fcfaf7] border border-[#e8e2d8] p-4 rounded-xs flex flex-wrap items-center justify-between gap-4 font-sansText text-xs">
            {/* Servings scaler */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-nyt-black">Yield:</span>
              <div className="inline-flex rounded-xs border border-neutral-300 bg-white overflow-hidden">
                {[2, 4, 6, 8].map((s) => (
                  <button
                    key={s}
                    onClick={() => setServingsMultiplier(s)}
                    className={`px-2.5 py-1 text-xs cursor-pointer transition-colors ${
                      servingsMultiplier === s
                        ? 'bg-nyt-black text-white font-bold'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <span className="text-nyt-grayLight text-[11px]">portions</span>
            </div>

            {/* Kitchen Timer */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xs border border-neutral-200">
              <Timer className="w-4 h-4 text-amber-700" />
              <span className="font-bold font-mono text-sm">{formatTimerMinSec(timerRemaining)}</span>
              <button
                onClick={() => setIsTimerActive(!isTimerActive)}
                className="text-xs bg-black text-white px-2 py-0.5 rounded-xs font-semibold hover:bg-neutral-800 cursor-pointer"
              >
                {isTimerActive ? 'Pause' : 'Start Timer'}
              </button>
              <button
                onClick={() => {
                  setIsTimerActive(false);
                  setTimerRemaining(600);
                }}
                className="p-1 hover:bg-neutral-100 rounded-xs text-neutral-500 cursor-pointer"
                title="Reset timer"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* 2-Column: Ingredients & Preparation */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-2">
            {/* Ingredients (5 cols) */}
            <div className="md:col-span-5 space-y-3 font-sansText text-xs">
              <h3 className="font-headline text-lg font-bold text-nyt-black border-b border-nyt-border pb-1">
                Ingredients
              </h3>
              <p className="text-[11px] text-nyt-grayLight">
                Tap items to cross off as you prep.
              </p>
              <ul className="space-y-2.5">
                {RECIPE_DETAILS.ingredients.map((ing, idx) => {
                  const isChecked = !!checkedIngredients[idx];
                  return (
                    <li
                      key={idx}
                      onClick={() => toggleIngredientCheck(idx)}
                      className={`flex items-start gap-2.5 p-1.5 rounded-xs cursor-pointer transition-colors ${
                        isChecked ? 'opacity-50 line-through bg-neutral-50' : 'hover:bg-neutral-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 rounded-xs text-black focus:ring-black cursor-pointer"
                      />
                      <div className="leading-snug">
                        <span className="font-semibold text-nyt-black block">{ing.amount}</span>
                        <span className="text-nyt-grayDark">{ing.item}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Preparation Steps (7 cols) */}
            <div className="md:col-span-7 space-y-4">
              <h3 className="font-headline text-lg font-bold text-nyt-black border-b border-nyt-border pb-1">
                Preparation
              </h3>
              <ol className="space-y-4 font-serifText text-sm sm:text-[15px] text-nyt-black">
                {RECIPE_DETAILS.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 leading-relaxed">
                    <span className="font-sansText font-bold text-xs bg-neutral-100 text-neutral-700 w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-nyt-border bg-neutral-50 flex items-center justify-between font-sansText text-xs text-nyt-grayLight">
          <span>The New York Times Cooking Collection</span>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 hover:text-black cursor-pointer font-medium"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Recipe</span>
          </button>
        </div>
      </div>
    </div>
  );
};
