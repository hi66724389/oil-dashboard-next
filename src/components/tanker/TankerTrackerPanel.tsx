'use client';

import React, { useState } from 'react';
import {
  Anchor,
  Radio,
  ShieldAlert,
  Compass,
  Navigation,
  ExternalLink,
  Zap,
  Info,
} from 'lucide-react';
import { TankerRadarData, TankerVessel } from '@/types/oil';
import { useLanguage } from '@/context/LanguageContext';

interface TankerTrackerPanelProps {
  data: TankerRadarData;
}

export const TankerTrackerPanel: React.FC<TankerTrackerPanelProps> = ({ data }) => {
  const { t } = useLanguage();
  const [selectedVessel, setSelectedVessel] = useState<TankerVessel | null>(data.vessels[0] || null);
  const [filterClass, setFilterClass] = useState<string>('ALL');

  const filteredVessels = data.vessels.filter((v) => {
    if (filterClass !== 'ALL' && v.vesselClass !== filterClass) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Top Header & Satellite AIS Telemetry */}
      <div className="rounded-xl border border-slate-800/90 bg-slate-900/80 p-4 shadow-xl backdrop-blur-md">
        <div className="flex flex-col gap-3 border-b border-slate-800/80 pb-3.5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                <Anchor className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-bold tracking-wider text-white uppercase sm:text-base">
                {t.tankerRadarTitle}
              </h2>
              <span className="rounded bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-400 animate-pulse">
                {data.radarScanTime}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{t.tankerRadarSubtitle}</p>
          </div>

          {/* Key Global Seaborne Stats */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <div className="rounded-lg bg-slate-950 px-3 py-1 border border-slate-800">
              <span className="text-slate-400">{t.crudeOnWater} </span>
              <span className="font-bold text-white">{data.crudeOnWaterTotalMbbl}M bbls</span>
            </div>
            <div className="rounded-lg bg-slate-950 px-3 py-1 border border-rose-500/30 text-rose-300">
              <span>{t.capeRerouted} </span>
              <span className="font-bold">+{data.capeReroutedVolumeMbpd}M bpd</span>
            </div>
          </div>
        </div>

        {/* 4 Radar Telemetry Metrics */}
        <div className="mt-3.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <div className="rounded-lg border border-slate-800/80 bg-slate-950/60 p-3">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {t.transit24h}
            </div>
            <div className="mt-1 flex items-baseline space-x-1.5 font-mono">
              <span className="text-lg font-black text-amber-400">
                {data.transitThroughput24hMbpd.toFixed(1)}M
              </span>
              <span className="text-xs text-slate-400">bpd ({data.globalSharePercent}% global)</span>
            </div>
          </div>

          <div className="rounded-lg border border-slate-800/80 bg-slate-950/60 p-3">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {t.vesselsInHormuz}
            </div>
            <div className="mt-1 flex items-baseline space-x-1.5 font-mono">
              <span className="text-lg font-black text-white">{data.totalVesselsInZone}</span>
              <span className="text-xs text-emerald-400">({data.activeLadenTankers} Laden)</span>
            </div>
          </div>

          <div className="rounded-lg border border-slate-800/80 bg-slate-950/60 p-3">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {t.gpsSpoofing}
            </div>
            <div className="mt-1 flex items-center space-x-1 font-mono">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs font-bold text-amber-300">{data.gpsInterferenceLevel}</span>
            </div>
          </div>

          <div className="rounded-lg border border-slate-800/80 bg-slate-950/60 p-3">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {t.warRiskRate}
            </div>
            <div className="mt-1 flex items-baseline space-x-1.5 font-mono">
              <span className="text-lg font-black text-rose-400">{data.warRiskInsuranceRate}%</span>
              <span className="text-xs text-rose-400/90">(+{data.warRiskDeltaWoW}% WoW)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Interactive AIS Radar Scope + Right Live Vessel Manifest */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left 6 Cols: Interactive Radar Screen */}
        <div className="space-y-4 lg:col-span-6">
          <div className="rounded-xl border border-cyan-500/40 bg-slate-950 p-4 shadow-2xl relative overflow-hidden">
            {/* Top Radar Header */}
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 text-xs font-mono text-cyan-400">
              <div className="flex items-center space-x-1.5">
                <Radio className="h-3.5 w-3.5 animate-pulse text-cyan-400" />
                <span className="font-bold tracking-wider">AIS RADAR SCOPE // HORMUZ TSS LANES</span>
              </div>
              <span className="text-[10px] text-slate-400">RANGE: 25 NM</span>
            </div>

            {/* Radar Scope Viewport */}
            <div className="relative mt-3 h-80 w-full flex items-center justify-center bg-radial from-cyan-950/40 via-slate-950 to-slate-950 rounded-xl border border-cyan-900/60 overflow-hidden">
              {/* Radar Concentric Rings */}
              <svg className="absolute inset-0 h-full w-full pointer-events-none select-none" viewBox="0 0 400 320">
                <defs>
                  {/* Grid pattern */}
                  <pattern id="radarGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="20" y2="0" stroke="#083344" strokeWidth="0.5" />
                    <line x1="0" y1="0" x2="0" y2="20" stroke="#083344" strokeWidth="0.5" />
                  </pattern>
                  {/* Rotating sweep gradient */}
                  <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <rect width="400" height="320" fill="url(#radarGrid)" opacity="0.6" />

                {/* Range Rings */}
                <circle cx="200" cy="160" r="130" fill="none" stroke="#0891b2" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                <circle cx="200" cy="160" r="90" fill="none" stroke="#0891b2" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                <circle cx="200" cy="160" r="50" fill="none" stroke="#0891b2" strokeWidth="1" opacity="0.6" />
                <circle cx="200" cy="160" r="10" fill="#0891b2" opacity="0.8" />

                {/* Crosshairs */}
                <line x1="20" y1="160" x2="380" y2="160" stroke="#0891b2" strokeWidth="0.75" opacity="0.5" />
                <line x1="200" y1="15" x2="200" y2="305" stroke="#0891b2" strokeWidth="0.75" opacity="0.5" />

                {/* Coastline Landmarks */}
                <path d="M 30,30 Q 120,60 220,40 T 370,25" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4 2" />
                <text x="280" y="38" fill="#64748b" className="text-[9px] font-mono">IRAN (BANDAR ABBAS)</text>

                <path d="M 30,290 Q 140,260 230,280 T 370,300" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4 2" />
                <text x="70" y="285" fill="#64748b" className="text-[9px] font-mono">OMAN (MUSANDAM PENINSULA)</text>

                {/* Navigation TSS Corridors */}
                <line x1="80" y1="140" x2="330" y2="120" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                <line x1="80" y1="180" x2="330" y2="160" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                <text x="210" y="132" fill="#0284c7" className="text-[8px] font-mono">INBOUND TSS (WEST)</text>
                <text x="210" y="172" fill="#0284c7" className="text-[8px] font-mono">OUTBOUND TSS (EAST)</text>
              </svg>

              {/* Vessel Blip Markers */}
              {data.vessels.map((vsl) => {
                const isSelected = selectedVessel?.id === vsl.id;
                const isVLCC = vsl.vesselClass === 'VLCC';
                const isLaden = vsl.status === 'Laden Transit';

                return (
                  <div
                    key={vsl.id}
                    onClick={() => setSelectedVessel(vsl)}
                    style={{
                      left: `${vsl.radarX}%`,
                      top: `${vsl.radarY}%`,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                  >
                    {/* Ping Wave */}
                    <span
                      className={`absolute -inset-1 rounded-full animate-ping opacity-75 ${
                        isSelected ? 'bg-amber-400' : isVLCC ? 'bg-cyan-400' : 'bg-emerald-400'
                      }`}
                    />
                    {/* Vessel Dot */}
                    <div
                      className={`relative flex h-3.5 w-3.5 items-center justify-center rounded-full border border-slate-950 font-mono text-[8px] font-black ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300'
                          : isVLCC
                          ? 'bg-cyan-400 text-slate-950'
                          : 'bg-emerald-400 text-slate-950'
                      }`}
                    >
                      ▲
                    </div>

                    {/* Hover Tag */}
                    <div className="absolute left-4 top-0 hidden group-hover:flex flex-col rounded bg-slate-900/95 border border-cyan-500/60 px-2 py-1 text-[9px] font-mono text-white whitespace-nowrap shadow-xl z-30">
                      <span className="font-bold text-cyan-300">{vsl.name}</span>
                      <span className="text-slate-400">{vsl.vesselClass} • {vsl.speedKnots} kts</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Vessel Telemetry Footer in Radar */}
            {selectedVessel && (
              <div className="mt-3 rounded-lg border border-cyan-500/30 bg-cyan-950/30 p-2.5 text-xs font-mono text-cyan-300 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white">{selectedVessel.name}</span> ({selectedVessel.vesselClass} • {selectedVessel.imo})
                  <div className="text-[10px] text-slate-400">
                    {selectedVessel.originPort} → {selectedVessel.destinationPort} ({selectedVessel.cargoGrade})
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-amber-300">{selectedVessel.speedKnots} kts • Draft {selectedVessel.draftPercent}%</div>
                  <div className="text-[10px] text-slate-400">ETA: {selectedVessel.eta}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 6 Cols: Live Tanker Manifest Table */}
        <div className="space-y-4 lg:col-span-6">
          <div className="overflow-hidden rounded-xl border border-slate-800/90 bg-slate-900/80 shadow-xl">
            {/* Header & Filter */}
            <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-950/60 px-4 py-2.5">
              <span className="text-xs font-bold tracking-wider text-slate-300 uppercase">
                {t.vesselManifestTitle}
              </span>
              <div className="flex space-x-1 text-[10px] font-mono">
                {['ALL', 'VLCC', 'Suezmax', 'Aframax', 'LNG'].map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setFilterClass(cls)}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      filterClass === cls
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>

            {/* Manifest List */}
            <div className="divide-y divide-slate-800/60 font-mono text-xs max-h-[380px] overflow-y-auto no-scrollbar">
              {filteredVessels.map((vsl) => {
                const isSelected = selectedVessel?.id === vsl.id;

                return (
                  <div
                    key={vsl.id}
                    onClick={() => setSelectedVessel(vsl)}
                    className={`cursor-pointer p-3 transition-colors ${
                      isSelected
                        ? 'bg-cyan-950/40 border-l-2 border-cyan-400'
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-xs">{vsl.name}</span>
                        <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[9px] font-semibold text-cyan-300">
                          {vsl.vesselClass}
                        </span>
                        <span className="text-[10px] text-slate-500 font-sans">{vsl.flag}</span>
                      </div>
                      <div className="text-right">
                        <span
                          className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                            vsl.status === 'Laden Transit'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {vsl.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-1.5 grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                      <div>
                        <span className="text-slate-500">From:</span> {vsl.originPort}
                      </div>
                      <div>
                        <span className="text-slate-500">To:</span> {vsl.destinationPort}
                      </div>
                    </div>

                    <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-800/40 pt-1">
                      <span>Cargo: <span className="text-amber-300">{vsl.cargoGrade}</span> ({vsl.capacityMbbl}M bbls)</span>
                      <span>Speed: <span className="text-white">{vsl.speedKnots} kts</span> | Draft: {vsl.draftPercent}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
