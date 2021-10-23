import React, { useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// materials
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography, Stack } from '@mui/material';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useAuth from '../../hooks/useAuth';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import { getMySales } from '../../redux/slices/sales';
// routes
import { PATH_RIFOPIS } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Raffles from '../../components/rifopis/raffles';

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(1),
  marginTop: theme.spacing(15)
}));

const StackStyle = styled(Stack)(() => ({
  justifyContent: 'flex-start'
}));

const ContentStyle = styled(Stack)(({ theme }) => ({
  justifyContent: 'flex-start',
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
  textAlign: 'left'
}));

const Profile = () => {
  const isMountedRef = useIsMountedRef();
  const dispatch = useDispatch();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { sales } = useSelector((state) => state.sale);

  const { displayName } = user;

  const handleLogout = async () => {
    try {
      await logout();
      navigate(PATH_RIFOPIS.root);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout', { variant: 'error' });
    }
  };

  useMemo(() => {
    dispatch(getMySales());
  }, [dispatch]);

  const orders = useMemo(() => {
    const raffles = new Map();
    if (sales && isMountedRef.current === true) {
      // here proccess the orders
      console.log(sales);
      sales.forEach((sale) => {
        const { details } = sale;
        if (details) {
          details.forEach((raffle) => {
            const { product } = raffle;
            const { quantity } = raffles.get(product._id) || { quantity: 0 };
            raffles.set(product._id, { ...product, quantity: raffle.quantity + quantity });
          });
        }
      });
    }
    const RafflesMap = [];
    raffles.forEach((item) => {
      console.log(' product ');
      console.log(item);
      RafflesMap.push(item);
    });
    return RafflesMap;
  }, [sales, isMountedRef]);

  return (
    <RootStyle title="Mis sorteos | rifopis">
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 4 }}>
          <Stack direction="row" alignItems="center">
            <Typography variant="h4" sx={{ color: 'common.white', fontWeight: 900 }}>
              {`Hola, ${displayName}`}
            </Typography>
            <Box
              component="img"
              src="/static/icons/ic_hand.svg"
              alt="Hola"
              sx={{ ml: 1, mb: 1, width: 35, height: 35 }}
            />
          </Stack>

          <Button color="inherit" variant="outlined" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </Stack>

        <Typography variant="h2" sx={{ color: 'primary.light', mt: 4, fontWeight: 900 }}>
          Tus sorteos vigentes
        </Typography>

        <ContentStyle spacing={2}>
          <StackStyle spacing={3} direction="column">
            {orders.map((item) => {
              const { _id } = item;
              return <Raffles key={_id} raffle={item} />;
            })}
          </StackStyle>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default Profile;
