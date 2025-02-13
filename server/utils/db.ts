import { PrismaClient } from '@prisma/client'

let _client: PrismaClient | undefined

export function useDB() {
  if (_client) {
    return _client
  }

  _client = new PrismaClient()

  return _client
}

export const PG_ERRORS = {
  UNIQUE_VIOLATION: '23505',
}
