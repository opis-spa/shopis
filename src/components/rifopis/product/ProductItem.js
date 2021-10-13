import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
// material
import { styled, alpha } from '@mui/material/styles';
import { Avatar, Box, Card, Stack, Typography, Divider } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

// redux
import { useSelector } from '../../../redux/store';
// components
import Label from '../../Label';
import ProductAdd from './ProductAdd';
import LinkPartnership from '../../LinkPartnership';
// utils
import { fCurrency } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const CardStyle = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.light}`
}));

const ProductImgStyle = styled('img')({
  width: '100%',
  maxHeight: 288,
  borderRadius: 6,
  objectFit: 'cover'
});

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.secondary.main
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 0,
    backgroundColor: theme.palette.secondary.lighter
  }
}));

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
  const { cart } = useSelector((state) => state.product.checkout);

  const image = useMemo(() => {
    if (photos) {
      return photos;
    }
    return [photo];
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

        <ProductImgStyle alt={name} src={image[0]} />
      </Box>

      <Stack sx={{ p: 3 }} spacing={2}>
        <Stack spacing={1}>
          <Typography variant="subtitle1" noWrap color="secondary" sx={{ textTransform: 'uppercase' }}>
            Primer Lugar
            <Typography component="span" variant="caption" sx={{ color: 'primary.light', textTransform: 'uppercase' }}>
              &nbsp;- 1 premio
            </Typography>
          </Typography>
          <Typography variant="subtitle1" noWrap sx={{ textTransform: 'uppercase', color: 'text.primary' }}>
            {name}
          </Typography>
        </Stack>

        <Divider variant="middle" sx={{ background: '#000000' }} />

        <Stack direction="row" spacing={2}>
          <Avatar src="/static/icons/ic-bitcoin.png" sx={{ width: 40, height: 40 }} />

          <Stack>
            <Typography
              variant="caption"
              noWrap
              color="secondary"
              sx={{ color: 'primary.light', textTransform: 'uppercase' }}
            >
              Segundo lugar
              <Typography
                component="span"
                variant="caption"
                sx={{ color: 'primary.light', textTransform: 'uppercase' }}
              >
                &nbsp;- 2 premios
              </Typography>
            </Typography>
            <Typography variant="subtitle2" noWrap color="secondary" sx={{ color: 'text.main' }}>
              $50.000 pesos en Bitcoin
            </Typography>
          </Stack>
        </Stack>

        <Divider variant="middle" sx={{ background: '#000000' }} />

        <Stack direction="row" spacing={2}>
          <Avatar src="/static/icons/ic-stellar.png" sx={{ width: 40, height: 40 }} />

          <Stack>
            <Typography
              variant="caption"
              noWrap
              color="secondary"
              sx={{ color: 'primary.light', textTransform: 'uppercase' }}
            >
              Tercer lugar
              <Typography
                component="span"
                variant="caption"
                sx={{ color: 'primary.light', textTransform: 'uppercase' }}
              >
                &nbsp;- 10 premios
              </Typography>
            </Typography>
            <Typography variant="subtitle2" noWrap color="secondary" sx={{ color: 'text.main' }}>
              $25.000 pesos en Stellar
            </Typography>
          </Stack>
        </Stack>

        <StackStyles justifyContent="center" alignItems="center">
          <Typography>
            1 ticket x <Typography component="span">{fCurrency(amount - (discount || 0))}</Typography>
          </Typography>
        </StackStyles>

        <Typography
          variant="caption"
          sx={{ fontWeight: 900, textTransform: 'uppercase', color: 'secondary.light', textAlign: 'right' }}
        >{`¡Quedan solo ${stock} tickets!`}</Typography>
        <BorderLinearProgress variant="determinate" value={stock === 0 ? 100 : 100 - (stock / 1333) * 100} />

        <ProductAdd title="Comprar ticket" product={productCart} />
      </Stack>
    </CardStyle>
  );
}

export default ProductItem;
