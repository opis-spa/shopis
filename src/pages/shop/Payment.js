import React from 'react';
import { Navigate } from 'react-router-dom';
// materials
import { styled } from '@mui/material/styles';
import { Card, Container } from '@mui/material';
// redux
import { useSelector } from '../../redux/store';
// router
import { PATH_PAGE } from '../../routes/paths';
// components
import Page from '../../components/Page';
import PayPal from '../../components/shop/checkout/payment/methods/PayPal';
import Webpay from '../../components/shop/checkout/payment/methods/Webpay';

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

const Payment = () => {
  const { checkoutResult } = useSelector((state) => state.product);

  const { url: uri, token, payment } = checkoutResult;

  if (!token) {
    return <Navigate replace={PATH_PAGE.page500} />;
  }

  if (payment === 'webpay') {
    return (
      <RootStyle title="Procesando pago con Webpay">
        <Container maxWidth="sm">
          <CardStyle>
            <Webpay token={token} uri={uri} />
          </CardStyle>
        </Container>
      </RootStyle>
    );
  }

  if (payment === 'webpay') {
    return (
      <RootStyle title="Procesando pago con PayPal">
        <Container maxWidth="sm">
          <CardStyle>
            <PayPal token={token} />
          </CardStyle>
        </Container>
      </RootStyle>
    );
  }

  return <Navigate replace={PATH_PAGE.page500} />;
};

export default Payment;
