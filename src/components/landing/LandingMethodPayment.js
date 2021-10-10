import React from 'react';
// material
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Typography, Stack, Box, Container, Grid } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(12)
  }
}));

const ContentStyle = styled(Stack)(({ theme }) => ({
  borderRadius: 4,
  border: `3px dashed ${theme.palette.primary.main}`,
  padding: theme.spacing(4),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5)
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(6)
  }
}));

// ----------------------------------------------------------------------

export default function LandingMethodPayment() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle>
      <Box
        sx={{
          maxWidth: 430,
          margin: '0 auto',
          [theme.breakpoints.up('sm')]: { maxWidth: 550 },
          [theme.breakpoints.up('md')]: { maxWidth: 'unset' }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 2, sm: 5, md: 5 }}>
            <Grid item xs={12} md={6}>
              <MotionInView variants={varFadeInUp}>
                <Typography
                  variant="h3"
                  paragraph
                  sx={{
                    fontWeight: 900,
                    color: 'secondary.main',
                    ...(!isLight && {
                      textShadow: (theme) => `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`
                    }),
                    [theme.breakpoints.up('sm')]: {
                      fontSize: 40,
                      textAlign: 'center'
                    },
                    [theme.breakpoints.up('md')]: {
                      fontSize: 48,
                      textAlign: 'left'
                    }
                  }}
                >
                  Múltiples <Box component="br" sx={{ [theme.breakpoints.between('sm', 'md')]: { display: 'none' } }} />
                  medios de pago
                </Typography>
              </MotionInView>

              <MotionInView variants={varFadeInUp}>
                <Typography
                  component="p"
                  variant="overline"
                  sx={{
                    mb: 2,
                    color: '#609FBF',
                    fontWeight: 700,
                    fontSize: 16,
                    textTransform: 'none',
                    [theme.breakpoints.up('sm')]: {
                      fontSize: 20,
                      textAlign: 'center',
                      margin: '0 auto'
                    },
                    [theme.breakpoints.up('md')]: {
                      fontSize: 24,
                      textAlign: 'left',
                      margin: 0,
                      maxWidth: 360
                    }
                  }}
                >
                  Tus clientes podrán pagar con el método que prefieran
                </Typography>
              </MotionInView>
            </Grid>
            <Grid item xs={12} md={6}>
              <ContentStyle>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <Box
                        component="img"
                        src="/static/img/webpay_FB_300px.png"
                        sx={{ maxWidth: 170, width: '100%' }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <Box component="img" src="/static/img/paypal.png" sx={{ maxWidth: 193, width: '100%' }} />
                    </Box>
                  </Grid>
                </Grid>
                <Stack spacing={{ xs: 1, md: 2 }} sx={{ pt: 5 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      component="img"
                      src="/static/icons/ic_card-atm.svg"
                      alt="Débito/Crédito"
                      sx={{ width: 20, [theme.breakpoints.up('sm')]: { width: 33 } }}
                    />
                    <Typography
                      color="primary.main"
                      sx={{
                        fontSize: 16,
                        [theme.breakpoints.up('sm')]: { fontSize: 20 },
                        [theme.breakpoints.up('md')]: { fontSize: 24 }
                      }}
                    >
                      Débito/crédito en la entrega
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      component="img"
                      src="/static/icons/ic_money-bill.svg"
                      alt="Efectivo"
                      sx={{ width: 20, [theme.breakpoints.up('sm')]: { width: 33 } }}
                    />
                    <Typography
                      color="primary.main"
                      sx={{
                        fontSize: 16,
                        [theme.breakpoints.up('sm')]: { fontSize: 20 },
                        [theme.breakpoints.up('md')]: { fontSize: 24 }
                      }}
                    >
                      Efectivo en la entrega
                    </Typography>
                  </Stack>
                </Stack>
              </ContentStyle>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </RootStyle>
  );
}
