import { createSlice, combineReducers } from '@reduxjs/toolkit';
import { reducer as formReducer} from 'redux-form';

const initialState = {
    cliente: { nome: '', email: ''},
    itens: [],
    total: 0,
};

const carrinhoSlice = createSlice ({
    name: 'carrinho',
    initialState,
        reducers: {
            adicionarItem: (state, action) => {
                state.itens.push(action.payload);
                state.total += action.payload.preco * action.payload.quantidade;
            },
            salvarDadosCliente: (state, action) => {
                state.cliente = action.payload;
            },
            resetarCarrinho: () => initialState,
        },
});

export const { adicionarItem, salvarDadosCliente, resetarCarrinho } = carrinhoSlice.actions;

const rootReducer = combineReducers({
    carrinho: carrinhoSlice.reducer,
    form: formReducer
});

export default carrinhoSlice.reducer;