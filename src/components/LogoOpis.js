import React from 'react';
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const DivStyle = styled('span')(({ theme }) => ({
  color: theme.palette.opis.main,
  fontWeight: 'bold'
}));

const propTypes = {
  sx: PropTypes.object
};

const defaultProps = {
  sx: {}
};

function LogoOpis({ sx }) {
  return <DivStyle sx={sx}>OPIS</DivStyle>;
}

LogoOpis.propTypes = propTypes;
LogoOpis.defaultProps = defaultProps;

export default LogoOpis;
