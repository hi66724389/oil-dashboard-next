'use client';

import React, { useState, useMemo } from 'react';
import {
  Sliders,
  Sparkles,
  TrendingUp,
  TrendingDown,
  RotateCcw,
  Download,
  Flame,
  ShieldAlert,
  DollarSign,
} from 'lucide-react';
import {
  BASE_BRENT,
  BASE_WTI,
  getLocalizedPresetScenarios,
  calculateScenario,
} from '@/lib/scenarioEngine';
import { formatCurrency, formatPercent, formatChange } from '@/lib/formatters';
import { PresetScenario, ScenarioParameters } from '@/types/oil';
import { useLanguage } from '@/context/LanguageContext';

const DEFAULT_PARAMS: ScenarioParameters = {
  opecQuotaDelta: 0,
  geopoliticalDisruption: 0,
  sprFlow: 0,
  dxyShiftPercent: 0,
  globalDemandDelta: 0,
  nonOpecSupplyDelta: 0,
  refineryMarginModifier: 0,
};

export const ScenarioSimulator: React.FC = () => {
  const { language, t } = useLanguage();
  const [params, setParams] = useState<ScenarioParameters>(DEFAULT_PARAMS);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  const presets = useMemo(() => getLocalizedPresetScenarios(language), [language]);
  const result = useMemo(() => calculateScenario(params, language), [params, language]);

  const handlePresetSelect = (preset: PresetScenario) => {
    setActivePresetId(preset.id);
    setParams({ ...preset.params });
  };

  const handleReset = () => {
    setActivePresetId(null);
    setParams(DEFAULT_PARAMS);
  };

  const updateParam = (key: keyof ScenarioParameters, val: number) => {
    setActivePresetId(null);
    setParams((prev) => ({ ...prev, [key]: val }));
  };

  const handleExportScenario = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(
        JSON.stringify(
          {
            language,
            params,
            result,
            timestamp: new Date().toISOString(),
          },
          null,
          2
        )
      );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `petropulse_scenario_model_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const isBullish = result.wtiDeltaDollar >= 0;

  const getLocalizedBalanceStatus = (status: string) => {
    switch (status) {
      case 'Severe Deficit':
        return t.severeDeficit;
      case 'Moderate Deficit':
        return t.moderateDeficit;
      case 'Balanced':
        return t.balancedStatus;
      case 'Moderate Surplus':
        return t.moderateSurplus;
      case 'Heavy Glut':
        return t.heavyGlut;
      default:
        return status;
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl">
      {/* Header Bar */}
      <div className="flex flex-col gap-3 border-b border-slate-800/80 pb-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
              <Sliders className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-bold tracking-tight text-white sm:text-base">
              {t.simulatorTitle}
            </h2>
          </div>
          <p className="text-xs text-slate-400">{t.simulatorSubtitle}</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleReset}
            className="flex items-center space-x-1 rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-1.5 text-xs text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{t.resetBaseline}</span>
          </button>
          <button
            onClick={handleExportScenario}
            className="flex items-center space-x-1 rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-1.5 text-xs text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{t.exportModel}</span>
          </button>
        </div>
      </div>

      {/* Preset Scenarios Ribbon */}
      <div className="mt-4">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
          {t.presetsTitle}
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {presets.map((preset) => {
            const isActive = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handlePresetSelect(preset)}
                className={`flex flex-col text-left rounded-xl border p-3 transition-all ${
                  isActive
                    ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[9px] font-mono text-amber-300">
                    {preset.category}
                  </span>
                  {isActive && <Sparkles className="h-3 w-3 text-amber-400" />}
                </div>
                <div className="mt-1.5 text-xs font-bold text-white">{preset.name}</div>
                <div className="mt-1 text-[10px] text-slate-400 line-clamp-2">
                  {preset.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Left Sliders + Right Projection Readout */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Interactive Sliders */}
        <div className="space-y-4 lg:col-span-7 rounded-xl border border-slate-800/80 bg-slate-950/50 p-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <span>{t.slidersTitle}</span>
            <span className="text-[10px] text-slate-500 font-normal">{t.realtimeRecalc}</span>
          </div>

          <div className="space-y-4">
            {/* 1. OPEC+ Quota Delta */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center space-x-1.5 text-slate-300 font-medium">
                  <Flame className="h-3.5 w-3.5 text-orange-400" />
                  <span>{t.sliderOpec}</span>
                </span>
                <span className="font-mono font-bold text-amber-400">
                  {params.opecQuotaDelta > 0 ? '+' : ''}
                  {params.opecQuotaDelta.toFixed(1)}M bpd
                </span>
              </div>
              <input
                type="range"
                min="-2.5"
                max="3.0"
                step="0.1"
                value={params.opecQuotaDelta}
                onChange={(e) => updateParam('opecQuotaDelta', parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>{t.sliderOpecMin}</span>
                <span>{t.sliderOpecMid}</span>
                <span>{t.sliderOpecMax}</span>
              </div>
            </div>

            {/* 2. Geopolitical Supply Disruption */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center space-x-1.5 text-slate-300 font-medium">
                  <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />
                  <span>{t.sliderGeo}</span>
                </span>
                <span className="font-mono font-bold text-rose-400">
                  {params.geopoliticalDisruption.toFixed(1)} {t.sliderGeoUnit}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="4.0"
                step="0.1"
                value={params.geopoliticalDisruption}
                onChange={(e) =>
                  updateParam('geopoliticalDisruption', parseFloat(e.target.value))
                }
                className="w-full accent-rose-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>{t.sliderGeoMin}</span>
                <span>{t.sliderGeoMid}</span>
                <span>{t.sliderGeoMax}</span>
              </div>
            </div>

            {/* 3. Global Demand Delta */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center space-x-1.5 text-slate-300 font-medium">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{t.sliderDemand}</span>
                </span>
                <span className="font-mono font-bold text-emerald-400">
                  {params.globalDemandDelta > 0 ? '+' : ''}
                  {params.globalDemandDelta.toFixed(1)}% YoY
                </span>
              </div>
              <input
                type="range"
                min="-3.0"
                max="4.0"
                step="0.2"
                value={params.globalDemandDelta}
                onChange={(e) => updateParam('globalDemandDelta', parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>{t.sliderDemandMin}</span>
                <span>{t.sliderDemandMid}</span>
                <span>{t.sliderDemandMax}</span>
              </div>
            </div>

            {/* 4. US Dollar Index (DXY) Shift */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center space-x-1.5 text-slate-300 font-medium">
                  <DollarSign className="h-3.5 w-3.5 text-indigo-400" />
                  <span>{t.sliderDxy}</span>
                </span>
                <span className="font-mono font-bold text-indigo-300">
                  {params.dxyShiftPercent > 0 ? '+' : ''}
                  {params.dxyShiftPercent.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min="-10.0"
                max="10.0"
                step="0.5"
                value={params.dxyShiftPercent}
                onChange={(e) => updateParam('dxyShiftPercent', parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>{t.sliderDxyMin}</span>
                <span>{t.sliderDxyMid}</span>
                <span>{t.sliderDxyMax}</span>
              </div>
            </div>

            {/* 5. Non-OPEC Supply & SPR & Refining Margin in Grid */}
            <div className="grid grid-cols-1 gap-3 pt-2 border-t border-slate-800/80 sm:grid-cols-3">
              {/* Non-OPEC */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{t.sliderNonOpec}</span>
                  <span className="font-mono text-white">
                    {params.nonOpecSupplyDelta > 0 ? '+' : ''}
                    {params.nonOpecSupplyDelta.toFixed(1)}M
                  </span>
                </div>
                <input
                  type="range"
                  min="-0.5"
                  max="2.0"
                  step="0.1"
                  value={params.nonOpecSupplyDelta}
                  onChange={(e) => updateParam('nonOpecSupplyDelta', parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer h-1 bg-slate-800"
                />
              </div>

              {/* SPR Flow */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{t.sliderSpr}</span>
                  <span className="font-mono text-white">
                    {params.sprFlow > 0 ? '+' : ''}
                    {params.sprFlow}k bpd
                  </span>
                </div>
                <input
                  type="range"
                  min="-1000"
                  max="1000"
                  step="50"
                  value={params.sprFlow}
                  onChange={(e) => updateParam('sprFlow', parseFloat(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer h-1 bg-slate-800"
                />
              </div>

              {/* Refining Margin */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{t.sliderCrack}</span>
                  <span className="font-mono text-white">
                    {params.refineryMarginModifier > 0 ? '+' : ''}$
                    {params.refineryMarginModifier.toFixed(0)}/bbl
                  </span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="15"
                  step="1"
                  value={params.refineryMarginModifier}
                  onChange={(e) =>
                    updateParam('refineryMarginModifier', parseFloat(e.target.value))
                  }
                  className="w-full accent-teal-500 cursor-pointer h-1 bg-slate-800"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Price Engine Output */}
        <div className="flex flex-col justify-between space-y-4 lg:col-span-5 rounded-xl border border-slate-800/80 bg-slate-950/70 p-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {t.outputTitle}
              </span>
              <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-300">
                {t.p50Expected}
              </span>
            </div>

            {/* Price Cards */}
            <div className="mt-3 grid grid-cols-2 gap-3">
              {/* Projected WTI */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3.5">
                <div className="text-xs text-slate-400">{t.projectedWti}</div>
                <div className="mt-1 font-mono text-2xl font-black text-white sm:text-3xl">
                  {formatCurrency(result.projectedWti)}
                </div>
                <div
                  className={`mt-1 flex items-center space-x-1 font-mono text-xs font-bold ${
                    isBullish ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isBullish ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  <span>
                    {formatChange(result.wtiDeltaDollar)} ({formatPercent(result.wtiDeltaPercent)})
                  </span>
                </div>
                <div className="mt-1 text-[10px] text-slate-500 font-mono">
                  {t.baseSpot}: ${BASE_WTI.toFixed(2)}
                </div>
              </div>

              {/* Projected Brent */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3.5">
                <div className="text-xs text-slate-400">{t.projectedBrent}</div>
                <div className="mt-1 font-mono text-2xl font-black text-white sm:text-3xl">
                  {formatCurrency(result.projectedBrent)}
                </div>
                <div
                  className={`mt-1 flex items-center space-x-1 font-mono text-xs font-bold ${
                    result.brentDeltaDollar >= 0 ? 'text-cyan-400' : 'text-rose-400'
                  }`}
                >
                  {result.brentDeltaDollar >= 0 ? (
                    <TrendingUp className="h-3.5 w-3.5" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5" />
                  )}
                  <span>
                    {formatChange(result.brentDeltaDollar)} ({formatPercent(result.brentDeltaPercent)})
                  </span>
                </div>
                <div className="mt-1 text-[10px] text-slate-500 font-mono">
                  {t.baseSpot}: ${BASE_BRENT.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Implied Supply-Demand Balance */}
            <div className="mt-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">{t.impliedBalance}</span>
                <span
                  className={`font-mono font-bold ${
                    result.impliedBalanceMbpd < 0 ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {result.impliedBalanceMbpd < 0
                    ? `${Math.abs(result.impliedBalanceMbpd)}M bpd ${t.deficit}`
                    : `${result.impliedBalanceMbpd}M bpd ${t.surplus}`}
                </span>
              </div>

              <div className="mt-1.5 flex items-center justify-between">
                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                    result.balanceStatus.includes('Deficit')
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : result.balanceStatus.includes('Surplus')
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  {t.statusLabel} {getLocalizedBalanceStatus(result.balanceStatus)}
                </span>
                <span className="font-mono text-[11px] text-indigo-300">
                  {t.brentWtiSpread} +${result.projectedSpread.toFixed(2)}/bbl
                </span>
              </div>
            </div>

            {/* Confidence Band (P10 / P50 / P90) */}
            <div className="mt-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <div className="text-[11px] font-semibold text-slate-400 mb-1.5">
                {t.confidenceBandsTitle}
              </div>
              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="rounded bg-slate-950/80 p-1.5 border border-slate-800">
                  <div className="text-[9px] text-slate-500 uppercase">{t.p10Floor}</div>
                  <div className="text-xs font-bold text-rose-400">
                    ${result.confidenceBand.p10.toFixed(2)}
                  </div>
                </div>
                <div className="rounded bg-amber-500/10 p-1.5 border border-amber-500/30">
                  <div className="text-[9px] text-amber-400 uppercase">{t.p50Base}</div>
                  <div className="text-xs font-bold text-white">
                    ${result.confidenceBand.p50.toFixed(2)}
                  </div>
                </div>
                <div className="rounded bg-slate-950/80 p-1.5 border border-slate-800">
                  <div className="text-[9px] text-slate-500 uppercase">{t.p90Ceiling}</div>
                  <div className="text-xs font-bold text-emerald-400">
                    ${result.confidenceBand.p90.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Factor Driver Breakdown */}
            <div className="mt-3 space-y-1.5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {t.factorAttributionTitle}
              </div>
              <div className="space-y-1 text-xs">
                {result.primaryDrivers.slice(0, 3).map((driver, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded bg-slate-900/80 px-2.5 py-1 text-[11px] border border-slate-800/60"
                  >
                    <span className="text-slate-300 truncate max-w-[210px]">{driver.factor}</span>
                    <span
                      className={`font-mono font-bold ${
                        driver.impactDollars >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {driver.impactDollars >= 0 ? '+' : ''}${driver.impactDollars.toFixed(2)}/bbl
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
