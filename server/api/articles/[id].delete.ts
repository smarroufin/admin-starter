import z from 'zod'

export default defineEventHandler(async (event) => {
  await requireUser(event)

  const { id } = await getValidatedRouterParams(event, z.object({
    id: z.string().min(1),
  }).parse)

  await useDB()
    .article
    .delete({ where: { id } })

  return setResponseStatus(event, 204)
})
