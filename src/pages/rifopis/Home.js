import React, { useEffect } from 'react';
import { paramCase } from 'change-case';
import { Element, scroller } from 'react-scroll';
import { useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { CircularProgress, Grid, Typography, Container, Box } from '@mui/material';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
import usePartnership from '../../hooks/usePartnership';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProductStore, getProduct, addCart } from '../../redux/slices/product';
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

const RootStyle = styled(Page)({
  height: '100%'
});

const Home = () => {
  const { partnership, isLoading } = usePartnership();
  const isMountedRef = useIsMountedRef();
  const location = useLocation();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.product.checkout);

  const handleSelect = (product) => {
    const { id, name, promo } = product;
    const isExists = cart.find((item) => item.id === id);
    const isTreeXTwo = promo === '3x2';
    const addQuantity = isTreeXTwo ? 3 : 1;
    if (!isExists) {
      dispatch(addCart({ ...product, quantity: addQuantity }));
    }
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

  useEffect(() => {
    const { hash } = location;
    if (isMountedRef.current === true) {
      if (hash) {
        // Somewhere else, even another file
        scroller.scrollTo(hash.replace('#', ''), {
          duration: 1500,
          delay: 100,
          smooth: true,
          offset: 50 // Scrolls to element + 50 pixels down the page
        });
      }
    }
  }, [isMountedRef, location]);

  return (
    <RootStyle title={partnership.name}>
      <ProductDetail />
      <RifopisCart />
      <CarouselRifopis onSelectProduct={handleSelect} />
      <Container maxWidth="lg">
        <Element name="sorteos">
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
        </Element>
      </Container>
    </RootStyle>
  );
};

export default Home;
