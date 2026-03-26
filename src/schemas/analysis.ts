import { z } from 'zod'

export const analysisResultSchema = z.object({
	strengths: z.array(z.string()),
	weaknesses: z.array(z.string()),
	investorComparisons: z.array(
		z.object({
			investorName: z.string(),
			similarity: z.string(),
			insight: z.string(),
		}),
	),
	suggestions: z.array(z.string()),
	grade: z.string(),
	summary: z.string(),
})

export type AnalysisResult = z.infer<typeof analysisResultSchema>
