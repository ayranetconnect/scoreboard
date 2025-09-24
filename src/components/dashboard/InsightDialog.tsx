'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { generateInsights } from '@/ai/flows/generate-automated-insights';
import type { Recruiter } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export function InsightDialog({ recruiter }: { recruiter: Recruiter }) {
  const [insight, setInsight] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleGetInsight = async () => {
    if (insight) return; // Don't re-fetch if already loaded

    setIsLoading(true);
    try {
      const result = await generateInsights({
        recruiterName: recruiter.name,
        mtdSelections: recruiter.mtdSelections,
        mtdOnboardings: recruiter.mtdOnboardings,
        conversionRate: recruiter.conversionRate,
        averageScore: recruiter.score,
        trendChange: recruiter.trendChange,
        performance: recruiter.performance,
      });
      setInsight(result.insight);
    } catch (error) {
      console.error('Failed to generate insight:', error);
      setInsight('An error occurred while generating the insight. Please try again later.');
      toast({
        variant: 'destructive',
        title: 'Insight Generation Failed',
        description: 'Could not connect to the AI service.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      handleGetInsight();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={`Get AI insight for ${recruiter.name}`}>
          <Sparkles className="h-4 w-4 text-primary/70 hover:text-primary transition-colors" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Insight for {recruiter.name}
          </DialogTitle>
          <DialogDescription>
            An automated performance analysis powered by generative AI.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <p className="leading-relaxed text-foreground">{insight}</p>
          )}
        </div>
        <DialogFooter>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
