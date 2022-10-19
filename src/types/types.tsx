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
    Add
}

export enum PantrySort {
    Name = 'Name',
    Quantity = 'Quantity'
}