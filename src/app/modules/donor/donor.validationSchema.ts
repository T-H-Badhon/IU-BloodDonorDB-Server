import { z } from 'zod'

export const donorValidationSchema = z.object({
  body: z.object({
    donorData: z.object({
      name: z.string({
        required_error: 'name is required!',
      }),
      phone: z
        .string()
        .min(11, { message: 'Please provide 11 digit Contact No.' }),
      bloodGroup: z.enum(['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-']),
      area: z.enum(['Kushtia', 'Jhinaidah', 'Sheikhpara']),
      address: z.string({
        required_error: 'Address is required!',
      }),
    }),
  }),
})

export const updateDonorValidationSchema = z.object({
  body: z.object({
    updateData: z.object({
      name: z
        .string({
          required_error: 'name is required!',
        })
        .optional(),
      phone: z
        .string()
        .min(11, { message: 'Please provide 11 digit Contact No.' })
        .optional(),
      bloodGroup: z
        .enum(['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'])
        .optional(),
      area: z.enum(['Kushtia', 'Jhinaidah', 'Sheikhpara']).optional(),
      address: z
        .string({
          required_error: 'Address is required!',
        })
        .optional(),
    }),
  }),
})
