import { z } from 'zod';

// Login Response
export const LoginResponseSchema = z.object({
    accessToken: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

// Register Response
export const RegisterResponseSchema = z.discriminatedUnion('status', [
    z.object({ status: z.literal(true), accessToken: z.string() }),
    z.object({ status: z.literal(false), error: z.string() }),
]);

export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
