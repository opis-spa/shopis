import React from 'react';
// material
import { Box, Typography } from '@mui/material';
// redux
import { useSelector } from '../../../redux/store';

// ----------------------------------------------------------------------

CheckoutBillingInfo.propTypes = {};

export default function CheckoutBillingInfo() {
  // const { receiver, phone, addressType, fullAddress } = billing;
  const { checkout } = useSelector((state) => state.product);
  const { delivery: billing } = checkout;

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        {billing?.receiver}&nbsp;
        <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
          ({billing?.addressType})
        </Typography>
      </Typography>

      <Typography variant="body2" gutterBottom>
        {billing?.fullAddress}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {billing?.phone}
      </Typography>
    </Box>
  );
}
