import { describe, it, expect } from 'vitest';
import rootReducer, { adicionarItem, removerItem, resetarCarrinho } from './reducers';

describe('Testes do Reducer de Carrinho', () => {
  
  // O estado inicial agora reflete a estrutura do combineReducers
  const initialState = {
    carrinho: { itens: [], total: 0 },
    form: {}
  };

  const produtoExemplo = { id: 1, nome: 'AirPods', preco: 1000 };

  it('deve retornar o estado inicial quando a ação for desconhecida', () => {
    const estado = rootReducer(undefined, { type: 'unknown' });
    // Ajustado para comparar com a estrutura real do seu rootReducer
    expect(estado.carrinho).toEqual({ itens: [], total: 0 });
  });

  it('deve adicionar um novo item ao carrinho e atualizar o total', () => {
    const estado = rootReducer(initialState, adicionarItem(produtoExemplo));
    
    expect(estado.carrinho.itens).toHaveLength(1);
    expect(estado.carrinho.itens[0].quantidade).toBe(1);
    expect(estado.carrinho.total).toBe(1000);
  });

  it('deve aumentar a quantidade se o mesmo item for adicionado novamente', () => {
    const estadoComItem = {
      carrinho: {
        itens: [{ id: 1, nome: 'AirPods', preco: 1000, quantidade: 1 }],
        total: 1000
      },
      form: {}
    };

    const estadoFinal = rootReducer(estadoComItem, adicionarItem(produtoExemplo));

    expect(estadoFinal.carrinho.itens[0].quantidade).toBe(2);
    expect(estadoFinal.carrinho.total).toBe(2000);
  });

  it('deve diminuir a quantidade ao remover um item', () => {
    const estadoComDoisItems = {
      carrinho: {
        itens: [{ id: 1, nome: 'AirPods', preco: 1000, quantidade: 2 }],
        total: 2000
      },
      form: {}
    };

    const estadoFinal = rootReducer(estadoComDoisItems, removerItem(1));

    expect(estadoFinal.carrinho.itens[0].quantidade).toBe(1);
    expect(estadoFinal.carrinho.total).toBe(1000);
  });

  it('deve remover o item do array quando a quantidade chegar a zero', () => {
    const estadoComUmItem = {
      carrinho: {
        itens: [{ id: 1, nome: 'AirPods', preco: 1000, quantidade: 1 }],
        total: 1000
      },
      form: {}
    };

    const estadoFinal = rootReducer(estadoComUmItem, removerItem(1));

    expect(estadoFinal.carrinho.itens).toHaveLength(0);
    expect(estadoFinal.carrinho.total).toBe(0);
  });
});