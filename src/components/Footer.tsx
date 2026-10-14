import React, { useState } from 'react';
import { Trophy, Mail, Check, ShieldCheck, Heart } from 'lucide-react';
import { ArticleCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ArticleCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="mt-20 bg-slate-950 border-t border-slate-800 text-slate-400">
      {/* Newsletter Dispatch Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800/80">
        <div className="relative rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/5 border border-amber-500/20 p-8 sm:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Matchday Dispatch
            </span>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mt-3">
              Receive The World Cup Chronicles & 2026 Dispatches
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Deep tactical essays, rare visual archives, stadium engineering dossiers, and road-to-2026 scouting analysis delivered directly to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full sm:w-72 bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Subscribed!</span>
                </>
              ) : (
                <span>Join 45,000+ Readers</span>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md">
                <Trophy className="w-5 h-5 text-slate-950" />
              </div>
              <span className="font-heading font-extrabold text-2xl text-white">
                COPA<span className="text-amber-400">GLOBE</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              CopaGlobe is an independent visual journal celebrating the poetry, tactical evolution, human drama, and cultural majesty of the FIFA World Cup across 10 in-depth articles.
            </p>
            {/* Vercel Deployment Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Vercel Ready Deployment • GitHub CI/CD Compatible • SPA Architecture</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white mb-4">
              Explore Chronicles
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('Iconic Finals')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Iconic Finals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Legendary Icons')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Legendary Icons
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Tactics & Evolution')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Tactics & Evolution
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Underdog Miracles')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Underdog Miracles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Stadiums & Venues')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Stadiums & Venues
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Future of Football')}
                  className="hover:text-amber-400 transition-colors"
                >
                  North America 2026 Preview
                </button>
              </li>
            </ul>
          </div>

          {/* Deployment & Environmental Config */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white mb-4">
              Vercel Deployment Specs
            </h4>
            <div className="text-[11px] space-y-2 text-slate-400">
              <p>• Output Directory: <code className="text-amber-400">dist</code></p>
              <p>• Build Command: <code className="text-amber-400">vite build</code></p>
              <p>• Dev Command: <code className="text-amber-400">vite</code></p>
              <p>• Rewrites: <code className="text-amber-400">vercel.json (SPA)</code></p>
              <p>• Env Prefix: <code className="text-amber-400">VITE_*</code></p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} CopaGlobe Chronicles. Independent football journalism.</p>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Crafted for football purists with passion</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
