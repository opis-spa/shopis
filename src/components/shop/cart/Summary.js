import React from 'react';
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Box, Stack, Divider, Typography } from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';

const RootStyle = styled(Box)(({ theme }) => ({
  margin: theme.spacing(3, 0)
}));

const RowStyle = styled((props) => <Stack direction="row" {...props} />)(() => ({
  justifyContent: 'space-between'
}));

const propTypes = {
  delivery: PropTypes.bool,
  preview: PropTypes.bool,
  checkout: {
    subtotal: PropTypes.number,
    total: PropTypes.number,
    discount: PropTypes.number,
    shipping: PropTypes.number
  }
};

const defaultProps = {
  delivery: false,
  preview: false
};

const Summary = (props) => {
  const { delivery = false, checkout, preview = false } = props;
  const { subtotal, total, discount, shipping } = checkout;

  const fnDelivery = () => {
    if (shipping === -1) {
      return 'Envío por pagar';
    }
    if (shipping === 0) {
      return 'Envío Grátis';
    }
    return fCurrency(shipping);
  };

  return (
    <RootStyle>
      <Stack>
        <RowStyle>
          <Typography variant="body2" color="textSecondary">
            Subtotal
          </Typography>
          <Typography variant="subtitle2">{fCurrency(subtotal)}</Typography>
        </RowStyle>

        {discount > 0 && (
          <RowStyle>
            <Typography variant="body2" color="textSecondary">
              Cupón
            </Typography>
            <Typography variant="subtitle2">{fCurrency(-discount)}</Typography>
          </RowStyle>
        )}

        {!preview && delivery && (
          <RowStyle>
            <Typography variant="body2" color="textSecondary">
              Despacho
            </Typography>
            <Typography variant="subtitle2">{fnDelivery()}</Typography>
          </RowStyle>
        )}

        <Box sx={{ mb: 2 }}>
          <Divider />
        </Box>

        <RowStyle>
          <Typography variant="subtitle1">Total</Typography>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="subtitle1" gutterBottom color="error">
              {preview ? fCurrency(subtotal) : fCurrency(total)}
            </Typography>
            <Box sx={{ typography: 'caption', fontStyle: 'italic' }}>Impuestos incluidos</Box>
          </Box>
        </RowStyle>
      </Stack>
    </RootStyle>
  );
};

Summary.propTypes = propTypes;
Summary.defaultProps = defaultProps;

export default Summary;
