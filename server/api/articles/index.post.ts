import { articlePostSchema } from '#shared/schemas/articles'

export default defineEventHandler(async (event) => {
  await requireUser(event)

  const { author, title, content, image } = await readValidatedBody(event, articlePostSchema.parse)

  const article = await useDB()
    .insertInto('articles')
    .values({ author, title, content, image })
    .returningAll()
    .executeTakeFirst()

  return article
})
