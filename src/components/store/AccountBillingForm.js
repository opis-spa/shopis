import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
// form
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
// material
import { Box, Grid, Card, Button, Typography, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// redux
import { useDispatch } from '../../redux/store';
import { setBankAccounts } from '../../redux/slices/store';

const AccountBillingForm = React.forwardRef(({ accountInfo, banks, accountTypes, isNew, onClose, prevBanks }, ref) => {
  const [bankList, setBankList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

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
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const accountExist = bankList.filter(
          (item) =>
            item.bankId === values.bankId &&
            item.accountType === values.accountType &&
            item.accountNumber === values.accountNumber
        );
        if (accountExist.length > 0) {
          setFieldError('accountNumber', '*La cuenta bancaria ya está registrada.');
          setSubmitting(false);
          return;
        }
        await dispatch(setBankAccounts([...bankList, values]));
        setSubmitting(false);
        enqueueSnackbar('Save success', { variant: 'success' });
        onClose();
      } catch (error) {
        console.log(error);
      }
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  useEffect(() => {
    setFieldValue('bankId', accountInfo.bankId || '');
    setFieldValue('accountType', accountInfo.accountType || '');
    setFieldValue('accountNumber', accountInfo.accountNumber || '');
    if (!isNew) {
      setBankList(() =>
        prevBanks.filter(
          (item) =>
            !(
              item.bankId === accountInfo.bankId &&
              item.accountType === accountInfo.accountType &&
              item.accountNumber === accountInfo.accountNumber
            )
        )
      );
    } else {
      setBankList(() => [...prevBanks]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                  error={Boolean(touched.accountNumber && errors.accountNumber)}
                  helperText={touched.accountNumber && errors.accountNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button disabled={isSubmitting} color="primary" variant="outlined" sx={{ mr: 1 }} onClick={onClose}>
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

AccountBillingForm.propTypes = {
  accountInfo: PropTypes.object,
  banks: PropTypes.array,
  accountTypes: PropTypes.array,
  isNew: PropTypes.bool,
  onClose: PropTypes.func,
  prevBanks: PropTypes.array
};

export default AccountBillingForm;
