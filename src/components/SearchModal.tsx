import React, { useState, useEffect, useRef } from 'react';
import { Article } from '../types/news';
import { Search, X, Clock, ArrowRight, Tag } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedCategory('All');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = ['All', 'U.S.', 'World', 'Business', 'Opinion', 'Cooking', 'Games'];

  const filtered = articles.filter((a) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      a.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      a.sectionKey.toLowerCase().includes(selectedCategory.toLowerCase());

    if (!matchesCategory) return false;

    if (!query.trim()) return true;

    const q = query.toLowerCase();
    const inTitle = a.title.toLowerCase().includes(q);
    const inSummary = a.summary.toLowerCase().includes(q);
    const inByline = a.byline.toLowerCase().includes(q);
    const inTags = a.tags.some((t) => t.toLowerCase().includes(q));

    return inTitle || inSummary || inByline || inTags;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-8 pt-12 sm:pt-20 overflow-y-auto">
      <div className="bg-white w-full max-w-[680px] rounded-sm shadow-2xl border border-nyt-border flex flex-col relative animate-fade-in overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-nyt-border flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-nyt-grayDark shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all stories, opinion pieces, topics..."
            className="w-full text-base font-serifText text-nyt-black placeholder:text-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-nyt-grayLight hover:text-black cursor-pointer font-sansText uppercase"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 hover:bg-neutral-100 rounded-xs text-neutral-500 hover:text-black cursor-pointer ml-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories / Filter Pills */}
        <div className="px-4 py-2 border-b border-neutral-100 bg-neutral-50 flex items-center gap-1.5 overflow-x-auto font-sansText text-xs">
          <span className="text-[11px] text-nyt-grayLight uppercase tracking-wider font-bold mr-1">
            Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-nyt-black text-white font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-neutral-100">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-nyt-grayMuted font-sansText">
              <p className="text-sm">No stories found matching "{query}".</p>
              <p className="text-xs mt-1 text-nyt-grayLight">Try searching for keywords like "Trump", "Federal Reserve", "Books", or "Cooking".</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectArticle(item);
                  onClose();
                }}
                className="p-4 hover:bg-[#f9fafb] cursor-pointer transition-colors space-y-1 group"
              >
                <div className="flex items-center justify-between font-sansText text-[10px] text-nyt-grayLight">
                  <span className="font-bold text-red-700 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span>{item.readTime}</span>
                </div>
                <h4 className="font-headline text-base font-bold text-nyt-black group-hover:text-nyt-accent transition-colors">
                  {item.title}
                </h4>
                <p className="font-serifText text-xs text-nyt-grayDark line-clamp-2">
                  {item.summary}
                </p>
                <p className="font-sansText text-[11px] text-nyt-grayLight pt-0.5">
                  {item.byline}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-neutral-50 border-t border-nyt-border flex items-center justify-between font-sansText text-xs text-nyt-grayLight">
          <span>{filtered.length} stories available</span>
          <span className="text-[10px]">Press Esc to close</span>
        </div>
      </div>
    </div>
  );
};
