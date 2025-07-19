import z from 'zod'
import { PASSWORD_REGEX } from '../utils/auth'

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Invalid password'),
})

export const registerSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().regex(PASSWORD_REGEX, 'Must be at least 8 characters'),
})

export type LoginSchema = z.output<typeof loginSchema>
export type RegisterSchema = z.output<typeof registerSchema>
