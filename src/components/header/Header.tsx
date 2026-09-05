'use client';

import React, { useState, useEffect } from 'react';
import {
  Flame,
  Radio,
  Layers,
  Droplets,
  Anchor,
  Building2,
  TrendingUp,
  Sliders,
  Globe,
  Download,
  Info,
  Activity,
  Terminal,
  Clock,
  Zap,
} from 'lucide-react';
import { formatCurrency, formatPercent } from '@/lib/formatters';
import { TickerData } from '@/types/oil';
import { useLanguage } from '@/context/LanguageContext';

interface HeaderProps {
  tickers: TickerData[];
  sentimentScore: number;
  sentimentRating: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenMethodology: () => void;
  onExportData: () => void;
  selectedCurrency?: string;
  setSelectedCurrency?: (curr: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  tickers,
  sentimentScore,
  sentimentRating,
  activeTab,
  setActiveTab,
  onOpenMethodology,
  onExportData,
  selectedCurrency = 'USD',
  setSelectedCurrency,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [timeStr, setTimeStr] = useState<string>('');
  const [refreshCountdown, setRefreshCountdown] = useState<number>(15);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      if (language === 'zh-TW') {
        const dateStr = now.toLocaleDateString('zh-TW', {
          timeZone: 'UTC',
          month: '2-digit',
          day: '2-digit',
          weekday: 'short',
        });
        const timeVal = now.toLocaleTimeString('zh-TW', {
          timeZone: 'UTC',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        setTimeStr(`${dateStr} ${timeVal} UTC`);
      } else {
        setTimeStr(now.toUTCString().replace('GMT', 'UTC'));
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [language]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshCountdown((prev) => (prev <= 1 ? 15 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const wti = tickers.find((t) => t.symbol === 'CL1!');
  const brent = tickers.find((t) => t.symbol === 'CO1!');

  const getLocalizedSentimentRating = (rating: string) => {
    const r = rating.toLowerCase();
    if (r.includes('extreme bullish') || r.includes('強烈看多')) return t.extremeBullish;
    if (r.includes('bullish') || r.includes('看多')) return t.bullish;
    if (r.includes('extreme bearish') || r.includes('強烈看空')) return t.extremeBearish;
    if (r.includes('bearish') || r.includes('看空')) return t.bearish;
    return t.neutral;
  };

  const [commandInput, setCommandInput] = useState<string>('');
  const [commandHint, setCommandHint] = useState<string>('');

  const handleCommandKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const val = commandInput.trim().toUpperCase();
      if (val.includes('CL') || val.includes('WTI') || val.includes('OVERVIEW') || val === 'F1') {
        setActiveTab('overview');
        setCommandHint('SWITCHED: F1 OVERVIEW DESK');
      } else if (val.includes('CRACK') || val.includes('REFIN') || val === 'F3') {
        setActiveTab('refinery');
        setCommandHint('SWITCHED: F3 CRACK SPREADS');
      } else if (val.includes('RES') || val.includes('RESEARCH') || val.includes('INST') || val === 'F5') {
        setActiveTab('research');
        setCommandHint('SWITCHED: F5 RESEARCH DIGEST');
      } else if (val.includes('CAT') || val.includes('CATALYST') || val === 'F6') {
        setActiveTab('catalysts');
        setCommandHint('SWITCHED: F6 CATALYSTS');
      } else if (val.includes('NEWS') || val.includes('WIRE') || val === 'F7') {
        setActiveTab('news');
        setCommandHint('SWITCHED: F7 LIVE WIRE');
      } else if (val.includes('SIM') || val.includes('SCEN') || val === 'F8') {
        setActiveTab('simulator');
        setCommandHint('SWITCHED: F8 SIMULATOR');
      } else if (val.includes('OPEC') || val.includes('QUOTA') || val.includes('RADAR') || val === 'F9') {
        setActiveTab('analytics');
        setCommandHint('SWITCHED: F9 OPEC & RADAR');
      } else if (val.includes('METHOD') || val.includes('HELP')) {
        onOpenMethodology();
        setCommandHint('OPENED METHODOLOGY');
      } else if (val.includes('EXP') || val.includes('JSON')) {
        onExportData();
        setCommandHint('EXPORTED DATA REPORT');
      } else {
        setCommandHint(`CMD '${val}' EXEC`);
      }
      setTimeout(() => setCommandHint(''), 3000);
      setCommandInput('');
    }
  };

  const navTabs: Array<{
    id: string;
    key: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    count?: number;
    pulse?: boolean;
    color: string;
  }> = [
    { id: 'overview', key: 'F1', label: t.tabOverview, icon: Activity, color: 'text-amber-400' },
    { id: 'refinery', key: 'F3', label: t.tabRefinery, icon: Droplets, color: 'text-cyan-400' },
    { id: 'research', key: 'F5', label: t.tabResearch, icon: Building2, color: 'text-emerald-400' },
    { id: 'catalysts', key: 'F6', label: t.tabCatalysts, icon: TrendingUp, count: 11, color: 'text-orange-400' },
    { id: 'news', key: 'F7', label: t.tabNews, icon: Radio, pulse: true, color: 'text-rose-400' },
    { id: 'simulator', key: 'F8', label: t.tabSimulator, icon: Sliders, color: 'text-indigo-400' },
    { id: 'analytics', key: 'F9', label: t.tabAnalytics, icon: Globe, color: 'text-sky-400' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/90 bg-slate-950/95 backdrop-blur-xl">
      {/* 1. Top Bloomberg Micro-Ticker & Telemetry Ribbon */}
      <div className="border-b border-slate-850 bg-black/90 px-3 sm:px-4 py-1 text-[11px] font-mono select-none">
        <div className="mx-auto flex max-w-[1780px] items-center justify-between gap-3">
          {/* Left: Active Live Feed Badge & Market Status */}
          <div className="flex items-center space-x-2 shrink-0">
            <div className="inline-flex h-6 items-center space-x-1.5 rounded border border-emerald-500/40 bg-emerald-950/50 px-2 font-bold text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="tracking-wider uppercase text-[10px]">{t.activeFeed}</span>
            </div>

            <div className="hidden sm:inline-flex h-6 items-center space-x-1 rounded border border-slate-800 bg-slate-900/90 px-2 text-[10px] text-slate-400">
              <Zap className="h-3 w-3 text-amber-400" />
              <span className="tracking-tight font-semibold text-slate-300">CME / ICE LIVE</span>
            </div>
          </div>

          {/* Center: Live Real-Time Ticker Stream */}
          <div className="flex flex-1 items-center space-x-2 overflow-x-auto no-scrollbar py-0.5">
            {tickers.map((item) => {
              const isPos = item.change >= 0;
              return (
                <div
                  key={item.symbol}
                  className="inline-flex items-center space-x-1.5 whitespace-nowrap rounded border border-slate-800/80 bg-slate-900/60 px-2 py-0.5 hover:border-slate-700 transition-colors"
                >
                  <span className="font-bold text-amber-400 text-[10px]">{item.symbol}</span>
                  <span className="text-white font-semibold tabular-nums text-[11px]">
                    {formatCurrency(
                      item.price,
                      item.symbol.includes('RB') || item.symbol.includes('HO') ? 3 : 2
                    )}
                  </span>
                  <span
                    className={`text-[10px] font-bold tabular-nums ${
                      isPos ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {formatPercent(item.changePercent)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right: Telemetry Time & Auto-Sync Badges */}
          <div className="flex items-center space-x-2 shrink-0">
            <div className="hidden lg:inline-flex h-6 items-center space-x-1.5 rounded border border-slate-800 bg-slate-900/90 px-2.5 text-[10px] text-slate-300 tabular-nums">
              <Clock className="h-3 w-3 text-amber-400/80" />
              <span>{timeStr || 'UTC 14:02:15'}</span>
            </div>

            <div className="inline-flex h-6 items-center space-x-1.5 rounded border border-slate-800 bg-slate-900/90 px-2 text-[10px] text-slate-300 tabular-nums">
              <Radio className="h-3 w-3 text-emerald-400 animate-pulse" />
              <span>
                {t.autoSync}: <strong className="text-emerald-400 font-bold">{refreshCountdown}s</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Bloomberg Terminal Command Prompt Bar */}
      <div className="border-b border-slate-800/60 bg-slate-950/80 px-3 sm:px-4 py-1.5">
        <div className="mx-auto flex max-w-[1780px] items-center justify-between gap-3 font-mono">
          {/* Command Prompt Input */}
          <div className="flex items-center space-x-2 flex-1 max-w-xl">
            <div className="flex items-center space-x-1.5 bg-black/80 border border-amber-500/30 rounded px-2 py-0.5 w-full focus-within:border-amber-400 transition-colors shadow-inner">
              <Terminal className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span className="text-[10px] font-bold text-amber-500 select-none">CMD&gt;</span>
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                onKeyDown={handleCommandKeyDown}
                placeholder="CL1 <CMDTY> GO | TYPE 'CRACK', 'OPEC', 'NEWS', 'SIM'..."
                className="bg-transparent text-amber-300 font-mono text-[11px] focus:outline-none w-full placeholder:text-slate-600 uppercase"
              />
              <button
                onClick={() => {
                  const event = { key: 'Enter' } as unknown as React.KeyboardEvent<HTMLInputElement>;
                  handleCommandKeyDown(event);
                }}
                className="text-[9px] bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/40 select-none font-bold uppercase shrink-0"
              >
                &lt;GO&gt;
              </button>
            </div>
            {commandHint && (
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded animate-fadeIn whitespace-nowrap">
                {commandHint}
              </span>
            )}
          </div>

          {/* Fast Command Jump Tags */}
          <div className="hidden md:flex items-center space-x-1.5 text-[10px] select-none">
            <span className="text-slate-500">HOTKEYS:</span>
            {[
              { label: 'CL1 <GO>', tab: 'overview' },
              { label: 'CRACK <GO>', tab: 'refinery' },
              { label: 'OPEC <GO>', tab: 'analytics' },
              { label: 'NEWS <GO>', tab: 'news' },
              { label: 'SIM <GO>', tab: 'simulator' },
            ].map((hk) => (
              <button
                key={hk.label}
                onClick={() => setActiveTab(hk.tab)}
                className={`px-1.5 py-0.5 rounded border text-[9px] font-bold transition-all ${
                  activeTab === hk.tab
                    ? 'border-amber-500/50 bg-amber-500/20 text-amber-300 shadow-sm'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {hk.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Main Bloomberg Navigation Deck (F1 - F9 Keycaps + Desk Utilities) */}
      <div className="mx-auto max-w-[1780px] px-3 sm:px-4 py-2">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
          {/* Left Block: Brand Identity + Fast Spot Reference */}
          <div className="flex items-center justify-between sm:justify-start space-x-3 shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 shadow-md shadow-amber-500/20 border border-amber-400/40">
                <Flame className="h-5 w-5 text-slate-950" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h1 className="text-base sm:text-lg font-black tracking-tight text-white font-mono">
                    PETRO<span className="text-amber-400">PULSE</span>
                  </h1>
                  <span className="rounded border border-amber-500/40 bg-amber-500/10 px-1.5 py-0.2 font-mono text-[9px] font-bold uppercase tracking-wider text-amber-300">
                    {t.terminalBadge}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-mono tracking-wide hidden sm:block">
                  BLOOMBERG-GRADE CRUDE & COMMODITIES INTELLIGENCE
                </p>
              </div>
            </div>

            {/* Fast Spot Quotes Indicator */}
            <div className="flex items-center space-x-1.5 font-mono text-xs">
              <div className="rounded border border-slate-800 bg-slate-900/90 px-2 py-0.5 text-right">
                <span className="text-[9px] text-slate-400 mr-1">WTI</span>
                <span className="font-bold text-amber-400 tabular-nums">
                  ${wti ? wti.price.toFixed(2) : '76.45'}
                </span>
              </div>
              <div className="rounded border border-slate-800 bg-slate-900/90 px-2 py-0.5 text-right">
                <span className="text-[9px] text-slate-400 mr-1">Brent</span>
                <span className="font-bold text-cyan-400 tabular-nums">
                  ${brent ? brent.price.toFixed(2) : '80.12'}
                </span>
              </div>
            </div>
          </div>

          {/* Center Block: Bloomberg F1 - F9 Physical Keycap Navigation Bar */}
          <nav
            aria-label="Bloomberg Function Key Navigation"
            className="flex items-center overflow-x-auto rounded-lg border border-slate-850 bg-black/60 p-1 no-scrollbar shrink-0 shadow-inner gap-1"
          >
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative keycap-button flex items-center space-x-1.5 whitespace-nowrap rounded px-2.5 py-1 text-xs font-mono transition-all ${
                    active
                      ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/25 border-b-2 border-amber-600'
                      : 'border border-slate-800/80 bg-slate-900/90 text-slate-300 hover:bg-slate-800/90 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {/* Key Cap Indicator */}
                  <span
                    className={`rounded px-1 py-0.2 text-[9px] font-black tracking-tight ${
                      active
                        ? 'bg-slate-950 text-amber-400'
                        : 'bg-slate-950/80 text-amber-400/90 border border-slate-800 group-hover:border-slate-700'
                    }`}
                  >
                    {tab.key}
                  </span>
                  <Icon className={`h-3.5 w-3.5 ${active ? 'text-slate-950' : tab.color}`} />
                  <span className="font-sans font-medium text-[11px] sm:text-xs tracking-tight">{tab.label}</span>
                  {tab.count && (
                    <span
                      className={`ml-0.5 rounded-full px-1.5 py-0.2 text-[9px] font-bold ${
                        active ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-800 text-amber-400'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                  {tab.pulse && !active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping ml-0.5" />
                  )}
                  {/* Subtle Top Active Glow Indicator */}
                  {active && (
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-1 w-4 rounded-full bg-amber-300 shadow-[0_0_8px_#fde047]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Block: Trading Desk Utilities (Strictly Unified h-8 Height) */}
          <div className="flex items-center justify-end space-x-2 shrink-0">
            {/* Master Sentiment Score Badge */}
            <div className="hidden 2xl:flex h-8 items-center space-x-2 rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-2.5 text-xs font-mono">
              <span className="text-slate-400">{t.masterIndex}:</span>
              <span className="font-bold text-emerald-400 tabular-nums">{sentimentScore}/100</span>
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                {getLocalizedSentimentRating(sentimentRating)}
              </span>
            </div>

            {/* Currency FX Selector (USD / EUR / CNY) */}
            {setSelectedCurrency && (
              <div className="flex h-8 items-center rounded-lg border border-slate-800 bg-slate-900 p-0.5 text-xs font-mono">
                {['USD', 'EUR', 'CNY'].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setSelectedCurrency(curr)}
                    className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                      selectedCurrency === curr
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title={`Base Currency: ${curr}`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}

            {/* Instant Language Toggle (繁體中文 (預設) / English) */}
            <div className="flex h-8 items-center rounded-lg border border-amber-500/40 bg-slate-900 p-0.5 text-xs shadow-sm">
              <button
                onClick={() => setLanguage('zh-TW')}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                  language === 'zh-TW'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="切換為繁體中文 (預設)"
              >
                <span>繁中</span>
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                  language === 'en'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Switch to English"
              >
                <span>EN</span>
              </button>
            </div>

            {/* Methodology Info Button */}
            <button
              onClick={onOpenMethodology}
              title={t.methodologySubtitle}
              className="flex h-8 items-center space-x-1 rounded-lg border border-slate-800 bg-slate-900 px-2.5 text-xs text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Info className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden xl:inline">{t.methodology}</span>
            </button>

            {/* Export Report Button */}
            <button
              onClick={onExportData}
              title={t.exportReport}
              className="flex h-8 items-center space-x-1 rounded-lg border border-slate-800 bg-slate-900 px-2.5 text-xs text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Download className="h-3.5 w-3.5 text-slate-400" />
              <span className="hidden xl:inline">{t.exportReport}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
