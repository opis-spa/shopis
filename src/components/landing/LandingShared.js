import React from 'react';
import { Element } from 'react-scroll';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Grid, Container, Typography, Box } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../animate';

// ----------------------------------------------------------------------

const RootStyle = styled(Element)(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(20),
    paddingBottom: theme.spacing(15)
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  textAlign: 'left',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    marginBottom: 0,
    maxWidth: 400
  }
}));

// ----------------------------------------------------------------------

export default function LandingOrdersAllTime() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle name="que-ofrecemos">
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 958, margin: '0 auto' }}>
          <Grid container columnSpacing={10} rowSpacing={5} justifyContent="center" direction="row-reverse">
            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifySelf: 'flex-end' }}>
              <ContentStyle>
                <MotionInView variants={varFadeInUp}>
                  <Typography
                    variant="h3"
                    sx={{
                      color: 'secondary.main',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      mb: 3,
                      [theme.breakpoints.up('sm')]: {
                        textAlign: 'center',
                        fontSize: 40
                      },
                      [theme.breakpoints.up('md')]: {
                        fontSize: 48,
                        textAlign: 'left'
                      }
                    }}
                  >
                    Comparte a tus redes
                  </Typography>
                </MotionInView>

                <MotionInView variants={varFadeInUp}>
                  <Typography
                    sx={{
                      mb: 0,
                      color: isLight ? '#609FBF' : 'common.white',
                      [theme.breakpoints.up('sm')]: {
                        textAlign: 'center',
                        fontSize: 20
                      },
                      [theme.breakpoints.up('md')]: {
                        textAlign: 'left',
                        fontSize: 24
                      }
                    }}
                  >
                    Carga <strong>Fotos</strong>, ingresa descripciones, <strong>precios, </strong>
                    stock, <strong>descuentos</strong>
                  </Typography>
                </MotionInView>
              </ContentStyle>
            </Grid>
            <Grid item xs={12} md={6} dir="ltr">
              <Box
                sx={{
                  [theme.breakpoints.up('sm')]: {
                    display: 'flex',
                    justifyContent: 'center'
                  }
                }}
              >
                <img alt="shared-social-network" src="/static/img/shared-social-network.png" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </RootStyle>
  );
}
