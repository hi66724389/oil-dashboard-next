import {
  ChokepointData,
  EconomicCatalyst,
  InventoryHubData,
  NewsArticle,
  OpecMemberData,
  PriceHistoryPoint,
  SentimentIndexData,
  SpreadData,
  TickerData,
  TermStructureData,
  OrderBookData,
  RefiningDashboardData,
  TankerRadarData,
  StreetConsensusData,
} from '@/types/oil';
import { Language } from '@/context/LanguageContext';

export function getLocalizedTickers(lang: Language = 'zh-TW'): TickerData[] {
  const isZh = lang === 'zh-TW';
  return [
    {
      symbol: 'CL1!',
      name: isZh ? 'WTI 輕質原油期貨 (NYMEX)' : 'WTI Light Sweet Crude',
      category: 'Crude',
      price: 76.45,
      change: 1.82,
      changePercent: 2.44,
      high24h: 77.10,
      low24h: 74.20,
      open: 74.63,
      volume: '342.8K',
      unit: isZh ? '美元/桶' : 'USD/bbl',
      currency: '$',
      sparkline: [74.6, 74.2, 74.8, 75.1, 75.6, 75.3, 75.9, 76.2, 76.0, 76.45],
      week52High: 87.67,
      week52Low: 65.27,
      updatedAt: isZh ? '即時連線 14:02:15 UTC' : 'Live 14:02:15 UTC',
    },
    {
      symbol: 'CO1!',
      name: isZh ? '布蘭特北海原油期貨 (ICE)' : 'Brent North Sea Crude',
      category: 'Crude',
      price: 80.85,
      change: 1.95,
      changePercent: 2.47,
      high24h: 81.40,
      low24h: 78.60,
      open: 78.90,
      volume: '298.4K',
      unit: isZh ? '美元/桶' : 'USD/bbl',
      currency: '$',
      sparkline: [78.9, 78.6, 79.2, 79.5, 80.0, 79.8, 80.2, 80.6, 80.4, 80.85],
      week52High: 92.18,
      week52Low: 68.80,
      updatedAt: isZh ? '即時連線 14:02:15 UTC' : 'Live 14:02:15 UTC',
    },
    {
      symbol: 'RB1!',
      name: isZh ? 'RBOB 汽油期貨 (NYMEX)' : 'RBOB Gasoline Futures',
      category: 'Refined',
      price: 2.428,
      change: 0.054,
      changePercent: 2.28,
      high24h: 2.455,
      low24h: 2.368,
      open: 2.374,
      volume: '88.1K',
      unit: isZh ? '美元/加侖' : 'USD/gal',
      currency: '$',
      sparkline: [2.37, 2.36, 2.38, 2.40, 2.41, 2.39, 2.41, 2.43, 2.42, 2.428],
      week52High: 2.895,
      week52Low: 1.942,
      updatedAt: isZh ? '即時連線 14:02:10 UTC' : 'Live 14:02:10 UTC',
    },
    {
      symbol: 'HO1!',
      name: isZh ? '超低硫柴油 / 熱燃油 (NYMEX)' : 'ULSD Heating Oil / Diesel',
      category: 'Refined',
      price: 2.684,
      change: 0.071,
      changePercent: 2.72,
      high24h: 2.712,
      low24h: 2.605,
      open: 2.613,
      volume: '74.6K',
      unit: isZh ? '美元/加侖' : 'USD/gal',
      currency: '$',
      sparkline: [2.61, 2.60, 2.63, 2.65, 2.66, 2.64, 2.67, 2.69, 2.67, 2.684],
      week52High: 3.120,
      week52Low: 2.150,
      updatedAt: isZh ? '即時連線 14:02:10 UTC' : 'Live 14:02:10 UTC',
    },
    {
      symbol: 'DXY',
      name: isZh ? '美元指數 (DXY)' : 'US Dollar Index',
      category: 'Macro',
      price: 103.42,
      change: -0.48,
      changePercent: -0.46,
      high24h: 104.10,
      low24h: 103.25,
      open: 103.90,
      volume: '2.1M',
      unit: isZh ? '指數點' : 'Index Points',
      currency: '',
      sparkline: [103.9, 104.0, 103.8, 103.7, 103.6, 103.5, 103.4, 103.5, 103.42],
      week52High: 107.34,
      week52Low: 99.58,
      updatedAt: isZh ? '即時連線 14:02:12 UTC' : 'Live 14:02:12 UTC',
    },
    {
      symbol: 'OVX',
      name: isZh ? 'CBOE 原油波動率指數 (OVX)' : 'CBOE Crude Volatility Index',
      category: 'Macro',
      price: 28.45,
      change: 1.15,
      changePercent: 4.21,
      high24h: 29.80,
      low24h: 26.90,
      open: 27.30,
      volume: isZh ? '波動指數' : 'Index',
      unit: isZh ? '隱含波動點' : 'Vol Pts',
      currency: '',
      sparkline: [27.3, 27.0, 27.5, 27.8, 28.2, 28.0, 28.6, 28.3, 28.45],
      week52High: 44.80,
      week52Low: 21.30,
      updatedAt: isZh ? '即時連線 14:01:50 UTC' : 'Live 14:01:50 UTC',
    },
  ];
}

export function getLocalizedSpreads(lang: Language = 'zh-TW'): SpreadData[] {
  const isZh = lang === 'zh-TW';
  return [
    {
      id: 'brent_wti_spread',
      name: isZh ? '布蘭特 - WTI 跨洋價差' : 'Brent - WTI Differential',
      description: isZh ? '跨大西洋原油套利窗口與美油出口經濟學' : 'Transatlantic crude arbitrage window and export economics',
      value: 4.40,
      change: 0.13,
      unit: isZh ? '美元/桶' : 'USD/bbl',
      trend: 'widening',
      benchmarkA: 'Brent (CO1!)',
      benchmarkB: 'WTI (CL1!)',
    },
    {
      id: 'crack_spread_321',
      name: isZh ? '3:2:1 墨西哥灣裂解價差' : '3:2:1 USGC Crack Spread',
      description: isZh ? '煉油毛利：每 3 桶原油精煉為 2 桶汽油 + 1 桶柴油' : 'Refinery gross margin per 3 bbls crude refined into 2 gas + 1 diesel',
      value: 23.85,
      change: 1.20,
      unit: isZh ? '美元/桶' : 'USD/bbl',
      trend: 'widening',
      benchmarkA: isZh ? '成品油 (汽/柴油)' : 'Products (Gas/Diesel)',
      benchmarkB: isZh ? 'WTI 原油' : 'WTI Crude',
    },
    {
      id: 'brent_dubai_efs',
      name: isZh ? '布蘭特 - 杜拜期現互換 (EFS)' : 'Brent - Dubai EFS',
      description: isZh ? '期現交換價差（大西洋低硫 vs 中東高硫原油溢價）' : 'Exchange of Futures for Swaps (Atlantic vs Middle East sweet/sour)',
      value: 1.25,
      change: -0.08,
      unit: isZh ? '美元/桶' : 'USD/bbl',
      trend: 'narrowing',
      benchmarkA: 'Brent',
      benchmarkB: isZh ? '杜拜掉期 (Dubai Swaps)' : 'Dubai Swaps',
    },
    {
      id: 'diesel_gas_spread',
      name: isZh ? '超低硫柴油 / RBOB 汽油溢價' : 'ULSD / RBOB Premium',
      description: isZh ? '中間餾分油相較於車用汽油之供需緊俏度' : 'Middle distillate tightness over motor gasoline',
      value: 10.75,
      change: 0.72,
      unit: isZh ? '美元/桶' : 'USD/bbl',
      trend: 'widening',
      benchmarkA: isZh ? '超低硫柴油' : 'ULSD Diesel',
      benchmarkB: isZh ? 'RBOB 汽油' : 'RBOB Gas',
    },
  ];
}

export function getLocalizedSentiment(lang: Language = 'zh-TW'): SentimentIndexData {
  const isZh = lang === 'zh-TW';
  return {
    overallScore: 68,
    rating: 'Bullish',
    confidence: 88,
    wowDelta: 5.4,
    dodDelta: 1.8,
    lastUpdated: isZh ? '10 分鐘前' : '10 mins ago',
    methodologyNotes: isZh
      ? '機構級貝式多因子動態權重模型，量化綜合 28 項跨原油供需緊張度、海事地緣安全、投機機構持倉與宏觀流動性指標。'
      : 'Multi-factor proprietary Bayesian synthesis evaluating 28 quantitative signals across supply tightness, maritime security, speculative positioning, and macro liquidity.',
    subIndices: [
      {
        id: 'geopolitical',
        name: isZh ? '地緣政治與海運安全指數' : 'Geopolitical Risk Index',
        score: 78,
        weight: 0.25,
        status: 'Bullish',
        trend: 'up',
        deltaWoW: 6.2,
        description: isZh ? '紅海航道、曼德海峽及荷姆茲海峽之航運安全與軍事對峙' : 'Maritime freight security in Red Sea & Strait of Hormuz standoff',
        drivers: isZh
          ? [
              '青年運動（胡塞組織）無人機飛彈威脅鎖定曼德海峽油輪航線',
              '美國加強對伊朗「影子船隊」原油出口之海上制裁攔截',
              '烏克蘭持續以長程無人機精準打擊俄羅斯煉油廠關鍵蒸餾塔設施',
            ]
          : [
              'Houthi missile alerts targeting Bab el-Mandeb tanker routes',
              'Stricter US sanctions enforcement on dark-fleet Iranian exports',
              'Escalating drone strikes on Russian refining infrastructure',
            ],
      },
      {
        id: 'opec_discipline',
        name: isZh ? 'OPEC+ 減產紀律與產量配額' : 'OPEC+ Compliance & Quotas',
        score: 72,
        weight: 0.25,
        status: 'Bullish',
        trend: 'flat',
        deltaWoW: 1.1,
        description: isZh ? '沙烏地阿拉伯每日 100 萬桶自願額外減產展期與配額約束' : 'Saudi Arabia 1M bpd voluntary cut rollover & quota enforcement',
        drivers: isZh
          ? [
              '沙烏地阿美重申維持供給自律，延後增產時程以確保秋冬供需赤字',
              '伊拉克與哈薩克向 OPEC 秘書處提交具體超產補償減產執行清單',
              '全球即時有效閒置產能集中於沙烏地與阿聯酋，預估僅約 320 萬桶/日',
            ]
          : [
              'Saudi Aramco reiterated commitment to supply restraint',
              'Iraq & Kazakhstan submitting revised compensation cut plans',
              'Global spare cushion estimated at ~3.2M bpd concentrated in KSA/UAE',
            ],
      },
      {
        id: 'inventory_pressure',
        name: isZh ? '實體原油庫存去化壓力' : 'Physical Inventory Pressure',
        score: 64,
        weight: 0.20,
        status: 'Bullish',
        trend: 'up',
        deltaWoW: 3.5,
        description: isZh ? '庫欣交割中心庫容水準與美國商業原油大幅去庫存' : 'Cushing storage utilization & US commercial crude drawdowns',
        drivers: isZh
          ? [
              'EIA 報告美國商業原油單週大幅去庫存 415 萬桶（市場預估原為增加 65 萬桶）',
              '庫欣交割地營運庫存降至 3,240 萬桶（庫容利用率僅 38.1%，逼近關鍵安全底線）',
              'OECD 商業原油庫存總量較過去 5 年同期平均水準低 8,200 萬桶',
            ]
          : [
              'EIA reported 4.15M bbl commercial crude draw vs forecast +0.8M build',
              'Cushing Oklahoma operational tank levels at 32.4M bbls (38% capacity)',
              'OECD commercial inventories tracking 82M bbls below 5-year average',
            ],
      },
      {
        id: 'speculative_flow',
        name: isZh ? '投機資金流向與 COT 多空偏斜' : 'Speculative Flow & COT Skew',
        score: 66,
        weight: 0.15,
        status: 'Bullish',
        trend: 'down',
        deltaWoW: -2.1,
        description: isZh ? 'CFTC 基金管理機構期貨淨多單持倉與選擇權 Gamma 偏向' : 'CFTC Managed Money net long positioning and options gamma skew',
        drivers: isZh
          ? [
              '對沖基金在 ICE 布蘭特原油期貨單週加碼淨多單 18,400 口',
              'WTI 85 美元與 90 美元買權（Call）未平倉量顯著超越賣權（Put）',
              '量化 CTA 趨勢跟隨演算法在油價突破 50 日均線後觸發系統性買進訊號',
            ]
          : [
              'Hedge funds increased ICE Brent net-longs by 18,400 contracts',
              'WTI $85 / $90 call option open interest heavily outnumbering puts',
              'CTA trend-following algorithms triggered buy signals above 50-day EMA',
            ],
      },
      {
        id: 'macro_liquidity',
        name: isZh ? '宏觀流動性與外匯 Beta 彈性' : 'Macro Liquidity & FX Beta',
        score: 58,
        weight: 0.15,
        status: 'Neutral',
        trend: 'up',
        deltaWoW: 4.0,
        description: isZh ? '美元指數 (DXY) 走弱與中國貨幣信貸刺激政策發酵' : 'US Dollar Index depreciation and China fiscal stimulus traction',
        drivers: isZh
          ? [
              '美元指數跌破 103.50，提升以美元計價大宗商品之全球實質購買力',
              '中國人行調降存款準備率 50 個基點並推出製造業專項信貸以提振實體需求',
              '美國核心 PCE 通膨符合預期，美債殖利率回落支撐能源資產估值',
            ]
          : [
              'DXY slipped below 103.50 providing FX purchasing power tailwind',
              'PBOC announced 50bps reserve ratio cut to boost industrial loans',
              'US Treasury yields stabilized following benign PCE inflation data',
            ],
      },
    ],
    historical: [
      { date: '8月07日', score: 48, wtiPrice: 72.40, brentPrice: 76.10, catalystEvent: isZh ? '美國非農就業疲軟' : 'Weak US Jobs' },
      { date: '8月10日', score: 51, wtiPrice: 73.10, brentPrice: 76.80 },
      { date: '8月14日', score: 55, wtiPrice: 74.30, brentPrice: 78.20, catalystEvent: isZh ? 'EIA 去庫 380 萬桶' : 'EIA 3.8M Draw' },
      { date: '8月18日', score: 53, wtiPrice: 73.90, brentPrice: 77.60 },
      { date: '8月22日', score: 59, wtiPrice: 74.90, brentPrice: 78.90, catalystEvent: isZh ? '紅海航道安全戒備' : 'Red Sea Alert' },
      { date: '8月26日', score: 62, wtiPrice: 75.60, brentPrice: 79.50 },
      { date: '8月30日', score: 60, wtiPrice: 75.10, brentPrice: 79.10 },
      { date: '9月02日', score: 64, wtiPrice: 75.80, brentPrice: 80.10, catalystEvent: isZh ? 'OPEC+ JMMC 減產延期訊號' : 'OPEC+ JMMC Signal' },
      { date: '9月04日', score: 66, wtiPrice: 76.10, brentPrice: 80.40 },
      { date: isZh ? '9月05日 (今日)' : 'Sep 05 (Today)', score: 68, wtiPrice: 76.45, brentPrice: 80.85, catalystEvent: isZh ? 'EIA 劇烈去庫 415 萬桶' : 'EIA Massive Draw' },
    ],
  };
}

