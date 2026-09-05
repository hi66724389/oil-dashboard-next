'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'zh-TW' | 'en';

export interface Translations {
  // Brand & Header
  terminalTitle: string;
  terminalBadge: string;
  terminalSubtitle: string;
  activeFeed: string;
  autoSync: string;
  paused: string;
  wtiSpot: string;
  brentSpot: string;
  masterIndex: string;
  methodology: string;
  modelLogic: string;
  exportReport: string;
  exportCSV: string;
  exportModel: string;
  resetBaseline: string;

  // Tabs
  tabOverview: string;
  tabDOMCurve: string;
  tabRefinery: string;
  tabTankers: string;
  tabResearch: string;
  tabCatalysts: string;
  tabNews: string;
  tabSimulator: string;
  tabAnalytics: string;

  // Sentiment Ratings
  extremeBullish: string;
  bullish: string;
  neutral: string;
  bearish: string;
  extremeBearish: string;

  // Impact Levels
  criticalImpact: string;
  highImpact: string;
  mediumImpact: string;
  lowImpact: string;

  // Implication Types
  implicationBullish: string;
  implicationBearish: string;
  implicationNeutral: string;

  // Categories
  catCrude: string;
  catCrypto: string;
  catRefined: string;
  catSpread: string;
  catMacro: string;
  catInventory: string;
  catOPEC: string;
  catMonetary: string;
  catTrade: string;
  catGeopolitics: string;
  catReport: string;
  catSupply: string;
  catDemand: string;
  catShipping: string;
  catRefining: string;

  // Ticker Grid
  low: string;
  high: string;
  volume: string;
  widening: string;
  narrowing: string;

  // Sentiment Gauge
  sentimentGaugeTitle: string;
  sentimentGaugeSubtitle: string;
  confidenceHigh: string;
  wowDelta: string;
  dodDelta: string;
  trajectory30d: string;
  trajectoryTrending: string;
  subIndicesTitle: string;
  subIndicesHint: string;
  weight: string;
  keyDriversTitle: string;
  dialBear: string;
  dialNeutral: string;
  dialBull: string;

  // Catalyst Tracker
  catalystRadarTitle: string;
  catalystRadarSubtitle: string;
  allCatalysts: string;
  upcoming: string;
  released: string;
  criticalOnly: string;
  searchCatalystsPlaceholder: string;
  allCategories: string;
  allImpacts: string;
  colCatalyst: string;
  colCategory: string;
  colDateTime: string;
  colPrev: string;
  colForecast: string;
  colActual: string;
  colSurprise: string;
  colImplication: string;
  colImpact: string;
  colDetails: string;
  noCatalystsFound: string;
  pending: string;
  transmissionTitle: string;
  macroRelevanceScore: string;
  dataProvider: string;
  historicalReactionsTitle: string;
  histDate: string;
  histActual: string;
  histSurprise: string;
  histWti1h: string;
  upcomingNote: string;

  // News Wire
  newsWireTitle: string;
  newsWireSubtitle: string;
  liveStreamActive: string;
  liveStreamPaused: string;
  flashIntel: string;
  readWire: string;
  allChannels: string;
  allSentiments: string;
  searchNewsPlaceholder: string;
  noNewsFound: string;
  copiedCitation: string;

  // Scenario Simulator
  simulatorTitle: string;
  simulatorSubtitle: string;
  presetsTitle: string;
  slidersTitle: string;
  realtimeRecalc: string;
  sliderOpec: string;
  sliderOpecMin: string;
  sliderOpecMid: string;
  sliderOpecMax: string;
  sliderGeo: string;
  sliderGeoMin: string;
  sliderGeoMid: string;
  sliderGeoMax: string;
  sliderGeoUnit: string;
  sliderDemand: string;
  sliderDemandMin: string;
  sliderDemandMid: string;
  sliderDemandMax: string;
  sliderDxy: string;
  sliderDxyMin: string;
  sliderDxyMid: string;
  sliderDxyMax: string;
  sliderNonOpec: string;
  sliderSpr: string;
  sliderCrack: string;
  outputTitle: string;
  p50Expected: string;
  projectedWti: string;
  projectedBrent: string;
  baseSpot: string;
  impliedBalance: string;
  deficit: string;
  surplus: string;
  statusLabel: string;
  brentWtiSpread: string;
  confidenceBandsTitle: string;
  p10Floor: string;
  p50Base: string;
  p90Ceiling: string;
  factorAttributionTitle: string;

  // Balance Statuses
  severeDeficit: string;
  moderateDeficit: string;
  balancedStatus: string;
  moderateSurplus: string;
  heavyGlut: string;

  // Chokepoint Radar
  chokepointTitle: string;
  chokepointSubtitle: string;
  transitVolume: string;
  globalShare: string;
  ofSeaborne: string;
  securityAssessment: string;
  tankers24h: string;
  vessels: string;
  statusNormal: string;
  statusElevated: string;
  statusHighDisruption: string;

  // OPEC Table
  opecTitle: string;
  opecSubtitle: string;
  totalSpareCushion: string;
  activeVoluntaryCuts: string;
  colMember: string;
  colQuota: string;
  colActualOutput: string;
  colVoluntaryCut: string;
  colCompliance: string;
  colSpareCapacity: string;
  colStatus: string;
  statusCompliant: string;
  statusOverproducing: string;
  statusUnderproducing: string;

  // Storage Heatmap
  storageTitle: string;
  storageSubtitle: string;
  tankUtilization: string;
  vs5y: string;
  statusDraw: string;
  statusBuild: string;

  // Price Chart
  chartBenchmarksTitle: string;
  chartSpreadTitle: string;
  realtimeBadge: string;
  modeWtiBrent: string;
  modeWtiOnly: string;
  modeBrentOnly: string;
  modeSpread: string;
  wtiSpotLegend: string;
  brentGlobalLegend: string;
  spreadLegend: string;
  catalystMarkersLegend: string;
  chartRange: string;
  settlementSource: string;
  macroEventPin: string;
  dismiss: string;

