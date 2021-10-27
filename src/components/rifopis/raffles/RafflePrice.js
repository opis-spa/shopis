import React from 'react';
import PropTypes from 'prop-types';
// materials
import { styled, alpha } from '@mui/material/styles';
import { Box, Stack, Typography } from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';

const StackStyles = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.common.white}`,
  borderRadius: 6,
  backgroundColor: alpha(theme.palette.common.white, 0.09),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2)
}));

const propTypes = {
  price: PropTypes.number,
  isPromo: PropTypes.bool
};

function RafflePrice({ isPromo, price, ...other }) {
  return (
    <StackStyles justifyContent="center" {...other}>
      <Typography sx={{ ml: 3, textAlign: 'left' }}>
        1 token x <Typography component="span">{fCurrency(price)}</Typography>
      </Typography>
      {isPromo && (
        <Box
          component="img"
          src="/static/icons/ic_promo_rifopis.svg"
          alt="Promo 3x2"
          sx={{ position: 'absolute', width: 100, height: 100, right: 20, zIndex: 1000 }}
        />
      )}
    </StackStyles>
  );
}

RafflePrice.propTypes = propTypes;

export default RafflePrice;
