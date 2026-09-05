'use client';

import React from 'react';
import { Flame } from 'lucide-react';
import { OpecMemberData } from '@/types/oil';
import { useLanguage } from '@/context/LanguageContext';

interface OpecComplianceTableProps {
  members: OpecMemberData[];
}

export const OpecComplianceTable: React.FC<OpecComplianceTableProps> = ({ members }) => {
  const { t } = useLanguage();
  const totalSpare = members.reduce((acc, m) => acc + m.spareCapacityMbpd, 0);
  const totalVoluntary = members.reduce((acc, m) => acc + m.voluntaryCutMbpd, 0);

  const getLocalizedStatus = (status: string) => {
    switch (status) {
      case 'Compliant':
        return t.statusCompliant;
      case 'Overproducing':
        return t.statusOverproducing;
      case 'Underproducing':
        return t.statusUnderproducing;
      default:
        return status;
    }
  };

  return (
    <div className="h-full flex flex-col justify-between rounded-xl border border-slate-800/90 bg-slate-900/80 p-3.5 shadow-xl">
      <div className="flex flex-col gap-2 border-b border-slate-800/80 pb-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
            <Flame className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold tracking-tight text-white font-mono uppercase">
              {t.opecTitle}
            </h2>
            <p className="text-[10px] text-slate-400">{t.opecSubtitle}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="rounded-lg bg-slate-950/80 px-2.5 py-1 border border-slate-800">
            <span className="text-slate-400">{t.totalSpareCushion}</span>
            <span className="font-mono font-bold text-amber-400">{totalSpare.toFixed(2)}M bpd</span>
          </div>
          <div className="rounded-lg bg-slate-950/80 px-2.5 py-1 border border-slate-800">
            <span className="text-slate-400">{t.activeVoluntaryCuts}</span>
            <span className="font-mono font-bold text-emerald-400">{totalVoluntary.toFixed(2)}M bpd</span>
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-semibold text-slate-400">
            <tr>
              <th className="py-2.5 pl-3 pr-2">{t.colMember}</th>
              <th className="px-2 py-2.5 text-right">{t.colQuota}</th>
              <th className="px-2 py-2.5 text-right">{t.colActualOutput}</th>
              <th className="px-2 py-2.5 text-right">{t.colVoluntaryCut}</th>
              <th className="px-2 py-2.5 text-right">{t.colCompliance}</th>
              <th className="px-2 py-2.5 text-right">{t.colSpareCapacity}</th>
              <th className="py-2.5 pl-2 pr-3 text-center">{t.colStatus}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {members.map((m) => {
              const isOver = m.status === 'Overproducing';
              const isCompliant = m.status === 'Compliant';

              return (
                <tr key={m.country} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 pl-3 pr-2 font-sans font-medium text-white flex items-center space-x-2">
                    <span className="text-base">{m.flag}</span>
                    <span>{m.country}</span>
                  </td>
                  <td className="px-2 py-2.5 text-right text-slate-300">{m.quotaMbpd.toFixed(2)}M bpd</td>
                  <td className="px-2 py-2.5 text-right font-bold text-white">{m.actualMbpd.toFixed(2)}M bpd</td>
                  <td className="px-2 py-2.5 text-right text-amber-300">
                    {m.voluntaryCutMbpd > 0 ? `-${m.voluntaryCutMbpd.toFixed(2)}M bpd` : '—'}
                  </td>
                  <td className="px-2 py-2.5 text-right">
                    <span
                      className={`font-semibold ${
                        m.compliancePercent >= 100 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {m.compliancePercent.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-2 py-2.5 text-right text-cyan-300">{m.spareCapacityMbpd.toFixed(2)}M bpd</td>
                  <td className="py-2.5 pl-2 pr-3 text-center font-sans">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                        isCompliant
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : isOver
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {getLocalizedStatus(m.status)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
