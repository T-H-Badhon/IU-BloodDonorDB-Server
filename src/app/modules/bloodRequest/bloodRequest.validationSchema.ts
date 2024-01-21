import { z } from 'zod'

export const bloodRequestValidationSchema = z.object({
  body: z.object({
    requestData: z.object({
      bloodGroup: z.enum(['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-']),
      patientName: z.string({ required_error: 'Patient name is Required!' }),
      phone: z.string({ required_error: 'Contact No. is Required!' }),
      area: z.enum(['Kushtia', 'Jhinaidah', 'Sheikhpara']),
      reason: z.string({ required_error: 'Reason Can engage more donors' }),
      date: z.string(),
    }),
  }),
})
