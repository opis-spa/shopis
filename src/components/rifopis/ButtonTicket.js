import React from 'react';
import PropTypes from 'prop-types';
// material
import { Typography } from '@mui/material';
// asset
import ButtonSvg from './ButtonSvg';

const propTypes = {
  title: PropTypes.string,
  fontSize: PropTypes.number,
  sx: PropTypes.shape({}),
  isBanner: PropTypes.bool
};

function ButtonTicket({ title, sx, isBanner, fontSize, ...props }) {
  return (
    <ButtonSvg height={70} isBanner={isBanner} {...props} sx={{ zIndex: 10000, ...sx }}>
      <Typography variant="span" sx={{ fontSize: fontSize || 18, color: 'common.white', fontWeight: 900, zIndex: 10 }}>
        {title}
      </Typography>
    </ButtonSvg>
  );
}

ButtonTicket.propTypes = propTypes;

export default ButtonTicket;
