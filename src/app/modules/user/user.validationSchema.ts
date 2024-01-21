import { z } from 'zod'

export const userValidationSchema = z.object({
  body: z.object({
    userData: z.object({
      email: z.string({ required_error: 'email is required!' }).email({
        message: 'Not a valid email',
      }),
      password: z.string({ required_error: 'password is required' }).refine(
        (password) => {
          const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

          return alphanumericRegex.test(password)
        },
        {
          message:
            'password must be alpaneumeric (*example: password123) and minimum 8 characters long',
        },
      ),
    }),
  }),
})
