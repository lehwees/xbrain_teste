import { createSlice, combineReducers } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';

const initialState = {
    itens: [],
    total: 0,
};

const carrinhoSlice = createSlice({
    name: 'carrinho',
    initialState,
    reducers: {
        adicionarItem: (state, action) => {
            const item = state.itens.find(i => i.id == action.payload.id);
            if (item) {
                item.quantidade += 1;
            } else {
                state.itens.push({ ...action.payload, quantidade: 1 });
            }
            state.total += action.payload.preco;
        },
        removerItem: (state, action) => {
            const index = state.itens.findIndex(i => i.id === action.payload);
            if (index !== -1) {
                state.total -= state.itens[index].preco;
                if (state.itens[index].quantidade > 1) {
                    state.itens[index].quantidade -= 1;
                } else {
                    state.itens.splice(index, 1);
                }
            }
        },
        resetarCarrinho: () => initialState,
    },
});

export const { adicionarItem, removerItem, resetarCarrinho } = carrinhoSlice.actions;

const rootReducer = combineReducers({
    carrinho: carrinhoSlice.reducer,
    form: formReducer
});

export default rootReducer;