import z from 'zod'

export default defineEventHandler(async (event) => {
  await requireUser(event)

  const { id } = await getValidatedRouterParams(event, z.object({
    id: z.string(),
  }).parse)

  await useDB()
    .deleteFrom('articles')
    .where('id', '=', id)
    .execute()

  return setResponseStatus(event, 204)
})
