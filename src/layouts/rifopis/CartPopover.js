import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import cartOutline from '@iconify/icons-eva/shopping-cart-outline';
// material
import { styled } from '@mui/material/styles';
import { Badge, Button } from '@mui/material';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import { setOpenCart } from '../../redux/slices/product';
// components
import { MotionContainer } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(122.73deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
  borderRadius: 20,
  padding: 0,
  height: 30,
  justifyContent: 'flex-start',
  paddingLeft: 5
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    top: 10,
    border: 'none',
    background: `linear-gradient(122.73deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
    padding: '15px 10px',
    color: theme.palette.common.black,
    borderRadius: 20,
    fontWeight: 900,
    width: 40
  }
}));

const IconStyle = styled(Icon)(({ theme }) => ({
  color: theme.palette.common.black,
  marginRight: 20,
  marginLeft: 0,
  '& .MuiButtonBase-root:hover': {
    backgroundColor: `linear-gradient(122.73deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 47.4%, ${theme.palette.primary.light} 100%)`,
    boxShadow: 'none'
  }
}));

export default function Searchbar() {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.product);
  const { cart } = checkout;
  const totalItems = cart.reduce((before, current) => before + (current.quantity || 0), 0) || 0;

  const handleOpenCart = () => {
    dispatch(setOpenCart(true));
  };

  return (
    <MotionContainer initial="initial" open={totalItems > 0}>
      <motion.div
        variants={{
          animate: {
            scale: [1, 1.3, 0.8, 1.2, 0.97, 1],
            opacity: [1, 1, 1, 1, 1, 1],
            transition: { repeat: Infinity, duration: 1, repeatDelay: 3 }
          }
        }}
      >
        <StyledButton
          disabled={totalItems === 0}
          onClick={handleOpenCart}
          sx={{ ...(totalItems === 0 && { background: 'none', justifyContent: 'center', paddingLeft: 0 }) }}
        >
          <StyledBadge badgeContent={totalItems} max={99}>
            <IconStyle
              icon={cartOutline}
              width={20}
              height={20}
              sx={{ ...(totalItems === 0 && { color: 'primary.lighter' }) }}
            />
          </StyledBadge>
        </StyledButton>
      </motion.div>
    </MotionContainer>
  );
}
