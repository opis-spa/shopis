import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import trashFill from '@iconify/icons-eva/trash-2-fill';
// material
import { styled } from '@mui/material/styles';
import { Typography, Stack, Divider } from '@mui/material';
// redux
import { useSelector, useDispatch } from '../../../redux/store';
import { deleteCart } from '../../../redux/slices/product';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import ProductAdd from './ProductAdd';
import { MIconButton } from '../../@material-extend';

const RootStyle = styled('div')(() => ({
  width: '100%',
  alignItems: 'flex-end'
}));

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 80,
  height: 80,
  objectFit: 'cover',
  marginRight: theme.spacing(2),
  borderRadius: 6
}));

const propTypes = {
  product: PropTypes.object.isRequired
};

const ProductItemSimple = ({ product }) => {
  const { id, name, photo, photos } = product;
  const dispatch = useDispatch();
  const { cart, open } = useSelector((state) => state.product.checkout);

  const handleDelete = () => {
    dispatch(deleteCart(id));
  };

  const image = useMemo(() => {
    if (photos) {
      return photos;
    }
    return [photo, photo];
  }, [photos, photo]);

  const productCart = useMemo(() => {
    const cartNew = cart.find((item) => item.id === product.id);
    if (cartNew) {
      return cartNew;
    }
    return { ...product, quantity: 0 };
  }, [cart, product]);

  if (productCart.quantity === 0) {
    return <></>;
  }

  return (
    <RootStyle container>
      <Stack direction="row">
        <ThumbImgStyle alt="product image" src={image[0]} />

        <Stack sx={{ flex: 1 }}>
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontWeight: 700, maxWidth: 180, flex: 1 }}>{name}</Typography>
            <Typography sx={{ fontWeight: 900 }}>{fCurrency(productCart.subtotal)}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="flex-end">
            <MIconButton onClick={handleDelete}>
              <Icon icon={trashFill} width={20} height={20} color="white" />
            </MIconButton>
            <ProductAdd
              tooltip={open}
              simple
              big={false}
              product={productCart}
              min={1}
              sx={{ width: 100, height: 31 }}
            />
          </Stack>
        </Stack>
      </Stack>
      <Divider variant="middle" sx={{ mt: 2 }} />
    </RootStyle>
  );
};

ProductItemSimple.propTypes = propTypes;

export default ProductItemSimple;
