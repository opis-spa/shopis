import React, { useState } from 'react';
import { Grid, Typography, Card, Box, Collapse, Divider, TextField, IconButton, Modal } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EditIcon from '@mui/icons-material/Edit';
import { Checkbox } from 'formik-mui';
import { styled } from '@mui/styles';
import { Form, FormikProvider, useFormik, Field } from 'formik';
import { LoadingButton } from '@mui/lab';
import { useSelector } from '../../redux/store';

const AccountDeliveryMethod = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data: deliveryMethods } = useSelector((state) => state.delivery);

  const DELIVERY_OPTIONS = [
    {
      key: 1,
      name: 'Delivery gratis.'
    },
    {
      key: 2,
      name: 'Delivery con monto fijo.'
    },
    {
      key: 3,
      name: 'Delivery gratis luego de un monto.'
    }
  ];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      deliveryMethods: [],
      deliveryCost: '',
      amountDeliveryFree: '',
      deliveryType: 1
    },
    onSubmit: async (values) => {
      console.log(values);
    }
  });

  const { values, handleSubmit, isSubmitting, setFieldValue } = formik;

  const DeliveryOption = styled('label')(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'grid',
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: 10,
    gridTemplateColumns: 'auto 1fr auto ',
    alignItems: 'center',
    gap: theme.spacing(1),
    cursor: 'pointer',
    transition: '.2s all',
    height: '100%',
    '&.selected': {
      border: `2px solid ${theme.palette.primary.main}`
    }
  }));

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    maxWidth: 'calc(100vw - 40px)'
  };

  const handleSelectDelivery = (e) => {
    const { value } = e.target;
    setFieldValue('deliveryType', value);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {deliveryMethods.map((method) => {
              const { id, type, name, description } = method;
              const hasChildren = type === 'delivery';

              return (
                <Grid item xs={12} md={6} key={id}>
                  <DeliveryOption className={values.deliveryMethods.indexOf(id) >= 0 ? 'selected' : ''}>
                    <Box>
                      <Field type="checkbox" component={Checkbox} name="deliveryMethods" key={type} value={id} />
                    </Box>
                    <Box>
                      <Typography variant="body1" fontWeight="bold">
                        {name}
                      </Typography>
                      <Typography variant="body1">{description}</Typography>
                      {hasChildren && (
                        <Collapse in={values.deliveryMethods.indexOf(id) >= 0} sx={{ width: '100%' }}>
                          {values.deliveryMethods.indexOf(id) >= 0 && (
                            <Box sx={{ pt: 1 }}>
                              <Divider />
                              <Box
                                sx={{ pt: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                              >
                                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                                  <MonetizationOnIcon color="primary" sx={{ mr: 1 }} />
                                  Delivery Gratis
                                </Typography>
                                <IconButton
                                  sx={{ color: '#609FBF' }}
                                  onClick={() => {
                                    setOpenModal(() => true);
                                  }}
                                >
                                  <EditIcon />
                                </IconButton>
                                <Modal
                                  open={openModal}
                                  onClose={() => {
                                    setOpenModal(() => false);
                                  }}
                                >
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
                                      >
                                        {DELIVERY_OPTIONS.map((option) => (
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
                                      />
                                      <TextField
                                        fullWidth
                                        sx={{ mt: 3 }}
                                        label="Monto para ser gratuito"
                                        placeholder="Monto para ser gratuito"
                                      />
                                    </Card>
                                  </Box>
                                </Modal>
                              </Box>
                            </Box>
                          )}
                        </Collapse>
                      )}
                    </Box>
                  </DeliveryOption>
                </Grid>
              );
            })}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Guardar
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Form>
    </FormikProvider>
  );
};

export default AccountDeliveryMethod;
