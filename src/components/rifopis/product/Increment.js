import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-ic/baseline-plus';
import minusFill from '@iconify/icons-eva/minus-fill';
// material
import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
// components
import { MIconButton } from '../../@material-extend';
// utils
import { fCurrency } from '../../../utils/formatNumber';

const ContentStyle = styled(Stack)(({ theme }) => ({
  py: 0.5,
  px: 0.75,
  border: `1px solid ${theme.palette.secondary.lighter}`,
  lineHeight: 0,
  borderRadius: 6
}));

const ButtonStyle = styled(MIconButton)(({ theme }) => ({
  background: 'linear-gradient(124.5deg, #FFED48 0%, #FFC155 21.15%, #FF9E21 63.44%, #FF8800 104.11%)',
  borderColor: theme.palette.secondary.lighter,
  borderRadius: 5
}));

const propType = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  amount: PropTypes.number,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func
};
const defaultProps = {
  onIncrease: () => {},
  onDecrease: () => {}
};

const Increment = forwardRef((props, ref) => {
  const { available, quantity, onIncrease, onDecrease, amount } = props;

  const incrementQuantity = () => {
    onIncrease();
  };
  const decrementQuantity = () => {
    onDecrease();
  };

  return (
    <ContentStyle ref={ref} direction="row" justifyContent="space-between" alignItems="center">
      <ButtonStyle disabled={quantity === 0} onClick={decrementQuantity}>
        <Icon icon={minusFill} width={20} height={20} color="#fff" />
      </ButtonStyle>
      <Typography component="span" sx={{ textTransform: 'uppercase', fontWeight: 900, color: 'secondary.light' }}>
        {`${quantity} tickets = ${fCurrency(amount)}`}
      </Typography>
      <ButtonStyle disabled={quantity >= available && available >= 0} onClick={incrementQuantity}>
        <Icon icon={plusFill} width={20} height={20} color="#fff" />
      </ButtonStyle>
    </ContentStyle>
  );
});

Increment.propTypes = propType;
Increment.defaultProps = defaultProps;

export default Increment;
