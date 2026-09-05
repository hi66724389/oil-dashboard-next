'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Building2,
  Quote,
  Target,
  FileText,
  Filter,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { StreetConsensusData, InstitutionalResearchQuote } from '@/types/oil';
import { useLanguage } from '@/context/LanguageContext';

interface InstitutionalResearchPanelProps {
  consensusData: StreetConsensusData;
}

export const InstitutionalResearchPanel: React.FC<InstitutionalResearchPanelProps> = ({
  consensusData,
}) => {
  const { t } = useLanguage();
  const [selectedInstitution, setSelectedInstitution] = useState<string>('ALL');
  const [selectedStance, setSelectedStance] = useState<string>('ALL');

  const filteredQuotes = consensusData.quotes.filter((q) => {
    if (selectedInstitution !== 'ALL' && q.institution !== selectedInstitution) return false;
    if (selectedStance !== 'ALL' && q.stance !== selectedStance) return false;
    return true;
  });

  const getInstitutionLogoColor = (inst: string) => {
    switch (inst) {
      case 'Goldman Sachs':
        return 'bg-blue-600 text-white';
      case 'Morgan Stanley':
        return 'bg-sky-600 text-white';
      case 'Vitol':
        return 'bg-amber-600 text-white';
      case 'Trafigura':
        return 'bg-emerald-600 text-white';
      case 'EIA STEO':
        return 'bg-indigo-600 text-white';
      default:
        return 'bg-slate-700 text-white';
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Banner & Wall Street Consensus Meter */}
      <div className="rounded-xl border border-slate-800/90 bg-slate-900/80 p-4 shadow-xl backdrop-blur-md">
        <div className="flex flex-col gap-3 border-b border-slate-800/80 pb-3.5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                <Building2 className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-bold tracking-wider text-white uppercase sm:text-base">
                {t.researchTitle}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{t.researchSubtitle}</p>
          </div>

          {/* Quick consensus numbers */}
          <div className="flex items-center space-x-3 text-xs font-mono">
            <div className="rounded-lg bg-slate-950 px-3 py-1.5 border border-slate-800">
              <span className="text-slate-400">{t.medianBrentTarget} </span>
              <span className="font-bold text-cyan-400">${consensusData.medianBrent12M.toFixed(2)}/bbl</span>
            </div>
            <div className="rounded-lg bg-slate-950 px-3 py-1.5 border border-slate-800">
              <span className="text-slate-400">{t.medianWtiTarget} </span>
              <span className="font-bold text-amber-400">${consensusData.medianWti12M.toFixed(2)}/bbl</span>
            </div>
          </div>
        </div>

        {/* Street Consensus Skew Meter */}
        <div className="mt-3.5 rounded-lg border border-slate-800 bg-slate-950/60 p-3">
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            <span className="font-bold text-slate-300 uppercase tracking-wider">
              {t.streetConsensusTitle}
            </span>
            <div className="flex items-center space-x-3 text-[11px]">
              <span className="text-emerald-400 font-bold">
                {t.bullishConsensus} {consensusData.bullishPercent}%
              </span>
              <span className="text-amber-400 font-bold">
                {t.neutralConsensus} {consensusData.neutralPercent}%
              </span>
              <span className="text-rose-400 font-bold">
                {t.bearishConsensus} {consensusData.bearishPercent}%
              </span>
            </div>
          </div>

          <div className="flex h-2 w-full overflow-hidden rounded-full bg-slate-800">
            <div className="bg-emerald-500 h-full" style={{ width: `${consensusData.bullishPercent}%` }} />
            <div className="bg-amber-500 h-full" style={{ width: `${consensusData.neutralPercent}%` }} />
            <div className="bg-rose-500 h-full" style={{ width: `${consensusData.bearishPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3 text-xs">
        {/* Institution filter buttons */}
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-0.5">
          {['ALL', 'Goldman Sachs', 'Morgan Stanley', 'Vitol', 'Trafigura', 'EIA STEO'].map((inst) => (
            <button
              key={inst}
              onClick={() => setSelectedInstitution(inst)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedInstitution === inst
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {inst === 'ALL' ? '全部機構 (All Desks)' : inst}
            </button>
          ))}
        </div>

        {/* Stance filter */}
        <div className="flex items-center space-x-1">
          {['ALL', 'Bullish', 'Neutral', 'Bearish'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStance(st)}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                selectedStance === st
                  ? 'bg-slate-800 text-white font-bold'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Research Cards List */}
      <div className="grid grid-cols-1 gap-3.5 2xl:grid-cols-2">
        {filteredQuotes.map((item) => {
          const isBull = item.stance === 'Bullish';
          const isBear = item.stance === 'Bearish';

          return (
            <div
              key={item.id}
              className="rounded-xl border border-slate-800/90 bg-slate-900/80 p-3.5 shadow-xl space-y-3 hover:border-slate-700 transition-colors"
            >
              {/* Header: Institution Badge + Analyst + Target */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2.5">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg font-mono text-xs font-black shadow-md ${getInstitutionLogoColor(
                      item.institution
                    )}`}
                  >
                    {item.logoBadge}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white">{item.institution}</div>
                    <div className="text-[10px] text-slate-400">
                      {item.analyst} • {item.role}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                      isBull
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : isBear
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {item.stance}
                  </span>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">{item.publishDate}</div>
                </div>
              </div>

              {/* Research Title */}
              <h3 className="text-sm font-bold text-amber-300 leading-snug">{item.title}</h3>

              {/* Price Targets Corridor */}
              <div className="grid grid-cols-3 gap-2 rounded-lg bg-slate-950/80 p-2 text-center text-xs font-mono border border-slate-800/60">
                <div>
                  <div className="text-[9px] text-slate-500 uppercase">12M Brent Target</div>
                  <div className="text-sm font-bold text-cyan-400">${item.brentTarget12M.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-500 uppercase">12M WTI Target</div>
                  <div className="text-sm font-bold text-amber-400">${item.wtiTarget12M.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-500 uppercase">Corridor</div>
                  <div className="text-xs font-bold text-slate-300">{item.targetRange}</div>
                </div>
              </div>

              {/* Direct Quote Box */}
              <div className="relative rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-xs text-slate-200 leading-relaxed italic">
                <Quote className="h-4 w-4 text-amber-500/40 absolute -top-2 -left-1" />
                {item.keyQuote}
              </div>

              {/* Bullet points */}
              <div className="space-y-1 text-xs">
                <div className="font-semibold text-slate-400 text-[11px] uppercase tracking-wider">
                  {t.thesisLabel}
                </div>
                <ul className="space-y-1 text-slate-300 text-[11px]">
                  {item.bulletPoints.map((bp, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <span className="mt-1 h-1 w-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Catalyst Watch Tag */}
              <div className="border-t border-slate-800/80 pt-2 flex items-center justify-between text-[10px] text-slate-400">
                <span className="truncate max-w-[280px]">
                  <span className="text-amber-400 font-bold">{t.catalystFocusLabel}</span> {item.catalystFocus}
                </span>
                <span className="text-slate-500 font-mono">{item.supplyDemandThesis}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
