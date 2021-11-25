import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
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
// redux
import { useDispatch } from '../../redux/store';
import { createProduct, editProduct } from '../../redux/slices/product';
// components
import { QuillEditor } from '../editor';
import { UploadMultiFile } from '../upload';
// utils
import { isEmptyTag } from '../../utils/regexValidation';

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

// ----------------------------------------------------------------------

ProductNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object
};

export default function ProductNewForm({ isEdit, currentProduct }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
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
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      photos: [],
      amount: currentProduct?.amount || 0,
      discountPartnership: currentProduct?.discountPartnership || 0,
      tags: currentProduct?.tags || [],
      stockInfinity: (currentProduct?.stock || -1) === -1,
      stock: currentProduct?.stock || -1
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (isEdit) {
          await dispatch(editProduct(values, files, currentProduct._id));
        } else {
          await dispatch(createProduct(values, files));
        }
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Producto creado satisfactoriamente' : 'Producto editado satisfactoriamente', {
          variant: 'success'
        });
        navigate(PATH_APP.business.products);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Error al crear producto' : 'Error al editar producto', {
          variant: 'error'
        });
      }
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

  const handleChangeStock = () => {
    setFieldValue('stock', !values.stockInfinity ? -1 : 1);
    setFieldValue('stockInfinity', !values.stockInfinity);
  };

  const handleRemoveAll = () => {
    setFieldValue('photos', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.photos.filter((_file) => _file !== file);
    setFieldValue('photos', filteredItems);
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
                    prevFiles={currentProduct?.photos || []}
                    files={values.photos || []}
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
                </Stack>
              </Card>

              <Card sx={{ p: 3 }}>
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

                <Stack spacing={3}>
                  {!values.stockInfinity && (
                    <TextField
                      fullWidth
                      label={`Inventario${isEdit ? ' *' : ' Inicial *'}`}
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