export function getLocalizedCatalysts(lang: Language = 'zh-TW'): EconomicCatalyst[] {
  const isZh = lang === 'zh-TW';
  return [
    {
      id: 'eia_crude_stocks',
      eventName: isZh ? '美國 EIA 原油庫存週報 (商業總量)' : 'EIA Weekly US Crude Oil Inventories',
      country: isZh ? '美國' : 'United States',
      countryCode: 'US',
      category: 'Inventory',
      dateTime: '2026-09-05 14:30 UTC',
      timeBadge: isZh ? '28 分鐘前公佈' : 'Released 28m ago',
      timestamp: Date.now() - 28 * 60 * 1000,
      previous: '-1.82M 桶',
      forecast: '+0.65M 桶',
      actual: '-4.15M 桶',
      surpriseDelta: '-4.80M 桶',
      surpriseDirection: 'positive_for_oil',
      impact: 'Critical',
      status: 'Released',
      implication: 'Bullish',
      rationale: isZh
        ? '超預期劇烈去庫存，主因為墨西哥灣煉油廠開工率激增至 94.2%，且對歐洲原油出口裝載量持續創高。'
        : 'Massive surprise draw driven by Gulf Coast refinery runs hitting 94.2% and rising crude export loadings to Europe.',
      relevanceScore: 98,
      historicalReactions: [
        { eventDate: '8月28日', forecast: '-1.1M', actual: '-2.4M', surprise: '-1.3M 桶', priceMove1h: '+1.4%' },
        { eventDate: '8月21日', forecast: '+0.4M', actual: '+1.8M', surprise: '+1.4M 桶', priceMove1h: '-1.1%' },
        { eventDate: '8月14日', forecast: '-1.5M', actual: '-3.8M', surprise: '-2.3M 桶', priceMove1h: '+2.0%' },
      ],
    },
    {
      id: 'eia_cushing_storage',
      eventName: isZh ? 'EIA 庫欣原油交割中心庫存數據' : 'EIA Cushing OK Storage Hub Stockpile',
      country: isZh ? '美國' : 'United States',
      countryCode: 'US',
      category: 'Inventory',
      dateTime: '2026-09-05 14:30 UTC',
      timeBadge: isZh ? '28 分鐘前公佈' : 'Released 28m ago',
      timestamp: Date.now() - 28 * 60 * 1000,
      previous: '+0.24M 桶',
      forecast: '-0.30M 桶',
      actual: '-0.92M 桶',
      surpriseDelta: '-0.62M 桶',
      surpriseDirection: 'positive_for_oil',
      impact: 'High',
      status: 'Released',
      implication: 'Bullish',
      rationale: isZh
        ? '庫欣交割中心儲備持續逼近營運底線，直接推升 WTI 近月合約之現貨溢價（Backwardation）結構。'
        : 'Cushing hub stocks fall closer to operational tank bottoms, stoking WTI front-month backwardation prompt spreads.',
      relevanceScore: 92,
    },
    {
      id: 'opec_jmmc_meeting',
      eventName: isZh ? 'OPEC+ 聯合部長級監督委員會 (JMMC) 會議' : 'OPEC+ Joint Ministerial Monitoring Committee (JMMC)',
      country: 'OPEC+',
      countryCode: 'OPEC',
      category: 'OPEC',
      dateTime: '2026-09-07 11:00 UTC',
      timeBadge: isZh ? '2 天後' : 'In 2 Days',
      timestamp: Date.now() + 2 * 24 * 3600 * 1000,
      previous: isZh ? '維持每日 220 萬桶自願減產' : 'Maintain 2.2M bpd voluntary cuts',
      forecast: isZh ? '延長減產協議至 2026 第四季' : 'Extend cuts through Q4 2026',
      actual: undefined,
      impact: 'Critical',
      status: 'Upcoming',
      implication: 'Bullish',
      rationale: isZh
        ? '核心產油國代表已釋出共識，將延後原定增產計劃，確保進入冬季用油旺季前全球維持實質供給赤字。'
        : 'Key delegates signal consensus to delay planned production ramp-up to ensure market deficit ahead of winter heating season.',
      relevanceScore: 96,
    },
    {
      id: 'china_caixin_pmi',
      eventName: isZh ? '中國財新製造業採購經理人指數 (PMI)' : 'China Caixin Manufacturing PMI (MoM)',
      country: isZh ? '中國' : 'China',
      countryCode: 'CN',
      category: 'Trade',
      dateTime: '2026-09-06 01:45 UTC',
      timeBadge: isZh ? '明天 01:45 UTC' : 'Tomorrow 01:45 UTC',
      timestamp: Date.now() + 11 * 3600 * 1000,
      previous: '49.8',
      forecast: '50.6',
      actual: undefined,
      impact: 'High',
      status: 'Upcoming',
      implication: 'Bullish',
      rationale: isZh
        ? '若指數重新站回景氣榮枯線（>50.0），將驗證工業用能復甦，進一步刺激亞洲主要煉廠之即期原油採購。'
        : 'Rebound into expansionary territory (>50.0) would validate industrial recovery and boost prompt Asian refinery crude intake.',
      relevanceScore: 89,
    },
    {
      id: 'us_nonfarm_payrolls',
      eventName: isZh ? '美國非農就業人口變動與失業率' : 'US Non-Farm Payrolls & Unemployment Rate',
      country: isZh ? '美國' : 'United States',
      countryCode: 'US',
      category: 'Monetary',
      dateTime: '2026-09-08 12:30 UTC',
      timeBadge: isZh ? '3 天後' : 'In 3 Days',
      timestamp: Date.now() + 3 * 24 * 3600 * 1000,
      previous: '142K / 4.2%',
      forecast: '165K / 4.2%',
      actual: undefined,
      impact: 'High',
      status: 'Upcoming',
      implication: 'Neutral',
      rationale: isZh
        ? '勞動市場適度降溫將鎖定美聯準會 9 月降息 25-50 個基點之預期，壓低美元融資成本並利多能源商品。'
        : 'Labor market cooling will cement 25-50 bps Fed rate cuts, weakening the US dollar and lowering borrowing costs for energy commodities.',
      relevanceScore: 87,
    },
    {
      id: 'iea_oil_market_report',
      eventName: isZh ? 'IEA 國際能源總署全球原油市場月報 (OMR)' : 'IEA Monthly Oil Market Report (OMR)',
      country: isZh ? '全球' : 'Global',
      countryCode: 'IEA',
      category: 'Report',
      dateTime: '2026-09-11 08:00 UTC',
      timeBadge: isZh ? '6 天後' : 'In 6 Days',
      timestamp: Date.now() + 6 * 24 * 3600 * 1000,
      previous: isZh ? '全球需求增量 +110 萬桶/日' : 'Global Demand +1.1M bpd',
      forecast: isZh ? '全球需求增量 +120 萬桶/日' : 'Global Demand +1.2M bpd',
      actual: undefined,
      impact: 'High',
      status: 'Upcoming',
      implication: 'Neutral',
      rationale: isZh
        ? '報告將更新 2026/2027 年全球供需平衡表、非 OPEC 深海探勘投產進度及全球航運柴油轉型趨勢。'
        : 'Paris-based agency updates 2026/2027 demand balances, electric vehicle adoption curves, and non-OPEC deepwater projections.',
      relevanceScore: 84,
    },
    {
      id: 'baker_hughes_rig_count',
      eventName: isZh ? '貝克休斯美國活躍石油鑽井總數' : 'Baker Hughes US Oil Rig Count',
      country: isZh ? '美國' : 'United States',
      countryCode: 'US',
      category: 'Trade',
      dateTime: '2026-09-05 17:00 UTC',
      timeBadge: isZh ? '今日 17:00 UTC' : 'Today 17:00 UTC',
      timestamp: Date.now() + 3 * 3600 * 1000,
      previous: isZh ? '483 座鑽井' : '483 Rigs',
      forecast: isZh ? '481 座 (-2 座)' : '481 Rigs (-2)',
      actual: undefined,
      impact: 'Medium',
      status: 'Upcoming',
      implication: 'Bullish',
      rationale: isZh
        ? '二疊紀盆地與鷹灘頁岩區鑽機持續退場，反映頁岩油業者嚴格遵守資本支出紀律，限制美國供給增長上限。'
        : 'Ongoing rig retirement in the Permian and Eagle Ford signals producer capital discipline and limited near-term US supply growth.',
      relevanceScore: 76,
    },
    {
      id: 'fomc_rate_decision',
      eventName: isZh ? '美聯準會利率決策會議 (FOMC)' : 'Federal Reserve Interest Rate Decision (FOMC)',
      country: isZh ? '美國' : 'United States',
      countryCode: 'US',
      category: 'Monetary',
      dateTime: '2026-09-17 18:00 UTC',
      timeBadge: isZh ? '12 天後' : 'In 12 Days',
      timestamp: Date.now() + 12 * 24 * 3600 * 1000,
      previous: '5.25% - 5.50%',
      forecast: '5.00% - 5.25% (-25bps)',
      actual: undefined,
      impact: 'Critical',
      status: 'Upcoming',
      implication: 'Bullish',
      rationale: isZh
        ? '降息週期的正式啟動歷史上常引發大規模量化資金與宏觀基金湧入實體原物料與大宗期貨資產。'
        : 'Commencement of Fed monetary easing cycle historically unleashes speculative fund flows into raw commodities.',
      relevanceScore: 94,
    },
    {
      id: 'red_sea_maritime_security',
      eventName: isZh ? '曼德海峽/紅海海事安全戒備升級' : 'Bab el-Mandeb Naval Advisory Escalation',
      country: isZh ? '中東' : 'Middle East',
      countryCode: 'ME',
      category: 'Geopolitics',
      dateTime: '2026-09-04 18:40 UTC',
      timeBadge: isZh ? '昨天' : 'Yesterday',
      timestamp: Date.now() - 18 * 3600 * 1000,
      previous: isZh ? '2級警戒' : 'Warning Level 2',
      forecast: isZh ? '3級戰爭險戒備' : 'Level 3 War Risk',
      actual: isZh ? '3級主動攔截狀態' : 'Level 3 Active Interception',
      surpriseDelta: isZh ? '油輪保費附加費 +18%' : 'Tanker Surcharges +18%',
      surpriseDirection: 'positive_for_oil',
      impact: 'High',
      status: 'Released',
      implication: 'Bullish',
      rationale: isZh
        ? '多艘 VLCC 超大型油輪確認繞行南非好望角，額外增加 12 天以上航程並耗損大量船用燃油，推升運費與到港成本。'
        : 'Additional VLCC supertankers re-routed around Cape of Good Hope, tying up 12+ days of extra voyage transit time and burning bunker fuel.',
      relevanceScore: 91,
    },
    {
      id: 'saudi_aramco_osp',
      eventName: isZh ? '沙烏地阿美 10 月份亞洲官方原油售價 (OSP)' : 'Saudi Aramco Official Selling Prices (OSP) for Asia',
      country: isZh ? '沙烏地阿拉伯' : 'Saudi Arabia',
      countryCode: 'SA',
      category: 'Trade',
      dateTime: '2026-09-04 10:15 UTC',
      timeBadge: isZh ? '昨天' : 'Yesterday',
      timestamp: Date.now() - 26 * 3600 * 1000,
      previous: isZh ? '+1.80 美元/桶 (vs 阿曼/杜拜)' : '+$1.80 vs Oman/Dubai',
      forecast: isZh ? '+2.00 美元/桶 (vs 阿曼/杜拜)' : '+$2.00 vs Oman/Dubai',
      actual: isZh ? '+2.20 美元/桶 (vs 阿曼/杜拜)' : '+$2.20 vs Oman/Dubai',
      surpriseDelta: isZh ? '額外溢價 +0.20 美元/桶' : '+$0.20/bbl Premium',
      surpriseDirection: 'positive_for_oil',
      impact: 'High',
      status: 'Released',
      implication: 'Bullish',
      rationale: isZh
        ? '沙烏地全面調升官價且漲幅超出預期，印證中國與印度國營煉廠對即期實體中質原油之拉貨力道依舊強勁。'
        : 'Higher-than-expected price hike indicates robust physical spot demand from Chinese and Indian state refiners.',
      relevanceScore: 90,
    },
    {
      id: 'api_crude_stocks',
      eventName: isZh ? 'API 美國石油協會商業原油庫存預估' : 'API Weekly Crude Stock Estimate',
      country: isZh ? '美國' : 'United States',
      countryCode: 'US',
      category: 'Inventory',
      dateTime: '2026-09-04 20:30 UTC',
      timeBadge: isZh ? '昨天' : 'Yesterday',
      timestamp: Date.now() - 16 * 3600 * 1000,
      previous: '-1.40M 桶',
      forecast: '+0.50M 桶',
      actual: '-3.90M 桶',
      surpriseDelta: '-4.40M 桶',
      surpriseDirection: 'positive_for_oil',
      impact: 'Medium',
      status: 'Released',
      implication: 'Bullish',
      rationale: isZh
        ? 'API 率先公佈超大規模去庫存，為後續 EIA 官方數據奠定強烈看多基調。'
        : 'Front-ran the official government EIA data with massive physical stockpile draw.',
      relevanceScore: 82,
    },
  ];
}

