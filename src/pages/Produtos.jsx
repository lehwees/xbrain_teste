import React, { useState } from "react";
import { Box, Container, Grid, Card, IconButton, CardMedia, CardContent, Typography, Button, TextField, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adicionarItem, removerItem } from "../redux/reducers.js";
import { Field, reduxForm } from 'redux-form';


// Importação Imagens
import produto01 from "../assets/produtos/produto-01.jpeg";
import produto02 from "../assets/produtos/produto-02.jpeg";
import produto03 from "../assets/produtos/produto-03.jpeg";
import produto04 from "../assets/produtos/produto-04.jpeg";
import produto05 from "../assets/produtos/produto-05.jpeg";
import produto06 from "../assets/produtos/produto-06.jpeg";
import produto07 from "../assets/produtos/produto-07.jpeg";
import produto08 from "../assets/produtos/produto-08.jpeg";

// Importação SVG
import AddIcon from "../assets/produtos/baseline-add-24px.svg";
import RemoveIcon from "../assets/produtos/baseline-remove-24px.svg";
import { destroy } from "redux-form";

const produtos = [
    { id: 1, nome: 'AirPods Apple Fones de ouvido', preco: 1499, imagem: produto01 },
    { id: 2, nome: 'Capa de Silicone Iphone 8/7 cor Areia -Rosa', preco: 299, imagem: produto02 },
    { id: 3, nome: 'Apple Pencil', preco: 729, imagem: produto03 },
    { id: 4, nome: 'Magic Mouse 2 - Prateado', preco: 549, imagem: produto04 }, 
    { id: 5, nome: 'Apple Watch Caixa Alumínio Pulseira Branca', preco: 2899, imagem: produto05 }, 
    { id: 6, nome: 'Cabo Lightning para USB (1m)', preco: 149, imagem: produto06 },
    { id: 7, nome: 'Smart Keyborad Ipad Pro 12,9', preco: 1099, imagem: produto07 }, 
    { id: 8, nome: 'Carregador USB 5W Apple', preco: 149, imagem: produto08 },
];

const renderTextField = ({ input, label, placeholder, meta: { touched, error }, ...custom }) => (
    <TextField
        label = {label}
        placeholder = {placeholder}
        fullWidth 
        error = {touched && !!error} // Fica vermelho se foi tocado e tem erro
        helperText = {touched && error} // Mostra a mensagem "Campo obrigatório"
        variant = "outlined"
        {...input}
    />
);

const renderSelectField = ({ input, label, meta: { touched, error }, children }) => (
    <TextField
        select
        label = {label}
        fullWidth
        error = {touched && !!error} 
        helperText = {touched && error}
        {...input}
    >
        {children}
    </TextField>
);

