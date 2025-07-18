import { z } from 'zod'

export const adminUserBulkDeleteSchema = z.object({
  ids: z.array(z.string()).min(1, 'Invalid ids'),
})

export type AdminUserBulkDeleteSchema = z.output<typeof adminUserBulkDeleteSchema>
