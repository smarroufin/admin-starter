import { z } from 'zod'

export default eventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }).parse)

  const user = await useDB()
    .selectFrom('_admin_users')
    .select(['id', 'email', 'hash', 'enabled'])
    .where('email', '=', email)
    .executeTakeFirst()
  if (!user) {
    throw error(403, 'Invalid credentials')
  }

  const verified = await verifyPassword(user.hash, password)
  if (!verified) {
    throw error(403, 'Invalid credentials')
  }

  if (!user.enabled) {
    throw error(403, 'Account waiting for approval')
  }

  await setUserSession(event, {
    userId: user.id,
    user: sanitizeUser(user),
  })

  return setResponseStatus(event, 201)
})
