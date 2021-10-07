import React, { forwardRef } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-fill';
import { MIconButton } from './@material-extend';

const propType = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func
};
const defaultProps = {
  onIncrease: () => {},
  onDecrease: () => {}
};

const Increment = forwardRef((props, ref) => {
  const { available, quantity, onIncrease, onDecrease } = props;

  const incrementQuantity = () => {
    onIncrease();
  };
  const decrementQuantity = () => {
    onDecrease();
  };

  return (
    <Box
      ref={ref}
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'grey.50032'
      }}
    >
      <MIconButton size="small" color="inherit" disabled={quantity === 0} onClick={decrementQuantity}>
        <Icon icon={minusFill} width={16} height={16} />
      </MIconButton>
      <Box
        component="span"
        sx={{
          width: 40,
          typography: 'body2',
          textAlign: 'center',
          display: 'inline-block'
        }}
      >
        {quantity}
      </Box>
      <MIconButton
        size="small"
        color="inherit"
        disabled={quantity >= available && available >= 0}
        onClick={incrementQuantity}
      >
        <Icon icon={plusFill} width={16} height={16} />
      </MIconButton>
    </Box>
  );
});

Increment.propTypes = propType;
Increment.defaultProps = defaultProps;

export default Increment;
