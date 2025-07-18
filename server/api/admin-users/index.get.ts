export default defineEventHandler(async (event) => {
  await requireUser(event)

  return await useDB()
    .adminUser
    .findMany({ omit: { hash: true } })
})
