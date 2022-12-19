export interface PantryItemType {
    id: string;
    name: string;
    unit: string;
    quantity: number;
}

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

export interface GroceryItemType {
    id: string;
    name: string;
    unit: string;
    quantity: number;
    checked: boolean;
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