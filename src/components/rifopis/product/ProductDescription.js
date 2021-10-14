import React from 'react';
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// components
import Markdown from '../../Markdown';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3)
}));

// ----------------------------------------------------------------------

const propTypes = {
  product: PropTypes.object
};

function Description({ product }) {
  return (
    <RootStyle>
      <Markdown source={product.description} />
    </RootStyle>
  );
}

Description.propTypes = propTypes;

export default Description;
