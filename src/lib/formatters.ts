export function formatCurrency(
  value: number,
  decimals: number = 2,
  currency: string = '$'
): string {
  if (value === undefined || value === null || isNaN(value)) return '$0.00';
  return `${currency}${value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

export function formatPercent(
  value: number,
  includeSign: boolean = true,
  decimals: number = 2
): string {
  if (value === undefined || value === null || isNaN(value)) return '0.00%';
  const sign = includeSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
}

export function formatChange(
  value: number,
  decimals: number = 2,
  prefix: string = '$'
): string {
  if (value === undefined || value === null || isNaN(value)) return '+0.00';
  const sign = value > 0 ? '+' : value < 0 ? '-' : '';
  const abs = Math.abs(value).toFixed(decimals);
  return `${sign}${prefix}${abs}`;
}

export function formatNumber(
  value: number,
  decimals: number = 1,
  unit: string = ''
): string {
  if (value === undefined || value === null || isNaN(value)) return '0';
  return `${value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${unit ? ' ' + unit : ''}`;
}

export function getSentimentColor(
  rating: string
): {
  bg: string;
  text: string;
  border: string;
  glow: string;
  dot: string;
} {
  const normalized = rating.toLowerCase();
  if (normalized.includes('extreme bullish') || normalized.includes('強烈看多')) {
    return {
      bg: 'bg-emerald-500/10 dark:bg-emerald-950/40',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.25)]',
      dot: 'bg-emerald-400',
    };
  } else if (normalized.includes('bullish') || normalized.includes('看多')) {
    return {
      bg: 'bg-teal-500/10 dark:bg-teal-950/40',
      text: 'text-teal-400',
      border: 'border-teal-500/30',
      glow: 'shadow-[0_0_12px_rgba(20,184,166,0.2)]',
      dot: 'bg-teal-400',
    };
  } else if (normalized.includes('extreme bearish') || normalized.includes('強烈看空')) {
    return {
      bg: 'bg-rose-500/10 dark:bg-rose-950/40',
      text: 'text-rose-400',
      border: 'border-rose-500/30',
      glow: 'shadow-[0_0_15px_rgba(244,63,94,0.25)]',
      dot: 'bg-rose-400',
    };
  } else if (normalized.includes('bearish') || normalized.includes('看空')) {
    return {
      bg: 'bg-red-500/10 dark:bg-red-950/40',
      text: 'text-red-400',
      border: 'border-red-500/30',
      glow: 'shadow-[0_0_12px_rgba(239,68,68,0.2)]',
      dot: 'bg-red-400',
    };
  } else {
    return {
      bg: 'bg-amber-500/10 dark:bg-amber-950/40',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      glow: 'shadow-[0_0_12px_rgba(245,158,11,0.2)]',
      dot: 'bg-amber-400',
    };
  }
}

export function getImpactColor(impact: string): { bg: string; text: string; badge: string } {
  const normalized = impact.toLowerCase();
  if (normalized.includes('critical') || normalized.includes('關鍵') || normalized.includes('重大')) {
    return {
      bg: 'bg-red-950/60 border-red-500/50 text-red-300',
      text: 'text-red-400',
      badge: 'bg-red-500/20 text-red-400 border border-red-500/40',
    };
  } else if (normalized.includes('high') || normalized.includes('高')) {
    return {
      bg: 'bg-amber-950/60 border-amber-500/50 text-amber-300',
      text: 'text-amber-400',
      badge: 'bg-amber-500/20 text-amber-400 border border-amber-500/40',
    };
  } else if (normalized.includes('medium') || normalized.includes('中')) {
    return {
      bg: 'bg-blue-950/50 border-blue-500/40 text-blue-300',
      text: 'text-blue-400',
      badge: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    };
  } else {
    return {
      bg: 'bg-slate-900/60 border-slate-700/50 text-slate-300',
      text: 'text-slate-400',
      badge: 'bg-slate-800 text-slate-400 border border-slate-700',
    };
  }
}
