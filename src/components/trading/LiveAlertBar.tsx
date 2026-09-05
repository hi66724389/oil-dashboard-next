'use client';

import React, { useEffect, useState } from 'react';
import { AlertTriangle, Bell, ExternalLink, RefreshCw, Zap } from 'lucide-react';

interface MarketAlert {
  active: boolean;
  type: string;
  level: string;
  title: string;
  message: string;
  updatedAt: string;
}

interface LiveNewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  timestamp: string;
  sentiment: string;
  category: string;
}

export const LiveAlertBar: React.FC = () => {
  const [alert, setAlert] = useState<MarketAlert | null>(null);
  const [liveNews, setLiveNews] = useState<LiveNewsItem[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastSync, setLastSync] = useState<string>('');

  const fetchLiveIntel = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/oil-intel', { cache: 'no-store' });
      const data = await res.json();
      if (data?.marketAlert) {
        setAlert(data.marketAlert);
      }
      if (data?.news) {
        setLiveNews(data.news);
      }
      setLastSync(new Date().toLocaleTimeString('zh-TW', { hour12: false }));
    } catch (e) {
      console.error('Failed to sync live oil intel:', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLiveIntel();
    const interval = setInterval(fetchLiveIntel, 60000); // sync every 60s
    return () => clearInterval(interval);
  }, []);

  if (!alert) return null;

  return (
    <div className="rounded-xl border border-rose-500/30 bg-gradient-to-r from-rose-950/40 via-slate-900/60 to-amber-950/30 p-3.5 shadow-lg backdrop-blur-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Left Alert Badge and Text */}
        <div className="flex items-start sm:items-center space-x-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xs sm:text-sm text-rose-300 tracking-wide font-mono">
                {alert.title}
              </span>
              <span className="rounded bg-rose-500/20 px-1.5 py-0.2 text-[9px] font-bold text-rose-400 uppercase font-mono">
                CRITICAL VOLATILITY
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
              {alert.message}
            </p>
          </div>
        </div>

        {/* Right Live Refresh Control */}
        <div className="flex items-center space-x-3 shrink-0 self-end sm:self-center font-mono text-xs">
          <span className="text-[11px] text-slate-400">
            自動同步: <span className="text-emerald-400">{lastSync || '剛剛'}</span>
          </span>
          <button
            onClick={fetchLiveIntel}
            disabled={isRefreshing}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-all text-xs"
          >
            <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin text-amber-400' : 'text-slate-400'}`} />
            <span>{isRefreshing ? '更新中' : '即時刷新'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
