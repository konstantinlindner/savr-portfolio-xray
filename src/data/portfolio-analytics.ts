import type { Holding } from '@/schemas/holding'
import { getStockDetail } from '@/data/stock-details'

export type RiskMetrics = {
	sharpeRatio: number
	standardDeviation: number
	cagr: number
	maxDrawdown: number
	sortinoRatio: number
	avgBeta: number
	trackingError: number
	informationRatio: number
}

export type CountryWeight = {
	name: string
	value: number
}

export type CurrencyWeight = {
	name: string
	value: number
}

export type MonthlyActivity = {
	month: string
	buys: number
	sells: number
}

// Country mapping for stocks
const stockCountry: Record<string, string> = {
	NVDA: 'USA',
	AAPL: 'USA',
	MSFT: 'USA',
	AMZN: 'USA',
	META: 'USA',
	GOOG: 'USA',
	NFLX: 'USA',
	MU: 'USA',
	UBER: 'USA',
	TSLA: 'USA',
	NVO: 'Danmark',
	BABA: 'Kina',
	BIDU: 'Kina',
	LBTYA: 'Storbritannien',
	CP: 'Kanada',
	BN: 'Kanada',
}

export function getCountryDistribution(holdings: Holding[]): CountryWeight[] {
	const countries: Record<string, number> = {}
	for (const h of holdings) {
		const country = stockCountry[h.ticker] ?? 'USA'
		countries[country] = (countries[country] ?? 0) + h.weight
	}
	return Object.entries(countries)
		.sort((a, b) => b[1] - a[1])
		.map(([name, value]) => ({ name, value }))
}

export function getCurrencyExposure(holdings: Holding[]): CurrencyWeight[] {
	const currencies: Record<string, number> = {}
	for (const h of holdings) {
		const detail = getStockDetail(h.ticker)
		const currency = detail?.currency ?? 'USD'
		currencies[currency] = (currencies[currency] ?? 0) + h.weight
	}
	return Object.entries(currencies)
		.sort((a, b) => b[1] - a[1])
		.map(([name, value]) => ({ name, value }))
}

export function getBuySellActivity(holdings: Holding[]): {
	monthly: MonthlyActivity[]
	totalBuys: number
	totalSells: number
	totalInvested: number
} {
	const monthMap: Record<string, { buys: number; sells: number }> = {}
	let totalBuys = 0
	let totalSells = 0
	let totalInvested = 0

	for (const h of holdings) {
		const detail = getStockDetail(h.ticker)
		if (!detail) continue
		for (const t of detail.transactions) {
			const month = t.date.slice(0, 7)
			if (!monthMap[month]) monthMap[month] = { buys: 0, sells: 0 }
			if (t.type === 'buy') {
				monthMap[month].buys += t.shares * t.price
				totalBuys++
				totalInvested += t.shares * t.price
			} else {
				monthMap[month].sells += t.shares * t.price
				totalSells++
			}
		}
	}

	const monthly = Object.entries(monthMap)
		.sort((a, b) => a[0].localeCompare(b[0]))
		.map(([month, data]) => ({
			month,
			buys: Math.round(data.buys),
			sells: Math.round(data.sells),
		}))

	return {
		monthly,
		totalBuys,
		totalSells,
		totalInvested: Math.round(totalInvested),
	}
}

export function getRiskMetrics(holdings: Holding[]): RiskMetrics {
	// Compute deterministic but plausible risk metrics from portfolio composition
	let weightedBeta = 0
	let totalWeight = 0

	for (const h of holdings) {
		const detail = getStockDetail(h.ticker)
		if (!detail) continue
		weightedBeta += detail.metrics.beta * h.weight
		totalWeight += h.weight
	}

	const avgBeta = totalWeight > 0 ? weightedBeta / totalWeight : 1

	return {
		sharpeRatio: Math.round((1.8 / avgBeta) * 100) / 100,
		standardDeviation: Math.round(avgBeta * 14.5 * 100) / 100,
		cagr: Math.round((22 + (avgBeta - 1) * 8) * 100) / 100,
		maxDrawdown: Math.round((-8 - avgBeta * 6) * 100) / 100,
		sortinoRatio: Math.round((2.2 / avgBeta) * 100) / 100,
		avgBeta: Math.round(avgBeta * 100) / 100,
		trackingError: Math.round((avgBeta * 5.2 + 2.1) * 100) / 100,
		informationRatio: Math.round((0.85 / avgBeta) * 100) / 100,
	}
}
