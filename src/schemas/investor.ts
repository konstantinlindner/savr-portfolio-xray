import { z } from 'zod'

import { holdingSchema } from './holding'

export const sectorAllocationSchema = z.object({
	sector: z.string(),
	weight: z.number(),
})

export const investorSchema = z.object({
	id: z.string(),
	name: z.string(),
	fund: z.string(),
	tagline: z.string(),
	philosophy: z.string(),
	holdings: z.array(holdingSchema),
	sectorAllocation: z.array(sectorAllocationSchema),
})

export type SectorAllocation = z.infer<typeof sectorAllocationSchema>
export type Investor = z.infer<typeof investorSchema>
