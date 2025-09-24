import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { SummaryStat } from '@/lib/types';
import { cn } from '@/lib/utils';

export function SummaryCards({ stats }: { stats: SummaryStat[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-5">
      {stats.map(stat => (
        <Card key={stat.label} className="border-l-4 border-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium uppercase text-muted-foreground">
              {stat.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p
              className={cn(
                'text-xs',
                stat.changeType === 'positive' && 'text-primary',
                stat.changeType === 'negative' && 'text-destructive'
              )}
            >
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
