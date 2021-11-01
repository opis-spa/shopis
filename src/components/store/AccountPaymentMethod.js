import React from 'react';
import { Grid, Typography, Card, Box } from '@mui/material';
import { Checkbox } from 'formik-mui';
import { styled, useTheme } from '@mui/styles';
import { Form, FormikProvider, useFormik, Field } from 'formik';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from '../../redux/store';
import { setPaymentMethods } from '../../redux/slices/store';

const AccountPaymentMethod = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { data: paymentMethods } = useSelector((state) => state.payment);
  const { paymentMethods: userPaymentMethods } = useSelector((state) => state.store.data);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      paymentMethods: userPaymentMethods
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(false);
      dispatch(setPaymentMethods(values.paymentMethods));
      enqueueSnackbar('Save success', { variant: 'success' });
    }
  });

  const { values, handleSubmit, isSubmitting } = formik;

  const PaymentOption = styled('label')(({ theme }) => ({
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

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card sx={{ padding: 3 }}>
          <Grid container spacing={3}>
            {paymentMethods.map((method) => {
              const { type, name, icons, description, id } = method;
              return (
                <Grid item xs={12} md={6} key={name}>
                  <PaymentOption className={values.paymentMethods.indexOf(id) >= 0 ? 'selected' : ''}>
                    <Box>
                      <Field type="checkbox" component={Checkbox} name="paymentMethods" key={type} value={id} />
                    </Box>
                    <Box>
                      <Typography variant="body1" fontWeight="bold">
                        {name}
                      </Typography>
                      <Typography variant="body1">{description}</Typography>
                    </Box>
                    {icons.map((icon, index) => (
                      <Box
                        key={index}
                        component="img"
                        alt="logo card"
                        sx={{ maxWidth: 50, [theme.breakpoints.down('md')]: { display: 'none' } }}
                        src={icon}
                      />
                    ))}
                  </PaymentOption>
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

export default AccountPaymentMethod;
