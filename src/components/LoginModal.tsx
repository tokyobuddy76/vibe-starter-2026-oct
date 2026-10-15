import React, { useState } from 'react';
import { X, User, Mail, Lock, Check, LogOut } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string | null;
  onLogin: (email: string) => void;
  onLogout: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  userEmail,
  onLogin,
  onLogout
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    onLogin(emailInput.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-[460px] rounded-sm shadow-2xl border border-nyt-border flex flex-col relative animate-fade-in overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-xs hover:bg-neutral-100 text-neutral-500 hover:text-black cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-5">
          <div className="text-center space-y-1">
            <span className="font-masthead text-2xl sm:text-3xl text-black block">
              The New York Times
            </span>
            <h3 className="font-headline text-xl font-bold text-nyt-black">
              {userEmail ? 'Reader Account' : 'Log In or Create an Account'}
            </h3>
          </div>

          {userEmail ? (
            <div className="space-y-4 font-sansText text-xs">
              <div className="bg-neutral-50 p-4 rounded-xs border border-neutral-200 space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-700" />
                  <span className="font-bold text-nyt-black text-sm">{userEmail}</span>
                </div>
                <div className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
                  <Check className="w-3.5 h-3.5" />
                  <span>All Access Subscriber</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-nyt-black uppercase tracking-wider text-[11px]">
                  Reading Preferences
                </h4>
                <label className="flex items-center gap-2 text-nyt-grayDark cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded-xs text-black" />
                  <span>Receive Morning Briefing newsletter</span>
                </label>
                <label className="flex items-center gap-2 text-nyt-grayDark cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded-xs text-black" />
                  <span>Daily Crossword streak notifications</span>
                </label>
              </div>

              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full border border-neutral-300 hover:bg-neutral-50 text-red-700 font-bold py-2 rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sansText text-xs">
              <div>
                <label className="block text-nyt-grayDark font-semibold mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full border border-nyt-border px-3 py-2 text-sm rounded-xs focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-nyt-grayDark font-semibold mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full border border-nyt-border px-3 py-2 text-sm rounded-xs focus:outline-none focus:border-black"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#567b95] hover:bg-[#326891] text-white font-bold py-2.5 rounded-xs transition-colors cursor-pointer text-xs uppercase tracking-wider shadow-xs"
              >
                Continue with Email
              </button>

              <p className="text-[11px] text-nyt-grayLight text-center">
                By continuing, you agree to the updated Terms of Service and Privacy Policy.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
