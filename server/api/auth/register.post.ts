import { registerSchema } from '#shared/schemas/auth'

export default eventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, registerSchema.parse)

  const hash = await hashPassword(password)

  const user = await useDB()
    .insertInto('_admin_users')
    .values({ email, hash })
    .returning(['id', 'email', 'enabled'])
    .executeTakeFirst()
    .catch((e) => {
      if (e.code === PG_ERRORS.UNIQUE_VIOLATION) {
        throw error(400, 'Email already registered')
      }
      return null
    })
  if (!user) {
    throw error(400, 'Registration failed')
  }

  await setUserSession(event, {
    userId: user.id,
    user: sanitizeUser(user),
  })

  return setResponseStatus(event, 201)
})
