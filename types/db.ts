import type { ColumnType } from 'kysely'

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>
export type Timestamp = ColumnType<Date, Date | string, Date | string>

export type AdminUser = {
  id: Generated<string>
  createdAt: Generated<Timestamp>
  email: string
  hash: string
  enabled: Generated<boolean>
}
export type Article = {
  id: Generated<string>
  createdAt: Generated<Timestamp>
  author: string
  title: string
  content: string
  image: string
}
export type DB = {
  _admin_users: AdminUser
  articles: Article
}
