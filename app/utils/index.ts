import type { H3Error } from 'h3'

export function getErrorMessage(e: H3Error) {
  // @ts-expect-error unknown error data type
  return e.data?.message ?? e.message ?? e.statusMessage
}
