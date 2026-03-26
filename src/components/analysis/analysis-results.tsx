import { AlertCircle, CheckCircle, Lightbulb, Users } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { AnalysisResult } from '@/schemas/analysis'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type AnalysisResultsProps = {
	result: AnalysisResult
}

function getGradeColor(grade: string) {
	if (grade.startsWith('A'))
		return 'bg-green-500/10 text-green-500 border-green-500/30'
	if (grade.startsWith('B'))
		return 'bg-blue-500/10 text-blue-500 border-blue-500/30'
	if (grade.startsWith('C'))
		return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
	return 'bg-red-500/10 text-red-500 border-red-500/30'
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
	return (
		<div className='space-y-6'>
			<div className='flex flex-col items-center gap-4 sm:flex-row'>
				<div
					className={cn(
						'flex h-20 w-20 items-center justify-center rounded-full border-2 text-3xl font-bold',
						getGradeColor(result.grade),
					)}
				>
					{result.grade}
				</div>
				<div className='flex-1 text-center sm:text-left'>
					<h3 className='text-lg font-semibold'>Portföljbetyg</h3>
					<p className='text-muted-foreground'>{result.summary}</p>
				</div>
			</div>

			<div className='grid gap-6 md:grid-cols-2'>
				<Card>
					<CardHeader>
						<CardTitle className='flex items-center gap-2 text-green-500'>
							<CheckCircle className='h-5 w-5' />
							Styrkor
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className='space-y-2'>
							{result.strengths.map((s, i) => (
								<li
									key={i}
									className='flex items-start gap-2 text-sm'
								>
									<CheckCircle className='mt-0.5 h-4 w-4 shrink-0 text-green-500' />
									{s}
								</li>
							))}
						</ul>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className='flex items-center gap-2 text-red-500'>
							<AlertCircle className='h-5 w-5' />
							Svagheter
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className='space-y-2'>
							{result.weaknesses.map((w, i) => (
								<li
									key={i}
									className='flex items-start gap-2 text-sm'
								>
									<AlertCircle className='mt-0.5 h-4 w-4 shrink-0 text-red-500' />
									{w}
								</li>
							))}
						</ul>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className='flex items-center gap-2'>
						<Users className='h-5 w-5' />
						Jämförelse med superinvesterare
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						{result.investorComparisons.map((comp, i) => (
							<div
								key={i}
								className='space-y-2 rounded-lg bg-muted/50 p-4'
							>
								<div className='flex items-center justify-between'>
									<h4 className='font-semibold'>
										{comp.investorName}
									</h4>
									<Badge variant='outline'>
										{comp.similarity}
									</Badge>
								</div>
								<p className='text-sm text-muted-foreground'>
									{comp.insight}
								</p>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className='flex items-center gap-2'>
						<Lightbulb className='h-5 w-5 text-yellow-500' />
						Förslag
					</CardTitle>
				</CardHeader>
				<CardContent>
					<ol className='space-y-3'>
						{result.suggestions.map((s, i) => (
							<li
								key={i}
								className='flex items-start gap-3 text-sm'
							>
								<span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary'>
									{i + 1}
								</span>
								{s}
							</li>
						))}
					</ol>
				</CardContent>
			</Card>
		</div>
	)
}
