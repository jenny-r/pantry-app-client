import { configureStore } from '@reduxjs/toolkit';
import pantryReducer from './pantrySlice';
import groceryReducer from './grocerySlice';

const store = configureStore({
    reducer: {
        pantry: pantryReducer,
        grocery: groceryReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;