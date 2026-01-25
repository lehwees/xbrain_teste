import { configureStore } from "@reduxjs/toolkit";
import carrinhoReducer from './reducers';

export const store = configureStore({
    reducer: {
        carrinho: carrinhoReducer,
    }
});