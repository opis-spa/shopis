import clsx from 'clsx';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useFormik, Form, FormikProvider } from 'formik';
import { makeStyles } from '@material-ui/styles';
import {
  Box,
  Button,
  Checkbox,
  TextField,
  FormControlLabel,
  Grid,
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {},
}));

// ----------------------------------------------------------------------

const propTypes = {
  cancel: PropTypes.bool,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  className: PropTypes.string,
};

const defaultProps = {
  cancel: false,
  onClose: () => {},
  onSelect: () => {},
  className: '',
};

function NewAddress({
  cancel,
  onClose,
  onSelect,
  className,
}) {
  const classes = useStyles();

  const NewAddressSchema = Yup.object().shape({
    name: Yup.string().when('save', {
      is: true,
      then: Yup.string().required('El nombre de la dirección es requerido para guardarlo'),
    }),
    address: Yup.string().required('La dirección es requerida'),
    addressMore: Yup.string(),
    state: Yup.string().required('La Región es requerida'),
    city: Yup.string().required('La comúna es requerida'),
    country: Yup.string().required('El país es requerido'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      address: '',
      addressMore: '',
      city: '',
      state: '',
      country: 'CL',
      save: true,
    },
    validationSchema: NewAddressSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        onSelect(values);
      } catch (err) {
        setSubmitting(false);
      }
    },
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  useEffect(() => {
    const handleChange = () => {
      setFieldValue('name', '');
    };
    if (values.save) {
      handleChange();
    }
  // eslint-disable-next-line
  }, [values.save]);

  return (
    <div className={clsx(classes.root, className)}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3} direction="column">

            <Grid item>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nombre de dirección"
                    placeholder="Como quieres identificar esta dirección"
                    value={values.name}
                    disabled={!values.save}
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.save}
                        {...getFieldProps('save')}
                      />
                    }
                    label="Guardar dirección."
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Dirección"
                {...getFieldProps('address')}
                error={Boolean(touched.address && errors.address)}
                helperText={touched.address && errors.address}
              />
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Información adicional"
                placeholder="Número de departamento por ejemplo"
                {...getFieldProps('addressMore')}
                error={Boolean(touched.addressMore && errors.addressMore)}
                helperText={touched.addressMore && errors.addressMore}
              />
            </Grid>

            <Grid item>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Región"
                    {...getFieldProps('state')}
                    error={Boolean(touched.state && errors.state)}
                    helperText={touched.state && errors.state}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Comuna"
                    {...getFieldProps('city')}
                    error={Boolean(touched.city && errors.city)}
                    helperText={touched.city && errors.city}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <TextField
                select
                fullWidth
                label="País"
                placeholder="País"
                {...getFieldProps('country')}
                SelectProps={{ native: true }}
                error={Boolean(touched.country && errors.country)}
                helperText={touched.country && errors.country}
              >
                <option value="CL">
                  Chile
                </option>
              </TextField>
            </Grid>

          </Grid>

          <Box sx={{ mb: 3 }} />

          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={isSubmitting}
            >
              Usar esta dirección
            </Button>

            {cancel && (
              <Button
                type="button"
                color="inherit"
                variant="outlined"
                onClick={onClose}
                style={{ marginLeft: 10 }}
              >
                Cancelar
              </Button>
            )}
          </Box>

        </Form>
      </FormikProvider>
    </div>
  );
}

NewAddress.propTypes = propTypes;
NewAddress.defaultProps = defaultProps;

export default NewAddress;
