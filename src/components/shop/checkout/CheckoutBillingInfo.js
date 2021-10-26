import React, { useMemo } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Card, Typography, CardHeader, CardContent, Stack } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// redux
import { useSelector } from '../../../redux/store';

// ----------------------------------------------------------------------

const CardStyle = styled(Card)(() => ({
  boxShadow: '-2px -2px 14px rgba(255, 194, 36, 0.2)',
  border: '1px solid #936DB9',
  boxSizing: 'border-box',
  alignItems: 'center',
  textAlign: 'left'
}));

CheckoutBillingInfo.propTypes = {};

export default function CheckoutBillingInfo({ ...other }) {
  const { isAuthenticated, user } = useAuth();
  const { checkout } = useSelector((state) => state.product);
  const { data: billing } = checkout;

  const customer = useMemo(() => {
    if (isAuthenticated) {
      return user;
    }
    return billing;
  }, [isAuthenticated, user, billing]);

  return (
    <CardStyle sx={{ my: 3 }} {...other}>
      <CardHeader title="Tus datos" />

      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          {customer?.name}&nbsp;{customer?.lastName}
        </Typography>

        <Stack direction="column">
          <Typography variant="body2">{customer?.email}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {customer?.phone}
          </Typography>
        </Stack>
      </CardContent>
    </CardStyle>
  );
}
