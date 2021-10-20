import React from 'react';
// material
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Typography, Stack, Container, Grid, Box } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function RifopisHowWork() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <MotionInView variants={varFadeInUp}>
              <Typography
                variant="h2"
                paragraph
                sx={{
                  textTransform: 'uppercase',
                  fontWeight: 900,
                  color: 'primary.light',
                  ...(!isLight && {
                    textShadow: (theme) => `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`
                  })
                }}
              >
                ¿Cómo funciona?
              </Typography>
            </MotionInView>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack>
              <Box component="img" src="/static/illustrations/illustration-step-1.svg" sx={{ maxHeight: 150, mb: 1 }} />
              <Typography sx={{ color: 'text.primary', textAlign: 'center', fontWeight: 400 }}>
                Selecciona un sorteo y cúantos tickets quieres
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack>
              <Box component="img" src="/static/illustrations/illustration-step-2.svg" sx={{ maxHeight: 150, mb: 1 }} />
              <Typography sx={{ color: 'text.primary', textAlign: 'center', fontWeight: 400 }}>
                Ingresa algúnos datos de contacto y completa el pago
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack>
              <Box component="img" src="/static/illustrations/illustration-step-3.svg" sx={{ maxHeight: 150, mb: 1 }} />
              <Typography sx={{ color: 'text.primary', textAlign: 'center', fontWeight: 400 }}>
                Transmitiremos por facebook y anunciaremos los ganadores
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack>
              <Box component="img" src="/static/illustrations/illustration-step-4.svg" sx={{ maxHeight: 130, mb: 3 }} />
              <Typography sx={{ color: 'text.primary', textAlign: 'center', fontWeight: 400 }}>
                Si ganas, te contactaremos con los datos que nos has dado
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
