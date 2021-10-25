import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import { styled } from '@mui/material/styles';
import {
  Alert,
  Box,
  Divider,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Stack,
  TextField,
  IconButton,
  InputAdornment
} from '@mui/material';
// redux
import { useDispatch } from '../../../redux/store';
import { onNextStep, createInformation } from '../../../redux/slices/product';
// hooks
import useAuth from '../../../hooks/useAuth';
// components
import { LoginForm } from '../../authentication/login';
import AuthFirebaseSocials from '../../authentication/AuthFirebaseSocial';

const CheckOutSchema = Yup.object().shape({
  type: Yup.string().required('El tipo es requerido'),
  name: Yup.string().required('Nombre es requerido'),
  lastName: Yup.string().required('Apellidos es requerido'),
  email: Yup.string()
    .required('Correo electrónico es requerido')
    .email('El formato del correo elecrónico no es correcto'),
  phone: Yup.string().required('El número de teléfono es requerido'),
  password: Yup.string().when('type', {
    is: 'register',
    then: Yup.string().required('La contraseña es requerida')
  })
});

const StackStyle = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.light}`,
  padding: theme.spacing(3),
  borderRadius: 10,
  boxSizing: 'border-box'
}));

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
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      type: 'gest',
      name: '',
      lastName: '',
      email: '',
      phone: '',
      password: ''
    },
    validationSchema: CheckOutSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        setSubmitting(true);
        if (values.type === 'gest') {
          dispatch(createInformation(values));
        } else {
          await signup({ ...values, role: 'user' });
        }
        dispatch(onNextStep());
      } catch (error) {
        setErrors({ afterSubmit: error.message });
      }
      setSubmitting(false);
    }
  });
  const { handleSubmit, values, setFieldValue, touched, errors, getFieldProps, isSubmitting, setErrors } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleError = (error) => {
    console.log(' está llegando ');
    setErrors({ errorWithSocial: error });
  };

  return (
    <StackStyle spacing={4} direction={{ xs: 'column', md: 'row', padding: 3 }}>
      <Box sx={{ flex: 1 }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Typography sx={{ mb: 2, fontWeight: 900 }}>Ingresa los siguientes datos</Typography>
            <Typography sx={{ mb: 2, fontSize: 14 }}>
              Si ganas, te contactaremos con los datos que proporciones. Por favor asegurate de ingresarlos
              correctamente
            </Typography>
            <Stack spacing={2} sx={{ mb: 5 }}>
              <Stack spacing={2} direction="row">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.type === 'gest'}
                        value="gest"
                        onChange={() => {
                          setFieldValue('type', 'gest');
                        }}
                      />
                    }
                    label="Seguir como invitado"
                  />
                </FormGroup>

                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.type === 'register'}
                        value="register"
                        onChange={() => {
                          setFieldValue('type', 'register');
                        }}
                      />
                    }
                    label="Registrarme en opis"
                  />
                </FormGroup>
              </Stack>

              {values.type === 'register' && <AuthFirebaseSocials />}

              {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

              <Stack spacing={2} direction="row">
                <TextField
                  disabled={isSubmitting}
                  variant="outlined"
                  fullWidth
                  required
                  x-id="name"
                  label="Nombres"
                  name="name"
                  type="text"
                  autoComplete="name"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={(touched.name && errors.name) || ''}
                />
                <TextField
                  disabled={isSubmitting}
                  variant="outlined"
                  fullWidth
                  required
                  x-id="lastName"
                  label="Apellidos"
                  name="lastName"
                  type="text"
                  autoComplete="name"
                  {...getFieldProps('lastName')}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={(touched.lastName && errors.lastName) || ''}
                />
              </Stack>

              <TextField
                disabled={isSubmitting}
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
                helperText={(touched.email && errors.email) || ''}
              />

              <Stack spacing={2} direction="row">
                <TextField
                  disabled={isSubmitting}
                  variant="outlined"
                  fullWidth
                  required
                  x-id="phone"
                  label="Número de teléfono"
                  name="phone"
                  type="phone"
                  autoComplete="phone"
                  {...getFieldProps('phone')}
                  error={Boolean(touched.phone && errors.phone)}
                  helperText={(touched.phone && errors.phone) || ''}
                />
              </Stack>

              {values.type === 'register' && (
                <TextField
                  disabled={isSubmitting}
                  variant="outlined"
                  fullWidth
                  required
                  x-id="password"
                  label="Contraseña"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="password"
                  {...getFieldProps('password')}
                  error={Boolean(touched.password && errors.password)}
                  helperText={(touched.password && errors.password) || ''}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword} edge="end">
                          <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              )}
            </Stack>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button disabled={isSubmitting} size="large" type="submit" variant="contained" color="primary">
                Continuar
              </Button>
            </Box>
          </Form>
        </FormikProvider>
      </Box>

      <Divider
        orientation={{ xs: 'horizontal', md: 'vertical' }}
        flexItem
        variant="middle"
        sx={{ py: { xs: 2, md: 20 }, borderColor: 'secondary.light' }}
      />

      <Box sx={{ flex: 1 }}>
        <Typography sx={{ mb: 2, fontWeight: 900 }}>O inicia sesión si ya estás registrado</Typography>
        <AuthFirebaseSocials onHasError={handleError} />
        {errors.errorWithSocial && <Alert severity="error">{errors.errorWithSocial}</Alert>}
        <LoginForm onHasError={handleError} />
      </Box>
    </StackStyle>
  );
};

CheckoutInformation.propTypes = propTypes;
CheckoutInformation.defaultProps = defaultProps;

export default CheckoutInformation;
