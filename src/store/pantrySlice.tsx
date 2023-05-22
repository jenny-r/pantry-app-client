import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddPantryItemType, PantryMode, PantrySort } from '../types/types';
import { PantryItemType } from '../types/api-types';

interface PantryState {
    pantryItems: { [id: string]: PantryItemType };
    pantryMode: PantryMode;
    pantrySort: PantrySort;
    searchField: string;
    groceryAdd: { itemName: string; itemUnit: string };
}

const initialState: PantryState = {
    pantryItems: {},
    pantryMode: PantryMode.Default,
    pantrySort: PantrySort.Name,
    searchField: '',
    groceryAdd: {
        itemName: '',
        itemUnit: '',
    },
};

const pantrySlice = createSlice({
    name: 'pantry',
    initialState,
    reducers: {
        setPantryState: (state, action: PayloadAction<{ [id: string]: PantryItemType }>) => {
            state.pantryItems = action.payload;
        },
        addPantryItems: (state, action: PayloadAction<AddPantryItemType[]>) => {
            // action.payload.forEach((item) => {
            //     state.pantryItems['id' + Math.random()] = item;
            // });
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
        setGroceryAdd: (state, action: PayloadAction<{ itemName: string; itemUnit: string }>) => {
            state.groceryAdd = {
                itemName: action.payload.itemName,
                itemUnit: action.payload.itemUnit,
            };
        },
        setSearchField: (state, action: PayloadAction<string>) => {
            state.searchField = action.payload;
        },
    },
});

export const {
    setPantryState,
    addPantryItems,
    deletePantryItems,
    editPantryItems,
    changePantryMode,
    changePantrySort,
    increase,
    decrease,
    setGroceryAdd,
    setSearchField,
} = pantrySlice.actions;

export default pantrySlice.reducer;
