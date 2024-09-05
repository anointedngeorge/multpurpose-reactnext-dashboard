import {z} from 'zod'


 
export const SignupFormSchema = z.object({

  username: z.string({ message: 'Please enter a valid string' }).trim(),
  password: z
    .string()
    .min(4, { message: 'Be at least 4 characters long' })
    .trim(),
})
 
export type FormState = | {
      errors?: {
        username?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined