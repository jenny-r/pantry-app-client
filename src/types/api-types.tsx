import { z } from 'zod';

// Login Request
export const LoginRequestSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

// Login Response
export const LoginResponseSchema = z.object({
    accessToken: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

// Register Request
export const RegisterRequestSchema = z.object({
    email: z.string().email({ message: 'valid email address required' }),
    password: z.string().min(6, { message: 'password must be at least 6 characters' }),
});
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

// Register Response
export const RegisterResponseSchema = z.discriminatedUnion('status', [
    z.object({ status: z.literal(true), accessToken: z.string() }),
    z.object({ status: z.literal(false), error: z.string() }),
]);

export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
