import React, { useState } from 'react';
import { X, Check, Sparkles, ShieldCheck } from 'lucide-react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribed: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({
  isOpen,
  onClose,
  onSubscribed
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'all-access' | 'basic'>('all-access');
  const [billingCycle, setBillingCycle] = useState<'weekly' | 'annual'>('weekly');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = () => {
    setIsSuccess(true);
    setTimeout(() => {
      onSubscribed();
      onClose();
      setIsSuccess(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-[640px] rounded-sm shadow-2xl border border-nyt-border flex flex-col relative animate-fade-in overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-xs hover:bg-neutral-100 text-neutral-500 hover:text-black cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="font-headline text-2xl font-bold text-nyt-black">
              Welcome to The New York Times
            </h3>
            <p className="font-serifText text-sm text-nyt-grayDark">
              Your All-Access subscription is now active. Enjoy unlimited access across all devices.
            </p>
          </div>
        ) : (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-1">
              <span className="font-masthead text-3xl sm:text-4xl text-black block mb-1">
                The New York Times
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl font-bold text-nyt-black">
                The journalism you need. The games, recipes, and reviews you love.
              </h2>
              <p className="font-serifText text-sm text-nyt-grayMuted">
                Special limited-time introductory offer. Cancel anytime.
              </p>
            </div>

            {/* Plan Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* All Access */}
              <div
                onClick={() => setSelectedPlan('all-access')}
                className={`p-4 rounded-xs border-2 cursor-pointer transition-all relative ${
                  selectedPlan === 'all-access'
                    ? 'border-black bg-[#fafbfc] shadow-sm'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <span className="bg-[#567b95] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs absolute -top-2.5 left-4">
                  Most Popular
                </span>
                <h4 className="font-headline text-lg font-bold text-nyt-black mt-1">All Access</h4>
                <div className="my-2">
                  <span className="font-headline text-3xl font-bold text-black">$1</span>
                  <span className="font-sansText text-xs text-nyt-grayLight ml-1">/ week</span>
                </div>
                <p className="font-sansText text-[11px] text-nyt-grayLight mb-3">Billed as $4 every 4 weeks for the first year</p>
                <ul className="space-y-1.5 font-sansText text-xs text-nyt-grayDark">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Unlimited News reporting</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>NYT Games (Crossword, Spelling Bee)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>NYT Cooking (20,000+ recipes)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Wirecutter &amp; The Athletic</span>
                  </li>
                </ul>
              </div>

              {/* News Only */}
              <div
                onClick={() => setSelectedPlan('basic')}
                className={`p-4 rounded-xs border-2 cursor-pointer transition-all relative ${
                  selectedPlan === 'basic'
                    ? 'border-black bg-[#fafbfc] shadow-sm'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <h4 className="font-headline text-lg font-bold text-nyt-black mt-1">News Only</h4>
                <div className="my-2">
                  <span className="font-headline text-3xl font-bold text-black">$0.75</span>
                  <span className="font-sansText text-xs text-nyt-grayLight ml-1">/ week</span>
                </div>
                <p className="font-sansText text-[11px] text-nyt-grayLight mb-3">Billed as $3 every 4 weeks for the first year</p>
                <ul className="space-y-1.5 font-sansText text-xs text-nyt-grayDark">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Unlimited News reporting</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Audio stories &amp; podcasts</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-neutral-400">
                    <span>— Cooking &amp; Games not included</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleSubscribe}
              className="w-full bg-[#567b95] hover:bg-[#326891] text-white font-sansText text-sm font-bold uppercase tracking-wider py-3 rounded-xs transition-colors cursor-pointer shadow-md"
            >
              Start {selectedPlan === 'all-access' ? 'All Access' : 'News'} Subscription
            </button>

            <div className="flex items-center justify-center gap-2 font-sansText text-[11px] text-nyt-grayLight text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
              <span>Cancel or pause online anytime with one click.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
