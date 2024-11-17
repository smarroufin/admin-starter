import { z } from 'zod'

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/

export default eventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, z.object({
    email: z.string().email(),
    password: z.string().regex(PASSWORD_REGEX),
  }).parse)

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
