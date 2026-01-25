import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    itens: [],
    total: 0,
};

const carrinhoSlice = createSlice ({
    name: 'carrinho',
    initialState,
        reducers: {
            adicionarItem: (state, action) => {
                state.itens.push(action.payload);
                state.total += action.payload.subtotal;
            },
            resetarCarrinho: () => initialState,
        },
});

export const { adicionarItem, resetarCarrinho } = carrinhoSlice.actions;

export default carrinhoSlice.reducer;