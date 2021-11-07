import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useFormik, FormikProvider } from 'formik';
// material
import { styled } from '@mui/material/styles';
import { Box, Fade } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// redux
import { useDispatch } from '../../../redux/store';
import { addCart, decreaseQuantity, increaseQuantity } from '../../../redux/slices/product';
// components
import ButtonTicket from '../ButtonTicket';
import Increment from './Increment';

const TooltipStyle = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
  ({ theme }) => ({
    zIndex: 3000,
    [`& .${tooltipClasses.tooltip}`]: {
      color: theme.palette.primary.main,
      padding: theme.spacing(1),
      backgroundColor: theme.palette.common.white,
      boxShadow: theme.shadows[1],
      fontSize: 18,
      fontWeight: 900
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.white
    }
  })
);

const propTypes = {
  title: PropTypes.string,
  simple: PropTypes.bool,
  min: PropTypes.number,
  big: PropTypes.bool,
  tooltip: PropTypes.bool,
  product: PropTypes.shape({
    id: PropTypes.string,
    quantity: PropTypes.number,
    amount: PropTypes.number,
    stock: PropTypes.number,
    promo: PropTypes.string,
    type: PropTypes.string
  })
};

const defaultProps = {
  title: 'Agregar',
  big: true,
  tooltip: true,
  min: 0
};

function ProductAdd(props) {
  const { product, title, simple, big, tooltip, min, ...other } = props;
  const { id, quantity, stock, amount, promo } = product;
  const isTreeXTwo = promo === '3x2';
  const isMountedRef = useIsMountedRef();
  const [cartQuantity, setCartQuantity] = useState(quantity);
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      available: stock,
      quantity
    }
  });

  useEffect(() => {
    if (isMountedRef.current) {
      setCartQuantity(product.quantity);
    }
  }, [dispatch, isMountedRef, product]);

  const amountPromo = useMemo(() => {
    let cant = cartQuantity;
    if (isTreeXTwo) {
      const discount = Math.trunc(cartQuantity / 3);
      cant -= discount;
    }
    return amount * cant;
  }, [isTreeXTwo, cartQuantity, amount]);

  const open = useMemo(() => {
    const isPrimo = (cartQuantity + 1) % 3 === 0;
    return isTreeXTwo && isPrimo;
  }, [isTreeXTwo, cartQuantity]);

  const handleIncrease = () => {
    dispatch(increaseQuantity(id));
  };
  const handleDecrease = () => {
    if (quantity - 1 >= min || min === 0) {
      dispatch(decreaseQuantity(id));
    }
  };
  const handleAddToCart = async () => {
    const addQuantity = isTreeXTwo ? 3 : 1;
    setCartQuantity(addQuantity);
    dispatch(addCart({ ...product, quantity: addQuantity }));
  };

  return (
    <FormikProvider value={formik}>
      {(cartQuantity || 0) > 0 ? (
        <TooltipStyle
          open={tooltip && open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          title="¡1 más para la promo!"
          placement="bottom"
          arrow
        >
          <Increment
            big={big}
            simple={simple}
            name="quantity"
            amount={amountPromo}
            quantity={cartQuantity}
            available={stock}
            onDecrease={handleDecrease}
            onIncrease={handleIncrease}
            {...other}
          />
        </TooltipStyle>
      ) : (
        <Box display="flex" justifyContent="center" {...other}>
          <ButtonTicket title={title} fullWidth variant="contained" color="secondary" onClick={handleAddToCart}>
            {title}
          </ButtonTicket>
        </Box>
      )}
    </FormikProvider>
  );
}

ProductAdd.propTypes = propTypes;
ProductAdd.defaultProps = defaultProps;

export default ProductAdd;
