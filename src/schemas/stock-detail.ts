import { z } from 'zod'

export const pricePointSchema = z.object({
	date: z.string(),
	price: z.number(),
})

export const keyMetricsSchema = z.object({
	peRatio: z.number(),
	marketCap: z.string(),
	high52w: z.number(),
	low52w: z.number(),
	dividendYield: z.number(),
	beta: z.number(),
	eps: z.number(),
})

export const transactionSchema = z.object({
	date: z.string(),
	type: z.enum(['buy', 'sell']),
	shares: z.number(),
	price: z.number(),
})

export const newsArticleSchema = z.object({
	title: z.string(),
	source: z.string(),
	date: z.string(),
})

export const stockDetailSchema = z.object({
	ticker: z.string(),
	name: z.string(),
	description: z.string(),
	currentPrice: z.number(),
	dailyChange: z.number(),
	currency: z.string(),
	metrics: keyMetricsSchema,
	priceHistory: z.array(pricePointSchema),
	transactions: z.array(transactionSchema),
	news: z.array(newsArticleSchema),
})

export type PricePoint = z.infer<typeof pricePointSchema>
export type KeyMetrics = z.infer<typeof keyMetricsSchema>
export type Transaction = z.infer<typeof transactionSchema>
export type NewsArticle = z.infer<typeof newsArticleSchema>
export type StockDetail = z.infer<typeof stockDetailSchema>
