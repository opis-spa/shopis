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
  quantity: PropTypes.number,
  reverse: PropTypes.number
};

const defaultProps = {
  reverse: false
};

function RaffleProgress({ reverse, stock, quantity, ...other }) {
  return (
    <Stack spacing={1} direction={reverse ? 'column-reverse' : 'column'} {...other}>
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
RaffleProgress.defaultProps = defaultProps;

export default RaffleProgress;
