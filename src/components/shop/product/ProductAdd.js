import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useFormik, FormikProvider } from 'formik';
// material
import { Button, Tooltip } from '@mui/material';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// redux
import { useDispatch } from '../../../redux/store';
import { addCart, decreaseQuantity, increaseQuantity } from '../../../redux/slices/product';
// components
import Increment from '../../Increment';

const propTypes = {
  title: PropTypes.string,
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
  title: 'Agregar'
};

function ProductAdd(props) {
  const { product, title } = props;
  const { id, quantity, stock, promo } = product;
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

  const open = useMemo(() => {
    const isPrimo = (cartQuantity + 1) % 3 === 0;
    return isTreeXTwo && isPrimo;
  }, [isTreeXTwo, cartQuantity]);

  const handleIncrease = () => {
    dispatch(increaseQuantity(id));
  };
  const handleDecrease = () => {
    dispatch(decreaseQuantity(id));
  };
  const handleAddToCart = async () => {
    const addQuantity = isTreeXTwo ? 3 : 1;
    setCartQuantity(addQuantity);
    dispatch(addCart({ ...product, quantity: addQuantity }));
  };

  return (
    <FormikProvider value={formik}>
      {(cartQuantity || 0) > 0 ? (
        <Tooltip
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title="¡1 más para la promo!"
          placement="bottom"
          arrow
        >
          <Increment
            name="quantity"
            quantity={cartQuantity}
            available={stock}
            onDecrease={handleDecrease}
            onIncrease={handleIncrease}
          />
        </Tooltip>
      ) : (
        <div>
          <Button fullWidth variant="contained" color="primary" size="small" onClick={handleAddToCart}>
            {title}
          </Button>
        </div>
      )}
    </FormikProvider>
  );
}

ProductAdd.propTypes = propTypes;
ProductAdd.defaultProps = defaultProps;

export default ProductAdd;
