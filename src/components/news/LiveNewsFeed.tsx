'use client';

import React, { useState, useEffect } from 'react';
import {
  Radio,
  ExternalLink,
  Flame,
  Search,
  TrendingUp,
  TrendingDown,
  Clock,
  Share2,
  Bookmark,
  Check,
  Zap,
} from 'lucide-react';
import { getImpactColor, getSentimentColor } from '@/lib/formatters';
import { NewsArticle } from '@/types/oil';
import { useLanguage } from '@/context/LanguageContext';

interface LiveNewsFeedProps {
  initialNews: NewsArticle[];
}

export const LiveNewsFeed: React.FC<LiveNewsFeedProps> = ({ initialNews }) => {
  const { language, t } = useLanguage();
  const [newsList, setNewsList] = useState<NewsArticle[]>(initialNews);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSentiment, setSelectedSentiment] = useState<string>('ALL');
  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(true);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // When initialNews changes (e.g. language change), update newsList
  useEffect(() => {
    setNewsList(initialNews);
  }, [initialNews]);

  // Simulated live feed injection every 35 seconds when enabled
  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      const isZh = language === 'zh-TW';
      const simulatedHeadlines: Partial<NewsArticle>[] = isZh
        ? [
            {
              headline: 'Vortexa 油輪追蹤：波斯灣原油海上浮頂庫存單週去化 120 萬桶',
              summary: '亞洲煉油廠迅速卸載中東重酸原油船貨，推動全球海上浮頂庫存降至 4 個月低點。',
              source: '阿格斯傳媒',
              url: 'https://www.argusmedia.com/en/crude-oil',
              sentiment: 'Bullish',
              sentimentScore: 1.4,
              impactLevel: 'Medium',
              category: 'Shipping',
              tags: ['浮頂庫存', '油輪運輸', '亞洲需求'],
            },
            {
              headline: '高盛能源研究部：重申布蘭特原油 Q4 目標價 86 美元/桶，預估結構性赤字擴大',
              summary: '大宗商品研究團隊指出，OPEC+ 減產延期疊加 OECD 航空燃油需求強韌，為原油價格提供強烈看多支撐。',
              source: '彭博大宗商品',
              url: 'https://www.bloomberg.com/energy',
              sentiment: 'Bullish',
              sentimentScore: 1.9,
              impactLevel: 'High',
              category: 'Macro',
              tags: ['高盛預測', '油價目標', 'OPEC+'],
            },
          ]
        : [
            {
              headline: 'Vortexa Tanker Tracking: Persian Gulf Crude Floating Storage Drops by 1.2M bbls',
              summary: 'Global floating storage dropped to a 4-month low as Asian refiners rapidly took discharge of sour crude cargoes.',
              source: 'Argus Media',
              url: 'https://www.argusmedia.com/en/crude-oil',
              sentiment: 'Bullish',
              sentimentScore: 1.4,
              impactLevel: 'Medium',
              category: 'Shipping',
              tags: ['Floating Storage', 'Tankers', 'Asia Demand'],
            },
            {
              headline: 'Goldman Sachs Energy Research Raises Q4 Brent Target to $86/bbl on Structural Deficit',
              summary: 'Commodities research desk cites delayed OPEC+ unwind and resilient OECD aviation demand as key bullish catalysts.',
              source: 'Bloomberg Commodities',
              url: 'https://www.bloomberg.com/energy',
              sentiment: 'Bullish',
              sentimentScore: 1.9,
              impactLevel: 'High',
              category: 'Macro',
              tags: ['Goldman Sachs', 'Price Forecast', 'OPEC+'],
            },
          ];

      const randomPick = simulatedHeadlines[Math.floor(Math.random() * simulatedHeadlines.length)];
      const newArticle: NewsArticle = {
        id: `stream-${Date.now()}`,
        headline: randomPick.headline || 'Breaking Market Update',
        summary: randomPick.summary || '',
        source: randomPick.source || (isZh ? '路透社能源線' : 'Reuters Energy'),
        url: randomPick.url || 'https://www.reuters.com/business/energy/',
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
        timeAgo: isZh ? '剛剛' : 'Just now',
        sentiment: randomPick.sentiment || 'Bullish',
        sentimentScore: randomPick.sentimentScore || 1.5,
        impactLevel: randomPick.impactLevel || 'High',
        category: randomPick.category || 'Supply',
        isBreaking: true,
        readTime: isZh ? '2 分鐘閱讀' : '2 min read',
        tags: randomPick.tags || (isZh ? ['市場快報'] : ['Market Alert']),
      };

      setNewsList((prev) => [newArticle, ...prev.slice(0, 20)]);
    }, 35000);

    return () => clearInterval(interval);
  }, [isLiveStreaming, language]);

  // Filtered news
  const filteredNews = newsList.filter((item) => {
    if (
      searchQuery &&
      !item.headline.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.summary.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.tags.some((tTag) => tTag.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false;
    }

    if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;
    if (selectedSentiment !== 'ALL' && item.sentiment !== selectedSentiment) return false;

    return true;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getLocalizedCategoryName = (cat: string) => {
    switch (cat) {
      case 'Supply':
        return t.catSupply;
      case 'Demand':
        return t.catDemand;
      case 'Geopolitics':
        return t.catGeopolitics;
      case 'Shipping':
        return t.catShipping;
      case 'Macro':
        return t.catMacro;
      case 'Refining':
        return t.catRefining;
      default:
        return cat;
    }
  };

  const getLocalizedImplication = (impl: string) => {
    if (impl === 'Bullish') return t.implicationBullish;
    if (impl === 'Bearish') return t.implicationBearish;
    return t.implicationNeutral;
  };

  const getLocalizedImpact = (imp: string) => {
    if (imp === 'Critical') return t.criticalImpact;
    if (imp === 'High') return t.highImpact;
    if (imp === 'Medium') return t.mediumImpact;
    return t.lowImpact;
  };

  const breakingNews = newsList.find((n) => n.isBreaking);

  return (
    <div className="rounded-xl border border-slate-800/90 bg-slate-900/80 p-3.5 sm:p-4 shadow-xl">
      {/* Header Bar */}
      <div className="flex flex-col gap-3 border-b border-slate-800/80 pb-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
              <Radio className="h-4 w-4 animate-pulse" />
            </div>
            <h2 className="text-sm font-bold tracking-tight text-white sm:text-base">
              {t.newsWireTitle}
            </h2>
          </div>
          <p className="text-xs text-slate-400">{t.newsWireSubtitle}</p>
        </div>

        {/* Live Stream Controller */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsLiveStreaming(!isLiveStreaming)}
            className={`flex items-center space-x-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              isLiveStreaming
                ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                : 'border-slate-800 bg-slate-950/80 text-slate-400'
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isLiveStreaming ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'
              }`}
            />
            <span>{isLiveStreaming ? t.liveStreamActive : t.liveStreamPaused}</span>
          </button>
        </div>
      </div>

      {/* Breaking Flash Alert Banner */}
      {breakingNews && (
        <div className="mt-4 flex items-center justify-between rounded-xl border border-rose-500/50 bg-gradient-to-r from-rose-950/50 via-slate-900 to-slate-900 p-3 shadow-lg shadow-rose-950/30">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1 rounded-md bg-rose-500 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
              <Flame className="h-3 w-3" />
              <span>{t.flashIntel}</span>
            </span>
            <div className="text-xs font-semibold text-white truncate max-w-xl">
              {breakingNews.headline}
            </div>
          </div>

          <a
            href={breakingNews.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-xs font-semibold text-amber-400 hover:text-amber-300 whitespace-nowrap ml-2"
          >
            <span>{t.readWire}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      )}

      {/* Filters & Search */}
      <div className="mt-4 flex flex-col gap-3 border-b border-slate-800/60 pb-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Pills */}
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-0.5">
          {['ALL', 'Supply', 'Demand', 'Geopolitics', 'Shipping', 'Macro', 'Refining'].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat === 'ALL' ? t.allChannels : getLocalizedCategoryName(cat)}
              </button>
            )
          )}
        </div>

        {/* Search & Sentiment */}
        <div className="flex items-center space-x-2">
          {/* Sentiment Filter */}
          <select
            value={selectedSentiment}
            onChange={(e) => setSelectedSentiment(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-950/90 px-2.5 py-1 text-xs text-slate-300 focus:border-amber-500/80 focus:outline-none"
          >
            <option value="ALL">{t.allSentiments}</option>
            <option value="Bullish">{t.bullish} 🟢</option>
            <option value="Bearish">{t.bearish} 🔴</option>
            <option value="Neutral">{t.neutral} 🟡</option>
          </select>

          {/* Search */}
          <div className="relative min-w-[180px]">
            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchNewsPlaceholder}
              className="w-full rounded-lg border border-slate-800 bg-slate-950/90 py-1 pl-8 pr-3 text-xs text-white placeholder-slate-500 focus:border-amber-500/80 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* News Stream Feed List */}
      <div className="mt-4 space-y-3">
        {filteredNews.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            {t.noNewsFound}
          </div>
        ) : (
          filteredNews.map((article) => {
            const impactStyle = getImpactColor(article.impactLevel);
            const sentimentColors = getSentimentColor(article.sentiment);
            const isBookmarked = bookmarkedIds.includes(article.id);
            const isCopied = copiedId === article.id;

            return (
              <div
                key={article.id}
                className="group relative rounded-xl border border-slate-800/80 bg-slate-950/40 p-4 transition-all hover:border-slate-700 hover:bg-slate-900/60"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    {/* Meta bar: Category + Source + Timestamp + Impact */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="font-semibold text-amber-400">{article.source}</span>
                      <span className="text-slate-600">•</span>
                      <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[10px] font-mono text-slate-300">
                        {getLocalizedCategoryName(article.category)}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="flex items-center space-x-1 text-slate-400 font-mono">
                        <Clock className="h-3 w-3" />
                        <span>{article.timeAgo}</span>
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className={`rounded px-1.5 py-0.2 text-[10px] font-bold ${impactStyle.badge}`}>
                        {getLocalizedImpact(article.impactLevel)}
                      </span>
                    </div>

                    {/* Headline with External Link */}
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 hover:underline"
                      >
                        <span>{article.headline}</span>
                        <ExternalLink className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 text-amber-400 flex-shrink-0" />
                      </a>
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-slate-300 leading-relaxed">{article.summary}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-slate-900 px-2 py-0.5 text-[10px] text-slate-400 border border-slate-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Score & Actions */}
                  <div className="flex flex-col items-end space-y-2 flex-shrink-0">
                    {/* Sentiment Score Pill */}
                    <div
                      className={`flex items-center space-x-1 rounded-lg border px-2.5 py-1 text-xs font-bold ${sentimentColors.bg} ${sentimentColors.text} ${sentimentColors.border}`}
                    >
                      {article.sentiment === 'Bullish' ? (
                        <TrendingUp className="h-3.5 w-3.5" />
                      ) : article.sentiment === 'Bearish' ? (
                        <TrendingDown className="h-3.5 w-3.5" />
                      ) : (
                        <Zap className="h-3.5 w-3.5" />
                      )}
                      <span>
                        {article.sentimentScore > 0 ? '+' : ''}
                        {article.sentimentScore.toFixed(1)}
                      </span>
                      <span className="text-[10px] uppercase font-semibold">
                        {getLocalizedImplication(article.sentiment)}
                      </span>
                    </div>

                    {/* Tool buttons */}
                    <div className="flex items-center space-x-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() =>
                          handleCopy(
                            article.id,
                            `${article.headline} - Source: ${article.source} (${article.url})`
                          )
                        }
                        title={t.copiedCitation}
                        className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                      >
                        {isCopied ? (
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                        ) : (
                          <Share2 className="h-3.5 w-3.5" />
                        )}
                      </button>

                      <button
                        onClick={() => toggleBookmark(article.id)}
                        title="Bookmark"
                        className={`rounded p-1 transition-colors ${
                          isBookmarked
                            ? 'text-amber-400'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <Bookmark className="h-3.5 w-3.5" />
                      </button>

                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Link"
                        className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-amber-400 transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
