import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { styled } from '@mui/material/styles';
import { Box, Divider, Typography, FormHelperText, Button, Stack } from '@mui/material';
// hooks
import usePartnership from '../../../hooks/usePartnership';
// route
import { PATH_SHOP } from '../../../routes/paths';
// components
import ProductAdd from './ProductAdd';
// utils
import { fCurrency } from '../../../utils/formatNumber';

const RootStyle = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up('1368')]: {
    padding: theme.spacing(5, 8)
  }
}));

const propTypes = {
  product: PropTypes.object,
  cart: PropTypes.array,
  onAddCart: PropTypes.func,
  onGotoStep: PropTypes.func
};

function ProductSummary({ product, cart, onAddCart, onGotoStep }) {
  const navigate = useNavigate();
  const { partnership } = usePartnership();
  const { nickname } = partnership;
  const { id, name, amount, photo, status, stock, discountPartnership, quantity } = product;

  const alreadyProduct = cart.map((item) => item.id).includes(id);

  const handleAdd = () => {};

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id,
      name,
      photo,
      stock,
      amount,
      discountPartnership,
      quantity
    },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        if (!alreadyProduct) {
          onAddCart({
            ...values,
            subtotal: (values.amount - values.discountPartnership) * values.quantity
          });
        }
        setSubmitting(false);
        onGotoStep(0);
        navigate(`${PATH_SHOP.root}/${nickname}/checkout`);
      } catch (err) {
        setErrors({ afterSubmit: err.code });
        setSubmitting(false);
      }
    }
  });

  const { touched, errors, handleSubmit } = formik;

  return (
    <RootStyle>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box
            sx={{
              mt: 2,
              mb: 1,
              typography: 'overline',
              color: status === 'sale' ? 'error.main' : 'info.main'
            }}
          >
            {status}
          </Box>

          <Typography variant="h5" paragraph>
            {name}
          </Typography>

          <Box sx={{ typography: 'h4', mb: 3 }}>
            {discountPartnership > 0 && (
              <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                {fCurrency(amount)}
              </Box>
            )}
            &nbsp;
            {fCurrency(amount - discountPartnership)}
          </Box>

          <Divider xs={{ borderStyle: 'dashed' }} />

          <Box
            sx={{
              my: 3,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ mt: 0.5, typography: 'subtitle1' }}>Cantidad</Box>
            <Box>
              <ProductAdd product={product} />
              <FormHelperText error>{touched.quantity && errors.quantity}</FormHelperText>
            </Box>
          </Box>

          <Divider xs={{ borderStyle: 'dashed' }} />

          <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 5 }}>
            <Button fullWidth variant="outlined" onClick={handleAdd}>
              Agregar al carrito
            </Button>
            <Button fullWidth type="submit" variant="contained">
              Comprar ahora
            </Button>
          </Stack>
        </Form>
      </FormikProvider>
    </RootStyle>
  );
}

ProductSummary.propTypes = propTypes;

export default ProductSummary;
