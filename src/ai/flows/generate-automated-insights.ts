'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating automated insights about recruiter performance.
 *
 * The flow takes recruiter performance data as input and uses generative AI to highlight key achievements
 * and areas for improvement. This allows users to quickly understand individual contributions and make
 * data-driven decisions.
 *
 * - generateInsights - A function that generates insights based on recruiter performance data.
 * - GenerateInsightsInput - The input type for the generateInsights function.
 * - GenerateInsightsOutput - The return type for the generateInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInsightsInputSchema = z.object({
  recruiterName: z.string().describe('The name of the recruiter.'),
  mtdSelections: z.number().describe('The number of month-to-date selections.'),
  mtdOnboardings: z.number().describe('The number of month-to-date onboardings.'),
  conversionRate: z.number().describe('The conversion rate for the recruiter.'),
  averageScore: z.number().describe('The average score of the recruiter.'),
  trendChange: z.number().describe('The trend change in the recruiter score.'),
  performance: z.string().describe('The overall performance category of the recruiter.'),
});
export type GenerateInsightsInput = z.infer<typeof GenerateInsightsInputSchema>;

const GenerateInsightsOutputSchema = z.object({
  insight: z.string().describe('The generated insight about the recruiter performance.'),
});
export type GenerateInsightsOutput = z.infer<typeof GenerateInsightsOutputSchema>;

export async function generateInsights(input: GenerateInsightsInput): Promise<GenerateInsightsOutput> {
  return generateInsightsFlow(input);
}

const insightPrompt = ai.definePrompt({
  name: 'insightPrompt',
  input: {schema: GenerateInsightsInputSchema},
  output: {schema: GenerateInsightsOutputSchema},
  prompt: `You are an AI assistant providing insights on recruiter performance.

  Based on the following data, generate a concise and informative insight about the recruiter's performance. Focus on key achievements, areas for improvement, and overall contribution.

  Recruiter Name: {{{recruiterName}}}
  MTD Selections: {{{mtdSelections}}}
  MTD Onboardings: {{{mtdOnboardings}}}
  Conversion Rate: {{{conversionRate}}}%
  Average Score: {{{averageScore}}}
  Trend Change: {{{trendChange}}}%
  Performance: {{{performance}}}

  Insight:`,
});

const generateInsightsFlow = ai.defineFlow(
  {
    name: 'generateInsightsFlow',
    inputSchema: GenerateInsightsInputSchema,
    outputSchema: GenerateInsightsOutputSchema,
  },
  async input => {
    const {output} = await insightPrompt(input);
    return output!;
  }
);
