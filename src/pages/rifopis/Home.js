import React, { useEffect } from 'react';
import { paramCase } from 'change-case';
import { Element, scroller } from 'react-scroll';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { CircularProgress, Grid, Typography, Container, Box } from '@mui/material';
// router
import { PATH_RIFOPIS } from '../../routes/paths';
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
import LandingFaqs from '../../components/rifopis/LandingFaqs';
import { MotionInView, varFadeInUp } from '../../components/animate';
import { RifopisHowWork, RifopisWinners, RifopisCart } from '../../components/rifopis';
import ProductDetail from '../../components/rifopis/product/ProductDetail';

const RootStyle = styled(Page)({
  height: '100%'
});

const ContainerStyle = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '100%',
    paddingRight: 0
  }
}));

const Home = () => {
  const { partnership, isLoading } = usePartnership();
  const isMountedRef = useIsMountedRef();
  const location = useLocation();
  const parms = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.product.checkout);
  const navigate = useNavigate();

  const handleSelect = (product, loadCart = false) => {
    const { id, name, promo } = product;
    if (loadCart) {
      const isExists = cart.find((item) => item.id === id);
      const isTreeXTwo = promo === '3x2';
      const addQuantity = isTreeXTwo ? 3 : 1;
      if (!isExists) {
        dispatch(addCart({ ...product, quantity: addQuantity }));
      }
    }
    navigate(`${PATH_RIFOPIS.raffle}/${paramCase(name)}`, { replace: true });
  };

  // effect init
  useEffect(() => {
    dispatch(getPayments());
    dispatch(getDeliveries());
  }, [dispatch]);

  // effect init
  useEffect(() => {
    if (parms && products && products.length > 0) {
      if (isMountedRef.current === true) {
        const { name } = parms;
        dispatch(getProduct({ name }));
      }
    }
  }, [dispatch, parms, products, isMountedRef]);

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
      <CarouselRifopis onSelectProduct={(product) => handleSelect(product, true)} />
      <ContainerStyle maxWidth="lg">
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
                      <Typography variant="h2" sx={{ m: 2, color: 'text.primary', textTransform: 'uppercase' }}>
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
            <Grid item xs={12}>
              <MotionInView variants={varFadeInUp}>
                <LandingFaqs />
              </MotionInView>
            </Grid>
          </Grid>
        </Element>
      </ContainerStyle>
    </RootStyle>
  );
};

export default Home;
