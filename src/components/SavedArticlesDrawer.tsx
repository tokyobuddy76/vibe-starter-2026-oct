import React from 'react';
import { Article } from '../types/news';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';

interface SavedArticlesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticleIds: string[];
  allArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
}

export const SavedArticlesDrawer: React.FC<SavedArticlesDrawerProps> = ({
  isOpen,
  onClose,
  savedArticleIds,
  allArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll
}) => {
  if (!isOpen) return null;

  const savedArticles = allArticles.filter((a) => savedArticleIds.includes(a.id));

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-[420px] h-full shadow-2xl border-l border-nyt-border flex flex-col relative animate-fade-in overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-nyt-border flex items-center justify-between font-sansText">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 fill-current text-black" />
            <h3 className="font-headline text-lg font-bold text-nyt-black">
              Saved For Later ({savedArticles.length})
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {savedArticles.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-[11px] text-nyt-grayLight hover:text-red-700 cursor-pointer"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 hover:bg-neutral-100 rounded-xs text-neutral-500 hover:text-black cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 p-2">
          {savedArticles.length === 0 ? (
            <div className="p-8 text-center text-nyt-grayMuted font-sansText space-y-2">
              <Bookmark className="w-8 h-8 mx-auto opacity-30" />
              <p className="text-sm font-semibold text-nyt-black">No saved articles yet</p>
              <p className="text-xs text-nyt-grayLight">
                Tap the bookmark icon on any headline or article to save it to your reading list.
              </p>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div
                key={article.id}
                className="p-3 hover:bg-neutral-50 transition-colors flex items-start justify-between gap-3 group"
              >
                <div
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                  className="space-y-1 cursor-pointer flex-1"
                >
                  <span className="font-sansText text-[10px] font-bold text-red-700 uppercase tracking-wider">
                    {article.category}
                  </span>
                  <h4 className="font-headline text-sm font-bold text-nyt-black group-hover:text-nyt-accent transition-colors leading-tight">
                    {article.title}
                  </h4>
                  <p className="font-sansText text-[10px] text-nyt-grayLight">
                    {article.readTime} • {article.date}
                  </p>
                </div>

                <button
                  onClick={() => onRemoveBookmark(article.id)}
                  className="p-1.5 text-neutral-300 hover:text-red-600 transition-colors cursor-pointer shrink-0"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-nyt-border bg-neutral-50 font-sansText text-xs text-nyt-grayLight text-center">
          Saved stories are stored locally on this device.
        </div>
      </div>
    </div>
  );
};
