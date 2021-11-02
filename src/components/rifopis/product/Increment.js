import React, { useMemo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-ic/baseline-plus';
import minusFill from '@iconify/icons-eva/minus-fill';
// material
import { styled, useTheme } from '@mui/material/styles';
import { Stack, Typography, useMediaQuery } from '@mui/material';
// components
import { MIconButton } from '../../@material-extend';
// utils
import { fCurrency } from '../../../utils/formatNumber';

const ContentStyle = styled(Stack)(({ theme }) => ({
  px: 0.75,
  border: `1px solid ${theme.palette.primary.lighter}`,
  lineHeight: 0,
  borderRadius: 6
}));

const ButtonStyle = styled(MIconButton)(({ theme }) => ({
  background: 'linear-gradient(124.5deg, #FFED48 0%, #FFC155 21.15%, #FF9E21 63.44%, #FF8800 104.11%)',
  borderColor: theme.palette.primary.lighter,
  borderRadius: 5
}));

const propType = {
  big: PropTypes.bool,
  simple: PropTypes.bool,
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
  const { big = true, simple, available, quantity, onIncrease, onDecrease, amount, ...other } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const size = useMemo(() => {
    if (big) {
      if (isMobile) {
        return 45;
      }
      return 73;
    }
    return 30;
  }, [big, isMobile]);

  const incrementQuantity = () => {
    onIncrease();
  };
  const decrementQuantity = () => {
    onDecrease();
  };

  return (
    <ContentStyle ref={ref} direction="row" justifyContent="space-between" alignItems="center" {...other}>
      <ButtonStyle disabled={quantity === 0} onClick={decrementQuantity} sx={{ width: size, height: size }}>
        <Icon icon={minusFill} width={20} height={20} color="#fff" />
      </ButtonStyle>
      <Typography component="span" sx={{ textTransform: 'uppercase', fontWeight: 900, color: 'primary.light' }}>
        {simple ? (
          <>{`${quantity}`}</>
        ) : (
          <>
            {isMobile ? (
              <>{`${quantity}x = ${fCurrency(amount)}`}</>
            ) : (
              <>{`${quantity} ${quantity > 1 ? 'tokens' : 'token'} = ${fCurrency(amount)}`}</>
            )}
          </>
        )}
      </Typography>
      <ButtonStyle
        disabled={quantity >= available && available >= 0}
        onClick={incrementQuantity}
        sx={{ width: size, height: size }}
      >
        <Icon icon={plusFill} width={20} height={20} color="#fff" />
      </ButtonStyle>
    </ContentStyle>
  );
});

Increment.propTypes = propType;
Increment.defaultProps = defaultProps;

export default Increment;
