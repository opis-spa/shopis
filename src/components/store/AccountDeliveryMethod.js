import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
// material
import { Grid, Typography, Card, Box, Collapse, Divider, IconButton, Modal } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EditIcon from '@mui/icons-material/Edit';
import { styled, useTheme } from '@mui/styles';
import { LoadingButton } from '@mui/lab';
// form
import { Checkbox } from 'formik-mui';
import { Form, FormikProvider, useFormik, Field } from 'formik';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import { setDeliveryMethods } from '../../redux/slices/store';
// components
import AccountDeliveryForm from './AccountDeliveryForm';

const AccountDeliveryMethod = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [openModal, setOpenModal] = useState(false);
  const [deliveryOpts, setDeliveryOpts] = useState({});
  const { data: deliveryMethods } = useSelector((state) => state.delivery);
  const {
    deliveryMethods: userDeliveryMethods,
    deliveryCost,
    amountDeliveryFree
  } = useSelector((state) => state.store.data);

  const getDeliveryType = (deliveryCost, amountDeliveryFree) => {
    if (!deliveryCost && !amountDeliveryFree) {
      return 'free';
    }
    if (deliveryCost && !amountDeliveryFree) {
      return 'fixed';
    }
    if (deliveryCost && amountDeliveryFree) {
      return 'amount-to-free';
    }
    return 'free';
  };

  const DELIVERY_OPTIONS = [
    {
      key: 'free',
      name: 'Delivery gratis.'
    },
    {
      key: 'fixed',
      name: 'Delivery con monto fijo.'
    },
    {
      key: 'amount-to-free',
      name: 'Delivery gratis luego de un monto.'
    }
  ];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      deliveryMethods: userDeliveryMethods || [],
      deliveryCost: deliveryCost || 0,
      amountDeliveryFree: amountDeliveryFree || 0,
      deliveryType: getDeliveryType(deliveryCost, amountDeliveryFree)
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(setDeliveryMethods(values));
        setSubmitting(false);
        enqueueSnackbar('Save success', { variant: 'success' });
      } catch (error) {
        console.log(error);
      }
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

  const handleChangeDeliveryOptions = async (opts) => {
    await setFieldValue('deliveryCost', opts.deliveryCost);
    await setFieldValue('deliveryType', opts.deliveryType);
    await setFieldValue('amountDeliveryFree', opts.amountDeliveryFree);
    setOpenModal(() => false);
  };

  const getDeliveryTypeText = () => (
    <>
      {values.deliveryType === 'free' ? <>Delivery Gratis</> : <></>}
      {values.deliveryType === 'fixed' ? <>Costo delivery: {values.deliveryCost}</> : <></>}
      {values.deliveryType === 'amount-to-free' ? (
        <>
          Costo delivery: {values.deliveryCost}
          <br />
          Gratis despues de: {values.amountDeliveryFree}
        </>
      ) : (
        <></>
      )}
    </>
  );

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
                  <DeliveryOption
                    className={values.deliveryMethods?.indexOf(id) >= 0 && !isSubmitting ? 'selected' : ''}
                  >
                    <Box>
                      <Field
                        disabled={isSubmitting}
                        type="checkbox"
                        component={Checkbox}
                        name="deliveryMethods"
                        key={type}
                        value={id}
                      />
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
                                  <MonetizationOnIcon
                                    color="primary"
                                    sx={{ mr: 1, [theme.breakpoints.down('md')]: { display: 'none' } }}
                                  />
                                  {getDeliveryTypeText()}
                                </Typography>
                                <IconButton
                                  sx={{ color: '#609FBF' }}
                                  onClick={() => {
                                    setDeliveryOpts(() => ({
                                      deliveryType: values.deliveryType,
                                      deliveryCost: values.deliveryCost,
                                      amountDeliveryFree: values.amountDeliveryFree
                                    }));
                                    if (!isSubmitting) {
                                      setOpenModal(() => true);
                                    }
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
                                  <>
                                    <AccountDeliveryForm
                                      deliveryOptions={DELIVERY_OPTIONS}
                                      deliveryInfo={deliveryOpts}
                                      onSubmitDelivery={handleChangeDeliveryOptions}
                                      onClose={() => {
                                        setOpenModal(() => false);
                                      }}
                                    />
                                  </>
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