export function getLocalizedNews(lang: Language = 'zh-TW'): NewsArticle[] {
  const isZh = lang === 'zh-TW';
  return [
    {
      id: 'news-1',
      headline: isZh
        ? 'EIA 週報：美原油庫存劇降 415 萬桶，墨西哥灣煉油廠開工率創年度新高'
        : 'EIA Reports Massive 4.15M Barrel US Crude Draw as Gulf Coast Refinery Runs Surge',
      summary: isZh
        ? '美國商業原油庫存去化速度大幅超越市場預期，煉油廠日加工量達 1,680 萬桶。庫欣交割地庫存降至營運警戒臨界點。'
        : 'US commercial crude inventories tumbled sharply past consensus as refinery crude throughput hit 16.8 million bpd. Cushing hub stockpiles fell toward critical operational thresholds.',
      source: isZh ? '路透社能源線' : 'Reuters Energy',
      url: 'https://www.reuters.com/business/energy/',
      timestamp: '2026-09-05 14:32 UTC',
      timeAgo: isZh ? '28 分鐘前' : '28m ago',
      sentiment: 'Bullish',
      sentimentScore: 2.4,
      impactLevel: 'Critical',
      category: 'Supply',
      isBreaking: true,
      readTime: isZh ? '3 分鐘閱讀' : '3 min read',
      tags: isZh ? ['EIA庫存', '庫欣中心', '美國煉廠', '商業儲備'] : ['EIA', 'Cushing', 'US Refineries', 'Inventories'],
    },
    {
      id: 'news-2',
      headline: isZh
        ? 'OPEC+ JMMC 代表普遍表態：高度支持延後第四季原定增產計劃'
        : 'OPEC+ JMMC Delegates Signal Strong Support for Delaying Planned Q4 Output Hike',
      summary: isZh
        ? '沙烏地阿拉伯、阿聯酋與俄羅斯等主要產油國達成共識，計劃將現行每日 220 萬桶自願減產協議展期至年底，防範秋季庫存累積。'
        : 'Key OPEC+ producers including Saudi Arabia, UAE, and Russia are aligning to preserve existing 2.2M bpd voluntary reductions through year-end to prevent autumn inventory build-ups.',
      source: isZh ? '彭博大宗商品' : 'Bloomberg Commodities',
      url: 'https://www.bloomberg.com/energy',
      timestamp: '2026-09-05 13:45 UTC',
      timeAgo: isZh ? '1 小時前' : '1h ago',
      sentiment: 'Bullish',
      sentimentScore: 2.1,
      impactLevel: 'Critical',
      category: 'Supply',
      isBreaking: true,
      readTime: isZh ? '4 分鐘閱讀' : '4 min read',
      tags: isZh ? ['OPEC+', '沙烏地阿拉伯', '產能配額', '減產展期'] : ['OPEC+', 'Saudi Arabia', 'Quotas', 'Production'],
    },
    {
      id: 'news-3',
      headline: isZh
        ? '紅海油輪遭無人機襲擾，托克與群富仕指令油輪全數繞道好望角'
        : 'Red Sea Tanker Traffic Diverts to Cape Route Following Fresh Drone Interceptions',
      summary: isZh
        ? '跨國大宗商品巨頭托克（Trafigura）與群富仕（Gunvor）要求租賃油輪全面避開曼德海峽，導致全球可用船隊運力受限，成品油輪日租金大幅走揚。'
        : 'Major commodity trading houses Trafigura and Gunvor instructed chartered tankers to bypass Bab el-Mandeb strait, locking up additional global fleet capacity and driving clean tanker day-rates higher.',
      source: isZh ? '標普普氏能源' : 'S&P Global Platts',
      url: 'https://www.spglobal.com/commodityinsights/en/market-insights/latest-news/oil',
      timestamp: '2026-09-05 12:15 UTC',
      timeAgo: isZh ? '2 小時前' : '2h ago',
      sentiment: 'Bullish',
      sentimentScore: 1.8,
      impactLevel: 'High',
      category: 'Shipping',
      readTime: isZh ? '4 分鐘閱讀' : '4 min read',
      tags: isZh ? ['紅海航道', '油輪運價', '戰略咽喉', '地緣政治'] : ['Red Sea', 'Freight Rates', 'Chokepoints', 'Geopolitics'],
    },
    {
      id: 'news-4',
      headline: isZh
        ? '中國人行啟動跨部會流動性注水，專項信貸支持重工業與製造業用能'
        : 'China PBOC Unveils Coordinated Liquidity Injection to Revitalize Heavy Industry',
      summary: isZh
        ? '中國人民銀行宣佈全面降準並擴大工業物流專項信貸規模，刺激製造業採購需求，上海原油期貨夜盤買盤湧現。'
        : 'The People’s Bank of China lowered reserve requirements and released dedicated credit facilities targeting manufacturing and logistics hubs, fueling speculative commodity appetite in Shanghai.',
      source: isZh ? '阿格斯傳媒' : 'Argus Media',
      url: 'https://www.argusmedia.com/en/crude-oil',
      timestamp: '2026-09-05 10:30 UTC',
      timeAgo: isZh ? '4 小時前' : '4h ago',
      sentiment: 'Bullish',
      sentimentScore: 1.5,
      impactLevel: 'High',
      category: 'Demand',
      readTime: isZh ? '3 分鐘閱讀' : '3 min read',
      tags: isZh ? ['中國需求', '人行刺激', '宏觀流動性', '工業用油'] : ['China', 'PBOC', 'Macro', 'Stimulus'],
    },
    {
      id: 'news-5',
      headline: isZh
        ? '美元指數滑落至 103.40，期貨市場定價 9 月降息機率達 100%'
        : 'US Dollar Index Slides to 103.40 as Markets Price 100% Odds of Fed September Rate Cut',
      summary: isZh
        ? '美元對主要貨幣全面走軟，直接為美元定價之實體原油提供價格支撐，CTA 量化基金加速回補 WTI 近月合約多單。'
        : 'Greenback weakness across major currency crosses provided immediate support for dollar-denominated raw commodities, prompting CTA quantitative funds to buy front-month WTI contracts.',
      source: isZh ? '金融時報能源' : 'Financial Times Energy',
      url: 'https://www.ft.com/energy',
      timestamp: '2026-09-05 09:10 UTC',
      timeAgo: isZh ? '5 小時前' : '5h ago',
      sentiment: 'Bullish',
      sentimentScore: 1.3,
      impactLevel: 'Medium',
      category: 'Macro',
      readTime: isZh ? '3 分鐘閱讀' : '3 min read',
      tags: isZh ? ['美元指數', '美聯準會', '貨幣寬鬆', '匯率外匯'] : ['DXY', 'Fed', 'Monetary Policy', 'Currencies'],
    },
    {
      id: 'news-6',
      headline: isZh
        ? '沙烏地阿美全面調漲 10 月阿拉伯輕原油亞洲 OSP 溢價幅度'
        : 'Saudi Aramco Sets October Arab Light OSP at Higher Premium for Asian Buyers',
      summary: isZh
        ? '全球最大原油出口國將銷往亞洲之指標油品溢價調升至 +$2.20/桶（較阿曼/杜拜均價），高於市場預期，反映實體中質原油現貨供需極度緊俏。'
        : 'The world’s largest crude exporter raised its flagship grade differential to +$2.20 over Oman/Dubai swaps, exceeding consensus expectations and proving tight physical sweet/sour balance.',
      source: isZh ? '能源情報集團' : 'Energy Intelligence',
      url: 'https://www.energyintel.com/',
      timestamp: '2026-09-04 16:20 UTC',
      timeAgo: isZh ? '22 小時前' : '22h ago',
      sentiment: 'Bullish',
      sentimentScore: 1.6,
      impactLevel: 'High',
      category: 'Supply',
      readTime: isZh ? '2 分鐘閱讀' : '2 min read',
      tags: isZh ? ['阿美官價', 'OSP溢價', '亞洲買盤', '現貨定價'] : ['Aramco', 'OSP', 'Asia Demand', 'Crude Pricing'],
    },
    {
      id: 'news-7',
      headline: isZh
        ? '美國二疊紀盆地優質區塊單井產量曲線趨於平緩，頁岩油成長動能受限'
        : 'US Permian Basin Well Productivity Shows Flattening Curves in Mature Tier-1 Acreage',
      summary: isZh
        ? '睿諮得能源（Rystad Energy）數據顯示，德拉瓦盆地鑽井效率增益已達邊際遞減，限制美國頁岩油在 80 美元以上快速釋放增產之能力。'
        : 'Rystad Energy data reveals drilling efficiency gains in the Delaware basin have reached diminishing returns, limiting US shale’s ability to act as rapid swing supplier above $80/bbl.',
      source: isZh ? '國際原油網' : 'OilPrice.com',
      url: 'https://oilprice.com/Energy/Crude-Oil/',
      timestamp: '2026-09-04 14:00 UTC',
      timeAgo: isZh ? '1 天前' : '1d ago',
      sentiment: 'Bullish',
      sentimentScore: 1.2,
      impactLevel: 'Medium',
      category: 'Supply',
      readTime: isZh ? '5 分鐘閱讀' : '5 min read',
      tags: isZh ? ['二疊紀盆地', '美國頁岩油', '鑽井產能', '產能高原期'] : ['Permian', 'US Shale', 'Production Peak', 'Drilling'],
    },
    {
      id: 'news-8',
      headline: isZh
        ? '歐洲 ARA 樞紐柴油庫存攀升至數月高點，工業需求疲弱壓抑裂解利潤'
        : 'European Diesel Stockpiles at ARA Hub Reach Multi-Month Highs Amid Muted Industrial Activity',
      summary: isZh
        ? '阿姆斯特丹-鹿特丹-安特衛普中間餾分油庫存單週上升 3.4%，德國工業放緩抑制陸運柴油消耗，壓抑歐洲煉廠柴油裂解利潤。'
        : 'Amsterdam-Rotterdam-Antwerp distillate inventories climbed 3.4% as sluggish German industrial output tempered trucking demand, offsetting crude price gains in regional crack margins.',
      source: isZh ? '路透社能源線' : 'Reuters Energy',
      url: 'https://www.reuters.com/business/energy/',
      timestamp: '2026-09-04 11:30 UTC',
      timeAgo: isZh ? '1 天前' : '1d ago',
      sentiment: 'Bearish',
      sentimentScore: -1.4,
      impactLevel: 'Medium',
      category: 'Refining',
      readTime: isZh ? '3 分鐘閱讀' : '3 min read',
      tags: isZh ? ['歐洲市場', '柴油庫存', 'ARA樞紐', '裂解價差'] : ['Europe', 'Diesel', 'ARA Hub', 'Crack Margins'],
    },
    {
      id: 'news-9',
      headline: isZh
        ? '美國能源部發佈招標採購 350 萬桶輕原油以回補戰略儲備 (SPR)'
        : 'US Department of Energy Issues Solicitation for 3.5M Barrels of Sweet Crude for SPR Refill',
      summary: isZh
        ? '美國政府確認 11-12 月交割至 Bryan Mound 及 Big Hill 地下鹽穴之原油合約，為油價在 72-74 美元區間構築強烈政策支撐底部。'
        : 'The Biden administration confirmed purchase contracts for delivery into Bryan Mound and Big Hill caverns in November-December, providing a persistent price floor near $72-74/bbl.',
      source: isZh ? '美國能源部官方電訊' : 'EIA Official Wire',
      url: 'https://www.eia.gov/petroleum/',
      timestamp: '2026-09-03 19:15 UTC',
      timeAgo: isZh ? '2 天前' : '2d ago',
      sentiment: 'Bullish',
      sentimentScore: 1.4,
      impactLevel: 'High',
      category: 'Supply',
      readTime: isZh ? '3 分鐘閱讀' : '3 min read',
      tags: isZh ? ['戰略儲備', 'SPR回補', '能源部政策', '底部支撐'] : ['SPR', 'DOE', 'Strategic Reserve', 'US Policy'],
    },
  ];
}

