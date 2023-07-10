import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GroceryMode, GrocerySort } from '../types/types';
import { GroceryItemType } from '../types/api-types';
import { callEditGroceryItems } from '../api';

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
        },
        changeGroceryMode: (state, action: PayloadAction<GroceryMode>) => {
            state.groceryMode = action.payload;
        },
        changeGrocerySort: (state, action: PayloadAction<GrocerySort>) => {
            state.grocerySort = action.payload;
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
    setSearchField,
} = grocerySlice.actions;

export async function onGroceryItemsEdit(
    accessToken: string | null,
    editList: { [id: string]: GroceryItemType },
): Promise<{ [id: string]: GroceryItemType }> {
    if (!accessToken) {
        return Promise.reject('Unable to edit. Please try again later.');
    }
    return callEditGroceryItems(accessToken, editList)
        .then((response) => {
            if (response.status === true) {
                return response.groceryItems;
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

export default grocerySlice.reducer;
