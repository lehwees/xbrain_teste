# Sistema de Vendas

Este projeto é uma aplicação de e-commerce moderna desenvolvida com React, focada em gerenciamento de estado complexo, persistência de dados e validação de formulários. O sistema permite que usuários naveguem por produtos, gerenciem seu carrinho e finalizem a compra com segurança de dados.

## Funcionalidades

Este projeto é uma aplicação de e-commerce moderna desenvolvida com React, focada em gerenciamento de estado complexo, persistência de dados e validação de formulários. O sistema permite que usuários naveguem por produtos, gerenciem seu carrinho e finalizem a compra com segurança de dados.

```bash
Catálogo Dinâmico: Listagem de produtos com efeitos interativos de "véu informativo" (hover).

Gestão de Carrinho: Sistema de adição e remoção de itens com atualização de preço em tempo real.

Cálculo Automático: Aplicação de descontos (10% OFF à vista) e cálculo de parcelamento.

Checkout Validado: Formulário de dados do cliente com validação de campos obrigatórios via Redux Form.

Persistência de Sessão: Uso de LocalStorage para manter o carrinho ativo mesmo após o fechamento do navegador ou refresh da página.
```
## Tecnologias e Funcionalidas

```bash
React (Vite): Framework principal para construção da interface.
```
```bash
Redux Toolkit: Gerenciamento de estado global previsível.
```
```bash
Redux Form: Controle e validação de submissão de formulários.
```
```bash
Redux Persist: Persistência do estado do carrinho no armazenamento local.
```
```bash
Redux Persist: Persistência do estado do carrinho no armazenamento local.
```
```bash
Material UI (MUI): Biblioteca de componentes para design consistente e responsivo.
```
```bash
React Router Dom: Gerenciamento de rotas e navegação SPA.
```
## Desafios Técnicos Superados

### Conexão de Formulários e Estado Global

Um dos maiores desafios foi integrar o Redux Form com a lógica de submissão customizada, garantindo que o handleSubmit apenas disparasse a navegação após a validação completa de campos como Nome, Email e Sexo.

### Hidratação de Dados

A implementação do PersistGate foi crucial para evitar que a aplicação tentasse renderizar componentes baseados em um estado vazio antes que o Redux Persist finalizasse a leitura do localStorage.


## Instalação e Como Rodar

```bash
git clone https://github.com/lehwees/xbrain_teste
```

Use o gerenciador de pacotes npm para instalar as dependências do projeto

```bash
npm install
```
```bash
cd xbrain_teste
```
```bash
npm run dev
```

## 

Desenvolvido com foco em escalabilidade e experiência do usuário.

## License

X-Brain