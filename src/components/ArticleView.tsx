import React, { useState, useEffect } from 'react';
import { Article } from '../types/news';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Type,
  MessageSquare,
  Check,
  Printer,
  ChevronRight
} from 'lucide-react';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onSelectArticle: (article: Article) => void;
  allArticles: Article[];
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onBack,
  isBookmarked,
  onToggleBookmark,
  onSelectArticle,
  allArticles
}) => {
  // Audio state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.25 | 1.5>(1);

  // Scroll reading progress
  const [scrollProgress, setScrollProgress] = useState(0);

  // Reading theme state
  const [readingTheme, setReadingTheme] = useState<'white' | 'sepia' | 'dark'>('white');

  // Text size state
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'larger'>('normal');

  // Share notification
  const [showShareToast, setShowShareToast] = useState(false);

  // Comments state
  const [comments, setComments] = useState<Array<{ id: string; name: string; city: string; text: string; time: string; likes: number }>>([
    {
      id: 'c1',
      name: 'Eleanor Vance',
      city: 'Boston, MA',
      text: 'This reporting highlights a crucial dynamic that has been largely overlooked in the daily news cycle. The institutional memory loss within key agencies is what really damages long-term administrative continuity.',
      time: '3 hours ago',
      likes: 42
    },
    {
      id: 'c2',
      name: 'David R. Miller',
      city: 'Chicago, IL',
      text: 'A well-measured analysis. It is refreshing to see nuanced coverage that looks behind the press briefings and into the statutory mechanics of governance.',
      time: '1 hour ago',
      likes: 19
    }
  ]);
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentName, setNewCommentName] = useState('');

  // Scroll depth tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Web Speech API integration
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      const textToRead = `${article.title}. ${article.summary}. ${article.paragraphs.join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = playbackSpeed;

      utterance.onboundary = (e) => {
        if (textToRead.length > 0) {
          const pct = Math.min(100, Math.round((e.charIndex / textToRead.length) * 100));
          setAudioProgress(pct);
        }
      };

      utterance.onend = () => {
        setIsPlayingAudio(false);
        setAudioProgress(100);
      };

      utterance.onerror = () => {
        setIsPlayingAudio(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlayingAudio, playbackSpeed, article.id]);

  // Handle escape to go back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const item = {
      id: Date.now().toString(),
      name: newCommentName.trim() || 'Reader',
      city: 'New York, NY',
      text: newCommentText.trim(),
      time: 'Just now',
      likes: 0
    };
    setComments([item, ...comments]);
    setNewCommentText('');
  };

  const otherArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  const getTextClass = () => {
    if (textSize === 'large') return 'text-[19px] leading-[1.8]';
    if (textSize === 'larger') return 'text-[22px] leading-[1.85]';
    return 'text-[17px] leading-[1.75]';
  };

  return (
    <article
      className={`min-h-screen transition-colors duration-300 ${
        readingTheme === 'sepia'
          ? 'bg-[#fbf9f5] text-[#1c1917]'
          : readingTheme === 'dark'
          ? 'bg-[#141414] text-[#ececec]'
          : 'bg-white text-nyt-black'
      }`}
    >
      {/* Sticky Scroll Reading Progress Bar at the top */}
      <div
        className="fixed top-0 left-0 h-1 bg-red-700 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-[1240px] mx-auto px-4 py-4 antialiased">
        {/* Toast Notification */}
        {showShareToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#121212] text-white px-4 py-2.5 rounded-sm shadow-xl flex items-center gap-2 text-sm font-sansText animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Article link copied to clipboard</span>
          </div>
        )}

        {/* Top Breadcrumb & Navigation */}
        <div
          className={`flex items-center justify-between pb-3 mb-4 border-b font-sansText text-xs ${
            readingTheme === 'dark' ? 'border-neutral-800 text-neutral-400' : 'border-nyt-border text-nyt-grayMuted'
          }`}
        >
          <button
            onClick={onBack}
            className={`flex items-center gap-1.5 font-semibold transition-colors cursor-pointer ${
              readingTheme === 'dark' ? 'text-white hover:text-neutral-300' : 'text-nyt-black hover:text-nyt-accent'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Front Page</span>
          </button>

          <div className="flex items-center gap-2">
            <span
              className={`uppercase tracking-widest text-[11px] font-bold ${
                readingTheme === 'dark' ? 'text-white' : 'text-nyt-black'
              }`}
            >
              {article.category}
            </span>
            <span>•</span>
            <span>{article.date}</span>
          </div>
        </div>

        {/* Reading Container: max-w-[800px] centered */}
        <div className="max-w-[780px] mx-auto">
          {/* Category kicker */}
          <div className="mb-2">
            <span className="font-sansText text-[11px] font-bold uppercase tracking-widest text-red-700">
              {article.category}
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`font-headline text-3xl sm:text-4xl md:text-[44px] font-bold leading-[1.12] mb-3 ${
              readingTheme === 'dark' ? 'text-white' : 'text-nyt-black'
            }`}
          >
            {article.title}
          </h1>

          {/* Deck / Summary */}
          <p
            className={`font-serifText text-xl leading-snug mb-5 ${
              readingTheme === 'dark' ? 'text-neutral-300' : 'text-nyt-grayDark'
            }`}
          >
            {article.summary}
          </p>

          {/* Byline and Dateline */}
          <div
            className={`flex flex-col sm:flex-row sm:items-center justify-between border-y py-3 my-4 gap-2 font-sansText text-xs ${
              readingTheme === 'dark'
                ? 'border-neutral-800 text-neutral-400'
                : 'border-nyt-border text-nyt-grayMuted'
            }`}
          >
            <div>
              <p
                className={`font-bold text-[13px] ${
                  readingTheme === 'dark' ? 'text-white' : 'text-nyt-black'
                }`}
              >
                {article.byline}
              </p>
              {article.authorRole && (
                <p className="text-[11px] text-neutral-500">{article.authorRole}</p>
              )}
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span>{article.readTime}</span>
              <span>•</span>
              <span>Published Oct. 14, 2026</span>
            </div>
          </div>

          {/* Action Bar (Audio, Bookmark, Share, Font Size, Theme) */}
          <div
            className={`border rounded-sm p-3 mb-6 flex flex-wrap items-center justify-between gap-3 font-sansText ${
              readingTheme === 'dark'
                ? 'bg-neutral-900 border-neutral-800'
                : readingTheme === 'sepia'
                ? 'bg-[#f4efe6] border-[#e2d9cc]'
                : 'bg-nyt-subtleBg border-nyt-border'
            }`}
          >
            {/* Audio listen player */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="bg-black text-white hover:bg-neutral-800 p-2 rounded-full transition-transform active:scale-95 cursor-pointer flex items-center justify-center shadow-xs"
                title={isPlayingAudio ? 'Pause Narration' : 'Listen to this article'}
              >
                {isPlayingAudio ? (
                  <Pause className="w-4 h-4 fill-current text-white" />
                ) : (
                  <Play className="w-4 h-4 fill-current text-white ml-0.5" />
                )}
              </button>
              <div className="flex flex-col">
                <span
                  className={`text-xs font-bold ${
                    readingTheme === 'dark' ? 'text-white' : 'text-nyt-black'
                  }`}
                >
                  {isPlayingAudio ? 'Speaking article...' : 'Listen to this story'}
                </span>
                <span className="text-[10px] text-neutral-500">
                  {isPlayingAudio
                    ? `${audioProgress}% narrated (Web Speech)`
                    : `${article.readTime} audio companion`}
                </span>
              </div>
              {isPlayingAudio && (
                <button
                  onClick={() =>
                    setPlaybackSpeed(
                      playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : 1
                    )
                  }
                  className="text-[10px] font-bold border border-neutral-300 px-1.5 py-0.5 rounded-sm bg-white text-black cursor-pointer ml-1"
                >
                  {playbackSpeed}x
                </button>
              )}
            </div>

            {/* Right actions: bookmark, share, font adjust, reading theme */}
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleBookmark}
                className={`p-2 rounded-xs border transition-colors cursor-pointer flex items-center gap-1.5 text-xs ${
                  isBookmarked
                    ? 'border-black bg-black text-white'
                    : readingTheme === 'dark'
                    ? 'border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-white'
                    : 'border-nyt-border bg-white hover:bg-neutral-50 text-nyt-black'
                }`}
                title="Bookmark story"
              >
                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={handleShare}
                className={`p-2 rounded-xs border transition-colors cursor-pointer flex items-center gap-1.5 text-xs ${
                  readingTheme === 'dark'
                    ? 'border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-white'
                    : 'border-nyt-border bg-white hover:bg-neutral-50 text-nyt-black'
                }`}
                title="Share link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share</span>
              </button>

              {/* Reading Theme Toggle */}
              <div className="flex items-center border border-neutral-300 rounded-xs overflow-hidden text-xs">
                <button
                  onClick={() => setReadingTheme('white')}
                  className={`px-2 py-1.5 text-[10px] font-bold cursor-pointer transition-colors ${
                    readingTheme === 'white'
                      ? 'bg-black text-white'
                      : 'bg-white text-neutral-700 hover:bg-neutral-100'
                  }`}
                  title="White theme"
                >
                  Paper
                </button>
                <button
                  onClick={() => setReadingTheme('sepia')}
                  className={`px-2 py-1.5 text-[10px] font-bold cursor-pointer transition-colors ${
                    readingTheme === 'sepia'
                      ? 'bg-[#5c4d3c] text-white'
                      : 'bg-[#f4efe6] text-[#5c4d3c] hover:bg-[#eae3d5]'
                  }`}
                  title="Sepia parchment theme"
                >
                  Sepia
                </button>
                <button
                  onClick={() => setReadingTheme('dark')}
                  className={`px-2 py-1.5 text-[10px] font-bold cursor-pointer transition-colors ${
                    readingTheme === 'dark'
                      ? 'bg-white text-black'
                      : 'bg-neutral-900 text-white hover:bg-neutral-800'
                  }`}
                  title="Dark night theme"
                >
                  Night
                </button>
              </div>

              {/* Font Size Selector */}
              <div className="flex items-center border border-neutral-300 rounded-xs bg-white text-xs overflow-hidden">
                <button
                  onClick={() => setTextSize('normal')}
                  className={`px-2 py-1.5 transition-colors cursor-pointer ${
                    textSize === 'normal'
                      ? 'bg-nyt-black text-white font-bold'
                      : 'text-nyt-grayDark hover:bg-neutral-100'
                  }`}
                  title="Normal text size"
                >
                  A
                </button>
                <button
                  onClick={() => setTextSize('large')}
                  className={`px-2 py-1.5 text-sm transition-colors cursor-pointer ${
                    textSize === 'large'
                      ? 'bg-nyt-black text-white font-bold'
                      : 'text-nyt-grayDark hover:bg-neutral-100'
                  }`}
                  title="Large text size"
                >
                  A+
                </button>
                <button
                  onClick={() => setTextSize('larger')}
                  className={`px-2 py-1.5 text-base transition-colors cursor-pointer ${
                    textSize === 'larger'
                      ? 'bg-nyt-black text-white font-bold'
                      : 'text-nyt-grayDark hover:bg-neutral-100'
                  }`}
                  title="Largest text size"
                >
                  A++
                </button>
              </div>
            </div>
          </div>

        {/* Audio Progress bar */}
        {isPlayingAudio && (
          <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden mb-6 -mt-4">
            <div
              className="bg-nyt-black h-full transition-all duration-300"
              style={{ width: `${audioProgress}%` }}
            />
          </div>
        )}

        {/* Featured Photo with Caption and Credit */}
        {article.photoUrl && (
          <figure className="my-6">
            <div className="overflow-hidden bg-[#e8eaf6] aspect-[16/9] flex items-center justify-center">
              <img
                src={article.photoUrl}
                alt={article.photoCaption || article.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {(article.photoCaption || article.photoCredit) && (
              <figcaption className="mt-2 font-sansText text-[11px] text-nyt-grayLight flex justify-between items-start gap-4">
                <span>{article.photoCaption}</span>
                {article.photoCredit && <span className="shrink-0">{article.photoCredit}</span>}
              </figcaption>
            )}
          </figure>
        )}

        {/* Editorial Body Text */}
        <div className={`font-serifText text-nyt-black space-y-5 ${getTextClass()}`}>
          {article.paragraphs.map((p, idx) => (
            <p key={idx} className={idx === 0 ? 'nyt-drop-cap' : ''}>
              {p}
            </p>
          ))}
        </div>

        {/* Pull Quote */}
        {article.pullQuote && (
          <div className="my-8 py-6 border-y-2 border-nyt-black text-center px-4">
            <blockquote className="font-headline italic text-2xl sm:text-3xl text-nyt-black leading-snug">
              “{article.pullQuote.text}”
            </blockquote>
            {article.pullQuote.attribution && (
              <cite className="block font-sansText text-xs uppercase tracking-widest text-nyt-grayMuted mt-3 font-semibold not-italic">
                — {article.pullQuote.attribution}
              </cite>
            )}
          </div>
        )}

        {/* Story Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-nyt-border">
            <span className="font-sansText text-xs font-bold text-nyt-grayDark uppercase tracking-wider block mb-2">
              Filed under:
            </span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sansText text-xs text-nyt-accent">
              {article.tags.map((tag, i) => (
                <React.Fragment key={tag}>
                  {i > 0 && <span className="text-nyt-border">•</span>}
                  <span className="hover:underline cursor-pointer">{tag}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Reader Comments Section */}
        <section className="mt-12 pt-8 border-t-2 border-nyt-black">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-nyt-black" />
              <h3 className="font-headline text-xl font-bold text-nyt-black">
                Reader Comments ({comments.length})
              </h3>
            </div>
            <span className="font-sansText text-xs text-nyt-grayMuted">Moderated community discussion</span>
          </div>

          {/* New comment input */}
          <form onSubmit={handleAddComment} className="bg-nyt-subtleBg p-4 rounded-xs border border-nyt-border mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="Your name or initials"
                value={newCommentName}
                onChange={(e) => setNewCommentName(e.target.value)}
                className="bg-white border border-nyt-border px-3 py-1.5 text-xs font-sansText rounded-xs focus:outline-none focus:border-black"
              />
            </div>
            <textarea
              rows={3}
              placeholder="What are your thoughts on this story? (Keep civil and respectful)"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="w-full bg-white border border-nyt-border p-3 text-xs font-sansText rounded-xs focus:outline-none focus:border-black mb-3"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-nyt-black hover:bg-neutral-800 text-white font-sansText text-xs font-bold px-4 py-1.5 rounded-xs transition-colors cursor-pointer"
              >
                Post Comment
              </button>
            </div>
          </form>

          {/* Comments list */}
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="pb-4 border-b border-nyt-border last:border-b-0">
                <div className="flex items-center justify-between text-xs font-sansText text-nyt-grayMuted mb-1">
                  <span className="font-bold text-nyt-black">
                    {c.name} <span className="font-normal text-nyt-grayLight">({c.city})</span>
                  </span>
                  <span>{c.time}</span>
                </div>
                <p className="font-serifText text-sm text-nyt-grayDark leading-relaxed">{c.text}</p>
                <div className="mt-2 flex items-center gap-2 text-xs font-sansText text-nyt-grayLight">
                  <button
                    onClick={() => {
                      setComments(
                        comments.map((item) =>
                          item.id === c.id ? { ...item, likes: item.likes + 1 } : item
                        )
                      );
                    }}
                    className="hover:text-nyt-black transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Recommend</span>
                    <span className="font-bold">({c.likes})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Next / Related Stories */}
        <section className="mt-12 pt-8 border-t border-nyt-border pb-16">
          <h4 className="font-sansText text-xs font-bold uppercase tracking-widest text-nyt-black mb-4">
            More Top Stories
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherArticles.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectArticle(item)}
                className="space-y-1.5 cursor-pointer group"
              >
                <span className="font-sansText text-[10px] text-red-700 font-bold uppercase tracking-wider">
                  {item.category}
                </span>
                <h5 className="font-headline text-sm font-bold leading-tight group-hover:text-nyt-grayLight transition-colors">
                  {item.title}
                </h5>
                <p className="font-serifText text-xs text-nyt-grayDark line-clamp-2">
                  {item.summary}
                </p>
                <span className="font-sansText text-[10px] text-nyt-accent flex items-center gap-1 group-hover:underline">
                  Read story <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            ))}
          </div>
        </section>
        </div>
      </div>
    </article>
  );
};
