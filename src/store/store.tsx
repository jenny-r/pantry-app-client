import { configureStore } from '@reduxjs/toolkit';
import pantryReducer from './pantrySlice';
import groceryReducer from './grocerySlice';
import userReducer from './userSlice'

const store = configureStore({
    reducer: {
        pantry: pantryReducer,
        grocery: groceryReducer,
        user: userReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;