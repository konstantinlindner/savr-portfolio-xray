import type { Holding } from '@/schemas/holding'

export const defaultHoldings: Holding[] = [
	{ ticker: 'NVDA', name: 'Nvidia', weight: 14, sector: 'Teknologi' },
	{ ticker: 'AAPL', name: 'Apple', weight: 13, sector: 'Teknologi' },
	{ ticker: 'MSFT', name: 'Microsoft', weight: 12, sector: 'Teknologi' },
	{ ticker: 'AMZN', name: 'Amazon', weight: 11, sector: 'Sällanköpsvaror' },
	{
		ticker: 'META',
		name: 'Meta Platforms',
		weight: 10,
		sector: 'Kommunikation',
	},
	{ ticker: 'GOOG', name: 'Alphabet', weight: 9, sector: 'Kommunikation' },
	{ ticker: 'KO', name: 'Coca-Cola', weight: 8, sector: 'Dagligvaror' },
	{ ticker: 'NFLX', name: 'Netflix', weight: 7, sector: 'Kommunikation' },
	{ ticker: 'UBER', name: 'Uber', weight: 6, sector: 'Teknologi' },
	{ ticker: 'TSLA', name: 'Tesla', weight: 5, sector: 'Sällanköpsvaror' },
	{ ticker: 'BAC', name: 'Bank of America', weight: 5, sector: 'Finans' },
]
