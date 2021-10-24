import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Alert, Box, Stack, Link, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
// components
import Page from '../../../components/Page';
import { MHidden } from '../../../components/@material-extend';
import { LoginForm } from '../../../components/authentication/login';
import AuthFirebaseSocials from '../../../components/authentication/AuthFirebaseSocial';
import LogoOpis from '../../../components/LogoOpis';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 110,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'flex-end',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7)
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuth();
  const [error, setError] = useState();

  const handleError = (error) => {
    console.log(' está llegando ');
    setError(error);
  };

  return (
    <RootStyle title="Inicio de sesión | opis">
      <HeaderStyle>
        <MHidden width="smDown">
          <Typography
            variant="body2"
            sx={{
              mt: { md: -2 }
            }}
          >
            Aún no tienes cuenta&nbsp;
            <Link underline="none" variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
              Registrate
            </Link>
          </Typography>
        </MHidden>
      </HeaderStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Inicia sesión con&nbsp;
                <LogoOpis />
              </Typography>
            </Box>
          </Stack>

          {method === 'firebase' && <AuthFirebaseSocials onHasError={handleError} />}

          {error && (
            <Alert severity="error" sx={{ mb: (theme) => theme.spacing(2) }}>
              {error}
            </Alert>
          )}

          <LoginForm />

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Aún no tienes cuenta?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                Registrate
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
