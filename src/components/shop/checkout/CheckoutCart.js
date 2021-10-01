import React from 'react';
import { sum } from 'lodash';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import {
  deleteProduct,
  onNextStep,
  aplicateCoupon,
  increaseQuantity,
  decreaseQuantity
} from '../../../redux/slices/product';
// routes
import { PATH_APP } from '../../../routes/paths';
//
import Scrollbar from '../../Scrollbar';
import CheckoutSummary from './CheckoutSummary';
import CheckoutProductList from './CheckoutProductList';

// ----------------------------------------------------------------------

export default function CheckoutCart() {
  const dispatch = useDispatch();
  const { list: cart, total, discount, subtotal } = useSelector((state) => state.cart);

  const handleDeleteCart = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleApplyDiscount = (value) => {
    dispatch(aplicateCoupon(value));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { products: cart },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        setSubmitting(true);
        handleNextStep();
      } catch (error) {
        console.error(error);
        setErrors(error.message);
      }
    }
  });

  const { values, handleSubmit } = formik;
  const totalItems = sum(values.products.map((item) => item.quantity));

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Card
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                      &nbsp;({totalItems} item)
                    </Typography>
                  </Typography>
                }
                sx={{ mb: 3 }}
              />
              <Scrollbar>
                <CheckoutProductList
                  formik={formik}
                  onDelete={handleDeleteCart}
                  onIncreaseQuantity={handleIncreaseQuantity}
                  onDecreaseQuantity={handleDecreaseQuantity}
                />
              </Scrollbar>
            </Card>

            <Button
              color="inherit"
              component={RouterLink}
              to={PATH_APP.root}
              startIcon={<Icon icon={arrowIosBackFill} />}
            >
              Continuar comprando
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <CheckoutSummary
              total={total}
              enableDiscount
              discount={discount}
              subtotal={subtotal}
              onApplyDiscount={handleApplyDiscount}
            />
            <Button fullWidth size="large" type="submit" variant="contained" disabled={values.products.length === 0}>
              Check Out
            </Button>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
