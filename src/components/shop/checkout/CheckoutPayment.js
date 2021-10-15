import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import usePartnership from '../../../hooks/usePartnership';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { onBackStep, onNextStep, proccessCheckout } from '../../../redux/slices/product';
// route
import { PATH_RIFOPIS } from '../../../routes/paths';
// components
import CheckoutSummary from './CheckoutSummary';
import CheckoutBillingInfo from './CheckoutBillingInfo';
import CheckoutPaymentMethods from './CheckoutPaymentMethods';

// ----------------------------------------------------------------------

export default function CheckoutPayment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { partnership } = usePartnership();
  const { data: payments } = useSelector((state) => state.payment);
  const { checkout, checkoutResult } = useSelector((state) => state.product);
  const { cart, total, discount, subtotal, shipping, isDelivery, data: customer, delivery } = checkout;

  const PAYMENT_OPTIONS = useMemo(() => {
    const { paymentMethods } = partnership;
    return payments.filter((item) => paymentMethods.indexOf(item.id) >= 0);
  }, [partnership, payments]);

  const handleBackStep = () => {
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
      payment: ''
    },
    validationSchema: PaymentSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await dispatch(proccessCheckout(values));
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error.message);
      }
    }
  });

  const { values, isSubmitting, handleSubmit, setSubmitting } = formik;

  useMemo(() => {
    const { success } = checkoutResult;
    if (success) {
      if (values.payment !== 'webpay') {
        setSubmitting(false);
        dispatch(onNextStep());
      } else if (partnership.nickname === 'rifopis') {
        navigate(PATH_RIFOPIS.payment);
      } else {
        navigate(`/shop/${partnership.nickname}/checkout/payment`);
      }
    }
  }, [dispatch, navigate, checkoutResult, values.payment, setSubmitting, partnership.nickname]);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Button
              type="button"
              size="small"
              color="inherit"
              onClick={handleBackStep}
              startIcon={<Icon icon={arrowIosBackFill} />}
            >
              Volver
            </Button>
            <CheckoutPaymentMethods formik={formik} paymentOptions={PAYMENT_OPTIONS} />
          </Grid>

          <Grid item xs={12} md={4}>
            {isDelivery && <CheckoutBillingInfo onBackStep={handleBackStep} />}
            <CheckoutSummary total={total} subtotal={subtotal} discount={discount} shipping={shipping} />
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
