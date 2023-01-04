import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PantryItemType, PantryMode, PantrySort } from '../types/types';

interface PantryState {
    pantryItems: { [id: string]: PantryItemType },
    pantryMode: PantryMode,
    pantrySort: PantrySort,
    searchField: string,
    groceryAdd: { name: string, unit: string }
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
    },
    pantryMode: PantryMode.Default,
    pantrySort: PantrySort.Name,
    searchField: '',
    groceryAdd: {
        name: '',
        unit: ''
    }
}

const pantrySlice = createSlice({
    name: 'pantry',
    initialState,
    reducers: {
        addPantryItems: (state, action: PayloadAction<PantryItemType[]>) => {
            action.payload.forEach(item => {
                state.pantryItems['id' + Math.random()] = item;
            });
        },
        deletePantryItems: (state, action: PayloadAction<string[]>) => {
            for (let i = 0; i < action.payload.length; i++) {
                delete state.pantryItems[action.payload[i]];
            }
            state.pantryMode = PantryMode.Default;
        },
        editPantryItems: (state, action: PayloadAction<{ [id: string]: PantryItemType }>) => {
            for (let id of Object.keys(action.payload)) {
                state.pantryItems[id] = action.payload[id];
            }
            state.pantryMode = PantryMode.Default;
        },
        changePantryMode: (state, action: PayloadAction<PantryMode>) => {
            state.pantryMode = action.payload;
        },
        changePantrySort: (state, action: PayloadAction<PantrySort>) => {
            state.pantrySort = action.payload;
        },
        increase: (state, action: PayloadAction<string>) => {
            state.pantryItems[action.payload].quantity += 1;
        },
        decrease: (state, action: PayloadAction<string>) => {
            if (state.pantryItems[action.payload].quantity > 0) {
                state.pantryItems[action.payload].quantity -= 1;
            }
        },
        setGroceryAdd: (state, action: PayloadAction<{ name: string, unit: string }>) => {
            state.groceryAdd = {
                name: action.payload.name,
                unit: action.payload.unit
            }
        },
        setSearchField: (state, action: PayloadAction<string>) => {
            state.searchField = action.payload;
        }
    }
})

export const { addPantryItems, deletePantryItems, editPantryItems, changePantryMode, changePantrySort, increase, decrease, setGroceryAdd, setSearchField } = pantrySlice.actions;

export default pantrySlice.reducer;