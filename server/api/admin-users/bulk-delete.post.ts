import { adminUserBulkDeleteSchema } from '#shared/schemas/admin-users'

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)

  const { ids } = await readValidatedBody(event, adminUserBulkDeleteSchema.parse)

  if (ids.includes(user.id)) {
    throw error(400, 'Cannot delete the current user')
  }

  await useDB()
    .adminUser
    .deleteMany({
      where: { id: { in: ids } },
    })
})
