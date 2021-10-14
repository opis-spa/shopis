import React from 'react';
import { Icon } from '@iconify/react';
import emailFill from '@iconify/icons-ic/outline-email';
import whatsappFill from '@iconify/icons-ic/baseline-whatsapp';
// material
import { useTheme, styled } from '@mui/styles';
import { Box, Grid, Container, Typography, Stack } from '@mui/material';
// components
import { MotionInView, varFadeIn, varFadeInLeft, varFadeInRight } from '../animate';

// -------------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0, 8),
  backgroundColor: theme.palette.secondary.main,
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 0, 5)
  }
}));

const LandingContact = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: 20,
          [theme.breakpoints.up('sm')]: { height: 35 },
          [theme.breakpoints.up('md')]: { height: 50 }
        }}
      >
        <svg
          width="100%"
          preserveAspectRatio="none"
          height="100%"
          viewBox="0 0 320 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 20L320 0V20H0Z" fill={theme.palette.secondary.main} />
        </svg>
      </Box>
      <RootStyle name="contacto">
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Grid container rowSpacing={{ xs: 3, md: 8 }} columnSpacing={{ xs: 3, md: 0 }}>
            <Grid item xs={12} md={6}>
              <MotionInView variants={varFadeInLeft}>
                <Typography
                  variant="h2"
                  sx={{
                    color: theme.palette.common.white,
                    [theme.breakpoints.up('sm')]: { fontSize: 40, textAlign: 'center' },
                    [theme.breakpoints.up('md')]: { fontSize: 48, marginTop: '-15px' }
                  }}
                >
                  Contacto
                </Typography>
              </MotionInView>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionInView variants={varFadeInRight}>
                <Grid container spacing={{ xs: 1, md: 3 }}>
                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent={{ xs: 'flex-start', sm: 'center', md: 'flex-start' }}
                      spacing={2}
                    >
                      <Box
                        component={Icon}
                        icon={whatsappFill}
                        sx={{
                          color: theme.palette.common.white,
                          fontSize: 30,
                          [theme.breakpoints.up('sm')]: { fontSize: 35 }
                        }}
                      />
                      <Typography
                        variant="body"
                        sx={{
                          color: theme.palette.common.white,
                          fontSize: 16,
                          [theme.breakpoints.up('sm')]: { fontSize: 20 },
                          [theme.breakpoints.up('md')]: { fontSize: 24 }
                        }}
                      >
                        Escríbenos a <strong>soporte@shopis.cl</strong>
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent={{ xs: 'flex-start', sm: 'center', md: 'flex-start' }}
                      spacing={2}
                    >
                      <Box
                        component={Icon}
                        icon={emailFill}
                        sx={{
                          color: theme.palette.common.white,
                          fontSize: 30,
                          [theme.breakpoints.up('sm')]: { fontSize: 35 }
                        }}
                      />
                      <Typography
                        variant="body"
                        sx={{
                          color: theme.palette.common.white,
                          fontSize: 16,
                          [theme.breakpoints.up('sm')]: { fontSize: 20 },
                          [theme.breakpoints.up('md')]: { fontSize: 24 }
                        }}
                      >
                        Escríbenos al <strong>+56 9 7977 7557</strong>
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </MotionInView>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  padding: theme.spacing(3),
                  position: 'relative',
                  [theme.breakpoints.up('md')]: { padding: theme.spacing(4.5) }
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '1px',
                    backgroundColor: theme.palette.common.white,
                    opacity: 0.3
                  }}
                />
                <Grid container justifyContent="center" alignItems="center" spacing={{ xs: 2, md: 5 }}>
                  <Grid item>
                    <MotionInView variants={varFadeIn}>
                      <Box
                        component={Icon}
                        icon="mdi:facebook"
                        sx={{
                          fontSize: 35,
                          color: theme.palette.common.white,
                          [theme.breakpoints.up('sm')]: { fontSize: 40 }
                        }}
                      />
                    </MotionInView>
                  </Grid>
                  <Grid item>
                    <MotionInView variants={varFadeIn}>
                      <Box
                        component={Icon}
                        icon="mdi:linkedin"
                        sx={{
                          fontSize: 35,
                          color: theme.palette.common.white,
                          [theme.breakpoints.up('sm')]: { fontSize: 40 }
                        }}
                      />
                    </MotionInView>
                  </Grid>
                  <Grid item>
                    <MotionInView variants={varFadeIn}>
                      <Box
                        component={Icon}
                        icon="mdi:instagram"
                        sx={{
                          fontSize: 35,
                          color: theme.palette.common.white,
                          [theme.breakpoints.up('sm')]: { fontSize: 40 }
                        }}
                      />
                    </MotionInView>
                  </Grid>
                  <Grid item>
                    <MotionInView variants={varFadeIn}>
                      <Box
                        component={Icon}
                        icon="akar-icons:telegram-fill"
                        sx={{
                          fontSize: 35,
                          color: theme.palette.common.white,
                          padding: '1.5px',
                          [theme.breakpoints.up('sm')]: { fontSize: 40 }
                        }}
                      />
                    </MotionInView>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </>
  );
};

export default LandingContact;
