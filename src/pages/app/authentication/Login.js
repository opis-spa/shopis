import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
// layouts
import AuthLayout from '../../../layouts/AuthLayout';
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

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
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

  return (
    <RootStyle title="Inicio de sesión | shopis">
      <AuthLayout>
        Aún no tienes cuenta&nbsp;
        <LogoOpis />? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
          Registrate
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Bienvenido
          </Typography>
        </SectionStyle>
      </MHidden>

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

          {method === 'firebase' && <AuthFirebaseSocials />}

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
