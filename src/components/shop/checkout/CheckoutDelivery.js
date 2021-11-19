import React, { useMemo, useState } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import logOutFill from '@iconify/icons-ic/sharp-log-out';
// material
import { Grid, Stack, Button, Divider, TextField } from '@mui/material';
// hooks
import usePartnership from '../../../hooks/usePartnership';
import useAuth from '../../../hooks/useAuth';
// redux
import { useSelector, useDispatch } from '../../../redux/store';
import { applyShipping, onBackStep, onNextStep, createDelivery } from '../../../redux/slices/product';
// componnet
import CheckoutDeliveryMethod from './CheckoutDeliveryMethod';
import { regiones } from '../../../assets/data/regiones';

// ----------------------------------------------------------------------

const CheckoutDeliverySchema = Yup.object().shape({
  deliveryType: Yup.string().required('La forma de entrega es requerida'),
  address: Yup.string().when('deliveryType', {
    is: 'delivery',
    then: Yup.string().required('La dirección es requerida')
  }),
  state: Yup.string().when('deliveryType', {
    is: 'delivery',
    then: Yup.string().required('La región es requerida')
  }),
  city: Yup.string().when('deliveryType', {
    is: 'delivery',
    then: Yup.string().required('La comúna es requerida')
  }),
  identityCode: Yup.string().when('deliveryType', {
    is: 'delivery',
    then: Yup.string().required('El RUT es requerido')
  }),
  phone: Yup.string().when('deliveryType', {
    is: 'delivery',
    then: Yup.string().required('Teléfono es requerido')
  })
});

const propTypes = {};

function CheckoutDelivery() {
  const dispatch = useDispatch();
  const { partnership } = usePartnership();
  const { data: deliveries } = useSelector((state) => state.delivery);
  const [isLoading] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const [cities, setCities] = useState([]);
  const DELIVERY_OPTIONS = useMemo(() => {
    const { deliveryMethods } = partnership;
    return deliveries.filter((item) => deliveryMethods.indexOf(item.id) >= 0);
  }, [partnership, deliveries]);
  const formik = useFormik({
    initialValues: {
      identityCode: '',
      phone: '',
      deliveryType: '',
      address: '',
      addressMore: '',
      state: '',
      city: ''
    },
    onSubmit: (values) => {
      dispatch(createDelivery(values));
      dispatch(onNextStep());
    },
    validationSchema: CheckoutDeliverySchema
  });
  const { values, getFieldProps, setFieldValue, errors, touched, handleSubmit } = formik;

  const handleApplyShipping = (value) => {
    dispatch(applyShipping(value));
  };

  const handleChangeState = (e) => {
    const { value } = e.target;
    setFieldValue('state', value);
    if (value) {
      const { comunas: citiesMap } = regiones.find((item) => item.region === value);
      setCities(citiesMap);
    } else {
      setCities([]);
    }
  };
  const handleChangeCity = (e) => {
    const { value } = e.target;
    setFieldValue('city', value);
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleLogOff = async () => {
    logout();
    dispatch(onBackStep());
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
        <Grid item xs={12}>
          <CheckoutDeliveryMethod
            formik={formik}
            onApplyShipping={handleApplyShipping}
            deliveryOptions={DELIVERY_OPTIONS}
          />
        </Grid>
        <Grid item xs={12}>
          {values.deliveryType === 'delivery' && (
            <Stack spacing={2} sx={{ mt: 3, mb: 5 }}>
              <TextField
                disabled={isLoading}
                variant="outlined"
                fullWidth
                required
                x-id="identity"
                label="RUT"
                name="identity"
                type="text"
                autoComplete="identity"
                {...getFieldProps('identityCode')}
                error={Boolean(touched.identityCode && errors.identityCode)}
                helperText={(touched.identityCode && errors.identityCode) || ''}
              />

              <TextField
                disabled={isLoading}
                variant="outlined"
                fullWidth
                required
                x-id="phone"
                label="Teléfono"
                name="phone"
                type="string"
                autoComplete="phone"
                {...getFieldProps('phone')}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
              />

              <Divider />

              <TextField
                fullWidth
                label="Dirección"
                {...getFieldProps('address')}
                error={Boolean(touched.address && errors.address)}
                helperText={touched.address && errors.address}
              />

              <TextField
                fullWidth
                label="Información adicional"
                placeholder="Número de departamento por ejemplo"
                {...getFieldProps('addressMore')}
                error={Boolean(touched.addressMore && errors.addressMore)}
                helperText={touched.addressMore && errors.addressMore}
              />

              <TextField
                select
                fullWidth
                label="Región"
                placeholder="Región"
                value={values?.state || ''}
                onChange={handleChangeState}
                SelectProps={{ native: true }}
                error={Boolean(touched.state && errors.state)}
                helperText={touched.state && errors.state}
              >
                <option value="" />
                {regiones.map((option) => (
                  <option key={option.region} value={option.region}>
                    {option.region}
                  </option>
                ))}
              </TextField>

              <TextField
                select
                fullWidth
                disabled={cities.length === 0}
                label="Comuna"
                placeholder="Comuna"
                value={values?.city || ''}
                onChange={handleChangeCity}
                SelectProps={{ native: true }}
                error={Boolean(touched.city && errors.city)}
                helperText={(touched.city && errors.city) || ''}
              >
                <option value="" />
                {cities.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
            </Stack>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
            Continuar con el pago
          </Button>
        </Grid>
      </Form>
    </FormikProvider>
  );
}

CheckoutDelivery.propTypes = propTypes;

export default CheckoutDelivery;
