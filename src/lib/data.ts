import type { Recruiter } from './types';
import { PlaceHolderImages } from './placeholder-images';

const indianNames = [
    {first: "Priya", last: "Sharma", title: "Senior Talent Acquisition"},
    {first: "Rajesh", last: "Kumar", title: "Lead Technical Recruiter"}, 
    {first: "Amit", last: "Patel", title: "Principal Recruiter"},
    {first: "Sneha", last: "Singh", title: "Talent Acquisition Specialist"},
    {first: "Arjun", last: "Gupta", title: "Senior HR Business Partner"},
    {first: "Kavita", last: "Reddy", title: "Executive Search Consultant"},
    {first: "Vikram", last: "Joshi", title: "Technical Recruitment Lead"},
    {first: "Pooja", last: "Agarwal", title: "Campus Recruitment Head"},
    {first: "Rohit", last: "Verma", title: "Talent Acquisition Manager"},
    {first: "Nisha", last: "Mehta", title: "Senior Recruiter"},
    {first: "Sanjay", last: "Tiwari", title: "Talent Scout"},
    {first: "Deepika", last: "Rao", title: "Recruitment Consultant"},
    {first: "Manoj", last: "Khanna", title: "Senior TA Specialist"},
    {first: "Ritu", last: "Bansal", title: "Lead Recruiter"},
    {first: "Kiran", last: "Shah", title: "Talent Acquisition Lead"},
    {first: "Anita", last: "Jain", title: "Senior Recruitment Specialist"},
    {first: "Suresh", last: "Yadav", title: "Principal TA Consultant"},
    {first: "Meera", last: "Nair", title: "Executive Recruiter"},
    {first: "Ashish", last: "Pandey", title: "Senior Talent Partner"},
    {first: "Sunita", last: "Chopra", title: "Lead TA Specialist"},
];

const additionalFirstNames = ["Aarav", "Aadhya", "Vihaan", "Aanya", "Reyansh", "Pihu", "Ayaan", "Saanvi", 
                            "Krishna", "Ananya", "Ishaan", "Kavya", "Shaurya", "Myra", "Atharv", "Aadya",
                            "Vivaan", "Kiara", "Aditya", "Advika", "Aryan", "Navya", "Sai", "Pari",
                            "Ahaan", "Ira", "Krish", "Riya", "Darsh", "Tara", "Gauranga", "Jiya",
                            "Karthik", "Siya", "Laksh", "Zara", "Om", "Sara", "Rudra", "Avni",
                            "Shivansh", "Anvi", "Dev", "Priya", "Kabir", "Reet", "Yug", "Mishka",
                            "Agastya", "Shanaya", "Nihaar", "Kimaya", "Aarush", "Myra", "Veer", "Aaradhya"];

const lastNames = ["Sharma", "Kumar", "Patel", "Singh", "Gupta", "Reddy", "Joshi", "Agarwal", "Verma", "Mehta", 
                  "Tiwari", "Rao", "Khanna", "Bansal", "Shah", "Jain", "Yadav", "Nair", "Pandey", "Chopra",
                  "Bhat", "Sinha", "Malhotra", "Dixit", "Saxena", "Mishra", "Kapoor", "Tripathi", "Goyal", "Bhardwaj",
                  "Aggarwal", "Tyagi", "Sood", "Dua", "Bajaj", "Chandra", "Goel", "Khurana", "Arora", "Dhawan"];

const titles = ["Senior Recruiter", "Talent Acquisition Specialist", "Lead Recruiter", "Principal TA Consultant", 
               "Executive Search Lead", "Campus Recruitment Manager", "Technical Recruiter", "Senior TA Partner", 
               "Recruitment Consultant", "Talent Scout", "Senior HR Partner", "TA Team Lead", "Recruitment Manager",
               "Talent Acquisition Lead", "Senior Specialist", "Executive Recruiter", "Principal Recruiter"];


while (indianNames.length < 104) {
    const firstName = additionalFirstNames[Math.floor(Math.random() * additionalFirstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const title = titles[Math.floor(Math.random() * titles.length)];
    // Avoid duplicates
    if (!indianNames.some(n => n.first === firstName && n.last === lastName)) {
        indianNames.push({first: firstName, last: lastName, title: title});
    }
}

function calculatePerformance(rank: number, trendChange: number): string {
    if (rank < 5) return "🏆 Champion";
    if (rank < 15) return "⭐ Elite";
    if (trendChange > 10) return "🚀 Rising";
    if (trendChange > 0) return "📈 Growing";
    if (trendChange > -5) return "➡️ Stable";
    return "📉 Focus";
}

function generateRecruiterData(): Recruiter[] {
    const recruiters: Recruiter[] = [];
    
    for (let i = 0; i < 104; i++) {
        const name = indianNames[i];
        const baseScore = 650 - (i * 4) + Math.floor(Math.random() * 30) - 15;
        const mtdSelections = Math.floor(baseScore / 15) + Math.floor(Math.random() * 10) - 5;
        const mtdOnboardings = Math.floor(mtdSelections * (0.55 + Math.random() * 0.35));
        const lastMonthScore = baseScore + Math.floor(Math.random() * 60) - 30;
        const trendChange = lastMonthScore > 0 ? ((baseScore - lastMonthScore) / lastMonthScore * 100) : 0;
        const conversionRate = mtdSelections > 0 ? (mtdOnboardings / mtdSelections) * 100 : 0;
        
        const avatarData = PlaceHolderImages[i % PlaceHolderImages.length];

        recruiters.push({
            id: i,
            rank: i + 1,
            name: `${name.first} ${name.last}`,
            title: name.title,
            avatar: avatarData.imageUrl,
            avatarHint: avatarData.imageHint,
            score: Math.max(baseScore, 180),
            mtdSelections: Math.max(mtdSelections, 8),
            mtdOnboardings: Math.max(mtdOnboardings, 5),
            lastMonthScore: Math.max(lastMonthScore, 150),
            trendChange: trendChange,
            performance: calculatePerformance(i + 1, trendChange),
            conversionRate: conversionRate,
        });
    }
    
    return recruiters.sort((a, b) => b.score - a.score).map((r, index) => ({ ...r, rank: index + 1 }));
}

let cachedRecruiters: Recruiter[] | null = null;

export async function getRecruiterData(): Promise<Recruiter[]> {
  // In a real app, this would fetch from a database.
  // Here we generate and cache it to simulate a stable data source.
  if (!cachedRecruiters) {
    cachedRecruiters = generateRecruiterData();
  }
  return Promise.resolve(cachedRecruiters);
}
