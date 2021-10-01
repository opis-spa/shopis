import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useFormik, FormikProvider } from 'formik';
import { Button } from '@mui/material';
import Increment from '../../Increment';
import { addCart, decreaseQuantity, increaseQuantity } from '../../../redux/slices/product';

const propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    quantity: PropTypes.number,
    amount: PropTypes.number,
    stock: PropTypes.number
  })
};

function ProductAdd(props) {
  const { product } = props;
  const { quantity, stock } = product;
  const [cartQuantity, setCartQuantity] = useState(quantity);
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      available: stock,
      quantity
    }
  });

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };
  const handleDecrease = (id) => {
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
