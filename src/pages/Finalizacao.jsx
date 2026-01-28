import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset } from 'redux-form';
import purchaseImg from "../assets/produtos/purchase.png";
import { resetarCarrinho } from '../redux/reducers';

function Finalizacao() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const nomeCliente = useSelector((state) => state.form?.checkout?.values?.nome || "Cliente");
    const total = useSelector((state) => state.carrinho.total || 0);

    const handleNovaCompra = () => {
        dispatch(resetarCarrinho());
        dispatch(reset('checkout'));
        navigate('/');
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{ backgroundColor: '#f5f7f9' }}
        >
            <Container maxWidth="xs">
                <Paper
                    elevation={0}
                    sx={(theme) => {
                        return {
                            p: 5, textAlign: 'center', borderRadius: 2, boxShadow: '0px 4px 20px rgba(0,0,0,0.08)',
                            [theme.breakpoints.down('mb')]: {bgcolor:'white'}
                        }
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" sx={{ color: '#455a64', mb: 1 }}>
                        {nomeCliente},
                    </Typography>

                    <Typography variant="body1" sx={(theme) => {
                        return {
                            mb: 4, color: '#78909c',
                            [theme.breakpoints.down('md')]: {fontSize: '0.73rem', fontWeight: "bold"} 
                        }
                    }}>
                        Sua compra no valor de <strong style={{ color: '#0097D8' }}>
                            R$ {total.toFixed(2).replace('.', ',')}
                        </strong> foi finalizada com sucesso
                    </Typography>

                    <Box sx={{ mb: 5, display: 'flex', justifyContent: 'center' }}>
                        <img
                            src={purchaseImg}
                            alt="Sucesso"
                            style={{ width: '150px', height: 'auto' }}
                        />
                    </Box>

                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={handleNovaCompra}
                        sx={(theme) => {
                            return {
                                backgroundColor: '#FF9800',
                                fontWeight: 'bold',
                                py: 1.5,
                                '&:hover': { backgroundColor: '#e68900' },
                                [theme.breakpoints.down('md')]: {fontSize: '0.7rem', fontWeight: 'bold'}
                            }
                        }}
                    >
                        INICIAR NOVA COMPRA
                    </Button>
                </Paper>
            </Container>
        </Box>
    );
}

export default Finalizacao;