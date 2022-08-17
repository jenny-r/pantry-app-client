import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PantryItemType } from '../types/types';

interface PantryState {
    pantryItems: { [id: string]: PantryItemType }
}

const initialState: PantryState = {
    pantryItems: {
        '1': {
            id: '1',
            name: 'Milk',
            unit: 'Carton',
            quantity: 2
        },
        '2': {
            id: '2',
            name: 'Banana',
            unit: 'Single',
            quantity: 1
        },
        '3': {
            id: '3',
            name: 'Tuna',
            unit: 'Can',
            quantity: 3
        },
        '4': {
            id: '4',
            name: 'Bread',
            unit: 'Loaf',
            quantity: 1
        },
        '5': {
            id: '5',
            name: 'Orange juice',
            unit: 'Carton',
            quantity: 1
        },
        '6': {
            id: '6',
            name: 'Bacon',
            unit: 'Package',
            quantity: 1
        },
        '7': {
            id: '7',
            name: 'Potato',
            unit: 'Single',
            quantity: 6
        },
        '8': {
            id: '8',
            name: 'Flour',
            unit: 'Container',
            quantity: 1
        },
        '9': {
            id: '9',
            name: 'Apple',
            unit: 'Single',
            quantity: 3
        },
        '10': {
            id: '10',
            name: 'Peanuts',
            unit: 'Pack',
            quantity: 1
        },
        '11': {
            id: '11',
            name: 'Fruit snacks',
            unit: 'Single',
            quantity: 10
        },
        '12': {
            id: '12',
            name: 'Beans',
            unit: 'Can',
            quantity: 4
        },
        '13': {
            id: '13',
            name: 'Olives',
            unit: 'Jar',
            quantity: 1
        },
        '14': {
            id: '14',
            name: 'Rice',
            unit: 'Pack',
            quantity: 1
        },
        '15': {
            id: '15',
            name: 'Sugar',
            unit: 'Container',
            quantity: 1
        },
        '16': {
            id: '16',
            name: 'Vanilla extract',
            unit: 'Bottle',
            quantity: 1
        },
        '17': {
            id: '17',
            name: 'Carrot',
            unit: 'Single',
            quantity: 4
        }
    }
}

const pantrySlice = createSlice({
    name: 'pantry',
    initialState,
    reducers: {
        addPantryItem: (state, action: PayloadAction<PantryItemType>) => {
            state.pantryItems[Object.keys(state.pantryItems).length + 1] = action.payload;
        },
        increase: (state, action: PayloadAction<string>) => {
            if (state.pantryItems[action.payload].quantity >= 0) {
                state.pantryItems[action.payload].quantity += 1;
            }
        },
        decrease: (state, action: PayloadAction<string>) => {
            if (state.pantryItems[action.payload].quantity > 0) {
                state.pantryItems[action.payload].quantity -= 1;
            }
        }
    }
})

export const { addPantryItem, increase, decrease } = pantrySlice.actions;

export default pantrySlice.reducer;