import React from 'react';
import PropTypes from 'prop-types';
// materials
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.primary.main
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.lighter
  }
}));

const propTypes = {
  stock: PropTypes.number,
  quantity: PropTypes.number
};

function RaffleProgress({ stock, quantity }) {
  return (
    <Stack spacing={2}>
      <Typography
        variant="caption"
        sx={{ fontWeight: 900, textTransform: 'uppercase', color: 'primary.light', textAlign: 'right' }}
      >
        {`¡Quedan solo ${stock} tokens!`}
      </Typography>
      <BorderLinearProgress variant="determinate" value={stock === 0 ? 100 : 100 - (stock / quantity) * 100} />
    </Stack>
  );
}

RaffleProgress.propTypes = propTypes;

export default RaffleProgress;
