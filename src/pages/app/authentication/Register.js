import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Alert, Box, Link, Container, Typography } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import { MHidden } from '../../../components/@material-extend';
import { RegisterForm } from '../../../components/authentication/register';
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

export default function Register() {
  const { method } = useAuth();
  const [error, setError] = useState();

  const handleError = (error) => {
    setError(error);
  };

  return (
    <RootStyle title="Registro | opis">
      <HeaderStyle>
        <MHidden width="smDown">
          <Typography
            variant="body2"
            sx={{
              mt: { md: -2 }
            }}
          >
            Ya tienes una cuenta?&nbsp;
            <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.login}>
              Inicia Sesión
            </Link>
          </Typography>
        </MHidden>
      </HeaderStyle>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Crea una cuenta&nbsp;
                <LogoOpis />
              </Typography>
            </Box>
          </Box>

          {method === 'firebase' && <AuthFirebaseSocials onHasError={handleError} />}

          {error && (
            <Alert severity="error" sx={{ mb: (theme) => theme.spacing(2) }}>
              {error}
            </Alert>
          )}

          <RegisterForm />

          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 3 }}>
            Al crear una cuenta, aceptas los&nbsp;
            <Link underline="always" color="text.primary" href="#">
              Términos
            </Link>
            &nbsp;y&nbsp;
            <Link underline="always" color="text.primary" href="#">
              Políticas de privacidad
            </Link>
            &nbsp;de opis.
          </Typography>

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              Ya tienes una cuenta&nbsp;
              <Link to={PATH_AUTH.login} component={RouterLink}>
                Inicia Sesión
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
