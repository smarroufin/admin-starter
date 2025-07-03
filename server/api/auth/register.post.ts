import { registerSchema } from '#shared/schemas/auth'

export default eventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, registerSchema.parse)

  const hash = await hashPassword(password)

  const usersCount = await useDB().adminUser.count()
  const user = await useDB()
    .adminUser
    .create({
      data: {
        email,
        hash,
        enabled: usersCount === 0, // Enable first
      },
      select: {
        id: true,
        email: true,
        enabled: true,
      },
    })
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
