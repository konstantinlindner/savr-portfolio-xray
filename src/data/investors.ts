import type { Investor } from '@/schemas/investor'

export const investors: Investor[] = [
	{
		id: 'buffett',
		name: 'Warren Buffett',
		fund: 'Berkshire Hathaway',
		tagline: 'Värde · Långsiktig · Kvalitet',
		philosophy:
			'Warren Buffett fokuserar på att köpa fantastiska företag till rimliga priser och behålla dem för evigt. Hans strategi bygger på att hitta bolag med starka konkurrensfördelar ("moats"), pålitlig ledning och förutsägbara kassaflöden. Han undviker trender och håller sig till det han förstår.',
		holdings: [
			{ ticker: 'AAPL', name: 'Apple', weight: 49, sector: 'Teknologi' },
			{
				ticker: 'BAC',
				name: 'Bank of America',
				weight: 10,
				sector: 'Finans',
			},
			{
				ticker: 'AXP',
				name: 'American Express',
				weight: 8,
				sector: 'Finans',
			},
			{
				ticker: 'KO',
				name: 'Coca-Cola',
				weight: 7,
				sector: 'Dagligvaror',
			},
			{ ticker: 'CVX', name: 'Chevron', weight: 6, sector: 'Energi' },
			{
				ticker: 'OXY',
				name: 'Occidental Petroleum',
				weight: 5,
				sector: 'Energi',
			},
			{
				ticker: 'KHC',
				name: 'Kraft Heinz',
				weight: 4,
				sector: 'Dagligvaror',
			},
			{ ticker: 'MCO', name: "Moody's", weight: 4, sector: 'Finans' },
			{ ticker: 'DVA', name: 'DaVita', weight: 4, sector: 'Hälsovård' },
			{ ticker: 'HPQ', name: 'HP Inc.', weight: 3, sector: 'Teknologi' },
		],
		sectorAllocation: [
			{ sector: 'Teknologi', weight: 52 },
			{ sector: 'Finans', weight: 22 },
			{ sector: 'Dagligvaror', weight: 11 },
			{ sector: 'Energi', weight: 11 },
			{ sector: 'Hälsovård', weight: 4 },
		],
	},
	{
		id: 'ackman',
		name: 'Bill Ackman',
		fund: 'Pershing Square',
		tagline: 'Aktivist · Koncentrerad · Långsiktig',
		philosophy:
			'Bill Ackman driver en extremt koncentrerad portfölj med bara 6-10 positioner. Han investerar i högkvalitativa bolag med starka varumärken och tar aktivt en roll i att förbättra bolagen. Hans tålamod och övertygelse gör att han ofta behåller positioner genom volatila perioder.',
		holdings: [
			{
				ticker: 'HLT',
				name: 'Hilton',
				weight: 22,
				sector: 'Sällanköpsvaror',
			},
			{
				ticker: 'QSR',
				name: 'Restaurant Brands',
				weight: 17,
				sector: 'Sällanköpsvaror',
			},
			{
				ticker: 'CMG',
				name: 'Chipotle',
				weight: 15,
				sector: 'Sällanköpsvaror',
			},
			{
				ticker: 'GOOG',
				name: 'Alphabet',
				weight: 11,
				sector: 'Teknologi',
			},
			{
				ticker: 'CP',
				name: 'Canadian Pacific',
				weight: 9,
				sector: 'Industri',
			},
			{
				ticker: 'LOW',
				name: "Lowe's",
				weight: 8,
				sector: 'Sällanköpsvaror',
			},
			{
				ticker: 'NFLX',
				name: 'Netflix',
				weight: 7,
				sector: 'Kommunikation',
			},
			{ ticker: 'BN', name: 'Brookfield', weight: 5, sector: 'Finans' },
			{
				ticker: 'NKE',
				name: 'Nike',
				weight: 4,
				sector: 'Sällanköpsvaror',
			},
			{
				ticker: 'DPZ',
				name: "Domino's Pizza",
				weight: 2,
				sector: 'Sällanköpsvaror',
			},
		],
		sectorAllocation: [
			{ sector: 'Sällanköpsvaror', weight: 68 },
			{ sector: 'Teknologi', weight: 11 },
			{ sector: 'Industri', weight: 9 },
			{ sector: 'Kommunikation', weight: 7 },
			{ sector: 'Finans', weight: 5 },
		],
	},
	{
		id: 'wood',
		name: 'Cathie Wood',
		fund: 'ARK Invest',
		tagline: 'Innovation · Tillväxt · Disruption',
		philosophy:
			'Cathie Wood investerar uteslutande i disruptiva innovationer som hon tror kommer förändra hela branscher. Fokus ligger på AI, robotik, energilagring, blockchain och genomik. Hon är villig att acceptera hög volatilitet i utbyte mot exponentiell tillväxtpotential på 5+ års sikt.',
		holdings: [
			{
				ticker: 'TSLA',
				name: 'Tesla',
				weight: 12,
				sector: 'Sällanköpsvaror',
			},
			{
				ticker: 'COIN',
				name: 'Coinbase',
				weight: 9,
				sector: 'Finans',
			},
			{
				ticker: 'ROKU',
				name: 'Roku',
				weight: 8,
				sector: 'Kommunikation',
			},
			{ ticker: 'SQ', name: 'Block', weight: 7, sector: 'Finans' },
			{
				ticker: 'HOOD',
				name: 'Robinhood',
				weight: 6,
				sector: 'Finans',
			},
			{ ticker: 'PATH', name: 'UiPath', weight: 6, sector: 'Teknologi' },
			{
				ticker: 'DKNG',
				name: 'DraftKings',
				weight: 5,
				sector: 'Sällanköpsvaror',
			},
			{
				ticker: 'TDOC',
				name: 'Teladoc',
				weight: 5,
				sector: 'Hälsovård',
			},
			{ ticker: 'ZM', name: 'Zoom', weight: 4, sector: 'Teknologi' },
			{
				ticker: 'RBLX',
				name: 'Roblox',
				weight: 4,
				sector: 'Kommunikation',
			},
		],
		sectorAllocation: [
			{ sector: 'Finans', weight: 22 },
			{ sector: 'Sällanköpsvaror', weight: 17 },
			{ sector: 'Teknologi', weight: 10 },
			{ sector: 'Kommunikation', weight: 12 },
			{ sector: 'Hälsovård', weight: 5 },
			{ sector: 'Övrigt', weight: 34 },
		],
	},
	{
		id: 'smith',
		name: 'Terry Smith',
		fund: 'Fundsmith',
		tagline: 'Kvalitet · Kompoundering · Köp & Behåll',
		philosophy:
			'Terry Smith köper bara de allra bästa bolagen i världen — de som har hög avkastning på kapital, starka marknadspositioner och förutsägbar tillväxt. Hans filosofi är enkel: "Köp bra bolag, betala inte för mycket, gör ingenting." Han handlar extremt sällan och låter kompoundering göra jobbet.',
		holdings: [
			{
				ticker: 'META',
				name: 'Meta Platforms',
				weight: 8,
				sector: 'Kommunikation',
			},
			{
				ticker: 'MSFT',
				name: 'Microsoft',
				weight: 8,
				sector: 'Teknologi',
			},
			{
				ticker: 'NVO',
				name: 'Novo Nordisk',
				weight: 7,
				sector: 'Hälsovård',
			},
			{
				ticker: 'IDXX',
				name: 'IDEXX Labs',
				weight: 6,
				sector: 'Hälsovård',
			},
			{
				ticker: 'PG',
				name: 'Procter & Gamble',
				weight: 6,
				sector: 'Dagligvaror',
			},
			{ ticker: 'ADP', name: 'ADP', weight: 5, sector: 'Teknologi' },
			{ ticker: 'INTU', name: 'Intuit', weight: 5, sector: 'Teknologi' },
			{
				ticker: 'SDGR',
				name: 'Schrödinger',
				weight: 4,
				sector: 'Hälsovård',
			},
			{
				ticker: 'EL',
				name: 'Estée Lauder',
				weight: 4,
				sector: 'Dagligvaror',
			},
			{
				ticker: 'AAPL',
				name: 'Apple',
				weight: 4,
				sector: 'Teknologi',
			},
		],
		sectorAllocation: [
			{ sector: 'Teknologi', weight: 38 },
			{ sector: 'Hälsovård', weight: 24 },
			{ sector: 'Dagligvaror', weight: 16 },
			{ sector: 'Kommunikation', weight: 10 },
			{ sector: 'Övrigt', weight: 12 },
		],
	},
	{
		id: 'lilu',
		name: 'Li Lu',
		fund: 'Himalaya Capital',
		tagline: 'Djupt Värde · Asien · Tålamod',
		philosophy:
			'Li Lu, en protegé till Charlie Munger, kombinerar djup värdeinvestering med fokus på asiatiska marknader. Han söker bolag som handlas till stora rabatter mot sitt inneboende värde och har tålamod att vänta åratal på att marknaden ska upptäcka värdet. Hans portfölj är extremt koncentrerad.',
		holdings: [
			{
				ticker: 'BRK-B',
				name: 'Berkshire Hathaway',
				weight: 24,
				sector: 'Finans',
			},
			{
				ticker: 'BABA',
				name: 'Alibaba',
				weight: 15,
				sector: 'Sällanköpsvaror',
			},
			{
				ticker: 'MU',
				name: 'Micron Technology',
				weight: 13,
				sector: 'Teknologi',
			},
			{
				ticker: 'GOOG',
				name: 'Alphabet',
				weight: 11,
				sector: 'Kommunikation',
			},
			{
				ticker: 'BAC',
				name: 'Bank of America',
				weight: 9,
				sector: 'Finans',
			},
			{
				ticker: 'BIDU',
				name: 'Baidu',
				weight: 7,
				sector: 'Kommunikation',
			},
			{
				ticker: 'EWBC',
				name: 'East West Bancorp',
				weight: 6,
				sector: 'Finans',
			},
			{
				ticker: 'ATVI',
				name: 'Activision',
				weight: 5,
				sector: 'Kommunikation',
			},
			{
				ticker: 'BK',
				name: 'Bank of New York',
				weight: 5,
				sector: 'Finans',
			},
			{
				ticker: 'LBTYA',
				name: 'Liberty Global',
				weight: 5,
				sector: 'Kommunikation',
			},
		],
		sectorAllocation: [
			{ sector: 'Finans', weight: 44 },
			{ sector: 'Kommunikation', weight: 23 },
			{ sector: 'Sällanköpsvaror', weight: 15 },
			{ sector: 'Teknologi', weight: 13 },
			{ sector: 'Övrigt', weight: 5 },
		],
	},
]

export function getInvestorById(id: string): Investor | undefined {
	return investors.find((inv) => inv.id === id)
}
