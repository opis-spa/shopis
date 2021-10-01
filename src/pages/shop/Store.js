import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
// material
import { Container, CircularProgress, Grid, Stack } from '@mui/material';
// hooks
import usePartnership from '../../hooks/usePartnership';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import { getCategories } from '../../redux/slices/category';
import { getProductStore, filterProducts, clearFilterProducts } from '../../redux/slices/product';
import { getSale } from '../../redux/slices/sales';
// components
import Page from '../../components/Page';
import ProductList from '../../components/shop/product/ProductList';
import { ShopFilterSidebar, ShopProductSort } from '../../components/shop';

const Store = () => {
  const { partnership } = usePartnership();
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);
  const { result, orderID } = useParams();
  const { nickname, name } = partnership || { nickname: '', name: '' };
  const [openFilter, setOpenFilter] = useState(false);
  const formik = useFormik({
    initialValues: {
      gender: [],
      category: [],
      colors: [],
      priceRange: [],
      rating: []
    },
    onSubmit: () => {}
  });
  const { values } = formik;
  const proccessCheckoutResult = (resultStatus, orderId) => {
    if (resultStatus && orderId) {
      dispatch(getSale(orderId));
      // setStep(resultStatus === 'complete' ? 4 : 6);
      return true;
    }
    return false;
  };
  const handleResetFilter = () => {
    dispatch(clearFilterProducts());
  };
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  // effects
  useEffect(() => {
    if (nickname) {
      dispatch(getCategories(nickname));
      dispatch(getProductStore(nickname));
    }
  }, [dispatch, nickname]);

  useEffect(() => {
    if (nickname) {
      // esperamos a que el cliente sea cargado antes de procesarlo.
      proccessCheckoutResult(result, orderID);
    }
    // eslint-disable-next-line
  }, [nickname, result, orderID]);

  useEffect(() => {
    dispatch(filterProducts(values));
  }, [dispatch, values]);

  return (
    <Page title={name}>
      <Container>
        <Grid container>
          {!isLoading ? (
            <>
              <Grid item xs={12}>
                <Stack direction="row" flexWrap="wrap" alignItems="center" justifyContent="flex-start" sx={{ mb: 5 }}>
                  <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                    <ShopFilterSidebar
                      formik={formik}
                      isOpenFilter={openFilter}
                      onResetFilter={handleResetFilter}
                      onOpenFilter={handleOpenFilter}
                      onCloseFilter={handleCloseFilter}
                    />
                    <ShopProductSort />
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} />
              <Grid item xs={12}>
                <ProductList view="module" products={products.list} isLoad={false} />
              </Grid>
            </>
          ) : (
            <Grid item xs={12} style={{ textAlign: 'center', paddingTop: 20, paddingBottom: 20 }}>
              <CircularProgress />
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
};

export default Store;
