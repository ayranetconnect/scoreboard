import type { Recruiter } from '@/lib/types';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Ticker({ recruiters }: { recruiters: Recruiter[] }) {
  const tickerItems = recruiters.map(recruiter => {
    const isPositive = recruiter.trendChange >= 0;
    return {
      name: `${recruiter.name.split(' ')[0]} ${recruiter.name.split(' ')[1]?.[0] || ''}.`,
      score: recruiter.score,
      change: Math.abs(recruiter.trendChange).toFixed(1),
      isPositive: isPositive,
    };
  });

  return (
    <div className="w-full overflow-hidden bg-black py-3 border-y-2 border-primary">
      <div className="flex animate-ticker-scroll whitespace-nowrap">
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <div key={index} className="mx-6 flex items-center gap-2 text-sm">
            <span className="font-bold text-white">{item.name}</span>
            <span className="font-semibold text-muted-foreground">{item.score}</span>
            <span
              className={cn('flex items-center font-bold', item.isPositive ? 'text-primary' : 'text-red-500')}
            >
              {item.isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
              {item.change}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
