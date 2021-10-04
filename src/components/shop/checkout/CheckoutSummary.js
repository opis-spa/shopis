import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
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
// utils
import { fCurrency } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

CheckoutSummary.propTypes = {
  total: PropTypes.number,
  discount: PropTypes.number,
  delivery: PropTypes.bool,
  subtotal: PropTypes.number,
  shipping: PropTypes.number,
  onEdit: PropTypes.func,
  enableEdit: PropTypes.bool,
  onApplyDiscount: PropTypes.func,
  enableDiscount: PropTypes.bool,
  preview: PropTypes.bool
};

export default function CheckoutSummary({
  total,
  onEdit,
  discount,
  delivery = false,
  subtotal,
  shipping = null,
  onApplyDiscount,
  enableEdit = false,
  enableDiscount = false,
  preview = false
}) {
  const fnDelivery = (totals) => {
    if (delivery === -1) {
      return 'Envío por pagar';
    }
    if (delivery === 0) {
      return 'Envío Grátis';
    }
    return fCurrency(totals.delivery);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Resumen"
        action={
          enableEdit && (
            <Button size="small" type="button" onClick={onEdit} startIcon={<Icon icon={editFill} />}>
              Edit
            </Button>
          )
        }
      />

      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Subtotal
            </Typography>
            <Typography variant="subtitle2">{fCurrency(subtotal)}</Typography>
          </Stack>

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

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Total</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                {fCurrency(total)}
              </Typography>
              <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                (Todos los impuestos incluidos)
              </Typography>
            </Box>
          </Stack>

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