  // Methodology Modal
  methodologyTitle: string;
  methodologySubtitle: string;
  methodologyIntro: string;
  factorAllocationTitle: string;
  geoRiskTitle: string;
  geoRiskDesc: string;
  opecQuotaTitle: string;
  opecQuotaDesc: string;
  physInvTitle: string;
  physInvDesc: string;
  cotCtaTitle: string;
  cotCtaDesc: string;
  macroLiquidityTitle: string;
  macroLiquidityDesc: string;
  scaleInterpTitle: string;
  scaleExtremeBear: string;
  scaleBear: string;
  scaleNeutral: string;
  scaleBull: string;
  scaleExtremeBull: string;
  understoodBtn: string;

  // =====================================
  // New: Term Structure & Futures Curve
  // =====================================
  termStructureTitle: string;
  termStructureSubtitle: string;
  backwardation: string;
  contango: string;
  promptSpread1M2M: string;
  annualizedRollYield: string;
  sixMonthSpread: string;
  twelveMonthSpread: string;
  curveComparisonTitle: string;
  curveTableTitle: string;
  colTenor: string;
  colContract: string;
  colDelivery: string;
  colPrice: string;
  colChange: string;
  colSpreadPrompt: string;
  colOpenInterest: string;
  colCurveShape: string;

  // Level 2 DOM (Order Book)
  domTitle: string;
  domSubtitle: string;
  orderImbalance: string;
  bidHeavy: string;
  askHeavy: string;
  colBidQty: string;
  colBidTotal: string;
  colAskQty: string;
  colAskTotal: string;
  timeAndSalesTitle: string;
  colTime: string;
  colSide: string;
  colSize: string;
  colExchange: string;

  // =====================================
  // New: Refinery Runs & Crack Spreads
  // =====================================
  refineryTitle: string;
  refinerySubtitle: string;
  heroCrack321: string;
  heroGasolineCrack: string;
  heroDieselCrack: string;
  globalThroughput: string;
  globalUtilization: string;
  cracksTableTitle: string;
  colFormula: string;
  colMargin: string;
  col5yAvg: string;
  colTrend: string;
  refineriesTableTitle: string;
  colThroughput: string;
  colCapacity: string;
  colUtilization: string;
  colPlannedMaint: string;
  colUnplanned: string;
  colAvgMargin: string;

  // =====================================
  // New: Tanker Radar & Hormuz AIS
  // =====================================
  tankerRadarTitle: string;
  tankerRadarSubtitle: string;
  transit24h: string;
  vesselsInHormuz: string;
  avgSpeed: string;
  gpsSpoofing: string;
  warRiskRate: string;
  crudeOnWater: string;
  capeRerouted: string;
  floatingStorage: string;
  vesselManifestTitle: string;
  colVesselName: string;
  colClass: string;
  colFlag: string;
  colCargo: string;
  colOrigin: string;
  colDestination: string;
  colSpeedDraft: string;
  colETA: string;
  radarScanning: string;

  // =====================================
  // New: Institutional Research Digest
  // =====================================
  researchTitle: string;
  researchSubtitle: string;
  streetConsensusTitle: string;
  medianBrentTarget: string;
  medianWtiTarget: string;
  bullishConsensus: string;
  neutralConsensus: string;
  bearishConsensus: string;
  targetRangeLabel: string;
  thesisLabel: string;
  catalystFocusLabel: string;
  readFullQuote: string;

  // =====================================
  // New: Terminal Status Bar Telemetry
  // =====================================
  sysStatus: string;
  connected: string;
  feedNymex: string;
  feedIce: string;
  feedAis: string;
  bufferHealth: string;
  memoryUsage: string;
  versionTag: string;

