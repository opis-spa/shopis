import React, { useEffect, useState } from 'react';
import { Grid, Typography, Card, Box, Collapse, Divider, TextField, IconButton, Modal, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
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
    deliveryCost: Yup.string().required('*Campo requerido.'),
    amountDeliveryFree: Yup.string().required('*Campo requerido.')
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

export default AccountDeliveryForm;
