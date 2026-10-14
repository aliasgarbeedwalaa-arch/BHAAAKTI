import React, { useState } from 'react';
import { Trophy, Medal, Search, Sparkles } from 'lucide-react';
import { WORLD_CUP_CHAMPIONS, ALL_TIME_TITLES } from '../data/tournamentStats';

export const HallOfFame: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedChampion, setSelectedChampion] = useState<string | null>(null);

  const filteredHistory = WORLD_CUP_CHAMPIONS.filter(item => {
    const matchesSearch =
      item.year.toString().includes(filterQuery) ||
      item.host.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.champion.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.runnerUp.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.topScorer.toLowerCase().includes(filterQuery.toLowerCase());

    const matchesChampion = selectedChampion ? item.champion.includes(selectedChampion) : true;

    return matchesSearch && matchesChampion;
  });

  return (
    <div className="my-16 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
            <Trophy className="w-4 h-4" />
            <span>Official FIFA World Cup Roll of Honour</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Chapter 3: Hall of Champions — Who Won Every World Cup from 1930 to 2022?
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            Explore every World Cup tournament from Uruguay 1930 to Qatar 2022. Analyze all-time title counts, legendary scores, and tournament top marksmen.
          </p>
        </div>

        {/* Filter controls */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search year, nation, scorer..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* All-time Titles Leaderboard Cards */}
      <div className="mb-10">
        <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
          <Medal className="w-4 h-4 text-amber-400" />
          <span>All-Time Title Holders</span>
          {selectedChampion && (
            <button
              onClick={() => setSelectedChampion(null)}
              className="text-[11px] text-amber-400 hover:underline ml-2"
            >
              (Clear filter: {selectedChampion})
            </button>
          )}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {ALL_TIME_TITLES.map((t) => {
            const isSelected = selectedChampion === t.country;
            return (
              <button
                key={t.country}
                onClick={() => setSelectedChampion(isSelected ? null : t.country)}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/30 scale-105'
                    : 'bg-slate-950/70 hover:bg-slate-950 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="text-2xl mb-1">{t.flag}</div>
                <div className="font-heading font-black text-xl text-white">
                  {t.titles}★
                </div>
                <div className="text-xs font-bold text-slate-200 truncate mt-0.5">
                  {t.country}
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                  {t.years.split(',')[0]}...
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tournament History Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[11px] font-bold border-b border-slate-800">
            <tr>
              <th className="py-3.5 px-4">Year & Host</th>
              <th className="py-3.5 px-4">Champion</th>
              <th className="py-3.5 px-4 text-center">Final Score</th>
              <th className="py-3.5 px-4">Runner-up</th>
              <th className="py-3.5 px-4">Golden Boot Top Scorer</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
            {filteredHistory.map((row) => (
              <tr key={row.year} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                  <span className="text-amber-400 mr-2">{row.year}</span>
                  <span className="text-slate-300">{row.host}</span>
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 font-bold text-amber-300">
                    <span>{row.flag}</span>
                    <span>{row.champion}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-center font-mono font-bold text-white whitespace-nowrap">
                  <span className="bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                    {row.score}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                  {row.runnerUp}
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span className="font-medium text-slate-200">{row.topScorer}</span>
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                      {row.topScorerGoals} goals
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
