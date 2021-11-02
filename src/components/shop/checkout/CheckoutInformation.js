import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { styled, useTheme } from '@mui/material/styles';
import {
  Alert,
  Box,
  Card,
  Divider,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  useMediaQuery
} from '@mui/material';
// redux
import { useDispatch } from '../../../redux/store';
import { onNextStep, createInformation, setOpenCart } from '../../../redux/slices/product';
// hooks
import usePartnership from '../../../hooks/usePartnership';
import useAuth from '../../../hooks/useAuth';
// router
import { PATH_RIFOPIS } from '../../../routes/paths';
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

const CardStyle = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.light}`,
  padding: theme.spacing(3),
  borderRadius: 10,
  boxSizing: 'border-box',
  boxShadow: 'none'
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
  const navigate = useNavigate();
  const theme = useTheme();
  const { partnership } = usePartnership();
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
    setErrors({ errorWithSocial: error });
  };

  const handleBackStep = () => {
    dispatch(setOpenCart(true));
    if (partnership.nickname === 'rifopis') {
      navigate(PATH_RIFOPIS.root);
    } else {
      navigate(`/shop/${partnership.nickname}/cart`);
    }
  };

  const isMobile = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <Button
        type="button"
        size="small"
        color="inherit"
        onClick={handleBackStep}
        startIcon={<Icon icon={arrowIosBackFill} />}
      >
        Volver
      </Button>
      <CardStyle>
        <Stack spacing={4} direction={{ xs: 'column', md: 'row', padding: 3 }}>
          <Box sx={{ flex: 1 }}>
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography sx={{ mb: 2, fontWeight: 900 }}>Ingresa los siguientes datos</Typography>
                <Typography sx={{ mb: 2, fontSize: 14 }}>
                  Si ganas, te contactaremos con los datos que proporciones. Por favor asegurate de ingresarlos
                  correctamente
                </Typography>
                <Stack spacing={2} sx={{ mb: 5 }}>
                  <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
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
                        label="Seguir sin registro"
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

          <Box sx={{ display: 'flex' }}>
            <Divider
              orientation={!isMobile ? 'horizontal' : 'vertical'}
              flexItem
              variant="middle"
              sx={{ py: { xs: 2, md: 20 }, borderColor: 'secondary.light' }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography sx={{ mb: 2, fontWeight: 900 }}>O inicia sesión si ya estás registrado</Typography>
            <AuthFirebaseSocials onHasError={handleError} />
            {errors.errorWithSocial && <Alert severity="error">{errors.errorWithSocial}</Alert>}
            <LoginForm onHasError={handleError} />
          </Box>
        </Stack>
      </CardStyle>
    </>
  );
};

CheckoutInformation.propTypes = propTypes;
CheckoutInformation.defaultProps = defaultProps;

export default CheckoutInformation;
