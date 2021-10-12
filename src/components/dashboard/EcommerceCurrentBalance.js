import React, { useState } from 'react';
// redux
import { useSelector } from 'react-redux';
// material
import { Button, Card, Typography, Stack, CircularProgress } from '@mui/material';
// components
import WithDrawBalance from './WithDrawBalance';
// utils
import { fCurrency } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

export default function EcommerceCurrentBalance() {
  const { isLoading, balance } = useSelector((state) => state.wallet);
  const [open, setOpen] = useState(false);

  const handleRequest = () => {};
  const handleWithDraw = () => {
    setOpen(true);
  };

  return (
    <>
      <WithDrawBalance open={open} onClose={() => setOpen(false)} />
      <Card sx={{ p: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Balance
        </Typography>

        <Stack spacing={2}>
          {isLoading ? <CircularProgress /> : <Typography variant="h3">{fCurrency(balance?.amount)}</Typography>}

          <Stack direction={{ xs: 'row', md: 'row', lg: 'column' }} spacing={1.5} justifyContent="flex-end">
            <Button fullWidth variant="contained" onClick={handleRequest}>
              Recibir
            </Button>
            <Button fullWidth variant="outlined" onClick={handleWithDraw}>
              Retirar
            </Button>
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
