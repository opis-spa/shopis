import React, { useMemo, useState } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Grid, Stack, Button, Divider, TextField } from '@mui/material';
// hooks
import usePartnership from '../../../hooks/usePartnership';
// redux
import { useSelector, useDispatch } from '../../../redux/store';
import { applyShipping, onNextStep, createBilling } from '../../../redux/slices/product';
// componnet
import CheckoutDeliveryMethod from './CheckoutDeliveryMethod';
import { regiones } from '../../../assets/data/regiones';

// ----------------------------------------------------------------------

const CheckoutDeliverySchema = Yup.object().shape({
  identityCode: Yup.string().required('El RUT es requerido'),
  phone: Yup.string().required('Teléfono es requerido'),
  delivery: Yup.string().required('La forma de entrega es requerida'),
  address: Yup.string().when('delivery', {
    is: 'delivery',
    then: Yup.string().required('La dirección es requerida')
  })
});

const propTypes = {};

function CheckoutDelivery() {
  const dispatch = useDispatch();
  const { partnership } = usePartnership();
  const { data: deliveries } = useSelector((state) => state.delivery);
  const [isLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const DELIVERY_OPTIONS = useMemo(() => {
    const { deliveryMethods } = partnership;
    return deliveries.filter((item) => deliveryMethods.indexOf(item.id) >= 0);
  }, [partnership, deliveries]);
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      dispatch(createBilling(values.address));
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
    setFieldValue('location.state', value);
    if (value) {
      const { comunas: citiesMap } = regiones.find((item) => item.region === value);
      setCities(citiesMap);
    } else {
      setCities([]);
    }
  };
  const handleChangeCity = (e) => {
    const { value } = e.target;
    setFieldValue('location.city', value);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <CheckoutDeliveryMethod
            formik={formik}
            onApplyShipping={handleApplyShipping}
            deliveryOptions={DELIVERY_OPTIONS}
          />
        </Grid>
        <Grid item xs={12}>
          {values.delivery === 'delivery' && (
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
                value={values.location?.state || ''}
                onChange={handleChangeState}
                SelectProps={{ native: true }}
                error={Boolean(touched.country && errors.country)}
                helperText={touched.country && errors.country}
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
                value={values.location?.city || ''}
                onChange={handleChangeCity}
                SelectProps={{ native: true }}
                error={Boolean(touched.location?.city && errors.location?.city)}
                helperText={(touched.location?.city && errors.location?.city) || ''}
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
