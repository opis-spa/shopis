import React, { useMemo } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// materials
import { styled } from '@mui/material/styles';
import { Box, Card, Container, Divider, Typography, Stack } from '@mui/material';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useQuery from '../../hooks/useQuery';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import { getSale } from '../../redux/slices/sales';
// routes
import { PATH_RIFOPIS } from '../../routes/paths';
// components
import Page from '../../components/Page';
import ProductItemSummary from '../../components/rifopis/product/ProductItemSummary';
import { ButtonTicket } from '../../components/rifopis';

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

const ErrorResult = () => (
  <ContentStyle sx={{ pl: (theme) => theme.spacing(5), pr: (theme) => theme.spacing(5) }}>
    <Stack direction="row" spacing={2}>
      <Box
        component="img"
        alt="Error"
        src="/static/icons/ic_error_payment_rifopis.svg"
        sx={{ width: 114, height: 114, margin: 'auto', mt: 2 }}
      />

      <Box>
        <Typography variant="h5" sx={{ mt: 4, fontWeight: 900 }}>
          El pago no se ha podido procesar
        </Typography>
        <Typography variant="caption" sx={{ fontWight: 400 }}>
          Parece que algo ha salido mal al momento de intentar procesar el pago. Te sugerimos probar un medio diferente.
        </Typography>
      </Box>
    </Stack>
  </ContentStyle>
);

const SuccessPropTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({}))
};

const SuccessResult = ({ products }) => (
  <>
    <Stack direction="column" spacing={2}>
      <Box
        component="img"
        alt="Aprobado"
        src="/static/icons/ic_check_rifopis.png"
        sx={{ width: 114, height: 114, margin: 'auto', mt: 2 }}
      />

      <Typography variant="h4" sx={{ color: 'primary.light', mt: 4, fontWeight: 900 }}>
        Listo! Te damos la bienvenida al sorteo.
      </Typography>
      <Typography variant="caption" sx={{ fontWight: 400 }}>
        Enviaremos el resumen de tu pedido y las instrucciones de los siguientes pasos a tu correo. Te avisaremos el día
        en que se realice el sorteo.
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
          console.log(' por aqui vamos bien ');
          const { _id, product, quantity, subtotal } = item;
          return <ProductItemSummary key={_id} product={{ ...product, quantity, subtotal }} filter={false} />;
        })}
      </StackStyle>
    </ContentStyle>
  </>
);

SuccessResult.propTypes = SuccessPropTypes;

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
    <RootStyle title="Orden procesada" sx={{ backgroundColor: '#1A0033' }}>
      {status === 'COMPLETED' && (
        <Stack direction="row" sx={{ width: '100%', position: 'absolute', zIndex: 0, overflow: 'hidden' }}>
          <Box component="img" alt={status} src="/static/illustrations/ic_check_rifopis_left.png" sx={{ flex: 1 }} />
          <Box component="img" alt={status} src="/static/illustrations/ic_check_rifopis_right.png" sx={{ flex: 1 }} />
        </Stack>
      )}

      <Container maxWidth="sm">
        <CardStyle>
          <Stack direction="column" spacing={3}>
            {status === 'COMPLETED' ? <SuccessResult products={products} /> : <ErrorResult />}

            <Box sx={{ textAlign: 'center' }}>
              <ButtonTicket
                title="Ver más sorteos"
                component={RouteLink}
                to={PATH_RIFOPIS.root}
                fullWidth
                sx={{ mb: 5 }}
              />
            </Box>
          </Stack>
        </CardStyle>
      </Container>
    </RootStyle>
  );
};

export default Payment;
