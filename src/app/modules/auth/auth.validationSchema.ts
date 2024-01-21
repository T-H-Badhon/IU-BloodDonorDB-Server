import { z } from 'zod'

export const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is Required!' }).email({
      message: 'Not a valid email',
    }),
  }),
})

export const changePasswordValidationSchema = z.object({
  body: z.object({
    changePasswordCredential: z.object({
      currentPassword: z.string({
        required_error: 'Current password is Required!',
      }),
      newPassword: z
        .string({ required_error: 'New password is required' })
        .refine(
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

export const loginValidationSchema = z.object({
  body: z.object({
    loginCredential: z.object({
      email: z
        .string({ required_error: 'Email is Required!' })
        .email({ message: 'Not a valid email!' }),
      password: z.string({ required_error: 'Password not provided!' }),
    }),
  }),
})
