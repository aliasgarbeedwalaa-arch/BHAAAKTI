import React, { useState, useEffect, useRef } from 'react';
import { Article, PhotoVisual, ArticleComment } from '../types';
import {
  ArrowLeft,
  Bookmark,
  Heart,
  Share2,
  Calendar,
  Clock,
  Volume2,
  VolumeX,
  Sparkles,
  Maximize2,
  Check,
  Send,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Flame
} from 'lucide-react';
import { playWhistleSound } from '../utils/audio';

interface ArticleDetailModalProps {
  article: Article;
  articles: Article[];
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  isLiked: boolean;
  likesCount: number;
  onToggleLike: (id: string, e: React.MouseEvent) => void;
  onOpenPhotoLightbox: (photos: PhotoVisual[], initialIndex: number) => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  articles,
  onClose,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
  isLiked,
  likesCount,
  onToggleLike,
  onOpenPhotoLightbox
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [copiedShare, setCopiedShare] = useState(false);
  const [isAudioSimPlaying, setIsAudioSimPlaying] = useState(false);
  const [comments, setComments] = useState<ArticleComment[]>(() => {
    const saved = localStorage.getItem(`comments_${article.id}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      {
        id: 'c1',
        author: 'Carlos Menendez',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        date: '2 hours ago',
        content: 'The depth of this piece is exceptional. That 123rd-minute stop by Dibu Martinez will be studied for the next century of goalkeeping.',
        likes: 24
      },
      {
        id: 'c2',
        author: 'Sarah Jenkins',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
        date: '5 hours ago',
        content: 'The visual layout and tactical maps make this feel like an official FIFA luxury retrospective. Superbly written!',
        likes: 18
      }
    ];
  });
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll Progress Tracking
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollProgress(Math.min(100, Math.max(0, progress)));
  };

  useEffect(() => {
    // Reset scroll to top when article changes
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    setScrollProgress(0);
    setIsAudioSimPlaying(false);
  }, [article.id]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handleToggleAudioSim = () => {
    playWhistleSound();
    setIsAudioSimPlaying(!isAudioSimPlaying);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: ArticleComment = {
      id: Date.now().toString(),
      author: newCommentAuthor.trim() || 'Football Enthusiast',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      date: 'Just now',
      content: newCommentText.trim(),
      likes: 1
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(`comments_${article.id}`, JSON.stringify(updated));
    setNewCommentText('');
    setNewCommentAuthor('');
  };

  // Find next and prev articles
  const currentIndex = articles.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : articles[articles.length - 1];
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : articles[0];

  // Collect all photos in this article
  const allArticlePhotos: PhotoVisual[] = [
    { url: article.coverImage, caption: article.title, credit: 'Main Feature' },
    ...article.gallery,
    ...article.contentSections.filter(s => s.image).map(s => s.image!)
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex flex-col overflow-hidden animate-fadeIn">
      {/* Top Reading Progress Bar */}
      <div className="w-full h-1.5 bg-slate-800 relative z-50">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header Sticky Navigation */}
      <div className="bg-slate-950/95 border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Chronicles</span>
          </button>
          <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
            {article.category}
          </span>
        </div>

        {/* Toolbar: Font Size, Audio, Bookmark, Share */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Font Size Toggle */}
          <button
            onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300"
            title="Toggle text size"
          >
            <span className={fontSize === 'large' ? 'text-amber-400 font-bold' : ''}>
              {fontSize === 'normal' ? 'A+' : 'A-'}
            </span>
          </button>

          {/* Audio Match Ambience */}
          <button
            onClick={handleToggleAudioSim}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isAudioSimPlaying
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
            }`}
            title="Play referee match whistle"
          >
            {isAudioSimPlaying ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden md:inline">Match Whistle</span>
          </button>

          {/* Bookmark */}
          <button
            onClick={(e) => onToggleBookmark(article.id, e)}
            className={`p-2 rounded-xl border transition-all ${
              isBookmarked
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title={isBookmarked ? 'Saved to bookmarks' : 'Bookmark this article'}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>

          {/* Likes Button */}
          <button
            onClick={(e) => onToggleLike(article.id, e)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
              isLiked
                ? 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{likesCount}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all"
          >
            {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{copiedShare ? 'Copied Link!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-8 max-w-5xl mx-auto w-full no-scrollbar"
      >
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-500 text-slate-950">
              {article.category}
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              {article.era}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">
            {article.title}
          </h1>

          <p className="mt-4 text-lg sm:text-2xl text-slate-300 font-normal leading-relaxed">
            {article.subtitle}
          </p>

          {/* Author Card */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-400"
              />
              <div>
                <p className="font-bold text-white text-base">{article.author.name}</p>
                <p className="text-xs text-amber-400">{article.author.role}</p>
                {article.author.bio && (
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{article.author.bio}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenPhotoLightbox(allArticlePhotos, 0)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-600 transition-all"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                <span>View Full Photo Deck ({allArticlePhotos.length})</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Photo with Lightbox Trigger */}
        <div
          onClick={() => onOpenPhotoLightbox(allArticlePhotos, 0)}
          className="relative rounded-3xl overflow-hidden border border-slate-800 group cursor-pointer mb-10 shadow-2xl"
        >
          <img
            src={article.coverImage}
            alt={article.imageAlt}
            className="w-full aspect-[16/9] object-cover group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
            <p className="font-medium bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-md">
              {article.imageAlt}
            </p>
            <span className="flex items-center gap-1.5 bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded-md">
              <Maximize2 className="w-3.5 h-3.5" />
              Click to Zoom High-Res
            </span>
          </div>
        </div>

        {/* Pull Quote Box */}
        <div className="my-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border-l-4 border-amber-400 shadow-xl">
          <p className="font-trophy text-xl sm:text-2xl text-amber-200 italic leading-snug">
            "{article.pullQuote}"
          </p>
          <p className="mt-3 text-xs sm:text-sm font-semibold text-amber-400 uppercase tracking-widest">
            — {article.pullQuoteAuthor}
          </p>
        </div>

        {/* Key Facts Callout Grid */}
        <div className="mb-10 p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="font-heading font-bold text-lg text-white uppercase tracking-wider">
              Essential Match Facts & Historic Significance
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {article.keyFacts.map((fact, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80"
              >
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{fact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className={`space-y-12 ${fontSize === 'large' ? 'text-lg leading-relaxed' : 'text-base leading-relaxed'}`}>
          {article.contentSections.map((section, idx) => (
            <section key={idx} className="space-y-5">
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight border-b border-slate-800 pb-3">
                {section.heading}
              </h2>

              <div className="space-y-4 text-slate-300">
                {section.body.map((para, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Optional Section Image */}
              {section.image && (
                <div
                  onClick={() => onOpenPhotoLightbox(allArticlePhotos, idx + 1)}
                  className="relative rounded-2xl overflow-hidden border border-slate-800 group cursor-pointer my-6"
                >
                  <img
                    src={section.image.url}
                    alt={section.image.caption}
                    className="w-full aspect-[16/9] object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="p-3 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>{section.image.caption}</span>
                    <span className="text-amber-400 font-medium flex items-center gap-1">
                      <Maximize2 className="w-3 h-3" /> Zoom
                    </span>
                  </div>
                </div>
              )}

              {/* Optional Section Match Stats Box */}
              {section.stats && section.stats.length > 0 && (
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 my-6">
                  <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-amber-400">
                    <Flame className="w-4 h-4" />
                    <span>Tactical Match Metrics & Statistical Anatomy</span>
                  </div>
                  <div className="space-y-3">
                    {section.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                        <div className="flex justify-between text-xs text-slate-400 font-medium mb-1.5">
                          <span>{stat.teamA || stat.label}</span>
                          <span className="text-amber-400 font-bold">{stat.label}</span>
                          <span>{stat.teamB || ''}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm sm:text-base font-bold text-white">
                          <span className="text-amber-300">{stat.valueA}</span>
                          {stat.valueB !== undefined && <span className="text-sky-300">{stat.valueB}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Optional Tactical Points */}
              {section.tactics && section.tactics.length > 0 && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 border border-slate-800 my-6">
                  <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-cyan-400">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Managerial Whiteboard & Tactical Decisive Factors</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.tactics.map((tac, tIdx) => (
                      <div key={tIdx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                        <h4 className="font-heading font-bold text-sm text-cyan-300 mb-1.5">
                          {tac.title}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {tac.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* High-Res Photo Gallery Section */}
        {article.gallery.length > 0 && (
          <div className="mt-14 pt-8 border-t border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-heading text-2xl font-black text-white">
                  Chronicle Photo Archives
                </h3>
                <p className="text-xs text-slate-400">
                  Curated photographic coverage from global press lenses
                </p>
              </div>
              <button
                onClick={() => onOpenPhotoLightbox(allArticlePhotos, 0)}
                className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
              >
                View Full Deck ({allArticlePhotos.length}) →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {article.gallery.map((photo, gIdx) => (
                <div
                  key={gIdx}
                  onClick={() => onOpenPhotoLightbox(allArticlePhotos, gIdx + 1)}
                  className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-800 cursor-pointer shadow-lg"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                    <p className="text-xs text-slate-200 font-medium line-clamp-2">
                      {photo.caption}
                    </p>
                    {photo.credit && (
                      <span className="text-[10px] text-amber-400 mt-1">
                        {photo.credit}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reader Comments Section */}
        <div className="mt-14 pt-8 border-t border-slate-800">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-amber-400" />
            <h3 className="font-heading text-2xl font-black text-white">
              Discussion & Reader Perspectives ({comments.length})
            </h3>
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="mb-8 p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex gap-3 mb-3">
              <input
                type="text"
                placeholder="Your name or nickname"
                value={newCommentAuthor}
                onChange={(e) => setNewCommentAuthor(e.target.value)}
                className="w-full sm:w-1/3 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
            <textarea
              rows={3}
              placeholder="Share your thoughts on this World Cup milestone, tactical duel, or memory..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
            />
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all hover:scale-102"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Comment</span>
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex gap-3">
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="w-8 h-8 rounded-full object-cover border border-slate-700 shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-white">{comment.author}</span>
                    <span className="text-[10px] text-slate-500">{comment.date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation to Next / Prev Article */}
        <div className="mt-14 pt-8 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 pb-12">
          {prevArticle && (
            <div
              onClick={() => onSelectArticle(prevArticle)}
              className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all group"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Previous Chronicle</span>
              </div>
              <h4 className="font-heading font-bold text-white text-sm line-clamp-1 group-hover:text-amber-300">
                {prevArticle.title}
              </h4>
            </div>
          )}

          {nextArticle && (
            <div
              onClick={() => onSelectArticle(nextArticle)}
              className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all group sm:text-right"
            >
              <div className="flex items-center sm:justify-end gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                <span>Next Chronicle</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <h4 className="font-heading font-bold text-white text-sm line-clamp-1 group-hover:text-amber-300">
                {nextArticle.title}
              </h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
