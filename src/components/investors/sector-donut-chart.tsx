import type { SectorAllocation } from '@/schemas/investor'
import { SectorPieChart } from '@/components/sector-pie-chart'

type SectorDonutChartProps = {
	sectors: SectorAllocation[]
}

export function SectorDonutChart({ sectors }: SectorDonutChartProps) {
	const data = sectors.map((s) => ({ name: s.sector, value: s.weight }))

	return <SectorPieChart data={data} className='h-[300px] w-full' />
}
