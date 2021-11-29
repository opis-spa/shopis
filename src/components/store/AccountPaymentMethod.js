import React from 'react';
import { useSnackbar } from 'notistack';
// material
import { Grid, Typography, Card, Box } from '@mui/material';
import { styled, useTheme } from '@mui/styles';
import { LoadingButton } from '@mui/lab';
// form
import { Form, FormikProvider, useFormik, Field } from 'formik';
import { Checkbox } from 'formik-mui';
// redux
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
      try {
        const opisArray = paymentMethods?.filter((item) => item.type === 'opis');
        const opisID = opisArray.length ? opisArray[0].id : '';
        const valuesToSend =
          values.paymentMethods?.indexOf(opisID) === -1 ? [...values.paymentMethods, opisID] : values.paymentMethods;
        await dispatch(setPaymentMethods(valuesToSend));
        setSubmitting(false);
        enqueueSnackbar('Métodos de pago guardados satisfactoriamente', { variant: 'success' });
      } catch (error) {
        console.log(error);
        setSubmitting(false);
        enqueueSnackbar('Error al guardar métodos de pago', { variant: 'error' });
      }
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
                  <PaymentOption
                    className={
                      (values.paymentMethods?.indexOf(id) >= 0 || type === 'opis') && !isSubmitting ? 'selected' : ''
                    }
                  >
                    <Box>
                      {type === 'opis' ? (
                        <Field
                          type="checkbox"
                          component={Checkbox}
                          name="paymentMethods"
                          key={type}
                          value={id}
                          checked
                          disabled={isSubmitting}
                        />
                      ) : (
                        <Field
                          type="checkbox"
                          component={Checkbox}
                          name="paymentMethods"
                          key={type}
                          value={id}
                          disabled={isSubmitting}
                        />
                      )}
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
