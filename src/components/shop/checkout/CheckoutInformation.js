import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouteLink } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Grid, Button, Link, Typography, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { onNextStep } from '../../../redux/slices/product';
// components
import FormData from '../cart/FormData';
import LogoOpis from '../../LogoOpis';

const CheckOutSchema = Yup.object().shape({
  identity: Yup.string().required('El RUT es requerido'),
  name: Yup.string().required('Nombre es requerido'),
  phone: Yup.string().required('Teléfono es requerido'),
  email: Yup.string()
    .required('Correo electrónico es requerido')
    .email('El formato del correo elecrónico no es correcto'),
  type: Yup.string().required('El tipo de entrega es requerido'),
  address: Yup.string().when('type', {
    is: 'delivery',
    then: Yup.string().required('La dirección es requerida')
  })
});

const propTypes = {
  loading: PropTypes.bool,
  cart: PropTypes.object,
  onUpdateCart: PropTypes.func,
  onProcessCheckout: PropTypes.func,
  onLoading: PropTypes.func
};

const defaultProps = {
  loading: false,
  onUpdateCart: () => {},
  onProcessCheckout: () => {},
  onLoading: () => {}
};

const CheckoutInformation = () => {
  const dispatch = useDispatch();
  const { checkout, isLoading } = useSelector((state) => state.product);
  const { cart } = checkout;
  const { deliveryAmountMin, deliveryCost } = useSelector((state) => state.store);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      identity: '',
      name: '',
      phone: '',
      email: '',
      type: '',
      address: '',
      payment: ''
    },
    validationSchema: CheckOutSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        setSubmitting(true);
        await handleSignUp(values, setErrors);
      } catch (err) {
        setErrors(err.message);
      }
      setSubmitting(false);
    }
  });
  const { handleSubmit, isSubmitting, values } = formik;
  const handleSignUp = async (values, setErrors) => {
    const { identity, name, phone, email, password } = values;
    dispatch(onNextStep());
  };

  useEffect(() => {
    const handleLoading = (value) => {};
    handleLoading(isSubmitting);
  }, [isSubmitting]);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Stack direction="row" alignItems="center">
            <Typography color="textSecondary" variant="body2">
              ¿Ya tienes una cuenta&nbsp;
            </Typography>
            <LogoOpis />
            <Typography color="textSecondary" variant="body2">
              ?&nbsp;
            </Typography>

            <Link to="/auth/login" component={RouteLink}>
              Iniciar Sesión
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <FormData formik={formik} loading={isLoading} />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
            Continuar con el envío
          </Button>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

CheckoutInformation.propTypes = propTypes;
CheckoutInformation.defaultProps = defaultProps;

export default CheckoutInformation;
