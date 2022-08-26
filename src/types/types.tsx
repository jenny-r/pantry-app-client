export interface PantryItemType {
    id: string;
    name: string;
    unit: string;
    quantity: number;
}

export enum Mode {
    Default,
    Edit,
    Delete
}