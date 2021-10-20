import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
// material
import {
  Box,
  Card,
  Stack,
  Button,
  Divider,
  TextField,
  CardHeader,
  Typography,
  CardContent,
  InputAdornment
} from '@mui/material';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// redux
import { useSelector, useDispatch } from '../../../redux/store';
import { getCart } from '../../../redux/slices/product';
// component
import Scrollbar from '../../Scrollbar';
import ProductList from '../../rifopis/product/ProductList';
// utils
import { fCurrency } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

CheckoutSummary.propTypes = {
  total: PropTypes.number,
  discount: PropTypes.number,
  delivery: PropTypes.bool,
  subtotal: PropTypes.number,
  shipping: PropTypes.number,
  onApplyDiscount: PropTypes.func,
  enableDiscount: PropTypes.bool,
  preview: PropTypes.bool
};

export default function CheckoutSummary({
  total,
  discount,
  delivery = false,
  subtotal,
  shipping = null,
  onApplyDiscount,
  enableDiscount = false,
  preview = false
}) {
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const { checkout } = useSelector((state) => state.product);
  const { cart } = checkout;
  const fnDelivery = (totals) => {
    if (delivery === -1) {
      return 'Envío por pagar';
    }
    if (delivery === 0) {
      return 'Envío Grátis';
    }
    return fCurrency(totals.delivery);
  };

  useMemo(() => {
    if (isMountedRef.current) {
      dispatch(getCart(cart));
    }
  }, [dispatch, isMountedRef, cart]);

  return (
    <Card sx={{ my: 3 }}>
      <CardHeader title="Resumen de tu pedido" />

      <CardContent>
        <Stack spacing={2}>
          {total !== subtotal && (
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Subtotal
              </Typography>
              <Typography variant="subtitle2">{fCurrency(subtotal)}</Typography>
            </Stack>
          )}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1" sx={{ color: 'primary.light' }}>
              Total a pagar
            </Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" sx={{ color: 'primary.light' }}>
                {fCurrency(total)}
              </Typography>
              <Typography variant="caption" sx={{ color: 'secondary.light', fontStyle: 'italic' }}>
                (Todos los impuestos incluidos)
              </Typography>
            </Box>
          </Stack>
          <Box sx={{ minHeight: 200, flex: 1, px: 2 }}>
            <Scrollbar>
              <ProductList view="resumen" direction="column" />
            </Scrollbar>
          </Box>

          {discount > 0 && (
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="textSecondary">
                Cupón
              </Typography>
              <Typography variant="subtitle2">{fCurrency(-discount)}</Typography>
            </Stack>
          )}

          {!preview && delivery && (
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="textSecondary">
                Despacho
              </Typography>
              <Typography variant="subtitle2">{fnDelivery(shipping)}</Typography>
            </Stack>
          )}

          <Box sx={{ mb: 2 }}>
            <Divider />
          </Box>

          {enableDiscount && (
            <TextField
              fullWidth
              placeholder="Discount codes / Gifts"
              value="DISCOUNT5"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button type="button" onClick={() => onApplyDiscount(5)} sx={{ mr: -0.5 }}>
                      Apply
                    </Button>
                  </InputAdornment>
                )
              }}
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
