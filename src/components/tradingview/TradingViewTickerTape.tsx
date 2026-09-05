'use client';

import React, { useEffect, useRef } from 'react';

interface TradingViewTickerTapeProps {
  colorTheme?: 'dark' | 'light';
  locale?: string;
}

export const TradingViewTickerTape: React.FC<TradingViewTickerTapeProps> = ({
  colorTheme = 'dark',
  locale = 'zh_TW',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: 'PEPPERSTONE:SPOTCRUDE', title: 'Pepperstone 原油現貨' },
        { proName: 'PEPPERSTONE:SPOTBRENT', title: 'Pepperstone 布蘭特現貨' },
        { proName: 'NYMEX:CL1!', title: 'WTI 期貨主力 (NYMEX)' },
        { proName: 'ICEEUR:B1!', title: '布蘭特期貨主力 (ICE)' },
        { proName: 'NYMEX:NG1!', title: '天然氣 (NYMEX)' },
        { proName: 'NYMEX:RB1!', title: '汽油 RBOB' },
        { proName: 'NYMEX:HO1!', title: '取暖油 Heating Oil' },
        { proName: 'INDEX:DXY', title: '美元指數 DXY' },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: 'adaptive',
      colorTheme: colorTheme,
      locale: locale === 'en' ? 'en' : 'zh_TW',
    });

    containerRef.current.appendChild(script);
  }, [colorTheme, locale]);

  return (
    <div className="w-full overflow-hidden border-b border-slate-800/80 bg-slate-950/80 py-0.5">
      <div className="tradingview-widget-container" ref={containerRef}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
};