export function getLocalizedChokepoints(lang: Language = 'zh-TW'): ChokepointData[] {
  const isZh = lang === 'zh-TW';
  return [
    {
      id: 'hormuz',
      name: isZh ? '荷姆茲海峽' : 'Strait of Hormuz',
      location: isZh ? '阿曼 / 伊朗 波斯灣咽喉' : 'Oman / Iran Gulf Gateway',
      transitVolumeMbpd: 20.8,
      globalSharePercent: 21.0,
      status: 'Elevated Risk',
      riskScore: 74,
      keyThreats: isZh
        ? '伊朗革命衛隊快艇巡邏、電子 GPS 欺騙干擾、海上戰爭險附加費率維持高檔'
        : 'IRGC gunboat patrols, electronic GPS spoofing, insurance premium war surcharges',
      lastIncident: isZh ? '3 天前發佈 GPS 訊號干擾通報' : 'GPS jamming advisory issued (3 days ago)',
      vesselCount24h: 38,
    },
    {
      id: 'bab_el_mandeb',
      name: isZh ? '曼德海峽 (紅海航道)' : 'Bab el-Mandeb (Red Sea)',
      location: isZh ? '葉門 / 吉布地 / 厄利垂亞' : 'Yemen / Djibouti / Eritrea',
      transitVolumeMbpd: 4.8,
      globalSharePercent: 5.2,
      status: 'High Disruption',
      riskScore: 86,
      keyThreats: isZh
        ? '青年運動無人機與反艦巡弋飛彈襲擾，約 65% VLCC 超大型油輪持續繞行好望角'
        : 'Houthi drone / anti-ship cruise missile threats, ~65% VLCC traffic diverted to Cape route',
      lastIncident: isZh ? '護航聯軍成功攔截目標貨輪之襲擊 (昨日)' : 'Targeted container vessel safely intercepted by naval coalition (Yesterday)',
      vesselCount24h: 14,
    },
    {
      id: 'malacca',
      name: isZh ? '馬六甲海峽' : 'Strait of Malacca',
      location: isZh ? '印尼 / 馬來西亞 / 新加坡' : 'Indonesia / Malaysia / Singapore',
      transitVolumeMbpd: 16.5,
      globalSharePercent: 16.8,
      status: 'Normal',
      riskScore: 24,
      keyThreats: isZh
        ? '水道繁忙擁擠、菲利普水道淺灘吃水限制與例行防海盜警戒'
        : 'Dense maritime congestion, shallow draft shoals in Phillips Channel',
      lastIncident: isZh ? '三國海警聯合例行防海盜演練圓滿完成' : 'Routine coast guard joint anti-piracy exercise completed',
      vesselCount24h: 82,
    },
    {
      id: 'suez',
      name: isZh ? '蘇伊士運河' : 'Suez Canal',
      location: isZh ? '埃及' : 'Egypt',
      transitVolumeMbpd: 4.2,
      globalSharePercent: 4.5,
      status: 'Elevated Risk',
      riskScore: 68,
      keyThreats: isZh
        ? '紅海避航潮使北向通航油輪總量減少 48%，運河當局推出費率折扣'
        : 'Red Sea avoidance reducing total northbound transit fees by 48%',
      lastIncident: isZh ? '對亞洲液化天然氣/LPG 載運船實施過境費減免' : 'Transit fees discounted for Asian LNG/LPG carriers',
      vesselCount24h: 22,
    },
    {
      id: 'bosphorus',
      name: isZh ? '土耳其海峽 (博斯普魯斯)' : 'Turkish Straits (Bosphorus)',
      location: isZh ? '土耳其 / 黑海通道' : 'Turkey / Black Sea',
      transitVolumeMbpd: 2.4,
      globalSharePercent: 2.6,
      status: 'Normal',
      riskScore: 32,
      keyThreats: isZh
        ? '俄羅斯影子船隊西方保險審查嚴格、冬季季節性引航延誤'
        : 'Russian shadow-fleet insurance certification checks, seasonal pilotage delays',
      lastIncident: isZh ? '小型散裝船機械故障導致北向短暫停航 4 小時' : 'Minor mechanical breakdown caused 4-hour northbound pause',
      vesselCount24h: 19,
    },
  ];
}

export function getLocalizedOpecMembers(lang: Language = 'zh-TW'): OpecMemberData[] {
  const isZh = lang === 'zh-TW';
  return [
    {
      country: isZh ? '沙烏地阿拉伯' : 'Saudi Arabia',
      flag: '🇸🇦',
      quotaMbpd: 9.00,
      actualMbpd: 8.95,
      compliancePercent: 101.2,
      spareCapacityMbpd: 2.85,
      status: 'Compliant',
      voluntaryCutMbpd: 1.00,
    },
    {
      country: isZh ? '俄羅斯 (OPEC+)' : 'Russia (OPEC+)',
      flag: '🇷🇺',
      quotaMbpd: 8.98,
      actualMbpd: 9.08,
      compliancePercent: 98.2,
      spareCapacityMbpd: 0.35,
      status: 'Overproducing',
      voluntaryCutMbpd: 0.47,
    },
    {
      country: isZh ? '伊拉克' : 'Iraq',
      flag: '🇮🇶',
      quotaMbpd: 4.00,
      actualMbpd: 4.18,
      compliancePercent: 94.5,
      spareCapacityMbpd: 0.20,
      status: 'Overproducing',
      voluntaryCutMbpd: 0.22,
    },
    {
      country: isZh ? '阿拉伯聯合大公國' : 'United Arab Emirates',
      flag: '🇦🇪',
      quotaMbpd: 2.91,
      actualMbpd: 2.92,
      compliancePercent: 99.6,
      spareCapacityMbpd: 1.15,
      status: 'Compliant',
      voluntaryCutMbpd: 0.16,
    },
    {
      country: isZh ? '科威特' : 'Kuwait',
      flag: '🇰🇼',
      quotaMbpd: 2.41,
      actualMbpd: 2.40,
      compliancePercent: 100.4,
      spareCapacityMbpd: 0.40,
      status: 'Compliant',
      voluntaryCutMbpd: 0.13,
    },
    {
      country: isZh ? '哈薩克 (OPEC+)' : 'Kazakhstan (OPEC+)',
      flag: '🇰🇿',
      quotaMbpd: 1.47,
      actualMbpd: 1.56,
      compliancePercent: 93.8,
      spareCapacityMbpd: 0.05,
      status: 'Overproducing',
      voluntaryCutMbpd: 0.08,
    },
    {
      country: isZh ? '奈及利亞' : 'Nigeria',
      flag: '🇳🇬',
      quotaMbpd: 1.50,
      actualMbpd: 1.42,
      compliancePercent: 105.6,
      spareCapacityMbpd: 0.10,
      status: 'Underproducing',
      voluntaryCutMbpd: 0.00,
    },
    {
      country: isZh ? '阿爾及利亞' : 'Algeria',
      flag: '🇩🇿',
      quotaMbpd: 0.91,
      actualMbpd: 0.90,
      compliancePercent: 101.1,
      spareCapacityMbpd: 0.08,
      status: 'Compliant',
      voluntaryCutMbpd: 0.05,
    },
  ];
}

