import React, { useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Container, Typography, FormHelperText, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { decreaseQuantity, deleteCart, increaseQuantity, getCart } from '../../redux/slices/product';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
import usePartnership from '../../hooks/usePartnership';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import EmptyContent from '../../components/shop/cart/EmptyContent';
import ProductList from '../../components/shop/cart/ProductList';
import Summary from '../../components/shop/cart/Summary';
import LinkParnership from '../../components/LinkParnership';
// utils
import { fCurrency } from '../../utils/formatNumber';

const BoxStyle = styled(Stack)(() => ({
  display: 'flex',
  flex: 1,
  alignItems: 'flex-end'
}));

// ----------------------------------------------------------------------

export default function EcommerceCheckout() {
  const { themeStretch } = useSettings();
  const { partnership } = usePartnership();
  const isMountedRef = useIsMountedRef();
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.product);
  const { cart } = checkout;

  const isEmpty = cart.length === 0;

  useEffect(() => {
    if (isMountedRef.current) {
      dispatch(getCart(cart));
    }
  }, [dispatch, isMountedRef, cart]);

  const handleDeleteProduct = (id) => {
    dispatch(deleteCart(id));
  };

  const handleIncrementCart = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseCart = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { products: cart },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        setSubmitting(true);
      } catch (error) {
        console.error(error);
        setErrors(error.message);
      }
    }
  });

  const { handleSubmit } = formik;

  return (
    <Page title={`Tu carrito - ${partnership.name}`}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Container maxWidth={themeStretch ? false : 'lg'}>
            <Typography variant="h4" gutterBottom>
              Carrito de compra
            </Typography>

            <LinkParnership to="/store">
              <Icon icon={arrowIosBackFill} />
              <Typography component="span">Seguir comprando</Typography>
            </LinkParnership>

            {isEmpty ? (
              <EmptyContent
                title="Tu carrito está actualmente vacío"
                description=""
                img="/static/illustrations/illustration_empty_cart.svg"
              />
            ) : (
              <Scrollbar>
                <ProductList
                  formik={formik}
                  onDelete={handleDeleteProduct}
                  onIncreaseQuantity={handleIncrementCart}
                  onDecreaseQuantity={handleDecreaseCart}
                />
                <BoxStyle>
                  <Summary checkout={checkout} preview />

                  <LinkParnership
                    to="/checkout"
                    variant="contained"
                    color="primary"
                    disabled={checkout.subtotal === 0 || checkout.subtotal < partnership.deliveryAmountMin}
                  >
                    FINALIZAR PEDIDO
                  </LinkParnership>
                  {checkout.subtotal < partnership.deliveryAmountMin === true && (
                    <FormHelperText error style={{ textAlign: 'center' }}>
                      {`El  monto minimo de compra es de ${fCurrency(partnership.deliveryAmountMin)}`}
                    </FormHelperText>
                  )}
                </BoxStyle>
              </Scrollbar>
            )}
          </Container>
        </Form>
      </FormikProvider>
    </Page>
  );
}
