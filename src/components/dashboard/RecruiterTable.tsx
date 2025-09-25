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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, ArrowRight, LineChart } from 'lucide-react';
import type { Recruiter } from '@/lib/types';
import { cn } from '@/lib/utils';
import { InsightDialog } from './InsightDialog';

type FilterType = 'all' | 'top25' | 'rising' | 'top10';

const filterConfig: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'All Recruiters' },
  { id: 'top25', label: 'Top 25' },
  { id: 'rising', label: 'Rising Stars' },
  { id: 'top10', label: 'Top 10' },
];

function LoadingIndicator() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-primary">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-current border-t-transparent" />
      <p className="text-lg font-semibold">Loading market data...</p>
    </div>
  );
}

export function RecruiterTable({ initialRecruiters }: { initialRecruiters: Recruiter[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isLoading, setIsLoading] = useState(false);

  const filteredRecruiters = useMemo(() => {
    switch (activeFilter) {
      case 'top25':
        return initialRecruiters.slice(0, 25);
      case 'rising':
        return [...initialRecruiters].filter(r => r.trendChange > 10).sort((a,b) => b.trendChange - a.trendChange).slice(0, 30);
      case 'top10':
        return initialRecruiters.slice(0, 10);
      case 'all':
      default:
        return initialRecruiters;
    }
  }, [activeFilter, initialRecruiters]);

  const handleFilterChange = (filter: FilterType) => {
    setIsLoading(true);
    startTransition(() => {
      setActiveFilter(filter);
      setTimeout(() => setIsLoading(false), 300); // simulate network latency
    });
  };

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

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-6 w-6" /> Recruitment Performance Index
          </CardTitle>
          <div className="flex flex-wrap gap-2">
            {filterConfig.map(({ id, label }) => (
              <Button
                key={id}
                variant={activeFilter === id ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange(id)}
                className={cn(activeFilter === id && "bg-primary hover:bg-primary/90 text-primary-foreground")}
              >
                {label}
              </Button>
            ))}
          </div>
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
                  <TableHead>Recruiter</TableHead>
                  <TableHead className="text-right">MTD Onboardings</TableHead>
                  <TableHead className="text-right">Last Month</TableHead>
                  <TableHead className="text-right">Trend</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead className="text-center">Insight</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecruiters.map(recruiter => {
                  const Trend = getTrend(recruiter.trendChange);
                  return (
                    <TableRow key={recruiter.id}>
                      <TableCell className={cn('text-center text-lg font-bold', getRankClass(recruiter.rank))}>
                        #{recruiter.rank}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage asChild src={recruiter.avatar}>
                              <Image src={recruiter.avatar} alt={recruiter.name} width={40} height={40} data-ai-hint={recruiter.avatarHint} />
                            </AvatarImage>
                            <AvatarFallback>{recruiter.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold">{recruiter.name}</div>
                            <div className="text-xs text-muted-foreground">{recruiter.title}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{recruiter.mtdOnboardings}</TableCell>
                      <TableCell className="text-right">{recruiter.lastMonthScore}</TableCell>
                      <TableCell className={cn('text-right font-semibold', Trend.className)}>
                        <div className="flex items-center justify-end gap-1">
                          <Trend.Icon className="h-4 w-4" />
                          <span>{Math.abs(recruiter.trendChange).toFixed(1)}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{recruiter.performance}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <InsightDialog recruiter={recruiter} />
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
