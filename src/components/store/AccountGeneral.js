import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
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
  Divider,
  Button
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/styles';
// QR Code
import QRCode from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// hooks
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { UploadAvatar } from '../upload';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import { setNickname } from '../../redux/slices/store';
// utils
import { fData } from '../../utils/formatNumber';
import axios from '../../utils/axios';
//
import countries from '../../assets/data/countries';
import { regiones } from '../../assets/data/regiones';

// ----------------------------------------------------------------------

const LinkTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    paddingLeft: 142.75 + 16
  },
  '& .MuiInputBase-root': {
    position: 'relative'
  },
  '& .MuiInputBase-root::before': {
    content: '"https://menu.opis.cl/"',
    display: 'block',
    position: 'absolute',
    left: theme.spacing(2),
    top: 16.5
  }
}));

export default function AccountGeneral() {
  const isMountedRef = useIsMountedRef();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { updateProfile } = useAuth();
  const { data: parnership } = useSelector((state) => state.store);
  const [cities, setCities] = useState([]);
  const [link, setLink] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingNickname, setIsLoadingNickname] = useState(false);
  const BASE_CATALOGUE_URL = 'https://menu.opis.cl/';

  useEffect(() => {
    setLink(() => parnership?.nickname || '');
  }, [parnership]);

  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required.'),
    nickname: Yup.string()
      .trim()
      .matches(/^[a-z0-9_-]+$/, 'Solo se permiten letras en minúsculas y números, sin espacios o caracteres especiales')
      .required('*Campo requerido.')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: parnership?.name || '',
      legalName: parnership?.legalName || '',
      identity: parnership?.identity || '',
      identityCode: parnership?.identityCode || '',
      nickname: parnership?.nickname || '',
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

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    validateField,
    setFieldError,
    setFieldTouched
  } = formik;

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

  const handleDownloadQR = () => {
    const canvas = document.getElementById('qr-catalogo-digital');
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${values.nickname}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleSaveNickname = async () => {
    setIsLoadingNickname(() => true);
    try {
      await validateField('nickname');
      if (errors.nickname) return;
      const response = await axios.get(`/api/v1/partnerships/validate-nickname/${values.nickname}`);
      const { success } = response.data;
      if (success) {
        await dispatch(setNickname(values.nickname));
        setIsLoadingNickname(() => false);
        setIsEditing(() => false);
        enqueueSnackbar('Link actualizado satisfactoriamente', { variant: 'success' });
      } else {
        enqueueSnackbar('Error al guardar link', { variant: 'error' });
        console.log(response);
      }
    } catch (error) {
      if (error.success === false && error.code === 400) {
        await setFieldTouched('nickname', true);
        setFieldError('nickname', '*El link ya está registrado.');
        setIsLoadingNickname(() => false);
        return;
      }
      console.log(error);
      setIsLoadingNickname(() => false);
      enqueueSnackbar('Error al guardar link', { variant: 'error' });
    }
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card sx={{ py: 5, px: 3, textAlign: 'center' }}>
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
                    sx={{ mt: 2 }}
                  />
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card sx={{ p: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Catálogo Digital
                  </Typography>
                  <LinkTextField
                    label="Link"
                    fullWidth
                    {...getFieldProps('nickname')}
                    InputLabelProps={{ shrink: true }}
                    disabled={Boolean(!isEditing || isLoadingNickname)}
                    error={Boolean(touched.nickname && errors.nickname)}
                    helperText={touched.nickname && errors.nickname}
                  />
                  <Box sx={{ mt: 2 }}>
                    {isEditing ? (
                      <>
                        <Button
                          variant="outlined"
                          sx={{ mr: 1 }}
                          disabled={isLoadingNickname}
                          onClick={() => {
                            setFieldValue('nickname', link);
                            setIsEditing(() => false);
                          }}
                        >
                          Cancelar
                        </Button>
                        <LoadingButton variant="contained" onClick={handleSaveNickname} loading={isLoadingNickname}>
                          Guardar
                        </LoadingButton>
                      </>
                    ) : (
                      <>
                        <CopyToClipboard text={`${BASE_CATALOGUE_URL}${values.nickname}`}>
                          <Button
                            variant="outlined"
                            sx={{ mr: 1 }}
                            onClick={() => {
                              enqueueSnackbar('Link copiado', { variant: 'success' });
                            }}
                          >
                            Copiar
                          </Button>
                        </CopyToClipboard>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setIsEditing(() => true);
                          }}
                        >
                          Editar
                        </Button>
                      </>
                    )}
                  </Box>
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                    <QRCode id="qr-catalogo-digital" level="H" size={200} value={`${BASE_CATALOGUE_URL}${link}`} />
                  </Box>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={handleDownloadQR} disabled={Boolean(!values.nickname)}>
                      Descargar QR
                    </Button>
                  </Box>
                </Card>
              </Grid>
            </Grid>
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
