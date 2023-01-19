import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    accessToken: string | null;
}

const initialState: UserState = {
    accessToken: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<{ email: string, password: string }>) => {
            state.accessToken = 'signed in';
        },
        signOut: (state, action: PayloadAction<void>) => {
            state.accessToken = null;
        }
    }
})

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;