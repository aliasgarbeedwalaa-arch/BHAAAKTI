import React from 'react';
import { Article } from '../types';
import { Clock, Calendar, Bookmark, Heart, ImageIcon, ArrowUpRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  isLiked: boolean;
  likesCount: number;
  onToggleLike: (id: string, e: React.MouseEvent) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  isBookmarked,
  onToggleBookmark,
  isLiked,
  likesCount,
  onToggleLike
}) => {
  return (
    <article
      onClick={() => onSelect(article)}
      className="group flex flex-col bg-slate-900/70 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/5 hover:-translate-y-1"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
        <img
          src={article.coverImage}
          alt={article.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-500/25">
            {article.category}
          </span>

          <div className="flex items-center gap-1.5">
            {/* Gallery count badge */}
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-950/80 backdrop-blur-md text-slate-300 border border-slate-700">
              <ImageIcon className="w-3 h-3 text-amber-400" />
              <span>{article.gallery.length + 1} photos</span>
            </span>

            {/* Bookmark button */}
            <button
              onClick={(e) => onToggleBookmark(article.id, e)}
              className={`p-1.5 rounded-md backdrop-blur-md border transition-all ${
                isBookmarked
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-slate-950/70 text-slate-300 hover:text-white border-slate-700/80'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Save article'}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </div>

        {/* Bottom Era badge */}
        <div className="absolute bottom-2.5 left-3">
          <span className="text-[10px] font-semibold tracking-wider text-slate-300 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
            {article.era}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="font-heading font-bold text-lg text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Meta */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          {/* Author */}
          <div className="flex items-center gap-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-6 h-6 rounded-full object-cover border border-slate-700"
            />
            <span className="text-[11px] font-medium text-slate-300 truncate max-w-[110px]">
              {article.author.name}
            </span>
          </div>

          {/* Read time & likes */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>{article.readTime}</span>
            </div>

            <button
              onClick={(e) => onToggleLike(article.id, e)}
              className={`flex items-center gap-1 text-[11px] font-medium transition-colors ${
                isLiked ? 'text-rose-400' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Like chronicle"
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{likesCount}</span>
            </button>

            <span className="text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
