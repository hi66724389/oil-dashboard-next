'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, Target } from 'lucide-react';

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

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-12 gap-3.5 h-full">
      {/* 1. S/R Critical Levels - Depth-of-Market (DOM) Price Ladder */}
      <div className="2xl:col-span-5 rounded-xl border border-slate-800/90 bg-slate-900/80 p-3.5 shadow-xl flex flex-col justify-between terminal-card terminal-accent-amber">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
            <div className="flex items-center space-x-2">
              <div className="h-7 w-7 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Target className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-white font-mono uppercase tracking-wide">
                  DOM 關鍵價位階梯 (Price Ladder)
                </h3>
                <p className="text-[10px] text-slate-400">機構掛單流動性牆與進出場錨點</p>
              </div>
            </div>
            <span className="text-[9px] font-mono rounded bg-slate-800 px-2 py-0.5 text-slate-300 border border-slate-700">
              USD/BBL
            </span>
          </div>

          {/* Depth of Market Ladder */}
          <div className="space-y-1.5 font-mono text-xs select-none">
            {/* R2 - Resistance Wall 2 */}
            <div className="relative overflow-hidden rounded border border-rose-900/40 bg-slate-950/70 p-2 hover:border-rose-500/60 transition-colors">
              {/* Liquidity Depth Bar Background */}
              <div
                className="absolute inset-y-0 right-0 bg-rose-500/15 transition-all duration-300 pointer-events-none"
                style={{ width: '85%' }}
              />
              <div className="relative flex items-center justify-between z-10">
                <div className="flex items-center space-x-2">
                  <span className="rounded bg-rose-500/20 text-rose-300 font-bold px-1.5 py-0.5 text-[10px] border border-rose-500/30">
                    R2
                  </span>
                  <span className="text-rose-300 text-[11px] font-medium hidden sm:inline">強壓力 / 突破防線</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] text-slate-500 tabular-nums font-mono">
                    +{((r2 - currentPrice) / currentPrice * 100).toFixed(1)}%
                  </span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => setR2(prev => Number((prev - 0.1).toFixed(2)))}
                      className="h-5 w-5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] flex items-center justify-center"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      step="0.05"
                      value={r2}
                      onChange={(e) => setR2(parseFloat(e.target.value) || 0)}
                      className="w-16 bg-slate-900 border border-slate-750 rounded px-1 py-0.5 text-right font-bold text-rose-300 text-xs focus:border-rose-500 outline-none"
                    />
                    <button
                      onClick={() => setR2(prev => Number((prev + 0.1).toFixed(2)))}
                      className="h-5 w-5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => { setTakeProfit(r2); }}
                    title="設為止盈目標 2"
                    className="px-1.5 py-0.5 rounded bg-rose-950/60 hover:bg-rose-900 text-rose-200 text-[10px] border border-rose-800/60"
                  >
                    TP2
                  </button>
                </div>
              </div>
            </div>

            {/* R1 - Resistance Wall 1 */}
            <div className="relative overflow-hidden rounded border border-rose-900/25 bg-slate-950/60 p-2 hover:border-rose-500/50 transition-colors">
              <div
                className="absolute inset-y-0 right-0 bg-rose-500/10 transition-all duration-300 pointer-events-none"
                style={{ width: '52%' }}
              />
              <div className="relative flex items-center justify-between z-10">
                <div className="flex items-center space-x-2">
                  <span className="rounded bg-rose-500/15 text-rose-400 font-bold px-1.5 py-0.5 text-[10px] border border-rose-500/20">
                    R1
                  </span>
                  <span className="text-rose-300/90 text-[11px] font-medium hidden sm:inline">短線壓力 / 前波高點</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] text-slate-500 tabular-nums font-mono">
                    +{((r1 - currentPrice) / currentPrice * 100).toFixed(1)}%
                  </span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => setR1(prev => Number((prev - 0.1).toFixed(2)))}
                      className="h-5 w-5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] flex items-center justify-center"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      step="0.05"
                      value={r1}
                      onChange={(e) => setR1(parseFloat(e.target.value) || 0)}
                      className="w-16 bg-slate-900 border border-slate-750 rounded px-1 py-0.5 text-right font-bold text-rose-200 text-xs focus:border-rose-500 outline-none"
                    />
                    <button
                      onClick={() => setR1(prev => Number((prev + 0.1).toFixed(2)))}
                      className="h-5 w-5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => { setTakeProfit(r1); }}
                    title="設為止盈目標 1"
                    className="px-1.5 py-0.5 rounded bg-rose-950/60 hover:bg-rose-900 text-rose-200 text-[10px] border border-rose-800/60"
                  >
                    TP1
                  </button>
                </div>
              </div>
            </div>

            {/* Current Reference Spot Line */}
            <div className="relative overflow-hidden rounded-md border-2 border-amber-500/60 bg-gradient-to-r from-amber-950/40 via-slate-900/90 to-amber-950/40 p-2.5 shadow-md shadow-amber-500/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
                  </span>
                  <span className="text-amber-400 font-bold text-xs">SPOT 現貨基準</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    step="0.05"
                    value={currentPrice}
                    onChange={(e) => setCurrentPrice(parseFloat(e.target.value) || 0)}
                    className="w-20 bg-slate-950 border border-amber-500/70 rounded px-1.5 py-0.5 text-right font-black text-amber-300 text-sm focus:ring-1 focus:ring-amber-400 outline-none tabular-nums"
                  />
                  <button
                    onClick={() => setEntryPrice(currentPrice)}
                    title="載入至進場價格"
                    className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-[10px] shadow hover:bg-amber-400 transition-colors"
                  >
                    ENTRY
                  </button>
                </div>
              </div>
            </div>

            {/* S1 - Support Wall 1 */}
            <div className="relative overflow-hidden rounded border border-emerald-900/25 bg-slate-950/60 p-2 hover:border-emerald-500/50 transition-colors">
              <div
                className="absolute inset-y-0 right-0 bg-emerald-500/10 transition-all duration-300 pointer-events-none"
                style={{ width: '60%' }}
              />
              <div className="relative flex items-center justify-between z-10">
                <div className="flex items-center space-x-2">
                  <span className="rounded bg-emerald-500/15 text-emerald-400 font-bold px-1.5 py-0.5 text-[10px] border border-emerald-500/20">
                    S1
                  </span>
                  <span className="text-emerald-300/90 text-[11px] font-medium hidden sm:inline">短線支撐 / 均線防線</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] text-slate-500 tabular-nums font-mono">
                    {((s1 - currentPrice) / currentPrice * 100).toFixed(1)}%
                  </span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => setS1(prev => Number((prev - 0.1).toFixed(2)))}
                      className="h-5 w-5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] flex items-center justify-center"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      step="0.05"
                      value={s1}
                      onChange={(e) => setS1(parseFloat(e.target.value) || 0)}
                      className="w-16 bg-slate-900 border border-slate-750 rounded px-1 py-0.5 text-right font-bold text-emerald-200 text-xs focus:border-emerald-500 outline-none"
                    />
                    <button
                      onClick={() => setS1(prev => Number((prev + 0.1).toFixed(2)))}
                      className="h-5 w-5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => { setStopLoss(s1); }}
                    title="設為止損防線 1"
                    className="px-1.5 py-0.5 rounded bg-emerald-950/60 hover:bg-emerald-900 text-emerald-200 text-[10px] border border-emerald-800/60"
                  >
                    SL1
                  </button>
                </div>
              </div>
            </div>

            {/* S2 - Support Wall 2 */}
            <div className="relative overflow-hidden rounded border border-emerald-900/40 bg-slate-950/70 p-2 hover:border-emerald-500/60 transition-colors">
              <div
                className="absolute inset-y-0 right-0 bg-emerald-500/15 transition-all duration-300 pointer-events-none"
                style={{ width: '90%' }}
              />
              <div className="relative flex items-center justify-between z-10">
                <div className="flex items-center space-x-2">
                  <span className="rounded bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 text-[10px] border border-emerald-500/30">
                    S2
                  </span>
                  <span className="text-emerald-300 text-[11px] font-medium hidden sm:inline">強力支撐 / 密集成交底</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] text-slate-500 tabular-nums font-mono">
                    {((s2 - currentPrice) / currentPrice * 100).toFixed(1)}%
                  </span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => setS2(prev => Number((prev - 0.1).toFixed(2)))}
                      className="h-5 w-5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] flex items-center justify-center"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      step="0.05"
                      value={s2}
                      onChange={(e) => setS2(parseFloat(e.target.value) || 0)}
                      className="w-16 bg-slate-900 border border-slate-750 rounded px-1 py-0.5 text-right font-bold text-emerald-300 text-xs focus:border-emerald-500 outline-none"
                    />
                    <button
                      onClick={() => setS2(prev => Number((prev + 0.1).toFixed(2)))}
                      className="h-5 w-5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => { setStopLoss(s2); }}
                    title="設為止損防線 2"
                    className="px-1.5 py-0.5 rounded bg-emerald-950/60 hover:bg-emerald-900 text-emerald-200 text-[10px] border border-emerald-800/60"
                  >
                    SL2
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[10px] font-mono text-slate-400 flex items-center justify-between">
          <span>* 點擊 TP/SL 按鈕即刻連動右側風控引擎</span>
          <span className="text-amber-400 font-medium">NYMEX 實時盤口映射</span>
        </div>
      </div>

      {/* 2. Position & Risk Engine */}
      <div className="2xl:col-span-7 rounded-xl border border-slate-800/90 bg-slate-900/80 p-3.5 shadow-xl flex flex-col justify-between terminal-card terminal-accent-emerald">
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
