import { z } from 'zod';

export enum PantryMode {
    Default,
    Edit,
    Delete,
    Add,
    AddToGrocery
}

export enum PantrySort {
    Name = 'Name',
    Quantity = 'Quantity'
}

export enum GroceryMode {
    Default,
    Edit,
    Delete,
    Add
}

export enum GrocerySort {
    Name = 'Name',
    Quantity = 'Quantity'
}

export const AddPantryItemSchema = z.object({
    itemName: z.string(),
    itemUnit: z.string(),
    quantity: z.number().gt(0),
});
export type AddPantryItemType = z.infer<typeof AddPantryItemSchema>;

export const AddGroceryItemSchema = z.object({
    itemName: z.string(),
    itemUnit: z.string(),
    quantity: z.number().gt(0),
});
export type AddGroceryItemType = z.infer<typeof AddGroceryItemSchema>;