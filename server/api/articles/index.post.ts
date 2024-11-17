import z from 'zod'

export default defineEventHandler(async (event) => {
  await requireUser(event)

  const { author, title, content, image } = await readValidatedBody(event, z.object({
    author: z.string().min(1),
    title: z.string().min(1),
    content: z.string().min(1),
    image: z.string().min(1),
  }).parse)

  const article = await useDB()
    .insertInto('articles')
    .values({ author, title, content, image })
    .returningAll()
    .executeTakeFirst()

  return article
})
