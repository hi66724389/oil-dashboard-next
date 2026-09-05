import { PresetScenario, ScenarioParameters, ScenarioResult } from '@/types/oil';
import { Language } from '@/context/LanguageContext';

export const BASE_WTI = 76.45;
export const BASE_BRENT = 80.85;
export const BASE_GLOBAL_DEMAND_MBPD = 103.2; // 103.2 Million barrels/day

export function getLocalizedPresetScenarios(lang: Language = 'zh-TW'): PresetScenario[] {
  const isZh = lang === 'zh-TW';
  return [
    {
      id: 'hormuz_escalation',
      name: isZh ? '荷姆茲海峽斷航危機' : 'Strait of Hormuz Supply Crisis',
      category: isZh ? '地緣危機' : 'Geopolitics',
      description: isZh
        ? '波斯灣咽喉要道受阻，每日 280 萬桶原油供給中斷，引發劇烈地緣政治風險溢價飆升。'
        : 'Chokepoint maritime blockage halts 2.8M bpd Persian Gulf crude flows with heavy geopolitical risk premium.',
      params: {
        opecQuotaDelta: 0,
        geopoliticalDisruption: 2.8,
        sprFlow: -400, // emergency SPR release
        dxyShiftPercent: 2.5,
        globalDemandDelta: -0.5,
        nonOpecSupplyDelta: 0.2,
        refineryMarginModifier: 8.0,
      },
    },
    {
      id: 'opec_market_share_war',
      name: isZh ? 'OPEC+ 市占率爭奪戰' : 'OPEC+ Market Share Volume War',
      category: isZh ? '供給衝擊' : 'Supply Shock',
      description: isZh
        ? '產油國同盟全面解除自願減產限制，向市場釋放 220 萬桶/日閒置產能，意在懲戒非 OPEC 增產國。'
        : 'Cartel abandons voluntary cuts, flooding market with 2.2M bpd spare capacity to discipline US shale producers.',
      params: {
        opecQuotaDelta: 2.2,
        geopoliticalDisruption: 0,
        sprFlow: 300, // SPR buying on dip
        dxyShiftPercent: 1.0,
        globalDemandDelta: 0.0,
        nonOpecSupplyDelta: 0.8,
        refineryMarginModifier: -4.0,
      },
    },
    {
      id: 'china_macro_supercycle',
      name: isZh ? '中國強力刺激與軟著陸' : 'China Super-Stimulus & Soft Landing',
      category: isZh ? '需求榮景' : 'Demand Boom',
      description: isZh
        ? '人行財政與信貸組合拳發威，顯著帶動亞洲製造業與物流柴油消耗，疊加美聯準會降息循環。'
        : 'Aggressive PBOC fiscal bazooka drives Asian manufacturing & diesel demand, combined with Fed rate cuts.',
      params: {
        opecQuotaDelta: -0.5,
        geopoliticalDisruption: 0.4,
        sprFlow: 200,
        dxyShiftPercent: -4.5,
        globalDemandDelta: 2.4,
        nonOpecSupplyDelta: 0.3,
        refineryMarginModifier: 6.5,
      },
    },
    {
      id: 'stagflation_demand_cliff',
      name: isZh ? '全球停滯性通膨與需求急凍' : 'Global Stagflation & Demand Destruction',
      category: isZh ? '宏觀逆風' : 'Macro Headwind',
      description: isZh
        ? '黏性通膨迫使利率維持高檔，全球實體製造業產出萎縮，商用運輸油品消耗量銳減。'
        : 'Sticky inflation keeps interest rates elevated, crashing industrial output and commercial transport fuel usage.',
      params: {
        opecQuotaDelta: -1.0,
        geopoliticalDisruption: 0,
        sprFlow: 0,
        dxyShiftPercent: 6.0,
        globalDemandDelta: -2.2,
        nonOpecSupplyDelta: 0.6,
        refineryMarginModifier: -7.0,
      },
    },
    {
      id: 'us_shale_peak_spr_refill',
      name: isZh ? '美頁岩油高原期與 SPR 回補' : 'US Shale Plateau & Heavy SPR Refill',
      category: isZh ? '結構性看多' : 'Structural Bull',
      description: isZh
        ? '二疊紀盆地優質儲層耗竭限制美國產量成長，疊加能源部加速回補戰略石油儲備。'
        : 'Permian Basin Tier-1 inventory depletion caps US output growth while DOE accelerates SPR buybacks.',
      params: {
        opecQuotaDelta: -0.8,
        geopoliticalDisruption: 0.3,
        sprFlow: 750, // SPR aggressive buying
        dxyShiftPercent: -2.0,
        globalDemandDelta: 1.1,
        nonOpecSupplyDelta: -0.4,
        refineryMarginModifier: 3.0,
      },
    },
  ];
}

export const PRESET_SCENARIOS = getLocalizedPresetScenarios('zh-TW');

