'use client';

import React from 'react';
import {
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { formatCurrency, formatPercent, formatChange } from '@/lib/formatters';
import { SpreadData, TickerData } from '@/types/oil';
import { useLanguage } from '@/context/LanguageContext';

interface TickerGridProps {
  tickers: TickerData[];
  spreads: SpreadData[];
  selectedSymbol: string;
  onSelectSymbol: (symbol: string) => void;
  currencyMultiplier?: number;
  currencySymbol?: string;
}

export const TickerGrid: React.FC<TickerGridProps> = ({
  tickers,
  spreads,
  selectedSymbol,
  onSelectSymbol,
  currencyMultiplier = 1,
  currencySymbol = '$',
}) => {
  const { t } = useLanguage();

  const getLocalizedCategory = (cat: string) => {
    switch (cat) {
      case 'Crude':
        return t.catCrude;
      case 'Crypto':
        return t.catCrypto || '加密合約';
      case 'Refined':
        return t.catRefined;
      case 'Spread':
        return t.catSpread;
      case 'Macro':
        return t.catMacro;
      default:
        return cat;
    }
  };

  return (
    <div className="space-y-4">
      {/* Benchmark Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-9">
        {tickers.map((ticker) => {
          const isSelected = selectedSymbol === ticker.symbol;
          const isPositive = ticker.change >= 0;
          const convertedPrice = ticker.currency ? ticker.price * currencyMultiplier : ticker.price;
          const currSign = ticker.currency ? currencySymbol : '';

          // Sparkline calculations
          const min = Math.min(...ticker.sparkline);
          const max = Math.max(...ticker.sparkline);
          const range = max - min || 1;
          const points = ticker.sparkline
            .map((val, idx) => {
              const x = (idx / (ticker.sparkline.length - 1)) * 120;
              const y = 36 - ((val - min) / range) * 28;
              return `${x},${y}`;
            })
            .join(' ');

          // Day range percentage
          const dayRange = ticker.high24h - ticker.low24h || 1;
          const dayPosPercent = Math.min(
            100,
            Math.max(0, ((ticker.price - ticker.low24h) / dayRange) * 100)
          );

          return (
            <div
              key={ticker.symbol}
              onClick={() => onSelectSymbol(ticker.symbol)}
              className={`group relative cursor-pointer rounded-xl border p-3.5 transition-all duration-200 ${
                isSelected
                  ? 'border-amber-500/80 bg-slate-900/90 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/50'
                  : 'border-slate-800/80 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              {/* Top Row: Symbol & Category */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <span className="font-mono text-xs font-bold tracking-wider text-amber-400">
                    {ticker.symbol}
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.2 text-[9px] font-semibold ${
                      ticker.category === 'Crypto'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {ticker.exchange || getLocalizedCategory(ticker.category)}
                  </span>
                </div>
                <div
                  className={`flex items-center space-x-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold ${
                    isPositive
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-rose-500/10 text-rose-400'
                  }`}
                >
                  {isPositive ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  <span>{formatPercent(ticker.changePercent)}</span>
                </div>
              </div>

              {/* Middle Row: Name & Spot Price */}
              <div className="mt-2">
                <div className="truncate text-[11px] text-slate-400" title={ticker.name}>
                  {ticker.name}
                </div>
                <div className="mt-0.5 flex items-baseline space-x-2">
                  <span className="font-mono text-lg font-bold text-white sm:text-xl">
                    {formatCurrency(
                      convertedPrice,
                      ticker.symbol.includes('RB') || ticker.symbol.includes('HO') ? 3 : 2,
                      currSign
                    )}
                  </span>
                  <span
                    className={`font-mono text-xs font-medium ${
                      isPositive ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {formatChange(
                      ticker.change * (ticker.currency ? currencyMultiplier : 1),
                      ticker.symbol.includes('RB') || ticker.symbol.includes('HO') ? 3 : 2,
                      currSign
                    )}
                  </span>
                </div>
              </div>

              {/* Mini Sparkline SVG */}
              <div className="mt-2 flex h-9 w-full items-center">
                <svg className="h-full w-full overflow-visible" viewBox="0 0 120 36">
                  <defs>
                    <linearGradient id={`grad-${ticker.symbol}`} x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor={isPositive ? '#10b981' : '#f43f5e'}
                        stopOpacity="0.3"
                      />
                      <stop
                        offset="100%"
                        stopColor={isPositive ? '#10b981' : '#f43f5e'}
                        stopOpacity="0.0"
                      />
                    </linearGradient>
                  </defs>
                  <polygon
                    points={`0,36 ${points} 120,36`}
                    fill={`url(#grad-${ticker.symbol})`}
                  />
                  <polyline
                    fill="none"
                    stroke={isPositive ? '#10b981' : '#f43f5e'}
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                  />
                </svg>
              </div>

              {/* 24h High/Low bar */}
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>{t.low}: {ticker.low24h.toFixed(2)}</span>
                  <span>{t.high}: {ticker.high24h.toFixed(2)}</span>
                </div>
                <div className="relative h-1 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full ${
                      isPositive ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${dayPosPercent}%` }}
                  />
                </div>
              </div>

              {/* Bottom detail pill */}
              <div className="mt-2 flex items-center justify-between border-t border-slate-800/60 pt-1.5 text-[10px] text-slate-500">
                {ticker.category === 'Crypto' && ticker.fundingRate !== undefined ? (
                  <span className="text-amber-400/90 font-mono">
                    費率: {(ticker.fundingRate * 100).toFixed(4)}%
                  </span>
                ) : (
                  <span>{t.volume}: {ticker.volume}</span>
                )}
                <span className="font-mono">{ticker.unit}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Oil Spreads & Differentials Ribbon */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {spreads.map((spread) => (
          <div
            key={spread.id}
            className="flex items-center justify-between rounded-lg border border-slate-800/70 bg-slate-900/40 px-3 py-2 text-xs hover:border-slate-700/80 transition-colors"
          >
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-semibold text-slate-200">{spread.name}</span>
                <span
                  className={`rounded px-1 py-0.2 text-[9px] font-mono ${
                    spread.trend === 'widening'
                      ? 'bg-amber-500/10 text-amber-300'
                      : 'bg-blue-500/10 text-blue-300'
                  }`}
                >
                  {spread.trend === 'widening' ? t.widening : t.narrowing}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 truncate max-w-[200px]">
                {spread.description}
              </div>
            </div>

            <div className="text-right">
              <div className="font-mono font-bold text-white">${spread.value.toFixed(2)}</div>
              <div
                className={`font-mono text-[10px] font-semibold ${
                  spread.change >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {spread.change >= 0 ? '+' : ''}${spread.change.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
