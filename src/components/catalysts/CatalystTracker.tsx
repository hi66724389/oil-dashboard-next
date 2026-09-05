'use client';

import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Search,
  Download,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  Zap,
} from 'lucide-react';
import { getImpactColor } from '@/lib/formatters';
import { EconomicCatalyst } from '@/types/oil';
import { useLanguage } from '@/context/LanguageContext';

interface CatalystTrackerProps {
  catalysts: EconomicCatalyst[];
  onSelectCatalyst?: (catalyst: EconomicCatalyst) => void;
}

export const CatalystTracker: React.FC<CatalystTrackerProps> = ({
  catalysts,
}) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatusTab, setSelectedStatusTab] = useState<'ALL' | 'UPCOMING' | 'RELEASED' | 'CRITICAL'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedImpact, setSelectedImpact] = useState<string>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(catalysts[0]?.id || null);

  // Filter logic
  const filteredCatalysts = useMemo(() => {
    return catalysts.filter((item) => {
      // Search query
      if (
        searchQuery &&
        !item.eventName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.country.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.rationale.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Status tab
      if (selectedStatusTab === 'UPCOMING' && item.status !== 'Upcoming') return false;
      if (selectedStatusTab === 'RELEASED' && item.status !== 'Released') return false;
      if (selectedStatusTab === 'CRITICAL' && item.impact !== 'Critical') return false;

      // Category filter
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;

      // Region filter
      if (selectedRegion !== 'ALL' && item.country !== selectedRegion) return false;

      // Impact filter
      if (selectedImpact !== 'ALL' && item.impact !== selectedImpact) return false;

      return true;
    });
  }, [catalysts, searchQuery, selectedStatusTab, selectedCategory, selectedRegion, selectedImpact]);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      t.colCatalyst,
      t.colCategory,
      t.colDateTime,
      t.colPrev,
      t.colForecast,
      t.colActual,
      t.colSurprise,
      t.colImplication,
      t.colImpact,
    ];
    const rows = filteredCatalysts.map((c) => [
      `"${c.eventName}"`,
      `"${c.category}"`,
      `"${c.dateTime}"`,
      `"${c.previous}"`,
      `"${c.forecast}"`,
      `"${c.actual || 'N/A'}"`,
      `"${c.surpriseDelta || 'N/A'}"`,
      `"${c.implication}"`,
      `"${c.impact}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `petropulse_macro_catalysts_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCountryFlag = (code: string) => {
    switch (code) {
      case 'US':
        return '🇺🇸';
      case 'OPEC':
        return '🌐';
      case 'CN':
        return '🇨🇳';
      case 'IEA':
        return '🏛️';
      case 'ME':
        return '⚓';
      case 'SA':
        return '🇸🇦';
      default:
        return '🌍';
    }
  };

  const getLocalizedCategoryName = (cat: string) => {
    switch (cat) {
      case 'Inventory':
        return t.catInventory;
      case 'OPEC':
        return t.catOPEC;
      case 'Monetary':
        return t.catMonetary;
      case 'Trade':
        return t.catTrade;
      case 'Geopolitics':
        return t.catGeopolitics;
      case 'Report':
        return t.catReport;
      default:
        return cat;
    }
  };

  const getLocalizedImplication = (impl: string) => {
    if (impl === 'Bullish') return t.implicationBullish;
    if (impl === 'Bearish') return t.implicationBearish;
    return t.implicationNeutral;
  };

  const getLocalizedImpact = (imp: string) => {
    if (imp === 'Critical') return t.criticalImpact;
    if (imp === 'High') return t.highImpact;
    if (imp === 'Medium') return t.mediumImpact;
    return t.lowImpact;
  };

  return (
    <div className="rounded-xl border border-slate-800/90 bg-slate-900/80 p-3.5 sm:p-4 shadow-xl">
      {/* Table Header & Controls */}
      <div className="flex flex-col gap-3 border-b border-slate-800/80 pb-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
              <Calendar className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-bold tracking-tight text-white sm:text-base">
              {t.catalystRadarTitle}
            </h2>
          </div>
          <p className="text-xs text-slate-400">{t.catalystRadarSubtitle}</p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-1.5 text-xs text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-slate-400" />
            <span>{t.exportCSV}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-4 flex flex-col gap-3 border-b border-slate-800/60 pb-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Status Tabs */}
        <div className="flex items-center space-x-1 rounded-lg border border-slate-800 bg-slate-950/80 p-1 text-xs">
          {[
            { id: 'ALL', label: t.allCatalysts, count: catalysts.length },
            { id: 'UPCOMING', label: t.upcoming, count: catalysts.filter((c) => c.status === 'Upcoming').length },
            { id: 'RELEASED', label: t.released, count: catalysts.filter((c) => c.status === 'Released').length },
            { id: 'CRITICAL', label: t.criticalOnly, count: catalysts.filter((c) => c.impact === 'Critical').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatusTab(tab.id as any)}
              className={`flex items-center space-x-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                selectedStatusTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[9px] ${
                  selectedStatusTab === tab.id ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Dropdown Filters & Search */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative min-w-[200px] flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchCatalystsPlaceholder}
              className="w-full rounded-lg border border-slate-800 bg-slate-950/90 py-1.5 pl-8 pr-3 text-xs text-white placeholder-slate-500 focus:border-amber-500/80 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
            />
          </div>

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-950/90 px-2.5 py-1.5 text-xs text-slate-300 focus:border-amber-500/80 focus:outline-none"
          >
            <option value="ALL">{t.allCategories}</option>
            <option value="Inventory">{t.catInventory}</option>
            <option value="OPEC">{t.catOPEC}</option>
            <option value="Monetary">{t.catMonetary}</option>
            <option value="Trade">{t.catTrade}</option>
            <option value="Geopolitics">{t.catGeopolitics}</option>
            <option value="Report">{t.catReport}</option>
          </select>

          {/* Impact */}
          <select
            value={selectedImpact}
            onChange={(e) => setSelectedImpact(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-950/90 px-2.5 py-1.5 text-xs text-slate-300 focus:border-amber-500/80 focus:outline-none"
          >
            <option value="ALL">{t.allImpacts}</option>
            <option value="Critical">{t.criticalImpact}</option>
            <option value="High">{t.highImpact}</option>
            <option value="Medium">{t.mediumImpact}</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-semibold text-slate-400">
            <tr>
              <th className="py-2.5 pl-3 pr-2">{t.colCatalyst}</th>
              <th className="px-2 py-2.5">{t.colCategory}</th>
              <th className="px-2 py-2.5">{t.colDateTime}</th>
              <th className="px-2 py-2.5 text-right">{t.colPrev}</th>
              <th className="px-2 py-2.5 text-right">{t.colForecast}</th>
              <th className="px-2 py-2.5 text-right">{t.colActual}</th>
              <th className="px-2 py-2.5 text-right">{t.colSurprise}</th>
              <th className="px-2 py-2.5 text-center">{t.colImplication}</th>
              <th className="px-2 py-2.5 text-center">{t.colImpact}</th>
              <th className="py-2.5 pl-2 pr-3 text-right">{t.colDetails}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredCatalysts.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-8 text-center text-slate-500">
                  {t.noCatalystsFound}
                </td>
              </tr>
            ) : (
              filteredCatalysts.map((catalyst) => {
                const isExpanded = expandedId === catalyst.id;
                const impactStyles = getImpactColor(catalyst.impact);
                const isBullish = catalyst.implication === 'Bullish';
                const isBearish = catalyst.implication === 'Bearish';

                return (
                  <React.Fragment key={catalyst.id}>
                    <tr
                      onClick={() => setExpandedId(isExpanded ? null : catalyst.id)}
                      className={`cursor-pointer transition-colors ${
                        isExpanded
                          ? 'bg-slate-800/50 text-white'
                          : 'hover:bg-slate-850 hover:bg-slate-800/30 text-slate-300'
                      }`}
                    >
                      {/* Event Name */}
                      <td className="py-3 pl-3 pr-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-base" title={catalyst.country}>
                            {getCountryFlag(catalyst.countryCode)}
                          </span>
                          <div>
                            <div className="font-semibold text-white hover:text-amber-400 transition-colors">
                              {catalyst.eventName}
                            </div>
                            <div className="text-[10px] text-slate-500">{catalyst.country}</div>
                          </div>
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="px-2 py-3 whitespace-nowrap">
                        <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-300 border border-slate-700/50">
                          {getLocalizedCategoryName(catalyst.category)}
                        </span>
                      </td>

                      {/* Date & Time */}
                      <td className="px-2 py-3 whitespace-nowrap">
                        <div className="font-mono text-[11px] text-slate-200">{catalyst.dateTime}</div>
                        <div
                          className={`text-[10px] font-medium ${
                            catalyst.status === 'Released'
                              ? 'text-emerald-400'
                              : 'text-amber-400'
                          }`}
                        >
                          {catalyst.timeBadge}
                        </div>
                      </td>

                      {/* Previous */}
                      <td className="px-2 py-3 text-right font-mono tabular-nums text-slate-400">
                        {catalyst.previous}
                      </td>

                      {/* Forecast */}
                      <td className="px-2 py-3 text-right font-mono tabular-nums text-amber-300/90 font-medium">
                        {catalyst.forecast}
                      </td>

                      {/* Actual */}
                      <td className="px-2 py-3 text-right font-mono tabular-nums font-bold">
                        {catalyst.actual ? (
                          <span className="text-white bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700">
                            {catalyst.actual}
                          </span>
                        ) : (
                          <span className="text-slate-600">{t.pending}</span>
                        )}
                      </td>

                      {/* Surprise Delta */}
                      <td className="px-2 py-3 text-right font-mono tabular-nums">
                        {catalyst.surpriseDelta ? (
                          <span
                            className={`font-semibold ${
                              catalyst.surpriseDirection === 'positive_for_oil'
                                ? 'text-emerald-400'
                                : 'text-rose-400'
                            }`}
                          >
                            {catalyst.surpriseDelta}
                          </span>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>

                      {/* Market Implication */}
                      <td className="px-2 py-3 text-center whitespace-nowrap">
                        <span
                          className={`inline-flex items-center space-x-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            isBullish
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : isBearish
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {isBullish && <TrendingUp className="h-2.5 w-2.5" />}
                          {isBearish && <TrendingDown className="h-2.5 w-2.5" />}
                          <span>{getLocalizedImplication(catalyst.implication)}</span>
                        </span>
                      </td>

                      {/* Impact Level */}
                      <td className="px-2 py-3 text-center whitespace-nowrap">
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${impactStyles.badge}`}
                        >
                          {getLocalizedImpact(catalyst.impact)}
                        </span>
                      </td>

                      {/* Expand Action */}
                      <td className="py-3 pl-2 pr-3 text-right">
                        <button className="text-slate-500 hover:text-white transition-colors">
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-amber-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                      </td>
                    </tr>

                    {/* Expanded Detail Drawer */}
                    {isExpanded && (
                      <tr className="bg-slate-950/80">
                        <td colSpan={10} className="p-4 border-b border-slate-800">
                          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                            {/* Left: Catalyst Rationale & Market Transmission */}
                            <div className="lg:col-span-7 space-y-2">
                              <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                                <Zap className="h-3.5 w-3.5" />
                                <span>{t.transmissionTitle}</span>
                              </div>
                              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                                {catalyst.rationale}
                              </p>

                              <div className="flex items-center space-x-4 pt-1 text-[11px] text-slate-400">
                                <div>
                                  {t.macroRelevanceScore}{' '}
                                  <span className="font-mono font-bold text-emerald-400">
                                    {catalyst.relevanceScore}/100
                                  </span>
                                </div>
                                <div>•</div>
                                <div>
                                  {t.dataProvider}{' '}
                                  <span className="text-slate-300">
                                    {catalyst.category === 'Inventory'
                                      ? 'US Department of Energy (DOE/EIA)'
                                      : 'Official Regulatory Agency'}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Right: Historical Reactions / Consensus accuracy */}
                            <div className="lg:col-span-5 space-y-2">
                              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                                {t.historicalReactionsTitle}
                              </div>
                              {catalyst.historicalReactions && catalyst.historicalReactions.length > 0 ? (
                                <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900/80">
                                  <table className="w-full text-left text-[11px]">
                                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                                      <tr>
                                        <th className="p-1.5 pl-2.5">{t.histDate}</th>
                                        <th className="p-1.5 text-right">{t.histActual}</th>
                                        <th className="p-1.5 text-right">{t.histSurprise}</th>
                                        <th className="p-1.5 pr-2.5 text-right">{t.histWti1h}</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/60 font-mono">
                                      {catalyst.historicalReactions.map((h, idx) => (
                                        <tr key={idx} className="text-slate-300">
                                          <td className="p-1.5 pl-2.5 text-slate-400">{h.eventDate}</td>
                                          <td className="p-1.5 text-right">{h.actual}</td>
                                          <td className="p-1.5 text-right text-emerald-400 font-semibold">{h.surprise}</td>
                                          <td className="p-1.5 pr-2.5 text-right font-bold text-emerald-400">
                                            {h.priceMove1h}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-3 text-xs text-slate-500">
                                  {t.upcomingNote}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
