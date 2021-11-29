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
    code1: Yup.number().required('Code is required'),
    code2: Yup.number().required('Code is required'),
    code3: Yup.number().required('Code is required'),
    code4: Yup.number().required('Code is required'),
    code5: Yup.number().required('Code is required'),
    code6: Yup.number().required('Code is required')
  });

  const code = token ? token.split('') : [...Array(6)];
  const formik = useFormik({
    initialValues: {
      code1: code[0],
      code2: code[1],
      code3: code[2],
      code4: code[3],
      code5: code[4],
      code6: code[5]
    },
    validationSchema: VerifyCodeSchema,
    onSubmit: async () => {
      enqueueSnackbar('Código verificado', { variant: 'success' });
      onValidate(true);
    }
  });

  const { values, errors, isValid, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2} justifyContent="center">
          {Object.keys(values).map((item) => (
            <OutlinedInput
              key={item}
              {...getFieldProps(item)}
              type="number"
              placeholder="-"
              onInput={maxLength}
              error={Boolean(touched[item] && errors[item])}
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
          ))}
        </Stack>

        <FormHelperText error={!isValid} style={{ textAlign: 'right' }}>
          {!isValid && 'Code is required'}
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
