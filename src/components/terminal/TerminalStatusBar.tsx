'use client';

import React, { useState, useEffect } from 'react';
import { Radio, ShieldCheck, Cpu, HardDrive, Clock, Activity, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const TerminalStatusBar: React.FC = () => {
  const { language, t } = useLanguage();
  const [utcTime, setUtcTime] = useState<string>('');
  const [pingMs, setPingMs] = useState<number>(12);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const pingTimer = setInterval(() => {
      setPingMs(Math.floor(10 + Math.random() * 5));
    }, 4000);
    return () => clearInterval(pingTimer);
  }, []);

  return (
    <div className="w-full border-t border-slate-800 bg-slate-950 px-4 py-1.5 font-mono text-[10px] text-slate-400 select-none">
      <div className="mx-auto flex max-w-[1780px] flex-wrap items-center justify-between gap-2">
        {/* Left Telemetry Badges */}
        <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar">
          {/* Connection Status */}
          <div className="flex items-center space-x-1.5 font-bold text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span>{t.connected} ({pingMs}ms)</span>
          </div>

          <span className="text-slate-700">|</span>

          {/* NYMEX Direct Feed */}
          <div className="flex items-center space-x-1 text-slate-300">
            <Zap className="h-3 w-3 text-amber-400" />
            <span>{t.feedNymex}</span>
          </div>

          <span className="text-slate-700">|</span>

          {/* ICE Commodity Feed */}
          <div className="flex items-center space-x-1 text-slate-300">
            <Activity className="h-3 w-3 text-cyan-400" />
            <span>{t.feedIce}</span>
          </div>

          <span className="text-slate-700">|</span>

          {/* AIS Sat Radar */}
          <div className="flex items-center space-x-1 text-slate-300">
            <Radio className="h-3 w-3 text-emerald-400 animate-pulse" />
            <span>{t.feedAis}</span>
          </div>
        </div>

        {/* Right System Diagnostics */}
        <div className="flex items-center space-x-3 text-slate-500">
          <span className="hidden sm:inline text-slate-400">{t.bufferHealth}</span>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <span className="hidden md:inline text-slate-400">{t.memoryUsage}</span>
          <span className="text-slate-700 hidden md:inline">|</span>
          <span className="font-bold text-amber-400">{t.versionTag}</span>
          <span className="text-slate-700">|</span>
          <span className="text-slate-300 font-bold">{utcTime || 'UTC 14:02:15'}</span>
        </div>
      </div>
    </div>
  );
};