export function getLocalizedInventoryHubs(lang: Language = 'zh-TW'): InventoryHubData[] {
  const isZh = lang === 'zh-TW';
  return [
    {
      id: 'cushing',
      name: isZh ? '庫欣交割中心 (WTI 期貨交割點)' : 'Cushing Hub (WTI Delivery Point)',
      region: isZh ? '美國奧克拉荷馬州' : 'Oklahoma, USA',
      currentLevelMbbl: 32.4,
      capacityMbbl: 85.0,
      utilizationPercent: 38.1,
      weeklyChangeMbbl: -0.92,
      fiveYearAvgPercent: -14.2,
      status: 'Draw',
    },
    {
      id: 'us_commercial',
      name: isZh ? '全美商業原油總儲備庫存' : 'Total US Commercial Crude Stocks',
      region: isZh ? '美國全境' : 'United States',
      currentLevelMbbl: 421.6,
      capacityMbbl: 650.0,
      utilizationPercent: 64.8,
      weeklyChangeMbbl: -4.15,
      fiveYearAvgPercent: -4.6,
      status: 'Draw',
    },
    {
      id: 'us_spr',
      name: isZh ? '美國戰略石油儲備 (SPR)' : 'US Strategic Petroleum Reserve (SPR)',
      region: isZh ? '美國墨西哥灣沿岸鹽穴' : 'Gulf Coast, USA',
      currentLevelMbbl: 378.2,
      capacityMbbl: 714.0,
      utilizationPercent: 52.9,
      weeklyChangeMbbl: +0.65,
      fiveYearAvgPercent: -39.5,
      status: 'Build',
    },
    {
      id: 'ara_rotterdam',
      name: isZh ? '歐洲 ARA 儲運樞紐 (鹿特丹/安特衛普)' : 'ARA Hub (Rotterdam/Antwerp)',
      region: isZh ? '西北歐' : 'Northwest Europe',
      currentLevelMbbl: 58.2,
      capacityMbbl: 82.0,
      utilizationPercent: 71.0,
      weeklyChangeMbbl: +0.42,
      fiveYearAvgPercent: +2.8,
      status: 'Build',
    },
    {
      id: 'singapore_onshore',
      name: isZh ? '新加坡陸上商業儲油基地' : 'Singapore Commercial Tank Farm',
      region: isZh ? '亞太地區' : 'Asia Pacific',
      currentLevelMbbl: 43.8,
      capacityMbbl: 62.0,
      utilizationPercent: 70.6,
      weeklyChangeMbbl: -0.78,
      fiveYearAvgPercent: -5.1,
      status: 'Draw',
    },
  ];
}

export function getLocalizedPriceHistory(lang: Language = 'zh-TW'): Record<string, PriceHistoryPoint[]> {
  const isZh = lang === 'zh-TW';
  return {
    '1D': [
      { time: '08:00', wti: 74.60, brent: 78.90, volume: 14200, open: 74.60, high: 74.85, low: 74.50, close: 74.80 },
      { time: '09:00', wti: 74.30, brent: 78.60, volume: 18500, open: 74.80, high: 74.90, low: 74.20, close: 74.30 },
      { time: '10:00', wti: 74.75, brent: 79.15, volume: 22100, open: 74.30, high: 74.95, low: 74.25, close: 74.75 },
      { time: '11:00', wti: 75.20, brent: 79.60, volume: 29400, open: 74.75, high: 75.35, low: 74.70, close: 75.20, eventNote: isZh ? '倫敦盤開盤買盤湧入' : 'London open surge' },
      { time: '12:00', wti: 75.65, brent: 80.05, volume: 34100, open: 75.20, high: 75.80, low: 75.10, close: 75.65 },
      { time: '13:00', wti: 75.40, brent: 79.80, volume: 26800, open: 75.65, high: 75.75, low: 75.30, close: 75.40 },
      { time: '14:00', wti: 75.90, brent: 80.30, volume: 48900, open: 75.40, high: 76.10, low: 75.35, close: 75.90 },
      { time: '14:30', wti: 76.85, brent: 81.25, volume: 89400, open: 75.90, high: 77.10, low: 75.85, close: 76.85, eventNote: isZh ? 'EIA 劇烈去庫存 415 萬桶公佈' : 'EIA 4.15M Draw Release' },
      { time: '15:00', wti: 76.30, brent: 80.70, volume: 51200, open: 76.85, high: 76.95, low: 76.15, close: 76.30 },
      { time: '16:00', wti: 76.45, brent: 80.85, volume: 38200, open: 76.30, high: 76.60, low: 76.20, close: 76.45 },
    ],
    '1W': [
      { time: isZh ? '8月30日' : 'Aug 30', wti: 73.80, brent: 77.90, volume: 210000, high: 74.30, low: 73.10 },
      { time: isZh ? '8月31日' : 'Aug 31', wti: 74.20, brent: 78.40, volume: 245000, high: 74.60, low: 73.80 },
      { time: isZh ? '9月01日' : 'Sep 01', wti: 74.90, brent: 79.10, volume: 280000, high: 75.30, low: 74.10, eventNote: isZh ? '中國人行降準刺激政策宣佈' : 'China PBOC stimulus announcement' },
      { time: isZh ? '9月02日' : 'Sep 02', wti: 75.40, brent: 79.70, volume: 265000, high: 75.90, low: 74.80 },
      { time: isZh ? '9月03日' : 'Sep 03', wti: 75.10, brent: 79.40, volume: 230000, high: 75.60, low: 74.70 },
      { time: isZh ? '9月04日' : 'Sep 04', wti: 75.60, brent: 79.90, volume: 310000, high: 76.20, low: 75.00, eventNote: isZh ? '沙烏地阿美調升亞洲 OSP 官價' : 'Aramco OSP Asian Price Hike' },
      { time: isZh ? '9月05日' : 'Sep 05', wti: 76.45, brent: 80.85, volume: 342800, high: 77.10, low: 74.20, eventNote: isZh ? 'EIA 去庫 415 萬桶突破' : 'EIA 4.15M Draw' },
    ],
    '1M': [
      { time: isZh ? '8月06日' : 'Aug 06', wti: 72.10, brent: 75.80, volume: 1100000 },
      { time: isZh ? '8月10日' : 'Aug 10', wti: 73.40, brent: 77.10, volume: 1250000 },
      { time: isZh ? '8月14日' : 'Aug 14', wti: 74.80, brent: 78.60, volume: 1400000, eventNote: isZh ? 'EIA 去庫 380 萬桶' : 'EIA 3.8M Draw' },
      { time: isZh ? '8月18日' : 'Aug 18', wti: 73.90, brent: 77.50, volume: 1150000 },
      { time: isZh ? '8月22日' : 'Aug 22', wti: 75.10, brent: 79.00, volume: 1320000, eventNote: isZh ? '曼德海峽地緣風險升溫' : 'Bab el-Mandeb Alert' },
      { time: isZh ? '8月26日' : 'Aug 26', wti: 75.80, brent: 79.60, volume: 1290000 },
      { time: isZh ? '8月30日' : 'Aug 30', wti: 74.20, brent: 78.30, volume: 1180000 },
      { time: isZh ? '9月02日' : 'Sep 02', wti: 75.40, brent: 79.70, volume: 1350000 },
      { time: isZh ? '9月05日' : 'Sep 05', wti: 76.45, brent: 80.85, volume: 1540000, eventNote: isZh ? '多重看多催化劑爆發' : 'Bullish Multi-Catalyst Breakout' },
    ],
    '1Y': [
      { time: isZh ? '2025年10月' : 'Oct 25', wti: 84.50, brent: 88.90, volume: 8200000 },
      { time: isZh ? '2025年12月' : 'Dec 25', wti: 71.20, brent: 75.60, volume: 7600000, eventNote: isZh ? '非 OPEC 產量擴張高峰' : 'Non-OPEC Output Growth Surge' },
      { time: isZh ? '2026年02月' : 'Feb 26', wti: 76.80, brent: 81.20, volume: 8900000 },
      { time: isZh ? '2026年04月' : 'Apr 26', wti: 86.40, brent: 91.10, volume: 10200000, eventNote: isZh ? '中東地緣政治溢價飆升' : 'Middle East Geopolitical Spike' },
      { time: isZh ? '2026年06月' : 'Jun 26', wti: 79.50, brent: 83.80, volume: 8400000 },
      { time: isZh ? '2026年08月' : 'Aug 26', wti: 73.60, brent: 77.40, volume: 8100000 },
      { time: isZh ? '2026年09月' : 'Sep 26', wti: 76.45, brent: 80.85, volume: 8600000 },
    ],
  };
}

// Backward-compatible exports defaulting to Traditional Chinese
export const MOCK_TICKERS = getLocalizedTickers('zh-TW');
export const MOCK_SPREADS = getLocalizedSpreads('zh-TW');
export const MOCK_SENTIMENT = getLocalizedSentiment('zh-TW');
export const MOCK_CATALYSTS = getLocalizedCatalysts('zh-TW');
export const MOCK_NEWS = getLocalizedNews('zh-TW');
export const MOCK_CHOKEPOINTS = getLocalizedChokepoints('zh-TW');
export const MOCK_OPEC_MEMBERS = getLocalizedOpecMembers('zh-TW');
export const MOCK_INVENTORY_HUBS = getLocalizedInventoryHubs('zh-TW');
export const MOCK_PRICE_HISTORY = getLocalizedPriceHistory('zh-TW');

// ==========================================
// 1. Term Structure & Futures Curve Data
// ==========================================
export function getLocalizedTermStructure(lang: Language = 'zh-TW'): TermStructureData {
  const isZh = lang === 'zh-TW';
  return {
    benchmark: 'WTI',
    curveStructure: 'Backwardation',
    promptSpread1M2M: 0.68, // M1 - M2 ($/bbl) -> Positive = Backwardation
    annualizedRollYieldPercent: 6.24,
    sixMonthSpread: 2.45,
    twelveMonthSpread: 4.10,
    currentContracts: [
      {
        tenor: 'Spot',
        contractCode: 'CL.SPOT',
        deliveryMonth: isZh ? '即期現貨' : 'Spot Cash',
        price: 76.45,
        change: 1.82,
        spreadVsPrompt: 0.00,
        volume: 342800,
        openInterest: 412000,
        shape: 'Backwardation',
        brentPrice: 80.85,
        brentChange: 1.95,
      },
      {
        tenor: 'M1',
        contractCode: 'CLV26',
        deliveryMonth: isZh ? '2026年10月 (近月)' : 'Oct 26 (Prompt)',
        price: 76.45,
        change: 1.82,
        spreadVsPrompt: 0.00,
        volume: 342800,
        openInterest: 389200,
        shape: 'Backwardation',
        brentPrice: 80.85,
        brentChange: 1.95,
      },
      {
        tenor: 'M2',
        contractCode: 'CLX26',
        deliveryMonth: isZh ? '2026年11月' : 'Nov 26',
        price: 75.77,
        change: 1.68,
        spreadVsPrompt: -0.68,
        volume: 215400,
        openInterest: 310500,
        shape: 'Backwardation',
        brentPrice: 80.20,
        brentChange: 1.81,
      },
      {
        tenor: 'M3',
        contractCode: 'CLZ26',
        deliveryMonth: isZh ? '2026年12月' : 'Dec 26',
        price: 75.25,
        change: 1.54,
        spreadVsPrompt: -1.20,
        volume: 184900,
        openInterest: 462100,
        shape: 'Backwardation',
        brentPrice: 79.68,
        brentChange: 1.66,
      },
      {
        tenor: 'M6',
        contractCode: 'CLH27',
        deliveryMonth: isZh ? '2027年03月' : 'Mar 27',
        price: 74.00,
        change: 1.25,
        spreadVsPrompt: -2.45,
        volume: 92400,
        openInterest: 214800,
        shape: 'Backwardation',
        brentPrice: 78.40,
        brentChange: 1.35,
      },
      {
        tenor: 'M12',
        contractCode: 'CLU27',
        deliveryMonth: isZh ? '2027年09月' : 'Sep 27',
        price: 72.35,
        change: 0.95,
        spreadVsPrompt: -4.10,
        volume: 48600,
        openInterest: 168200,
        shape: 'Backwardation',
        brentPrice: 76.75,
        brentChange: 1.05,
      },
      {
        tenor: 'M18',
        contractCode: 'CLH28',
        deliveryMonth: isZh ? '2028年03月' : 'Mar 28',
        price: 71.10,
        change: 0.72,
        spreadVsPrompt: -5.35,
        volume: 24100,
        openInterest: 94600,
        shape: 'Backwardation',
        brentPrice: 75.50,
        brentChange: 0.82,
      },
      {
        tenor: 'M24',
        contractCode: 'CLU28',
        deliveryMonth: isZh ? '2028年09月' : 'Sep 28',
        price: 70.20,
        change: 0.55,
        spreadVsPrompt: -6.25,
        volume: 15300,
        openInterest: 68400,
        shape: 'Backwardation',
        brentPrice: 74.60,
        brentChange: 0.65,
      },
    ],
    historicalCurves: [
      { tenor: 'Spot', deliveryMonth: 'Spot', current: 76.45, oneWeekAgo: 74.20, oneMonthAgo: 72.80 },
      { tenor: 'M1', deliveryMonth: 'Oct 26', current: 76.45, oneWeekAgo: 74.20, oneMonthAgo: 72.80 },
      { tenor: 'M2', deliveryMonth: 'Nov 26', current: 75.77, oneWeekAgo: 73.80, oneMonthAgo: 72.50 },
      { tenor: 'M3', deliveryMonth: 'Dec 26', current: 75.25, oneWeekAgo: 73.45, oneMonthAgo: 72.25 },
      { tenor: 'M6', deliveryMonth: 'Mar 27', current: 74.00, oneWeekAgo: 72.60, oneMonthAgo: 71.80 },
      { tenor: 'M12', deliveryMonth: 'Sep 27', current: 72.35, oneWeekAgo: 71.40, oneMonthAgo: 70.90 },
      { tenor: 'M18', deliveryMonth: 'Mar 28', current: 71.10, oneWeekAgo: 70.50, oneMonthAgo: 70.20 },
      { tenor: 'M24', deliveryMonth: 'Sep 28', current: 70.20, oneWeekAgo: 69.80, oneMonthAgo: 69.60 },
    ],
  };
}

