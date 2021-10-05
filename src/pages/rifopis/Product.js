import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-back-fill';
// material
import { styled } from '@mui/material/styles';
import { Box, Tab, Card, Grid, Divider, Skeleton, Container, Typography, Stack } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProductStore, getProduct, addCart, onGotoStep } from '../../redux/slices/product';
// hooks
import usePartnership from '../../hooks/usePartnership';
// components
import Page from '../../components/Page';
import { ProductSummary, ProductDescription, ProductDetailsCarousel } from '../../components/shop/product';
import LinkPartnership from '../../components/LinkPartnership';

// ----------------------------------------------------------------------

const TabListStyle = styled(TabList)(({ theme }) => ({
  padding: theme.spacing(0, 3),
  backgroundColor: theme.palette.background.neutral
}));

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6} lg={7}>
      <Skeleton variant="rectangular" component={Box} sx={{ width: '100%', paddingTop: '100%', borderRadius: 2 }} />
    </Grid>
    <Grid item xs={12} md={6} lg={5}>
      <Skeleton variant="circular" width={80} height={80} />
      <Skeleton variant="text" height={240} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
    </Grid>
  </Grid>
);

function Product() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('1');
  const { partnership } = usePartnership();
  const { nickname } = partnership;
  const { name } = useParams();
  const { checkout, products, product, error, isLoading } = useSelector((state) => state.product);
  const { cart } = checkout;

  useEffect(() => {
    dispatch(getProductStore(nickname));
  }, [dispatch, nickname]);

  useEffect(() => {
    if (products.length > 0) {
      dispatch(getProduct({ name }));
    }
  }, [dispatch, name, products]);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddCart = (product) => {
    dispatch(addCart({ ...product, quantity: 1 }));
  };

  const handleGotoStep = (step) => {
    onGotoStep(step);
  };

  return (
    <Page title="Producto">
      <Container>
        <Box sx={{ mt: 4, mb: 3 }}>
          <LinkPartnership to="/store">
            <Stack direction="row">
              <Icon icon={arrowIosBackFill} />
              <Typography>Seguir comprando</Typography>
            </Stack>
          </LinkPartnership>
        </Box>
        {!isLoading && product && (
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={7}>
                  <ProductDetailsCarousel product={product} />
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  <ProductSummary product={product} cart={cart} onAddCart={handleAddCart} onGotoStep={handleGotoStep} />
                </Grid>
              </Grid>
            </Card>

            <Box sx={{ my: 2 }}>
              <Grid container />
            </Box>

            <Card>
              <TabContext value={value}>
                <TabListStyle onChange={handleChangeTab}>
                  <Tab disableRipple value="1" label="Descripción" />
                </TabListStyle>
                <Divider />

                <TabPanel value="1" xs={{ whiteSpace: 'nowrap' }}>
                  <ProductDescription product={product} />
                </TabPanel>
              </TabContext>
            </Card>
          </>
        )}

        {isLoading && SkeletonLoad}

        {error && <Typography variant="h6">404 Product not found</Typography>}
      </Container>
    </Page>
  );
}

export default Product;
