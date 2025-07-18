import z from 'zod'

export const articlePostSchema = z.object({
  author: z.string().min(1, 'Invalid author'),
  title: z.string().min(1, 'Invalid title'),
  content: z.string().min(1, 'Invalid content'),
  image: z.string().regex(/https?:\/\/.+/, 'Invalid image url'),
})

export const articleBulkDeleteSchema = z.object({
  ids: z.array(z.string()).min(1, 'Invalid ids'),
})

export type ArticlePostSchema = z.output<typeof articlePostSchema>
export type ArticleBulkDeleteSchema = z.output<typeof articleBulkDeleteSchema>
