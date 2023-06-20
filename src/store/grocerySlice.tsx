import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GroceryMode, GrocerySort } from '../types/types';
import { GroceryItemType } from '../types/api-types';

interface GroceryState {
    groceryItems: { [id: string]: GroceryItemType };
    groceryMode: GroceryMode;
    grocerySort: GrocerySort;
    searchField: string;
}

const initialState: GroceryState = {
    groceryItems: {},
    groceryMode: GroceryMode.Default,
    grocerySort: GrocerySort.Name,
    searchField: '',
};

const grocerySlice = createSlice({
    name: 'grocery',
    initialState,
    reducers: {
        setGroceryState: (state, action: PayloadAction<{ [id: string]: GroceryItemType }>) => {
            state.groceryItems = action.payload;
        },
        addGroceryItem: (state, action: PayloadAction<GroceryItemType>) => {
            state.groceryItems[action.payload.id] = action.payload;
        },
        deleteGroceryItems: (state, action: PayloadAction<string[]>) => {
            for (let i = 0; i < action.payload.length; i++) {
                delete state.groceryItems[action.payload[i]];
            }
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
        toggleChecked: (state, action: PayloadAction<{ id: string; isChecked: boolean }>) => {
            state.groceryItems[action.payload.id].checked = action.payload.isChecked;
        },
        setSearchField: (state, action: PayloadAction<string>) => {
            state.searchField = action.payload;
        },
    },
});

export const {
    setGroceryState,
    addGroceryItem,
    deleteGroceryItems,
    editGroceryItems,
    changeGroceryMode,
    changeGrocerySort,
    increase,
    decrease,
    toggleChecked,
    setSearchField,
} = grocerySlice.actions;

export default grocerySlice.reducer;
