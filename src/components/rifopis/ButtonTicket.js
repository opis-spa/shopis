import React from 'react';
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { ButtonBase, Typography } from '@mui/material';
// asset
import { BackgroundTicket } from '../../assets';

const ButtonStyle = styled(ButtonBase)(() => ({
  boxShadow: 'none',
  textTransform: 'uppercase',
  fontSize: 16,
  overflow: 'hidden',
  width: '100%',
  height: 75,
  lineHeight: 1.5,
  maxWidth: 300,
  fontFamily: 'Nunito',
  background: 'none'
}));

const propTypes = {
  title: PropTypes.string
};

function ButtonTicket({ ...props }) {
  const { title } = props;
  return (
    <ButtonStyle {...props}>
      <BackgroundTicket sx={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }} />
      <Typography sx={{ color: 'common.white', fontWeight: 900, zIndex: 10 }}>{title}</Typography>
    </ButtonStyle>
  );
}

ButtonTicket.propTypes = propTypes;

export default ButtonTicket;
