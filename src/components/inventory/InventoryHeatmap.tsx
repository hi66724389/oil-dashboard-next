'use client';

import React from 'react';
import { Droplets, TrendingDown, TrendingUp, Layers } from 'lucide-react';
import { InventoryHubData } from '@/types/oil';

interface InventoryHeatmapProps {
  hubs: InventoryHubData[];
}

export const InventoryHeatmap: React.FC<InventoryHeatmapProps> = ({ hubs }) => {
  return (
    <div className="h-full flex flex-col justify-between rounded-xl border border-slate-800/90 bg-slate-900/80 p-3.5 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400">
            <Droplets className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold tracking-tight text-white font-mono uppercase">
              GLOBAL PHYSICAL STORAGE HUBS
            </h2>
            <p className="text-[10px] text-slate-400">
              商業儲槽庫存利用率與 5 年均值偏離
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 gap-2.5 flex-1">
        {hubs.map((hub) => {
          const isDraw = hub.status === 'Draw';

          return (
            <div
              key={hub.id}
              className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5 space-y-2.5 hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="text-xs font-bold text-white truncate" title={hub.name}>
                  {hub.name}
                </div>
                <div className="text-[10px] text-slate-500">{hub.region}</div>
              </div>

              {/* Tank Level / Capacity */}
              <div className="flex items-baseline justify-between font-mono">
                <span className="text-lg font-bold text-white">{hub.currentLevelMbbl.toFixed(1)}M</span>
                <span className="text-xs text-slate-500">/ {hub.capacityMbbl.toFixed(1)}M bbls</span>
              </div>

              {/* Progress Bar for Utilization */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Tank Utilization</span>
                  <span className="font-mono font-semibold text-amber-300">
                    {hub.utilizationPercent.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full ${
                      hub.utilizationPercent > 70
                        ? 'bg-rose-500'
                        : hub.utilizationPercent > 40
                        ? 'bg-teal-500'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${hub.utilizationPercent}%` }}
                  />
                </div>
              </div>

              {/* Weekly Change & 5Y Delta */}
              <div className="border-t border-slate-800/80 pt-2 flex items-center justify-between text-[11px]">
                <div
                  className={`flex items-center space-x-0.5 font-mono font-bold ${
                    isDraw ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isDraw ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                  <span>
                    {hub.weeklyChangeMbbl > 0 ? '+' : ''}
                    {hub.weeklyChangeMbbl.toFixed(2)}M
                  </span>
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  vs 5Y: {hub.fiveYearAvgPercent > 0 ? '+' : ''}
                  {hub.fiveYearAvgPercent.toFixed(1)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
