'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Calculator, Target, SlidersHorizontal, ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';

interface TraderWorkstationProps {
  spotPrice?: number;
}

export const TraderWorkstation: React.FC<TraderWorkstationProps> = ({ spotPrice }) => {
  const initialBase = spotPrice && spotPrice > 0 ? spotPrice : 91.48;

  // S/R Levels State
  const [currentPrice, setCurrentPrice] = useState<number>(initialBase);
  const [r2, setR2] = useState<number>(Number((initialBase * 1.055).toFixed(2)));
  const [r1, setR1] = useState<number>(Number((initialBase * 1.025).toFixed(2)));
  const [s1, setS1] = useState<number>(Number((initialBase * 0.975).toFixed(2)));
  const [s2, setS2] = useState<number>(Number((initialBase * 0.945).toFixed(2)));

  // Position Calculator State
  const [direction, setDirection] = useState<'BUY' | 'SELL'>('BUY');
  const [contractType, setContractType] = useState<'CFD_BARREL' | 'FUTURES_1000' | 'CRYPTO_PERP'>('CFD_BARREL');
  const [entryPrice, setEntryPrice] = useState<number>(initialBase);
  const [stopLoss, setStopLoss] = useState<number>(Number((initialBase * 0.975).toFixed(2)));
  const [takeProfit, setTakeProfit] = useState<number>(Number((initialBase * 1.05).toFixed(2)));
  const [lotSize, setLotSize] = useState<number>(100); // 100 barrels or 1 future

  // DOM Ladder Controls
  const [tickSize, setTickSize] = useState<number>(0.05);
  const [viewMode, setViewMode] = useState<'ALL' | 'ASKS' | 'BIDS'>('ALL');
  const [showConfigSR, setShowConfigSR] = useState<boolean>(false);

  // Synchronize when real-time API fetches updated market spot price
  useEffect(() => {
    if (spotPrice && spotPrice > 0 && Math.abs(spotPrice - currentPrice) > 0.05) {
      setCurrentPrice(spotPrice);
      setR2(Number((spotPrice * 1.055).toFixed(2)));
      setR1(Number((spotPrice * 1.025).toFixed(2)));
      setS1(Number((spotPrice * 0.975).toFixed(2)));
      setS2(Number((spotPrice * 0.945).toFixed(2)));
      setEntryPrice(spotPrice);
      setStopLoss(Number((spotPrice * 0.975).toFixed(2)));
      setTakeProfit(Number((spotPrice * 1.05).toFixed(2)));
    }
  }, [spotPrice]);

  // Math Calculations
  const multiplier = contractType === 'FUTURES_1000' ? 1000 : 1;
  const totalBarrels = lotSize * multiplier;

  const riskPerBarrel = Math.max(0.01, direction === 'BUY' ? entryPrice - stopLoss : stopLoss - entryPrice);
  const rewardPerBarrel = Math.max(0, direction === 'BUY' ? takeProfit - entryPrice : entryPrice - takeProfit);

  const totalRiskUSD = riskPerBarrel * totalBarrels;
  const totalRewardUSD = rewardPerBarrel * totalBarrels;
  const rrRatio = riskPerBarrel > 0 ? (rewardPerBarrel / riskPerBarrel).toFixed(2) : '0.00';
  const rewardRiskPercent = totalRiskUSD + totalRewardUSD > 0 
    ? Math.round((totalRewardUSD / (totalRiskUSD + totalRewardUSD)) * 100) 
    : 50;

  // Auto Risk Sizer
  const handleAutoRiskSize = (targetRiskUSD: number) => {
    if (riskPerBarrel <= 0) return;
    const computedLots = Math.max(1, Math.round(targetRiskUSD / (riskPerBarrel * multiplier)));
    setLotSize(computedLots);
  };

  // Generate Real-time L2 Ladder Data
  const { sortedAsks, bids, bidRatio, askRatio } = useMemo(() => {
    const rowCount = viewMode === 'ALL' ? 7 : 14;

    // Generate Asks
    const askRawList: Array<{
      price: number;
      size: number;
      isWhaleWall: boolean;
      tag?: string;
      tagType?: 'R2' | 'R1' | 'WHALE' | 'USER';
      userBadge?: 'ENTRY' | 'TP' | 'SL';
    }> = [];

    for (let i = 1; i <= rowCount; i++) {
      const price = Number((currentPrice + i * tickSize).toFixed(2));
      const isNearR2 = Math.abs(price - r2) < tickSize * 0.7;
      const isNearR1 = Math.abs(price - r1) < tickSize * 0.7;
      const isPeriodicWhale = Math.round(price * 100) % 7 === 0 && i > 2;
      const isWhale = isNearR2 || isNearR1 || isPeriodicWhale;

      let baseSize = 180 + ((Math.round(price * 17) % 290));
      if (isNearR2) baseSize = 3420 + ((Math.round(price * 31) % 450));
      else if (isNearR1) baseSize = 2240 + ((Math.round(price * 23) % 320));
      else if (isWhale) baseSize = 1680 + ((Math.round(price * 19) % 290));

      let tag: string | undefined;
      let tagType: 'R2' | 'R1' | 'WHALE' | 'USER' | undefined;
      if (isNearR2) {
        tag = 'R2 突破防線';
        tagType = 'R2';
      } else if (isNearR1) {
        tag = 'R1 前高阻力';
        tagType = 'R1';
      } else if (isWhale) {
        tag = '🐳 巨鯨賣壓牆';
        tagType = 'WHALE';
      }

      let userBadge: 'ENTRY' | 'TP' | 'SL' | undefined;
      if (Math.abs(price - takeProfit) < tickSize * 0.51) userBadge = 'TP';
      else if (Math.abs(price - stopLoss) < tickSize * 0.51) userBadge = 'SL';
      else if (Math.abs(price - entryPrice) < tickSize * 0.51) userBadge = 'ENTRY';

      askRawList.push({ price, size: baseSize, isWhaleWall: isWhale, tag, tagType, userBadge });
    }

    let askRunningTotal = 0;
    for (const item of askRawList) askRunningTotal += item.size;
    const maxAskTotal = askRunningTotal || 1;
    let askAcc = 0;
    const computedAsks = askRawList.map((item) => {
      askAcc += item.size;
      return {
        ...item,
        total: askAcc,
        depthPercent: Math.min(100, Math.round((askAcc / maxAskTotal) * 100)),
      };
    });
    const sortedAsks = [...computedAsks].reverse();

    // Generate Bids
    const bidRawList: Array<{
      price: number;
      size: number;
      isWhaleWall: boolean;
      tag?: string;
      tagType?: 'S2' | 'S1' | 'WHALE' | 'USER';
      userBadge?: 'ENTRY' | 'TP' | 'SL';
    }> = [];

    for (let i = 1; i <= rowCount; i++) {
      const price = Number((currentPrice - i * tickSize).toFixed(2));
      const isNearS2 = Math.abs(price - s2) < tickSize * 0.7;
      const isNearS1 = Math.abs(price - s1) < tickSize * 0.7;
      const isPeriodicWhale = Math.round(price * 100) % 6 === 0 && i > 2;
      const isWhale = isNearS2 || isNearS1 || isPeriodicWhale;

      let baseSize = 210 + ((Math.round(price * 29) % 310));
      if (isNearS2) baseSize = 3680 + ((Math.round(price * 41) % 520));
      else if (isNearS1) baseSize = 2390 + ((Math.round(price * 19) % 380));
      else if (isWhale) baseSize = 1750 + ((Math.round(price * 23) % 310));

      let tag: string | undefined;
      let tagType: 'S2' | 'S1' | 'WHALE' | 'USER' | undefined;
      if (isNearS2) {
        tag = 'S2 密集買盤底';
        tagType = 'S2';
      } else if (isNearS1) {
        tag = 'S1 均線防線';
        tagType = 'S1';
      } else if (isWhale) {
        tag = '🐳 巨鯨托盤牆';
        tagType = 'WHALE';
      }

      let userBadge: 'ENTRY' | 'TP' | 'SL' | undefined;
      if (Math.abs(price - takeProfit) < tickSize * 0.51) userBadge = 'TP';
      else if (Math.abs(price - stopLoss) < tickSize * 0.51) userBadge = 'SL';
      else if (Math.abs(price - entryPrice) < tickSize * 0.51) userBadge = 'ENTRY';

      bidRawList.push({ price, size: baseSize, isWhaleWall: isWhale, tag, tagType, userBadge });
    }

    let bidRunningTotal = 0;
    for (const item of bidRawList) bidRunningTotal += item.size;
    const maxBidTotal = bidRunningTotal || 1;
    let bidAcc = 0;
    const computedBids = bidRawList.map((item) => {
      bidAcc += item.size;
      return {
        ...item,
        total: bidAcc,
        depthPercent: Math.min(100, Math.round((bidAcc / maxBidTotal) * 100)),
      };
    });

    const totalDepth = askRunningTotal + bidRunningTotal || 1;
    const bidRatio = Number(((bidRunningTotal / totalDepth) * 100).toFixed(1));
    const askRatio = Number((100 - bidRatio).toFixed(1));

    return { sortedAsks, bids: computedBids, bidRatio, askRatio };
  }, [currentPrice, tickSize, viewMode, r2, r1, s1, s2, takeProfit, stopLoss, entryPrice]);

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-12 gap-3.5 h-full">
      {/* 1. S/R Critical Levels - Depth-of-Market (DOM) Price Ladder */}
      <div className="2xl:col-span-6 rounded-xl border border-slate-800/90 bg-slate-900/80 p-3.5 shadow-xl flex flex-col justify-between terminal-card terminal-accent-amber min-h-[580px]">
        <div>
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800/80 pb-2.5 mb-2.5 gap-2">
            <div className="flex items-center space-x-2">
              <div className="h-7 w-7 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Target className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-xs sm:text-sm text-white font-mono uppercase tracking-wide">
                    L2 深度與主力掛單階梯 (L2 DOM Ladder)
                  </h3>
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <p className="text-[10px] text-slate-400">交易所逐檔盤口 • 巨鯨掛單牆與機構流動性映射</p>
              </div>
            </div>

            {/* Controls: Tick Aggregation & Filter Tabs */}
            <div className="flex items-center space-x-2">
              {/* View Mode Toggle */}
              <div className="flex rounded border border-slate-800 bg-slate-950 p-0.5 text-[10px] font-mono">
                <button
                  onClick={() => setViewMode('ALL')}
                  className={`px-1.5 py-0.5 rounded transition-all ${
                    viewMode === 'ALL' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="顯示買賣雙向深度"
                >
                  全部
                </button>
                <button
                  onClick={() => setViewMode('ASKS')}
                  className={`px-1.5 py-0.5 rounded transition-all ${
                    viewMode === 'ASKS' ? 'bg-rose-950 text-rose-300 font-bold border border-rose-800/50' : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="僅看賣盤阻力"
                >
                  賣盤
                </button>
                <button
                  onClick={() => setViewMode('BIDS')}
                  className={`px-1.5 py-0.5 rounded transition-all ${
                    viewMode === 'BIDS' ? 'bg-emerald-950 text-emerald-300 font-bold border border-emerald-800/50' : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="僅看買盤支撐"
                >
                  買盤
                </button>
              </div>

              {/* Tick Size Aggregator */}
              <div className="flex items-center space-x-1 text-[10px] font-mono bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5">
                <span className="text-slate-500 hidden sm:inline">步長:</span>
                {[0.01, 0.05, 0.1, 0.5].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTickSize(t)}
                    className={`px-1 rounded font-bold transition-all ${
                      tickSize === t ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.toFixed(2)}
                  </button>
                ))}
              </div>

              {/* Quick S/R Fine-Tuner Toggle */}
              <button
                onClick={() => setShowConfigSR(!showConfigSR)}
                className={`p-1 rounded border text-[10px] font-mono transition-colors ${
                  showConfigSR ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
                title="自訂 R1/R2/S1/S2 核心數值"
              >
                <SlidersHorizontal className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Optional Collapsible S/R Fine-Tuner */}
          {showConfigSR && (
            <div className="mb-2.5 p-2 rounded-lg bg-slate-950/90 border border-amber-500/30 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono animate-fadeIn">
              <div>
                <span className="text-rose-400 block mb-0.5">R2 突破防線:</span>
                <input
                  type="number"
                  step="0.05"
                  value={r2}
                  onChange={(e) => setR2(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-rose-900/60 rounded px-1.5 py-0.5 text-rose-300 font-bold outline-none"
                />
              </div>
              <div>
                <span className="text-rose-300/80 block mb-0.5">R1 前高阻力:</span>
                <input
                  type="number"
                  step="0.05"
                  value={r1}
                  onChange={(e) => setR1(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-rose-900/40 rounded px-1.5 py-0.5 text-rose-300/90 font-bold outline-none"
                />
              </div>
              <div>
                <span className="text-emerald-300/80 block mb-0.5">S1 均線防線:</span>
                <input
                  type="number"
                  step="0.05"
                  value={s1}
                  onChange={(e) => setS1(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-emerald-900/40 rounded px-1.5 py-0.5 text-emerald-300/90 font-bold outline-none"
                />
              </div>
              <div>
                <span className="text-emerald-400 block mb-0.5">S2 密集買盤:</span>
                <input
                  type="number"
                  step="0.05"
                  value={s2}
                  onChange={(e) => setS2(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-emerald-900/60 rounded px-1.5 py-0.5 text-emerald-300 font-bold outline-none"
                />
              </div>
            </div>
          )}

          {/* OBI: Order Book Imbalance / Liquidity Ratio Bar */}
          <div className="mb-2 px-2.5 py-1 rounded bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
            <div className="flex items-center space-x-1 text-emerald-400 font-bold">
              <span>買盤深度</span>
              <span>{bidRatio.toFixed(1)}%</span>
            </div>
            <div className="flex-1 mx-3 h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${bidRatio}%` }} />
              <div className="bg-rose-500 h-full transition-all duration-300" style={{ width: `${askRatio}%` }} />
            </div>
            <div className="flex items-center space-x-1 text-rose-400 font-bold">
              <span>{askRatio.toFixed(1)}%</span>
              <span>賣盤深度</span>
            </div>
          </div>

          {/* Table Column Headers */}
          <div className="grid grid-cols-12 gap-1 px-2 py-1 bg-slate-950/90 rounded text-[10px] font-mono text-slate-500 font-bold border-b border-slate-800/80 mb-1">
            <div className="col-span-4">主力掛單 / 關鍵標籤</div>
            <div className="col-span-2 text-right">價格 ($)</div>
            <div className="col-span-2 text-right">掛單量 (BBL)</div>
            <div className="col-span-2 text-right hidden sm:block">累計總量</div>
            <div className="col-span-4 sm:col-span-2 text-right">設單操作</div>
          </div>

          {/* Continuous DOM Price Ladder */}
          <div className="space-y-0.5 max-h-[390px] overflow-y-auto pr-0.5 scrollbar-thin scrollbar-thumb-slate-800">
            {/* ASKS (Sell Orders) */}
            {(viewMode === 'ALL' || viewMode === 'ASKS') &&
              sortedAsks.map((row) => (
                <div
                  key={`ask-${row.price}`}
                  className={`group relative grid grid-cols-12 gap-1 px-2 py-0.5 rounded text-[11px] font-mono items-center transition-colors border ${
                    row.userBadge
                      ? 'border-amber-500/70 bg-amber-500/10'
                      : row.isWhaleWall
                      ? 'border-rose-900/60 bg-rose-950/20 hover:border-rose-500/50'
                      : 'border-transparent hover:bg-slate-800/40'
                  }`}
                >
                  {/* Depth Bar Background */}
                  <div
                    className="absolute inset-y-0 right-0 bg-rose-500/10 pointer-events-none transition-all duration-300"
                    style={{ width: `${row.depthPercent}%` }}
                  />

                  {/* 1. Tag / Signal */}
                  <div className="col-span-4 flex items-center space-x-1.5 z-10 truncate">
                    {row.userBadge === 'TP' ? (
                      <span className="px-1 py-0.2 rounded bg-rose-500 text-slate-950 font-black text-[9px] shadow-sm">
                        🎯 TP 止盈
                      </span>
                    ) : row.userBadge === 'SL' ? (
                      <span className="px-1 py-0.2 rounded bg-emerald-500 text-slate-950 font-black text-[9px] shadow-sm">
                        🛡️ SL 止損
                      </span>
                    ) : row.userBadge === 'ENTRY' ? (
                      <span className="px-1 py-0.2 rounded bg-amber-500 text-slate-950 font-black text-[9px] shadow-sm">
                        ⚡ ENTRY
                      </span>
                    ) : row.tagType === 'R2' ? (
                      <span className="px-1 py-0.2 rounded bg-rose-500/25 text-rose-300 font-bold text-[9px] border border-rose-500/40">
                        {row.tag}
                      </span>
                    ) : row.tagType === 'R1' ? (
                      <span className="px-1 py-0.2 rounded bg-rose-500/15 text-rose-400 font-bold text-[9px] border border-rose-500/30">
                        {row.tag}
                      </span>
                    ) : row.isWhaleWall ? (
                      <span className="px-1 py-0.2 rounded bg-amber-500/15 text-amber-300 font-bold text-[9px] border border-amber-500/30 flex items-center space-x-1">
                        <span>{row.tag}</span>
                      </span>
                    ) : (
                      <span className="text-slate-600 text-[10px]">
                        +{((row.price - currentPrice) / currentPrice * 100).toFixed(1)}%
                      </span>
                    )}
                  </div>

                  {/* 2. Price */}
                  <div className="col-span-2 text-right font-bold text-rose-400 z-10 tabular-nums">
                    ${row.price.toFixed(2)}
                  </div>

                  {/* 3. Size */}
                  <div className={`col-span-2 text-right z-10 tabular-nums ${row.isWhaleWall ? 'font-bold text-rose-300' : 'text-slate-300'}`}>
                    {row.size.toLocaleString()}
                  </div>

                  {/* 4. Total */}
                  <div className="col-span-2 text-right text-slate-500 text-[10px] z-10 tabular-nums hidden sm:block">
                    {row.total.toLocaleString()}
                  </div>

                  {/* 5. Quick Action */}
                  <div className="col-span-4 sm:col-span-2 text-right z-10 flex items-center justify-end space-x-1">
                    <button
                      onClick={() => setTakeProfit(row.price)}
                      className="opacity-60 group-hover:opacity-100 px-1 py-0.2 rounded bg-rose-950 hover:bg-rose-900 text-rose-200 text-[9px] font-bold border border-rose-800/60 transition-opacity"
                      title="設為止盈位 (TP)"
                    >
                      TP
                    </button>
                    <button
                      onClick={() => setEntryPrice(row.price)}
                      className="opacity-0 group-hover:opacity-100 px-1 py-0.2 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-[9px] font-bold transition-all"
                      title="設為進場價"
                    >
                      入
                    </button>
                  </div>
                </div>
              ))}

            {/* Current Reference Spot Line (Center Band) */}
            {viewMode === 'ALL' && (
              <div className="relative my-1 rounded border border-amber-500/60 bg-gradient-to-r from-amber-950/40 via-slate-900/90 to-amber-950/40 px-2 py-1 shadow-md shadow-amber-500/10 flex items-center justify-between text-xs font-mono z-20">
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
                  </span>
                  <span className="text-amber-300 font-bold text-[11px]">SPOT 現貨基準</span>
                  <span className="text-[10px] text-slate-400 hidden sm:inline">點差: 1 tick ($0.01)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm sm:text-base font-black text-amber-300 tabular-nums">
                    ${currentPrice.toFixed(2)}
                  </span>
                  <button
                    onClick={() => setEntryPrice(currentPrice)}
                    className="px-2 py-0.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] transition-colors shadow-sm"
                    title="載入至進場價格"
                  >
                    ENTRY
                  </button>
                </div>
              </div>
            )}

            {/* BIDS (Buy Orders) */}
            {(viewMode === 'ALL' || viewMode === 'BIDS') &&
              bids.map((row) => (
                <div
                  key={`bid-${row.price}`}
                  className={`group relative grid grid-cols-12 gap-1 px-2 py-0.5 rounded text-[11px] font-mono items-center transition-colors border ${
                    row.userBadge
                      ? 'border-amber-500/70 bg-amber-500/10'
                      : row.isWhaleWall
                      ? 'border-emerald-900/60 bg-emerald-950/20 hover:border-emerald-500/50'
                      : 'border-transparent hover:bg-slate-800/40'
                  }`}
                >
                  {/* Depth Bar Background */}
                  <div
                    className="absolute inset-y-0 right-0 bg-emerald-500/10 pointer-events-none transition-all duration-300"
                    style={{ width: `${row.depthPercent}%` }}
                  />

                  {/* 1. Tag / Signal */}
                  <div className="col-span-4 flex items-center space-x-1.5 z-10 truncate">
                    {row.userBadge === 'TP' ? (
                      <span className="px-1 py-0.2 rounded bg-rose-500 text-slate-950 font-black text-[9px] shadow-sm">
                        🎯 TP 止盈
                      </span>
                    ) : row.userBadge === 'SL' ? (
                      <span className="px-1 py-0.2 rounded bg-emerald-500 text-slate-950 font-black text-[9px] shadow-sm">
                        🛡️ SL 止損
                      </span>
                    ) : row.userBadge === 'ENTRY' ? (
                      <span className="px-1 py-0.2 rounded bg-amber-500 text-slate-950 font-black text-[9px] shadow-sm">
                        ⚡ ENTRY
                      </span>
                    ) : row.tagType === 'S2' ? (
                      <span className="px-1 py-0.2 rounded bg-emerald-500/25 text-emerald-200 font-bold text-[9px] border border-emerald-500/40">
                        {row.tag}
                      </span>
                    ) : row.tagType === 'S1' ? (
                      <span className="px-1 py-0.2 rounded bg-emerald-500/15 text-emerald-300 font-bold text-[9px] border border-emerald-500/30">
                        {row.tag}
                      </span>
                    ) : row.isWhaleWall ? (
                      <span className="px-1 py-0.2 rounded bg-amber-500/15 text-amber-300 font-bold text-[9px] border border-amber-500/30 flex items-center space-x-1">
                        <span>{row.tag}</span>
                      </span>
                    ) : (
                      <span className="text-slate-600 text-[10px]">
                        -{(Math.abs(row.price - currentPrice) / currentPrice * 100).toFixed(1)}%
                      </span>
                    )}
                  </div>

                  {/* 2. Price */}
                  <div className="col-span-2 text-right font-bold text-emerald-400 z-10 tabular-nums">
                    ${row.price.toFixed(2)}
                  </div>

                  {/* 3. Size */}
                  <div className={`col-span-2 text-right z-10 tabular-nums ${row.isWhaleWall ? 'font-bold text-emerald-300' : 'text-slate-300'}`}>
                    {row.size.toLocaleString()}
                  </div>

                  {/* 4. Total */}
                  <div className="col-span-2 text-right text-slate-500 text-[10px] z-10 tabular-nums hidden sm:block">
                    {row.total.toLocaleString()}
                  </div>

                  {/* 5. Quick Action */}
                  <div className="col-span-4 sm:col-span-2 text-right z-10 flex items-center justify-end space-x-1">
                    <button
                      onClick={() => setStopLoss(row.price)}
                      className="opacity-60 group-hover:opacity-100 px-1 py-0.2 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-200 text-[9px] font-bold border border-emerald-800/60 transition-opacity"
                      title="設為止損防線 (SL)"
                    >
                      SL
                    </button>
                    <button
                      onClick={() => setEntryPrice(row.price)}
                      className="opacity-0 group-hover:opacity-100 px-1 py-0.2 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-[9px] font-bold transition-all"
                      title="設為進場價"
                    >
                      入
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400 flex items-center justify-between">
          <span className="flex items-center space-x-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-400/80" />
            <span>* 點選任意檔位 [TP / SL / 入] 立即連動右側風控試算</span>
          </span>
          <span className="text-amber-400 font-semibold hidden sm:inline">🐳 巨鯨大單流動性牆</span>
        </div>
      </div>

      {/* 2. Position & Risk Engine */}
      <div className="2xl:col-span-6 rounded-xl border border-slate-800/90 bg-slate-900/80 p-3.5 shadow-xl flex flex-col justify-between terminal-card terminal-accent-emerald min-h-[580px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
          <div className="flex items-center space-x-2">
            <div className="h-7 w-7 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Calculator className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-white font-mono uppercase tracking-wide">
                倉位與風險試算 (Position & Risk Engine)
              </h3>
              <p className="text-[10px] text-slate-400">NYMEX CL 原油期貨與現貨 CFD 機構級風控</p>
            </div>
          </div>

          <div className="flex rounded-md border border-slate-800 bg-slate-950 p-0.5 text-xs font-mono">
            <button
              onClick={() => setDirection('BUY')}
              className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                direction === 'BUY'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              做多 LONG
            </button>
            <button
              onClick={() => setDirection('SELL')}
              className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                direction === 'SELL'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              做空 SHORT
            </button>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs mb-3 font-mono">
          <div>
            <label className="text-[10px] text-slate-400 mb-1 block">合約模式</label>
            <select
              value={contractType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setContractType(e.target.value as 'CFD_BARREL' | 'FUTURES_1000' | 'CRYPTO_PERP')
              }
              className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 font-mono text-white text-xs focus:border-amber-500 outline-none"
            >
              <option value="CFD_BARREL">CFD 現貨 (1 桶/手)</option>
              <option value="CRYPTO_PERP">加密永續 (Binance CLUSDT 1桶)</option>
              <option value="FUTURES_1000">NYMEX 標準期貨 (1,000 桶/口)</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 mb-1 block">
              {contractType === 'FUTURES_1000' ? '合約手數 (Lots)' : '合約桶數 (Barrels)'}
            </label>
            <input
              type="number"
              value={lotSize}
              onChange={(e) => setLotSize(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 font-mono text-white text-xs focus:border-amber-500 outline-none font-bold"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 mb-1 block">進場價格 (Entry Price)</label>
            <input
              type="number"
              step="0.05"
              value={entryPrice}
              onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 font-mono text-amber-300 text-xs focus:border-amber-500 outline-none font-bold"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 mb-1 block">止損點位 (Stop Loss)</label>
            <input
              type="number"
              step="0.05"
              value={stopLoss}
              onChange={(e) => setStopLoss(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-rose-900/50 rounded p-1.5 font-mono text-rose-400 text-xs focus:border-rose-500 outline-none font-bold"
            />
          </div>
        </div>

        {/* Take Profit Target & Smart Sizing Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 mb-3 text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 text-[11px]">停利目標位 (TP):</span>
            <input
              type="number"
              step="0.05"
              value={takeProfit}
              onChange={(e) => setTakeProfit(parseFloat(e.target.value) || 0)}
              className="w-20 bg-slate-900 border border-emerald-900/50 rounded px-2 py-0.5 text-emerald-400 font-bold text-xs"
            />
          </div>

          {/* Quick Risk Auto-Sizers */}
          <div className="flex items-center space-x-1.5 text-[10px]">
            <span className="text-slate-500">固定金額風控:</span>
            {[1000, 2500, 5000].map((amt) => (
              <button
                key={amt}
                onClick={() => handleAutoRiskSize(amt)}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors font-bold"
                title={`自動計算固定風險為 $${amt.toLocaleString()} 的手數`}
              >
                ${amt >= 1000 ? `${amt / 1000}k` : amt}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Risk vs Reward Ratio Bar */}
        <div className="mb-3 rounded-lg bg-slate-950/50 border border-slate-800/60 p-2 font-mono">
          <div className="flex items-center justify-between text-[10px] mb-1">
            <span className="text-rose-400">風險曝險: ${totalRiskUSD.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
            <span className="text-slate-400">R:R 風報比 <strong className="text-amber-400">{rrRatio}</strong></span>
            <span className="text-emerald-400">預期利潤: +${totalRewardUSD.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="h-2 w-full flex rounded-full overflow-hidden bg-slate-800">
            <div
              className="bg-rose-500 transition-all duration-300"
              style={{ width: `${100 - rewardRiskPercent}%` }}
            />
            <div
              className="bg-emerald-500 transition-all duration-300"
              style={{ width: `${rewardRiskPercent}%` }}
            />
          </div>
        </div>

        {/* Results Matrix */}
        <div className="grid grid-cols-3 gap-2.5 font-mono text-center">
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/90">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">總曝險金額 (Risk)</div>
            <div className="text-base sm:text-lg font-black text-rose-400 tabular-nums">
              ${totalRiskUSD > 0 ? totalRiskUSD.toLocaleString('en-US', { maximumFractionDigits: 0 }) : '0'}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5 tabular-nums">
              每桶風險: ${riskPerBarrel.toFixed(2)}
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/90">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">預期回報 (Reward)</div>
            <div className="text-base sm:text-lg font-black text-emerald-400 tabular-nums">
              +${totalRewardUSD > 0 ? totalRewardUSD.toLocaleString('en-US', { maximumFractionDigits: 0 }) : '0'}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5 tabular-nums">
              每桶獲利: +${rewardPerBarrel.toFixed(2)}
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/90">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">風報比 (R:R Ratio)</div>
            <div className={`text-base sm:text-lg font-black tabular-nums ${parseFloat(rrRatio) >= 2 ? 'text-emerald-400' : parseFloat(rrRatio) >= 1.5 ? 'text-amber-400' : 'text-rose-400'}`}>
              1 : {rrRatio}
            </div>
            <div className="text-[9px] text-slate-400 mt-0.5 truncate">
              {parseFloat(rrRatio) >= 2 ? '🔥 機構級優質風報比' : parseFloat(rrRatio) >= 1.5 ? '合格風報比' : '⚠️ 盈虧比偏低'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
