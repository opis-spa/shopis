import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import { ResetPasswordForm } from '../../../components/authentication/reset-password';
//
import { SentIcon } from '../../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <RootStyle title="Reiniciar contraseña">
      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {!sent ? (
            <>
              <Typography variant="h3" paragraph>
                ¿Olvidaste tu contraseña?
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                Danos tu email y te ayudaremos a recuperarla. (La contraseña, por tu memoria si que no podemos hacer
                nada!{' '}
                <span role="img" aria-label="face">
                  😋
                </span>
                ).
              </Typography>

              <ResetPasswordForm onSent={() => setSent(true)} onGetEmail={(value) => setEmail(value)} />

              <Button fullWidth size="large" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 1 }}>
                Volver
              </Button>
            </>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

              <Typography variant="h3" gutterBottom>
                Recuperación de contraseña satisfactoria
              </Typography>
              <Typography>
                Nosotros enviamos una correo de confirmación a &nbsp;
                <strong>{email}</strong>
                <br />
                Revisa tu correo electrónico.
              </Typography>

              <Button size="large" variant="contained" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 5 }}>
                Volver
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </RootStyle>
  );
}
