import React, { useState } from 'react';
import { Search, Bookmark, Sun, TrendingUp, Volume2, UserCheck, Check } from 'lucide-react';

interface HeaderProps {
  currentEdition: string;
  onSelectEdition: (edition: string) => void;
  onOpenSearch: () => void;
  onOpenSubscribe: () => void;
  onOpenLogin: () => void;
  onOpenTodaysPaper: () => void;
  onOpenSavedDrawer: () => void;
  onSelectSection: (section: string) => void;
  activeSection: string;
  savedCount: number;
  userEmail: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  currentEdition,
  onSelectEdition,
  onOpenSearch,
  onOpenSubscribe,
  onOpenLogin,
  onOpenTodaysPaper,
  onOpenSavedDrawer,
  onSelectSection,
  activeSection,
  savedCount,
  userEmail
}) => {
  const [marketIndex, setMarketIndex] = useState<{ name: string; val: string; change: string; isUp: boolean }>({
    name: 'S&P 500',
    val: '5,862.48',
    change: '+0.48% ▲',
    isUp: true
  });

  const [weatherCity, setWeatherCity] = useState<'NYC' | 'LON' | 'PAR' | 'TYO'>('NYC');

  const weatherData = {
    NYC: { temp: '68°F', label: 'New York', condition: 'Sunny' },
    LON: { temp: '16°C', label: 'London', condition: 'Partly Cloudy' },
    PAR: { temp: '18°C', label: 'Paris', condition: 'Clear' },
    TYO: { temp: '21°C', label: 'Tokyo', condition: 'Fair' }
  };

  const editions = ['U.S.', 'INTERNATIONAL', 'CANADA', 'ESPAÑOL', '中文'];

  const navSections = [
    'U.S.',
    'World',
    'Business',
    'Arts',
    'Lifestyle',
    'Opinion',
    'Audio',
    'Games',
    'Cooking',
    'Wirecutter',
    'The Athletic'
  ];

  const cycleMarket = () => {
    if (marketIndex.name === 'S&P 500') {
      setMarketIndex({ name: 'Dow', val: '43,077.70', change: '+0.77% ▲', isUp: true });
    } else if (marketIndex.name === 'Dow') {
      setMarketIndex({ name: 'Nasdaq', val: '18,367.08', change: '-0.18% ▼', isUp: false });
    } else {
      setMarketIndex({ name: 'S&P 500', val: '5,862.48', change: '+0.48% ▲', isUp: true });
    }
  };

  const cycleWeather = () => {
    const keys: ('NYC' | 'LON' | 'PAR' | 'TYO')[] = ['NYC', 'LON', 'PAR', 'TYO'];
    const nextIdx = (keys.indexOf(weatherCity) + 1) % keys.length;
    setWeatherCity(keys[nextIdx]);
  };

  return (
    <header className="max-w-[1240px] mx-auto px-4 pt-2">
      {/* Top Utility Bar */}
      <div className="flex items-center justify-between text-[11px] font-sansText text-nyt-grayDark pb-2 border-b border-nyt-border" data-purpose="utility-bar">
        {/* Left: Search & Edition selector */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenSearch}
            className="p-1 hover:text-black flex items-center gap-1.5 focus:outline-none transition-colors cursor-pointer group"
            title="Search The New York Times"
            aria-label="Search"
          >
            <Search className="w-3.5 h-3.5 text-nyt-grayDark group-hover:text-black" />
            <span className="uppercase tracking-wider text-[10px] font-bold">Search</span>
          </button>

          <div className="hidden md:flex items-center space-x-2 pl-2 border-l border-nyt-border text-[11px]">
            {editions.map((edition, idx) => (
              <React.Fragment key={edition}>
                {idx > 0 && <span className="text-nyt-border">•</span>}
                <button
                  onClick={() => onSelectEdition(edition)}
                  className={`transition-colors cursor-pointer ${
                    currentEdition === edition ? 'font-bold text-black' : 'text-nyt-grayMuted hover:underline'
                  }`}
                >
                  {edition}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right: Saved reading list, Subscriptions & Auth Actions */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={onOpenSavedDrawer}
            className="flex items-center gap-1 text-[11px] font-sansText text-nyt-grayDark hover:text-black px-2 py-1 transition-colors cursor-pointer"
            title="View saved articles"
          >
            <Bookmark className="w-3.5 h-3.5 fill-current opacity-80" />
            <span className="hidden sm:inline font-medium">Saved</span>
            {savedCount > 0 && (
              <span className="bg-nyt-black text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenSubscribe}
            className="bg-[#567b95] hover:bg-[#326891] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xs transition-colors cursor-pointer shadow-xs active:scale-[0.99]"
          >
            Subscribe for $1/week
          </button>

          <button
            onClick={onOpenLogin}
            className="bg-[#567b95] hover:bg-[#326891] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xs transition-colors cursor-pointer shadow-xs active:scale-[0.99] flex items-center gap-1"
          >
            {userEmail ? (
              <>
                <UserCheck className="w-3 h-3" />
                <span className="truncate max-w-[80px]">Account</span>
              </>
            ) : (
              'Log In'
            )}
          </button>
        </div>
      </div>

      {/* Middle Header: Date, Masthead, Stocks/Weather */}
      <div className="py-3 flex flex-col md:flex-row items-center justify-between relative border-b border-nyt-border">
        {/* Date & Edition Info (Left) */}
        <div className="hidden md:block w-1/4 text-left font-sansText text-xs text-nyt-grayMuted leading-tight">
          <p className="font-bold text-nyt-black text-[12px]">Wednesday, October 14, 2026</p>
          <p className="text-[11px] mt-0.5">
            <button
              onClick={onOpenTodaysPaper}
              className="hover:underline text-nyt-grayMuted hover:text-black cursor-pointer text-left"
            >
              Today's Paper
            </button>
          </p>
        </div>

        {/* Centered Masthead */}
        <div className="w-full md:w-2/4 text-center my-1">
          <button
            onClick={() => onSelectSection('Front Page')}
            aria-label="The New York Times Homepage"
            className="inline-block cursor-pointer focus:outline-none"
          >
            <h1 className="masthead-title text-4xl sm:text-5xl md:text-[62px] text-nyt-black font-normal tracking-tight selection:bg-nyt-black selection:text-white hover:opacity-95 transition-opacity">
              The New York Times
            </h1>
          </button>
        </div>

        {/* Market / Weather Widget (Right) */}
        <div className="hidden md:flex w-1/4 justify-end text-right font-sansText text-[11px] text-nyt-grayMuted space-x-4 items-center">
          <button
            onClick={cycleMarket}
            title="Click to cycle market indexes"
            className="cursor-pointer hover:opacity-75 transition-opacity text-right"
          >
            <span className="font-semibold text-nyt-black">{marketIndex.name}</span>
            <span className={`ml-1 font-bold ${marketIndex.isUp ? 'text-emerald-700' : 'text-red-700'}`}>
              {marketIndex.change}
            </span>
          </button>

          <button
            onClick={cycleWeather}
            title="Click to cycle city weather"
            className="cursor-pointer hover:opacity-75 transition-opacity text-right flex items-center gap-1"
          >
            <span className="font-semibold text-nyt-black">{weatherCity}</span>
            <span className="ml-1 text-nyt-black font-medium">{weatherData[weatherCity].temp}</span>
          </button>
        </div>
      </div>

      {/* Primary Navigation Bar */}
      <nav aria-label="Primary Navigation" className="border-b-2 border-black py-1.5 font-sansText text-[11px] tracking-tight">
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-nyt-grayDark font-medium uppercase">
          {navSections.map((section) => {
            const isActive = activeSection === section;
            return (
              <li key={section}>
                <button
                  onClick={() => onSelectSection(section)}
                  className={`hover:text-black transition-colors cursor-pointer ${
                    isActive ? 'font-bold text-black border-b border-black' : ''
                  }`}
                >
                  {section}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sub-bar Notice */}
      <div className="border-b border-nyt-border py-1 text-center font-sansText text-[11px] text-nyt-grayMuted flex items-center justify-center gap-3">
        <span>
          These top stories are <strong className="text-nyt-black font-semibold">free to read</strong>.
        </span>
        {currentEdition !== 'U.S.' && (
          <span className="text-nyt-accent font-medium">
            • Edition: {currentEdition}
          </span>
        )}
      </div>
    </header>
  );
};
