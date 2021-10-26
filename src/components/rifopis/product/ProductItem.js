import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Card, Stack, Typography, Divider, DialogContent } from '@mui/material';

// redux
import { useSelector } from '../../../redux/store';
// components
import Label from '../../Label';
import RaffleProgress from '../raffles/RaffleProgress';
import RafflePrizes from '../raffles/RafflePrizes';
import RafflePrice from '../raffles/RafflePrice';
import ProductAdd from './ProductAdd';
import { DialogAnimate } from '../../animate';
import ProductDetail from './ProductDetail';
// utils
import { positionString } from '../../../utils/positionString';

// ----------------------------------------------------------------------

const CardStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${theme.palette.secondary.light}`,
  minWidth: '40%',
  [theme.breakpoints.down('md')]: {
    minWidth: '80%!important'
  }
}));

const ProductImgStyle = styled('img')({
  width: '100%',
  height: 288,
  borderRadius: 6,
  objectFit: 'cover'
});

// ----------------------------------------------------------------------

ProductItem.propTypes = {
  product: PropTypes.object,
  className: PropTypes.string,
  onSelectProduct: PropTypes.func
};

function ProductItem({ product, onSelectProduct, ...other }) {
  const { name, photo, photos, amount, discountPartnership: discount, stock, prizes } = product;
  const { cart, open } = useSelector((state) => state.product.checkout);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleProductDetail = () => {
    onSelectProduct(product);
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
    return product;
  }, [cart, product]);

  return (
    <CardStyle {...other}>
      <DialogAnimate fullWidth open={detailOpen} maxWidth="md" scroll="paper" onClose={() => setDetailOpen(false)}>
        <DialogContent>
          <ProductDetail product={product} productCart={productCart} />
        </DialogContent>
      </DialogAnimate>

      <Box sx={{ p: 2 }}>
        <Button
          sx={{
            top: 30,
            right: 30,
            position: 'absolute',
            zIndex: 100
          }}
          onClick={handleProductDetail}
        >
          <Label variant="filled" sx={{ textTransform: 'uppercase' }}>
            Detalle del sorteo
          </Label>
        </Button>

        <ProductImgStyle alt={name} src={image[1]} />
      </Box>

      <Stack sx={{ p: 3, flex: 1 }} spacing={2}>
        <Stack spacing={1}>
          <Typography variant="subtitle1" noWrap color="primary" sx={{ textTransform: 'uppercase' }}>
            Primer Lugar
            <Typography
              component="span"
              variant="caption"
              sx={{ color: 'secondary.light', textTransform: 'uppercase' }}
            >
              &nbsp;- 1 premio
            </Typography>
          </Typography>
          <Typography variant="subtitle1" noWrap sx={{ textTransform: 'uppercase', color: 'text.primary' }}>
            {name}
          </Typography>
        </Stack>

        {prizes ? (
          prizes.map((prize, index) => {
            const { photos, name, cant } = prize;
            return (
              <>
                <Divider variant="middle" sx={{ background: 'primary.lighter' }} />
                <RafflePrizes photo={photos[0]} quantity={cant} prize={name} position={positionString(index + 1)} />
              </>
            );
          })
        ) : (
          <Divider variant="middle" sx={{ background: 'primary.lighter' }} />
        )}

        <Box sx={{ display: 'flex', flexGrow: 1 }} />

        <RafflePrice price={amount - (discount || 0)} />
        <RaffleProgress stock={stock} quantity={1333} />

        <ProductAdd tooltip={!open} title="Comprar token" product={productCart} />
      </Stack>
    </CardStyle>
  );
}

export default ProductItem;
