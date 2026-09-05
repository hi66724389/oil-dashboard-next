'use client';

import React, { useState } from 'react';
import {
  Flame,
} from 'lucide-react';
import { formatCurrency, formatPercent, formatChange } from '@/lib/formatters';
import { getLocalizedPriceHistory } from '@/data/mockOilData';
import { PriceHistoryPoint } from '@/types/oil';
import { useLanguage } from '@/context/LanguageContext';

interface PriceChartProps {
  selectedSymbol: string;
  onOpenCatalystDetail?: (catalystId: string) => void;
}

export const PriceChart: React.FC<PriceChartProps> = ({ selectedSymbol }) => {
  const { language, t } = useLanguage();
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y'>('1D');
  const [chartMode, setChartMode] = useState<'wti_brent' | 'wti_only' | 'brent_only' | 'spread'>('wti_brent');
  const [hoveredPoint, setHoveredPoint] = useState<PriceHistoryPoint | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const priceHistoryMap = getLocalizedPriceHistory(language);
  const data = priceHistoryMap[timeframe] || priceHistoryMap['1D'];

  // Calculate scales
  const wtiPrices = data.map((d) => d.wti);
  const brentPrices = data.map((d) => d.brent);
  const spreads = data.map((d) => d.brent - d.wti);

  const minPrice =
    chartMode === 'spread'
      ? Math.min(...spreads) * 0.95
      : Math.min(...(chartMode === 'brent_only' ? brentPrices : wtiPrices)) * 0.98;

  const maxPrice =
    chartMode === 'spread'
      ? Math.max(...spreads) * 1.05
      : Math.max(...(chartMode === 'wti_only' ? wtiPrices : brentPrices)) * 1.02;

  const priceRange = maxPrice - minPrice || 1;

  const maxVolume = Math.max(...data.map((d) => d.volume || 1000));

  // Chart SVG coordinates
  const width = 800;
  const height = 300;
  const padding = { top: 20, right: 30, bottom: 40, left: 55 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  const getX = (index: number) => padding.left + (index / (data.length - 1)) * graphWidth;
  const getY = (price: number) =>
    padding.top + graphHeight - ((price - minPrice) / priceRange) * graphHeight;

  const wtiPoints = data.map((d, i) => `${getX(i)},${getY(d.wti)}`).join(' ');
  const brentPoints = data.map((d, i) => `${getX(i)},${getY(d.brent)}`).join(' ');
  const spreadPoints = data.map((d, i) => `${getX(i)},${getY(d.brent - d.wti)}`).join(' ');

  const currentWti = data[data.length - 1].wti;
  const currentBrent = data[data.length - 1].brent;
  const currentSpread = currentBrent - currentWti;
  const openWti = data[0].wti;
  const changeWti = currentWti - openWti;
  const changePercentWti = (changeWti / openWti) * 100;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl">
      {/* Chart Header Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-3.5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-sm font-bold text-amber-400">
              {chartMode === 'spread' ? t.chartSpreadTitle : t.chartBenchmarksTitle}
            </span>
            <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-400">
              {t.realtimeBadge}
            </span>
          </div>
          <div className="mt-1 flex items-baseline space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400">WTI:</span>
              <span className="font-mono text-base font-bold text-amber-300">
                {formatCurrency(currentWti)}
              </span>
              <span
                className={`font-mono text-xs font-semibold ${
                  changeWti >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {formatChange(changeWti)} ({formatPercent(changePercentWti)})
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400">Brent:</span>
              <span className="font-mono text-base font-bold text-cyan-300">
                {formatCurrency(currentBrent)}
              </span>
            </div>

            <div className="hidden items-center space-x-1.5 md:flex">
              <span className="text-xs text-slate-400">{t.catSpread}:</span>
              <span className="font-mono text-xs font-bold text-indigo-300">
                +${currentSpread.toFixed(2)}/bbl
              </span>
            </div>
          </div>
        </div>

        {/* Chart controls & filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View mode toggle */}
          <div className="flex rounded-lg border border-slate-800 bg-slate-950/80 p-0.5 text-xs">
            <button
              onClick={() => setChartMode('wti_brent')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                chartMode === 'wti_brent'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.modeWtiBrent}
            </button>
            <button
              onClick={() => setChartMode('wti_only')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                chartMode === 'wti_only'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.modeWtiOnly}
            </button>
            <button
              onClick={() => setChartMode('brent_only')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                chartMode === 'brent_only'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.modeBrentOnly}
            </button>
            <button
              onClick={() => setChartMode('spread')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                chartMode === 'spread'
                  ? 'bg-indigo-500 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.modeSpread}
            </button>
          </div>

          {/* Timeframe Switcher */}
          <div className="flex rounded-lg border border-slate-800 bg-slate-950/80 p-0.5 text-xs">
            {(['1D', '1W', '1M', '1Y'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded font-mono text-[11px] font-semibold transition-colors ${
                  timeframe === tf
                    ? 'bg-slate-800 text-amber-400 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main SVG Interactive Chart Area */}
      <div className="relative mt-4 h-72 w-full select-none">
        <svg
          className="h-full w-full overflow-visible"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          onMouseLeave={() => setHoveredPoint(null)}
        >
          <defs>
            <linearGradient id="wtiGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="brentGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="spreadGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines & Y Axis Labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
            const price = minPrice + priceRange * (1 - pct);
            const y = padding.top + pct * graphHeight;
            return (
              <g key={pct}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
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
                  ${price.toFixed(chartMode === 'spread' ? 2 : 1)}
                </text>
              </g>
            );
          })}

          {/* Volume bars at bottom */}
          {data.map((d, i) => {
            const x = getX(i) - 6;
            const barHeight = ((d.volume || 1000) / maxVolume) * 45;
            const y = height - padding.bottom - barHeight;
            return (
              <rect
                key={`vol-${i}`}
                x={x}
                y={y}
                width={12}
                height={barHeight}
                fill="#334155"
                opacity="0.4"
                rx="1"
              />
            );
          })}

          {/* WTI Area and Line */}
          {(chartMode === 'wti_brent' || chartMode === 'wti_only') && (
            <>
              <polygon
                points={`${padding.left},${height - padding.bottom} ${wtiPoints} ${
                  width - padding.right
                },${height - padding.bottom}`}
                fill="url(#wtiGradient)"
              />
              <polyline
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={wtiPoints}
              />
            </>
          )}

          {/* Brent Area and Line */}
          {(chartMode === 'wti_brent' || chartMode === 'brent_only') && (
            <>
              <polygon
                points={`${padding.left},${height - padding.bottom} ${brentPoints} ${
                  width - padding.right
                },${height - padding.bottom}`}
                fill="url(#brentGradient)"
              />
              <polyline
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={brentPoints}
              />
            </>
          )}

          {/* Spread Mode */}
          {chartMode === 'spread' && (
            <>
              <polygon
                points={`${padding.left},${height - padding.bottom} ${spreadPoints} ${
                  width - padding.right
                },${height - padding.bottom}`}
                fill="url(#spreadGradient)"
              />
              <polyline
                fill="none"
                stroke="#818cf8"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={spreadPoints}
              />
            </>
          )}

          {/* X-Axis Time Labels & Catalyst Event Markers */}
          {data.map((d, i) => {
            const x = getX(i);
            const yWti = getY(d.wti);
            const hasEvent = !!d.eventNote;

            return (
              <g key={i}>
                {/* Time label */}
                <text
                  x={x}
                  y={height - padding.bottom + 20}
                  textAnchor="middle"
                  fill="#64748b"
                  className="font-mono text-[10px]"
                >
                  {d.time}
                </text>

                {/* Event Marker Pin */}
                {hasEvent && (
                  <g
                    className="cursor-pointer transition-transform hover:scale-125"
                    onClick={() => setSelectedEvent(d.eventNote || null)}
                  >
                    <line
                      x1={x}
                      y1={padding.top}
                      x2={x}
                      y2={height - padding.bottom}
                      stroke="#f59e0b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      opacity="0.75"
                    />
                    <circle cx={x} cy={yWti} r="5" fill="#f59e0b" stroke="#090d16" strokeWidth="2" />
                    <circle cx={x} cy={yWti} r="8" fill="#f59e0b" opacity="0.3" className="animate-ping" />
                  </g>
                )}

                {/* Hover Hitbox Column */}
                <rect
                  x={x - graphWidth / (data.length * 2)}
                  y={padding.top}
                  width={graphWidth / data.length}
                  height={graphHeight}
                  fill="transparent"
                  onMouseEnter={() => setHoveredPoint(d)}
                />
              </g>
            );
          })}

          {/* Crosshair on hover */}
          {hoveredPoint && (
            <g>
              {(() => {
                const idx = data.findIndex((d) => d.time === hoveredPoint.time);
                if (idx < 0) return null;
                const x = getX(idx);
                const y = getY(hoveredPoint.wti);
                return (
                  <>
                    <line
                      x1={x}
                      y1={padding.top}
                      x2={x}
                      y2={height - padding.bottom}
                      stroke="#94a3b8"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                    <circle cx={x} cy={y} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                  </>
                );
              })()}
            </g>
          )}
        </svg>

        {/* Interactive Floating Tooltip */}
        {hoveredPoint && (
          <div className="pointer-events-none absolute right-4 top-2 z-20 rounded-lg border border-slate-700 bg-slate-900/95 p-2.5 text-xs shadow-2xl backdrop-blur-md">
            <div className="font-mono font-bold text-slate-300 border-b border-slate-800 pb-1 flex justify-between gap-4">
              <span>{hoveredPoint.time}</span>
              <span className="text-slate-400">{t.volume}: {hoveredPoint.volume.toLocaleString()}</span>
            </div>
            <div className="mt-1.5 space-y-1 font-mono">
              <div className="flex items-center justify-between space-x-3">
                <span className="flex items-center space-x-1 text-amber-400">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  <span>WTI:</span>
                </span>
                <span className="font-bold text-white">${hoveredPoint.wti.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between space-x-3">
                <span className="flex items-center space-x-1 text-cyan-400">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  <span>Brent:</span>
                </span>
                <span className="font-bold text-white">${hoveredPoint.brent.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between space-x-3 pt-1 border-t border-slate-800/80">
                <span className="text-indigo-300">{t.catSpread}:</span>
                <span className="font-bold text-indigo-300">
                  +${(hoveredPoint.brent - hoveredPoint.wti).toFixed(2)}
                </span>
              </div>
              {hoveredPoint.eventNote && (
                <div className="mt-1 rounded bg-amber-500/10 p-1 text-[10px] text-amber-300 border border-amber-500/20">
                  ⚡ {hoveredPoint.eventNote}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Selected Event Banner if clicked */}
      {selectedEvent && (
        <div className="mt-2 flex items-center justify-between rounded-lg border border-amber-500/40 bg-amber-950/40 px-3 py-2 text-xs">
          <div className="flex items-center space-x-2">
            <Flame className="h-4 w-4 text-amber-400 animate-pulse" />
            <span className="font-bold text-amber-300">{t.macroEventPin}</span>
            <span className="text-slate-200">{selectedEvent}</span>
          </div>
          <button
            onClick={() => setSelectedEvent(null)}
            className="text-[10px] text-slate-400 hover:text-white"
          >
            {t.dismiss}
          </button>
        </div>
      )}

      {/* Bottom Chart Legend & Stats */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/60 pt-2.5 text-xs text-slate-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="text-slate-300">{t.wtiSpotLegend}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
            <span className="text-slate-300">{t.brentGlobalLegend}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-400" />
            <span className="text-slate-300">{t.spreadLegend}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
            <span className="text-slate-300">{t.catalystMarkersLegend}</span>
          </div>
        </div>

        <div className="font-mono text-[11px] text-slate-400">
          {t.chartRange} ${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)} | {t.settlementSource}
        </div>
      </div>
    </div>
  );
};
