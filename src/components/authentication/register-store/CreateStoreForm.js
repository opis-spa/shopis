import React, { useCallback, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
// material
import { Typography, Grid, TextField, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/styles';
// components
import { UploadAvatar } from '../../upload';
// utils
import { fData } from '../../../utils/formatNumber';
import axios from '../../../utils/axios';
// redux
import { useDispatch } from '../../../redux/store';
import { createStore } from '../../../redux/slices/store';
// config
import { urlShop } from '../../../config';

// ----------------------------------------------------------------------

const PhotoBoxStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5, 3),
  borderRadius: 16,
  boxShadow: 'inset 2px 2px 10px .5px rgba(0,0,0,.1)',
  textAlign: 'center'
}));

const CreateStoreForm = ({ nextStep }) => {
  const [isValidatingNickname, setIsValidatingNickname] = useState(false);
  const [nicknameChanges, setNicknameChanges] = useState(0);
  const [photo, setPhoto] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const CreateStoreSchema = Yup.object().shape({
    name: Yup.string().required('Campo requerido.'),
    identityCode: Yup.string(),
    nickname: Yup.string()
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nickname: urlShop,
      name: '',
      identityCode: ''
    },
    validationSchema: CreateStoreSchema,
    onSubmit: async (values, { setFieldError, setSubmitting }) => {
      try {
        const trimValue = values.nickname.trim();
        const containDomain = Boolean(trimValue.indexOf(urlShop) === 0);
        if (!containDomain) {
          setFieldError('nickname', 'Link inválido');
          setSubmitting(false);
          return;
        }
        const nicknameValue = trimValue.replace(urlShop, '');
        const isValid = /^[a-z0-9_-]+$/;
        if (!isValid.test(nicknameValue)) {
          if (nicknameValue === '') {
            setFieldError('nickname', 'El link es requerido');
          } else {
            setFieldError(
              'nickname',
              'Solo se permiten letras en minúsculas y números, sin espacios o caracteres especiales'
            );
          }
          setSubmitting(false);
          return;
        }
        const response = await axios.get(`/api/v1/partnerships/validate-nickname/${nicknameValue}`);
        if (!response.data.success) {
          setFieldError('nickname', 'El link ya está registrado');
          setSubmitting(false);
          return;
        }
        await dispatch(createStore({ ...values, nickname: nicknameValue }, photo));
        setSubmitting(false);
        enqueueSnackbar('Tienda creada satisfactoriamente', { variant: 'success' });
        nextStep();
      } catch (error) {
        const { code, message } = error;
        if (code === 400 && message === 'this nickname is used') {
          setFieldError('nickname', 'El link ya está registrado');
        } else {
          enqueueSnackbar('Error al crear tienda', { variant: 'error' });
        }
        setSubmitting(false);
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
    setFieldError,
    setFieldTouched
  } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setPhoto(acceptedFiles[0]);
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('photo', {
          file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceNickname = useCallback(
    debounce(async (value) => {
      setIsValidatingNickname(true);
      try {
        const isValid = /^[a-z0-9_-]+$/;
        if (!isValid.test(value)) {
          await setFieldTouched('nickname', true, false);
          if (value !== '') {
            setFieldError(
              'nickname',
              'Solo se permiten letras en minúsculas y números, sin espacios o caracteres especiales'
            );
          } else {
            setFieldError('nickname', 'El link es requerido');
          }
        } else {
          await axios.get(`/api/v1/partnerships/validate-nickname/${value}`);
        }
        setIsValidatingNickname(false);
      } catch (error) {
        const { code, message } = error;
        if (code === 400 && message === 'this nickname is used') {
          await setFieldTouched('nickname', true, false);
          setFieldError('nickname', 'El link ya está registrado');
        }
        setIsValidatingNickname(false);
      }
    }, 1000),
    []
  );

  const handleChangeNickname = async (e) => {
    const { value } = e.target;
    const trimValue = value.trim();
    const containDomain = Boolean(trimValue.indexOf(urlShop) === 0);
    if (containDomain) {
      setFieldValue('nickname', trimValue);
      setNicknameChanges((prev) => prev + 1);
      const nicknameValue = trimValue.replace(urlShop, '');
      setIsValidatingNickname(true);
      debounceNickname(nicknameValue);
    }
  };

  const handleChangeName = (e) => {
    const { value } = e.target;
    setFieldValue('name', value);
    if (!nicknameChanges) {
      setFieldValue('nickname', `${urlShop}${paramCase(value)}`);
      setIsValidatingNickname(true);
      debounceNickname(paramCase(value));
    }
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3} sx={{ pt: 1 }}>
          <Grid item xs={12} md={4}>
            <PhotoBoxStyle>
              <UploadAvatar
                accept="image/*"
                file={values.photo}
                maxSize={3145728}
                onDrop={handleDrop}
                error={Boolean(touched.photo && errors.photo)}
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
            </PhotoBoxStyle>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Nombre de tu tienda"
                  {...getFieldProps('name')}
                  value={values.name}
                  onChange={handleChangeName}
                  disabled={isSubmitting}
                  error={Boolean(errors.name && touched.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="RUT"
                  {...getFieldProps('identityCode')}
                  disabled={isSubmitting}
                  error={Boolean(errors.identityCode && touched.identityCode)}
                  helperText={touched.identityCode && errors.identityCode}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Shopis Link a tu tienda"
                  InputLabelProps={{ shrink: true }}
                  {...getFieldProps('nickname')}
                  value={values.nickname}
                  onChange={handleChangeNickname}
                  disabled={isSubmitting}
                  InputProps={{
                    endAdornment: isValidatingNickname && <CircularProgress size={12} />
                  }}
                  error={Boolean(errors.nickname && touched.nickname)}
                  helperText={touched.nickname && errors.nickname}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <LoadingButton variant="contained" loading={isSubmitting || isValidatingNickname} type="submit">
              Crear Tienda
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

CreateStoreForm.propTypes = {
  nextStep: PropTypes.func
};

export default CreateStoreForm;
