import React from 'react';
import PropTypes from 'prop-types';
// materials
import { Avatar, Stack, Typography } from '@mui/material';

const propTypes = {
  photo: PropTypes.string,
  position: PropTypes.string,
  quantity: PropTypes.number,
  prize: PropTypes.string
};

function RafflePrizes(props) {
  const { photo, position, quantity, prize } = props;

  return (
    <Stack direction="row" spacing={2}>
      <Avatar src={photo} sx={{ width: 40, height: 40 }} />
      <Stack>
        <Typography
          variant="caption"
          noWrap
          color="secondary"
          sx={{ color: 'primary.light', textTransform: 'uppercase' }}
        >
          {`${position} lugar`}
          <Typography component="span" variant="caption" sx={{ color: 'secondary.light', textTransform: 'uppercase' }}>
            &nbsp;- {quantity} premios
          </Typography>
        </Typography>
        <Typography variant="subtitle2" noWrap color="secondary" sx={{ color: 'text.main' }}>
          {prize}
        </Typography>
      </Stack>
    </Stack>
  );
}

RafflePrizes.propTypes = propTypes;

export default RafflePrizes;
