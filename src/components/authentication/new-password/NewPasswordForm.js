import { useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import { TextField, IconButton, Stack, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// routes
import { PATH_APP } from '../../../routes/paths';

// ----------------------------------------------------------------------

const propTypes = {
  token: PropTypes.string
};

function NewPassword({ token }) {
  const navigate = useNavigate();
  const isMountedRef = useIsMountedRef();
  const { newPassword } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const VerifyCodeSchema = Yup.object().shape({
    token: Yup.string().required('El código es requerido'),
    newPassword: Yup.string().required('La contraseña es requerida'),
    newPasswordConfirmation: Yup.string().required('La confirmación de la contraseña es requerida')
  });

  const formik = useFormik({
    initialValues: {
      token,
      newPassword: '',
      newPasswordConfirmation: ''
    },
    validationSchema: VerifyCodeSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await newPassword(values.token, values.newPassword, values.newPasswordConfirmation);
        if (isMountedRef.current) {
          setSubmitting(false);
        }
        enqueueSnackbar('La contraseña se a guardado correctamente', { variant: 'success' });
        navigate(PATH_APP.root);
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2} justifyContent="center">
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Contraseña"
            {...getFieldProps('newPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.newPassword && errors.newPassword)}
            helperText={touched.newPassword && errors.newPassword}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Verificar Contraseña"
            {...getFieldProps('newPasswordConfirmation')}
            error={Boolean(touched.newPasswordConfirmation && errors.newPasswordConfirmation)}
            helperText={touched.newPasswordConfirmation && errors.newPasswordConfirmation}
          />
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ mt: 3 }}>
          Nueva contraseña
        </LoadingButton>

        {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
      </Form>
    </FormikProvider>
  );
}

NewPassword.propTypes = propTypes;

export default NewPassword;
