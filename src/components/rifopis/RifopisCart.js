import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import trashFill from '@iconify/icons-eva/trash-2-fill';
import { useFormik } from 'formik';
// material
import { styled } from '@mui/material/styles';
import { Checkbox, Box, Backdrop, Button, Paper, Divider, Typography, Stack } from '@mui/material';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
import usePartnership from '../../hooks/usePartnership';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import {
  deleteCart,
  getCart,
  setOpenCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity
} from '../../redux/slices/product';
// route
import { PATH_RIFOPIS } from '../../routes/paths';
// components
import Scrollbar from '../Scrollbar';
import { MIconButton } from '../@material-extend';
import ButtonTicket from './ButtonTicket';
import LinkPartnership from '../LinkPartnership';
import ProductList from './product/ProductList';
// utils
import { fCurrency } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

const TypographyStyle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  textTransform: 'uppercase',
  fontWeight: 900
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  textTransform: 'uppercase'
}));

const DRAWER_WIDTH = 500;

export default function RifopisCart() {
  const partnership = usePartnership();
  const isMountedRef = useIsMountedRef();
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.product);
  const { open, cart } = checkout;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  useEffect(() => {
    if (isMountedRef.current) {
      dispatch(getCart(cart));
    }
  }, [dispatch, isMountedRef, cart]);

  const handleDeleteProduct = (id) => {
    dispatch(deleteCart(id));
  };

  const handleIncrementCart = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseCart = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { products: cart },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        setSubmitting(true);
      } catch (error) {
        console.error(error);
        setErrors(error.message);
      }
    }
  });

  const handleClose = () => {
    dispatch(setOpenCart(false));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <Backdrop sx={{ zIndex: 2000 }} open={open} onClick={handleClose} />

      <Box
        sx={{
          top: 0,
          bottom: 0,
          right: 0,
          position: 'fixed',
          zIndex: 2001,
          ...(open && { right: 12 })
        }}
      >
        <Paper
          sx={{
            height: 1,
            width: '0px',
            borderRadius: '0px',
            overflow: 'hidden',
            boxShadow: (theme) => theme.customShadows.z24,
            transition: (theme) => theme.transitions.create('width'),
            ...(open && { width: DRAWER_WIDTH })
          }}
        >
          <Stack spacing={2} justifyContent="space-between" sx={{ height: '100%' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ pt: 2, pr: 1, pl: 2.5 }}>
              <Typography variant="subtitle1">Mi carrito</Typography>
              <MIconButton onClick={handleClose}>
                <Icon icon={closeFill} width={20} height={20} />
              </MIconButton>
            </Stack>

            <Divider variant="middle" />

            <Box sx={{ minHeight: 200, flex: 1, px: 2 }}>
              <Box sx={{ textAlign: 'right' }}>
                <ButtonStyle onClick={handleClearCart} endIcon={<Icon icon={trashFill} color="white" />}>
                  vaciar carrito
                </ButtonStyle>
              </Box>
              <Scrollbar>
                <ProductList
                  direction="column"
                  formik={formik}
                  onDelete={handleDeleteProduct}
                  onIncreaseQuantity={handleIncrementCart}
                  onDecreaseQuantity={handleDecreaseCart}
                />
              </Scrollbar>
            </Box>

            <Divider variant="middle" />

            <Box sx={{ px: 4 }}>
              <Stack direction="row" justifyContent="space-between">
                <TypographyStyle variant="h4">Total</TypographyStyle>
                <TypographyStyle variant="h4">{fCurrency(checkout.total)}</TypographyStyle>
              </Stack>

              <Stack direction="row" justifyContent="flex-start">
                <Checkbox
                  sx={{
                    color: 'primary.light',
                    '&:hover': { bgcolor: 'transparent' }
                  }}
                  color="primary"
                />
                <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                  Al momento de presionar el botón "COMPRAR TICKETS" accedo a las Bases del sorteo y a las Politica de
                  privacidad
                </Typography>
              </Stack>

              <Box sx={{ py: 2, textAlign: 'center' }}>
                <LinkPartnership
                  to={PATH_RIFOPIS.checkout}
                  variant="contained"
                  disabled={checkout.subtotal === 0 || checkout.subtotal < partnership.deliveryAmountMin}
                >
                  <ButtonTicket fullWidth>Comprar ticket</ButtonTicket>
                </LinkPartnership>
              </Box>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </>
  );
}
