import React from 'react';
import { Box, Container, Typography } from '@mui/material';
// hook
import usePartnership from '../../hooks/usePartnership';
// components
import SocialNetwork from '../../components/SocialNetwork';
import PowerBy from '../../components/PowerBy';

// ----------------------------------------------------------------------

export default function MainFooter() {
  const { partnership } = usePartnership();

  return (
    <Box
      sx={{
        py: 5,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default'
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <SocialNetwork network={partnership.socialNetwork} />
        </Box>

        <Typography variant="caption" component="p">
          © Todos los derechos reservados
          <PowerBy />
        </Typography>
      </Container>
    </Box>
  );
}
