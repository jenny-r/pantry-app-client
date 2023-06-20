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

// Add Pantry Item Response
export const AddPantryItemResponseSchema = z.discriminatedUnion('status', [
    z.object({ status: z.literal(true), pantryItem: PantryItemSchema }),
    z.object({ status: z.literal(false), error: z.string() }),
]);
export type AddPantryItemResponse = z.infer<typeof AddPantryItemResponseSchema>;

// Delete Pantry Items Response
export const DeletePantryItemsResponseSchema = z.object({
    success: z.boolean(),
});

export type DeletePantryItemsResponse = z.infer<typeof DeletePantryItemsResponseSchema>;

// Add Grocery Item Response
export const AddGroceryItemResponseSchema = z.discriminatedUnion('status', [
    z.object({ status: z.literal(true), groceryItem: GroceryItemSchema }),
    z.object({ status: z.literal(false), error: z.string() }),
]);
export type AddGroceryItemResponse = z.infer<typeof AddGroceryItemResponseSchema>;

// Delete Grocery Items Response
export const DeleteGroceryItemsResponseSchema = z.object({
    success: z.boolean(),
});

export type DeleteGroceryItemsResponse = z.infer<typeof DeleteGroceryItemsResponseSchema>;