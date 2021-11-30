import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Link, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import { VerifyCodeForm } from '../../../components/authentication/verify-code';
import { NewPasswordForm } from '../../../components/authentication/new-password';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function VerifyCode() {
  const { token } = useParams();
  const [validate, setValidate] = useState(token);

  const handleValidate = (result) => {
    setValidate(result || '');
  };

  return (
    <RootStyle title="Verificar">
      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          <Button
            size="small"
            component={RouterLink}
            to={PATH_AUTH.login}
            startIcon={<Icon icon={arrowIosBackFill} width={20} height={20} />}
            sx={{ mb: 3 }}
          >
            Volver
          </Button>

          {(validate || '') !== '' ? (
            <>
              <Typography variant="h3" paragraph>
                Ingresa una nueva contraseña
              </Typography>

              <Box sx={{ mt: 5, mb: 3 }}>
                <NewPasswordForm token={token} />
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h3" paragraph>
                Por favor revisa tu correo electrónico!
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Te enviamos un correo electrónico con una código de 6 digitos, por favor intresa ese código para
                verificar tu correo electrónico.
              </Typography>

              <Box sx={{ mt: 5, mb: 3 }}>
                <VerifyCodeForm token={token} onValidate={handleValidate} />
              </Box>

              <Typography variant="body2" align="center">
                No tiene un código? &nbsp;
                <Link underline="none" variant="subtitle2" component={RouterLink} to={PATH_AUTH.resetPassword}>
                  Volver a enviar
                </Link>
              </Typography>
            </>
          )}
        </Box>
      </Container>
    </RootStyle>
  );
}
