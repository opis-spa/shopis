import React from 'react';
import PropTypes from 'prop-types';
// materials
import { styled, alpha } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';

const StackStyles = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.common.white}`,
  borderRadius: 6,
  backgroundColor: alpha(theme.palette.common.white, 0.09),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2)
}));

const propTypes = {
  price: PropTypes.number
};

function RafflePrice({ price }) {
  return (
    <StackStyles justifyContent="center" alignItems="center">
      <Typography>
        1 token x <Typography component="span">{fCurrency(price)}</Typography>
      </Typography>
    </StackStyles>
  );
}

RafflePrice.propTypes = propTypes;

export default RafflePrice;
