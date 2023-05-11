import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    LoginRequestSchema,
    LoginResponse,
    LoginResponseSchema,
    RegisterRequestSchema,
    RegisterResponse,
    RegisterResponseSchema,
} from '../types/api-types';

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

export async function signIn(input: any): Promise<LoginResponse> {
    const request = LoginRequestSchema.parse(input);

    const response = await axios.post(`${REACT_APP_SERVICE_URL}/login`, {
        data: request,
    });
    return LoginResponseSchema.parse(response.data);
}

export async function register(input: any): Promise<RegisterResponse> {
    const request = RegisterRequestSchema.parse(input);

    const response = await axios.post(`${REACT_APP_SERVICE_URL}/register`, {
        data: request,
    });
    return RegisterResponseSchema.parse(response.data);
}

export default userSlice.reducer;
