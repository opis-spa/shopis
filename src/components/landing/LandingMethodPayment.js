import React from 'react';
// material
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Typography, Stack, Box, Container, Grid } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

const ContentStyle = styled(Stack)(({ theme }) => ({
  borderRadius: 5,
  border: `1px dashed ${theme.palette.primary.main}`
}));

// ----------------------------------------------------------------------

export default function LandingMethodPayment() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <MotionInView variants={varFadeInUp}>
              <Typography
                variant="h2"
                paragraph
                sx={{
                  fontWeight: 900,
                  color: 'secondary.main',
                  ...(!isLight && {
                    textShadow: (theme) => `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`
                  })
                }}
              >
                Múltiples <br /> medios de pago
              </Typography>
            </MotionInView>

            <MotionInView variants={varFadeInUp}>
              <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.primary' }}>
                Tus clientes podrán pagar con el método que prefieran
              </Typography>
            </MotionInView>
          </Grid>
          <Grid item xs={12} md={6}>
            <ContentStyle spacing={5}>
              <Stack direction="row" spacing={10} justifyContent="center" sx={{ mt: 5 }}>
                <Box component="img" src="/static/img/webpay_FB_300px.png" sx={{ maxWidth: 170 }} />
                <Box component="img" src="/static/img/paypal.png" sx={{ maxWidth: 170 }} />
              </Stack>
              <Stack spacing={1} sx={{ pl: 10, pb: 5 }}>
                <Stack direction="row" alignItems="center">
                  <img src="/static/icons/ic_card-atm.svg" alt="Débito/Crédito" />
                  <Typography>Débito/crédito en la entrega</Typography>
                </Stack>
                <Stack direction="row" alignItems="center">
                  <img src="/static/icons/ic_money-bill.svg" alt="Efectivo" />
                  <Typography>Efectivo en la entrega</Typography>
                </Stack>
              </Stack>
            </ContentStyle>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
