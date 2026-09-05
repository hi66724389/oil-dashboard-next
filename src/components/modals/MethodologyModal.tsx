'use client';

import React from 'react';
import { X, ShieldAlert, Flame, Droplets, PieChart, DollarSign, CheckCircle2, Zap } from 'lucide-react';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">
              PetroPulse™ Sentiment Algorithm Methodology
            </h2>
            <p className="text-xs text-slate-400">Quantitative Bayesian multi-factor weighting model</p>
          </div>
        </div>

        <div className="mt-4 space-y-4 text-xs text-slate-300">
          <p className="leading-relaxed">
            The <strong>PetroPulse Global Sentiment Score (0–100)</strong> synthesizes 28 quantitative and qualitative macro feeds into a single unified barometer calibrated against WTI and Brent prompt pricing.
          </p>

          <div className="space-y-3">
            <h3 className="font-bold uppercase tracking-wider text-amber-400">Factor Weight Allocation:</h3>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <div className="flex items-center justify-between font-bold text-white">
                  <span className="flex items-center space-x-1.5 text-rose-400">
                    <ShieldAlert className="h-4 w-4" />
                    <span>Geopolitical Risk (25%)</span>
                  </span>
                  <span className="font-mono text-amber-400">0.25 Wgt</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Monitors Strait of Hormuz, Red Sea/Bab el-Mandeb AIS vessel diversion, maritime insurance war surcharges, and state sanction regimes.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <div className="flex items-center justify-between font-bold text-white">
                  <span className="flex items-center space-x-1.5 text-orange-400">
                    <Flame className="h-4 w-4" />
                    <span>OPEC+ Quotas (25%)</span>
                  </span>
                  <span className="font-mono text-amber-400">0.25 Wgt</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Tracks secondary sources production estimates, Saudi Aramco official selling prices (OSPs), and voluntary quota adherence.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <div className="flex items-center justify-between font-bold text-white">
                  <span className="flex items-center space-x-1.5 text-teal-400">
                    <Droplets className="h-4 w-4" />
                    <span>Physical Inventories (20%)</span>
                  </span>
                  <span className="font-mono text-amber-400">0.20 Wgt</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Evaluates US EIA/API commercial crude & product draws, Cushing OK tank utilization, ARA European stockpiles, and Asian floating storage.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <div className="flex items-center justify-between font-bold text-white">
                  <span className="flex items-center space-x-1.5 text-indigo-400">
                    <PieChart className="h-4 w-4" />
                    <span>COT & CTA Flow (15%)</span>
                  </span>
                  <span className="font-mono text-amber-400">0.15 Wgt</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  CFTC commitment of traders managed money net long/short positions, 25-delta options gamma skew, and algorithmic CTA momentum levels.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 sm:col-span-2">
                <div className="flex items-center justify-between font-bold text-white">
                  <span className="flex items-center space-x-1.5 text-emerald-400">
                    <DollarSign className="h-4 w-4" />
                    <span>Macro Liquidity & FX Beta (15%)</span>
                  </span>
                  <span className="font-mono text-amber-400">0.15 Wgt</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  USD Index (DXY) inverse correlation beta, China PBOC manufacturing liquidity stimulus, and global 3:2:1 crack margin pulls.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 space-y-1">
            <div className="font-bold text-slate-200">Scale Interpretation:</div>
            <div className="grid grid-cols-5 gap-1 text-center font-mono text-[10px]">
              <span className="rounded bg-rose-950 p-1 text-rose-300">0-25: Extreme Bear</span>
              <span className="rounded bg-orange-950 p-1 text-orange-300">25-45: Bearish</span>
              <span className="rounded bg-amber-950 p-1 text-amber-300">45-55: Neutral</span>
              <span className="rounded bg-teal-950 p-1 text-teal-300">55-75: Bullish</span>
              <span className="rounded bg-emerald-950 p-1 text-emerald-300">75-100: Extreme Bull</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-amber-500 px-4 py-2 font-semibold text-slate-950 hover:bg-amber-400 transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
