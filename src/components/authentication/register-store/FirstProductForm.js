import React, { useCallback, useState } from 'react';
import { Form, useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
// material
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import {
  Card,
  Chip,
  Grid,
  Stack,
  Button,
  Switch,
  TextField,
  Typography,
  Autocomplete,
  InputAdornment,
  FormHelperText,
  FormControlLabel
} from '@mui/material';
// components
import { QuillEditor } from '../../editor';
import { UploadMultiFile } from '../../upload';
// utils
import { isEmptyTag } from '../../../utils/regexValidation';

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Herramientas',
  'Electrdomésticos',
  'Digital',
  'Comida',
  'Estudios',
  'Libros',
  'Computadoras',
  'Hogar'
];

const LabelStyle = styled(Typography)(({ theme, error }) => ({
  ...theme.typography.subtitle2,
  color: error ? theme.palette.error.main : theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

const FirstProductForm = ({ nextStep }) => {
  const [files, setFiles] = useState([]);

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    description: Yup.string()
      .test('not-empty-tag', 'La descripción es requerida', (value) => !isEmptyTag.test(value))
      .required('La descripción es requerida'),
    amount: Yup.number().moreThan(0, 'El precio debe ser mayor a 0.').required('El precio es requerido'),
    discountPartnership: Yup.number().min(0, 'El descuento no puede ser negativo.'),
    stock: Yup.number()
      .when('stockInfinity', {
        is: true,
        otherwise: Yup.number().integer('El stock debe ser un número entero').min(1, 'El stock debe ser 1 como mínimo')
      })
      .required('El stock es requerido'),
    photos: Yup.array(),
    tags: Yup.array(),
    stockInfinity: Yup.bool()
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      description: '',
      photos: [],
      amount: 0,
      discountPartnership: 0,
      tags: [],
      stockInfinity: true,
      stock: -1
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values) => {
      console.log(values);
      nextStep();
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setFiles(acceptedFiles);
      setFieldValue(
        'photos',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [setFieldValue]
  );

  const handleRemoveAll = () => {
    setFieldValue('photos', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.photos.filter((_file) => _file !== file);
    setFieldValue('photos', filteredItems);
  };

  const handleChangeStock = () => {
    setFieldValue('stock', !values.stockInfinity ? -1 : 1);
    setFieldValue('stockInfinity', !values.stockInfinity);
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3} sx={{ pt: 1 }}>
          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Nombre del producto *"
                {...getFieldProps('name')}
                disabled={isSubmitting}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
              <div>
                <LabelStyle error={touched.description && errors.description}>Descripción *</LabelStyle>
                <QuillEditor
                  simple
                  id="product-description"
                  placeHolder="Escribe algo grandioso que destaque tu producto"
                  value={values.description}
                  readOnly={isSubmitting}
                  onChange={(val) => setFieldValue('description', val)}
                  error={Boolean(touched.description && errors.description)}
                />
                {touched.description && errors.description && (
                  <FormHelperText error sx={{ px: 2 }}>
                    {touched.description && errors.description}
                  </FormHelperText>
                )}
              </div>
              <div>
                <LabelStyle>Imágenes</LabelStyle>
                <UploadMultiFile
                  showPreview
                  maxSize={3145728}
                  accept="image/*"
                  disabled={isSubmitting}
                  files={values.photos || []}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                  error={Boolean(touched.images && errors.images)}
                />
              </div>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Autocomplete
                multiple
                freeSolo
                fullWidth
                value={values.tags}
                disabled={isSubmitting}
                options={TAGS_OPTION.map((option) => option)}
                filterSelectedOptions
                onChange={(e, newTags) => setFieldValue('tags', newTags)}
                renderInput={(params) => <TextField label="Etiquetas" {...params} />}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                  ))
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    {...getFieldProps('stockInfinity')}
                    disabled={isSubmitting}
                    onChange={handleChangeStock}
                    checked={values.stockInfinity}
                  />
                }
                label="Invetario infinito"
                sx={{ mb: 2 }}
              />
              {!values.stockInfinity && (
                <TextField
                  fullWidth
                  label="Inventario Inicial *"
                  type="number"
                  value={values.stock}
                  {...getFieldProps('stock')}
                  disabled={isSubmitting}
                  error={Boolean(touched.stock && errors.stock)}
                  helperText={(touched.stock && errors.stock) || ''}
                />
              )}
              <TextField
                fullWidth
                placeholder="0.00"
                label="Precio *"
                {...getFieldProps('amount')}
                disabled={isSubmitting}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  type: 'number'
                }}
                error={Boolean(touched.amount && errors.amount)}
                helperText={touched.amount && errors.amount}
              />

              <TextField
                fullWidth
                placeholder="0.00"
                label="Descuento"
                {...getFieldProps('discountPartnership')}
                disabled={isSubmitting}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  type: 'number'
                }}
                error={Boolean(touched.discountPartnership && errors.discountPartnership)}
                helperText={touched.discountPartnership && errors.discountPartnership}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <LoadingButton variant="contained" loading={isSubmitting} sx={{ mr: 1 }} type="submit">
              Crear Producto
            </LoadingButton>
            <Button type="button" variant="outlined" disabled={isSubmitting} onClick={nextStep}>
              Omitir
            </Button>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default FirstProductForm;
