import axios from 'axios';
import {
    AddGroceryItemResponse,
    AddGroceryItemResponseSchema,
    AddPantryItemResponse,
    AddPantryItemResponseSchema,
    DeleteGroceryItemsResponse,
    DeletePantryItemsResponse,
    DeletePantryItemsResponseSchema,
    LoadAllResponse,
    LoadAllResponseSchema,
    LoginResponse,
    LoginResponseSchema,
    RegisterResponse,
    RegisterResponseSchema,
} from './types/api-types';
import { AddGroceryItemType, AddPantryItemType } from './types/types';

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

export async function callAddPantryItem(
    accessToken: string,
    pantryItem: AddPantryItemType,
): Promise<AddPantryItemResponse> {
    const response = await axios.post(`${REACT_APP_SERVICE_URL}/addPantryItem`, {
        data: { accessToken, pantryItem },
    });
    return AddPantryItemResponseSchema.parse(response.data);
}

export async function callDeletePantryItems(
    accessToken: string,
    deleteList: string[],
): Promise<DeletePantryItemsResponse> {
    const response = await axios.post(`${REACT_APP_SERVICE_URL}/deletePantryItems`, {
        data: { accessToken, deleteList },
    });
    return DeletePantryItemsResponseSchema.parse(response.data);
}

export async function callAddGroceryItem(
    accessToken: string,
    groceryItem: AddGroceryItemType,
): Promise<AddGroceryItemResponse> {
    const response = await axios.post(`${REACT_APP_SERVICE_URL}/addGroceryItem`, {
        data: { accessToken, groceryItem },
    });
    return AddGroceryItemResponseSchema.parse(response.data);
}

export async function callDeleteGroceryItems(
    accessToken: string,
    deleteList: string[],
): Promise<DeleteGroceryItemsResponse> {
    const response = await axios.post(`${REACT_APP_SERVICE_URL}/deleteGroceryItems`, {
        data: { accessToken, deleteList },
    });
    return DeletePantryItemsResponseSchema.parse(response.data);
}