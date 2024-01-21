import { z } from 'zod'

export const blogPostValidationSchema = z.object({
  body: z.object({
    blogData: z.object({
      title: z.string({ required_error: 'Title is Required!' }),
      details: z.string({ required_error: `Empty blog can't posted` }),
    }),
  }),
})
