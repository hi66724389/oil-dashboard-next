'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  Flame,
  TrendingUp,
  TrendingDown,
  Info,
  ChevronDown,
  ChevronUp,
  Droplets,
  DollarSign,
  PieChart,
  Sparkles,
} from 'lucide-react';
import { getSentimentColor } from '@/lib/formatters';
import { SentimentIndexData } from '@/types/oil';
import { useLanguage } from '@/context/LanguageContext';

interface SentimentGaugeProps {
  data: SentimentIndexData;
  onOpenMethodology: () => void;
}

export const SentimentGauge: React.FC<SentimentGaugeProps> = ({
  data,
  onOpenMethodology,
}) => {
  const { t } = useLanguage();
  const [expandedSubIndex, setExpandedSubIndex] = useState<string | null>(null);

  const colors = getSentimentColor(data.rating);

  const getLocalizedRating = (rating: string) => {
    const r = rating.toLowerCase();
    if (r.includes('extreme bullish') || r.includes('強烈看多')) return t.extremeBullish;
    if (r.includes('bullish') || r.includes('看多')) return t.bullish;
    if (r.includes('extreme bearish') || r.includes('強烈看空')) return t.extremeBearish;
    if (r.includes('bearish') || r.includes('看空')) return t.bearish;
    return t.neutral;
  };

  // SVG Gauge calculations
  // Angle for score 0 to 100 mapped from -180 deg to 0 deg
  const score = Math.max(0, Math.min(100, data.overallScore));
  const needleAngle = -180 + (score / 100) * 180; // in degrees

  const radius = 95;
  const cx = 130;
  const cy = 120;

  // Arc paths
  const getArcPath = (startScore: number, endScore: number) => {
    const startAngle = ((-180 + (startScore / 100) * 180) * Math.PI) / 180;
    const endAngle = ((-180 + (endScore / 100) * 180) * Math.PI) / 180;

    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy + radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy + radius * Math.sin(endAngle);

    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  const getSubIndexIcon = (id: string) => {
    switch (id) {
      case 'geopolitical':
        return ShieldAlert;
      case 'opec_discipline':
        return Flame;
      case 'inventory_pressure':
        return Droplets;
      case 'speculative_flow':
        return PieChart;
      case 'macro_liquidity':
        return DollarSign;
      default:
        return Sparkles;
    }
  };

  const [hoveredPoint, setHoveredPoint] = useState<{
    date: string;
    score: number;
    wtiPrice: number;
    catalystEvent?: string;
  } | null>(null);

  // SVG Area Sparkline calculation
  const histPoints = data.historical || [];
  const svgWidth = 260;
  const svgHeight = 46;
  const padding = 6;
  
  const getCoords = (index: number, val: number) => {
    const x = padding + (index / Math.max(1, histPoints.length - 1)) * (svgWidth - padding * 2);
    const minScore = 40;
    const maxScore = 90;
    const normalized = Math.max(0, Math.min(1, (val - minScore) / (maxScore - minScore)));
    const y = svgHeight - padding - normalized * (svgHeight - padding * 2);
    return { x, y };
  };

  const linePath = histPoints.length > 0
    ? histPoints.reduce((acc, pt, idx) => {
        const { x, y } = getCoords(idx, pt.score);
        return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
      }, '')
    : '';

  const areaPath = histPoints.length > 0
    ? `${linePath} L ${getCoords(histPoints.length - 1, 0).x} ${svgHeight} L ${getCoords(0, 0).x} ${svgHeight} Z`
    : '';

  return (
    <div className="rounded-xl border border-slate-800/90 bg-slate-900/80 p-3.5 shadow-xl flex flex-col justify-between h-full terminal-card terminal-accent-cyan">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <PieChart className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-white font-mono uppercase">
              {t.sentimentGaugeTitle}
            </h2>
            <p className="text-[10px] text-slate-400">{t.sentimentGaugeSubtitle}</p>
          </div>
        </div>

        <button
          onClick={onOpenMethodology}
          className="flex items-center space-x-1 rounded-lg border border-slate-800 bg-slate-950/80 px-2.5 py-1 text-xs text-slate-400 hover:border-slate-700 hover:text-white transition-colors font-mono"
        >
          <Info className="h-3.5 w-3.5 text-amber-400" />
          <span className="hidden sm:inline">{t.modelLogic}</span>
        </button>
      </div>

      {/* Main Container: Gauge top + compact Sub-indices below */}
      <div className="mt-2.5 flex-1 flex flex-col justify-between space-y-2.5">
        {/* Speedometer Gauge & Stats */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-slate-800/60 bg-slate-950/70 p-2.5 shadow-inner">
          <div className="relative flex h-32 w-full max-w-[230px] items-center justify-center">
            <svg viewBox="0 0 260 140" className="h-full w-full overflow-visible">
              <defs>
                <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background Arc track */}
              <path
                d={getArcPath(0, 100)}
                fill="none"
                stroke="#1e293b"
                strokeWidth="16"
                strokeLinecap="round"
              />

              {/* Segment 1: Extreme Bearish (0 - 25) */}
              <path
                d={getArcPath(0, 24)}
                fill="none"
                stroke="#ef4444"
                strokeWidth="12"
                strokeLinecap="round"
                opacity="0.85"
              />
              {/* Segment 2: Bearish (25 - 45) */}
              <path
                d={getArcPath(26, 44)}
                fill="none"
                stroke="#f97316"
                strokeWidth="12"
                strokeLinecap="round"
                opacity="0.85"
              />
              {/* Segment 3: Neutral (45 - 55) */}
              <path
                d={getArcPath(46, 54)}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="12"
                strokeLinecap="round"
                opacity="0.85"
              />
              {/* Segment 4: Bullish (55 - 75) */}
              <path
                d={getArcPath(56, 74)}
                fill="none"
                stroke="#14b8a6"
                strokeWidth="12"
                strokeLinecap="round"
                opacity="0.85"
              />
              {/* Segment 5: Extreme Bullish (75 - 100) */}
              <path
                d={getArcPath(76, 100)}
                fill="none"
                stroke="#10b981"
                strokeWidth="12"
                strokeLinecap="round"
                opacity="0.85"
              />

              {/* Pointer Needle */}
              <g transform={`rotate(${needleAngle} ${cx} ${cy})`}>
                <line
                  x1={cx}
                  y1={cy}
                  x2={cx + radius - 10}
                  y2={cy}
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#gaugeGlow)"
                />
                <circle cx={cx} cy={cy} r="8" fill="#f59e0b" stroke="#0f172a" strokeWidth="2.5" />
              </g>

              {/* Dial Tick Labels */}
              <text x="25" y="138" fill="#64748b" className="font-mono text-[10px]" textAnchor="middle">
                {t.dialBear}
              </text>
              <text x="130" y="20" fill="#64748b" className="font-mono text-[10px]" textAnchor="middle">
                {t.dialNeutral}
              </text>
              <text x="235" y="138" fill="#64748b" className="font-mono text-[10px]" textAnchor="middle">
                {t.dialBull}
              </text>
            </svg>

            {/* Centered Score Badge */}
            <div className="absolute bottom-1 text-center">
              <div className="font-mono text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {score}
              </div>
              <div
                className={`mt-0.5 inline-block rounded-md border px-2 py-0.5 text-xs font-bold ${colors.bg} ${colors.text} ${colors.border} ${colors.glow}`}
              >
                {getLocalizedRating(data.rating)}
              </div>
            </div>
          </div>

          {/* Quick Metrics & Deltas */}
          <div className="mt-3 grid w-full grid-cols-3 gap-2 border-t border-slate-800/80 pt-2.5 text-center">
            <div className="rounded-lg bg-slate-900/60 p-1.5">
              <div className="text-[10px] text-slate-400">{t.confidenceHigh}</div>
              <div className="font-mono text-xs font-bold text-emerald-400">
                {data.confidence}%
              </div>
            </div>
            <div className="rounded-lg bg-slate-900/60 p-1.5">
              <div className="text-[10px] text-slate-400">{t.wowDelta}</div>
              <div
                className={`font-mono text-xs font-bold flex items-center justify-center space-x-0.5 ${
                  data.wowDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {data.wowDelta >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>
                  {data.wowDelta >= 0 ? '+' : ''}
                  {data.wowDelta}
                </span>
              </div>
            </div>
            <div className="rounded-lg bg-slate-900/60 p-1.5">
              <div className="text-[10px] text-slate-400">{t.dodDelta}</div>
              <div
                className={`font-mono text-xs font-bold flex items-center justify-center space-x-0.5 ${
                  data.dodDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {data.dodDelta >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>
                  {data.dodDelta >= 0 ? '+' : ''}
                  {data.dodDelta}
                </span>
              </div>
            </div>
          </div>

          {/* Sentiment History SVG Area Curve */}
          <div className="mt-2.5 w-full rounded-lg bg-slate-900/60 border border-slate-800/60 p-2 font-mono">
            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
              <span>{t.trajectory30d}</span>
              {hoveredPoint ? (
                <span className="text-amber-400 font-bold">
                  {hoveredPoint.date}: 得分 {hoveredPoint.score} (WTI ${hoveredPoint.wtiPrice})
                </span>
              ) : (
                <span className="text-emerald-400 font-medium">{t.trajectoryTrending}</span>
              )}
            </div>

            <div className="relative h-12 w-full">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="h-full w-full overflow-visible">
                <defs>
                  <linearGradient id="sentimentAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Shaded Area Fill */}
                <path d={areaPath} fill="url(#sentimentAreaGrad)" />

                {/* Trajectory Line */}
                <path
                  d={linePath}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Interactive Points */}
                {histPoints.map((pt, idx) => {
                  const { x, y } = getCoords(idx, pt.score);
                  const isLast = idx === histPoints.length - 1;
                  return (
                    <g
                      key={idx}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredPoint(pt)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={isLast ? 4 : 2.5}
                        fill={isLast ? '#f59e0b' : '#10b981'}
                        stroke="#020617"
                        strokeWidth="1.5"
                      />
                      {pt.catalystEvent && (
                        <circle cx={x} cy={y - 6} r="2" fill="#38bdf8" />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Sub-Indices Breakdown Cards */}
        <div className="space-y-1.5 flex-1">
          <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase flex items-center justify-between font-mono">
            <span>{t.subIndicesTitle}</span>
            <span className="text-[9px] text-slate-500 font-normal">{t.subIndicesHint}</span>
          </div>

          <div className="space-y-1.5 overflow-y-auto max-h-[250px] pr-1 no-scrollbar">
            {data.subIndices.map((sub) => {
              const Icon = getSubIndexIcon(sub.id);
              const isExpanded = expandedSubIndex === sub.id;
              const subColors = getSentimentColor(
                sub.score >= 75
                  ? 'Extreme Bullish'
                  : sub.score >= 60
                  ? 'Bullish'
                  : sub.score >= 45
                  ? 'Neutral'
                  : 'Bearish'
              );

              return (
                <div
                  key={sub.id}
                  className={`rounded-lg border transition-all duration-200 ${
                    isExpanded
                      ? 'border-slate-700 bg-slate-900/90 shadow-md'
                      : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div
                    onClick={() => setExpandedSubIndex(isExpanded ? null : sub.id)}
                    className="flex cursor-pointer items-center justify-between p-2.5"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-md ${subColors.bg}`}>
                        <Icon className={`h-3.5 w-3.5 ${subColors.text}`} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-white sm:text-sm">
                            {sub.name}
                          </span>
                          <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[10px] font-mono text-slate-400">
                            {(sub.weight * 100).toFixed(0)}% {t.weight}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 line-clamp-1">
                          {sub.description}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="flex items-center space-x-1.5">
                          <span className="font-mono text-sm font-bold text-white">
                            {sub.score}
                          </span>
                          <span className="text-[10px] text-slate-500">/100</span>
                        </div>
                        <div
                          className={`flex items-center justify-end space-x-0.5 text-[10px] font-medium ${
                            sub.deltaWoW >= 0 ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {sub.deltaWoW >= 0 ? (
                            <TrendingUp className="h-2.5 w-2.5" />
                          ) : (
                            <TrendingDown className="h-2.5 w-2.5" />
                          )}
                          <span>
                            {sub.deltaWoW >= 0 ? '+' : ''}
                            {sub.deltaWoW}
                          </span>
                        </div>
                      </div>

                      {/* Expand Chevron */}
                      <button className="text-slate-500 hover:text-slate-300">
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="px-3 pb-2">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          sub.score >= 70
                            ? 'bg-emerald-500'
                            : sub.score >= 50
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${sub.score}%` }}
                      />
                    </div>
                  </div>

                  {/* Expanded Driver Details */}
                  {isExpanded && (
                    <div className="border-t border-slate-800 bg-slate-950/60 p-3 text-xs">
                      <div className="font-semibold text-slate-300 mb-1.5 text-[11px] uppercase tracking-wider">
                        {t.keyDriversTitle}
                      </div>
                      <ul className="space-y-1.5">
                        {sub.drivers.map((driver, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-slate-300">
                            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" />
                            <span className="text-[11px] leading-relaxed">{driver}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
