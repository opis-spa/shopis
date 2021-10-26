import React, { useEffect } from 'react';
import { paramCase } from 'change-case';
// material
import { CircularProgress, Grid, Typography, Container, Box } from '@mui/material';
// hooks
import usePartnership from '../../hooks/usePartnership';
// redux
import { useDispatch } from '../../redux/store';
import { getProductStore, getProduct } from '../../redux/slices/product';
import { getCategories } from '../../redux/slices/category';
import { getPayments } from '../../redux/slices/payment';
import { getDeliveries } from '../../redux/slices/delivery';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import CarouselRifopis from '../../components/carousel/CarouselRifopis';
import ProductList from '../../components/rifopis/product/ProductList';
import { MotionInView, varFadeInUp } from '../../components/animate';
import { RifopisHowWork, RifopisWinners, RifopisCart } from '../../components/rifopis';
import ProductDetail from '../../components/rifopis/product/ProductDetail';

const Home = () => {
  const { partnership, isLoading } = usePartnership();
  const dispatch = useDispatch();

  const handleSelect = (product) => {
    const { name } = product;
    dispatch(getProduct({ name: paramCase(name) }));
  };

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
      <ProductDetail />
      <CarouselRifopis onSelectProduct={handleSelect} />
      <RifopisCart />
      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ mb: 10 }}>
          {isLoading ? (
            <Grid item xs={12} style={{ textAlign: 'center', paddingTop: 20, paddingBottom: 20 }}>
              <CircularProgress />
            </Grid>
          ) : (
            <Box sx={{ position: 'relative', mt: -15, width: '100%' }}>
              <Grid item xs={12}>
                <Box>
                  <MotionInView variants={varFadeInUp}>
                    <Typography variant="h2" sx={{ my: 2, color: 'text.primary', textTransform: 'uppercase' }}>
                      Sorteos Vigentes
                    </Typography>
                  </MotionInView>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Scrollbar style={{ maxWidth: '100%' }}>
                  <ProductList view="module" max={4} isLoad={false} onSelectProduct={handleSelect} />
                </Scrollbar>
              </Grid>
            </Box>
          )}
          <Grid item xs={12}>
            <MotionInView variants={varFadeInUp}>
              <RifopisHowWork />
            </MotionInView>
          </Grid>
          <Grid item xs={12}>
            <MotionInView variants={varFadeInUp}>
              <RifopisWinners />
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Home;
