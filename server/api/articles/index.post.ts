import { articlePostSchema } from '#shared/schemas/articles'

export default defineEventHandler(async (event) => {
  await requireUser(event)

  const { author, title, content, image } = await readValidatedBody(event, articlePostSchema.parse)

  return await useDB()
    .article
    .create({
      data: {
        author,
        title,
        content,
        image,
      },
    })
})
