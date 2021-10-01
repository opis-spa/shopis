import React from 'react';
import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Typography } from '@mui/material';
// components
import Label from '../../Label';
import ProductAdd from './ProductAdd';
import LinkPartnership from '../../LinkParnership';
// utils
import { fCurrency } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ProductItem.propTypes = {
  product: PropTypes.object,
  className: PropTypes.string
};

function ProductItem({ product, ...other }) {
  const { name, photo, amount, discountPartnership: discount, unitMeasurement } = product;

  const parseUnity = (value) => {
    try {
      const unitObject = JSON.parse(value);
      return Object.keys(unitObject)
        .map((key) => `${unitObject[key]} ${key}`)
        .join('');
    } catch (error) {
      return `1 ${value || 'unid'}`;
    }
  };

  const linkTo = `/product/${paramCase(name)}`;

  return (
    <Card {...other}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {discount > 0 && (
          <Label
            variant="filled"
            color="error"
            sx={{
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
              zIndex: 100
            }}
          >
            Descuento
          </Label>
        )}

        <ProductImgStyle alt={name} src={photo} />
      </Box>

      <Stack sx={{ p: 3 }}>
        <LinkPartnership to={linkTo} color="inherit">
          <Typography variant="subtitle1" noWrap>
            {name}
          </Typography>
        </LinkPartnership>

        <Stack justifyContent="space-between">
          <Typography variant="subtitle2">{parseUnity(unitMeasurement)}</Typography>

          <Stack direction="row" justifyContent="space-between" sx={{ mt: (theme) => theme.spacing(2) }}>
            <Box sx={{ flexDirection: 'row' }}>
              <Typography>{fCurrency(amount - (discount || 0))}</Typography>

              {(discount || 0) > 0 && (
                <Typography sx={{ fontSize: 12, opacity: 0.6, textDecoration: 'line-through' }}>
                  {fCurrency(amount)}
                </Typography>
              )}
            </Box>

            <ProductAdd product={product} />
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ProductItem;
