import { loginSchema } from '#shared/schemas/auth'

export default eventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, loginSchema.parse)

  const user = await useDB()
    .adminUser
    .findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        hash: true,
        enabled: true,
      },
    })
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
