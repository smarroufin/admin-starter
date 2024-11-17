export default defineEventHandler(() => {
  return useDB()
    .selectFrom('articles')
    .selectAll()
    .execute()
})
