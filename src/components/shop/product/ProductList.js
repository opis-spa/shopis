import React from 'react';
import { filter, orderBy } from 'lodash';
import { Link as RouteLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Box, Skeleton, Grid } from '@mui/material';
// redux
import { useSelector } from '../../../redux/store';
// components
import ProductItem from './ProductItem';
import ProductItemSimple from './ProductItemSimple';
import LinkPartnership from '../../LinkPartnership';
// ----------------------------------------------------------------------

function applyFilter(products, sortBy, filters) {
  // SORT BY
  if (sortBy === 'priceDesc') {
    products = orderBy(products, ['amount'], ['desc']);
  }
  if (sortBy === 'priceAsc') {
    products = orderBy(products, ['amount'], ['asc']);
  }
  // FILTER PRODUCTS
  if (filters.category.length > 0) {
    products = filter(products, (_product) => filters.category.indexOf(_product.subcategory) >= 0);
  }
  return products;
}

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <Grid container spacing={3}>
    {[...Array(12)].map((item, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <Skeleton component={Box} variant="rectangular" sx={{ width: '100%', paddingTop: '115%', borderRadius: 2 }} />
      </Grid>
    ))}
  </Grid>
);

const propTypes = {
  view: PropTypes.string,
  max: PropTypes.number
};

const defaultProps = {
  max: 0,
  view: PropTypes.string
};

const GridStyle = styled(Grid)(() => ({
  justifyContent: 'center'
}));

function ProductList({ max = 0, view }) {
  const { products, sortBy, filters, isLoading } = useSelector((state) => state.product);
  const filteredProducts = applyFilter(products, sortBy, filters);

  return (
    <GridStyle container spacing={3}>
      {filteredProducts.map((product) => {
        const { _id } = product;
        if (view === 'module') {
          return (
            <Grid key={_id} item xs={12} sm={6} md={4} lg={3}>
              <ProductItem product={product} />
            </Grid>
          );
        }
        return (
          <Grid key={_id} item xs={12}>
            <ProductItemSimple product={product} />
          </Grid>
        );
      })}

      {isLoading && SkeletonLoad}

      {max > 0 && filteredProducts.length > max && (
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            mt: 4,
            mb: 4
          }}
        >
          <LinkPartnership variant="button" to="/store" component={RouteLink}>
            VER TODO
          </LinkPartnership>
        </Box>
      )}
    </GridStyle>
  );
}

ProductList.propTypes = propTypes;
ProductList.defaultProps = defaultProps;

export default ProductList;
