import { useMemo } from 'react'

import type { Holding } from '@/schemas/holding'
import type { Investor } from '@/schemas/investor'
import { investors } from '@/data/investors'

export type OverlapResult = {
	score: number
	sharedHoldings: {
		ticker: string
		name: string
		userWeight: number
		investorWeight: number
	}[]
	uniqueToUser: Holding[]
	uniqueToInvestor: Holding[]
}

export type InvestorOverlap = {
	investor: Investor
	overlap: OverlapResult
}

export function calculateOverlap(
	userHoldings: Holding[],
	investorHoldings: Holding[],
): OverlapResult {
	const userMap = new Map(userHoldings.map((h) => [h.ticker, h]))
	const investorMap = new Map(investorHoldings.map((h) => [h.ticker, h]))

	const sharedHoldings: OverlapResult['sharedHoldings'] = []

	for (const [ticker, userH] of userMap) {
		const investorH = investorMap.get(ticker)
		if (investorH) {
			sharedHoldings.push({
				ticker,
				name: userH.name,
				userWeight: userH.weight,
				investorWeight: investorH.weight,
			})
		}
	}

	const score = sharedHoldings.reduce(
		(sum, h) => sum + Math.min(h.userWeight, h.investorWeight),
		0,
	)

	const uniqueToUser = userHoldings.filter((h) => !investorMap.has(h.ticker))
	const uniqueToInvestor = investorHoldings.filter(
		(h) => !userMap.has(h.ticker),
	)

	return { score, sharedHoldings, uniqueToUser, uniqueToInvestor }
}

export function useOverlap(
	userHoldings: Holding[],
	investorHoldings: Holding[],
): OverlapResult {
	return useMemo(
		() => calculateOverlap(userHoldings, investorHoldings),
		[userHoldings, investorHoldings],
	)
}

export function useAllOverlaps(userHoldings: Holding[]): InvestorOverlap[] {
	return useMemo(() => {
		return investors
			.map((investor) => ({
				investor,
				overlap: calculateOverlap(userHoldings, investor.holdings),
			}))
			.sort((a, b) => b.overlap.score - a.overlap.score)
	}, [userHoldings])
}
