export type ArticleCategory =
  | 'All'
  | 'Iconic Finals'
  | 'Tactics & Evolution'
  | 'Legendary Icons'
  | 'Underdog Miracles'
  | 'Stadiums & Venues'
  | 'Future of Football';

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

export interface MatchStat {
  label: string;
  teamA?: string;
  teamB?: string;
  valueA?: string | number;
  valueB?: string | number;
  metric?: string;
}

export interface TacticalPoint {
  title: string;
  description: string;
}

export interface PhotoVisual {
  url: string;
  caption: string;
  credit?: string;
  aspect?: 'landscape' | 'portrait' | 'wide';
}

export interface ArticleComment {
  id: string;
  author: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: Exclude<ArticleCategory, 'All'>;
  era: '1970s' | '1980s-90s' | '2010s' | '2020s & 2026';
  coverImage: string;
  imageAlt: string;
  gallery: PhotoVisual[];
  date: string;
  readTime: string;
  featured?: boolean;
  author: Author;
  pullQuote: string;
  pullQuoteAuthor: string;
  contentSections: {
    heading: string;
    body: string[];
    image?: PhotoVisual;
    stats?: MatchStat[];
    tactics?: TacticalPoint[];
  }[];
  keyFacts: string[];
  audioNarrativeTitle?: string;
  likesCount: number;
  tags: string[];
}

export interface TrophyWinner {
  year: number;
  host: string;
  champion: string;
  runnerUp: string;
  score: string;
  topScorer: string;
  topScorerGoals: number;
  flag: string;
}
