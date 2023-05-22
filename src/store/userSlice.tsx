import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from './store';
import { loadAllItems } from '../api';
import { setPantryState } from './pantrySlice';
import { setGroceryState } from './grocerySlice';

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

export function onSignInSuccess(accessToken: string) {
    return (dispatch: AppDispatch) => {
        dispatch(signInSuccess(accessToken));
        loadAllItems(accessToken).then((response) => {
            dispatch(setPantryState(response.pantryItems));
            dispatch(setGroceryState(response.groceryItems));
        });
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
