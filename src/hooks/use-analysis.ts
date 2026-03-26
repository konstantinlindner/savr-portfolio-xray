import { useMutation } from '@tanstack/react-query'

import { analyzePortfolio } from '@/lib/gemini'
import type { Holding } from '@/schemas/holding'
import { investors } from '@/data/investors'

export function useAnalysis(holdings: Holding[]) {
	return useMutation({
		mutationFn: () => analyzePortfolio({ holdings, investors }),
	})
}
