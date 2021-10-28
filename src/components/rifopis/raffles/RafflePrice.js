import React from 'react';
import PropTypes from 'prop-types';
// materials
import { styled, alpha } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';

const StackStyles = styled(Stack)(({ theme }) => ({
  borderRadius: 6,
  backgroundColor: alpha(theme.palette.common.white, 0.09)
}));

const propTypes = {
  price: PropTypes.number,
  isPromo: PropTypes.bool,
  sx: PropTypes.object
};

const defaultProps = {
  sx: {}
};

function RafflePrice({ price, sx, ...other }) {
  return (
    <StackStyles
      spacing={1}
      direction="row"
      sx={{ justifyContent: 'center', alignItems: 'center', height: 80, marginTop: -1, ...sx }}
      {...other}
    >
      <Typography variant="h4" sx={{ fontWeight: 800, textTransform: 'uppercase' }}>
        1 token x
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        {`${fCurrency(price)} CLP`}
      </Typography>
    </StackStyles>
  );
}

RafflePrice.propTypes = propTypes;
RafflePrice.defaultProps = defaultProps;

export default RafflePrice;
