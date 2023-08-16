import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PantryMode, PantrySort } from '../types/types';
import { PantryItemType } from '../types/api-types';
import { callEditPantryItems } from '../api';

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
        addPantryItems: (state, action: PayloadAction<PantryItemType[]>) => {
            for (let i = 0; i < action.payload.length; i++) {
                state.pantryItems[action.payload[i].id] = action.payload[i];
            }
        },
        deletePantryItems: (state, action: PayloadAction<string[]>) => {
            for (let i = 0; i < action.payload.length; i++) {
                delete state.pantryItems[action.payload[i]];
            }
        },
        editPantryItems: (state, action: PayloadAction<{ [id: string]: PantryItemType }>) => {
            for (let id of Object.keys(action.payload)) {
                state.pantryItems[id] = action.payload[id];
            }
        },
        changePantryMode: (state, action: PayloadAction<PantryMode>) => {
            state.pantryMode = action.payload;
        },
        changePantrySort: (state, action: PayloadAction<PantrySort>) => {
            state.pantrySort = action.payload;
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
    setGroceryAdd,
    setSearchField,
} = pantrySlice.actions;

export async function onPantryItemsEdit(
    accessToken: string | null,
    editList: { [id: string]: PantryItemType },
): Promise<{ [id: string]: PantryItemType }> {
    if (!accessToken) {
        return Promise.reject('Unable to edit. Please try again later.');
    }
    return callEditPantryItems(accessToken, editList)
        .then((response) => {
            if (response.status === true) {
                return response.pantryItems;
            }
            throw response.error;
        })
        .catch((error) => {
            if (typeof error === 'string') {
                throw error;
            }
            throw new Error('Unable to edit. Please try again later.');
        });
}

export default pantrySlice.reducer;