  // Footer
  footerTerminal: string;
  footerTagline: string;
  footerSources: string;
  footerSynced: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  'zh-TW': {
    // Brand & Header
    terminalTitle: 'PETROPULSE',
    terminalBadge: '彭博大宗商品交易終端',
    terminalSubtitle: '原油情緒指標、期限結構、煉廠裂解價差、海峽雷達與華爾街機構觀點',
    activeFeed: 'NYMEX / ICE 即時連線 12ms',
    autoSync: '自動同步',
    paused: '已暫停',
    wtiSpot: 'WTI 現貨',
    brentSpot: '布蘭特現貨',
    masterIndex: '綜合情緒指數：',
    methodology: '模型演算法',
    modelLogic: '模型邏輯',
    exportReport: '匯出報表',
    exportCSV: '匯出 CSV',
    exportModel: '匯出模型',
    resetBaseline: '重設為基準值',

    // Tabs
    tabOverview: '總覽交易台',
    tabDOMCurve: '期貨曲線與盤口 (DOM)',
    tabRefinery: '煉廠開工與裂解價差',
    tabTankers: '荷姆茲海峽油輪雷達',
    tabResearch: '華爾街機構觀點',
    tabCatalysts: '催化劑追蹤',
    tabNews: '即時情報電訊',
    tabSimulator: '情境壓力模擬',
    tabAnalytics: 'OPEC與庫存分析',

    // Sentiment Ratings
    extremeBullish: '強烈看多',
    bullish: '看多偏強',
    neutral: '中性盤整',
    bearish: '看空偏弱',
    extremeBearish: '強烈看空',

    // Impact Levels
    criticalImpact: '🔥 關鍵重大影響',
    highImpact: '高影響力',
    mediumImpact: '中度影響力',
    lowImpact: '低度影響力',

    // Implication Types
    implicationBullish: '看多',
    implicationBearish: '看空',
    implicationNeutral: '中性',

    // Categories
    catCrude: '原油',
    catCrypto: '加密合約',
    catRefined: '成品油',
    catSpread: '價差',
    catMacro: '宏觀',
    catInventory: '庫存數據 (EIA / API)',
    catOPEC: 'OPEC+ 產能政策',
    catMonetary: '貨幣政策 / 美聯準會',
    catTrade: '貿易與鑽井數據',
    catGeopolitics: '地緣政治與海事安全',
    catReport: '能源機構月報 (IEA/OPEC)',
    catSupply: '原油供給',
    catDemand: '全球需求',
    catShipping: '航運油輪',
    catRefining: '煉油裂解',

    // Ticker Grid
    low: '最低',
    high: '最高',
    volume: '成交量',
    widening: '走擴',
    narrowing: '收窄',

    // Sentiment Gauge
    sentimentGaugeTitle: '全球原油機構情緒儀表板',
    sentimentGaugeSubtitle: '機構級貝式多因子綜合評分（0 = 極度看空，100 = 極度看多）',
    confidenceHigh: '高信賴度',
    wowDelta: '週變動 (WoW)',
    dodDelta: '日變動 (DoD)',
    trajectory30d: '30 日情緒走勢軌跡',
    trajectoryTrending: '看多趨勢顯著 (+20分)',
    subIndicesTitle: '因子子指數與核心驅動',
    subIndicesHint: '點擊因子展開驅動明細',
    weight: '權重',
    keyDriversTitle: '關鍵催化驅動因子：',
    dialBear: '0 看空',
    dialNeutral: '50 中性',
    dialBull: '100 看多',

    // Catalyst Tracker
    catalystRadarTitle: '宏觀催化劑雷達與財經日曆',
    catalystRadarSubtitle: '即時追蹤原油庫存報告、OPEC+ 決策會議、各國央行決議與數據意外指數',
    allCatalysts: '全部催化事件',
    upcoming: '即將公佈',
    released: '已公佈',
    criticalOnly: '🔥 關鍵重大影響',
    searchCatalystsPlaceholder: '搜尋催化事件、國家或邏輯...',
    allCategories: '全部類別',
    allImpacts: '全部影響等級',
    colCatalyst: '催化事件 / 指標',
    colCategory: '分類',
    colDateTime: '日期 / 時間 (UTC)',
    colPrev: '前值',
    colForecast: '市場預期',
    colActual: '公佈值',
    colSurprise: '意外偏差',
    colImplication: '市場影響',
    colImpact: '影響力',
    colDetails: '明細',
    noCatalystsFound: '查無符合條件之宏觀催化事件，請嘗試調整篩選條件。',
    pending: '待公佈',
    transmissionTitle: '原油市場影響與定價傳導機制',
    macroRelevanceScore: '宏觀關聯權重評分：',
    dataProvider: '數據發佈機構：',
    historicalReactionsTitle: '歷史油價反應（公佈後 1 小時價格波動）',
    histDate: '日期',
    histActual: '公佈值',
    histSurprise: '偏差',
    histWti1h: 'WTI 1h',
    upcomingNote: '即將公佈之事件。根據歷史統計模型，公佈當下即期 WTI/布蘭特合約預期波動率為 ±1.65%。',

    // News Wire
    newsWireTitle: '即時能源情報電訊',
    newsWireSubtitle: '多源即時電訊，內建自動化情緒量化評分與一手情報來源連結',
    liveStreamActive: '即時串流：接收中',
    liveStreamPaused: '即時串流：已暫停',
    flashIntel: '重大快訊',
    readWire: '閱讀全文',
    allChannels: '全部情報',
    allSentiments: '全部情緒',
    searchNewsPlaceholder: '搜尋情報標題或標籤...',
    noNewsFound: '目前無符合篩選條件的情報更新。',
    copiedCitation: '已複製引用資訊',

    // Scenario Simulator
    simulatorTitle: '宏觀情境壓力模擬與均衡定價引擎',
    simulatorSubtitle: '壓力測試全球原油定價：模擬 OPEC+ 配額調整、海峽供給中斷、戰略儲備釋放與美元匯率波動',
    presetsTitle: '精選宏觀壓力測試情境：',
    slidersTitle: '宏觀變數與衝擊調節滑桿',
    realtimeRecalc: '即時動態微積分重算',
    sliderOpec: 'OPEC+ 產能配額調整（百萬桶/日）：',
    sliderOpecMin: '-2.5M (深度擴大減產)',
    sliderOpecMid: '0.0 (維持現狀)',
    sliderOpecMax: '+3.0M (增產/價格戰衝擊)',
    sliderGeo: '地緣政治供給中斷 / 停產衝擊：',
    sliderGeoMin: '0.0 (正常通航)',
    sliderGeoMid: '2.0M (主要咽喉阻斷)',
    sliderGeoMax: '4.0M (區域全面危機)',
    sliderGeoUnit: 'M 桶/日 停產中斷',
    sliderDemand: '全球需求成長 / 中國工業復甦力道：',
    sliderDemandMin: '-3.0% (嚴重經濟衰退)',
    sliderDemandMid: '0.0% (基準預期 +1.2M)',
    sliderDemandMax: '+4.0% (全球超級週期)',
    sliderDxy: '美元指數 (DXY) 匯率估值變動：',
    sliderDxyMin: '-10% (美元走弱/利多大宗商品)',
    sliderDxyMid: '0% (中性平盤)',
    sliderDxyMax: '+10% (強勢美元強烈逆風)',
    sliderNonOpec: '非 OPEC 原油產量：',
    sliderSpr: '美國 SPR 儲備流向：',
    sliderCrack: '裂解價差變動：',
    outputTitle: '模擬均衡油價產出',
    p50Expected: 'P50 基準預期',
    projectedWti: '預測 WTI 現貨價',
    projectedBrent: '預測布蘭特現貨價',
    baseSpot: '基準現貨價',
    impliedBalance: '隱含全球供需缺口：',
    deficit: '供給赤字 (看多)',
    surplus: '供給過剩 (看空)',
    statusLabel: '供需狀態：',
    brentWtiSpread: '布蘭特/WTI 跨洋價差：',
    confidenceBandsTitle: '計量經濟波動區間（OVX 隱含置信帶）：',
    p10Floor: 'P10 悲觀下限',
    p50Base: 'P50 基準預測',
    p90Ceiling: 'P90 樂觀上限',
    factorAttributionTitle: '關鍵因子價格歸因分析：',

    // Balance Statuses
    severeDeficit: '嚴重供給赤字 (強烈看多)',
    moderateDeficit: '溫和供給赤字 (看多偏強)',
    balancedStatus: '供需大體平衡 (中性盤整)',
    moderateSurplus: '溫和供給過剩 (看空偏弱)',
    heavyGlut: '嚴重供給過剩 (強烈看空)',

    // Chokepoint Radar
    chokepointTitle: '全球海上原油戰略咽喉與航運風險雷達',
    chokepointSubtitle: '即時監控每日 4,870 萬桶戰略水道海運原油航行與地緣安全動態',
    transitVolume: '日運載量',
    globalShare: '全球海運佔比',
    ofSeaborne: '全球海運總量',
    securityAssessment: '安全風險評估：',
    tankers24h: '24小時油輪數：',
    vessels: '艘',
    statusNormal: '正常通行',
    statusElevated: '中度警戒',
    statusHighDisruption: '嚴重受阻',

    // OPEC Table
    opecTitle: 'OPEC+ 產能配額與自願減產執行追蹤',
    opecSubtitle: '逐國追蹤減產協議目標、第三方二手來源實際產量與剩餘閒置產能',
    totalSpareCushion: '整體閒置產能儲備：',
    activeVoluntaryCuts: '現行自願減產總額：',
    colMember: '成員國',
    colQuota: '目標配額',
    colActualOutput: '實際產量',
    colVoluntaryCut: '自願減產額',
    colCompliance: '配額執行率',
    colSpareCapacity: '閒置產能',
    colStatus: '執行狀態',
    statusCompliant: '達標遵守',
    statusOverproducing: '超產違規',
    statusUnderproducing: '產能不足',

    // Storage Heatmap
    storageTitle: '全球實體原油庫存基地與庫存壓力熱力圖',
    storageSubtitle: '商業原油庫容利用率、單週庫存去化/累積與五年同期歷史均值偏離度',
    tankUtilization: '庫容利用率',
    vs5y: '較 5 年均值：',
    statusDraw: '去庫存 (Draw)',
    statusBuild: '累庫存 (Build)',

    // Price Chart
    chartBenchmarksTitle: '基準原油價格走勢（現貨與連續合約）',
    chartSpreadTitle: '布蘭特 - WTI 跨洋價差 (CO1! - CL1!)',
    realtimeBadge: '即時數據',
    modeWtiBrent: 'WTI 與布蘭特',
    modeWtiOnly: '僅 WTI',
    modeBrentOnly: '僅布蘭特',
    modeSpread: '跨洋價差',
    wtiSpotLegend: 'WTI 現貨 (CL1!)',
    brentGlobalLegend: '布蘭特全球基準 (CO1!)',
    spreadLegend: '布蘭特-WTI 價差',
    catalystMarkersLegend: '宏觀催化事件標記',
    chartRange: '區間：',
    settlementSource: 'CME / ICE 官方結算數據',
    macroEventPin: '宏觀關鍵事件：',
    dismiss: '關閉',

    // Methodology Modal
    methodologyTitle: 'PetroPulse™ 情緒量化演算法模型架構',
    methodologySubtitle: '量化貝式多因子動態權重定價模型',
    methodologyIntro:
      'PetroPulse 全球原油情緒指數（0–100）綜合整合 28 項量化與質化宏觀數據流，經由貝式機率模型即時校準，精準對標 WTI 與布蘭特即期定價與市場偏離度。',
    factorAllocationTitle: '因子權重分配體系：',
    geoRiskTitle: '地緣政治風險 (25%)',
    geoRiskDesc: '即時監測荷姆茲海峽、紅海/曼德海峽 AIS 油輪繞航數據、海上戰爭保險附加費及產油國制裁實施力度。',
    opecQuotaTitle: 'OPEC+ 配額與政策 (25%)',
    opecQuotaDesc: '追蹤第三方二手估計產量、沙烏地阿美官方亞洲售價 (OSP) 及各成員國自願減產承諾之落實度。',
    physInvTitle: '實體原油庫存 (20%)',
    physInvDesc: '評估美國 EIA/API 商業原油與油品去庫存速度、庫欣中心庫容水準、歐洲 ARA 庫存與亞洲海上浮頂油輪庫存。',
    cotCtaTitle: 'COT 投機部位與 CTA 資金流 (15%)',
    cotCtaDesc: '監控 CFTC 基金管理機構淨多空頭寸、25-Delta 選擇權 Gamma 偏斜率以及量化 CTA 演算法趨勢跟隨買賣點。',
    macroLiquidityTitle: '宏觀流動性與匯率 Beta (15%)',
    macroLiquidityDesc: '評估美元指數 (DXY) 負相關彈性係數、中國央行製造業與物流信用刺激流動性，以及 3:2:1 裂解價差需求拉動。',
    scaleInterpTitle: '指數評分區間定義：',
    scaleExtremeBear: '0-25: 強烈看空',
    scaleBear: '25-45: 看空偏弱',
    scaleNeutral: '45-55: 中性盤整',
    scaleBull: '55-75: 看多偏強',
    scaleExtremeBull: '75-100: 強烈看多',
    understoodBtn: '確認了解',

    // Term Structure & Futures Curve
    termStructureTitle: '原油期貨期限結構與合約曲線 (Futures Curve)',
    termStructureSubtitle: '近遠月合約逆價差 (Backwardation) / 正價差 (Contango) 與年化展期殖利率分析',
    backwardation: '逆價差 (現貨溢價 Backwardation)',
    contango: '正價差 (期貨溢價 Contango)',
    promptSpread1M2M: 'M1-M2 近月價差：',
    annualizedRollYield: '年化展期殖利率 (Roll Yield)：',
    sixMonthSpread: 'M1-M6 半年價差：',
    twelveMonthSpread: 'M1-M12 一年期價差：',
    curveComparisonTitle: '期貨合約曲線走勢比較 (現時 vs 1週前 vs 1個月前)',
    curveTableTitle: '連續交割月份報價、價差結構與未平倉量',
    colTenor: '合約期限',
    colContract: '代碼',
    colDelivery: '交割月份',
    colPrice: '結算價 ($/桶)',
    colChange: '漲跌 ($)',
    colSpreadPrompt: '較近月價差',
    colOpenInterest: '未平倉量 (OI)',
    colCurveShape: '結構形態',

    // Level 2 DOM (Order Book)
    domTitle: 'Level 2 深度盤口 (DOM / Order Book)',
    domSubtitle: 'NYMEX / ICE 買賣十檔委託深度、買賣不平衡比率與即時逐筆成交',
    orderImbalance: '買賣盤力量偏斜 (Order Imbalance)：',
    bidHeavy: '買盤強勢委託 (+18.4%)',
    askHeavy: '賣盤壓制委託',
    colBidQty: '買量 (口數)',
    colBidTotal: '累計買深',
    colAskQty: '賣量 (口數)',
    colAskTotal: '累計賣深',
    timeAndSalesTitle: '逐筆成交明細 (Time & Sales Tape)',
    colTime: '時間',
    colSide: '方向',
    colSize: '口數',
    colExchange: '交易所',

    // Refinery Runs & Crack Spreads
    refineryTitle: '全球煉油廠開工率與成品油裂解價差 (Crack Spreads)',
    refinerySubtitle: '3:2:1 裂解價差、汽/柴油精煉毛利與各大洲煉油樞紐原油加工吞吐量',
    heroCrack321: '3:2:1 墨西哥灣裂解價差 (USGC)',
    heroGasolineCrack: 'RBOB 汽油裂解利潤',
    heroDieselCrack: 'ULSD 超低硫柴油裂解利潤',
    globalThroughput: '全球煉油日加工總量：',
    globalUtilization: '全球平均開工利用率：',
    cracksTableTitle: '關鍵基準成品油裂解價差明細',
    colFormula: '精煉模型公式',
    colMargin: '裂解利潤 ($/桶)',
    col5yAvg: '5年歷史均值',
    colTrend: '趨勢',
    refineriesTableTitle: '全球主要煉油聚落開工率與檢修停產追蹤',
    colThroughput: '日加工量 (Mbpd)',
    colCapacity: '名義產能 (Mbpd)',
    colUtilization: '開工利用率',
    colPlannedMaint: '計劃檢修',
    colUnplanned: '意外停工',
    colAvgMargin: '綜合煉油毛利',

    // Tanker Radar & Hormuz AIS
    tankerRadarTitle: '荷姆茲海峽 AIS 油輪即時雷達與海運追蹤',
    tankerRadarSubtitle: '即時監控波斯灣咽喉 2,080 萬桶/日原油航運、VLCC 超大型油輪動態與海運戰爭險',
    transit24h: '24小時通行總量：',
    vesselsInHormuz: '海峽警戒區油輪數：',
    avgSpeed: '平均航速：',
    gpsSpoofing: 'GPS/電子干擾威脅：',
    warRiskRate: '海事戰爭險附加費率：',
    crudeOnWater: '全球在途原油總量：',
    capeRerouted: '繞行好望角改道量：',
    floatingStorage: '全球海上浮頂儲備：',
    vesselManifestTitle: '荷姆茲海峽在途油輪即時動態清單',
    colVesselName: '油輪名稱',
    colClass: '船型等級',
    colFlag: '船籍旗幟',
    colCargo: '承載油種',
    colOrigin: '裝載出發港',
    colDestination: '目的港 (路線)',
    colSpeedDraft: '航速 / 吃水',
    colETA: '預估抵港 (ETA)',
    radarScanning: 'AIS 衛星雷達掃描中...',

    // Institutional Research Digest
    researchTitle: '華爾街頂級投行與跨國大宗貿易商研究觀點',
    researchSubtitle: '高盛、摩根士丹利、維多、托克與美國 EIA STEO 一手觀點與目標價預測',
    streetConsensusTitle: '華爾街 12 個月原油目標價共識',
    medianBrentTarget: '布蘭特中位數目標價：',
    medianWtiTarget: 'WTI 中位數目標價：',
    bullishConsensus: '看多機構佔比：',
    neutralConsensus: '中性機構佔比：',
    bearishConsensus: '看空機構佔比：',
    targetRangeLabel: '目標預測區間：',
    thesisLabel: '供需核心邏輯：',
    catalystFocusLabel: '關鍵催化關注：',
    readFullQuote: '閱讀研究精要',

    // Terminal Status Bar Telemetry
    sysStatus: '系統狀態：',
    connected: '連線正常',
    feedNymex: 'NYMEX 直連 12ms',
    feedIce: 'ICE 數據流 100ms',
    feedAis: 'AIS 衛星雷達正常',
    bufferHealth: '緩衝區健康度 99.8%',
    memoryUsage: '記憶體: 48.2MB',
    versionTag: 'PETROPULSE TERMINAL v2.5 ENTERPRISE',

    // Footer
    footerTerminal: 'PetroPulse™ 彭博大宗商品決策終端',
    footerTagline: '機構級原油量化決策情報',
    footerSources: '數據來源：美國 EIA、OPEC 組織、CME NYMEX、ICE 期貨、IEA、S&P Platts、Vortexa AIS',
    footerSynced: '所有數據源已即時同步',
  },

