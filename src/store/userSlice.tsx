import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { LoginResponse, LoginResponseSchema, RegisterResponse, RegisterResponseSchema } from '../types/api-types';

const { REACT_APP_SERVICE_URL } = process.env;

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

export async function signIn(email: string, password: string): Promise<LoginResponse> {
    const response = await axios.post(`${REACT_APP_SERVICE_URL}/login`, {
        data: { email, password },
    });
    return LoginResponseSchema.parse(response.data);
}

export async function register(email: string, password: string): Promise<RegisterResponse> {
    const response = await axios.post(`${REACT_APP_SERVICE_URL}/register`, {
        data: { email, password },
    });
    return RegisterResponseSchema.parse(response.data);
}

export default userSlice.reducer;
