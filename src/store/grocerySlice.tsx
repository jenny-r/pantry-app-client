import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GroceryItemType, GroceryMode, GrocerySort } from '../types/types';

interface GroceryState {
    groceryItems: { [id: string]: GroceryItemType },
    groceryMode: GroceryMode,
    grocerySort: GrocerySort,
    searchField: string
}

const initialState: GroceryState = {
    groceryItems: {
        '1': {
            id: '1',
            name: 'Milk',
            unit: 'Carton',
            quantity: 2,
            checked: false
        },
        '2': {
            id: '2',
            name: 'Banana',
            unit: 'Single',
            quantity: 1,
            checked: false
        },
        '3': {
            id: '3',
            name: 'Tuna',
            unit: 'Can',
            quantity: 3,
            checked: false
        },
        '4': {
            id: '4',
            name: 'Bread',
            unit: 'Loaf',
            quantity: 1,
            checked: false
        },
        '5': {
            id: '5',
            name: 'Orange juice',
            unit: 'Carton',
            quantity: 1,
            checked: false
        },
        '6': {
            id: '6',
            name: 'Bacon',
            unit: 'Package',
            quantity: 1,
            checked: false
        },
        '7': {
            id: '7',
            name: 'Potato',
            unit: 'Single',
            quantity: 6,
            checked: false
        }
    },
    groceryMode: GroceryMode.Default,
    grocerySort: GrocerySort.Name,
    searchField: ''
}

const grocerySlice = createSlice({
    name: 'grocery',
    initialState,
    reducers: {
        addGroceryItem: (state, action: PayloadAction<GroceryItemType>) => {
            state.groceryItems[Object.keys(state.groceryItems).length + 1] = action.payload;
        },
        deleteGroceryItems: (state, action: PayloadAction<string[]>) => {
            for (let i = 0; i < action.payload.length; i++) {
                delete state.groceryItems[action.payload[i]];
            }
            state.groceryMode = GroceryMode.Default;
        },
        editGroceryItems: (state, action: PayloadAction<{ [id: string]: GroceryItemType }>) => {
            for (let id of Object.keys(action.payload)) {
                state.groceryItems[id] = action.payload[id];
            }
            state.groceryMode = GroceryMode.Default;
        },
        changeGroceryMode: (state, action: PayloadAction<GroceryMode>) => {
            state.groceryMode = action.payload;
        },
        changeGrocerySort: (state, action: PayloadAction<GrocerySort>) => {
            state.grocerySort = action.payload;
        },
        increase: (state, action: PayloadAction<string>) => {
            state.groceryItems[action.payload].quantity += 1;
        },
        decrease: (state, action: PayloadAction<string>) => {
            if (state.groceryItems[action.payload].quantity > 0) {
                state.groceryItems[action.payload].quantity -= 1;
            }
        },
        toggleChecked: (state, action: PayloadAction<{ [id: string]: boolean }>) => {
            state.groceryItems[Object.keys(action.payload)[0]].checked = Object.values(action.payload)[0];
        },
        setSearchField: (state, action: PayloadAction<string>) => {
            state.searchField = action.payload;
        }
    }
})

export const { addGroceryItem, deleteGroceryItems, editGroceryItems, changeGroceryMode, changeGrocerySort, increase, decrease, toggleChecked, setSearchField } = grocerySlice.actions;

export default grocerySlice.reducer;