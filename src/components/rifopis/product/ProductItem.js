import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
// material
import { styled, alpha } from '@mui/material/styles';
import { Box, Card, Stack, Typography, Divider } from '@mui/material';

// redux
import { useSelector } from '../../../redux/store';
// components
import Label from '../../Label';
import RaffleProgress from '../raffles/RaffleProgress';
import RafflePrizes from '../raffles/RafflePrizes';
import ProductAdd from './ProductAdd';
import LinkPartnership from '../../LinkPartnership';
// utils
import { fCurrency } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const CardStyle = styled(Card)(({ theme }) => ({
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

const StackStyles = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.common.white}`,
  borderRadius: 6,
  backgroundColor: alpha(theme.palette.common.white, 0.09),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2)
}));

// ----------------------------------------------------------------------

ProductItem.propTypes = {
  product: PropTypes.object,
  className: PropTypes.string
};

function ProductItem({ product, ...other }) {
  const { name, photo, photos, amount, discountPartnership: discount, stock } = product;
  const { cart, open } = useSelector((state) => state.product.checkout);

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

  const linkTo = `/product/${paramCase(name)}`;

  return (
    <CardStyle {...other}>
      <Box sx={{ p: 2 }}>
        <LinkPartnership to={linkTo} color="inherit">
          <Label
            variant="filled"
            sx={{
              top: 30,
              right: 30,
              position: 'absolute',
              textTransform: 'uppercase',
              zIndex: 100
            }}
          >
            Detalle del sorteo
          </Label>
        </LinkPartnership>

        <ProductImgStyle alt={name} src={image[1]} />
      </Box>

      <Stack sx={{ p: 3 }} spacing={2}>
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

        <Divider variant="middle" sx={{ background: 'primary.lighter' }} />

        <RafflePrizes
          photo="/static/icons/ic-bitcoin.png"
          quantity={2}
          prize="$50.000 pesos en Bitcoin"
          position="Segundo"
        />

        <Divider variant="middle" sx={{ background: 'primary.lighter' }} />

        <RafflePrizes
          photo="/static/icons/ic-stellar.png"
          quantity={10}
          prize="$25.000 pesos en Stellar"
          position="Tercer"
        />

        <StackStyles justifyContent="center" alignItems="center">
          <Typography>
            1 token x <Typography component="span">{fCurrency(amount - (discount || 0))}</Typography>
          </Typography>
        </StackStyles>

        <RaffleProgress stock={stock} quantity={1333} />

        <ProductAdd tooltip={!open} title="Comprar token" product={productCart} />
      </Stack>
    </CardStyle>
  );
}

export default ProductItem;
