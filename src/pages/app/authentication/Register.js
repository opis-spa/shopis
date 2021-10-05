import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// layouts
import AuthLayout from '../../../layouts/AuthLayout';
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

export default function Register() {
  const { method } = useAuth();

  return (
    <RootStyle title="Registro | shopis">
      <AuthLayout>
        Ya tienes una cuenta&nbsp;
        <LogoOpis />? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to={PATH_AUTH.login}>
          Inicia Sesión
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Bienvenido
          </Typography>
        </SectionStyle>
      </MHidden>

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

          {method === 'firebase' && <AuthFirebaseSocials />}

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
              <LogoOpis />? &nbsp;
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
