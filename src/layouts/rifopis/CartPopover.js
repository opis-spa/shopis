import React from 'react';
import { Icon } from '@iconify/react';
import cartOutline from '@iconify/icons-eva/shopping-cart-outline';
// material
import { alpha, styled } from '@mui/material/styles';
import { Badge } from '@mui/material';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import { setOpenCart } from '../../redux/slices/product';
// components
import { MIconButton } from '../../components/@material-extend';

// ----------------------------------------------------------------------

const StyledBadge = styled(Badge)(({ theme }) => ({
  marginLeft: 10,
  '& .MuiBadge-badge': {
    top: 10,
    border: `2px solid transparent`,
    backgroundColor: theme.palette.primary.lighter,
    padding: '0 10px',
    color: theme.palette.secondary.main
  }
}));

const IconStyle = styled(Icon)(({ theme }) => ({
  color: theme.palette.primary.lighter,
  '& .MuiButtonBase-root:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    boxShadow: 'none'
  },
  marginRight: 20,
  marginLeft: 10
}));

export default function Searchbar() {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.product);
  const { cart } = checkout;
  const totalItems = cart.length;

  const handleOpenCart = () => {
    dispatch(setOpenCart(true));
  };

  return (
    <MIconButton
      onClick={handleOpenCart}
      sx={{
        padding: 0,
        width: 44,
        height: 44
      }}
    >
      <StyledBadge badgeContent={totalItems} color="primary" max={99}>
        <IconStyle color="primary" icon={cartOutline} width={20} height={20} />
      </StyledBadge>
    </MIconButton>
  );
}
