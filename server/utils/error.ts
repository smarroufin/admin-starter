export function error(code = 500, message?: string) {
  return createError({ statusCode: code, statusMessage: message })
}
