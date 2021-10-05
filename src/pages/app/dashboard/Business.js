import React, { useEffect } from 'react';
// material
import { Container, Grid } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// redux
import { useDispatch } from '../../../redux/store';
import { getBalance } from '../../../redux/slices/wallet';
import { getAnaliticys } from '../../../redux/slices/dashboard';
// components
import Page from '../../../components/Page';
import {
  EcommerceWelcome,
  EcommerceProductSold,
  EcommerceTotalOrders,
  EcommerceTotalSales,
  EcommerceYearlySales,
  EcommerceLastOrders,
  EcommerceCurrentBalance
} from '../../../components/dashboard';

// ----------------------------------------------------------------------

export default function Business() {
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const { themeStretch } = useSettings();

  useEffect(() => {
    if (isMountedRef.current) {
      dispatch(getBalance());
      dispatch(getAnaliticys());
    }
  }, [dispatch, isMountedRef]);

  return (
    <Page title="Dashboard | shopis">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <EcommerceCurrentBalance />
          </Grid>

          <Grid item xs={12} md={8}>
            <EcommerceWelcome />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceProductSold />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceTotalOrders />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceTotalSales />
          </Grid>

          <Grid item xs={12}>
            <EcommerceYearlySales />
          </Grid>

          <Grid item xs={12}>
            <EcommerceLastOrders />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
