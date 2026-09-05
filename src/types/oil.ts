export type MarketSentimentRating =
  | 'Extreme Bearish'
  | 'Bearish'
  | 'Neutral'
  | 'Bullish'
  | 'Extreme Bullish';

export type ImpactLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export type CatalystCategory =
  | 'Inventory'
  | 'Monetary'
  | 'OPEC'
  | 'Trade'
  | 'Report'
  | 'Geopolitics';

export type CatalystStatus = 'Upcoming' | 'Live' | 'Released' | 'Revised';

export type ImplicationType = 'Bullish' | 'Bearish' | 'Neutral';

export interface TickerData {
  symbol: string;
  name: string;
  category: 'Crude' | 'Refined' | 'Spread' | 'Macro' | 'Crypto';
  price: number;
  change: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  open: number;
  volume: string;
  unit: string;
  currency: string;
  sparkline: number[];
  week52High: number;
  week52Low: number;
  updatedAt: string;
  exchange?: string;
  contractType?: string;
  fundingRate?: number;
}

export interface SpreadData {
  id: string;
  name: string;
  description: string;
  value: number;
  change: number;
  unit: string;
  trend: 'widening' | 'narrowing' | 'neutral';
  benchmarkA: string;
  benchmarkB: string;
}

export interface SentimentSubIndex {
  id: string;
  name: string;
  score: number; // 0 - 100
  weight: number; // e.g. 0.25 (25%)
  status: ImplicationType;
  trend: 'up' | 'down' | 'flat';
  deltaWoW: number;
  description: string;
  drivers: string[];
}

export interface HistoricalSentimentPoint {
  date: string;
  score: number;
  wtiPrice: number;
  brentPrice: number;
  catalystEvent?: string;
}

export interface SentimentIndexData {
  overallScore: number; // 0 - 100
  rating: MarketSentimentRating;
  confidence: number; // 0 - 100
  wowDelta: number;
  dodDelta: number;
  subIndices: SentimentSubIndex[];
  historical: HistoricalSentimentPoint[];
  methodologyNotes: string;
  lastUpdated: string;
}

export interface CatalystHistoricalReaction {
  eventDate: string;
  forecast: string;
  actual: string;
  surprise: string;
  priceMove1h: string;
}

export interface EconomicCatalyst {
  id: string;
  eventName: string;
  country: string;
  countryCode: string;
  category: CatalystCategory;
  dateTime: string;
  timeBadge: string;
  timestamp: number;
  previous: string;
  forecast: string;
  actual?: string;
  surpriseDelta?: string;
  surpriseDirection?: 'positive_for_oil' | 'negative_for_oil' | 'inline';
  impact: ImpactLevel;
  status: CatalystStatus;
  implication: ImplicationType;
  rationale: string;
  relevanceScore: number;
  historicalReactions?: CatalystHistoricalReaction[];
}

export interface NewsArticle {
  id: string;
  headline: string;
  summary: string;
  source: string;
  url: string;
  timestamp: string;
  timeAgo: string;
  sentiment: ImplicationType;
  sentimentScore: number; // e.g. +1.8
  impactLevel: ImpactLevel;
  category: 'Geopolitics' | 'Supply' | 'Demand' | 'Macro' | 'Refining' | 'Shipping';
  isBreaking?: boolean;
  readTime: string;
  tags: string[];
}

export interface ScenarioParameters {
  opecQuotaDelta: number; // -2.5 to +3.0 Mbpd
  geopoliticalDisruption: number; // 0 to 4.0 Mbpd offline
  sprFlow: number; // -1000 to +1000 kbpd
  dxyShiftPercent: number; // -10% to +10%
  globalDemandDelta: number; // -3.0% to +4.0%
  nonOpecSupplyDelta: number; // -0.5 to +2.0 Mbpd
  refineryMarginModifier: number; // -10 to +15 $/bbl
}

