import { useMemo } from 'react';
import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import usePartnership from '../../../hooks/usePartnership';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { onGotoStep, onBackStep, onNextStep } from '../../../redux/slices/product';
//
import CheckoutSummary from './CheckoutSummary';
import CheckoutBillingInfo from './CheckoutBillingInfo';
import CheckoutPaymentMethods from './CheckoutPaymentMethods';

// ----------------------------------------------------------------------

export default function CheckoutPayment() {
  const dispatch = useDispatch();
  const { partnership } = usePartnership();
  const { data: payments } = useSelector((state) => state.payment);
  const { checkout } = useSelector((state) => state.product);
  const { total, discount, subtotal, shipping } = checkout;

  const PAYMENT_OPTIONS = useMemo(() => {
    const { paymentMethods } = partnership;
    return payments.filter((item) => paymentMethods.indexOf(item.id) >= 0);
  }, [partnership, payments]);

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleGotoStep = (step) => {
    dispatch(onGotoStep(step));
  };

  const PaymentSchema = Yup.object().shape({
    payment: Yup.mixed().required('La forma de pago es requerida')
  });

  const formik = useFormik({
    initialValues: {
      delivery: shipping,
      payment: ''
    },
    validationSchema: PaymentSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        handleNextStep();
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error.message);
      }
    }
  });

  const { isSubmitting, handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <CheckoutPaymentMethods formik={formik} paymentOptions={PAYMENT_OPTIONS} />
            <Button
              type="button"
              size="small"
              color="inherit"
              onClick={handleBackStep}
              startIcon={<Icon icon={arrowIosBackFill} />}
            >
              Volver
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <CheckoutBillingInfo onBackStep={handleBackStep} />
            <CheckoutSummary
              enableEdit
              total={total}
              subtotal={subtotal}
              discount={discount}
              shipping={shipping}
              onEdit={() => handleGotoStep(0)}
            />
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
              Completar orden
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
