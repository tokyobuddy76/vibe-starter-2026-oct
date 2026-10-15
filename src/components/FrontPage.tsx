import React from 'react';
import { Article } from '../types/news';
import { Bookmark, Sparkles, Flame, Clock } from 'lucide-react';

interface FrontPageProps {
  articles: Article[];
  onOpenArticle: (article: Article) => void;
  onOpenLiveUpdates: () => void;
  onOpenWirecutter: () => void;
  onOpenCookingRecipe: () => void;
  onOpenMiniCrossword: () => void;
  onToggleBookmark: (articleId: string, e: React.MouseEvent) => void;
  isBookmarked: (articleId: string) => boolean;
}

export const FrontPage: React.FC<FrontPageProps> = ({
  articles,
  onOpenArticle,
  onOpenLiveUpdates,
  onOpenWirecutter,
  onOpenCookingRecipe,
  onOpenMiniCrossword,
  onToggleBookmark,
  isBookmarked
}) => {
  // Find specific articles by key or fallback
  const womenTrump = articles.find((a) => a.id === 'women-trump-admin') || articles[0];
  const kimberly = articles.find((a) => a.id === 'kimberly-guilfoyle') || articles[1];
  const fedAnalysis = articles.find((a) => a.id === 'fed-pivot-analysis') || articles[2];

  const heroArticle = articles.find((a) => a.id === 'trump-press-secretary') || articles[3];
  const europeStory = articles.find((a) => a.id === 'europe-geopolitics') || articles[4];
  const housingStory = articles.find((a) => a.id === 'housing-affordability') || articles[5];

  const friedman = articles.find((a) => a.id === 'friedman-world-complicated') || articles[6];
  const krugman = articles.find((a) => a.id === 'krugman-tariff-mirage') || articles[7];
  const pamela = articles.find((a) => a.id === 'pamela-paul-screen-childhood') || articles[8];

  const tvShow = articles.find((a) => a.id === 'tv-shows-season') || articles[9];
  const books = articles.find((a) => a.id === 'new-books-recommend') || articles[10];
  const cooking = articles.find((a) => a.id === 'braised-chicken-thighs') || articles[11];
  const games = articles.find((a) => a.id === 'crossword-connections-game') || articles[12];

  const renderBookmarkButton = (articleId: string) => (
    <button
      onClick={(e) => onToggleBookmark(articleId, e)}
      title={isBookmarked(articleId) ? 'Remove bookmark' : 'Save article'}
      aria-label={isBookmarked(articleId) ? 'Remove bookmark' : 'Save article'}
      className="text-nyt-grayLight hover:text-black transition-colors p-1 -mr-1 cursor-pointer"
    >
      <Bookmark
        className={`w-3.5 h-3.5 ${isBookmarked(articleId) ? 'fill-nyt-black text-nyt-black' : ''}`}
      />
    </button>
  );

  return (
    <main className="max-w-[1240px] mx-auto px-4 py-4" id="main-content">
      {/* Top Editorial Section (3-Column Layout reminiscent of the NYT front page) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8 border-b border-nyt-border" data-purpose="top-breaking-stories">
        
        {/* Column 1: Left Lead Column (3 cols) */}
        <div className="lg:col-span-3 flex flex-col space-y-5 border-b lg:border-b-0 lg:border-r border-nyt-border lg:pr-5">
          {/* Article 1 */}
          <article className="space-y-1.5 group">
            <div className="flex items-start justify-between gap-2">
              <h2
                onClick={() => onOpenArticle(womenTrump)}
                className="font-headline text-[22px] leading-snug font-bold nyt-headline-hover cursor-pointer"
              >
                {womenTrump.title}
              </h2>
              {renderBookmarkButton(womenTrump.id)}
            </div>
            <p
              onClick={() => onOpenArticle(womenTrump)}
              className="text-[13px] text-nyt-grayDark font-serifText leading-normal cursor-pointer"
            >
              {womenTrump.summary}
            </p>
            <p className="font-sansText text-[10px] text-nyt-grayLight uppercase tracking-wider">
              {womenTrump.readTime}
            </p>
          </article>

          <hr className="border-nyt-border" />

          {/* Article 2 */}
          <article className="space-y-1.5 group">
            <div className="flex items-start justify-between gap-2">
              <h3
                onClick={() => onOpenArticle(kimberly)}
                className="font-headline text-[17px] leading-snug font-bold nyt-headline-hover cursor-pointer"
              >
                {kimberly.title}
              </h3>
              {renderBookmarkButton(kimberly.id)}
            </div>
            <p
              onClick={() => onOpenArticle(kimberly)}
              className="text-[12px] text-nyt-grayDark font-serifText leading-normal cursor-pointer"
            >
              {kimberly.summary}
            </p>
            <p className="font-sansText text-[10px] text-nyt-grayLight uppercase tracking-wider">
              {kimberly.readTime}
            </p>
          </article>

          <hr className="border-nyt-border" />

          {/* Article 3 (Analysis) */}
          <article className="space-y-1 group">
            <div className="flex items-center justify-between">
              <span className="font-sansText text-[10px] font-bold text-red-700 uppercase tracking-widest">
                Analysis
              </span>
              {renderBookmarkButton(fedAnalysis.id)}
            </div>
            <h3
              onClick={() => onOpenArticle(fedAnalysis)}
              className="font-headline text-[15px] leading-snug font-semibold nyt-headline-hover cursor-pointer"
            >
              {fedAnalysis.title}
            </h3>
            <p className="font-sansText text-[10px] text-nyt-grayLight">
              {fedAnalysis.byline}
            </p>
          </article>
        </div>

        {/* Column 2: Center Primary Showcase (6 cols) */}
        <div className="lg:col-span-6 flex flex-col space-y-4 border-b lg:border-b-0 lg:border-r border-nyt-border lg:pr-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            {/* Main Hero Lead Story Photo and Details */}
            <div className="md:col-span-7 space-y-2">
              <div
                onClick={() => onOpenArticle(heroArticle)}
                className="overflow-hidden bg-[#e8eaf6] aspect-[4/3] flex items-center justify-center cursor-pointer group relative"
              >
                <img
                  alt="Kimberly Guilfoyle in glasses looking directly forward"
                  className="w-full h-auto object-cover object-top max-h-[340px] transition-transform duration-300 group-hover:scale-102"
                  src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="font-sansText text-[10px] text-nyt-grayLight text-right">
                Doug Mills/The New York Times
              </p>
            </div>

            {/* Lead Story Text Side */}
            <div className="md:col-span-5 space-y-2">
              <article>
                <div className="flex items-start justify-between gap-1">
                  <h2
                    onClick={() => onOpenArticle(heroArticle)}
                    className="font-headline text-[24px] md:text-[26px] leading-[1.15] font-bold nyt-headline-hover cursor-pointer"
                  >
                    {heroArticle.title}
                  </h2>
                  {renderBookmarkButton(heroArticle.id)}
                </div>
                <p
                  onClick={() => onOpenArticle(heroArticle)}
                  className="text-[13px] text-nyt-grayDark font-serifText leading-relaxed mt-2 cursor-pointer"
                >
                  {heroArticle.summary}
                </p>
                <p className="font-sansText text-[10px] text-nyt-grayLight uppercase tracking-wider mt-2">
                  {heroArticle.readTime}
                </p>
              </article>

              <div className="pt-3 border-t border-nyt-border">
                <button
                  onClick={onOpenLiveUpdates}
                  className="w-full text-left group font-sansText text-[11px] font-semibold text-nyt-black hover:underline flex items-center justify-between cursor-pointer"
                >
                  <span className="group-hover:text-red-700 transition-colors">
                    • Live Updates: Cabinet Hearings
                  </span>
                  <span className="text-red-700 text-xs animate-pulse">●</span>
                </button>
                <p className="text-[12px] text-nyt-grayMuted mt-1">
                  Lawmakers question selections for critical homeland and diplomatic posts.
                </p>
              </div>
            </div>
          </div>

          <hr className="border-nyt-border" />

          {/* Secondary Mid-Section Headlines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <article className="space-y-1 group">
              <div className="flex items-start justify-between gap-1">
                <h4
                  onClick={() => onOpenArticle(europeStory)}
                  className="font-headline text-[16px] font-bold leading-tight nyt-headline-hover cursor-pointer"
                >
                  {europeStory.title}
                </h4>
                {renderBookmarkButton(europeStory.id)}
              </div>
              <p
                onClick={() => onOpenArticle(europeStory)}
                className="text-[12px] text-nyt-grayDark leading-snug cursor-pointer"
              >
                {europeStory.summary}
              </p>
            </article>

            <article className="space-y-1 group">
              <div className="flex items-start justify-between gap-1">
                <h4
                  onClick={() => onOpenArticle(housingStory)}
                  className="font-headline text-[16px] font-bold leading-tight nyt-headline-hover cursor-pointer"
                >
                  {housingStory.title}
                </h4>
                {renderBookmarkButton(housingStory.id)}
              </div>
              <p
                onClick={() => onOpenArticle(housingStory)}
                className="text-[12px] text-nyt-grayDark leading-snug cursor-pointer"
              >
                {housingStory.summary}
              </p>
            </article>
          </div>
        </div>

        {/* Column 3: Right Opinion & Essential Reads (3 cols) */}
        <div className="lg:col-span-3 flex flex-col space-y-4">
          <div className="border-b border-nyt-border pb-1">
            <h3 className="font-sansText text-[12px] uppercase font-bold tracking-widest text-nyt-black">
              Opinion
            </h3>
          </div>

          {/* Columnist 1 */}
          <article className="space-y-1 pb-3 border-b border-nyt-border group">
            <p className="font-sansText text-[11px] font-bold text-nyt-black uppercase">
              Thomas L. Friedman
            </p>
            <div className="flex items-start justify-between gap-1">
              <h4
                onClick={() => onOpenArticle(friedman)}
                className="font-headline text-[16px] font-bold leading-snug nyt-headline-hover cursor-pointer"
              >
                {friedman.title}
              </h4>
              {renderBookmarkButton(friedman.id)}
            </div>
            <p
              onClick={() => onOpenArticle(friedman)}
              className="text-[12px] text-nyt-grayDark cursor-pointer"
            >
              {friedman.summary}
            </p>
          </article>

          {/* Columnist 2 */}
          <article className="space-y-1 pb-3 border-b border-nyt-border group">
            <p className="font-sansText text-[11px] font-bold text-nyt-black uppercase">
              Paul Krugman
            </p>
            <div className="flex items-start justify-between gap-1">
              <h4
                onClick={() => onOpenArticle(krugman)}
                className="font-headline text-[16px] font-bold leading-snug nyt-headline-hover cursor-pointer"
              >
                {krugman.title}
              </h4>
              {renderBookmarkButton(krugman.id)}
            </div>
            <p
              onClick={() => onOpenArticle(krugman)}
              className="text-[12px] text-nyt-grayDark cursor-pointer"
            >
              {krugman.summary}
            </p>
          </article>

          {/* Columnist 3 */}
          <article className="space-y-1 pb-3 border-b border-nyt-border group">
            <p className="font-sansText text-[11px] font-bold text-nyt-black uppercase">
              Pamela Paul
            </p>
            <div className="flex items-start justify-between gap-1">
              <h4
                onClick={() => onOpenArticle(pamela)}
                className="font-headline text-[16px] font-bold leading-snug nyt-headline-hover cursor-pointer"
              >
                {pamela.title}
              </h4>
              {renderBookmarkButton(pamela.id)}
            </div>
            <p
              onClick={() => onOpenArticle(pamela)}
              className="text-[12px] text-nyt-grayDark cursor-pointer"
            >
              {pamela.summary}
            </p>
          </article>

          {/* Mini Wirecutter Ad/Feature */}
          <div
            onClick={onOpenWirecutter}
            className="bg-nyt-subtleBg p-3 rounded-xs border border-nyt-border cursor-pointer hover:border-black/30 transition-all hover:shadow-xs group"
          >
            <div className="flex items-center justify-between">
              <span className="font-sansText text-[9px] uppercase tracking-wider font-extrabold text-nyt-grayLight group-hover:text-nyt-black transition-colors">
                Wirecutter Recommends
              </span>
              <span className="text-[10px] text-nyt-accent group-hover:underline font-semibold font-sansText">
                Read review →
              </span>
            </div>
            <p className="font-headline text-[13px] font-bold mt-1 text-nyt-black group-hover:text-nyt-accent transition-colors">
              The Best Winter Coats for Bitter Temperatures
            </p>
            <p className="font-sansText text-[11px] text-nyt-grayMuted mt-0.5">
              Tested through blizzard conditions and sub-zero wind chills.
            </p>
          </div>
        </div>
      </section>

      {/* BEGIN: CulturalFeatures Section */}
      <section className="pt-6 pb-12" data-purpose="lifestyle-and-culture">
        <div className="flex items-center justify-between border-b-2 border-nyt-black pb-1 mb-4 font-sansText">
          <h3 className="text-[14px] font-black uppercase tracking-wider">
            Arts &amp; Leisure
          </h3>
          <span className="text-[11px] font-semibold text-nyt-accent hover:underline cursor-pointer">
            Explore More →
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card 1: Television */}
          <article className="space-y-2 group">
            <div
              onClick={() => onOpenArticle(tvShow)}
              className="aspect-video bg-[#e8eaf6] overflow-hidden cursor-pointer flex items-center justify-center relative"
            >
              <img
                alt="Culture coverage"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-sansText text-[10px] text-red-800 uppercase font-bold tracking-wider">
                Television
              </span>
              {renderBookmarkButton(tvShow.id)}
            </div>
            <h4
              onClick={() => onOpenArticle(tvShow)}
              className="font-headline text-[15px] font-bold leading-tight nyt-headline-hover cursor-pointer"
            >
              {tvShow.title}
            </h4>
            <p
              onClick={() => onOpenArticle(tvShow)}
              className="text-[12px] text-nyt-grayDark cursor-pointer"
            >
              {tvShow.summary}
            </p>
          </article>

          {/* Card 2: Books */}
          <article className="space-y-2 group">
            <div
              onClick={() => onOpenArticle(books)}
              className="aspect-video bg-[#e8eaf6] overflow-hidden cursor-pointer flex items-center justify-center relative"
            >
              <img
                alt="Books coverage"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-sansText text-[10px] text-nyt-grayMuted uppercase font-bold tracking-wider">
                Books
              </span>
              {renderBookmarkButton(books.id)}
            </div>
            <h4
              onClick={() => onOpenArticle(books)}
              className="font-headline text-[15px] font-bold leading-tight nyt-headline-hover cursor-pointer"
            >
              {books.title}
            </h4>
            <p
              onClick={() => onOpenArticle(books)}
              className="text-[12px] text-nyt-grayDark cursor-pointer"
            >
              {books.summary}
            </p>
          </article>

          {/* Card 3: Cooking */}
          <article className="space-y-2 group">
            <div
              onClick={onOpenCookingRecipe}
              className="aspect-video bg-[#e8eaf6] overflow-hidden cursor-pointer flex items-center justify-center relative"
            >
              <img
                alt="Dining coverage"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] font-sansText px-1.5 py-0.5 rounded-xs font-semibold">
                Recipe Box
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-sansText text-[10px] text-nyt-grayMuted uppercase font-bold tracking-wider">
                Cooking
              </span>
              {renderBookmarkButton(cooking.id)}
            </div>
            <h4
              onClick={onOpenCookingRecipe}
              className="font-headline text-[15px] font-bold leading-tight nyt-headline-hover cursor-pointer"
            >
              {cooking.title}
            </h4>
            <p
              onClick={onOpenCookingRecipe}
              className="text-[12px] text-nyt-grayDark cursor-pointer"
            >
              {cooking.summary}
            </p>
          </article>

          {/* Card 4: Games */}
          <article className="space-y-2 group">
            <div
              onClick={onOpenMiniCrossword}
              className="aspect-video bg-[#e8eaf6] overflow-hidden cursor-pointer flex items-center justify-center relative border border-nyt-border"
            >
              <img
                alt="Games coverage"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-2 right-2 bg-black text-white text-[10px] font-sansText px-2 py-0.5 rounded-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <span>Play 5x5</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-sansText text-[10px] text-nyt-grayMuted uppercase font-bold tracking-wider">
                Games
              </span>
              <span className="text-[10px] font-sansText text-emerald-700 font-bold">
                Daily Active
              </span>
            </div>
            <h4
              onClick={onOpenMiniCrossword}
              className="font-headline text-[15px] font-bold leading-tight nyt-headline-hover cursor-pointer"
            >
              {games.title}
            </h4>
            <p
              onClick={onOpenMiniCrossword}
              className="text-[12px] text-nyt-grayDark cursor-pointer"
            >
              {games.summary}
            </p>
          </article>
        </div>
      </section>
      {/* END: CulturalFeatures Section */}
    </main>
  );
};
