import React from 'react';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';

const LinkStyle = styled(Link)(({ theme }) => ({
  color: theme.palette.opis.main,
  fontWeight: 'bold'
}));

function PowerBy() {
  return (
    <Box
      sx={{
        flexDirection: 'row'
      }}
    >
      <span role="img" aria-label="rocket">
        🚀
      </span>
      <Typography variant="caption" component="span">
        &nbsp;potenciado por&nbsp;
      </Typography>
      <LinkStyle href="https://opis.cl">OPIS</LinkStyle>
    </Box>
  );
}

export default PowerBy;
