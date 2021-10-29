import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import logOutFill from '@iconify/icons-ic/sharp-log-out';
// material
import { Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import usePartnership from '../../../hooks/usePartnership';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getBalances } from '../../../redux/slices/wallet';
import { onBackStep, proccessCheckout, clearCart, setOpenCart } from '../../../redux/slices/product';
// route
import { PATH_RIFOPIS, PATH_SHOP } from '../../../routes/paths';
// components
import CheckoutSummary from './CheckoutSummary';
import CheckoutBillingInfo from './CheckoutBillingInfo';
import CheckoutPaymentMethods from './CheckoutPaymentMethods';

// ----------------------------------------------------------------------

export default function CheckoutPayment() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { partnership } = usePartnership();
  const { data: payments } = useSelector((state) => state.payment);
  const { checkout, checkoutResult } = useSelector((state) => state.product);
  const { cart, total, discount, subtotal, shipping, isDelivery, data: customer, delivery } = checkout;

  const PAYMENT_OPTIONS = useMemo(() => {
    const { paymentMethods } = partnership;
    return payments.filter((item) =>
      paymentMethods.indexOf(item.id) >= 0 && isAuthenticated ? true : item.type !== 'opis'
    );
  }, [partnership, payments, isAuthenticated]);

  const handleBackStep = () => {
    if (!isAuthenticated) {
      dispatch(onBackStep());
    } else {
      dispatch(setOpenCart(true));
      if (partnership.nickname === 'rifopis') {
        navigate(PATH_RIFOPIS.root);
      } else {
        navigate(`/shop/${partnership.nickname}/cart`);
      }
    }
  };

  const handleLogOff = async () => {
    logout();
    dispatch(onBackStep());
  };

  const PaymentSchema = Yup.object().shape({
    payment: Yup.mixed().required('La forma de pago es requerida')
  });

  const formik = useFormik({
    initialValues: {
      partnershipID: partnership.id,
      customer,
      products: cart.map((item) => ({ id: item.id, quantity: item.quantity })),
      ...(isDelivery && { delivery }),
      payment: '',
      token: null
    },
    validationSchema: PaymentSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await dispatch(proccessCheckout(values));
      } catch (error) {
        setSubmitting(false);
        setErrors(error.message);
        enqueueSnackbar('Se produjo un error al procesar la orden, por favor intentelo más tarde', {
          variant: 'error'
        });
      }
    }
  });

  const { values, isSubmitting, handleSubmit, setSubmitting } = formik;

  useMemo(() => {
    const { success, _id, status } = checkoutResult;
    console.log(' result checkout ');
    console.log(success);
    if (success) {
      console.log(' payment ');
      console.log(values.payment);
      if (values.payment !== 'webpay') {
        setSubmitting(false);
        dispatch(clearCart());
        navigate(`${PATH_SHOP.result}?order=${_id}&status=${status}`);
      } else if (partnership.nickname === 'rifopis') {
        navigate(PATH_RIFOPIS.payment);
      } else {
        navigate(`/shop/${partnership.nickname}/checkout/payment`);
      }
    }
  }, [dispatch, navigate, checkoutResult, values.payment, setSubmitting, partnership.nickname]);

  useMemo(() => {
    if (isAuthenticated) {
      dispatch(getBalances());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              type="button"
              size="small"
              color="inherit"
              onClick={handleBackStep}
              startIcon={<Icon icon={arrowIosBackFill} />}
            >
              Volver
            </Button>

            {isAuthenticated && (
              <Button
                type="button"
                size="small"
                color="inherit"
                onClick={handleLogOff}
                endIcon={<Icon icon={logOutFill} />}
                sx={{ textTransform: 'uppercase' }}
              >
                Cerrar sesión
              </Button>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <CheckoutPaymentMethods formik={formik} paymentOptions={PAYMENT_OPTIONS} sx={{ my: 1 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <CheckoutBillingInfo onBackStep={handleBackStep} sx={{ my: 1 }} />
            <CheckoutSummary total={total} subtotal={subtotal} discount={discount} shipping={shipping} sx={{ my: 1 }} />
            <LoadingButton
              fullWidth
              disabled={values.payment === 'paypal'}
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Completar orden
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
