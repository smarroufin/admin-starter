import type { H3Event } from 'h3'

export async function requireUser(event: H3Event) {
  const session = await requireUserSession(event)

  if (session.user && session.user.enabled) {
    return session.user
  }

  throw error(401)
}

export function sanitizeUser(user: { id: string, email: string, enabled: boolean }) {
  return {
    id: user.id,
    email: user.email,
    enabled: user.enabled,
  }
}
