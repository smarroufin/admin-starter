import { articleBulkDeleteSchema } from '#shared/schemas/articles'

export default defineEventHandler(async (event) => {
  await requireUser(event)

  const { ids } = await readValidatedBody(event, articleBulkDeleteSchema.parse)

  await useDB()
    .article
    .deleteMany({
      where: { id: { in: ids } },
    })
})
