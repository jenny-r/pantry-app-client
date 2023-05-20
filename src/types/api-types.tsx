import { z } from 'zod';

export const PantryItemSchema = z.object({
    id: z.string(),
    userId: z.string(),
    itemName: z.string(),
    itemUnit: z.string(),
    quantity: z.number().gt(0),
    updatedAt: z.number(),
});
export type PantryItemType = z.infer<typeof PantryItemSchema>;

export const AddPantryItemSchema = z.object({
    itemName: z.string(),
    itemUnit: z.string(),
    quantity: z.number().gt(0),
});
export type AddPantryItemType = z.infer<typeof AddPantryItemSchema>;

export const GroceryItemSchema = z.object({
    id: z.string(),
    userId: z.string(),
    itemName: z.string(),
    itemUnit: z.string(),
    quantity: z.number().gt(0),
    checked: z.boolean(),
    updatedAt: z.number(),
});
export type GroceryItemType = z.infer<typeof GroceryItemSchema>;

export const AddGroceryItemSchema = z.object({
    itemName: z.string(),
    itemUnit: z.string(),
    quantity: z.number().gt(0),
});
export type AddGroceryItemType = z.infer<typeof AddGroceryItemSchema>;

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

// Load All Response
export const LoadAllResponseSchema = z.object({
    pantryItems: z.record(PantryItemSchema),
    groceryItems: z.record(GroceryItemSchema),
});

export type LoadAllResponse = z.infer<typeof LoadAllResponseSchema>;