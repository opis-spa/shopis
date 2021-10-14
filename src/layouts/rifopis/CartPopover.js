import React from 'react';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import cartOutline from '@iconify/icons-eva/shopping-cart-outline';
// material
import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';
// route
import { PATH_RIFOPIS } from '../../routes/paths';
// components
import { MIconButton } from '../../components/@material-extend';
import LinkPartnership from '../../components/LinkPartnership';

// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  color: theme.palette.secondary.main
}));

export default function Searchbar() {
  const { checkout } = useSelector((state) => state.product);
  const { cart } = checkout;
  const totalItems = cart.length;

  return (
    <LinkPartnership to={PATH_RIFOPIS.cart}>
      <MIconButton
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
    </LinkPartnership>
  );
}
