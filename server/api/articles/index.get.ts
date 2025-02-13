export default defineEventHandler(async () => {
  return await useDB()
    .article
    .findMany()
})
