import { z } from 'zod';

export const signupSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
})

export const loginSchema = z.object({
    email: z.string(),
    password: z.string(),
})

export const createZapSchema = z.object({
    availableTriggerId: z.string(),
    triggerMetaData: z.any().optional(),
    actions: z.array(z.object({
        availableActionId: z.string(),
        actionMetaData: z.any().optional()
    }))
})
