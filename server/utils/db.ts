import { Kysely, PostgresDialect } from 'kysely'
import pg from 'pg'
import type { DB } from '~~/types/db.ts'

let _db: Kysely<DB> | undefined

export function useDB() {
  if (_db) {
    return _db
  }

  const dialect = new PostgresDialect({
    pool: new pg.Pool({
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_DB,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      port: Number(process.env.DATABASE_PORT),
      max: 3,
    }),
  })
  _db = new Kysely<DB>({ dialect })

  return _db
}

export const PG_ERRORS = {
  UNIQUE_VIOLATION: '23505',
}
