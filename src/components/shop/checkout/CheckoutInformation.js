import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouteLink } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Grid, Button, Link, Typography, Stack, TextField } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { onNextStep, createInformation } from '../../../redux/slices/product';
// components
import LinkPartnership from '../../LinkPartnership';
import LogoOpis from '../../LogoOpis';

const CheckOutSchema = Yup.object().shape({
  name: Yup.string().required('Nombre es requerido'),
  email: Yup.string()
    .required('Correo electrónico es requerido')
    .email('El formato del correo elecrónico no es correcto')
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
  const { isLoading } = useSelector((state) => state.product);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      email: ''
    },
    validationSchema: CheckOutSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        setSubmitting(true);
        dispatch(createInformation(values));
        dispatch(onNextStep());
      } catch (err) {
        setErrors(err.message);
      }
      setSubmitting(false);
    }
  });
  const { handleSubmit, touched, errors, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid item xs={12} display="flex" sx={{ mb: 4 }}>
          <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
            <LinkPartnership to="/cart">Volver</LinkPartnership>

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
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ mb: 2 }}>Información de contacto</Typography>
          <Stack spacing={2} sx={{ mb: 5 }}>
            <TextField
              disabled={isLoading}
              variant="outlined"
              fullWidth
              required
              x-id="name"
              label="Nombre y Apellido"
              name="name"
              type="text"
              autoComplete="name"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={(touched.name && errors.name) || ''}
            />
            <TextField
              disabled={isLoading}
              variant="outlined"
              fullWidth
              required
              x-id="email"
              label="Correo electrónico"
              name="email"
              type="email"
              autoComplete="email"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
              Continuar con el envío
            </Button>
          </Stack>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

CheckoutInformation.propTypes = propTypes;
CheckoutInformation.defaultProps = defaultProps;

export default CheckoutInformation;
