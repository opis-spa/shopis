import React from 'react';
import PropTypes from 'prop-types';
// materials
import { styled, alpha } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';
import { fToNow } from '../../../utils/formatTime';

const StackStyles = styled(Stack)(({ theme }) => ({
  borderRadius: 6,
  backgroundColor: alpha(theme.palette.common.white, 0.09)
}));

const propTypes = {
  price: PropTypes.number,
  expireAt: PropTypes.string,
  isPromo: PropTypes.bool,
  sx: PropTypes.object
};

const defaultProps = {
  sx: {}
};

function RafflePrice({ price, expireAt, sx, ...other }) {
  return (
    <StackStyles
      direction="row"
      justifyContent="space-between"
      sx={{ p: (theme) => theme.spacing(2), alignItems: 'flex-start', height: 80, marginTop: -1, ...sx }}
      {...other}
    >
      <Stack direction="column">
        <Typography variant="title" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
          precio:
        </Typography>
        <Typography variant="subtitle" sx={{ fontWeight: 700 }}>
          {`${fCurrency(price)} CLP`}
        </Typography>
      </Stack>

      <Stack direction="column" sx={{ justifyContent: 'flex-end' }}>
        <Typography variant="title" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
          vence en:
        </Typography>
        <Typography variant="subtitle" sx={{ textAlign: 'right', fontWeight: 700 }}>
          {expireAt && fToNow(new Date(expireAt))}
        </Typography>
      </Stack>
    </StackStyles>
  );
}

RafflePrice.propTypes = propTypes;
RafflePrice.defaultProps = defaultProps;

export default RafflePrice;
