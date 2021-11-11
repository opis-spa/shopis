import React, { useEffect } from 'react';
// material
import { CircularProgress, Grid, Typography, Container, Box } from '@mui/material';
// hooks
import usePartnership from '../../hooks/usePartnership';
// redux
import { useDispatch } from '../../redux/store';
import { getProductStore } from '../../redux/slices/product';
import { getCategories } from '../../redux/slices/category';
import { getPayments } from '../../redux/slices/payment';
import { getDeliveries } from '../../redux/slices/delivery';
// components
import Page from '../../components/Page';
import ProductList from '../../components/shop/product/ProductList';
import { MotionInView, varFadeInUp } from '../../components/animate';

const Home = () => {
  const { partnership, isLoading } = usePartnership();
  const dispatch = useDispatch();
  // effects
  useEffect(() => {
    if (partnership) {
      const { nickname } = partnership;
      if (nickname) {
        dispatch(getProductStore(nickname));
        dispatch(getCategories(nickname));
      }
    }
  }, [dispatch, partnership]);

  useEffect(() => {
    dispatch(getPayments());
    dispatch(getDeliveries());
  }, [dispatch]);

  return (
    <Page title={partnership.name}>
      <Grid>
        {isLoading ? (
          <Grid item xs={12} style={{ textAlign: 'center', paddingTop: 20, paddingBottom: 20 }}>
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <Grid item xs={12}>
              <Box sx={{ p: 5, mt: 5, textAlign: 'center' }}>
                <MotionInView variants={varFadeInUp}>
                  <Typography variant="h3" sx={{ mb: 3 }}>
                    Nuestros productos
                  </Typography>
                </MotionInView>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Container>
                <ProductList view="module" max={4} isLoad={false} />
              </Container>
            </Grid>
          </>
        )}
      </Grid>
    </Page>
  );
};

export default Home;
