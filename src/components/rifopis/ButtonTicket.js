import React from 'react';
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { ButtonBase, Typography } from '@mui/material';
// asset
import { BackgroundTicket } from '../../assets';
import ButtonSvg from './ButtonSvg';

const propTypes = {
  title: PropTypes.string,
  fontSize: PropTypes.number
};

function ButtonTicket({ title, fontSize, ...props }) {
  return (
    <ButtonSvg height={70} {...props} sx={{ zIndex: 1000 }}>
      <Typography variant="span" sx={{ fontSize: fontSize || 18, color: 'common.white', fontWeight: 900, zIndex: 10 }}>
        {title}
      </Typography>
    </ButtonSvg>
  );
}

ButtonTicket.propTypes = propTypes;

export default ButtonTicket;
