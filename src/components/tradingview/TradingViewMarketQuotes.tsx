'use client';

import React, { useEffect, useRef } from 'react';

interface TradingViewMarketQuotesProps {
  colorTheme?: 'dark' | 'light';
  locale?: string;
}

export const TradingViewMarketQuotes: React.FC<TradingViewMarketQuotesProps> = ({
  colorTheme = 'dark',
  locale = 'zh_TW',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: '100%',
      height: 460,
      symbolsGroups: [
        {
          name: '原油現貨與期貨 (Crude Oil)',
          originalName: 'Crude Oil',
          symbols: [
            { name: 'PEPPERSTONE:SPOTCRUDE', displayName: 'Pepperstone 原油現貨' },
            { name: 'PEPPERSTONE:SPOTBRENT', displayName: 'Pepperstone 布蘭特現貨' },
            { name: 'NYMEX:CL1!', displayName: 'WTI 原油期貨主力' },
            { name: 'ICEEUR:B1!', displayName: '布蘭特期貨主力' },
            { name: 'TVC:USOIL', displayName: 'US OIL 現貨基準' },
            { name: 'TVC:UKOIL', displayName: 'UK OIL 現貨基準' },
          ],
        },
        {
          name: '能源副產物與天然氣 (Refined & Gas)',
          originalName: 'Energy Products',
          symbols: [
            { name: 'NYMEX:NG1!', displayName: '天然氣期貨' },
            { name: 'NYMEX:RB1!', displayName: 'RBOB 汽油期貨' },
            { name: 'NYMEX:HO1!', displayName: '取暖油期貨' },
          ],
        },
        {
          name: '總經與美元聯動 (Macro & DXY)',
          originalName: 'Macro Factors',
          symbols: [
            { name: 'INDEX:DXY', displayName: '美元指數 (DXY)' },
            { name: 'TVC:US10Y', displayName: '美國 10 年期國債殖利率' },
            { name: 'TVC:GOLD', displayName: '黃金現貨 (XAU/USD)' },
          ],
        },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      colorTheme: colorTheme,
      locale: locale === 'en' ? 'en' : 'zh_TW',
    });

    containerRef.current.appendChild(script);
  }, [colorTheme, locale]);

  return (
    <div className="h-full flex flex-col justify-between rounded-xl border border-slate-800/90 bg-slate-900/80 p-3.5 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2 px-1">
        <div className="flex items-center space-x-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider">
            TV LIVE MARKET QUOTES (交易所盤口)
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          CME / ICE • BID / ASK / TICKS
        </span>
      </div>
      <div className="tradingview-widget-container flex-1 min-h-[460px]" ref={containerRef}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
};
