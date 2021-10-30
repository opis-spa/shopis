import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
// materials
import { styled } from '@mui/material/styles';
import { Card, Container } from '@mui/material';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
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
  const isMountedRef = useIsMountedRef();
  const { checkoutResult } = useSelector((state) => state.product);
  const [load, setLoad] = useState(false);

  const { url: uri, token, payment } = checkoutResult;

  return (
    <RootStyle title="Procesando pago con PayPal">
      <Container maxWidth="sm">
        <CardStyle>
          <PayPal />
        </CardStyle>
      </Container>
    </RootStyle>
  );
};

export default Payment;
