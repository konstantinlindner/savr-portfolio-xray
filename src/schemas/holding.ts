import { z } from 'zod'

export const holdingSchema = z.object({
	ticker: z.string().min(1),
	name: z.string().min(1),
	weight: z.number().min(0).max(100),
	sector: z.string().min(1),
})

export type Holding = z.infer<typeof holdingSchema>
