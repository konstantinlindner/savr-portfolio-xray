export type PerformanceData = {
	ytd: number
	oneYear: number
	threeYear: number
	fiveYear: number
	tenYear: number | null
}

export type CumulativePoint = {
	month: string
	value: number
}

export const userPerformance: PerformanceData = {
	ytd: 8.4,
	oneYear: 32.1,
	threeYear: 18.7,
	fiveYear: 22.3,
	tenYear: 19.8,
}

export const investorPerformance: Record<string, PerformanceData> = {
	buffett: {
		ytd: 5.2,
		oneYear: 18.4,
		threeYear: 12.1,
		fiveYear: 14.3,
		tenYear: 13.8,
	},
	ackman: {
		ytd: 11.3,
		oneYear: 28.7,
		threeYear: 15.4,
		fiveYear: 17.2,
		tenYear: 15.1,
	},
	wood: {
		ytd: -3.8,
		oneYear: 12.5,
		threeYear: -5.2,
		fiveYear: 8.1,
		tenYear: null,
	},
	smith: {
		ytd: 6.1,
		oneYear: 15.8,
		threeYear: 11.2,
		fiveYear: 13.5,
		tenYear: 14.2,
	},
	lilu: {
		ytd: 7.8,
		oneYear: 21.3,
		threeYear: 14.6,
		fiveYear: 16.9,
		tenYear: 15.5,
	},
}

// Generate deterministic cumulative returns for a line chart
// Uses a simple seeded approach based on the annual return
export function generateCumulativeReturns(
	annualReturn: number,
	seed: number,
	months = 24,
): CumulativePoint[] {
	const points: CumulativePoint[] = []
	const monthlyReturn = annualReturn / 12
	let cumulative = 100

	const today = new Date()

	for (let i = months; i >= 0; i--) {
		const date = new Date(today)
		date.setMonth(date.getMonth() - i)
		const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

		// Deterministic variation using seed and month index
		const variation =
			Math.sin(seed * 13.7 + (months - i) * 2.3) * 1.5
			+ Math.cos(seed * 7.1 + (months - i) * 1.1) * 0.8
		const monthReturn = monthlyReturn + variation
		cumulative *= 1 + monthReturn / 100

		points.push({
			month: monthStr,
			value: Math.round(cumulative * 100) / 100,
		})
	}

	return points
}
