import React, { useEffect } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
// material
import { Box, Grid, Card, Button, Typography, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const AccountBillingForm = React.forwardRef(({ accountInfo, banks, accountTypes, isNew, onClose }, ref) => {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    maxWidth: 'calc(100vw - 40px)'
  };

  const AccountBillingSchema = Yup.object().shape({
    bankId: Yup.string().required('*Campo requerido.'),
    accountType: Yup.string().required('*Campo requerido.'),
    accountNumber: Yup.string().required('*Campo requerido.')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      bankId: '',
      accountType: '',
      accountNumber: ''
    },
    validationSchema: AccountBillingSchema,
    onSubmit: async (values) => {
      console.log(values);
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  useEffect(() => {
    setFieldValue('bankId', accountInfo.bankId || '');
    setFieldValue('accountType', accountInfo.accountType || '');
    setFieldValue('accountNumber', accountInfo.accountNumber || '');
  }, [accountInfo]);

  const handleChangeBank = (e) => {
    const { value } = e.target;
    setFieldValue('bankId', value);
  };

  const handleChangeAccountType = (e) => {
    const { value } = e.target;
    setFieldValue('accountType', value);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box sx={modalStyle} ref={ref}>
          <Card sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5" align="center" color="primary">
                  Añadir Cuenta Bancaria
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Banco"
                  placeholder="Banco"
                  value={values.bankId}
                  SelectProps={{ native: true }}
                  onChange={handleChangeBank}
                  error={Boolean(touched.bankId && errors.bankId)}
                  helperText={touched.bankId && errors.bankId}
                >
                  <option value="" />
                  {banks
                    .filter((item) => item.country === 'Chile')
                    .map((option) => (
                      <option key={option._id} value={option._id}>
                        {option.name}
                      </option>
                    ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Tipo de cuenta"
                  placeholder="Tipo de cuenta"
                  SelectProps={{ native: true }}
                  value={values.accountType}
                  onChange={handleChangeAccountType}
                  error={Boolean(touched.accountType && errors.accountType)}
                  helperText={touched.accountType && errors.accountType}
                >
                  <option value="" />
                  {accountTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.display}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...getFieldProps('accountNumber')}
                  fullWidth
                  label="Número de Cuenta"
                  placeholder="Número de cuenta"
                  error={Boolean(touched.accountNumber && errors.accountNumber)}
                  helperText={touched.accountNumber && errors.accountNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button color="primary" variant="outlined" sx={{ mr: 1 }} onClick={onClose}>
                    Cancelar
                  </Button>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Guardar
                  </LoadingButton>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Form>
    </FormikProvider>
  );
});

export default AccountBillingForm;
