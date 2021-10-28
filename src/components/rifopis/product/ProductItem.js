import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Card, Stack, Typography, Divider, DialogContent } from '@mui/material';

// redux
import { useSelector } from '../../../redux/store';
// components
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
  },
  paddingBottom: theme.spacing(2),
  boxSizing: 'border-box',
  boxShadow: '-2px -2px 14px rgba(255, 194, 36, 0.2)',
  overflow: 'visible'
}));

const ProductImgStyle = styled('img')({
  width: '100%',
  height: 288,
  borderTopLeftRadius: 6,
  borderTopRightRadius: 6,
  objectFit: 'cover'
});

// ----------------------------------------------------------------------

ProductItem.propTypes = {
  product: PropTypes.object,
  className: PropTypes.string,
  onSelectProduct: PropTypes.func
};

function ProductItem({ product, onSelectProduct, ...other }) {
  const { name, promo, photo, photos, amount, discountPartnership: discount, stock, prizes } = product;
  const { cart, open } = useSelector((state) => state.product.checkout);
  const [detailOpen, setDetailOpen] = useState(false);
  const isPromo = promo === '3x2';

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
    <>
      <CardStyle {...other}>
        <DialogAnimate fullWidth open={detailOpen} maxWidth="md" scroll="paper" onClose={() => setDetailOpen(false)}>
          <DialogContent>
            <ProductDetail product={product} productCart={productCart} />
          </DialogContent>
        </DialogAnimate>
        {isPromo && (
          <Box
            component="img"
            src="/static/icons/ic_promo_rifopis.svg"
            alt="Promo 3x2"
            sx={{ position: 'absolute', width: 100, height: 100, right: -5, top: -5, zIndex: 1000 }}
          />
        )}
        <Box sx={{ p: 2 }}>
          <ProductImgStyle alt={name} src={image[1]} />
          <RafflePrice isPromo={promo === '3x2'} price={amount - (discount || 0)} />
          <ProductAdd tooltip={!open} title="Comprar tokens" product={productCart} sx={{ mt: 1 }} />
        </Box>

        <Stack sx={{ px: 3, flex: 1 }} spacing={2}>
          <RaffleProgress stock={stock} quantity={1333} reverse />
          <Stack>
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
                  <RafflePrizes photo={photos[0]} quantity={cant} prize={name} position={positionString(index + 2)} />
                </>
              );
            })
          ) : (
            <Divider variant="middle" sx={{ background: 'primary.lighter' }} />
          )}

          <Box sx={{ display: 'flex', flexGrow: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              color="inherit"
              sx={{
                textTransform: 'uppercase',
                fontWeight: 900,
                backgroundColor: 'secondary.light'
              }}
              onClick={handleProductDetail}
            >
              Detalle del sorteo
            </Button>
          </Box>
        </Stack>
      </CardStyle>
    </>
  );
}

export default ProductItem;
