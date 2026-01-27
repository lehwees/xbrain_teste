import { Box, Button, Card, CardMedia, Container, Grid, IconButton, MenuItem, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Field, reduxForm } from 'redux-form';
import { adicionarItem, removerItem } from "../redux/reducers.js";

import produto01 from "../assets/produtos/produto-01.jpeg";
import produto02 from "../assets/produtos/produto-02.jpeg";
import produto03 from "../assets/produtos/produto-03.jpeg";
import produto04 from "../assets/produtos/produto-04.jpeg";
import produto05 from "../assets/produtos/produto-05.jpeg";
import produto06 from "../assets/produtos/produto-06.jpeg";
import produto07 from "../assets/produtos/produto-07.jpeg";
import produto08 from "../assets/produtos/produto-08.jpeg";

const produtos = [
  { id: 1, nome: 'AirPods Apple Fones de ouvido', preco: 1499, imagem: produto01 },
  { id: 2, nome: 'Capa de Silicone Iphone 8/7 cor Areia -Rosa', preco: 299, imagem: produto02 },
  { id: 3, nome: 'Apple Pencil', preco: 729, imagem: produto03 },
  { id: 4, nome: 'Magic Mouse 2 - Prateado', preco: 549, imagem: produto04 },
  { id: 5, nome: 'Caixa prateada de Aluminio com pulseira esportiva branca', preco: 2899, imagem: produto05 },
  { id: 6, nome: 'Cabo Lightning para USB (1m)', preco: 149, imagem: produto06 },
  { id: 7, nome: 'Smart Keyborad Ipad Pro 12,9 polegadas - inglês (EUA)', preco: 1099, imagem: produto07 },
  { id: 8, nome: 'Carregador USB de 5W Apple', preco: 149, imagem: produto08 },
];

const renderTextField = ({ input, label, placeholder, meta: { touched, error }, ...custom }) => (
  <TextField
    label={label}
    placeholder={placeholder}
    fullWidth
    required
    error={touched && !!error}
    helperText={touched && error}
    variant="outlined"
    {...input}
  />
);

const renderSelectField = ({ input, label, meta: { touched, error }, children }) => (
  <TextField
    select
    label={label}
    fullWidth
    error={touched && !!error}
    helperText={touched && error}
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
    navigate('/finalizacao');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8, bgcolor: '#fff' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" sx={{ mb: 3, borderBottom: '1px solid #eeeeee', pb: 1, color: '#546e7a', fontWeight: 500 }}>
          Produtos
        </Typography>
        <Grid container spacing={3}>
          {produtos.map((p) => (
            <Grid item xs={12} sm={6} md={3} key={p.id}>
              <Card
                elevation={0}
                sx={{
                  textAlign: 'left', p: 2,
                  height: 330, maxWidth: 280, margin: '0 auto', borderRadius: '12px',
                  position: 'relative', overflow: 'hidden', transition: 'all 0.3s ease',
                  border: '1px solid transparent',
                  '&:hover': {
                    border: '1px solid #e0e0e0',
                    boxShadow: '0px 8px 25px rgba(0,0,0,0.1)',
                    '& .texto-estatico': { opacity: 0 },
                    '& .veu-info': { transform: 'translateY(0)' }
                  }
                }}
              >
                <CardMedia component="img" image={p.imagem} sx={{ height: 180, objectFit: 'contain', mb: 1 }} />
                <Box className="texto-estatico" sx={{ mt: 1, transition: 'opacity 0.2s ease' }}>
                  <Typography variant="body1" sx={{ color: '#666', fontWeight: 500, minHeight: '45px' }}>
                    {p.nome}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mt: 1 }}>
                    R$ {p.preco.toFixed(2).replace('.', ',')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Em até 12x de R$ {(p.preco / 12).toFixed(2).replace('.', ',')}
                  </Typography>
                </Box>
                <Box
                  className="veu-info"
                  sx={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: '65%',
                    bgcolor: 'rgba(255, 255, 255, 0.88)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center',
                    p: 2, transform: 'translateY(100%)', transition: 'transform 0.4s ease-in-out',
                    zIndex: 2,
                    opacity: 0.8
                  }}
                >
                  <Typography variant="body1" sx={{ color: '#333', fontWeight: 'bold', mb: 0.5 }}>{p.nome}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000' }}>R$ {p.preco.toFixed(2).replace('.', ',')}</Typography>
                  <Typography variant="body2" sx={{ color: '#444', fontWeight: 500 }}>
                    Em até 12x de R$ {(p.preco / 12).toFixed(2).replace('.', ',')}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#757677', fontWeight: 'bold', mb: 2 }}>
                    R$ {(p.preco * 0.9).toFixed(2).replace('.', ',')} à vista (10% OFF)
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <IconButton type="button" onClick={() => handleRemove(p)} sx={{ bgcolor: '#afb1b3', width: 35, height: 35 }}>-</IconButton>
                    <Box sx={{ width: 150, height: 35, border: '1px solid #ddd', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fff' }}>
                      <Typography sx={{ fontWeight: 'bold' }}>{getQuantidade(p.id)}</Typography>
                    </Box>
                    <IconButton type="button" onClick={() => handleAdd(p)} sx={{ bgcolor: '#afb1b3', width: 35, height: 35 }}>+</IconButton>
                  </Box>
                  <Button type="button" variant="contained" fullWidth onClick={() => handleAdd(p)} sx={{ bgcolor: '#0097D8', fontWeight: 'bold', py: 1.2 }}>
                    ADICIONAR
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 5, width: '100%' }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#546e7a', borderBottom: '1px solid #eee', pb: 1 }}>
            Dados do Cliente
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={5}>
              <Field name="nome" component={renderTextField} label="Nome" placeholder="Nome do cliente aqui" />
            </Grid>

            <Grid item xs={12} sm={6} md={5}>
              <Field name="email" component={renderTextField} label="Email" placeholder="Digite seu email aqui" />
            </Grid>

            <Grid item xs={12} sm={3} md={2}>
              <Field name="sexo" component={renderSelectField} label="Sexo" variant="outlined" size="small">
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Feminino">Feminino</MenuItem>
              </Field>
            </Grid>
          </Grid>
          <Box gap={1} mt={5} display="flex" flexDirection="column" alignItems="flex-end">
            <Typography variant="body2" sx={(theme) => {
              return {
                fontWeight: 'bold', color: '#546e7a', fontSize: '2rem',
                [theme.breakpoints.down('md')]: { fontSize: '1.4rem' }
              }
            }}>
              Total: R$ {total.toFixed(2).replace('.', ',')}
            </Typography>
            <Button
              type="submit"
              variant="contained"
              sx={(theme) => {
                return {
                  bgcolor: '#FF9800', px: 5, py: 1.2, fontSize: '1.1rem', fontWeight: 'bold',
                  [theme.breakpoints.down('md')]: { fontSize: '0.8rem' }
                }
              }}
            >
              FINALIZAR COMPRA
            </Button>
          </Box>
        </Box>
      </form>
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