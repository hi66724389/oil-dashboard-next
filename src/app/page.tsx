'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/header/Header';
import { TradingViewTickerTape } from '@/components/tradingview/TradingViewTickerTape';
import { TradingViewRealtimeChart } from '@/components/tradingview/TradingViewRealtimeChart';
import { TradingViewMarketQuotes } from '@/components/tradingview/TradingViewMarketQuotes';
import { LiveAlertBar } from '@/components/trading/LiveAlertBar';
import { TraderWorkstation } from '@/components/trading/TraderWorkstation';
import { TickerGrid } from '@/components/tickers/TickerGrid';
import { SentimentGauge } from '@/components/sentiment/SentimentGauge';
import { RefineryCrackPanel } from '@/components/refinery/RefineryCrackPanel';
import { InstitutionalResearchPanel } from '@/components/research/InstitutionalResearchPanel';
import { CatalystTracker } from '@/components/catalysts/CatalystTracker';
import { LiveNewsFeed } from '@/components/news/LiveNewsFeed';
import { ScenarioSimulator } from '@/components/scenario/ScenarioSimulator';
import { ChokepointRadar } from '@/components/radar/ChokepointRadar';
import { OpecComplianceTable } from '@/components/opec/OpecComplianceTable';
import { InventoryHeatmap } from '@/components/inventory/InventoryHeatmap';
import { MethodologyModal } from '@/components/modals/MethodologyModal';
import { TerminalStatusBar } from '@/components/terminal/TerminalStatusBar';
import {
  getLocalizedTickers,
  getLocalizedSpreads,
  getLocalizedSentiment,
  getLocalizedCatalysts,
  getLocalizedNews,
  getLocalizedChokepoints,
  getLocalizedOpecMembers,
  getLocalizedInventoryHubs,
  getLocalizedTermStructure,
  getLocalizedOrderBook,
  getLocalizedRefiningData,
  getLocalizedTankerRadarData,
  getLocalizedInstitutionalResearch,
} from '@/data/mockOilData';
import { useLanguage } from '@/context/LanguageContext';
import { TickerData, SpreadData } from '@/types/oil';
import {
  Flame,
  Layers,
  Droplets,
  Anchor,
  Building2,
  TrendingUp,
  Radio,
  Sliders,
  Globe,
  Activity,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';

export default function OilDashboardPage() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedSymbol, setSelectedSymbol] = useState<string>('PEPPERSTONE:SPOTCRUDE');
  const [selectedBenchmark, setSelectedBenchmark] = useState<'WTI' | 'Brent'>('WTI');
  const [isMethodologyOpen, setIsMethodologyOpen] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');

  // Real-time API Prices State
  const [liveTickers, setLiveTickers] = useState<TickerData[]>([]);
  const [liveSpreads, setLiveSpreads] = useState<SpreadData[]>([]);
  const [liveSpotWTI, setLiveSpotWTI] = useState<number | null>(null);
  const [liveSpotBrent, setLiveSpotBrent] = useState<number | null>(null);
  const [isPriceLoading, setIsPriceLoading] = useState<boolean>(false);
  const [lastPriceUpdate, setLastPriceUpdate] = useState<string>('');
  const [priceSource, setPriceSource] = useState<string>('');

  // Live Price Fetcher (TradingView Scanner + Yahoo Finance Multi-API)
  const fetchLivePrices = async () => {
    try {
      setIsPriceLoading(true);
      const res = await fetch(`/api/oil-prices?lang=${language}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data?.tickers?.length) {
          setLiveTickers(data.tickers);
        }
        if (data?.spreads?.length) {
          setLiveSpreads(data.spreads);
        }
        if (data?.spotWTI) {
          setLiveSpotWTI(data.spotWTI);
        }
        if (data?.spotBrent) {
          setLiveSpotBrent(data.spotBrent);
        }
        if (data?.source) {
          setPriceSource(data.source);
        }
        setLastPriceUpdate(new Date().toLocaleTimeString('zh-TW', { hour12: false }));
      }
    } catch (err) {
      console.warn('Live price auto-sync fallback triggered:', err);
    } finally {
      setIsPriceLoading(false);
    }
  };

  useEffect(() => {
    fetchLivePrices();
    const interval = setInterval(fetchLivePrices, 15000); // sync every 15s
    return () => clearInterval(interval);
  }, [language]);

  // Currency multiplier
  const currencyMultiplier =
    selectedCurrency === 'EUR' ? 0.92 : selectedCurrency === 'CNY' ? 7.24 : 1.0;
  const currencySymbol =
    selectedCurrency === 'EUR' ? '€' : selectedCurrency === 'CNY' ? '¥' : '$';

  // Real-time localized dataset bindings (overlayed with live API stream)
  const defaultTickers = useMemo(() => getLocalizedTickers(language), [language]);
  const tickers = liveTickers.length > 0 ? liveTickers : defaultTickers;

  const defaultSpreads = useMemo(() => getLocalizedSpreads(language), [language]);
  const spreads = liveSpreads.length > 0 ? liveSpreads : defaultSpreads;

  const sentiment = useMemo(() => getLocalizedSentiment(language), [language]);
  const catalysts = useMemo(() => getLocalizedCatalysts(language), [language]);
  const news = useMemo(() => getLocalizedNews(language), [language]);
  const chokepoints = useMemo(() => getLocalizedChokepoints(language), [language]);
  const opecMembers = useMemo(() => getLocalizedOpecMembers(language), [language]);
  const inventoryHubs = useMemo(() => getLocalizedInventoryHubs(language), [language]);
  const termStructure = useMemo(() => getLocalizedTermStructure(language), [language]);
  const orderBook = useMemo(
    () => getLocalizedOrderBook(selectedSymbol, language),
    [selectedSymbol, language]
  );
  const refiningData = useMemo(() => getLocalizedRefiningData(language), [language]);
  const tankerRadar = useMemo(() => getLocalizedTankerRadarData(language), [language]);
  const institutionalResearch = useMemo(
    () => getLocalizedInstitutionalResearch(language),
    [language]
  );

  // Export full institutional dashboard dataset
  const handleExportData = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      language,
      liveSource: priceSource || 'Multi-API Stream',
      sentiment,
      benchmarks: tickers,
      spreads,
      termStructure,
      orderBook,
      refining: refiningData,
      tankerTracking: tankerRadar,
      institutionalResearch,
      catalysts,
      opecCompliance: opecMembers,
      chokepoints,
      inventory: inventoryHubs,
    };
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `petropulse_commodity_terminal_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const [deskMode, setDeskMode] = useState<'ALL' | 'EXEC' | 'FUND' | 'INTEL'>('ALL');

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950 bg-terminal-grid">
      {/* Top Navbar */}
      <Header
        tickers={tickers}
        sentimentScore={sentiment.overallScore}
        sentimentRating={sentiment.rating}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        onExportData={handleExportData}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
      />

      {/* TradingView Live Exchange Feed Ticker Tape */}
      <TradingViewTickerTape locale={language} />

      {/* Main Container */}
      <main className="flex-1 mx-auto w-full max-w-[1780px] p-3 sm:p-4 space-y-4 sm:space-y-5">
        {/* Real-time Volatility Alert & Backend Intel Stream Sync */}
        <LiveAlertBar />

        {/* Tab 1: F1 - Executive Trading Desk Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-4 sm:space-y-5 animate-fadeIn">
            {/* Workspace Desk View Mode Selector & Quick Symbol Chips */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-2.5 rounded-xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md shadow-md">
              {/* Left: Desk Layout Mode Buttons */}
              <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto no-scrollbar font-mono text-xs">
                <span className="text-slate-500 font-bold uppercase text-[10px] mr-1 hidden sm:inline">
                  DESK:
                </span>
                {[
                  { id: 'ALL', label: '全能終端 (FULL MATRIX)', icon: Layers },
                  { id: 'EXEC', label: '盤口交易台 (EXECUTION)', icon: Activity },
                  { id: 'FUND', label: '基本面與裂解 (FUNDAMENTALS)', icon: Droplets },
                  { id: 'INTEL', label: '機構情報 (INTEL)', icon: Building2 },
                ].map((mode) => {
                  const Icon = mode.icon;
                  const isCur = deskMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setDeskMode(mode.id as 'ALL' | 'EXEC' | 'FUND' | 'INTEL')}
                      className={`keycap-button flex items-center space-x-1.5 whitespace-nowrap px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                        isCur
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                          : 'bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{mode.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right: Fast Benchmark Chart Switcher & Live API Sync Button */}
              <div className="flex flex-wrap items-center space-x-2 font-mono text-xs shrink-0 self-end lg:self-center gap-1.5">
                <button
                  onClick={fetchLivePrices}
                  disabled={isPriceLoading}
                  className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 text-[11px] font-bold transition-all shadow-sm"
                  title="即時透過 TradingView Scanner & Yahoo Finance 多重 API 重新擷取報價"
                >
                  <RefreshCw className={`h-3 w-3 ${isPriceLoading ? 'animate-spin text-amber-400' : 'text-emerald-400'}`} />
                  <span>{isPriceLoading ? '報價同步中...' : '⚡ API 即時行情'}</span>
                </button>
                {lastPriceUpdate && (
                  <span className="text-[10px] text-slate-400 hidden sm:inline tabular-nums">
                    {lastPriceUpdate}
                  </span>
                )}
                <span className="text-slate-700 hidden sm:inline">|</span>
                <span className="text-slate-500 text-[10px]">CHART:</span>
                {[
                  { label: 'WTI CL', symbol: 'PEPPERSTONE:SPOTCRUDE' },
                  { label: 'BINANCE WTI', symbol: 'BINANCE:CLUSDT.P' },
                  { label: 'BRENT CO', symbol: 'PEPPERSTONE:BRENT' },
                  { label: 'GASOLINE', symbol: 'NYMEX:RB1!' },
                  { label: 'HEAT OIL', symbol: 'NYMEX:HO1!' },
                ].map((s) => (
                  <button
                    key={s.symbol}
                    onClick={() => setSelectedSymbol(s.symbol)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-all ${
                      selectedSymbol === s.symbol
                        ? 'border-amber-500/80 bg-amber-500/20 text-amber-300 shadow-sm'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Layout 1: FULL MATRIX (Comprehensive Institutional Desk) */}
            {deskMode === 'ALL' && (
              <>
                {/* 1. Top Section: Equal-Height Live Chart (8 Cols) + Sentiment Gauge (4 Cols) */}
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-12 items-stretch">
                  <div className="xl:col-span-8 flex flex-col">
                    <TradingViewRealtimeChart selectedSymbol={selectedSymbol} />
                  </div>
                  <div className="xl:col-span-4 flex flex-col">
                    <SentimentGauge
                      data={sentiment}
                      onOpenMethodology={() => setIsMethodologyOpen(true)}
                    />
                  </div>
                </div>

                {/* 2. Mid Section: Integrated Execution Deck (Quotes Book 5 Cols + Risk Workstation 7 Cols) */}
                <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 p-3.5 sm:p-4 shadow-xl backdrop-blur-md space-y-3.5 terminal-card">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 pb-2.5 gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <h2 className="font-mono text-xs sm:text-sm font-bold tracking-wider text-amber-400 uppercase">
                        EXECUTION DECK // 交易執行台 (LIVE MARKET QUOTES & DOM RISK WORKSTATION)
                      </h2>
                    </div>
                    <div className="flex items-center space-x-3 text-[11px] font-mono text-slate-400">
                      <span className="text-emerald-400 font-semibold">● CME / ICE DIRECT TICKS</span>
                      <span className="text-slate-700">|</span>
                      <span>S/R DOM LADDER & POSITION RISK ENGINE</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
                    <div className="xl:col-span-5 flex flex-col">
                      <TradingViewMarketQuotes locale={language} />
                    </div>
                    <div className="xl:col-span-7 flex flex-col">
                      <TraderWorkstation spotPrice={liveSpotWTI || 91.48} />
                    </div>
                  </div>
                </div>

                {/* 3. Bottom Section: Macro & Fundamental Intelligence */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <div className="flex items-center space-x-2">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      <h2 className="font-mono text-xs sm:text-sm font-bold tracking-wider text-slate-200 uppercase">
                        MACRO INTELLIGENCE & COMMODITY FUNDAMENTALS // 基本面與機構共識矩陣
                      </h2>
                    </div>
                    <span className="font-mono text-[11px] text-slate-500 hidden sm:inline">
                      12-COLUMN INSTITUTIONAL MATRIX
                    </span>
                  </div>

                  {/* Grid Tier 1: Crack Spreads (6 cols) & Wall Street Consensus (6 cols) */}
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
                    <div className="xl:col-span-6">
                      <RefineryCrackPanel data={refiningData} />
                    </div>
                    <div className="xl:col-span-6">
                      <InstitutionalResearchPanel consensusData={institutionalResearch} />
                    </div>
                  </div>

                  {/* Grid Tier 2: Macro Catalysts Radar (7 cols) & Live News Wire (5 cols) */}
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
                    <div className="xl:col-span-7">
                      <CatalystTracker catalysts={catalysts} />
                    </div>
                    <div className="xl:col-span-5">
                      <LiveNewsFeed initialNews={news} />
                    </div>
                  </div>

                  {/* Grid Tier 3: Physical Storage (4 cols), Chokepoint Radar (4 cols), OPEC Compliance (4 cols) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 items-start">
                    <div className="xl:col-span-4">
                      <InventoryHeatmap hubs={inventoryHubs} />
                    </div>
                    <div className="xl:col-span-4">
                      <ChokepointRadar chokepoints={chokepoints.slice(0, 3)} />
                    </div>
                    <div className="xl:col-span-4 md:col-span-2 xl:col-span-4">
                      <OpecComplianceTable members={opecMembers.slice(0, 5)} />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Layout 2: EXECUTION FOCUS (Active Trading Execution Deck) */}
            {deskMode === 'EXEC' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-12 items-stretch">
                  <div className="xl:col-span-8 flex flex-col">
                    <TradingViewRealtimeChart selectedSymbol={selectedSymbol} />
                  </div>
                  <div className="xl:col-span-4 flex flex-col">
                    <TradingViewMarketQuotes locale={language} />
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 p-4 shadow-xl backdrop-blur-md terminal-card">
                  <TraderWorkstation spotPrice={liveSpotWTI || 91.48} />
                </div>
              </div>
            )}

            {/* Layout 3: FUNDAMENTALS & REFINERY */}
            {deskMode === 'FUND' && (
              <div className="space-y-4 animate-fadeIn">
                <RefineryCrackPanel data={refiningData} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  <InventoryHeatmap hubs={inventoryHubs} />
                  <ChokepointRadar chokepoints={chokepoints} />
                  <OpecComplianceTable members={opecMembers} />
                </div>
              </div>
            )}

            {/* Layout 4: MACRO INTEL & CONSENSUS */}
            {deskMode === 'INTEL' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
                  <div className="xl:col-span-7">
                    <InstitutionalResearchPanel consensusData={institutionalResearch} />
                  </div>
                  <div className="xl:col-span-5">
                    <SentimentGauge
                      data={sentiment}
                      onOpenMethodology={() => setIsMethodologyOpen(true)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
                  <div className="xl:col-span-7">
                    <CatalystTracker catalysts={catalysts} />
                  </div>
                  <div className="xl:col-span-5">
                    <LiveNewsFeed initialNews={news} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: F3 - Global Refinery Runs & Crack Spreads */}
        {activeTab === 'refinery' && (
          <div className="space-y-5 animate-fadeIn">
            <RefineryCrackPanel data={refiningData} />
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <InventoryHeatmap hubs={inventoryHubs} />
              </div>
              <div className="lg:col-span-6">
                <TradingViewRealtimeChart selectedSymbol={selectedSymbol} />
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: F5 - Institutional Research Digest */}
        {activeTab === 'research' && (
          <div className="space-y-5 animate-fadeIn">
            <InstitutionalResearchPanel consensusData={institutionalResearch} />
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <SentimentGauge
                  data={sentiment}
                  onOpenMethodology={() => setIsMethodologyOpen(true)}
                />
              </div>
              <div className="lg:col-span-6">
                <LiveNewsFeed initialNews={news} />
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: F6 - Catalyst Tracker Radar */}
        {activeTab === 'catalysts' && (
          <div className="space-y-5 animate-fadeIn">
            <CatalystTracker catalysts={catalysts} />
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <SentimentGauge
                  data={sentiment}
                  onOpenMethodology={() => setIsMethodologyOpen(true)}
                />
              </div>
              <div className="lg:col-span-6">
                <TradingViewRealtimeChart selectedSymbol={selectedSymbol} />
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: F7 - Live Intel News Wire */}
        {activeTab === 'news' && (
          <div className="space-y-5 animate-fadeIn">
            <LiveNewsFeed initialNews={news} />
          </div>
        )}

        {/* Tab 8: F8 - Macro Scenario Simulator */}
        {activeTab === 'simulator' && (
          <div className="space-y-5 animate-fadeIn">
            <ScenarioSimulator />
            <TradingViewRealtimeChart selectedSymbol={selectedSymbol} />
          </div>
        )}

        {/* Tab 9: F9 - OPEC Quotas, Storage & Chokepoints */}
        {activeTab === 'analytics' && (
          <div className="space-y-5 animate-fadeIn">
            <OpecComplianceTable members={opecMembers} />
            <InventoryHeatmap hubs={inventoryHubs} />
            <ChokepointRadar chokepoints={chokepoints} />
          </div>
        )}
      </main>

      {/* Terminal Telemetry Bottom Status Bar */}
      <footer className="mt-8">
        <TerminalStatusBar />
      </footer>

      {/* Methodology Modal */}
      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />
    </div>
  );
}
