import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormik, FormikProvider } from 'formik';
// material
import { Button } from '@mui/material';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// redux
import { useDispatch } from '../../../redux/store';
import { addCart, decreaseQuantity, increaseQuantity } from '../../../redux/slices/product';
// components
import Increment from '../../Increment';

const propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    quantity: PropTypes.number,
    amount: PropTypes.number,
    stock: PropTypes.number
  })
};

function ProductAdd(props) {
  const { product } = props;
  const { id, quantity, stock } = product;
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

  const handleIncrease = () => {
    dispatch(increaseQuantity(id));
  };
  const handleDecrease = () => {
    dispatch(decreaseQuantity(id));
  };
  const handleAddToCart = async () => {
    setCartQuantity(1);
    dispatch(addCart({ ...product, quantity: 1 }));
  };

  return (
    <FormikProvider value={formik}>
      {(cartQuantity || 0) > 0 ? (
        <div>
          <Increment
            name="quantity"
            quantity={cartQuantity}
            available={stock}
            onDecrease={handleDecrease}
            onIncrease={handleIncrease}
          />
        </div>
      ) : (
        <div>
          <Button fullWidth variant="contained" color="primary" size="small" onClick={handleAddToCart}>
            agregar
          </Button>
        </div>
      )}
    </FormikProvider>
  );
}

ProductAdd.propTypes = propTypes;

export default ProductAdd;
