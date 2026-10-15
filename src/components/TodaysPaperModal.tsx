import React, { useState } from 'react';
import { X, Newspaper, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from 'lucide-react';
import { Article } from '../types/news';

interface TodaysPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const TodaysPaperModal: React.FC<TodaysPaperModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle
}) => {
  const [activePage, setActivePage] = useState<number>(1);
  const totalPages = 24;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-[900px] rounded-sm shadow-2xl border border-nyt-border flex flex-col my-auto relative animate-fade-in overflow-hidden max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-3.5 border-b border-nyt-border flex items-center justify-between bg-white font-sansText sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Newspaper className="w-5 h-5 text-nyt-black" />
            <div>
              <span className="font-bold text-sm text-nyt-black block">Today’s Paper • Print Replica Edition</span>
              <span className="text-[11px] text-nyt-grayLight">Late Edition • Vol. CLXXVI No. 60,342</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 font-mono text-xs text-nyt-grayDark bg-neutral-100 px-2 py-1 rounded-xs">
              <button
                disabled={activePage === 1}
                onClick={() => setActivePage((p) => Math.max(1, p - 1))}
                className="hover:text-black disabled:opacity-30 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span>Page {activePage} of {totalPages}</span>
              <button
                disabled={activePage === totalPages}
                onClick={() => setActivePage((p) => Math.min(totalPages, p + 1))}
                className="hover:text-black disabled:opacity-30 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1 hover:bg-neutral-100 rounded-xs text-nyt-grayMuted hover:text-black cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Replica Page Viewer */}
        <div className="p-6 overflow-y-auto space-y-6 bg-[#f4f2ee]">
          <div className="bg-white shadow-lg border border-neutral-300 p-6 sm:p-8 max-w-[760px] mx-auto min-h-[500px]">
            {/* Masthead */}
            <div className="text-center border-b-2 border-black pb-3 mb-4">
              <div className="flex justify-between items-center text-[10px] font-sansText uppercase text-neutral-600 mb-1">
                <span>"All the News That's Fit to Print"</span>
                <span>VOL. CLXXVI No. 60,342</span>
                <span>NEW YORK, WEDNESDAY, OCTOBER 14, 2026</span>
                <span>$3.00</span>
              </div>
              <h2 className="font-masthead text-4xl sm:text-5xl text-black">
                The New York Times
              </h2>
            </div>

            {/* Front Page Columns Simulation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-serifText text-xs text-justify">
              {articles.slice(0, 3).map((art, idx) => (
                <div
                  key={art.id}
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="space-y-1.5 cursor-pointer hover:bg-neutral-50 p-1.5 rounded-xs transition-colors"
                >
                  <h4 className="font-headline font-bold text-sm leading-tight text-nyt-black">
                    {art.title}
                  </h4>
                  <p className="font-sansText text-[10px] text-neutral-500">{art.byline}</p>
                  <p className="text-[11px] leading-relaxed line-clamp-6 text-neutral-800">
                    {art.paragraphs[0] || art.summary}
                  </p>
                  <span className="font-sansText text-[9px] uppercase font-bold text-nyt-accent">
                    Continued on Page A{idx + 3} →
                  </span>
                </div>
              ))}
            </div>

            {/* Section Index */}
            <div className="mt-8 pt-4 border-t border-black font-sansText text-[10px] grid grid-cols-2 sm:grid-cols-4 gap-2 text-neutral-700">
              <div><strong>NEWS</strong>: A1-A20</div>
              <div><strong>BUSINESS</strong>: B1-B8</div>
              <div><strong>OPINION</strong>: A22-A23</div>
              <div><strong>CROSSWORD</strong>: C4</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-nyt-border bg-white flex items-center justify-between font-sansText text-xs text-nyt-grayMuted">
          <span>Digital Paper Archive • Read print typography directly</span>
          <button
            onClick={onClose}
            className="text-nyt-black font-bold hover:underline cursor-pointer"
          >
            Return to Web Edition
          </button>
        </div>
      </div>
    </div>
  );
};
