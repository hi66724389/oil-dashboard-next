'use client';

import React from 'react';
import {
  Anchor,
} from 'lucide-react';
import { ChokepointData } from '@/types/oil';
import { useLanguage } from '@/context/LanguageContext';

interface ChokepointRadarProps {
  chokepoints: ChokepointData[];
}

export const ChokepointRadar: React.FC<ChokepointRadarProps> = ({ chokepoints }) => {
  const { t } = useLanguage();

  const getLocalizedStatus = (status: string) => {
    switch (status) {
      case 'High Disruption':
        return t.statusHighDisruption;
      case 'Elevated Risk':
        return t.statusElevated;
      case 'Normal':
        return t.statusNormal;
      default:
        return status;
    }
  };

  return (
    <div className="h-full flex flex-col justify-between rounded-xl border border-slate-800/90 bg-slate-900/80 p-3.5 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
            <Anchor className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold tracking-tight text-white font-mono uppercase">
              {t.chokepointTitle}
            </h2>
            <p className="text-[10px] text-slate-400">{t.chokepointSubtitle}</p>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 flex-1">
        {chokepoints.map((cp) => {
          const isHighRisk = cp.status === 'High Disruption';
          const isElevated = cp.status === 'Elevated Risk';

          return (
            <div
              key={cp.id}
              className={`rounded-xl border p-4 transition-all ${
                isHighRisk
                  ? 'border-rose-500/60 bg-rose-950/20 shadow-lg shadow-rose-950/20'
                  : isElevated
                  ? 'border-amber-500/50 bg-amber-950/20'
                  : 'border-slate-800/80 bg-slate-950/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">{cp.name}</h3>
                  <div className="text-[11px] text-slate-400">{cp.location}</div>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    isHighRisk
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                      : isElevated
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  {getLocalizedStatus(cp.status)}
                </span>
              </div>

              {/* Transit volume & Global share */}
              <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg bg-slate-900/80 p-2 text-xs border border-slate-800/60">
                <div>
                  <div className="text-[10px] text-slate-400">{t.transitVolume}</div>
                  <div className="font-mono font-bold text-white">
                    {cp.transitVolumeMbpd.toFixed(1)}M bpd
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">{t.globalShare}</div>
                  <div className="font-mono font-bold text-amber-400">
                    {cp.globalSharePercent.toFixed(1)}% {t.ofSeaborne}
                  </div>
                </div>
              </div>

              {/* Threat Advisory */}
              <div className="mt-3 space-y-1 text-[11px]">
                <div className="font-semibold text-slate-300">{t.securityAssessment}</div>
                <p className="text-slate-400 leading-snug">{cp.keyThreats}</p>
              </div>

              {/* Last incident & Vessel count */}
              <div className="mt-3 flex items-center justify-between border-t border-slate-800/60 pt-2 text-[10px] text-slate-500">
                <span>
                  {t.tankers24h} {cp.vesselCount24h} {t.vessels}
                </span>
                <span className="truncate max-w-[130px]" title={cp.lastIncident}>
                  {cp.lastIncident}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
