import type { Personnel } from './types';
import { PlaceHolderImages } from './placeholder-images';

const firstNames = ["Priya", "Rajesh", "Amit", "Sneha", "Arjun", "Kavita", "Vikram", "Pooja", "Rohit", "Nisha", "Sanjay", "Deepika", "Manoj", "Ritu", "Kiran", "Anita", "Suresh", "Meera", "Ashish", "Sunita", "Aarav", "Aadhya", "Vihaan", "Aanya", "Reyansh", "Pihu", "Ayaan", "Saanvi", "Krishna", "Ananya", "Ishaan", "Kavya", "Shaurya", "Myra", "Atharv", "Aadya", "Vivaan", "Kiara", "Aditya", "Advika", "Aryan", "Navya", "Sai", "Pari", "Ahaan", "Ira", "Krish", "Riya", "Darsh", "Tara", "Gauranga", "Jiya", "Karthik", "Siya", "Laksh", "Zara", "Om", "Sara", "Rudra", "Avni", "Shivansh", "Anvi", "Dev", "Priya", "Kabir", "Reet", "Yug", "Mishka", "Agastya", "Shanaya", "Nihaar", "Kimaya", "Aarush", "Myra", "Veer", "Aaradhya"];
const lastNames = ["Sharma", "Kumar", "Patel", "Singh", "Gupta", "Reddy", "Joshi", "Agarwal", "Verma", "Mehta", "Tiwari", "Rao", "Khanna", "Bansal", "Shah", "Jain", "Yadav", "Nair", "Pandey", "Chopra", "Bhat", "Sinha", "Malhotra", "Dixit", "Saxena", "Mishra", "Kapoor", "Tripathi", "Goyal", "Bhardwaj", "Aggarwal", "Tyagi", "Sood", "Dua", "Bajaj", "Chandra", "Goel", "Khurana", "Arora", "Dhawan"];

const titles = {
    recruiters: ["Senior Recruiter", "Talent Acquisition Specialist", "Lead Recruiter", "Principal TA Consultant", "Technical Recruiter", "Recruitment Consultant", "Talent Scout"],
    sourcers: ["Talent Sourcer", "Sourcing Specialist", "Research Associate", "Lead Sourcer", "Sourcing Team Lead"],
    bsm: ["Business Sales Manager", "Client Partner", "Account Executive", "Sales Director", "Client Relationship Manager"]
};

function generateUniqueNames(count: number, existingNames: Set<string>): {first: string, last: string}[] {
    const names = [];
    while (names.length < count) {
        const first = firstNames[Math.floor(Math.random() * firstNames.length)];
        const last = lastNames[Math.floor(Math.random() * lastNames.length)];
        const fullName = `${first} ${last}`;
        if (!existingNames.has(fullName)) {
            names.push({ first, last });
            existingNames.add(fullName);
        }
    }
    return names;
}

function calculatePerformance(rank: number, trendChange: number): string {
    if (rank <= 5) return "🏆 Champion";
    if (rank <= 15) return "⭐ Elite";
    if (trendChange > 10) return "🚀 Rising";
    if (trendChange > 0) return "📈 Growing";
    if (trendChange > -5) return "➡️ Stable";
    return "📉 Focus";
}

function generatePersonnelData(count: number, category: 'recruiters' | 'sourcers' | 'bsm', usedNames: Set<string>): Personnel[] {
    const personnel: Personnel[] = [];
    const BASE_ONBOARDING_VALUE = 5000;
    
    const uniqueNames = generateUniqueNames(count, usedNames);

    for (let i = 0; i < count; i++) {
        const name = uniqueNames[i];
        const categoryTitles = titles[category];
        const title = categoryTitles[Math.floor(Math.random() * categoryTitles.length)];

        const baseScore = 650 - (i * 4) + Math.floor(Math.random() * 30) - 15;
        const mtdSelections = Math.floor(baseScore / 15) + Math.floor(Math.random() * 10) - 5;
        const mtdOnboardings = Math.floor(mtdSelections * (0.55 + Math.random() * 0.35));
        const lastMonthScore = baseScore + Math.floor(Math.random() * 60) - 30;
        const trendChange = lastMonthScore > 0 ? ((baseScore - lastMonthScore) / lastMonthScore * 100) : 0;
        const conversionRate = mtdSelections > 0 ? (mtdOnboardings / mtdSelections) * 100 : 0;
        const onboardingValue = mtdOnboardings * (BASE_ONBOARDING_VALUE + (Math.random() - 0.5) * 1000);
        
        const avatarData = PlaceHolderImages[(i + count) % PlaceHolderImages.length];

        personnel.push({
            id: i,
            rank: i + 1,
            name: `${name.first} ${name.last}`,
            title: title,
            avatar: avatarData.imageUrl,
            avatarHint: avatarData.imageHint,
            score: Math.max(baseScore, 180),
            mtdSelections: Math.max(mtdSelections, 8),
            mtdOnboardings: Math.max(mtdOnboardings, 5),
            onboardingValue: onboardingValue,
            lastMonthScore: Math.max(lastMonthScore, 150),
            trendChange: trendChange,
            performance: calculatePerformance(i + 1, trendChange),
            conversionRate: conversionRate,
        });
    }
    
    return personnel.sort((a, b) => b.score - a.score).map((r, index) => ({ ...r, rank: index + 1, id: index }));
}

let cachedRecruiters: Personnel[] | null = null;
let cachedSourcers: Personnel[] | null = null;
let cachedBsms: Personnel[] | null = null;
const usedNames = new Set<string>();

export async function getRecruiterData(): Promise<Personnel[]> {
  if (!cachedRecruiters) {
    cachedRecruiters = generatePersonnelData(104, 'recruiters', usedNames);
  }
  return Promise.resolve(cachedRecruiters);
}

export async function getSourcerData(): Promise<Personnel[]> {
  if (!cachedSourcers) {
    cachedSourcers = generatePersonnelData(30, 'sourcers', usedNames);
  }
  return Promise.resolve(cachedSourcers);
}

export async function getBsmData(): Promise<Personnel[]> {
  if (!cachedBsms) {
    cachedBsms = generatePersonnelData(20, 'bsm', usedNames);
  }
  return Promise.resolve(cachedBsms);
}