export interface ScenarioResult {
  projectedWti: number;
  projectedBrent: number;
  wtiDeltaDollar: number;
  wtiDeltaPercent: number;
  brentDeltaDollar: number;
  brentDeltaPercent: number;
  projectedSpread: number;
  impliedBalanceMbpd: number; // negative = deficit (bullish), positive = surplus (bearish)
  balanceStatus: 'Severe Deficit' | 'Moderate Deficit' | 'Balanced' | 'Moderate Surplus' | 'Heavy Glut';
  confidenceBand: {
    p10: number; // Bearish floor
    p50: number; // Base projection
    p90: number; // Bullish ceiling
  };
  primaryDrivers: {
    factor: string;
    impactDollars: number;
    direction: 'up' | 'down';
    explanation: string;
  }[];
}

export interface PresetScenario {
  id: string;
  name: string;
  category: string;
  description: string;
  params: ScenarioParameters;
}

export interface ChokepointData {
  id: string;
  name: string;
  location: string;
  transitVolumeMbpd: number;
  globalSharePercent: number;
  status: 'Normal' | 'Elevated Risk' | 'High Disruption';
  riskScore: number; // 0 - 100
  keyThreats: string;
  lastIncident: string;
  vesselCount24h: number;
}

export interface OpecMemberData {
  country: string;
  flag: string;
  quotaMbpd: number;
  actualMbpd: number;
  compliancePercent: number;
  spareCapacityMbpd: number;
  status: 'Compliant' | 'Overproducing' | 'Underproducing';
  voluntaryCutMbpd: number;
}

export interface InventoryHubData {
  id: string;
  name: string;
  region: string;
  currentLevelMbbl: number;
  capacityMbbl: number;
  utilizationPercent: number;
  weeklyChangeMbbl: number;
  fiveYearAvgPercent: number;
  status: 'Draw' | 'Build' | 'Neutral';
}

export interface PriceHistoryPoint {
  time: string;
  wti: number;
  brent: number;
  volume: number;
  high?: number;
  low?: number;
  open?: number;
  close?: number;
  eventNote?: string;
}

// ==========================================
// 1. Term Structure & Futures Curve Types
// ==========================================
export interface FuturesCurveContract {
  tenor: string; // 'Spot' | 'M1' | 'M2' | 'M3' | 'M6' | 'M12' | 'M18' | 'M24'
  contractCode: string; // e.g. 'CLV26', 'CLZ26'
  deliveryMonth: string; // 'Oct 26', 'Nov 26', 'Dec 26', etc.
  price: number; // $/bbl
  change: number; // $/bbl
  spreadVsPrompt: number; // price - M1 price (Negative = Backwardation, Positive = Contango)
  volume: number;
  openInterest: number;
  shape: 'Backwardation' | 'Contango';
  brentPrice: number;
  brentChange: number;
}

export interface TermStructureData {
  benchmark: 'WTI' | 'Brent';
  curveStructure: 'Backwardation' | 'Contango';
  promptSpread1M2M: number; // M1 - M2 ($/bbl)
  annualizedRollYieldPercent: number; // % per annum
  sixMonthSpread: number; // M1 - M6 ($/bbl)
  twelveMonthSpread: number; // M1 - M12 ($/bbl)
  currentContracts: FuturesCurveContract[];
  historicalCurves: {
    tenor: string;
    deliveryMonth: string;
    current: number;
    oneWeekAgo: number;
    oneMonthAgo: number;
  }[];
}

// ==========================================
// 2. Order Book / Depth of Market (DOM) Types
// ==========================================
export interface OrderBookLevel {
  price: number;
  size: number;
  total: number;
  depthPercent: number;
  ordersCount: number;
}

export interface TapeTrade {
  id: string;
  time: string;
  price: number;
  size: number;
  side: 'BUY' | 'SELL';
  exchange: 'NYMEX' | 'ICE';
}

export interface OrderBookData {
  symbol: string;
  lastPrice: number;
  change: number;
  changePercent: number;
  spreadTicks: number; // e.g. 1 tick = $0.01
  spreadDollar: number;
  imbalanceRatio: number; // -100% to +100% (positive = bid heavy)
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  recentTrades: TapeTrade[];
}

