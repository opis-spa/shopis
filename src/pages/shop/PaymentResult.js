import React, { useMemo } from 'react';
// materials
import { styled } from '@mui/material/styles';
import { Box, Button, Card, Container, Divider, Typography, Stack } from '@mui/material';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useQuery from '../../hooks/useQuery';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import { getSale } from '../../redux/slices/sales';
// components
import Page from '../../components/Page';
import ProductItemSummary from '../../components/shop/product/ProductItemSummary';
import LinkPartnership from '../../components/LinkPartnership';

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(1)
}));

const CardStyle = styled(Card)(() => ({
  boxShadow: '-2px -2px 14px rgba(255, 194, 36, 0.2)',
  border: '1px solid #936DB9',
  boxSizing: 'border-box',
  alignItems: 'center',
  textAlign: 'center'
}));

const StackStyle = styled(Stack)(() => ({
  justifyContent: 'flex-start'
}));

const ContentStyle = styled(Stack)(({ theme }) => ({
  justifyContent: 'flex-start',
  paddingLeft: theme.spacing(10),
  paddingRight: theme.spacing(10),
  paddingBottom: theme.spacing(5),
  textAlign: 'left'
}));

const Payment = () => {
  const query = useQuery();
  const isMountedRef = useIsMountedRef();
  const dispatch = useDispatch();
  const { sale } = useSelector((state) => state.sale);
  const order = query.get('order');
  const status = query.get('status');

  useMemo(() => {
    dispatch(getSale(order));
  }, [dispatch, order]);

  const products = useMemo(() => {
    if (sale && isMountedRef.current === true) {
      const { details } = sale;
      return details;
    }
    return [];
  }, [sale, isMountedRef]);

  return (
    <RootStyle title="Orden procesada">
      <Container maxWidth="sm">
        <CardStyle>
          <Stack direction="column" spacing={3}>
            <Stack direction="column" spacing={2} sx={{ alignItems: 'center', pt: 5 }}>
              <Box
                component="img"
                sx={{ width: '90%', maxWidth: 150 }}
                src="/static/illustrations/illustration-success.svg"
              />

              <Typography variant="h4" sx={{ color: 'primary.light', mt: 4, fontWeight: 900 }}>
                Listo! Hemos recibido tu orden.
              </Typography>
              <Typography variant="caption" sx={{ fontWight: 400 }}>
                Enviaremos el resumen de tu pedido y las instrucciones de los siguientes pasos a tu correo.
              </Typography>
            </Stack>

            <Box sx={{ px: (theme) => theme.spacing(10) }}>
              <Divider />
            </Box>

            <ContentStyle spacing={2}>
              <Typography variant="h5" sx={{ fontWight: 400 }}>
                Resumen de tu pedido
              </Typography>

              <StackStyle spacing={3} direction="column">
                {products.map((item) => {
                  const { _id, product, quantity, subtotal } = item;
                  return <ProductItemSummary key={_id} product={{ ...product, quantity, subtotal }} filter={false} />;
                })}
              </StackStyle>
            </ContentStyle>

            <Box sx={{ textAlign: 'center', pb: 10 }}>
              <LinkPartnership to="/">
                <Button size="large" variant="contained">
                  Seguir comprando
                </Button>
              </LinkPartnership>
            </Box>
          </Stack>
        </CardStyle>
      </Container>
    </RootStyle>
  );
};

export default Payment;
