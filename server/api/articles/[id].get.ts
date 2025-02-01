import z from 'zod'

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, z.object({
    id: z.string().min(1),
  }).parse)

  return await useDB()
    .selectFrom('articles')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst()
})
