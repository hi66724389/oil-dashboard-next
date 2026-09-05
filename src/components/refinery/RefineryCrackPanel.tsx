'use client';

import React, { useState } from 'react';
import {
  Droplets,
  TrendingUp,
  TrendingDown,
  Flame,
  AlertTriangle,
  Info,
  CheckCircle2,
  PieChart,
} from 'lucide-react';
import { RefiningDashboardData } from '@/types/oil';
import { useLanguage } from '@/context/LanguageContext';

interface RefineryCrackPanelProps {
  data: RefiningDashboardData;
}

export const RefineryCrackPanel: React.FC<RefineryCrackPanelProps> = ({ data }) => {
  const { t } = useLanguage();
  const [selectedCrackId, setSelectedCrackId] = useState<string>(data.cracks[0]?.id || 'usgc_321');

  const selectedCrack = data.cracks.find((c) => c.id === selectedCrackId) || data.cracks[0];

  return (
    <div className="space-y-4">
      {/* Top Banner & Hero Crack Gauges */}
      <div className="rounded-xl border border-slate-800/90 bg-slate-900/80 p-4 shadow-xl backdrop-blur-md">
        <div className="flex flex-col gap-3 border-b border-slate-800/80 pb-3.5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400">
                <Droplets className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-bold tracking-wider text-white uppercase sm:text-base">
                {t.refineryTitle}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{t.refinerySubtitle}</p>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono">
            <div className="rounded-lg bg-slate-950 px-3 py-1 border border-slate-800">
              <span className="text-slate-400">{t.globalThroughput} </span>
              <span className="font-bold text-white">{data.globalThroughputMbpd.toFixed(1)}M bpd</span>
            </div>
            <div className="rounded-lg bg-slate-950 px-3 py-1 border border-slate-800">
              <span className="text-slate-400">{t.globalUtilization} </span>
              <span className="font-bold text-emerald-400">{data.globalUtilizationPercent.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* 3 Hero Crack Spread Cards */}
        <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {/* 3:2:1 USGC Crack */}
          <div className="rounded-xl border border-teal-500/40 bg-teal-950/20 p-3.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-teal-300">{t.heroCrack321}</span>
              <span className="rounded bg-teal-500/20 px-1.5 py-0.2 text-[9px] font-mono text-teal-300">
                3 WTI : 2 GAS : 1 DIESEL
              </span>
            </div>
            <div className="mt-2 flex items-baseline space-x-2 font-mono">
              <span className="text-2xl font-black text-white sm:text-3xl">
                ${data.crack321Usgc.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-emerald-400">
                +${data.crack321Change.toFixed(2)}/bbl
              </span>
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              5Y Avg: $18.40/bbl (+$5.45 above historical norm - Strong Margin)
            </div>
          </div>

          {/* RBOB Gasoline Crack */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-300">{t.heroGasolineCrack}</span>
              <span className="rounded bg-amber-500/20 px-1.5 py-0.2 text-[9px] font-mono text-amber-300">
                NYMEX RBOB / WTI
              </span>
            </div>
            <div className="mt-2 flex items-baseline space-x-2 font-mono">
              <span className="text-2xl font-black text-white sm:text-3xl">
                ${data.gasolineCrack.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-emerald-400">+$0.85/bbl</span>
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              Resilient summer-autumn driving demand across US & Asia
            </div>
          </div>

          {/* ULSD Diesel Crack */}
          <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-3.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-indigo-300">{t.heroDieselCrack}</span>
              <span className="rounded bg-indigo-500/20 px-1.5 py-0.2 text-[9px] font-mono text-indigo-300">
                NYMEX ULSD / WTI
              </span>
            </div>
            <div className="mt-2 flex items-baseline space-x-2 font-mono">
              <span className="text-2xl font-black text-white sm:text-3xl">
                ${data.dieselCrack.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-emerald-400">+$1.90/bbl</span>
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              Acute middle distillate inventory tightness ahead of winter heating
            </div>
          </div>
        </div>
      </div>

      {/* Main Breakdown: Crack Spreads Grid + Global Refinery Table */}
      <div className="grid grid-cols-1 gap-4 2xl:grid-cols-12">
        {/* Left 5 Cols: Crack Spreads List & Yield Component Decomposition */}
        <div className="space-y-4 2xl:col-span-5">
          <div className="rounded-xl border border-slate-800/90 bg-slate-900/80 p-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 text-xs font-bold tracking-wider text-slate-300 uppercase">
              <span>{t.cracksTableTitle}</span>
              <span className="text-[10px] text-slate-500 font-normal">Click to Inspect Formula</span>
            </div>

            <div className="mt-3 space-y-2">
              {data.cracks.map((crack) => {
                const isSelected = selectedCrackId === crack.id;
                const isPositive = crack.change >= 0;

                return (
                  <div
                    key={crack.id}
                    onClick={() => setSelectedCrackId(crack.id)}
                    className={`cursor-pointer rounded-xl border p-3 transition-all ${
                      isSelected
                        ? 'border-teal-500 bg-teal-500/10 shadow-md ring-1 ring-teal-500'
                        : 'border-slate-800/80 bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">{crack.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{crack.region}</div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-sm font-bold text-white">${crack.value.toFixed(2)}</div>
                        <div
                          className={`text-[10px] font-semibold ${
                            isPositive ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {isPositive ? '+' : ''}${crack.change.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between border-t border-slate-800/60 pt-1.5 text-[10px]">
                      <span className="font-mono text-slate-400">{crack.formula}</span>
                      <span
                        className={`rounded px-1.5 py-0.2 font-bold ${
                          crack.status === 'Tight'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : crack.status === 'Normal'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {crack.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Crack Component Breakdown Card */}
            {selectedCrack && (
              <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs">
                <div className="font-bold text-amber-400 uppercase text-[11px] mb-1.5 flex items-center space-x-1.5">
                  <PieChart className="h-3.5 w-3.5" />
                  <span>Refinery Yield & Price Economics</span>
                </div>
                <div className="space-y-1 text-[11px] text-slate-300">
                  {selectedCrack.components.map((comp, idx) => (
                    <div key={idx} className="flex justify-between font-mono bg-slate-900/60 px-2 py-1 rounded">
                      <span>{comp.product} ({comp.yieldRatio}):</span>
                      <span className="font-bold text-white">${comp.productPrice.toFixed(2)}/bbl</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 7 Cols: Global Major Refineries Utilization & Runs */}
        <div className="space-y-4 2xl:col-span-7">
          <div className="overflow-hidden rounded-xl border border-slate-800/90 bg-slate-900/80 shadow-xl">
            <div className="border-b border-slate-800/80 bg-slate-950/60 px-4 py-2.5 text-xs font-bold tracking-wider text-slate-300 uppercase">
              {t.refineriesTableTitle}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="border-b border-slate-800 bg-slate-950/80 text-[10px] font-semibold text-slate-400 uppercase">
                  <tr>
                    <th className="py-2.5 pl-3.5 pr-2 font-sans">Hub / Complex</th>
                    <th className="px-2 py-2.5 text-right">{t.colThroughput}</th>
                    <th className="px-2 py-2.5 text-right">{t.colCapacity}</th>
                    <th className="px-2 py-2.5 text-right">{t.colUtilization}</th>
                    <th className="px-2 py-2.5 text-right">{t.colPlannedMaint}</th>
                    <th className="px-2 py-2.5 text-right">{t.colAvgMargin}</th>
                    <th className="py-2.5 pl-2 pr-3.5 text-center font-sans">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {data.refineries.map((ref) => {
                    const isHighUtil = ref.utilizationPercent >= 90;
                    const isMidUtil = ref.utilizationPercent >= 80;

                    return (
                      <tr key={ref.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-2.5 pl-3.5 pr-2 font-sans font-medium text-white flex items-center space-x-2">
                          <span className="text-base">{ref.flag}</span>
                          <div>
                            <div className="font-semibold text-white">{ref.region}</div>
                            <div className="text-[10px] text-slate-500 font-mono">{ref.country}</div>
                          </div>
                        </td>
                        <td className="px-2 py-2.5 text-right font-bold text-white">
                          {ref.throughputMbpd.toFixed(2)}M
                        </td>
                        <td className="px-2 py-2.5 text-right text-slate-400">
                          {ref.nameplateCapacityMbpd.toFixed(2)}M
                        </td>
                        <td className="px-2 py-2.5 text-right">
                          <span
                            className={`font-bold ${
                              isHighUtil
                                ? 'text-emerald-400'
                                : isMidUtil
                                ? 'text-amber-400'
                                : 'text-rose-400'
                            }`}
                          >
                            {ref.utilizationPercent.toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-2 py-2.5 text-right text-amber-300">
                          {ref.plannedMaintenanceMbpd > 0
                            ? `-${ref.plannedMaintenanceMbpd.toFixed(2)}M`
                            : '—'}
                        </td>
                        <td className="px-2 py-2.5 text-right font-bold text-teal-300">
                          ${ref.marginAvgDollar.toFixed(2)}/bbl
                        </td>
                        <td className="py-2.5 pl-2 pr-3.5 text-center font-sans">
                          <span
                            className={`rounded px-2 py-0.5 text-[9px] font-bold ${
                              ref.status === 'Peak Runs'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : ref.status === 'Turnaround Season'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {ref.status}
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
      </div>
    </div>
  );
};
