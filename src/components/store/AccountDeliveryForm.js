import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// material
import { Typography, Card, Box, TextField, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// form
import { useFormik, FormikProvider, Form } from 'formik';
import * as Yup from 'yup';

const AccountDeliveryForm = ({ deliveryOptions, onClose, deliveryInfo, onSubmitDelivery }) => {
  const [disabledCost, setDisabledCost] = useState(false);
  const [disabledAmount, setDisabledAmount] = useState(false);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    maxWidth: 'calc(100vw - 40px)'
  };

  const AccountDeliverySchema = Yup.object().shape({
    deliveryType: Yup.string().required('*Campo requerido.'),
    deliveryCost: Yup.number()
      .when('deliveryType', {
        is: 'free',
        otherwise: Yup.number().moreThan(0, '*El monto debe ser mayor a 0.')
      })
      .required('*Campo requerido.'),
    amountDeliveryFree: Yup.number()
      .when('deliveryType', {
        is: 'amount-to-free',
        then: Yup.number().moreThan(0, '*El monto debe ser mayor a 0.')
      })
      .required('*Campo requerido.')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      deliveryType: 'free',
      deliveryCost: '',
      amountDeliveryFree: ''
    },
    validationSchema: AccountDeliverySchema,
    onSubmit: async (values) => {
      await onSubmitDelivery(values);
    }
  });

  const { values, handleSubmit, isSubmitting, setFieldValue, getFieldProps, errors, touched } = formik;

  useEffect(() => {
    setFieldValue('deliveryType', deliveryInfo.deliveryType);
    setFieldValue('deliveryCost', deliveryInfo.deliveryCost);
    setFieldValue('amountDeliveryFree', deliveryInfo.amountDeliveryFree);
    if (deliveryInfo.deliveryType === 'free') {
      setDisabledCost(() => true);
      setDisabledAmount(() => true);
    } else if (deliveryInfo.deliveryType === 'fixed') {
      setDisabledCost(() => false);
      setDisabledAmount(() => true);
    } else if (deliveryInfo.deliveryType === 'amount-to-free') {
      setDisabledCost(() => false);
      setDisabledAmount(() => false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryInfo]);

  const handleSelectDelivery = (e) => {
    const { value } = e.target;
    setFieldValue('deliveryType', value);
    if (value === 'free') {
      setFieldValue('deliveryCost', 0);
      setFieldValue('amountDeliveryFree', 0);
      setDisabledCost(() => true);
      setDisabledAmount(() => true);
    } else if (value === 'fixed') {
      setFieldValue('amountDeliveryFree', 0);
      setDisabledCost(() => false);
      setDisabledAmount(() => true);
    } else if (value === 'amount-to-free') {
      setDisabledCost(() => false);
      setDisabledAmount(() => false);
    }
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box sx={modalStyle}>
          <Card sx={{ p: 3 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Configuración de delivery
            </Typography>
            <TextField
              sx={{ mt: 3 }}
              select
              fullWidth
              label="Tipo de delivery"
              placeholder="Tipo de delivery"
              SelectProps={{ native: true }}
              onChange={handleSelectDelivery}
              value={values.deliveryType}
              error={Boolean(errors.deliveryType && touched.deliveryType)}
              helperText={touched.deliveryType && errors.deliveryType}
            >
              {deliveryOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.name}
                </option>
              ))}
            </TextField>
            <TextField
              fullWidth
              sx={{ mt: 3 }}
              label="Costo de delivery"
              placeholder="Costo de delivery"
              {...getFieldProps('deliveryCost')}
              error={Boolean(errors.deliveryCost && touched.deliveryCost)}
              helperText={touched.deliveryCost && errors.deliveryCost}
              disabled={disabledCost}
            />
            <TextField
              fullWidth
              sx={{ mt: 3 }}
              label="Monto para ser gratuito"
              placeholder="Monto para ser gratuito"
              {...getFieldProps('amountDeliveryFree')}
              error={Boolean(errors.amountDeliveryFree && touched.amountDeliveryFree)}
              helperText={touched.amountDeliveryFree && errors.amountDeliveryFree}
              disabled={disabledAmount}
            />
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button disabled={isSubmitting} sx={{ mr: 1 }} variant="outlined" onClick={onClose}>
                Cancelar
              </Button>
              <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
                Guardar
              </LoadingButton>
            </Box>
          </Card>
        </Box>
      </Form>
    </FormikProvider>
  );
};

AccountDeliveryForm.propTypes = {
  deliveryOptions: PropTypes.array,
  onClose: PropTypes.func,
  deliveryInfo: PropTypes.object,
  onSubmitDelivery: PropTypes.func
};

export default AccountDeliveryForm;
