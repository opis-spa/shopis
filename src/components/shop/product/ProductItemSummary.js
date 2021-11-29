import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Typography, Stack, Divider } from '@mui/material';
// redux
import { useSelector } from '../../../redux/store';
// utils
import { fCurrency } from '../../../utils/formatNumber';

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
  product: PropTypes.object.isRequired,
  filter: PropTypes.bool
};

const defaultProps = {
  filter: true
};

const ProductItemSummary = ({ filter, product }) => {
  const { name, photo, photos, quantity } = product;
  const { cart } = useSelector((state) => state.product.checkout);

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
    return { ...product, quantity: quantity || 0 };
  }, [cart, product, quantity]);

  if (filter && productCart.quantity === 0) {
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

          <Typography>{`${productCart.quantity}`}</Typography>
        </Stack>
      </Stack>
      <Divider variant="middle" sx={{ mt: 2 }} />
    </RootStyle>
  );
};

ProductItemSummary.propTypes = propTypes;
ProductItemSummary.defaultProps = defaultProps;

export default ProductItemSummary;
