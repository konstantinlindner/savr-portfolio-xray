import { defaultHoldings } from '@/data/user-portfolio'

export function usePortfolio() {
	return {
		holdings: defaultHoldings,
	}
}