// ==========================================
// 2. Order Book / Level 2 Depth of Market (DOM)
// ==========================================
export function getLocalizedOrderBook(symbol: string = 'CL1!', lang: Language = 'zh-TW'): OrderBookData {
  const isZh = lang === 'zh-TW';
  const isBrent = symbol === 'CO1!' || symbol.includes('CO');
  const basePrice = isBrent ? 80.85 : 76.45;
  const change = isBrent ? 1.95 : 1.82;
  const changePercent = isBrent ? 2.47 : 2.44;

  return {
    symbol: isBrent ? 'CO1! (ICE Brent)' : 'CL1! (NYMEX WTI)',
    lastPrice: basePrice,
    change,
    changePercent,
    spreadTicks: 1,
    spreadDollar: 0.01,
    imbalanceRatio: 18.4, // +18.4% Bid-heavy
    asks: [
      { price: basePrice + 0.10, size: 890, total: 3820, depthPercent: 100, ordersCount: 42 },
      { price: basePrice + 0.09, size: 640, total: 2930, depthPercent: 76.7, ordersCount: 31 },
      { price: basePrice + 0.08, size: 510, total: 2290, depthPercent: 59.9, ordersCount: 26 },
      { price: basePrice + 0.07, size: 430, total: 1780, depthPercent: 46.6, ordersCount: 19 },
      { price: basePrice + 0.06, size: 380, total: 1350, depthPercent: 35.3, ordersCount: 17 },
      { price: basePrice + 0.05, size: 310, total: 970, depthPercent: 25.4, ordersCount: 14 },
      { price: basePrice + 0.04, size: 260, total: 660, depthPercent: 17.3, ordersCount: 12 },
      { price: basePrice + 0.03, size: 190, total: 400, depthPercent: 10.5, ordersCount: 9 },
      { price: basePrice + 0.02, size: 120, total: 210, depthPercent: 5.5, ordersCount: 7 },
      { price: basePrice + 0.01, size: 90, total: 90, depthPercent: 2.4, ordersCount: 5 },
    ],
    bids: [
      { price: basePrice, size: 180, total: 180, depthPercent: 3.9, ordersCount: 8 },
      { price: basePrice - 0.01, size: 260, total: 440, depthPercent: 9.7, ordersCount: 14 },
      { price: basePrice - 0.02, size: 340, total: 780, depthPercent: 17.2, ordersCount: 18 },
      { price: basePrice - 0.03, size: 480, total: 1260, depthPercent: 27.8, ordersCount: 24 },
      { price: basePrice - 0.04, size: 590, total: 1850, depthPercent: 40.8, ordersCount: 29 },
      { price: basePrice - 0.05, size: 680, total: 2530, depthPercent: 55.9, ordersCount: 35 },
      { price: basePrice - 0.06, size: 750, total: 3280, depthPercent: 72.4, ordersCount: 38 },
      { price: basePrice - 0.07, size: 820, total: 4100, depthPercent: 90.5, ordersCount: 41 },
      { price: basePrice - 0.08, size: 940, total: 5040, depthPercent: 100.0, ordersCount: 47 },
      { price: basePrice - 0.09, size: 1240, total: 6280, depthPercent: 100.0, ordersCount: 56 },
    ],
    recentTrades: [
      { id: 't-1', time: '14:02:15.820', price: basePrice, size: 50, side: 'BUY', exchange: isBrent ? 'ICE' : 'NYMEX' },
      { id: 't-2', time: '14:02:15.340', price: basePrice, size: 25, side: 'BUY', exchange: isBrent ? 'ICE' : 'NYMEX' },
      { id: 't-3', time: '14:02:14.910', price: basePrice - 0.01, size: 10, side: 'SELL', exchange: isBrent ? 'ICE' : 'NYMEX' },
      { id: 't-4', time: '14:02:14.120', price: basePrice, size: 100, side: 'BUY', exchange: isBrent ? 'ICE' : 'NYMEX' },
      { id: 't-5', time: '14:02:13.680', price: basePrice + 0.01, size: 75, side: 'BUY', exchange: isBrent ? 'ICE' : 'NYMEX' },
      { id: 't-6', time: '14:02:12.900', price: basePrice, size: 250, side: 'BUY', exchange: isBrent ? 'ICE' : 'NYMEX' },
      { id: 't-7', time: '14:02:12.110', price: basePrice - 0.01, size: 40, side: 'SELL', exchange: isBrent ? 'ICE' : 'NYMEX' },
      { id: 't-8', time: '14:02:11.450', price: basePrice, size: 60, side: 'BUY', exchange: isBrent ? 'ICE' : 'NYMEX' },
      { id: 't-9', time: '14:02:10.980', price: basePrice, size: 15, side: 'BUY', exchange: isBrent ? 'ICE' : 'NYMEX' },
      { id: 't-10', time: '14:02:10.220', price: basePrice - 0.01, size: 85, side: 'SELL', exchange: isBrent ? 'ICE' : 'NYMEX' },
    ],
  };
}

// ==========================================
// 3. Crack Spreads & Global Refinery Runs Data
// ==========================================
export function getLocalizedRefiningData(lang: Language = 'zh-TW'): RefiningDashboardData {
  const isZh = lang === 'zh-TW';
  return {
    crack321Usgc: 23.85,
    crack321Change: 1.20,
    gasolineCrack: 19.40,
    dieselCrack: 32.75,
    globalThroughputMbpd: 84.15,
    globalCapacityMbpd: 102.80,
    globalUtilizationPercent: 81.86,
    cracks: [
      {
        id: 'usgc_321',
        name: isZh ? '3:2:1 墨西哥灣煉油裂解價差' : '3:2:1 US Gulf Coast Crack Spread',
        region: isZh ? '美國墨西哥灣 (PADD 3)' : 'US Gulf Coast (PADD 3)',
        formula: '3 WTI -> 2 RBOB + 1 ULSD',
        value: 23.85,
        change: 1.20,
        unit: isZh ? '美元/桶' : 'USD/bbl',
        fiveYearAvg: 18.40,
        status: 'Tight',
        trend: 'widening',
        components: [
          { product: isZh ? 'RBOB 汽油' : 'RBOB Gasoline', yieldRatio: '66.7%', productPrice: 101.98, crudePrice: 76.45 },
          { product: isZh ? 'ULSD 柴油' : 'ULSD Diesel', yieldRatio: '33.3%', productPrice: 112.73, crudePrice: 76.45 },
        ],
      },
      {
        id: 'us_diesel_crack',
        name: isZh ? '美國超低硫柴油裂解價差 (ULSD)' : 'US ULSD Heating Oil / Diesel Crack',
        region: isZh ? '美國紐約港 / 墨西哥灣' : 'US NY Harbor / Gulf Coast',
        formula: '1 WTI -> 1 ULSD',
        value: 32.75,
        change: 1.90,
        unit: isZh ? '美元/桶' : 'USD/bbl',
        fiveYearAvg: 24.10,
        status: 'Tight',
        trend: 'widening',
        components: [
          { product: isZh ? '超低硫柴油' : 'ULSD Diesel', yieldRatio: '100%', productPrice: 112.73, crudePrice: 76.45 },
        ],
      },
      {
        id: 'us_gasoline_crack',
        name: isZh ? '美國 RBOB 汽油裂解價差' : 'US RBOB Gasoline Crack Spread',
        region: isZh ? '美國紐約港 (NYMEX)' : 'US NYMEX Gasoline',
        formula: '1 WTI -> 1 RBOB',
        value: 19.40,
        change: 0.85,
        unit: isZh ? '美元/桶' : 'USD/bbl',
        fiveYearAvg: 15.50,
        status: 'Normal',
        trend: 'widening',
        components: [
          { product: isZh ? 'RBOB 汽油' : 'RBOB Gasoline', yieldRatio: '100%', productPrice: 101.98, crudePrice: 76.45 },
        ],
      },
      {
        id: 'singapore_gasoil_crack',
        name: isZh ? '新加坡 10ppm 柴油 / 航煤裂解價差' : 'Singapore 10ppm Gasoil / Jet Crack',
        region: isZh ? '亞太樞紐 (新加坡)' : 'Asia Pacific (Singapore)',
        formula: '1 Dubai Crude -> 1 Gasoil 10ppm',
        value: 18.60,
        change: 0.45,
        unit: isZh ? '美元/桶' : 'USD/bbl',
        fiveYearAvg: 16.20,
        status: 'Normal',
        trend: 'widening',
        components: [
          { product: isZh ? '10ppm 柴油' : '10ppm Gasoil', yieldRatio: '100%', productPrice: 98.20, crudePrice: 79.60 },
        ],
      },
      {
        id: 'ara_gasoil_crack',
        name: isZh ? '西北歐 ARA 柴油期貨裂解價差' : 'ARA Rotterdam Gasoil Crack',
        region: isZh ? '西北歐 (ICE Low Sulphur Gasoil)' : 'Northwest Europe (ARA)',
        formula: '1 Brent -> 1 ARA Gasoil',
        value: 21.30,
        change: 0.70,
        unit: isZh ? '美元/桶' : 'USD/bbl',
        fiveYearAvg: 19.80,
        status: 'Normal',
        trend: 'widening',
        components: [
          { product: isZh ? '低硫柴油' : 'LS Gasoil', yieldRatio: '100%', productPrice: 102.15, crudePrice: 80.85 },
        ],
      },
      {
        id: 'med_naphtha_crack',
        name: isZh ? '地中海 / 亞洲石腦油 (Naphtha) 裂解價差' : 'Med / Asian Naphtha Petrochemical Crack',
        region: isZh ? '地中海 / 東亞石化' : 'Mediterranean / East Asia',
        formula: '1 Brent -> 1 Naphtha',
        value: -7.20,
        change: -0.35,
        unit: isZh ? '美元/桶' : 'USD/bbl',
        fiveYearAvg: -5.40,
        status: 'Depressed',
        trend: 'narrowing',
        components: [
          { product: isZh ? '輕石腦油' : 'Naphtha', yieldRatio: '100%', productPrice: 73.65, crudePrice: 80.85 },
        ],
      },
    ],
    refineries: [
      {
        id: 'us_padd3',
        region: isZh ? '美國墨西哥灣 (PADD 3)' : 'US Gulf Coast (PADD 3)',
        country: isZh ? '美國' : 'United States',
        flag: '🇺🇸',
        throughputMbpd: 9.40,
        nameplateCapacityMbpd: 9.98,
        utilizationPercent: 94.2,
        weeklyChangePercent: 1.4,
        plannedMaintenanceMbpd: 0.25,
        unplannedOutagesMbpd: 0.08,
        marginAvgDollar: 24.50,
        status: 'Peak Runs',
      },
      {
        id: 'us_padd2',
        region: isZh ? '美國中西部 (PADD 2)' : 'US Midwest (PADD 2)',
        country: isZh ? '美國' : 'United States',
        flag: '🇺🇸',
        throughputMbpd: 3.85,
        nameplateCapacityMbpd: 4.10,
        utilizationPercent: 93.9,
        weeklyChangePercent: 0.6,
        plannedMaintenanceMbpd: 0.12,
        unplannedOutagesMbpd: 0.02,
        marginAvgDollar: 21.80,
        status: 'Peak Runs',
      },
      {
        id: 'nw_europe_ara',
        region: isZh ? '西北歐 ARA 煉油聚落' : 'Northwest Europe (ARA Hub)',
        country: isZh ? '荷蘭 / 比利時 / 德國' : 'Netherlands / Belgium / Germany',
        flag: '🇪🇺',
        throughputMbpd: 11.80,
        nameplateCapacityMbpd: 14.13,
        utilizationPercent: 83.5,
        weeklyChangePercent: -0.8,
        plannedMaintenanceMbpd: 1.45,
        unplannedOutagesMbpd: 0.32,
        marginAvgDollar: 14.20,
        status: 'Turnaround Season',
      },
      {
        id: 'china_state_nocs',
        region: isZh ? '中國中石化 / 中石油國營煉廠' : 'China State NOCs (Sinopec/PetroChina)',
        country: isZh ? '中國' : 'China',
        flag: '🇨🇳',
        throughputMbpd: 11.20,
        nameplateCapacityMbpd: 13.50,
        utilizationPercent: 83.0,
        weeklyChangePercent: 1.8,
        plannedMaintenanceMbpd: 0.85,
        unplannedOutagesMbpd: 0.15,
        marginAvgDollar: 11.50,
        status: 'Normal',
      },
      {
        id: 'china_teapots',
        region: isZh ? '山東地煉獨立煉油聚落' : 'Shandong Independent Teapots',
        country: isZh ? '中國' : 'China',
        flag: '🇨🇳',
        throughputMbpd: 3.60,
        nameplateCapacityMbpd: 5.80,
        utilizationPercent: 62.1,
        weeklyChangePercent: -1.2,
        plannedMaintenanceMbpd: 0.60,
        unplannedOutagesMbpd: 0.40,
        marginAvgDollar: 7.90,
        status: 'Restricted',
      },
      {
        id: 'middle_east_megas',
        region: isZh ? '中東超級煉油廠 (Al-Zour, Jazan, Ruwais)' : 'Middle East Mega-Refineries',
        country: isZh ? '沙烏地 / 阿聯酋 / 科威特' : 'Saudi / UAE / Kuwait',
        flag: '🇸🇦',
        throughputMbpd: 9.20,
        nameplateCapacityMbpd: 9.95,
        utilizationPercent: 92.4,
        weeklyChangePercent: 0.9,
        plannedMaintenanceMbpd: 0.20,
        unplannedOutagesMbpd: 0.05,
        marginAvgDollar: 18.60,
        status: 'Peak Runs',
      },
      {
        id: 'india_jamnagar',
        region: isZh ? '印度信實工業賈姆納加爾 / 國營煉廠' : 'India Reliance Jamnagar & IOCL',
        country: isZh ? '印度' : 'India',
        flag: '🇮🇳',
        throughputMbpd: 5.10,
        nameplateCapacityMbpd: 5.20,
        utilizationPercent: 98.1,
        weeklyChangePercent: 0.2,
        plannedMaintenanceMbpd: 0.05,
        unplannedOutagesMbpd: 0.00,
        marginAvgDollar: 19.40,
        status: 'Peak Runs',
      },
    ],
  };
}

