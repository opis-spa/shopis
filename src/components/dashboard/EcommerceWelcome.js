import React from 'react';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, CardContent, Typography } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

const IllustrationRocket = styled(Box)(({ theme }) => ({
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    paddingBottom: 0,
    paddingRight: theme.spacing(2)
  },
  [theme.breakpoints.up('lg')]: {
    paddingRight: theme.spacing(5)
  }
}));

// ----------------------------------------------------------------------

export default function EcommerceWelcome() {
  const { user } = useAuth();

  console.log('user', user);

  return (
    <RootStyle>
      <CardContent
        sx={{
          color: 'grey.800',
          p: { md: 0 },
          pl: { md: 5 },
          pt: { md: 5 }
        }}
      >
        <Typography gutterBottom variant="h4">
          Bienvenido,
          <br /> {user.displayName}
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          Próximamente te irémos guiando sobre cambios y tips para mejorar tu catálogo digital
        </Typography>
      </CardContent>

      <IllustrationRocket>
        <Box
          component="img"
          src="/static/icons/ic_rocket.svg"
          sx={{
            m: 3,
            height: 120,
            margin: { xs: 'auto', md: 'inherit' }
          }}
        />
      </IllustrationRocket>
    </RootStyle>
  );
}
