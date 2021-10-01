import React from 'react';
import { Element } from 'react-scroll';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Grid, Container, Typography, Box } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../animate';

// ----------------------------------------------------------------------

const RootStyle = styled(Element)(({ theme }) => ({
  padding: theme.spacing(10, 0)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  textAlign: 'left',
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    marginBottom: 0
  }
}));

// ----------------------------------------------------------------------

export default function LandingOrdersAllTime() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle name="que-ofrecemos">
      <Box component="img" src="/static/img/shape.svg" sx={{ position: 'absolute' }} />
      <Container maxWidth="lg">
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} md={6} dir="ltr">
            <img alt="shared-social-network" src="/static/img/shared-social-network.png" />
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <ContentStyle>
              <MotionInView variants={varFadeInUp}>
                <Typography
                  variant="h2"
                  sx={{
                    color: 'secondary.main',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    mb: 3
                  }}
                >
                  Comparte a tus redes
                </Typography>
              </MotionInView>

              <MotionInView variants={varFadeInUp}>
                <Typography
                  sx={{
                    mb: 5,
                    color: isLight ? 'text.secondary' : 'common.white'
                  }}
                >
                  Con sólo un link o QR en tus redes sociales, tus clientes pueden conocer y comprar tus productos de
                  manera fácil.
                </Typography>
              </MotionInView>
            </ContentStyle>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