export function calculateScenario(
  params: ScenarioParameters,
  lang: Language = 'zh-TW'
): ScenarioResult {
  const isZh = lang === 'zh-TW';

  // Implied supply-demand balance (in Million bpd):
  // Net Demand Delta = (globalDemandDelta / 100) * BASE_GLOBAL_DEMAND_MBPD
  // Net Supply Delta = opecQuotaDelta + nonOpecSupplyDelta - geopoliticalDisruption + (sprFlow / 1000)
  // Balance Deficit / Surplus = Net Supply Delta - Net Demand Delta
  const demandDeltaMbpd = (params.globalDemandDelta / 100) * BASE_GLOBAL_DEMAND_MBPD;
  const supplyDeltaMbpd =
    params.opecQuotaDelta +
    params.nonOpecSupplyDelta -
    params.geopoliticalDisruption -
    params.sprFlow / 1000;

  // Implied balance: positive = surplus (bearish), negative = deficit (bullish)
  const impliedBalanceMbpd = supplyDeltaMbpd - demandDeltaMbpd;

  // Econometric elasticity coefficients
  const opecImpact = -params.opecQuotaDelta * 4.65;
  const geoImpact = params.geopoliticalDisruption * 7.25; // heightened risk premium
  const sprImpact = (params.sprFlow / 1000) * 3.4; // buying adds demand
  const nonOpecImpact = -params.nonOpecSupplyDelta * 4.1;
  const demandImpact = (params.globalDemandDelta / 100) * BASE_GLOBAL_DEMAND_MBPD * 4.95;
  const dxyImpact = -params.dxyShiftPercent * 0.72; // dollar headwind / tailwind
  const refineryImpact = params.refineryMarginModifier * 0.38; // crack margin pass-through

  const netWtiDelta =
    opecImpact +
    geoImpact +
    sprImpact +
    nonOpecImpact +
    demandImpact +
    dxyImpact +
    refineryImpact;

  // Brent has slightly higher sensitivity to geopolitical / OPEC maritime flows
  const brentGeoPremium = params.geopoliticalDisruption * 1.15;
  const netBrentDelta = netWtiDelta + brentGeoPremium - params.opecQuotaDelta * 0.35;

  const projectedWti = Math.max(25.0, Number((BASE_WTI + netWtiDelta).toFixed(2)));
  const projectedBrent = Math.max(28.0, Number((BASE_BRENT + netBrentDelta).toFixed(2)));

  const wtiDeltaDollar = Number((projectedWti - BASE_WTI).toFixed(2));
  const wtiDeltaPercent = Number(((wtiDeltaDollar / BASE_WTI) * 100).toFixed(2));
  const brentDeltaDollar = Number((projectedBrent - BASE_BRENT).toFixed(2));
  const brentDeltaPercent = Number(((brentDeltaDollar / BASE_BRENT) * 100).toFixed(2));
  const projectedSpread = Number((projectedBrent - projectedWti).toFixed(2));

  // Determine market balance status
  let balanceStatus: ScenarioResult['balanceStatus'] = 'Balanced';
  if (impliedBalanceMbpd <= -1.5) balanceStatus = 'Severe Deficit';
  else if (impliedBalanceMbpd < -0.3) balanceStatus = 'Moderate Deficit';
  else if (impliedBalanceMbpd <= 0.3) balanceStatus = 'Balanced';
  else if (impliedBalanceMbpd <= 1.5) balanceStatus = 'Moderate Surplus';
  else balanceStatus = 'Heavy Glut';

  // Confidence Bands based on OVX implied volatility ~25-30%
  const uncertaintySpread = Math.max(4.5, projectedWti * 0.12);
  const p10 = Number((projectedWti - uncertaintySpread * 1.1).toFixed(2));
  const p50 = projectedWti;
  const p90 = Number((projectedWti + uncertaintySpread * 1.25).toFixed(2));

  // Driver breakdown with localized explanations
  const drivers: ScenarioResult['primaryDrivers'] = [
    {
      factor: isZh ? 'OPEC+ 產能配額調整' : 'OPEC+ Output Quotas',
      impactDollars: Number(opecImpact.toFixed(2)),
      direction: opecImpact >= 0 ? 'up' : 'down',
      explanation: isZh
        ? params.opecQuotaDelta === 0
          ? '產量配額維持於基準線。'
          : `${params.opecQuotaDelta > 0 ? '增產釋放' : '減產收縮'} ${Math.abs(
              params.opecQuotaDelta
            ).toFixed(1)} 百萬桶/日，直接調節全球閒置產能緩衝。`
        : params.opecQuotaDelta === 0
        ? 'Quotas unchanged at baseline.'
        : `${params.opecQuotaDelta > 0 ? 'Surge' : 'Cut'} of ${Math.abs(
            params.opecQuotaDelta
          )}M bpd adjusts global spare cushion.`,
    },
    {
      factor: isZh ? '地緣政治供給中斷溢價' : 'Geopolitical Disruption Premia',
      impactDollars: Number(geoImpact.toFixed(2)),
      direction: geoImpact >= 0 ? 'up' : 'down',
      explanation: isZh
        ? params.geopoliticalDisruption === 0
          ? '無主動軍事衝突斷航中斷。'
          : `海峽封鎖或戰火導致 ${params.geopoliticalDisruption.toFixed(1)} 百萬桶/日停產中斷。`
        : params.geopoliticalDisruption === 0
        ? 'Zero active conflict disruption.'
        : `${params.geopoliticalDisruption}M bpd offline from conflict/blockade risk.`,
    },
    {
      factor: isZh ? '全球宏觀與中國實體需求' : 'Global Macro & China Demand',
      impactDollars: Number(demandImpact.toFixed(2)),
      direction: demandImpact >= 0 ? 'up' : 'down',
      explanation: isZh
        ? params.globalDemandDelta === 0
          ? '全球需求維持基準年增率。'
          : `全球消費量產生 ${params.globalDemandDelta > 0 ? '+' : ''}${params.globalDemandDelta.toFixed(
              1
            )}% 偏離 (${(
              (params.globalDemandDelta / 100) *
              BASE_GLOBAL_DEMAND_MBPD
            ).toFixed(1)} 百萬桶/日)。`
        : params.globalDemandDelta === 0
        ? 'Baseline demand trend.'
        : `${params.globalDemandDelta > 0 ? '+' : ''}${params.globalDemandDelta}% shift in global consumption (${(
            (params.globalDemandDelta / 100) *
            BASE_GLOBAL_DEMAND_MBPD
          ).toFixed(1)}M bpd).`,
    },
    {
      factor: isZh ? '美元指數 (DXY) 匯率估值' : 'US Dollar (DXY) Valuation',
      impactDollars: Number(dxyImpact.toFixed(2)),
      direction: dxyImpact >= 0 ? 'up' : 'down',
      explanation: isZh
        ? params.dxyShiftPercent === 0
          ? '美元指數維持平盤。'
          : `美元匯率產生 ${params.dxyShiftPercent > 0 ? '+' : ''}${params.dxyShiftPercent.toFixed(
              1
            )}% 波動，影響非美買家之購買力。`
        : params.dxyShiftPercent === 0
        ? 'Stable USD index.'
        : `${params.dxyShiftPercent > 0 ? '+' : ''}${params.dxyShiftPercent}% FX shift on commodity purchasing power.`,
    },
    {
      factor: isZh ? '非 OPEC 頁岩油與深海產量' : 'Non-OPEC Shale & Deepwater Supply',
      impactDollars: Number(nonOpecImpact.toFixed(2)),
      direction: nonOpecImpact >= 0 ? 'up' : 'down',
      explanation: isZh
        ? params.nonOpecSupplyDelta === 0
          ? '二疊紀與圭亞那維持基準產能。'
          : `非 OPEC 產量產生 ${params.nonOpecSupplyDelta > 0 ? '+' : ''}${params.nonOpecSupplyDelta.toFixed(
              1
            )} 百萬桶/日邊際變化。`
        : params.nonOpecSupplyDelta === 0
        ? 'Permian / Guyana baseline.'
        : `${params.nonOpecSupplyDelta > 0 ? '+' : ''}${params.nonOpecSupplyDelta}M bpd non-cartel volume change.`,
    },
    {
      factor: isZh ? 'SPR 儲備釋放/回補與煉油拉動' : 'SPR & Refining Pull',
      impactDollars: Number((sprImpact + refineryImpact).toFixed(2)),
      direction: sprImpact + refineryImpact >= 0 ? 'up' : 'down',
      explanation: isZh
        ? `SPR 流量 ${params.sprFlow > 0 ? '+' : ''}${params.sprFlow} 千桶/日，裂解毛利調節 ${
            params.refineryMarginModifier > 0 ? '+' : ''
          }$${params.refineryMarginModifier}/桶。`
        : `SPR flow ${params.sprFlow > 0 ? '+' : ''}${params.sprFlow}k bpd, Crack Margin adjustment ${
            params.refineryMarginModifier > 0 ? '+' : ''
          }$${params.refineryMarginModifier}/bbl.`,
    },
  ];

  return {
    projectedWti,
    projectedBrent,
    wtiDeltaDollar,
    wtiDeltaPercent,
    brentDeltaDollar,
    brentDeltaPercent,
    projectedSpread,
    impliedBalanceMbpd: Number(impliedBalanceMbpd.toFixed(2)),
    balanceStatus,
    confidenceBand: { p10, p50, p90 },
    primaryDrivers: drivers.sort((a, b) => Math.abs(b.impactDollars) - Math.abs(a.impactDollars)),
  };
}
