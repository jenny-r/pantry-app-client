import axios from 'axios';
import {
    AddPantryItemResponse,
    AddPantryItemResponseSchema,
    DeletePantryItemsResponse,
    DeletePantryItemsResponseSchema,
    EditPantryItemsResponse,
    EditPantryItemsResponseSchema,
    LoadAllResponse,
    LoadAllResponseSchema,
    LoginResponse,
    LoginResponseSchema,
    PantryItemType,
    RegisterResponse,
    RegisterResponseSchema,
} from './types/api-types';
import { AddPantryItemType } from './types/types';

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

export async function callEditPantryItems(
    accessToken: string,
    editList: { [id: string]: PantryItemType },
): Promise<EditPantryItemsResponse> {
    const response = await axios.post(`${REACT_APP_SERVICE_URL}/editPantryItems`, {
        data: { accessToken, editList },
    });
    return EditPantryItemsResponseSchema.parse(response.data);
}
