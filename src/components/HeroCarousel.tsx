import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { ChevronLeft, ChevronRight, Calendar, Clock, Eye, Sparkles } from 'lucide-react';

interface HeroCarouselProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ articles, onSelectArticle }) => {
  const featuredArticles = articles.filter(a => a.featured);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredArticles.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [featuredArticles.length]);

  if (featuredArticles.length === 0) return null;

  const current = featuredArticles[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredArticles.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length);
  };

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 rounded-3xl border border-slate-800/80 shadow-2xl group my-6">
      {/* Background Image Container */}
      <div className="relative h-[480px] sm:h-[540px] md:h-[600px] w-full overflow-hidden">
        <img
          src={current.coverImage}
          alt={current.imageAlt}
          className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Cinematic dark gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-955 via-slate-950/70 to-transparent" />
      </div>

      {/* Floating Content */}
      <div className="absolute inset-0 p-6 sm:p-10 md:p-14 flex flex-col justify-end max-w-4xl z-10">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Featured Chronicle
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900/80 backdrop-blur-md text-amber-300 border border-amber-500/30">
            {current.category}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900/80 backdrop-blur-md text-slate-300 border border-slate-700">
            {current.era}
          </span>
        </div>

        {/* Featured Story Title */}
        <h2 
          onClick={() => onSelectArticle(current)}
          className="font-heading text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight cursor-pointer hover:text-amber-300 transition-colors drop-shadow-md"
        >
          {current.title}
        </h2>

        {/* Subtitle / Excerpt */}
        <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-300 line-clamp-2 md:line-clamp-3 font-normal max-w-3xl drop-shadow">
          {current.subtitle}
        </p>

        {/* Author & Meta */}
        <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2.5">
            <img
              src={current.author.avatar}
              alt={current.author.name}
              className="w-8 h-8 rounded-full border border-amber-400/60 object-cover"
            />
            <div>
              <p className="font-semibold text-slate-200">{current.author.name}</p>
              <p className="text-[10px] text-amber-400/90">{current.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{current.date}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{current.readTime}</span>
          </div>

          <div className="flex items-center gap-1.5 text-amber-400 font-medium">
            <Eye className="w-3.5 h-3.5" />
            <span>{current.gallery.length + 1} High-Res Visuals</span>
          </div>
        </div>

        {/* Call To Action & Indicators */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            onClick={() => onSelectArticle(current)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-98 transition-all"
          >
            <span>Read Full Chronicle</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {featuredArticles.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-950/60 hover:bg-slate-900 border border-slate-700/80 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-95"
        aria-label="Previous story"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-950/60 hover:bg-slate-900 border border-slate-700/80 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-95"
        aria-label="Next story"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};
