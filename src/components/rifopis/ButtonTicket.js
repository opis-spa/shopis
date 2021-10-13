import React from 'react';
// material
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const ButtonStyle = styled(Button)(({ theme }) => ({
  boxShadow: 'none',
  textTransform: 'uppercase',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  maxWidth: 300,
  background: 'linear-gradient(124.5deg, #FFED48 0%, #FFC155 21.15%, #FF9E21 63.44%, #FF8800 104.11%)',
  borderColor: theme.palette.secondary.lighter,
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
  }
}));

export default function ButtonTicket({ ...props }) {
  return <ButtonStyle {...props} />;
}
