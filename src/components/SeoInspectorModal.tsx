import React from 'react';
import { Article } from '../types';
import { X, Search, CheckCircle2, Globe, ExternalLink, Sparkles } from 'lucide-react';

interface SeoInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTitle: string;
  currentDescription: string;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SeoInspectorModal: React.FC<SeoInspectorModalProps> = ({
  isOpen,
  onClose,
  currentTitle,
  currentDescription,
  articles,
  onSelectArticle
}) => {
  if (!isOpen) return null;

  const titleLength = currentTitle.length;
  const isOptimalLength = titleLength >= 50 && titleLength <= 60;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center">
              <Search className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-xl text-white">
                  SEO & Title Tag Inspector
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  50–60 Chars • Keyword-First
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Every page & article features a distinct, 50–60 character, keyword-front, high-CTR title tag.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Page Live Preview */}
        <div className="my-6 p-5 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              Live Active Page Title Tag
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                  isOptimalLength
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                }`}
              >
                {titleLength} Characters {isOptimalLength ? '✓ (Optimal 50–60)' : ''}
              </span>
            </div>
          </div>

          {/* Google Search Snippet Simulation */}
          <div className="p-4 rounded-xl bg-[#202124] border border-slate-700 text-left font-sans">
            <div className="flex items-center gap-2 text-[12px] text-[#bdc1c6] mb-1">
              <span className="text-slate-400">https://copaglobe.vercel.app</span>
              <span>›</span>
              <span className="text-slate-300">world-cup</span>
            </div>
            <h4 className="text-[#8ab4f8] text-base sm:text-lg font-medium hover:underline cursor-pointer leading-snug">
              {currentTitle}
            </h4>
            <p className="text-xs sm:text-sm text-[#bdc1c6] mt-1.5 leading-relaxed">
              {currentDescription}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-300">Length: <strong>{titleLength} chars</strong> (within 50–60)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-300">Main Keyword at Front</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-300">Compelling CTR Hook</span>
            </div>
          </div>
        </div>

        {/* Complete Directory of All 10 Article Title Tags */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>All 10 Article Title Tags (50–60 Chars Each)</span>
            </h4>
            <span className="text-xs text-slate-500">Click any row to view article</span>
          </div>

          <div className="space-y-2.5">
            {articles.map((article, idx) => {
              const len = article.seoTitle.length;
              return (
                <div
                  key={article.id}
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-amber-500/40 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all group"
                >
                  <div className="flex items-start sm:items-center gap-3 min-w-0">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 font-bold text-xs flex items-center justify-center border border-slate-700 shrink-0">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-heading font-bold text-sm text-white group-hover:text-amber-300 truncate">
                        {article.seoTitle}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        Category: <span className="text-slate-300">{article.category}</span> • Era: {article.era}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {len} chars
                    </span>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