// ==========================================
// 3. Crack Spreads & Global Refinery Runs
// ==========================================
export interface CrackSpreadItem {
  id: string;
  name: string;
  region: string;
  formula: string;
  value: number; // $/bbl
  change: number;
  unit: string;
  fiveYearAvg: number;
  status: 'Tight' | 'Normal' | 'Depressed';
  trend: 'widening' | 'narrowing';
  components: {
    product: string;
    yieldRatio: string;
    productPrice: number;
    crudePrice: number;
  }[];
}

export interface RefineryRunItem {
  id: string;
  region: string;
  country: string;
  flag: string;
  throughputMbpd: number;
  nameplateCapacityMbpd: number;
  utilizationPercent: number;
  weeklyChangePercent: number;
  plannedMaintenanceMbpd: number;
  unplannedOutagesMbpd: number;
  marginAvgDollar: number; // $/bbl
  status: 'Peak Runs' | 'Normal' | 'Turnaround Season' | 'Restricted';
}

export interface RefiningDashboardData {
  crack321Usgc: number;
  crack321Change: number;
  gasolineCrack: number;
  dieselCrack: number;
  globalThroughputMbpd: number;
  globalCapacityMbpd: number;
  globalUtilizationPercent: number;
  cracks: CrackSpreadItem[];
  refineries: RefineryRunItem[];
}

// ==========================================
// 4. Physical Tanker & Hormuz Radar Types
// ==========================================
export interface TankerVessel {
  id: string;
  name: string;
  imo: string;
  flag: string;
  vesselClass: 'VLCC' | 'Suezmax' | 'Aframax' | 'LNG' | 'Clean Product';
  dwt: number; // Deadweight tonnage e.g. 312,000 DWT
  capacityMbbl: number; // e.g. 2.0 Mbbl
  cargoGrade: string; // 'Arab Light', 'Basrah Medium', 'Upper Zakum', etc.
  originPort: string;
  originCountry: string;
  destinationPort: string;
  destinationCountry: string;
  status: 'Laden Transit' | 'Ballast Inbound' | 'Anchored / Waiting' | 'STS Transfer';
  speedKnots: number;
  draftPercent: number;
  eta: string;
  radarX: number; // 0 - 100 (for SVG radar visualization)
  radarY: number; // 0 - 100
  headingDeg: number;
}

export interface TankerRadarData {
  chokepointId: string;
  chokepointName: string;
  radarScanTime: string;
  totalVesselsInZone: number;
  activeLadenTankers: number;
  transitThroughput24hMbpd: number;
  globalSharePercent: number;
  averageTransitSpeedKnots: number;
  gpsInterferenceLevel: 'Low' | 'Moderate' | 'Severe / Active Spoofing';
  warRiskInsuranceRate: number; // % hull value e.g. 0.35%
  warRiskDeltaWoW: number; // %
  vessels: TankerVessel[];
  crudeOnWaterTotalMbbl: number;
  capeReroutedVolumeMbpd: number;
  floatingStorageMbbl: number;
}

// ==========================================
// 5. Institutional Research Digest Types
// ==========================================
export interface InstitutionalResearchQuote {
  id: string;
  institution: 'Goldman Sachs' | 'Morgan Stanley' | 'Vitol' | 'Trafigura' | 'EIA STEO';
  logoBadge: string;
  analyst: string;
  role: string;
  publishDate: string;
  title: string;
  brentTarget12M: number;
  wtiTarget12M: number;
  targetRange: string; // e.g. '$75 - $90/bbl'
  stance: 'Bullish' | 'Neutral' | 'Bearish';
  keyQuote: string;
  bulletPoints: string[];
  catalystFocus: string;
  supplyDemandThesis: string;
}

export interface StreetConsensusData {
  medianBrent12M: number;
  medianWti12M: number;
  highBrentTarget: number;
  lowBrentTarget: number;
  bullishPercent: number; // e.g. 68%
  neutralPercent: number; // e.g. 24%
  bearishPercent: number; // e.g. 8%
  quotes: InstitutionalResearchQuote[];
}

