import { analysisResultSchema, type AnalysisResult } from '@/schemas/analysis'
import type { Holding } from '@/schemas/holding'
import type { Investor } from '@/schemas/investor'

type AnalyzePortfolioParams = {
	holdings: Holding[]
	investors: Investor[]
}

export async function analyzePortfolio({
	holdings,
	investors,
}: AnalyzePortfolioParams): Promise<AnalysisResult> {
	const apiKey = import.meta.env.VITE_GEMINI_API_KEY

	if (!apiKey) {
		throw new Error(
			'API-nyckel saknas. Lägg till VITE_GEMINI_API_KEY i din .env-fil.',
		)
	}

	const prompt = `Du är en erfaren finansanalytiker som specialiserar sig på portföljanalys.
Du ska analysera en användares aktieportfölj och jämföra den med kända superinvesterares portföljer.
Svara alltid på svenska. Ge konkreta, handlingsbara insikter.
Svara ENBART med giltig JSON som matchar det angivna schemat. Ingen annan text.

Analysera följande portfölj och jämför med superinvesterarna nedan.

MIN PORTFÖLJ:
${holdings.map((h) => `${h.ticker}: ${h.weight}% - ${h.name} (${h.sector})`).join('\n')}

SUPERINVESTERARE:
${investors
	.map(
		(inv) => `
${inv.name} (${inv.fund}) - ${inv.tagline}:
${inv.holdings.map((h) => `  ${h.ticker}: ${h.weight}% - ${h.name}`).join('\n')}`,
	)
	.join('\n')}

Svara med JSON i exakt detta format:
{
  "summary": "Sammanfattande text om portföljen på 2-3 meningar",
  "grade": "A+/A/A-/B+/B/B-/C+/C/C-/D/F",
  "strengths": ["styrka 1", "styrka 2", "styrka 3"],
  "weaknesses": ["svaghet 1", "svaghet 2"],
  "investorComparisons": [
    { "investorName": "Namn", "similarity": "Hög/Medel/Låg", "insight": "Förklaring..." }
  ],
  "suggestions": ["förslag 1", "förslag 2", "förslag 3"]
}`

	const response = await fetch(
		`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				contents: [{ parts: [{ text: prompt }] }],
				generationConfig: {
					responseMimeType: 'application/json',
				},
			}),
		},
	)

	if (!response.ok) {
		const errorBody = await response.text()
		throw new Error(`Gemini API-fel (${response.status}): ${errorBody}`)
	}

	const data = await response.json()
	const content = data.candidates[0].content.parts[0].text

	// Handle both raw JSON and markdown-wrapped JSON
	const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/)
	const jsonStr = jsonMatch ? jsonMatch[1] : content

	const parsed = JSON.parse(jsonStr)
	return analysisResultSchema.parse(parsed)
}
