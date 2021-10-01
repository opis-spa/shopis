import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import {
  Card,
  Chip,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  Autocomplete,
  InputAdornment,
  FormHelperText,
  FormControlLabel
} from '@mui/material';
// routes
import { PATH_APP } from '../../routes/paths';
//
import { QuillEditor } from '../editor';
import { UploadMultiFile } from '../upload';

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots'
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

ProductNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object
};

export default function ProductNewForm({ isEdit, currentProduct }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    description: Yup.string().required('La descripción es requerida'),
    amount: Yup.number().required('El precio es requerido'),
    discountPartnership: Yup.number(),
    stock: Yup.number().required('El stock es requerido'),
    photo: Yup.string()
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      photos: currentProduct?.photos || [],
      amount: currentProduct?.amount || '',
      discountPartnership: currentProduct?.discountPartnership || '',
      tags: currentProduct?.tags || '',
      stockInfinity: (currentProduct?.stock || -1) === -1,
      stock: currentProduct?.stock || -1
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Producto creado satisfactoriamente' : 'Producto editado satisfactoriamente', {
          variant: 'success'
        });
        navigate(PATH_APP.business.products);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setFieldValue(
        'images',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [setFieldValue]
  );

  const handleChangeStock = () => {
    setFieldValue('stock', !values.stockInfinity ? -1 : 1);
    setFieldValue('stockInfinity', !values.stockInfinity);
  };

  const handleRemoveAll = () => {
    setFieldValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images.filter((_file) => _file !== file);
    setFieldValue('images', filteredItems);
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Nombre del producto"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />

                <div>
                  <LabelStyle>Descripción</LabelStyle>
                  <QuillEditor
                    simple
                    id="product-description"
                    placeHolder="Escribe algo grandioso que destaque tu producto"
                    value={values.description}
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
                  <LabelStyle>Imagenes</LabelStyle>
                  <UploadMultiFile
                    showPreview
                    maxSize={3145728}
                    accept="image/*"
                    files={values.photos}
                    onDrop={handleDrop}
                    onRemove={handleRemove}
                    onRemoveAll={handleRemoveAll}
                    error={Boolean(touched.images && errors.images)}
                  />
                  {touched.images && errors.images && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.images && errors.images}
                    </FormHelperText>
                  )}
                </div>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.tags}
                    onChange={(event, newValue) => {
                      setFieldValue('tags', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                      ))
                    }
                    renderInput={(params) => <TextField label="Etiquetas" {...params} />}
                  />
                </Stack>
              </Card>

              <Card sx={{ p: 3 }}>
                <FormControlLabel
                  control={
                    <Switch
                      {...getFieldProps('stockInfinity')}
                      onChange={handleChangeStock}
                      checked={values.stockInfinity}
                    />
                  }
                  label="Invetario infinito"
                  sx={{ mb: 2 }}
                />

                <Stack spacing={3}>
                  {!values.stockInfinity && (
                    <TextField
                      fullWidth
                      label={`Inventario${isEdit ? '' : ' Inicial'}`}
                      type="number"
                      value={values.stock}
                      {...getFieldProps('stock')}
                      error={Boolean(touched.stock && errors.stock)}
                      helperText={(touched.stock && errors.stock) || ''}
                    />
                  )}
                  <TextField
                    fullWidth
                    placeholder="0.00"
                    label="Precio"
                    {...getFieldProps('amount')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      type: 'number'
                    }}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />

                  <TextField
                    fullWidth
                    placeholder="0.00"
                    label="Descuento"
                    {...getFieldProps('discountPartnership')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      type: 'number'
                    }}
                  />
                </Stack>
              </Card>

              <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting}>
                {!isEdit ? 'Crear producto' : 'Guardar cambios'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
