/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ARTICLES_DATA } from './data/newsData';
import { Article } from './types/news';
import { Header } from './components/Header';
import { FrontPage } from './components/FrontPage';
import { ArticleView } from './components/ArticleView';
import { MiniCrosswordModal } from './components/MiniCrosswordModal';
import { RecipeModal } from './components/RecipeModal';
import { WirecutterModal } from './components/WirecutterModal';
import { LiveUpdatesModal } from './components/LiveUpdatesModal';
import { SearchModal } from './components/SearchModal';
import { SubscribeModal } from './components/SubscribeModal';
import { LoginModal } from './components/LoginModal';
import { TodaysPaperModal } from './components/TodaysPaperModal';
import { SavedArticlesDrawer } from './components/SavedArticlesDrawer';
import { Footer } from './components/Footer';

export default function App() {
  const [articles] = useState<Article[]>(ARTICLES_DATA);
  const [currentView, setCurrentView] = useState<'front-page' | 'article-view'>('front-page');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  // Editions
  const [currentEdition, setCurrentEdition] = useState<string>('U.S.');
  const [activeSection, setActiveSection] = useState<string>('Front Page');

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLiveUpdatesOpen, setIsLiveUpdatesOpen] = useState(false);
  const [isWirecutterOpen, setIsWirecutterOpen] = useState(false);
  const [isCookingRecipeOpen, setIsCookingRecipeOpen] = useState(false);
  const [isMiniCrosswordOpen, setIsMiniCrosswordOpen] = useState(false);
  const [isTodaysPaperOpen, setIsTodaysPaperOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // User state
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('nyt_saved_articles');
      return stored ? JSON.parse(stored) : ['women-trump-admin', 'braised-chicken-thighs'];
    } catch {
      return ['women-trump-admin', 'braised-chicken-thighs'];
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nyt_saved_articles', JSON.stringify(savedArticleIds));
    } catch {
      // Ignore in strict sandbox
    }
  }, [savedArticleIds]);

  const handleToggleBookmark = (articleId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedArticleIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const isBookmarked = (articleId: string) => savedArticleIds.includes(articleId);

  const handleOpenArticle = (article: Article) => {
    setActiveArticle(article);
    setCurrentView('article-view');
  };

  const handleBackToFrontPage = () => {
    setCurrentView('front-page');
    setActiveArticle(null);
  };

  const handleSelectSection = (section: string) => {
    setActiveSection(section);
    if (section === 'Games') {
      setIsMiniCrosswordOpen(true);
      return;
    }
    if (section === 'Cooking') {
      setIsCookingRecipeOpen(true);
      return;
    }
    if (section === 'Wirecutter') {
      setIsWirecutterOpen(true);
      return;
    }
    if (section === 'Audio') {
      // Open lead article with audio player
      const lead = articles[0];
      handleOpenArticle(lead);
      return;
    }
    if (section === 'Opinion') {
      if (currentView === 'article-view') {
        setCurrentView('front-page');
      }
      setTimeout(() => {
        window.scrollTo({ top: 380, behavior: 'smooth' });
      }, 50);
      return;
    }
    if (section === 'Arts') {
      if (currentView === 'article-view') {
        setCurrentView('front-page');
      }
      setTimeout(() => {
        window.scrollTo({ top: 750, behavior: 'smooth' });
      }, 50);
      return;
    }

    // Default to front page view
    setCurrentView('front-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-nyt-black font-serifText flex flex-col justify-between selection:bg-black selection:text-white">
      {/* Site Header */}
      <Header
        currentEdition={currentEdition}
        onSelectEdition={(edition) => setCurrentEdition(edition)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenTodaysPaper={() => setIsTodaysPaperOpen(true)}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        onOpenLiveUpdates={() => setIsLiveUpdatesOpen(true)}
        onSelectSection={handleSelectSection}
        activeSection={activeSection}
        savedCount={savedArticleIds.length}
        userEmail={userEmail}
      />

      {/* Main View Switcher */}
      <div className="flex-1">
        {currentView === 'front-page' ? (
          <FrontPage
            articles={articles}
            onOpenArticle={handleOpenArticle}
            onOpenLiveUpdates={() => setIsLiveUpdatesOpen(true)}
            onOpenWirecutter={() => setIsWirecutterOpen(true)}
            onOpenCookingRecipe={() => setIsCookingRecipeOpen(true)}
            onOpenMiniCrossword={() => setIsMiniCrosswordOpen(true)}
            onToggleBookmark={handleToggleBookmark}
            isBookmarked={isBookmarked}
          />
        ) : activeArticle ? (
          <ArticleView
            article={activeArticle}
            onBack={handleBackToFrontPage}
            isBookmarked={isBookmarked(activeArticle.id)}
            onToggleBookmark={() => handleToggleBookmark(activeArticle.id)}
            onSelectArticle={handleOpenArticle}
            allArticles={articles}
          />
        ) : null}
      </div>

      {/* Site Footer */}
      <Footer
        onSelectSection={handleSelectSection}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onOpenCooking={() => setIsCookingRecipeOpen(true)}
        onOpenWirecutter={() => setIsWirecutterOpen(true)}
      />

      {/* Interactive Modals */}
      <MiniCrosswordModal
        isOpen={isMiniCrosswordOpen}
        onClose={() => setIsMiniCrosswordOpen(false)}
      />

      <RecipeModal
        isOpen={isCookingRecipeOpen}
        onClose={() => setIsCookingRecipeOpen(false)}
        isSaved={savedArticleIds.includes('braised-chicken-thighs')}
        onToggleSave={() => handleToggleBookmark('braised-chicken-thighs')}
      />

      <WirecutterModal
        isOpen={isWirecutterOpen}
        onClose={() => setIsWirecutterOpen(false)}
      />

      <LiveUpdatesModal
        isOpen={isLiveUpdatesOpen}
        onClose={() => setIsLiveUpdatesOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={articles}
        onSelectArticle={handleOpenArticle}
      />

      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
        onSubscribed={() => {
          if (!userEmail) setUserEmail('reader@nytimes.com');
        }}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        userEmail={userEmail}
        onLogin={(email) => setUserEmail(email)}
        onLogout={() => setUserEmail(null)}
      />

      <TodaysPaperModal
        isOpen={isTodaysPaperOpen}
        onClose={() => setIsTodaysPaperOpen(false)}
        articles={articles}
        onSelectArticle={handleOpenArticle}
      />

      <SavedArticlesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedArticleIds={savedArticleIds}
        allArticles={articles}
        onSelectArticle={handleOpenArticle}
        onRemoveBookmark={(id) => handleToggleBookmark(id)}
        onClearAll={() => setSavedArticleIds([])}
      />
    </div>
  );
}
