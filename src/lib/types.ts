export type Personnel = {
  id: number;
  rank: number;
  name: string;
  title: string;
  avatar: string;
  avatarHint: string;
  score: number;
  mtdSelections: number;
  mtdOnboardings: number;
  onboardingValue: number;
  lastMonthScore: number;
  trendChange: number;
  performance: string;
  conversionRate: number;
};

// Re-exporting Personnel as Recruiter for backward compatibility with Ticker component
export type Recruiter = Personnel;


export type SummaryStat = {
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
};
