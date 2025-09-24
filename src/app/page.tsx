import { getRecruiterData } from '@/lib/data';
import { Header } from '@/components/dashboard/Header';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { RewardsBar } from '@/components/dashboard/RewardsBar';
import { Ticker } from '@/components/dashboard/Ticker';
import { RecruiterTable } from '@/components/dashboard/RecruiterTable';
import type { SummaryStat } from '@/lib/types';

export default async function DashboardPage() {
  const recruiters = await getRecruiterData();

  const totalRecruiters = recruiters.length;
  const mtdSelections = recruiters.reduce((sum, r) => sum + r.mtdSelections, 0);
  const mtdOnboardings = recruiters.reduce((sum, r) => sum + r.mtdOnboardings, 0);
  const avgScore = Math.round(recruiters.reduce((sum, r) => sum + r.score, 0) / totalRecruiters);
  const conversionRate = mtdSelections > 0 ? (mtdOnboardings / mtdSelections) * 100 : 0;

  const summaryStats: SummaryStat[] = [
    { label: 'Total Recruiters', value: totalRecruiters.toString(), change: '+5 this month', changeType: 'positive' },
    { label: 'MTD Selections', value: mtdSelections.toLocaleString(), change: '+12.5%', changeType: 'positive' },
    { label: 'MTD Onboardings', value: mtdOnboardings.toLocaleString(), change: '+15.2%', changeType: 'positive' },
    { label: 'Conversion Rate', value: `${conversionRate.toFixed(1)}%`, change: '+2.1%', changeType: 'positive' },
    { label: 'Avg Score', value: avgScore.toString(), change: '+8.7%', changeType: 'positive' },
  ];

  const topPerformers = recruiters.slice(0, 10);

  return (
    <div id="dashboard" className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:p-8">
          <SummaryCards stats={summaryStats} />
          <RewardsBar />
          <RecruiterTable initialRecruiters={recruiters} />
        </main>
      </div>
      <Ticker recruiters={topPerformers} />
    </div>
  );
}