// ==========================================
// 4. Physical Tanker & Hormuz Radar Data
// ==========================================
export function getLocalizedTankerRadarData(lang: Language = 'zh-TW'): TankerRadarData {
  const isZh = lang === 'zh-TW';
  return {
    chokepointId: 'hormuz',
    chokepointName: isZh ? '荷姆茲海峽 (Strait of Hormuz)' : 'Strait of Hormuz',
    radarScanTime: isZh ? '即時衛星 AIS 14:02:10 UTC' : 'Live Satellite AIS 14:02:10 UTC',
    totalVesselsInZone: 38,
    activeLadenTankers: 27,
    transitThroughput24hMbpd: 20.8,
    globalSharePercent: 21.0,
    averageTransitSpeedKnots: 13.2,
    gpsInterferenceLevel: 'Moderate',
    warRiskInsuranceRate: 0.35, // 0.35%
    warRiskDeltaWoW: 18.4, // +18.4%
    crudeOnWaterTotalMbbl: 1180,
    capeReroutedVolumeMbpd: 4.2,
    floatingStorageMbbl: 64.2,
    vessels: [
      {
        id: 'vsl-1',
        name: 'TI EUROPE',
        imo: 'IMO 9235268',
        flag: '🇧🇪 比利時',
        vesselClass: 'VLCC',
        dwt: 319000,
        capacityMbbl: 2.0,
        cargoGrade: isZh ? '阿拉伯重油 (Arab Heavy)' : 'Arab Heavy Crude',
        originPort: isZh ? '沙烏地 拉斯坦努拉 (Ras Tanura)' : 'Ras Tanura (KSA)',
        originCountry: isZh ? '沙烏地阿拉伯' : 'Saudi Arabia',
        destinationPort: isZh ? '中國 寧波舟山港' : 'Ningbo Zhoushan (China)',
        destinationCountry: isZh ? '中國' : 'China',
        status: 'Laden Transit',
        speedKnots: 13.4,
        draftPercent: 96,
        eta: isZh ? '9月22日 08:00' : 'Sep 22, 08:00',
        radarX: 58,
        radarY: 42,
        headingDeg: 128,
      },
      {
        id: 'vsl-2',
        name: 'MARAN CENTAURUS',
        imo: 'IMO 9480370',
        flag: '🇬🇷 希臘',
        vesselClass: 'VLCC',
        dwt: 318000,
        capacityMbbl: 2.0,
        cargoGrade: isZh ? '巴士拉中質原油 (Basrah Medium)' : 'Basrah Medium Crude',
        originPort: isZh ? '伊拉克 巴士拉港 (Basrah)' : 'Basrah Oil Terminal (Iraq)',
        originCountry: isZh ? '伊拉克' : 'Iraq',
        destinationPort: isZh ? '印度 賈姆納加爾 (Jamnagar)' : 'Jamnagar (India)',
        destinationCountry: isZh ? '印度' : 'India',
        status: 'Laden Transit',
        speedKnots: 12.8,
        draftPercent: 98,
        eta: isZh ? '9月12日 14:30' : 'Sep 12, 14:30',
        radarX: 45,
        radarY: 52,
        headingDeg: 135,
      },
      {
        id: 'vsl-3',
        name: 'DHT FALCON',
        imo: 'IMO 9734185',
        flag: '🇭🇰 香港',
        vesselClass: 'VLCC',
        dwt: 298000,
        capacityMbbl: 1.9,
        cargoGrade: isZh ? '上扎庫姆原油 (Upper Zakum)' : 'Upper Zakum Crude',
        originPort: isZh ? '阿聯酋 達斯島 (Das Island)' : 'Das Island (UAE)',
        originCountry: isZh ? '阿拉伯聯合大公國' : 'UAE',
        destinationPort: isZh ? '新加坡 裕廊島 (Jurong Island)' : 'Jurong Island (Singapore)',
        destinationCountry: isZh ? '新加坡' : 'Singapore',
        status: 'Laden Transit',
        speedKnots: 14.1,
        draftPercent: 94,
        eta: isZh ? '9月18日 21:00' : 'Sep 18, 21:00',
        radarX: 68,
        radarY: 35,
        headingDeg: 122,
      },
      {
        id: 'vsl-4',
        name: 'COSGREAT LAKE',
        imo: 'IMO 9294525',
        flag: '🇨🇳 中國',
        vesselClass: 'VLCC',
        dwt: 308000,
        capacityMbbl: 2.0,
        cargoGrade: isZh ? '阿拉伯輕油 (Arab Light)' : 'Arab Light Crude',
        originPort: isZh ? '沙烏地 朱拜勒 (Jubail)' : 'Jubail (KSA)',
        originCountry: isZh ? '沙烏地阿拉伯' : 'Saudi Arabia',
        destinationPort: isZh ? '中國 青島港 (Qingdao)' : 'Qingdao (China)',
        destinationCountry: isZh ? '中國' : 'China',
        status: 'Laden Transit',
        speedKnots: 13.0,
        draftPercent: 95,
        eta: isZh ? '9月25日 04:00' : 'Sep 25, 04:00',
        radarX: 35,
        radarY: 62,
        headingDeg: 140,
      },
      {
        id: 'vsl-5',
        name: 'FRONT ALTAIR',
        imo: 'IMO 9745902',
        flag: '🇲🇭 馬紹爾',
        vesselClass: 'Suezmax',
        dwt: 157000,
        capacityMbbl: 1.0,
        cargoGrade: isZh ? '科威特出口原油 (KEC)' : 'Kuwait Export Crude',
        originPort: isZh ? '科威特 艾哈邁迪港 (Mina Al Ahmadi)' : 'Mina Al Ahmadi (Kuwait)',
        originCountry: isZh ? '科威特' : 'Kuwait',
        destinationPort: isZh ? '荷蘭 鹿特丹 (繞行好望角)' : 'Rotterdam (via Cape)',
        destinationCountry: isZh ? '荷蘭' : 'Netherlands',
        status: 'Laden Transit',
        speedKnots: 11.9,
        draftPercent: 92,
        eta: isZh ? '10月08日 12:00' : 'Oct 08, 12:00',
        radarX: 74,
        radarY: 28,
        headingDeg: 115,
      },
      {
        id: 'vsl-6',
        name: 'NORDIC HUNTER',
        imo: 'IMO 9823417',
        flag: '🇧🇲 百慕達',
        vesselClass: 'Aframax',
        dwt: 115000,
        capacityMbbl: 0.75,
        cargoGrade: isZh ? '杜拜法特赫原油 (Dubai Fateh)' : 'Dubai Fateh Crude',
        originPort: isZh ? '阿聯酋 法特赫碼頭 (Fateh Terminal)' : 'Fateh Terminal (UAE)',
        originCountry: isZh ? '阿拉伯聯合大公國' : 'UAE',
        destinationPort: isZh ? '泰國 羅勇府煉油碼頭' : 'Rayong (Thailand)',
        destinationCountry: isZh ? '泰國' : 'Thailand',
        status: 'Laden Transit',
        speedKnots: 12.4,
        draftPercent: 88,
        eta: isZh ? '9月19日 16:00' : 'Sep 19, 16:00',
        radarX: 52,
        radarY: 48,
        headingDeg: 130,
      },
      {
        id: 'vsl-7',
        name: 'GASLOG GEORGETOWN',
        imo: 'IMO 9875412',
        flag: '🇧🇲 百慕達',
        vesselClass: 'LNG',
        dwt: 98000,
        capacityMbbl: 1.1,
        cargoGrade: isZh ? '液化天然氣 (LNG)' : 'Liquefied Natural Gas',
        originPort: isZh ? '卡達 拉斯拉凡港 (Ras Laffan)' : 'Ras Laffan (Qatar)',
        originCountry: isZh ? '卡達' : 'Qatar',
        destinationPort: isZh ? '南韓 仁川港 (Incheon)' : 'Incheon (South Korea)',
        destinationCountry: isZh ? '南韓' : 'South Korea',
        status: 'Laden Transit',
        speedKnots: 16.5,
        draftPercent: 90,
        eta: isZh ? '9月17日 06:00' : 'Sep 17, 06:00',
        radarX: 28,
        radarY: 70,
        headingDeg: 145,
      },
      {
        id: 'vsl-8',
        name: 'EAGLE VARNA',
        imo: 'IMO 9642813',
        flag: '🇸🇬 新加坡',
        vesselClass: 'VLCC',
        dwt: 319000,
        capacityMbbl: 2.0,
        cargoGrade: isZh ? '空載壓艙 (Ballast)' : 'Inbound Ballast',
        originPort: isZh ? '新加坡' : 'Singapore',
        originCountry: isZh ? '新加坡' : 'Singapore',
        destinationPort: isZh ? '沙烏地 拉斯坦努拉裝載港' : 'Ras Tanura (KSA)',
        destinationCountry: isZh ? '沙烏地阿拉伯' : 'Saudi Arabia',
        status: 'Ballast Inbound',
        speedKnots: 15.2,
        draftPercent: 42,
        eta: isZh ? '9月06日 18:00' : 'Sep 06, 18:00',
        radarX: 82,
        radarY: 22,
        headingDeg: 305,
      },
    ],
  };
}

