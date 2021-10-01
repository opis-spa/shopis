import React from 'react';
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Grid, Typography, Stack } from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Button from './ProductAdd';

const RootStyle = styled(Grid)(() => ({
  margin: 10,
  width: '100%',
  alignItems: 'flex-end'
}));

const propTypes = {
  product: PropTypes.object.isRequired
};

const ProductItemSimple = ({ product }) => {
  const { name, discountPartnership: discount, amount } = product;

  return (
    <RootStyle container>
      <Grid item>
        <Typography>{name}</Typography>
      </Grid>
      <Grid item />
      <Grid item>
        <Stack>
          <Typography
            component="span"
            sx={{
              typography: 'body1',
              color: 'text.disabled',
              textDecoration: 'line-through'
            }}
          >
            {(discount || 0) > 0 && fCurrency(amount)}
          </Typography>
          <Typography>{fCurrency(amount - (discount || 0))}</Typography>
        </Stack>
      </Grid>
      <Grid item style={{ minWidth: 138 }}>
        <Button product={product} />
      </Grid>
    </RootStyle>
  );
};

ProductItemSimple.propTypes = propTypes;

export default ProductItemSimple;
