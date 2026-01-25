import React, { useState } from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button, TextField, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adicionarItem, salvarDadosCliente } from "../redux/reducers";

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
import ArrowIcon from "../assets/produtos/baseline-arrow_drop_down-24px.svg"

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

function Produtos(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const total = useSelector((state) => state.carrinho?.total || 0);
    const [cliente, setCliente] = useState({ nome: '', email: '', sexo: ''});

    const handleAdd = (produto) => {
        dispatch(adicionarItem({ ...produto, quantidade: 1, subtotal: produto.preco}));
    };

    const handleRemove = (produto) => {
        dispatch({ type: 'carrinho/removerItem', payload: produto.id });
    };

    const handleChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const handleFinalizar = () => {
        dispatch(salvarDadosCliente(cliente));
        navigate('/finalizacao');
    };

    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>Produtos</Typography>
            <Grid container spacing={3}>
                {produtos.map((produto) => (
                    <Grid item xs={12} sm={6} md={3} key={produto.id}>
                        <Card>
                            <CardMedia component="img" height="180" image={produto.imagem} alt={produto.nome}/>
                                <CardContent>
                                    <Typography variant="h6">{produto.nome}</Typography>
                                    <Typography>R$ {produto.preco.toFixed(2)}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Em até 12x de R$ {(produto.preco / 12).toFixed(2)} <br/>
                                        R$ {(produto.preco * 0.9).toFixed(2)} À vista (10% off)
                                    </Typography>
                                </CardContent>
                                <Box display="flex" justifyContent="space-between" p={2}>
                                    <Button
                                        variant = "contained"
                                        startIcon = {<img src={AddIcon} alt="" style={{ width: 20 }} />}
                                        onClick = {() => handleAdd(produto)}
                                    >
                                        ADICIONAR
                                    </Button>
                                    <Button
                                        variant = "outlined"
                                        color = "error"
                                        startIcon = {<img src={RemoveIcon} alt="" style={{ width: 20 }} />}
                                        onClick = {() => handleRemove(produto)}
                                    >
                                        REMOVER
                                    </Button>
                                </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box mt={5} component="form">
                <Typography variant="h5" gutterBottom>Dados do Cliente</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField label="Nome" name="nome" value={cliente.nome} onChange={handleChange} fullWidth required/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField label="Email" name="email" value={cliente.email} onChange={handleChange} fullWidth required/>
                    </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField label="Sexo" name="sexo" value={cliente.sexo} onChange={handleChange} select fullWidth>
                                <MenuItem value="Feminino">Feminino</MenuItem>
                                <MenuItem value="Masculino">Masculino</MenuItem>
                                <MenuItem value="Outro">Outro</MenuItem>
                            </TextField>
                        </Grid>
                </Grid>
                <Box mt={4} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Total: R$ {total.toFixed(2)}</Typography>
                    <Button
                        variant = "contained"
                        color = "success"
                        onClick = {handleFinalizar}
                        disabled = {!cliente.nome || !cliente.email} 
                    >
                        FINALIZAR COMPRA
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Produtos;