'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Radio } from 'lucide-react';

interface TradingViewRealtimeChartProps {
  selectedSymbol?: string;
}

export const TradingViewRealtimeChart: React.FC<TradingViewRealtimeChartProps> = ({
  selectedSymbol = 'PEPPERSTONE:SPOTCRUDE',
}) => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [overrideSymbol, setOverrideSymbol] = useState<string | null>(null);

  // Map symbols to TradingView instruments
  const getTvSymbol = (sym: string) => {
    switch (sym) {
      case 'CL1!':
      case 'WTI':
      case 'SPOTCRUDE':
        return 'PEPPERSTONE:SPOTCRUDE';
      case 'CLUSDT':
      case 'BINANCE:CLUSDT':
      case 'BINANCE:CLUSDT.P':
      case 'OKX:CL':
      case 'OKX:CL-USDT':
        return 'BINANCE:CLUSDT.P';
      case 'CO1!':
      case 'BRENT':
        return 'PEPPERSTONE:SPOTBRENT';
      case 'USOIL':
        return 'PEPPERSTONE:SPOTCRUDE';
      case 'UKOIL':
        return 'PEPPERSTONE:SPOTBRENT';
      case 'NG1!':
        return 'NYMEX:NG1!';
      case 'RB1!':
        return 'NYMEX:RB1!';
      case 'HO1!':
        return 'NYMEX:HO1!';
      default:
        return sym.includes(':') ? sym : `PEPPERSTONE:${sym}`;
    }
  };

  const activeSymbol = overrideSymbol || getTvSymbol(selectedSymbol);
  const setActiveSymbol = (sym: string) => setOverrideSymbol(sym);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const widgetDiv = document.createElement('div');
    widgetDiv.id = 'tradingview_realtime_widget';
    widgetDiv.style.width = '100%';
    widgetDiv.style.height = '100%';
    containerRef.current.appendChild(widgetDiv);

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      // @ts-expect-error TradingView script is loaded dynamically
      if (typeof window !== 'undefined' && window.TradingView) {
        // @ts-expect-error TradingView script is loaded dynamically
        new window.TradingView.widget({
          autosize: true,
          symbol: activeSymbol,
          interval: '15',
          timezone: 'Asia/Taipei',
          theme: 'dark',
          style: '1',
          locale: language === 'en' ? 'en' : 'zh_TW',
          toolbar_bg: '#090d16',
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          container_id: 'tradingview_realtime_widget',
          studies: [
            'MASimple@tv-basicstudies',
            'Volume@tv-basicstudies',
          ],
        });
      }
    };

    containerRef.current.appendChild(script);
  }, [activeSymbol, language]);

  return (
    <div className="h-full flex flex-col justify-between rounded-xl border border-slate-800/90 bg-slate-900/80 p-3.5 shadow-xl">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800/80 pb-2.5 gap-2">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 font-bold text-amber-400 font-mono">
            <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
            <span className="text-xs sm:text-sm tracking-wider uppercase">TRADINGVIEW LIVE EXCHANGE FEED</span>
          </div>
          <span className="hidden sm:inline-flex rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20 font-mono">
            100% 正式實時行情 (CME / ICE)
          </span>
        </div>

        {/* Quick symbol switches */}
        <div className="flex items-center space-x-1 text-xs font-mono">
          {[
            { label: 'Spot Crude', sym: 'PEPPERSTONE:SPOTCRUDE' },
            { label: 'Binance CL', sym: 'BINANCE:CLUSDT.P' },
            { label: 'WTI CL1!', sym: 'NYMEX:CL1!' },
            { label: 'Brent B1!', sym: 'ICEEUR:B1!' },
            { label: 'RBOB RB1!', sym: 'NYMEX:RB1!' },
            { label: 'NatGas NG1!', sym: 'NYMEX:NG1!' },
          ].map((item) => (
            <button
              key={item.sym}
              onClick={() => setActiveSymbol(item.sym)}
              className={`rounded px-2 py-0.5 text-[10px] sm:text-[11px] font-bold transition-all ${
                activeSymbol === item.sym
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Widget Container - Flexible height for items-stretch balance */}
      <div className="mt-2.5 flex-1 min-h-[500px] w-full overflow-hidden rounded-lg border border-slate-800/90 bg-slate-950">
        <div ref={containerRef} className="h-full w-full" />
      </div>

      <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
        <span>* TradingView 官方即時通道撮合 • 支援 1分 / 15分 / 日線 / 指標切換</span>
        <span>NYMEX / ICE OFFICIAL TICKS</span>
      </div>
    </div>
  );
};
