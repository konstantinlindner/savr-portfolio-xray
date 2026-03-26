import { createFileRoute } from '@tanstack/react-router'
import { AlertCircle, Sparkles } from 'lucide-react'

import { usePortfolio } from '@/hooks/use-portfolio'
import { useAnalysis } from '@/hooks/use-analysis'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AnalysisLoading } from '@/components/analysis/analysis-loading'
import { AnalysisResults } from '@/components/analysis/analysis-results'
import { BuySellActivity } from '@/components/analysis/buy-sell-activity'
import { CountryDistribution } from '@/components/analysis/country-distribution'
import { CurrencyExposure } from '@/components/analysis/currency-exposure'
import { PortfolioRiskMetrics } from '@/components/analysis/portfolio-risk-metrics'
import { SectorBreakdown } from '@/components/analysis/sector-breakdown'

export const Route = createFileRoute('/analysis')({
	component: AnalysisPage,
})

export function AnalysisPage() {
	const { holdings } = usePortfolio()
	const { mutate, data, isPending, isError, error } = useAnalysis(holdings)

	const apiKeyMissing = !import.meta.env.VITE_GEMINI_API_KEY

	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>
					Portföljanalys
				</h1>
				<p className='mt-2 text-muted-foreground'>
					Detaljerad analys av din portfölj — nyckeltal, fördelning
					och AI-insikter
				</p>
			</div>

			<div className='grid gap-6 *:min-w-0 md:grid-cols-2'>
				<PortfolioRiskMetrics holdings={holdings} />
				<SectorBreakdown holdings={holdings} />
				<CountryDistribution holdings={holdings} />
				<CurrencyExposure holdings={holdings} />
			</div>

			<BuySellActivity holdings={holdings} />

			<Separator />

			<div>
				<h2 className='text-2xl font-bold tracking-tight'>AI-Analys</h2>
				<p className='mt-2 text-muted-foreground'>
					Låt AI analysera din portfölj och jämföra med
					superinvesterarna
				</p>
			</div>

			{apiKeyMissing && (
				<Card className='border-yellow-500/30 bg-yellow-500/5'>
					<CardContent className='flex items-center gap-3 py-4'>
						<AlertCircle className='h-5 w-5 text-yellow-500' />
						<div>
							<p className='text-sm font-medium'>
								API-nyckel saknas
							</p>
							<p className='text-sm text-muted-foreground'>
								Lägg till{' '}
								<code className='text-xs'>
									VITE_GEMINI_API_KEY
								</code>{' '}
								i en <code className='text-xs'>.env</code>-fil i
								projektets rot för att aktivera AI-analys.
							</p>
						</div>
					</CardContent>
				</Card>
			)}

			{!data && !isPending && (
				<div className='flex flex-col items-center justify-center py-12'>
					<Sparkles className='mb-4 h-12 w-12 text-primary' />
					<h2 className='text-xl font-semibold'>
						Redo att analysera din portfölj?
					</h2>
					<p className='mt-2 max-w-md text-center text-sm text-muted-foreground'>
						AI:n kommer att analysera dina {holdings.length} innehav
						och jämföra med 5 kända superinvesterare. Du får
						styrkor, svagheter, förslag och ett betyg.
					</p>
					<Button
						className='mt-6'
						size='lg'
						onClick={() => mutate()}
						disabled={apiKeyMissing}
					>
						<Sparkles className='mr-2 h-4 w-4' />
						Analysera min portfölj
					</Button>
				</div>
			)}

			{isPending && <AnalysisLoading />}

			{isError && (
				<Card className='border-red-500/30 bg-red-500/5'>
					<CardContent className='flex items-center gap-3 py-4'>
						<AlertCircle className='h-5 w-5 text-red-500' />
						<div>
							<p className='text-sm font-medium'>
								Analysen misslyckades
							</p>
							<p className='text-sm text-muted-foreground'>
								{error instanceof Error ?
									error.message
								:	'Ett okänt fel inträffade'}
							</p>
						</div>
					</CardContent>
				</Card>
			)}

			{data && (
				<div className='space-y-6'>
					<div className='flex items-center justify-between'>
						<h2 className='text-xl font-semibold'>
							Analysresultat
						</h2>
						<Button variant='outline' onClick={() => mutate()}>
							<Sparkles className='mr-2 h-4 w-4' />
							Kör ny analys
						</Button>
					</div>
					<AnalysisResults result={data} />
				</div>
			)}
		</div>
	)
}
