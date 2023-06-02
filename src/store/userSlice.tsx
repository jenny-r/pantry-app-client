import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from './store';
import { setPantryState } from './pantrySlice';
import { setGroceryState } from './grocerySlice';
import { GroceryItemType, PantryItemType } from '../types/api-types';

interface UserState {
    accessToken: string | null;
}

const initialState: UserState = {
    accessToken: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInSuccess: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        signOut: (state, action: PayloadAction<void>) => {
            state.accessToken = null;
        },
    },
});

export const { signInSuccess, signOut } = userSlice.actions;

export function onSignInSuccess(
    accessToken: string,
    pantryItems: { [id: string]: PantryItemType },
    groceryItems: { [id: string]: GroceryItemType },
) {
    return (dispatch: AppDispatch) => {
        dispatch(signInSuccess(accessToken));
        dispatch(setPantryState(pantryItems));
        dispatch(setGroceryState(groceryItems));
    };
}

export function onSignOut() {
    return (dispatch: AppDispatch) => {
        dispatch(signOut());
        dispatch(setPantryState({}));
        dispatch(setGroceryState({}));
    };
}

export default userSlice.reducer;
