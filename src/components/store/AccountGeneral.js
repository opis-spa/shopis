import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Grid,
  Card,
  Stack,
  Switch,
  TextField,
  FormControlLabel,
  Typography,
  FormHelperText,
  Divider
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { UploadAvatar } from '../upload';
// redux
import { useSelector } from '../../redux/store';
// utils
import { fData } from '../../utils/formatNumber';
//
import countries from '../../assets/data/countries';
import { regiones } from '../../assets/data/regiones';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { updateProfile } = useAuth();
  const { data: parnership } = useSelector((state) => state.store);
  const [cities, setCities] = useState([]);

  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: parnership?.name || '',
      legalName: parnership?.legalName || '',
      identity: parnership?.identity || '',
      identityCode: parnership?.identityCode || '',
      location: {
        address: '',
        addressMore: '',
        state: '',
        city: '',
        country: 'CL'
      },
      about: parnership?.about || '',
      isOnline: parnership?.isOnline || true
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await updateProfile({ ...values });
        enqueueSnackbar('Datos guardados satisfactoriamente', { variant: 'success' });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('photoURL', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

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
  const handleChangeCountry = (e) => {
    const { value } = e.target;
    setFieldValue('location.country', value);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
              <UploadAvatar
                accept="image/*"
                file={values.photoURL}
                maxSize={3145728}
                onDrop={handleDrop}
                error={Boolean(touched.photoURL && errors.photoURL)}
                caption={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary'
                    }}
                  >
                    Formatos *.jpeg, *.jpg, *.png, *.gif
                    <br /> máximo {fData(3145728)}
                  </Typography>
                }
              />

              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {touched.photoURL && errors.photoURL}
              </FormHelperText>

              <FormControlLabel
                control={<Switch {...getFieldProps('isPublic')} color="primary" />}
                labelPlacement="start"
                label="Tienda Activa"
                sx={{ mt: 5 }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="Nombre Comercial" {...getFieldProps('name')} />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="RUT" {...getFieldProps('identityCode')} />
                  <TextField fullWidth label="Nombre" {...getFieldProps('legalName')} />
                </Stack>

                <Divider />

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    value={values.location?.address || ''}
                    onChange={(e) => setFieldValue('location.address', e.target.value)}
                    fullWidth
                    label="Dirección"
                    variant="outlined"
                    error={Boolean(touched.location?.address && errors.location?.address)}
                    helperText={(touched.location?.address && errors.location?.address) || ''}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    value={values.location?.addressMore || ''}
                    onChange={(e) => setFieldValue('location.addressMore', e.target.value)}
                    fullWidth
                    label="Dirección adicional"
                    variant="outlined"
                    error={Boolean(touched.location?.addressMore && errors.location?.addressMore)}
                    helperText={(touched.location?.addressMore && errors.location?.addressMore) || ''}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    select
                    fullWidth
                    label="País"
                    placeholder="País"
                    onChange={handleChangeCountry}
                    value={values.location?.country || ''}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.location?.country && errors.location?.country)}
                    helperText={touched.location?.country && errors.location?.country}
                  >
                    {countries
                      .filter((item) => item.code === 'CL')
                      .map((option) => (
                        <option key={option.code} value={option.code}>
                          {option.label}
                        </option>
                      ))}
                  </TextField>
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
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
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  >
                    <option value="" />
                    {cities.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </TextField>
                </Stack>

                <TextField
                  {...getFieldProps('about')}
                  fullWidth
                  multiline
                  minRows={4}
                  maxRows={4}
                  label="Sobre tu empresa"
                />
              </Stack>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Guardar cambios
                </LoadingButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