let Produtos = (props) => {
    const { handleSubmit } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const total = useSelector((state) => state.carrinho.total || 0);
    const itensNoCarrinho = useSelector((state) => state.carrinho.itens || []);
    
    const getQuantidade = (id) => {
        console.log("Itens no carrinho:", itensNoCarrinho);
        console.log("Procurando ID:", id);
        const item = itensNoCarrinho.find(i => i.id === id);
        return item ? item.quantidade : 0;  
    };

   const handleAdd = (produto) => {
        dispatch(adicionarItem(produto)); 
    };
 
    const handleRemove = (produto) => {
        dispatch(removerItem(produto.id));
    };

    const onSubmit = (values) => {
        console.log("Dados do Cliente:", values); // Aqui estarão o nome, email e sexo
        navigate('/finalizacao');
    };

    return (
       <Container maxWidth="lg" sx={{ py: 4, bgcolor: '#fff' }}>
    <Typography variant="h5" sx={{ mb: 3, borderBottom: '1px solid #eeeeee', pb: 1, color: '#546e7a', fontWeight: 500 }}>
        Produtos
    </Typography>
    <Grid container spacing={3}>
        {produtos.map((produto) => (
            <Grid item xs={12} sm={6} md={3} key={produto.id}>
                <Card elevation={0} sx={{ 
                    textAlign: 'center', p: 2, height: '100%', display: 'flex', flexDirection: 'column', 
                    transition: 'all 0.3s ease', border: '1px solid transparent',
                    '&:hover': { 
                        border: '1px solid #e0e0e0', 
                        boxShadow: '0px 4px 20px rgba(0,0,0,0.08)',
                        '& .controles-hover': { opacity: 1 } // Revela os botões no hover
                    } 
                }}>
                    <CardMedia component="img" image={produto.imagem} sx={{ height: 130, objectFit: 'contain', mb: 2 }} />
                    <CardContent sx={{ p: 0, flexGrow: 1 }}>
                        <Typography variant="body2" sx={{ color: '#999', fontSize: '0.85rem', mb: 1, minHeight: 40 }}>
                            {produto.nome}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                            R$ {produto.preco.toFixed(2).replace('.', ',')}
                        </Typography>
                        <Typography variant="caption" display="block" color="text.secondary">
                            Em até 12x de R$ {(produto.preco / 12).toFixed(2).replace('.', ',')}
                        </Typography>
                        <Typography variant="caption" display="block" color="text.secondary" sx={{ mb: 2 }}>
                            R$ {(produto.preco * 0.9).toFixed(2).replace('.', ',')} à vista (10% de desconto)
                        </Typography>
                    </CardContent>

                    {/* BOX DE CONTROLES COM OPACIDADE ZERO POR PADRÃO */}
                    <Box className="controles-hover" sx={{ opacity: 0, transition: 'opacity 0.3s ease', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
                            <IconButton onClick={() => handleRemove(produto)} sx={{ bgcolor: '#cfd8dc', width: 32, height: 32, '&:hover': { bgcolor: '#b0bec5' } }}>
                                <img src={RemoveIcon} style={{ width: 14 }} alt="-" />
                            </IconButton>
                            <Box sx={{ width: 60, height: 32, border: '1px solid #e0e0e0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography sx={{ fontWeight: 500 }}>{getQuantidade(produto.id)}</Typography>
                            </Box>
                            <IconButton onClick={() => handleAdd(produto)} sx={{ bgcolor: '#cfd8dc', width: 32, height: 32, '&:hover': { bgcolor: '#b0bec5' } }}>
                                <img src={AddIcon} style={{ width: 14 }} alt="+" />
                            </IconButton>
                        </Box>
                        <Button variant="contained" fullWidth onClick={() => handleAdd(produto)} sx={{ bgcolor: '#0097D8', fontWeight: 'bold', '&:hover': { bgcolor: '#007bb2' } }}>
                            ADICIONAR
                        </Button>
                    </Box>
                </Card>
            </Grid>
        ))}
    </Grid>

    <Box mt={8} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" sx={{ mb: 3, borderBottom: '1px solid #eeeeee', pb: 1, color: '#546e7a', fontWeight: 500 }}>
            Dados do Cliente
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={5}>
                <Field name="nome" component={renderTextField} label="Nome" placeholder="Nome do cliente aqui" />
            </Grid>
            <Grid item xs={12} sm={4}>
                <Field name="email" component={renderTextField} label="Email" placeholder="Digite seu email aqui" />
            </Grid>
            <Grid item xs={12} sm={3}>
                <Field name="sexo" component={renderSelectField} label="Sexo">
                    <MenuItem value="">Selecione</MenuItem>
                    <MenuItem value="Masculino">Masculino</MenuItem>
                    <MenuItem value="Feminino">Feminino</MenuItem>
                </Field>
            </Grid>
        </Grid>
        <Box mt={6} display="flex" flexDirection="column" alignItems="flex-end">
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#546e7a', mb: 2 }}>
                Total: R$ {total.toFixed(2).replace('.', ',')}
            </Typography>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#FF9800', px: 8, py: 1.5, fontSize: '1.1rem', fontWeight: 'bold', '&:hover': { bgcolor: '#e68900' } }}>
                FINALIZAR COMPRA
            </Button>
        </Box>
    </Box>
</Container>
    );
};

const validate = values => {
    const errors = {};
    if (!values.nome) errors.nome = "Campo Obrigatório";
    if (!values.email) {
        errors.email = "Campo Obrigatório";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'E-mail inválido';
    }
    return errors;
};

export default reduxForm({
    form: "checkout",
    validate: validate,
    destroyOnUnmount: false
})(Produtos);