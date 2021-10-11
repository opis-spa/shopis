import React from 'react';
// material
import { styled, useTheme } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';

const LinkStyle = styled(Link)(({ theme }) => ({
  color: theme.palette.opis.main,
  fontWeight: 'bold',
  fontSize: 16,
  [theme.breakpoints.up('sm')]: {
    fontSize: 18
  }
}));

function PowerBy() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}
    >
      <span role="img" aria-label="rocket">
        🚀
      </span>
      <Typography
        sx={{ fontSize: 14, [theme.breakpoints.up('sm')]: { fontSize: 16 } }}
        variant="caption"
        component="span"
      >
        &nbsp;potenciado por&nbsp;
      </Typography>
      <LinkStyle href="https://opis.cl">OPIS</LinkStyle>
    </Box>
  );
}

export default PowerBy;
