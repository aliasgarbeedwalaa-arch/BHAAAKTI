import React, { useState, useEffect, useMemo } from 'react';
import { WORLD_CUP_ARTICLES } from './data/articles';
import { Article, ArticleCategory, PhotoVisual } from './types';
import { Navbar } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { PhotoLightbox } from './components/PhotoLightbox';
import { HallOfFame } from './components/HallOfFame';
import { WorldCupQuiz } from './components/WorldCupQuiz';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { SeoInspectorModal } from './components/SeoInspectorModal';
import { Footer } from './components/Footer';
import { toggleStadiumAmbience } from './utils/audio';
import { Sparkles, Filter, SlidersHorizontal, Camera } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>('All');
  const [selectedEra, setSelectedEra] = useState<string>('All');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Audio ambience state
  const [isAmbiencePlaying, setIsAmbiencePlaying] = useState(false);

  // Lightbox state
  const [lightboxPhotos, setLightboxPhotos] = useState<PhotoVisual[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Bookmarks state (persistent in localStorage)
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fifa_wc_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Likes state (persistent in localStorage)
  const [likedIds, setLikedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fifa_wc_likes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [likesCountMap, setLikesCountMap] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    WORLD_CUP_ARTICLES.forEach(a => {
      map[a.id] = a.likesCount;
    });
    return map;
  });

  const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);

  // Dynamic Title Tag & Meta Description (50–60 characters, main keyword first, distinct per page, high CTR)
  const { currentTitle, currentDescription } = useMemo(() => {
    if (selectedArticle) {
      return {
        currentTitle: selectedArticle.seoTitle,
        currentDescription: selectedArticle.seoDescription
      };
    }
    if (isBookmarksOpen) {
      return {
        currentTitle: 'Saved World Cup Chronicles: Your Custom Reading List',
        currentDescription: 'Access your bookmarked FIFA World Cup chronicles and reading list for offline analysis and match reviews.'
      };
    }
    if (selectedCategory === 'Iconic Finals') {
      return {
        currentTitle: 'World Cup Final Classics: The 10 Most Dramatic Duels',
        currentDescription: 'Relive the most dramatic World Cup Finals in football history with minute-by-minute tactical analysis and match photography.'
      };
    }
    if (selectedCategory === 'Tactics & Evolution') {
      return {
        currentTitle: 'World Cup Tactics & Evolution: Blueprint of Champions',
        currentDescription: 'From Dutch Total Football and Italian catenaccio to modern pressing: how tactical masterminds conquered the FIFA World Cup.'
      };
    }
    if (selectedCategory === 'Legendary Icons') {
      return {
        currentTitle: 'World Cup Legends: Pelé, Maradona, Zidane & Champions',
        currentDescription: 'Explore the immortal heroes who shaped World Cup history with transcendent goals, saves, and tournament-winning masterclasses.'
      };
    }
    if (selectedCategory === 'Underdog Miracles') {
      return {
        currentTitle: 'World Cup Underdogs: The Greatest Shock Runs in History',
        currentDescription: 'From Morocco 2022 to Germany’s 7-1 demolition of Brazil, discover football’s most shocking upsets and fairytale tournament runs.'
      };
    }
    if (selectedCategory === 'Stadiums & Venues') {
      return {
        currentTitle: 'World Cup Stadiums: 10 Mythic Arenas of Pure Drama',
        currentDescription: 'Step inside the cathedrals of football: from Maracanã and Azteca to Lusail and MetLife Stadium ahead of North America 2026.'
      };
    }
    if (selectedCategory === 'Future of Football') {
      return {
        currentTitle: 'FIFA World Cup 2026: 48 Teams, 3 Hosts & Ultimate Chaos',
        currentDescription: 'The ultimate guide to the 2026 World Cup across USA, Mexico, and Canada. 104 matches, 12 groups, travel logistics, and next-gen stars.'
      };
    }

    // Default Home Page Title Tag (53 characters: Keyword-first, 50-60 chars, high-CTR hook)
    return {
      currentTitle: 'FIFA World Cup Chronicles: 10 Untold Stories & Photos',
      currentDescription: 'Explore our FIFA World Cup blog featuring 10 rich visual chronicles, tactical match analyses, and iconic moments. Dive into football’s greatest stories today!'
    };
  }, [selectedArticle, isBookmarksOpen, selectedCategory]);

  // Sync document title and meta tags dynamically
  useEffect(() => {
    document.title = currentTitle;

    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', currentDescription);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', currentTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', currentDescription);

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', currentTitle);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', currentDescription);
  }, [currentTitle, currentDescription]);

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fifa_wc_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.warn('Could not save bookmarks to storage:', e);
    }
  }, [bookmarkedIds]);

  // Save likes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fifa_wc_likes', JSON.stringify(likedIds));
    } catch (e) {
      console.warn('Could not save likes to storage:', e);
    }
  }, [likedIds]);

  // Handle ambient audio toggle
  const handleToggleAmbience = () => {
    toggleStadiumAmbience((playing) => {
      setIsAmbiencePlaying(playing);
    });
  };

  // Toggle bookmark handler
  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Clear all bookmarks
  const handleClearBookmarks = () => {
    setBookmarkedIds([]);
  };

  // Toggle like handler
  const handleToggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isLiked = likedIds.includes(id);
    if (isLiked) {
      setLikedIds(prev => prev.filter(item => item !== id));
      setLikesCountMap(prev => ({ ...prev, [id]: (prev[id] || 0) - 1 }));
    } else {
      setLikedIds(prev => [...prev, id]);
      setLikesCountMap(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    }
  };

  // Open Lightbox
  const handleOpenPhotoLightbox = (photos: PhotoVisual[], initialIndex: number) => {
    setLightboxPhotos(photos);
    setLightboxIndex(initialIndex);
    setIsLightboxOpen(true);
  };

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return WORLD_CUP_ARTICLES.filter(article => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;

      // Era filter
      const matchesEra =
        selectedEra === 'All' || article.era === selectedEra;

      // Search query filter
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.subtitle.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.author.name.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query)) ||
        article.keyFacts.some(fact => fact.toLowerCase().includes(query));

      return matchesCategory && matchesEra && matchesSearch;
    });
  }, [searchQuery, selectedCategory, selectedEra]);

  // Bookmarked articles list
  const bookmarkedArticles = useMemo(() => {
    return WORLD_CUP_ARTICLES.filter(a => bookmarkedIds.includes(a.id));
  }, [bookmarkedIds]);

  // Curated spotlight photo highlights across all articles
  const photoHighlights: PhotoVisual[] = useMemo(() => {
    return [
      {
        url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
        caption: 'Lusail Stadium illuminated under the desert night during the 2022 Final.',
        credit: 'FIFA World Cup Visual Archive'
      },
      {
        url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80',
        caption: 'High noon intensity on the pitch of Estadio Azteca, Mexico.',
        credit: 'Classic Football Photography'
      },
      {
        url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80',
        caption: 'Architectural sweep of an 80,000-seat international cathedral.',
        credit: 'Global Arena Review'
      },
      {
        url: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1200&q=80',
        caption: 'The center circle stage ahead of world championship kickoff.',
        credit: 'World Football Lens'
      }
    ];
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Navigation Bar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isAmbiencePlaying={isAmbiencePlaying}
        onToggleAmbience={handleToggleAmbience}
        bookmarkedCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenSeoInspector={() => setIsSeoModalOpen(true)}
        onSelectArticleById={(id) => {
          const found = WORLD_CUP_ARTICLES.find(a => a.id === id);
          if (found) setSelectedArticle(found);
        }}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Hero Carousel (Shown when browsing All and no active search) */}
        {selectedCategory === 'All' && !searchQuery && (
          <HeroCarousel
            articles={WORLD_CUP_ARTICLES}
            onSelectArticle={(art) => setSelectedArticle(art)}
          />
        )}

        {/* Filters and Header Bar */}
        <div className="mt-8 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <h2 className="font-heading font-black text-xl sm:text-2xl text-white">
                {searchQuery ? `Search Results for "${searchQuery}"` : `${selectedCategory} Chronicles`}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Showing {filteredArticles.length} of {WORLD_CUP_ARTICLES.length} illustrated World Cup stories
            </p>
          </div>

          {/* Era Filter Selector */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-400 font-medium">Filter Era:</span>
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
              {['All', '1970s', '1980s-90s', '2010s', '2020s & 2026'].map((era) => (
                <button
                  key={era}
                  onClick={() => setSelectedEra(era)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    selectedEra === era
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {era}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Empty Search State */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 my-8">
            <Filter className="w-12 h-12 mx-auto text-slate-600 mb-3" />
            <h3 className="font-heading font-bold text-lg text-white">No articles match your query</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto">
              Try searching for "Messi", "Maradona", "Cruyff", "Morocco", "7-1", or clear the era filter.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedEra('All'); }}
              className="mt-5 px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Articles Grid (10 Articles with Visual Badges) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onSelect={(art) => setSelectedArticle(art)}
                isBookmarked={bookmarkedIds.includes(article.id)}
                onToggleBookmark={handleToggleBookmark}
                isLiked={likedIds.includes(article.id)}
                likesCount={likesCountMap[article.id] ?? article.likesCount}
                onToggleLike={handleToggleLike}
              />
            ))}
          </div>
        )}

        {/* Visual Spotlight Strip */}
        <section className="my-16 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="font-heading font-black text-xl text-white">
                  Matchday Visual Spotlight
                </h3>
                <p className="text-xs text-slate-400">
                  Click any image to launch the high-resolution lightbox viewer
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Curated Lens
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photoHighlights.map((photo, idx) => (
              <div
                key={idx}
                onClick={() => handleOpenPhotoLightbox(photoHighlights, idx)}
                className="group relative rounded-2xl overflow-hidden aspect-video bg-slate-950 border border-slate-800 cursor-pointer shadow-lg"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                  <p className="text-xs text-white font-medium line-clamp-1">{photo.caption}</p>
                  <span className="text-[10px] text-amber-400 mt-0.5">Click to view 4K</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hall of Fame: World Cup Champions & Records */}
        <HallOfFame />

        {/* Interactive World Cup Quiz */}
        <WorldCupQuiz />
      </main>

      {/* Footer */}
      <Footer onSelectCategory={(cat) => { setSelectedCategory(cat); setSearchQuery(''); }} />

      {/* Modals & Overlays */}

      {/* Article Detail Reader Modal */}
      {selectedArticle && (
        <ArticleDetailModal
          article={selectedArticle}
          articles={WORLD_CUP_ARTICLES}
          onClose={() => setSelectedArticle(null)}
          onSelectArticle={(art) => setSelectedArticle(art)}
          isBookmarked={bookmarkedIds.includes(selectedArticle.id)}
          onToggleBookmark={handleToggleBookmark}
          isLiked={likedIds.includes(selectedArticle.id)}
          likesCount={likesCountMap[selectedArticle.id] ?? selectedArticle.likesCount}
          onToggleLike={handleToggleLike}
          onOpenPhotoLightbox={handleOpenPhotoLightbox}
        />
      )}

      {/* Fullscreen Photo Lightbox */}
      <PhotoLightbox
        photos={lightboxPhotos}
        activeIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

      {/* Bookmarks Slide-out Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedArticles={bookmarkedArticles}
        onSelectArticle={(art) => setSelectedArticle(art)}
        onRemoveBookmark={(id, e) => handleToggleBookmark(id, e)}
        onClearAll={handleClearBookmarks}
      />

      {/* SEO Title Tag Inspector Modal */}
      <SeoInspectorModal
        isOpen={isSeoModalOpen}
        onClose={() => setIsSeoModalOpen(false)}
        currentTitle={currentTitle}
        currentDescription={currentDescription}
        articles={WORLD_CUP_ARTICLES}
        onSelectArticle={(art) => setSelectedArticle(art)}
      />
    </div>
  );
}
