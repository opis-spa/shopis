import React from 'react';
import { Icon } from '@iconify/react';
import cartOutline from '@iconify/icons-eva/shopping-cart-outline';
// material
import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import { setOpenCart } from '../../redux/slices/product';
// components
import { MIconButton } from '../../components/@material-extend';

// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  color: theme.palette.primary.light
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
      <Badge badgeContent={totalItems} color="error" max={99} variant="dot">
        <IconStyle icon={cartOutline} width={20} height={20} />
      </Badge>
    </MIconButton>
  );
}
