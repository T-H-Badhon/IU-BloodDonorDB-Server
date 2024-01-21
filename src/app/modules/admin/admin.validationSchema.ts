import { z } from 'zod'

export const adminValidationSchema = z.object({
  body: z.object({
    adminData: z.object({
      name: z.string({
        required_error: 'name is required!',
      }),
      phone: z
        .string()
        .min(11, { message: 'Please Provide 11 digit Contact No.' }),
      bloodGroup: z.enum(['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-']),
      area: z.enum(['Kushtia', 'Jhinaidah', 'Sheikhpara']),
      address: z.string({
        required_error: 'Address is required!',
      }),
    }),
  }),
})

export const updateAdminValidationSchema = z.object({
  body: z.object({
    updateData: z.object({
      name: z
        .string({
          required_error: 'name is required!',
        })
        .optional(),
      phone: z
        .string()
        .min(11, { message: 'Please Provide 11 digit Contact No.' })
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
