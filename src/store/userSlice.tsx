import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

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
        signInSuccess: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        signOut: (state, action: PayloadAction<void>) => {
            state.accessToken = null;
        }
    }
})

export const { signInSuccess, signOut } = userSlice.actions;

export async function signIn(email: string, password: string) {
    return await axios.post(
        `http://localhost:3001/login`, 
        {
            data: { email, password }
        }
    );
}

export async function register(email: string, password: string) {
    return await axios.post(
        `http://localhost:3001/register`, 
        {
            data: { email, password }
        }
    );
}

export default userSlice.reducer;