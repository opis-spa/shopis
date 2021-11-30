import { useEffect } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { OutlinedInput, FormHelperText, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

// eslint-disable-next-line consistent-return
function maxLength(object) {
  if (object.target.value.length > object.target.maxLength) {
    return (object.target.value = object.target.value.slice(0, object.target.maxLength));
  }
}

const propTypes = {
  token: PropTypes.string,
  onValidate: PropTypes.func
};

const defaultProps = {
  token: '',
  onValidate: () => {}
};

function VerifyCodeForm({ token, onValidate }) {
  const { enqueueSnackbar } = useSnackbar();

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.number().required('Código es requerido'),
    code2: Yup.number().required('Código es requerido'),
    code3: Yup.number().required('Código es requerido'),
    code4: Yup.number().required('Código es requerido'),
    code5: Yup.number().required('Código es requerido'),
    code6: Yup.number().required('Código es requerido')
  });

  const code = token ? token.split('') : [...Array(6)].map(() => '');
  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      code1: code[0],
      code2: code[1],
      code3: code[2],
      code4: code[3],
      code5: code[4],
      code6: code[5]
    },
    validationSchema: VerifyCodeSchema,
    onSubmit: async (values) => {
      enqueueSnackbar('Código verificado', { variant: 'success' });
      const tokenCode = Object.keys(values)
        .filter((item) => values[item])
        .join('');
      onValidate(tokenCode);
    }
  });

  const { errors, isValid, touched, isSubmitting, handleSubmit, submitForm, getFieldProps } = formik;

  useEffect(() => {
    const isComplete = token.length === 6;
    if (isComplete) {
      formik.submitCount();
    }
  }, [formik, submitForm, token]);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <OutlinedInput
            {...getFieldProps('code1')}
            type="number"
            disabled={isSubmitting}
            placeholder="-"
            onInput={maxLength}
            error={Boolean(touched.code1 && errors.code1)}
            inputProps={{
              maxLength: 1,
              sx: {
                p: 0,
                textAlign: 'center',
                width: { xs: 36, sm: 56 },
                height: { xs: 36, sm: 56 }
              }
            }}
          />
          <OutlinedInput
            {...getFieldProps('code2')}
            type="number"
            disabled={isSubmitting}
            placeholder="-"
            onInput={maxLength}
            error={Boolean(touched.code2 && errors.code2)}
            inputProps={{
              maxLength: 1,
              sx: {
                p: 0,
                textAlign: 'center',
                width: { xs: 36, sm: 56 },
                height: { xs: 36, sm: 56 }
              }
            }}
          />
          <OutlinedInput
            {...getFieldProps('code3')}
            type="number"
            disabled={isSubmitting}
            placeholder="-"
            onInput={maxLength}
            error={Boolean(touched.code3 && errors.code3)}
            inputProps={{
              maxLength: 1,
              sx: {
                p: 0,
                textAlign: 'center',
                width: { xs: 36, sm: 56 },
                height: { xs: 36, sm: 56 }
              }
            }}
          />
          <OutlinedInput
            {...getFieldProps('code4')}
            type="number"
            disabled={isSubmitting}
            placeholder="-"
            onInput={maxLength}
            error={Boolean(touched.code4 && errors.code4)}
            inputProps={{
              maxLength: 1,
              sx: {
                p: 0,
                textAlign: 'center',
                width: { xs: 36, sm: 56 },
                height: { xs: 36, sm: 56 }
              }
            }}
          />
          <OutlinedInput
            {...getFieldProps('code5')}
            type="number"
            disabled={isSubmitting}
            placeholder="-"
            onInput={maxLength}
            error={Boolean(touched.code5 && errors.code5)}
            inputProps={{
              maxLength: 1,
              sx: {
                p: 0,
                textAlign: 'center',
                width: { xs: 36, sm: 56 },
                height: { xs: 36, sm: 56 }
              }
            }}
          />
          <OutlinedInput
            {...getFieldProps('code6')}
            type="number"
            disabled={isSubmitting}
            placeholder="-"
            onInput={maxLength}
            error={Boolean(touched.code6 && errors.code6)}
            inputProps={{
              maxLength: 1,
              sx: {
                p: 0,
                textAlign: 'center',
                width: { xs: 36, sm: 56 },
                height: { xs: 36, sm: 56 }
              }
            }}
          />
        </Stack>

        <FormHelperText error={!isValid} style={{ textAlign: 'right' }}>
          {!isValid && 'El código es requerido'}
        </FormHelperText>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ mt: 3 }}>
          Verificar
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

VerifyCodeForm.propTypes = propTypes;
VerifyCodeForm.defaultProps = defaultProps;

export default VerifyCodeForm;