  'en': {
    // Brand & Header
    terminalTitle: 'PETROPULSE',
    terminalBadge: 'BLOOMBERG COMMODITY TERMINAL',
    terminalSubtitle: 'Crude Sentiment, Term Structure, Refinery Cracks, Tanker AIS Radar & Wall Street Consensus',
    activeFeed: 'NYMEX / ICE LIVE FEED 12ms',
    autoSync: 'Auto-sync',
    paused: 'Paused',
    wtiSpot: 'WTI Spot',
    brentSpot: 'Brent Spot',
    masterIndex: 'Master Index:',
    methodology: 'Methodology',
    modelLogic: 'Model Logic',
    exportReport: 'Export Report',
    exportCSV: 'Export CSV',
    exportModel: 'Export Model',
    resetBaseline: 'Reset Baseline',

    // Tabs
    tabOverview: 'Executive Desk',
    tabDOMCurve: 'Futures Curve & DOM',
    tabRefinery: 'Refinery Runs & Cracks',
    tabTankers: 'Hormuz Tanker Radar',
    tabResearch: 'Institutional Research',
    tabCatalysts: 'Catalyst Radar',
    tabNews: 'Live Wire',
    tabSimulator: 'Scenario Simulator',
    tabAnalytics: 'OPEC & Storage',

    // Sentiment Ratings
    extremeBullish: 'Extreme Bullish',
    bullish: 'Bullish',
    neutral: 'Neutral',
    bearish: 'Bearish',
    extremeBearish: 'Extreme Bearish',

    // Impact Levels
    criticalImpact: '🔥 Critical Impact',
    highImpact: 'High Impact',
    mediumImpact: 'Medium Impact',
    lowImpact: 'Low Impact',

    // Implication Types
    implicationBullish: 'Bullish',
    implicationBearish: 'Bearish',
    implicationNeutral: 'Neutral',

    // Categories
    catCrude: 'Crude',
    catCrypto: 'Crypto Perp',
    catRefined: 'Refined',
    catSpread: 'Spread',
    catMacro: 'Macro',
    catInventory: 'Inventory (EIA / API)',
    catOPEC: 'OPEC+ Policy',
    catMonetary: 'Monetary / Fed',
    catTrade: 'Trade & Rig Count',
    catGeopolitics: 'Geopolitics / Security',
    catReport: 'Energy Reports (IEA/OPEC)',
    catSupply: 'Supply',
    catDemand: 'Demand',
    catShipping: 'Shipping',
    catRefining: 'Refining',

    // Ticker Grid
    low: 'L',
    high: 'H',
    volume: 'Vol',
    widening: 'widening',
    narrowing: 'narrowing',

    // Sentiment Gauge
    sentimentGaugeTitle: 'GLOBAL OIL SENTIMENT GAUGE',
    sentimentGaugeSubtitle: 'Proprietary Bayesian Composite Score (0 = Extreme Bear, 100 = Extreme Bull)',
    confidenceHigh: 'High',
    wowDelta: 'WoW Delta',
    dodDelta: 'DoD Delta',
    trajectory30d: '30-Day Sentiment Trajectory',
    trajectoryTrending: 'Trending Bullish (+20pts)',
    subIndicesTitle: 'Factor Sub-Indices & Active Catalysts',
    subIndicesHint: 'Click factor to view drivers',
    weight: 'Wgt',
    keyDriversTitle: 'Key Factor Catalysts:',
    dialBear: '0 Bear',
    dialNeutral: '50 Neutral',
    dialBull: '100 Bull',

    // Catalyst Tracker
    catalystRadarTitle: 'MACRO CATALYST RADAR & ECONOMIC CALENDAR',
    catalystRadarSubtitle: 'Real-time tracking of crude inventory reports, OPEC+ policy meetings, central bank decisions & surprise indexes',
    allCatalysts: 'All Catalysts',
    upcoming: 'Upcoming',
    released: 'Released',
    criticalOnly: '🔥 Critical Impact',
    searchCatalystsPlaceholder: 'Search catalysts...',
    allCategories: 'All Categories',
    allImpacts: 'All Impacts',
    colCatalyst: 'CATALYST / EVENT',
    colCategory: 'CATEGORY',
    colDateTime: 'DATE / TIME',
    colPrev: 'PREV',
    colForecast: 'FORECAST',
    colActual: 'ACTUAL',
    colSurprise: 'SURPRISE',
    colImplication: 'IMPLICATION',
    colImpact: 'IMPACT',
    colDetails: 'DETAILS',
    noCatalystsFound: 'No matching economic catalysts found. Try adjusting your filters.',
    pending: 'Pending',
    transmissionTitle: 'Oil Market Implication & Transmission Mechanism',
    macroRelevanceScore: 'Macro Relevance Score:',
    dataProvider: 'Data Provider:',
    historicalReactionsTitle: 'Historical Oil Price Reaction (1-Hour Post-Release)',
    histDate: 'Date',
    histActual: 'Actual',
    histSurprise: 'Surprise',
    histWti1h: 'WTI 1h',
    upcomingNote: 'Upcoming event. Statistical historical volatility expectation is ±1.65% in prompt WTI/Brent futures upon release.',

    // News Wire
    newsWireTitle: 'LIVE ENERGY INTELLIGENCE WIRE',
    newsWireSubtitle: 'Real-time multi-source wire with automated sentiment scoring & direct primary source links',
    liveStreamActive: 'Live Stream: Active',
    liveStreamPaused: 'Live Stream: Paused',
    flashIntel: 'FLASH INTEL',
    readWire: 'Read Wire',
    allChannels: 'All Channels',
    allSentiments: 'All Sentiments',
    searchNewsPlaceholder: 'Filter headlines...',
    noNewsFound: 'No intelligence updates match the selected filters.',
    copiedCitation: 'Citation copied',

    // Scenario Simulator
    simulatorTitle: 'MACRO SCENARIO SIMULATOR & EQUILIBRIUM PRICING ENGINE',
    simulatorSubtitle: 'Stress-test global oil prices against OPEC+ quota moves, chokepoint supply shocks, SPR flows & USD fluctuations',
    presetsTitle: 'Curated Stress-Test Scenarios:',
    slidersTitle: 'Macro Variables & Shock Sliders',
    realtimeRecalc: 'Real-time dynamic recalculation',
    sliderOpec: 'OPEC+ Quota Adjustment (Million bpd):',
    sliderOpecMin: '-2.5M (Deep Cuts)',
    sliderOpecMid: '0.0 (Status Quo)',
    sliderOpecMax: '+3.0M (Unwind / Flood)',
    sliderGeo: 'Geopolitical Supply Disruption / Outage:',
    sliderGeoMin: '0.0 (Normal Transit)',
    sliderGeoMid: '2.0M (Major Chokepoint)',
    sliderGeoMax: '4.0M (Full Regional Crisis)',
    sliderGeoUnit: 'M bpd Offline',
    sliderDemand: 'Global Demand Growth / China Shift:',
    sliderDemandMin: '-3.0% (Severe Recession)',
    sliderDemandMid: '0.0% (Baseline +1.2M)',
    sliderDemandMax: '+4.0% (Global Supercycle)',
    sliderDxy: 'US Dollar Index (DXY) Valuation Shift:',
    sliderDxyMin: '-10% (Dollar Collapse / Bull)',
    sliderDxyMid: '0% (Neutral)',
    sliderDxyMax: '+10% (Strong Dollar Headwind)',
    sliderNonOpec: 'Non-OPEC Supply:',
    sliderSpr: 'US SPR Flow:',
    sliderCrack: 'Crack Spread Delta:',
    outputTitle: 'Simulated Equilibrium Price Output',
    p50Expected: 'P50 Expected',
    projectedWti: 'Projected WTI Spot',
    projectedBrent: 'Projected Brent Spot',
    baseSpot: 'Base Spot',
    impliedBalance: 'Implied Global Oil Balance:',
    deficit: 'Deficit',
    surplus: 'Surplus',
    statusLabel: 'Status:',
    brentWtiSpread: 'Brent/WTI Spread:',
    confidenceBandsTitle: 'Econometric Volatility Bands (OVX Implied Confidence):',
    p10Floor: 'P10 Floor (Bear)',
    p50Base: 'P50 Base Expected',
    p90Ceiling: 'P90 Ceiling (Bull)',
    factorAttributionTitle: 'Factor Impact Attribution:',

    // Balance Statuses
    severeDeficit: 'Severe Deficit',
    moderateDeficit: 'Moderate Deficit',
    balancedStatus: 'Balanced',
    moderateSurplus: 'Moderate Surplus',
    heavyGlut: 'Heavy Glut',

    // Chokepoint Radar
    chokepointTitle: 'GLOBAL MARITIME CHOKEPOINT & TRANSIT RISK RADAR',
    chokepointSubtitle: 'Live monitoring of 48.7M bpd of seaborne crude transit through strategic maritime waterways',
    transitVolume: 'Transit Volume',
    globalShare: 'Global Share',
    ofSeaborne: 'of Seaborne',
    securityAssessment: 'Security Assessment:',
    tankers24h: '24h Tankers:',
    vessels: 'vessels',
    statusNormal: 'Normal',
    statusElevated: 'Elevated Risk',
    statusHighDisruption: 'High Disruption',

    // OPEC Table
    opecTitle: 'OPEC+ PRODUCTION & VOLUNTARY CUT ADHERENCE',
    opecSubtitle: 'Country-by-country tracking of agreed targets, secondary sources actuals & spare cushions',
    totalSpareCushion: 'Total Spare Cushion: ',
    activeVoluntaryCuts: 'Active Voluntary Cuts: ',
    colMember: 'MEMBER STATE',
    colQuota: 'TARGET QUOTA',
    colActualOutput: 'ACTUAL OUTPUT',
    colVoluntaryCut: 'VOLUNTARY CUT',
    colCompliance: 'COMPLIANCE',
    colSpareCapacity: 'SPARE CAPACITY',
    colStatus: 'STATUS',
    statusCompliant: 'Compliant',
    statusOverproducing: 'Overproducing',
    statusUnderproducing: 'Underproducing',

    // Storage Heatmap
    storageTitle: 'GLOBAL PHYSICAL STORAGE HUBS & INVENTORY PRESSURE',
    storageSubtitle: 'Commercial crude tank utilization, weekly inventory draws/builds & 5-year average differentials',
    tankUtilization: 'Tank Utilization',
    vs5y: 'vs 5Y:',
    statusDraw: 'Draw',
    statusBuild: 'Build',

    // Price Chart
    chartBenchmarksTitle: 'CRUDE OIL BENCHMARKS (SPOT & CONTINUOUS)',
    chartSpreadTitle: 'BRENT - WTI SPREAD (CO1! - CL1!)',
    realtimeBadge: 'REAL-TIME',
    modeWtiBrent: 'WTI & Brent',
    modeWtiOnly: 'WTI Only',
    modeBrentOnly: 'Brent Only',
    modeSpread: 'Spread',
    wtiSpotLegend: 'WTI Spot (CL1!)',
    brentGlobalLegend: 'Brent Global (CO1!)',
    spreadLegend: 'Brent-WTI Differential',
    catalystMarkersLegend: 'Macro Catalyst Markers',
    chartRange: 'Range:',
    settlementSource: 'CME Group Settlement',
    macroEventPin: 'Macro Event Pin:',
    dismiss: 'Dismiss',

    // Methodology Modal
    methodologyTitle: 'PetroPulse™ Sentiment Algorithm Methodology',
    methodologySubtitle: 'Quantitative Bayesian multi-factor weighting model',
    methodologyIntro:
      'The PetroPulse Global Sentiment Score (0–100) synthesizes 28 quantitative and qualitative macro feeds into a single unified barometer calibrated against WTI and Brent prompt pricing.',
    factorAllocationTitle: 'Factor Weight Allocation:',
    geoRiskTitle: 'Geopolitical Risk (25%)',
    geoRiskDesc: 'Monitors Strait of Hormuz, Red Sea/Bab el-Mandeb AIS vessel diversion, maritime insurance war surcharges, and state sanction regimes.',
    opecQuotaTitle: 'OPEC+ Quotas (25%)',
    opecQuotaDesc: 'Tracks secondary sources production estimates, Saudi Aramco official selling prices (OSPs), and voluntary quota adherence.',
    physInvTitle: 'Physical Inventories (20%)',
    physInvDesc: 'Evaluates US EIA/API commercial crude & product draws, Cushing OK tank utilization, ARA European stockpiles, and Asian floating storage.',
    cotCtaTitle: 'COT & CTA Flow (15%)',
    cotCtaDesc: 'CFTC commitment of traders managed money net long/short positions, 25-delta options gamma skew, and algorithmic CTA momentum levels.',
    macroLiquidityTitle: 'Macro Liquidity & FX Beta (15%)',
    macroLiquidityDesc: 'USD Index (DXY) inverse correlation beta, China PBOC manufacturing liquidity stimulus, and global 3:2:1 crack margin pulls.',
    scaleInterpTitle: 'Scale Interpretation:',
    scaleExtremeBear: '0-25: Extreme Bear',
    scaleBear: '25-45: Bearish',
    scaleNeutral: '45-55: Neutral',
    scaleBull: '55-75: Bullish',
    scaleExtremeBull: '75-100: Extreme Bull',
    understoodBtn: 'Understood',

    // Term Structure & Futures Curve
    termStructureTitle: 'CRUDE OIL FUTURES TERM STRUCTURE & CURVE',
    termStructureSubtitle: 'Prompt-to-deferred contract spreads, roll yield dynamics & physical backwardation/contango analysis',
    backwardation: 'Backwardation (Prompt Scarcity)',
    contango: 'Contango (Surplus / Carry)',
    promptSpread1M2M: 'M1-M2 Prompt Spread:',
    annualizedRollYield: 'Annualized Roll Yield:',
    sixMonthSpread: 'M1-M6 6-Month Spread:',
    twelveMonthSpread: 'M1-M12 1-Year Spread:',
    curveComparisonTitle: 'Futures Curve Comparison (Current vs 1W Ago vs 1M Ago)',
    curveTableTitle: 'Contract Tenor Quotations, Spreads & Open Interest',
    colTenor: 'TENOR',
    colContract: 'CODE',
    colDelivery: 'DELIVERY',
    colPrice: 'PRICE ($/BBL)',
    colChange: 'CHG ($)',
    colSpreadPrompt: 'SPREAD VS M1',
    colOpenInterest: 'OPEN INT (OI)',
    colCurveShape: 'STRUCTURE',

    // Level 2 DOM (Order Book)
    domTitle: 'LEVEL 2 DEPTH OF MARKET (DOM)',
    domSubtitle: 'NYMEX / ICE 10-level bid/ask depth, order book imbalance ratio & real-time tape',
    orderImbalance: 'Order Imbalance Ratio:',
    bidHeavy: 'Bid Heavy (+18.4%)',
    askHeavy: 'Ask Heavy',
    colBidQty: 'BID QTY',
    colBidTotal: 'BID CUM',
    colAskQty: 'ASK QTY',
    colAskTotal: 'ASK CUM',
    timeAndSalesTitle: 'REAL-TIME TRADE TAPE (TIME & SALES)',
    colTime: 'TIME',
    colSide: 'SIDE',
    colSize: 'LOTS',
    colExchange: 'EXCH',

    // Refinery Runs & Crack Spreads
    refineryTitle: 'GLOBAL REFINERY RUNS & PRODUCT CRACK SPREADS',
    refinerySubtitle: '3:2:1 refinery margins, gasoline/diesel cracks & global crude throughput',
    heroCrack321: '3:2:1 USGC Crack Spread',
    heroGasolineCrack: 'RBOB Gasoline Crack',
    heroDieselCrack: 'ULSD Diesel Crack',
    globalThroughput: 'Global Crude Intake:',
    globalUtilization: 'Global Average Utilization:',
    cracksTableTitle: 'Key Benchmark Product Crack Spreads',
    colFormula: 'CRACK FORMULA',
    colMargin: 'MARGIN ($/BBL)',
    col5yAvg: '5Y AVERAGE',
    colTrend: 'TREND',
    refineriesTableTitle: 'Global Major Refining Hubs Run Rates & Turnarounds',
    colThroughput: 'THROUGHPUT (MBPD)',
    colCapacity: 'CAPACITY (MBPD)',
    colUtilization: 'UTILIZATION',
    colPlannedMaint: 'MAINTENANCE',
    colUnplanned: 'OUTAGES',
    colAvgMargin: 'GROSS MARGIN',

    // Tanker Radar & Hormuz AIS
    tankerRadarTitle: 'STRAIT OF HORMUZ AIS RADAR & SEABORNE CRUDE FLOW',
    tankerRadarSubtitle: 'Live tracking of 20.8M bpd Persian Gulf transit, VLCC supertankers & war risk indices',
    transit24h: '24h Transit Volume:',
    vesselsInHormuz: 'Tankers in Transit Zone:',
    avgSpeed: 'Average Speed:',
    gpsSpoofing: 'GPS Interference Threat:',
    warRiskRate: 'War Risk Insurance Rate:',
    crudeOnWater: 'Crude on Water:',
    capeRerouted: 'Cape Rerouted Flow:',
    floatingStorage: 'Floating Storage:',
    vesselManifestTitle: 'Live Tanker Manifest & Voyage Queue',
    colVesselName: 'VESSEL NAME',
    colClass: 'CLASS',
    colFlag: 'FLAG',
    colCargo: 'CARGO GRADE',
    colOrigin: 'ORIGIN PORT',
    colDestination: 'DESTINATION',
    colSpeedDraft: 'SPEED / DRAFT',
    colETA: 'ETA',
    radarScanning: 'AIS SAT RADAR SCANNING...',

    // Institutional Research Digest
    researchTitle: 'INSTITUTIONAL RESEARCH DIGEST & WALL STREET CONSENSUS',
    researchSubtitle: 'Direct insights & price targets from Goldman Sachs, Morgan Stanley, Vitol, Trafigura & EIA',
    streetConsensusTitle: 'Street 12-Month Brent Price Consensus',
    medianBrentTarget: 'Median Brent Target:',
    medianWtiTarget: 'Median WTI Target:',
    bullishConsensus: 'Bullish Skew:',
    neutralConsensus: 'Neutral:',
    bearishConsensus: 'Bearish:',
    targetRangeLabel: 'Target Range:',
    thesisLabel: 'Core S&D Thesis:',
    catalystFocusLabel: 'Key Catalyst Watch:',
    readFullQuote: 'Read Institutional Note',

    // Terminal Status Bar Telemetry
    sysStatus: 'SYS STATUS:',
    connected: 'CONNECTED',
    feedNymex: 'NYMEX DIRECT 12ms',
    feedIce: 'ICE FEED 100ms',
    feedAis: 'AIS SAT RADAR ACTIVE',
    bufferHealth: 'BUFFER HEALTH 99.8%',
    memoryUsage: 'MEM: 48.2MB',
    versionTag: 'PETROPULSE TERMINAL v2.5 ENTERPRISE',

    // Footer
    footerTerminal: 'PetroPulse™ Commodity Trading Terminal',
    footerTagline: 'Institutional Quantitative Commodity Intelligence',
    footerSources: 'Sources: EIA, OPEC, CME NYMEX, ICE Futures, IEA, S&P Platts, Vortexa AIS',
    footerSynced: 'All Feeds Synchronized',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'zh-TW',
  setLanguage: () => {},
  t: TRANSLATIONS['zh-TW'],
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default natively to Traditional Chinese (zh-TW)
  const [language, setLanguageState] = useState<Language>('zh-TW');

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('petropulse_lang') as Language;
      if (savedLang === 'zh-TW' || savedLang === 'en') {
        setLanguageState(savedLang);
      } else {
        // Default to zh-TW
        setLanguageState('zh-TW');
      }
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('petropulse_lang', lang);
      document.documentElement.lang = lang === 'zh-TW' ? 'zh-TW' : 'en';
    } catch {
      // ignore
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: TRANSLATIONS[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
