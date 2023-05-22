import axios from 'axios';
import { LoadAllResponse, LoadAllResponseSchema, LoginResponse, LoginResponseSchema, RegisterResponse, RegisterResponseSchema } from './types/api-types';

const { REACT_APP_SERVICE_URL } = process.env;

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

export async function loadAllItems(accessToken: string): Promise<LoadAllResponse> {
    const response = await axios.post(`${REACT_APP_SERVICE_URL}/loadAll`, {
        data: { accessToken },
    });
    return LoadAllResponseSchema.parse(response.data);
}