import { Trophy, Gift } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function RewardsBar() {
  const rewards = [
    { rank: '1st Place', prize: 'Apple AirPods Pro', icon: Trophy },
    { rank: '2nd Place', prize: 'Smartphone Upgrade', icon: Gift },
    { rank: '3rd Place', prize: 'Wireless Headphones', icon: Gift },
  ];

  return (
    <Card className="border-2 border-primary/50 bg-card/50">
      <CardHeader className="items-center pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-bold text-primary">
          <Trophy className="h-6 w-6" />
          MONTHLY CHAMPIONS REWARDS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-foreground">
          {rewards.map((reward, index) => (
            <div key={reward.rank} className="flex items-center gap-2">
              <span className={index === 0 ? 'text-yellow-400' : index === 1 ? 'text-slate-300' : 'text-amber-600'}>
                {reward.rank === '1st Place' ? '🥇' : reward.rank === '2nd Place' ? '🥈' : '🥉'}
              </span>
              <span>{reward.rank}:</span>
              <span className="font-semibold">{reward.prize}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
