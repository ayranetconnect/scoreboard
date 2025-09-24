export type Recruiter = {
  id: number;
  rank: number;
  name: string;
  title: string;
  avatar: string;
  avatarHint: string;
  score: number;
  mtdSelections: number;
  mtdOnboardings: number;
  lastMonthScore: number;
  trendChange: number;
  performance: string;
  conversionRate: number;
};

export type SummaryStat = {
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
};
