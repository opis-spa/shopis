import React from 'react';
// material
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const ButtonStyle = styled(Button)(({ theme }) => ({
  boxShadow: 'none',
  textTransform: 'uppercase',
  fontSize: 16,
  padding: '6px 12px',
  overflow: 'hidden',
  height: 75,
  lineHeight: 1.5,
  maxWidth: 300,
  background: `linear-gradient(124.5deg, ${theme.palette.primary.lighter} 0%, ${theme.palette.primary.light} 21.15%, ${theme.palette.primary.main} 63.44%, ${theme.palette.primary.dark} 104.11%)`,
  fontFamily: 'Nunito',
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none'
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf'
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)'
  },
  '&:before': {
    background: theme.palette.background.default,
    borderRadius: '50%',
    boxShadow: [
      `300px 0 0 0 ${theme.palette.background.default}`,
      `0 75px 0 0 ${theme.palette.background.default}`,
      `300px 75px 0 0 ${theme.palette.background.default}`
    ].join(','),
    content: '" "',
    display: 'block',
    height: 30,
    left: -15,
    position: 'absolute',
    top: -15,
    width: 30,
    zIndex: 10
  }
}));

export default function ButtonTicket({ ...props }) {
  return <ButtonStyle {...props} />;
}
