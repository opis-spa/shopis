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

// ----------------------------------------------------------------------

const PhotoBoxStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5, 3),
  borderRadius: 16,
  // border: `1px solid ${theme.palette.primary.main}`,
  boxShadow: 'inset 2px 2px 10px .5px rgba(0,0,0,.1)',
  textAlign: 'center'
}));

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

const CreateStoreForm = ({ nextStep }) => {
  const [isValidatingNickname, setIsValidatingNickname] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const CreateStoreSchema = Yup.object().shape({
    name: Yup.string().required('Campo requerido.'),
    identityCode: Yup.string(),
    nickname: Yup.string()
      .trim()
      .matches(/^[a-z0-9_-]+$/, 'Solo se permiten letras en minúsculas y números, sin espacios o caracteres especiales')
      .required('El link es requerido')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      photo: null,
      nickname: '',
      name: '',
      identityCode: ''
    },
    validationSchema: CreateStoreSchema,
    onSubmit: async (values, { setFieldError, setSubmitting }) => {
      try {
        if (values.nickname !== '') {
          const response = await axios.get(`/api/v1/partnerships/validate-nickname/${values.nickname}`);
          if (!response.data.success) {
            setFieldError('nickname', 'El link ya está registrado');
            setSubmitting(false);
            return;
          }
        }
        await dispatch(createStore(values));
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
        if (value !== '') {
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

  const handleChangeNickname = (e) => {
    const { value } = e.target;
    setFieldValue('nickname', value);
    setIsValidatingNickname(true);
    debounceNickname(value);
  };

  const handleChangeName = (e) => {
    const { value } = e.target;
    setFieldValue('name', value);
    if (!touched.nickname) {
      setFieldValue('nickname', paramCase(value));
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
                  label="Nombre Comercial *"
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
                <LinkTextField
                  fullWidth
                  label="Link *"
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
