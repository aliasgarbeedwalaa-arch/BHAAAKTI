import React, { useState } from 'react';
import { Trophy, Search, Volume2, VolumeX, Bookmark, Sparkles, X } from 'lucide-react';
import { ArticleCategory } from '../types';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: ArticleCategory;
  setSelectedCategory: (cat: ArticleCategory) => void;
  isAmbiencePlaying: boolean;
  onToggleAmbience: () => void;
  bookmarkedCount: number;
  onOpenBookmarks: () => void;
  onSelectArticleById: (id: string) => void;
  onOpenSeoInspector: () => void;
}

const CATEGORIES: ArticleCategory[] = [
  'All',
  'Iconic Finals',
  'Tactics & Evolution',
  'Legendary Icons',
  'Underdog Miracles',
  'Stadiums & Venues',
  'Future of Football'
];

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  isAmbiencePlaying,
  onToggleAmbience,
  bookmarkedCount,
  onOpenBookmarks,
  onOpenSeoInspector,
}) => {
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Calculate days until World Cup 2026 (Kickoff June 11, 2026)
  // Current metadata date: Oct 2026 (let's show tournament season or celebratory countdown)
  const daysUntilOrStatus = "Road to North America 2026 • 48 Nations";

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 text-slate-950 px-4 py-1.5 text-xs font-semibold tracking-wider flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Sparkles className="w-3.5 h-3.5 text-slate-950" />
          <span>{daysUntilOrStatus}</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] font-medium text-slate-900">
          <span>Estadio Azteca • MetLife Stadium • BC Place</span>
          <span className="bg-slate-950/15 px-2 py-0.5 rounded text-[10px]">104 Matches</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <div 
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Trophy className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-2xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  COPA<span className="text-amber-400">GLOBE</span>
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  FIFA WC
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wider uppercase font-medium">
                The World Cup Chronicles & Visual Archive
              </p>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search players, iconic finals, stadiums, tactics..."
                className="w-full bg-slate-900/80 border border-slate-700/80 focus:border-amber-400 rounded-full pl-10 pr-10 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowSearchModal(!showSearchModal)}
              className="md:hidden p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Stadium Ambience Sound Toggle */}
            <button
              onClick={onToggleAmbience}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isAmbiencePlaying
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-400 animate-pulse'
                  : 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300 hover:text-white'
              }`}
              title="Toggle realistic stadium crowd cheer sound synthesis"
            >
              {isAmbiencePlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">
                {isAmbiencePlaying ? 'Crowd Roar Active' : 'Stadium Sound'}
              </span>
            </button>

            {/* Saved Bookmarks */}
            <button
              onClick={onOpenBookmarks}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all"
            >
              <Bookmark className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Saved</span>
              {bookmarkedCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                  {bookmarkedCount}
                </span>
              )}
            </button>

            {/* Title Tags & SEO Inspector */}
            <button
              onClick={onOpenSeoInspector}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-all"
              title="Inspect page title tags (50–60 chars, keyword-first, unique per page)"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Title Tags (50–60 chars)</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        {showSearchModal && (
          <div className="md:hidden py-3 border-t border-slate-800">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 10 articles, legends, venues..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-10 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Categories Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar border-t border-slate-900/60">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-100 hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
