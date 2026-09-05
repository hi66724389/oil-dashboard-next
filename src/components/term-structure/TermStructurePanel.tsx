'use client';

import React, { useState } from 'react';
import {
  TrendingDown,
  TrendingUp,
  Layers,
  Activity,
  ArrowRight,
  Info,
  Clock,
  Radio,
  Zap,
} from 'lucide-react';
import { formatCurrency, formatPercent } from '@/lib/formatters';
import { TermStructureData, OrderBookData } from '@/types/oil';
import { useLanguage } from '@/context/LanguageContext';

interface TermStructurePanelProps {
  termStructure: TermStructureData;
  orderBook: OrderBookData;
  selectedBenchmark?: 'WTI' | 'Brent';
  onBenchmarkChange?: (benchmark: 'WTI' | 'Brent') => void;
}

export const TermStructurePanel: React.FC<TermStructurePanelProps> = ({
  termStructure,
  orderBook,
  selectedBenchmark = 'WTI',
  onBenchmarkChange,
}) => {
  const { t } = useLanguage();
  const [activeCurveTab, setActiveCurveTab] = useState<'curve' | 'comparison'>('curve');
  const [selectedContract, setSelectedContract] = useState<string>('M1');

  // Curve SVG scaling
  const contracts = termStructure.currentContracts;
  const history = termStructure.historicalCurves;
  const isBrent = selectedBenchmark === 'Brent';

  const prices = contracts.map((c) => (isBrent ? c.brentPrice : c.price));
  const minPrice = Math.floor(Math.min(...prices, ...history.map((h) => h.oneMonthAgo)) - 1);
  const maxPrice = Math.ceil(Math.max(...prices, ...history.map((h) => h.current)) + 1);
  const priceRange = maxPrice - minPrice || 1;

  const svgWidth = 720;
  const svgHeight = 220;
  const padding = { top: 20, right: 30, bottom: 35, left: 50 };
  const graphWidth = svgWidth - padding.left - padding.right;
  const graphHeight = svgHeight - padding.top - padding.bottom;

  const getX = (index: number) => padding.left + (index / (contracts.length - 1)) * graphWidth;
  const getY = (price: number) =>
    padding.top + graphHeight - ((price - minPrice) / priceRange) * graphHeight;

  const currentPoints = contracts
    .map((c, i) => `${getX(i)},${getY(isBrent ? c.brentPrice : c.price)}`)
    .join(' ');

  const oneWeekPoints = history
    .map((h, i) => `${getX(i)},${getY(h.oneWeekAgo)}`)
    .join(' ');

  const oneMonthPoints = history
    .map((h, i) => `${getX(i)},${getY(h.oneMonthAgo)}`)
    .join(' ');

  return (
    <div className="space-y-4">
      {/* Top Banner & Quick Metrics */}
      <div className="rounded-xl border border-slate-800/90 bg-slate-900/80 p-4 shadow-xl backdrop-blur-md">
        <div className="flex flex-col gap-3 border-b border-slate-800/80 pb-3.5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                <Layers className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-bold tracking-wider text-white uppercase sm:text-base">
                {t.termStructureTitle}
              </h2>
              <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400 animate-pulse">
                {termStructure.curveStructure === 'Backwardation' ? t.backwardation : t.contango}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{t.termStructureSubtitle}</p>
          </div>

          {/* Benchmark Selector */}
          <div className="flex items-center space-x-2">
            <div className="flex rounded-lg border border-slate-800 bg-slate-950 p-0.5 text-xs font-mono">
              <button
                onClick={() => onBenchmarkChange && onBenchmarkChange('WTI')}
                className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                  !isBrent
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                NYMEX WTI (CL)
              </button>
              <button
                onClick={() => onBenchmarkChange && onBenchmarkChange('Brent')}
                className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                  isBrent
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ICE BRENT (CO)
              </button>
            </div>
          </div>
        </div>

        {/* 4 Hero Term Structure Cards */}
        <div className="mt-3.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {/* Prompt 1M-2M Spread */}
          <div className="rounded-lg border border-slate-800/80 bg-slate-950/60 p-3">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {t.promptSpread1M2M}
            </div>
            <div className="mt-1 flex items-baseline space-x-2 font-mono">
              <span className="text-lg font-extrabold text-emerald-400">
                +${termStructure.promptSpread1M2M.toFixed(2)}
              </span>
              <span className="text-[10px] text-slate-500">/bbl</span>
            </div>
            <div className="text-[10px] text-emerald-400/90 font-medium">
              ⚡ {t.backwardation}
            </div>
          </div>

          {/* Annualized Roll Yield */}
          <div className="rounded-lg border border-slate-800/80 bg-slate-950/60 p-3">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {t.annualizedRollYield}
            </div>
            <div className="mt-1 flex items-baseline space-x-2 font-mono">
              <span className="text-lg font-extrabold text-amber-300">
                +{termStructure.annualizedRollYieldPercent.toFixed(2)}%
              </span>
              <span className="text-[10px] text-slate-500">p.a.</span>
            </div>
            <div className="text-[10px] text-slate-400">
              {isBrent ? 'ICE Brent Long Carry' : 'NYMEX Long Carry'}
            </div>
          </div>

          {/* M1-M6 6-Month Spread */}
          <div className="rounded-lg border border-slate-800/80 bg-slate-950/60 p-3">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {t.sixMonthSpread}
            </div>
            <div className="mt-1 flex items-baseline space-x-2 font-mono">
              <span className="text-lg font-extrabold text-emerald-400">
                +${termStructure.sixMonthSpread.toFixed(2)}
              </span>
              <span className="text-[10px] text-slate-500">/bbl</span>
            </div>
            <div className="text-[10px] text-slate-400">Oct 26 vs Mar 27</div>
          </div>

          {/* M1-M12 1-Year Spread */}
          <div className="rounded-lg border border-slate-800/80 bg-slate-950/60 p-3">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {t.twelveMonthSpread}
            </div>
            <div className="mt-1 flex items-baseline space-x-2 font-mono">
              <span className="text-lg font-extrabold text-emerald-400">
                +${termStructure.twelveMonthSpread.toFixed(2)}
              </span>
              <span className="text-[10px] text-slate-500">/bbl</span>
            </div>
            <div className="text-[10px] text-slate-400">Oct 26 vs Sep 27</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Interactive Curve + Right Level 2 DOM */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left 7 Columns: Futures Curve SVG & Contract Tenors */}
        <div className="space-y-4 lg:col-span-7">
          {/* SVG Futures Curve Chart */}
          <div className="rounded-xl border border-slate-800/90 bg-slate-900/80 p-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-amber-400" />
                <span className="text-xs font-bold tracking-wider text-slate-200 uppercase">
                  {t.curveComparisonTitle}
                </span>
              </div>
              {/* Legend */}
              <div className="flex items-center space-x-3 text-[10px] font-mono">
                <div className="flex items-center space-x-1">
                  <span className={`h-2 w-2 rounded-full ${isBrent ? 'bg-cyan-400' : 'bg-amber-400'}`} />
                  <span className="text-slate-200">Current</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className="text-slate-400">1W Ago</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="h-2 w-2 rounded-full bg-slate-600" />
                  <span className="text-slate-500">1M Ago</span>
                </div>
              </div>
            </div>

            {/* SVG Plot Area */}
            <div className="relative mt-3 h-56 w-full select-none">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="h-full w-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={isBrent ? '#06b6d4' : '#f59e0b'} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={isBrent ? '#06b6d4' : '#f59e0b'} stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Y-Axis Gridlines & Labels */}
                {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
                  const p = minPrice + priceRange * (1 - pct);
                  const y = padding.top + pct * graphHeight;
                  return (
                    <g key={pct}>
                      <line
                        x1={padding.left}
                        y1={y}
                        x2={svgWidth - padding.right}
                        y2={y}
                        stroke="#1e293b"
                        strokeDasharray="4 4"
                        strokeWidth="1"
                      />
                      <text
                        x={padding.left - 8}
                        y={y + 4}
                        textAnchor="end"
                        fill="#64748b"
                        className="font-mono text-[10px]"
                      >
                        ${p.toFixed(1)}
                      </text>
                    </g>
                  );
                })}

                {/* 1 Month Ago Curve Line */}
                <polyline
                  fill="none"
                  stroke="#475569"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  points={oneMonthPoints}
                />

                {/* 1 Week Ago Curve Line */}
                <polyline
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1.75"
                  strokeDasharray="4 4"
                  points={oneWeekPoints}
                />

                {/* Current Curve Area & Line */}
                <polygon
                  points={`${padding.left},${svgHeight - padding.bottom} ${currentPoints} ${
                    svgWidth - padding.right
                  },${svgHeight - padding.bottom}`}
                  fill="url(#curveFill)"
                />
                <polyline
                  fill="none"
                  stroke={isBrent ? '#06b6d4' : '#f59e0b'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={currentPoints}
                />

                {/* Contract Points & Labels */}
                {contracts.map((c, i) => {
                  const x = getX(i);
                  const price = isBrent ? c.brentPrice : c.price;
                  const y = getY(price);
                  const isSelected = selectedContract === c.tenor;

                  return (
                    <g
                      key={c.tenor}
                      className="cursor-pointer"
                      onClick={() => setSelectedContract(c.tenor)}
                    >
                      {/* Vertical Guideline on selected */}
                      {isSelected && (
                        <line
                          x1={x}
                          y1={padding.top}
                          x2={x}
                          y2={svgHeight - padding.bottom}
                          stroke="#f59e0b"
                          strokeWidth="1"
                          strokeDasharray="2 2"
                        />
                      )}

                      {/* X-axis Tenor label */}
                      <text
                        x={x}
                        y={svgHeight - padding.bottom + 18}
                        textAnchor="middle"
                        fill={isSelected ? '#ffffff' : '#94a3b8'}
                        className={`font-mono text-[10px] ${isSelected ? 'font-bold' : ''}`}
                      >
                        {c.tenor}
                      </text>

                      {/* Price Bubble Tag */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? 6 : 4}
                        fill={isBrent ? '#06b6d4' : '#f59e0b'}
                        stroke="#090d16"
                        strokeWidth="2"
                      />

                      <text
                        x={x}
                        y={y - 8}
                        textAnchor="middle"
                        fill="#ffffff"
                        className="font-mono text-[9px] font-bold"
                      >
                        ${price.toFixed(2)}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Term Structure Table */}
          <div className="overflow-hidden rounded-xl border border-slate-800/90 bg-slate-900/80 shadow-xl">
            <div className="border-b border-slate-800/80 bg-slate-950/60 px-4 py-2.5 text-xs font-bold tracking-wider text-slate-300 uppercase">
              {t.curveTableTitle}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="border-b border-slate-800 bg-slate-950/80 text-[10px] font-semibold text-slate-400 uppercase">
                  <tr>
                    <th className="py-2 pl-3.5 pr-2">{t.colTenor}</th>
                    <th className="px-2 py-2">{t.colContract}</th>
                    <th className="px-2 py-2 font-sans">{t.colDelivery}</th>
                    <th className="px-2 py-2 text-right">{t.colPrice}</th>
                    <th className="px-2 py-2 text-right">{t.colChange}</th>
                    <th className="px-2 py-2 text-right">{t.colSpreadPrompt}</th>
                    <th className="px-2 py-2 text-right">{t.colOpenInterest}</th>
                    <th className="py-2 pl-2 pr-3.5 text-center font-sans">{t.colCurveShape}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {contracts.map((c) => {
                    const price = isBrent ? c.brentPrice : c.price;
                    const change = isBrent ? c.brentChange : c.change;
                    const spread = Number((price - (isBrent ? contracts[1].brentPrice : contracts[1].price)).toFixed(2));
                    const isSelected = selectedContract === c.tenor;

                    return (
                      <tr
                        key={c.tenor}
                        onClick={() => setSelectedContract(c.tenor)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-amber-500/10 text-white font-semibold'
                            : 'hover:bg-slate-800/40 text-slate-300'
                        }`}
                      >
                        <td className="py-2 pl-3.5 pr-2 font-bold text-amber-400">{c.tenor}</td>
                        <td className="px-2 py-2 text-slate-400">{c.contractCode}</td>
                        <td className="px-2 py-2 font-sans text-slate-200">{c.deliveryMonth}</td>
                        <td className="px-2 py-2 text-right font-bold text-white">${price.toFixed(2)}</td>
                        <td className="px-2 py-2 text-right text-emerald-400">+{change.toFixed(2)}</td>
                        <td
                          className={`px-2 py-2 text-right ${
                            spread < 0 ? 'text-emerald-400' : spread > 0 ? 'text-rose-400' : 'text-slate-400'
                          }`}
                        >
                          {spread === 0 ? '0.00' : `${spread > 0 ? '+' : ''}${spread.toFixed(2)}`}
                        </td>
                        <td className="px-2 py-2 text-right text-slate-400">{c.openInterest.toLocaleString()}</td>
                        <td className="py-2 pl-2 pr-3.5 text-center font-sans">
                          <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300">
                            {t.backwardation}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Level 2 DOM (Order Book) & Time/Sales Tape */}
        <div className="space-y-4 lg:col-span-5">
          {/* Level 2 DOM Ladder */}
          <div className="rounded-xl border border-slate-800/90 bg-slate-900/80 p-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {t.domTitle}
                  </span>
                  <span className="rounded bg-slate-800 px-1.5 py-0.2 font-mono text-[9px] text-slate-300">
                    {orderBook.symbol}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">{t.domSubtitle}</div>
              </div>

              <div className="text-right font-mono">
                <div className="text-sm font-black text-white">${orderBook.lastPrice.toFixed(2)}</div>
                <div className="text-[10px] text-emerald-400 font-bold">
                  +{orderBook.change.toFixed(2)} (+{orderBook.changePercent.toFixed(2)}%)
                </div>
              </div>
            </div>

            {/* Imbalance Meter Bar */}
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>{t.orderImbalance}</span>
                <span className="font-bold text-emerald-400">{t.bidHeavy}</span>
              </div>
              <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                <div className="bg-emerald-500 h-full" style={{ width: '59.2%' }} />
                <div className="bg-rose-500 h-full" style={{ width: '40.8%' }} />
              </div>
            </div>

            {/* DOM Asks / Bids Ladder */}
            <div className="mt-3 overflow-hidden rounded-lg border border-slate-800 bg-slate-950 text-[11px] font-mono">
              <div className="grid grid-cols-4 bg-slate-900 px-2 py-1 text-[9px] font-semibold text-slate-400 border-b border-slate-800">
                <span>{t.colAskTotal}</span>
                <span className="text-right">{t.colAskQty}</span>
                <span className="text-center">{t.colPrice}</span>
                <span className="text-right">{t.colBidQty}</span>
              </div>

              {/* Asks (Red) */}
              <div className="divide-y divide-slate-900">
                {orderBook.asks.slice(0, 5).reverse().map((ask) => (
                  <div
                    key={`ask-${ask.price}`}
                    className="relative grid grid-cols-4 px-2 py-1 items-center hover:bg-rose-950/30"
                  >
                    <div
                      className="absolute inset-y-0 left-0 bg-rose-500/10 pointer-events-none"
                      style={{ width: `${ask.depthPercent}%` }}
                    />
                    <span className="text-slate-500 text-[10px]">{ask.total}</span>
                    <span className="text-right font-bold text-rose-400">{ask.size}</span>
                    <span className="text-center font-bold text-rose-300 bg-rose-950/40 rounded py-0.5">
                      ${ask.price.toFixed(2)}
                    </span>
                    <span className="text-right text-slate-600">—</span>
                  </div>
                ))}
              </div>

              {/* Spread Divider Bar */}
              <div className="flex items-center justify-between bg-slate-900/90 px-3 py-1 text-[10px] font-bold text-amber-300 border-y border-amber-500/30">
                <span>SPREAD: 1 TICK (${orderBook.spreadDollar.toFixed(2)})</span>
                <span>LAST: ${orderBook.lastPrice.toFixed(2)}</span>
              </div>

              {/* Bids (Green) */}
              <div className="divide-y divide-slate-900">
                {orderBook.bids.slice(0, 5).map((bid) => (
                  <div
                    key={`bid-${bid.price}`}
                    className="relative grid grid-cols-4 px-2 py-1 items-center hover:bg-emerald-950/30"
                  >
                    <div
                      className="absolute inset-y-0 right-0 bg-emerald-500/10 pointer-events-none"
                      style={{ width: `${bid.depthPercent}%` }}
                    />
                    <span className="text-slate-600">—</span>
                    <span className="text-right text-slate-500 text-[10px]">{bid.total}</span>
                    <span className="text-center font-bold text-emerald-300 bg-emerald-950/40 rounded py-0.5">
                      ${bid.price.toFixed(2)}
                    </span>
                    <span className="text-right font-bold text-emerald-400">{bid.size}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Time & Sales Real-Time Tape */}
          <div className="rounded-xl border border-slate-800/90 bg-slate-900/80 p-3.5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 text-xs font-mono">
              <span className="font-bold text-slate-300 uppercase tracking-wider">
                {t.timeAndSalesTitle}
              </span>
              <div className="flex items-center space-x-1 text-emerald-400 text-[10px]">
                <Radio className="h-3 w-3 animate-pulse" />
                <span>LIVE TAPE</span>
              </div>
            </div>

            <div className="mt-2 divide-y divide-slate-800/60 font-mono text-[11px] max-h-48 overflow-y-auto no-scrollbar">
              {orderBook.recentTrades.slice(0, 7).map((trade) => (
                <div
                  key={trade.id}
                  className="flex items-center justify-between py-1.5 px-1 hover:bg-slate-800/30"
                >
                  <span className="text-slate-500 text-[10px]">{trade.time}</span>
                  <span className="text-slate-400 text-[10px]">{trade.exchange}</span>
                  <span className="font-bold text-white">${trade.price.toFixed(2)}</span>
                  <span
                    className={`rounded px-1.5 py-0.2 text-[9px] font-bold ${
                      trade.side === 'BUY'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {trade.side} {trade.size}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
