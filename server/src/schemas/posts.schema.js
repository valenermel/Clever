import { z } from 'zod'

export const createPostSchema = z.object({
    title: z.string({ required_error: 'title is required' }),
    description: z.string({ required_error: 'description is required' }),
    completed: z.boolean().optional(),
    userId: z.string({ required_error: 'userId is required' }),
})