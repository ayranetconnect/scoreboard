'use client';

import { useState, useMemo, startTransition } from 'react';
import Image from 'next/image';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, ArrowRight, LineChart } from 'lucide-react';
import type { Personnel } from '@/lib/types';
import { cn } from '@/lib/utils';

type CategoryType = 'recruiters' | 'sourcers' | 'bsm';
type FilterType = 'all' | 'top10';

function LoadingIndicator() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-primary">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-current border-t-transparent" />
      <p className="text-lg font-semibold">Loading market data...</p>
    </div>
  );
}

export function RecruiterTable({ initialData }: { initialData: Record<string, Personnel[]> }) {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('recruiters');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryChange = (category: CategoryType) => {
    setIsLoading(true);
    startTransition(() => {
      setActiveCategory(category);
      setActiveFilter('all'); // Reset filter when category changes
      setTimeout(() => setIsLoading(false), 300); // simulate network latency
    });
  };

  const handleFilterChange = (filter: FilterType) => {
    setIsLoading(true);
    startTransition(() => {
      setActiveFilter(filter);
      setTimeout(() => setIsLoading(false), 300); // simulate network latency
    });
  };

  const currentData = useMemo(() => {
    return initialData[activeCategory] || [];
  }, [activeCategory, initialData]);

  const filteredData = useMemo(() => {
    switch (activeFilter) {
      case 'top10':
        return currentData.slice(0, 10);
      case 'all':
      default:
        return currentData;
    }
  }, [activeFilter, currentData]);

  const getTrend = (change: number) => {
    if (change > 5) return { Icon: ArrowUp, className: 'trend-up' };
    if (change < -5) return { Icon: ArrowDown, className: 'trend-down' };
    return { Icon: ArrowRight, className: 'trend-neutral' };
  };

  const getRankClass = (rank: number) => {
    if (rank === 1) return 'rank-1';
    if (rank === 2) return 'rank-2';
    if (rank === 3) return 'rank-3';
    if (rank <= 10) return 'rank-top10';
    return '';
  };

  const getPerformanceIcon = (performance: string) => {
    if (performance.includes("🏆")) return "🏆";
    if (performance.includes("⭐")) return "⭐";
    if (performance.includes("🚀")) return "🚀";
    if (performance.includes("📈")) return "📈";
    if (performance.includes("➡️")) return "➡️";
    if (performance.includes("📉")) return "📉";
    return null;
  }
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

  const categoryTitles: Record<CategoryType, string> = {
    recruiters: 'Recruiters',
    sourcers: 'Sourcers',
    bsm: 'BSM'
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className='flex gap-2'>
                {Object.keys(categoryTitles).map((cat) => (
                    <Button
                        key={cat}
                        variant={activeCategory === cat ? 'default' : 'outline'}
                        onClick={() => handleCategoryChange(cat as CategoryType)}
                    >
                        {categoryTitles[cat as CategoryType]}
                    </Button>
                ))}
            </div>
            <Tabs value={activeFilter} onValueChange={(value) => handleFilterChange(value as FilterType)}>
                <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="top10">Top 10</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px] text-center">Rank</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">MTD Onboardings</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">Trend</TableHead>
                  <TableHead>Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map(personnel => {
                  const Trend = getTrend(personnel.trendChange);
                  const performanceIcon = getPerformanceIcon(personnel.performance);
                  return (
                    <TableRow key={personnel.id}>
                      <TableCell className={cn('text-center text-lg font-bold', getRankClass(personnel.rank))}>
                        #{personnel.rank}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage asChild src={personnel.avatar}>
                              <Image src={personnel.avatar} alt={personnel.name} width={40} height={40} data-ai-hint={personnel.avatarHint} />
                            </AvatarImage>
                            <AvatarFallback>{personnel.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold">{personnel.name}</div>
                            <div className="text-xs text-muted-foreground">{personnel.title}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{personnel.mtdOnboardings}</TableCell>
                      <TableCell className="text-right font-mono text-primary">{formatCurrency(personnel.onboardingValue)}</TableCell>
                      <TableCell className={cn('text-right font-semibold', Trend.className)}>
                        <div className="flex items-center justify-end gap-1">
                          <Trend.Icon className="h-4 w-4" />
                          <span>{Math.abs(personnel.trendChange).toFixed(1)}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                           {performanceIcon && <span title={personnel.performance}>{performanceIcon}</span>}
                           <span className="font-medium hidden sm:inline">{personnel.performance.replace(/🏆|⭐|🚀|📈|➡️|📉\s*/, '')}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