// ==========================================
// 5. Institutional Research Digest Data
// ==========================================
export function getLocalizedInstitutionalResearch(lang: Language = 'zh-TW'): StreetConsensusData {
  const isZh = lang === 'zh-TW';
  return {
    medianBrent12M: 84.50,
    medianWti12M: 80.20,
    highBrentTarget: 92.00,
    lowBrentTarget: 72.00,
    bullishPercent: 68,
    neutralPercent: 24,
    bearishPercent: 8,
    quotes: [
      {
        id: 'quote-gs',
        institution: 'Goldman Sachs',
        logoBadge: 'GS',
        analyst: 'Daan Struyven',
        role: isZh ? '高盛全球大宗商品研究主管' : 'Head of Global Commodities Research',
        publishDate: isZh ? '2026年9月4日' : 'Sep 4, 2026',
        title: isZh
          ? '重申布蘭特 75-90 美元區間底部支撐，OECD 庫存加速去化'
          : 'Reiterating $75-$90 Brent Range with Tight OECD Physical Storage Floors',
        brentTarget12M: 86.00,
        wtiTarget12M: 81.50,
        targetRange: '$75 - $90/bbl',
        stance: 'Bullish',
        keyQuote: isZh
          ? '「我們維持對 2026 下半年的看多偏向。OECD 商業庫存以每日 120 萬桶的速度持續去化，疊加 OPEC+ 嚴格的產能紀律與非 OPEC 深海增產放緩，全球原油市場將在秋冬用能旺季面臨實質供給赤字。」'
          : '"We maintain our bullish skew into late 2026. OECD commercial inventories are drawing at 1.2M bpd, combined with disciplined OPEC+ supply management and non-OPEC deepwater plateauing, creating an acute structural deficit ahead of winter."',
        bulletPoints: isZh
          ? [
              '預估 2026 年底前全球 OECD 商業庫存將較 5 年均值低 1.1 億桶。',
              '沙烏地阿拉伯將有效利用 80 美元以下定價窗口，限制現貨流出以保護財政平衡油價。',
              '建議機構投資人超配能源上游權益合約與近月原油逆價差（Backwardation）多頭部位。',
            ]
          : [
              'Forecasting OECD commercial inventories to finish 2026 at 110M bbls below 5-year average.',
              'Saudi Arabia will proactively manage spot allocations to defend fiscal breakeven levels near $80.',
              'Recommend overweighting prompt backwardation roll yields and energy exploration equities.',
            ],
        catalystFocus: isZh ? 'EIA 週報去庫存動能與 OPEC+ JMMC 減產延期協議' : 'EIA Weekly Drawdowns & OPEC+ JMMC Cut Extensions',
        supplyDemandThesis: isZh ? '2026 下半年全球每日供需缺口約 -0.95 百萬桶/日 (看多)' : '2H 2026 Global Deficit: -0.95M bpd (Bullish)',
      },
      {
        id: 'quote-ms',
        institution: 'Morgan Stanley',
        logoBadge: 'MS',
        analyst: 'Martijn Rats',
        role: isZh ? '摩根士丹利首席大宗商品策略師' : 'Chief Commodity Strategist',
        publishDate: isZh ? '2026年9月3日' : 'Sep 3, 2026',
        title: isZh
          ? '全球煉廠開工率逼近極限，成品油裂解利潤拉動即期原油搶購'
          : 'Refinery Run Rates Near Max Limits, Crack Margins Pulling Prompt Physical Barrels',
        brentTarget12M: 84.00,
        wtiTarget12M: 79.80,
        targetRange: '$78 - $88/bbl',
        stance: 'Bullish',
        keyQuote: isZh
          ? '「美國與亞洲煉油廠正以接近滿載的產能運轉，急於鎖定即期中酸與輕甜原油船貨。市場普遍低估了美國庫欣中心庫容降至 38% 底線所帶來的現貨流動性擠壓。」'
          : '"Refining complexes across the US and Asia are operating near maximum capacity, aggressively bidding for prompt sweet and sour crude cargoes. The market is underestimating the liquidity squeeze of Cushing falling toward 38% capacity."',
        bulletPoints: isZh
          ? [
              '3:2:1 裂解價差維持在 23 美元以上高位，為煉油廠提供強烈的原油採購誘因。',
              '航空煤油（Jet Fuel）與中間餾分油裂解利潤維持溢價，亞洲航空客運量增長強勁。',
              '布蘭特對杜拜期現互換（EFS）走擴，反映大西洋盆地輕質原油相對稀缺。',
            ]
          : [
              '3:2:1 crack spreads holding above $23/bbl provide irresistible refinery incentive to process crude.',
              'Jet fuel and middle distillate cracks remain in heavy premium on resilient Asian aviation traffic.',
              'Brent-Dubai EFS widening underscores physical scarcity of Atlantic basin sweet grades.',
            ],
        catalystFocus: isZh ? '美國煉廠開工率 (94.2%) 與庫欣交割中心去庫壓力' : 'US Refinery Runs (94.2%) & Cushing Storage Strain',
        supplyDemandThesis: isZh ? '實體煉廠需求拉動強勁，現貨溢價（Backwardation）持續擴張' : 'Refinery demand pull expanding prompt backwardation',
      },
      {
        id: 'quote-vitol',
        institution: 'Vitol',
        logoBadge: 'VITOL',
        analyst: 'Russell Hardy',
        role: isZh ? '維多集團 (Vitol Group) 執行長' : 'CEO, Vitol Group',
        publishDate: isZh ? '2026年9月2日' : 'Sep 2, 2026',
        title: isZh
          ? '亞洲實體提貨需求依然強勁，海運繞航使全球供應鏈極度緊繃'
          : 'Robust Physical Offtake in Asia Meets Stretched Supply Chains via Cape Rerouting',
        brentTarget12M: 85.00,
        wtiTarget12M: 80.50,
        targetRange: '$80 - $90/bbl',
        stance: 'Bullish',
        keyQuote: isZh
          ? '「從我們全球現貨交易終端的微觀數據來看，亞洲國營與民營買家的實體提貨意願絲毫未減。紅海危機導致大量油輪被迫繞行好望角，使全球在途原油運力耗損大幅增加，直接推高到港現貨成本。」'
          : '"Our physical trading desks see unwavering spot appetite from Asian buyers. Red Sea rerouting around the Cape of Good Hope ties up millions of barrel-days of tanker capacity, directly elevating delivered spot replacement costs."',
        bulletPoints: isZh
          ? [
              '每日 420 萬桶原油持續繞行非洲南端，平均單程航期增加 12-14 天。',
              'VLCC 與 Suezmax 油輪日租金維持在高檔，進口商被迫支付更高的到港風險溢價。',
              '非 OPEC 供給增量（如圭亞那與巴西）已被亞洲強勁的基載需求完全消化。',
            ]
          : [
              '4.2M bpd of crude continues to divert around Africa, adding 12-14 days to average voyages.',
              'Elevated VLCC day-rates force importers to absorb significant freight premia.',
              'Non-OPEC incremental barrels from Guyana and Brazil are fully absorbed by Asian baseload demand.',
            ],
        catalystFocus: isZh ? '戰略水道通航安全、VLCC 運價與海上在途庫存' : 'Maritime Chokepoint Security, VLCC Rates & Crude on Water',
        supplyDemandThesis: isZh ? '供應鏈拉長與運費上升，實體交易現貨維持高升水' : 'Supply chain friction maintaining physical cash premiums',
      },
      {
        id: 'quote-trafigura',
        institution: 'Trafigura',
        logoBadge: 'TRAF',
        analyst: 'Ben Luckock',
        role: isZh ? '托克集團 (Trafigura) 全球原油主管' : 'Global Head of Oil',
        publishDate: isZh ? '2026年9月1日' : 'Sep 1, 2026',
        title: isZh
          ? '市場距下一場實體原油供應擠壓僅一步之遙'
          : 'Market is One Supply Outage Away from an Explosive Physical Squeeze',
        brentTarget12M: 88.00,
        wtiTarget12M: 83.50,
        targetRange: '$82 - $92/bbl',
        stance: 'Bullish',
        keyQuote: isZh
          ? '「當前全球有效閒置產能高度集中在沙烏地與阿聯酋兩國手裡。任何突發性的地緣停產（無論是利比亞、奈及利亞或波斯灣咽喉中斷）都將瞬間點燃期貨市場的空頭回補狂潮。」'
          : '"Global effective spare capacity is hyper-concentrated in Saudi Arabia and the UAE. Any unexpected outage in Libya, Nigeria, or Middle East transit will instantly spark violent speculative short-covering in futures markets."',
        bulletPoints: isZh
          ? [
              '全球即時可用閒置產能僅約 320 萬桶/日，抵禦地緣政治衝擊的緩衝極度脆弱。',
              'CFTC 管理資金持倉的淨多單處於歷史中位數以下，具備龐大的空頭回補推升空間。',
              '原油期貨 25-Delta 選擇權偏斜率（Skew）已顯著轉向看漲買權（Call Over Put）。',
            ]
          : [
              'Global effective spare cushion is only ~3.2M bpd, offering thin defense against supply shocks.',
              'CFTC managed money positioning is below historic percentiles, leaving massive room for short covering.',
              '25-Delta options skew has decisively shifted toward Call premiums over Puts.',
            ],
        catalystFocus: isZh ? '閒置產能集中度、COT 投機部位偏斜與地緣斷航' : 'Spare Cushion Concentration, COT Positioning & Outage Risks',
        supplyDemandThesis: isZh ? '投機資金倉位回補疊加實體去庫存，推升尾部上漲風險' : 'Speculative re-leveraging + physical draws creates upside tail risk',
      },
      {
        id: 'quote-eia',
        institution: 'EIA STEO',
        logoBadge: 'EIA',
        analyst: 'US Energy Information Admin',
        role: isZh ? '美國能源部官方短期能源展望' : 'Official Short-Term Energy Outlook (STEO)',
        publishDate: isZh ? '2026年8月28日' : 'Aug 28, 2026',
        title: isZh
          ? '預估 2026 全球液體燃料消費達 1.042 億桶/日歷史新高'
          : 'Forecasting Global Liquids Consumption to Hit Record 104.2M bpd in 2026',
        brentTarget12M: 81.50,
        wtiTarget12M: 77.20,
        targetRange: '$76 - $85/bbl',
        stance: 'Neutral',
        keyQuote: isZh
          ? '「EIA 預計 2026 年全球石油與液體燃料需求將增加 120 萬桶/日，達到每日 1 億 420 萬桶的歷史新高。美國原油產量預計在 1,360 萬桶/日附近進入高原期，下半年全球庫存平均每日減少 40 萬桶。」'
          : '"EIA forecasts global liquid fuels consumption to grow by 1.2M bpd in 2026 to reach a record 104.2M bpd. US crude production is projected to plateau near 13.6M bpd, resulting in an average global stock draw of 0.4M bpd in 2H."',
        bulletPoints: isZh
          ? [
              '美國商業原油儲備處於過去五年區間下緣，SPR 戰略儲備持續進行招標回補。',
              '預估全球煉油產能利用率在第三季維持在 84% 以上，支撐原油進口吞吐量。',
              'OPEC+ 減產協議若維持至年底，將推動布蘭特價格在 80 美元上方獲得扎實支撐。',
            ]
          : [
              'US commercial crude inventories remain in lower half of 5-year range; SPR refill ongoing.',
              'Global refinery utilization forecast to remain above 84% in Q3, supporting import throughput.',
              'Maintaining OPEC+ output discipline through year-end will solidify Brent floors above $80/bbl.',
            ],
        catalystFocus: isZh ? '全球液體燃料供需平衡表與美國原油產量增長曲線' : 'Global Liquids Balances & US Shale Production Plateau',
        supplyDemandThesis: isZh ? '全球庫存溫和去化 (每日 -0.40 百萬桶)，政策底部明確' : 'Mild global stock draw (-0.40M bpd) with firm policy floor',
      },
    ],
  };
}

export const MOCK_TERM_STRUCTURE = getLocalizedTermStructure('zh-TW');
export const MOCK_ORDER_BOOK = getLocalizedOrderBook('CL1!', 'zh-TW');
export const MOCK_REFINING_DATA = getLocalizedRefiningData('zh-TW');
export const MOCK_TANKER_RADAR = getLocalizedTankerRadarData('zh-TW');
export const MOCK_INSTITUTIONAL_RESEARCH = getLocalizedInstitutionalResearch('zh-TW');

