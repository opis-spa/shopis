import React from 'react';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import flashFill from '@iconify/icons-eva/flash-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled, useTheme } from '@mui/material/styles';
import { Button, Container, Box, Typography, Stack, Grid } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
//
import { MotionInView, varFadeIn, varFadeInUp, varWrapEnter, varFadeInRight, varFadeInDown } from '../animate';
import { Background } from '../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 'auto',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: 'auto',
    display: 'flex',
    position: 'relative',
    alignItems: 'center'
  }
}));

const ContentStyle = styled((props) => <Stack {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 800,
  textAlign: 'left',
  position: 'relative',
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(0),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15)
  },
  [theme.breakpoints.up('lg')]: {
    paddingTop: theme.spacing(25)
  }
}));

const HeroOverlayStyle = styled(motion.div)({
  zIndex: 9,
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0
});

const HeroImageStyle = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingBottom: 'calc(100% * (403.36 / 652))',
  [theme.breakpoints.up('md')]: {
    width: 'calc(100% + 100px)'
  }
}));

const ButtonStartStyle = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  textTransform: 'uppercase',
  backgroundColor: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.light
  }
}));

// ----------------------------------------------------------------------

export default function LandingHero() {
  const theme = useTheme();

  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <HeroOverlayStyle variants={varFadeIn}>
          <Background sx={{ height: '100%', width: '100%' }} />
        </HeroOverlayStyle>
        <Container maxWidth="lg">
          <Grid container rowSpacing={0} columnSpacing={5} justifyContent="center">
            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <ContentStyle>
                <motion.div variants={varFadeInRight}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 600,
                      color: 'common.white'
                    }}
                  >
                    Crea y comparte el
                  </Typography>
                </motion.div>

                <motion.div variants={varFadeInRight}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      color: 'common.white'
                    }}
                  >
                    Catálogo online <br /> de tu tienda
                  </Typography>
                </motion.div>

                <motion.div variants={varFadeInRight}>
                  <Typography
                    variant="h4"
                    sx={{
                      textTransform: 'uppercase',
                      color: 'common.white',
                      mb: 3
                    }}
                  >
                    En menos de 10 minutos.
                  </Typography>
                </motion.div>

                <motion.div variants={varFadeInRight}>
                  <ButtonStartStyle
                    size="large"
                    color="primary"
                    variant="contained"
                    component={RouterLink}
                    to={PATH_AUTH.register}
                    endIcon={<Icon icon={flashFill} width={20} height={20} />}
                  >
                    Pruébalo Gratis
                  </ButtonStartStyle>
                </motion.div>
              </ContentStyle>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  [theme.breakpoints.up('md')]: {
                    justifyContent: 'unset',
                    alignItems: 'flex-end',
                    paddingRight: 0
                  }
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: 400,
                    [theme.breakpoints.up('sm')]: {
                      maxWidth: 600,
                      width: '80%'
                    },
                    [theme.breakpoints.up('md')]: {
                      maxWidth: '1000%',
                      width: '100%',
                      position: 'relative',
                      left: -80
                    }
                  }}
                >
                  <HeroImageStyle>
                    <MotionInView
                      threshold={0.5}
                      variants={varFadeInUp}
                      sx={{
                        bottom: -40,
                        right: 30,
                        position: 'absolute',
                        zIndex: 10,
                        width: '91.43%'
                      }}
                    >
                      <img alt="dashboarde" src="/static/img/panel-dashboard-shopis.png" style={{ width: '100%' }} />
                    </MotionInView>
                    <MotionInView
                      threshold={0.5}
                      variants={varFadeInDown}
                      sx={{
                        bottom: -20,
                        right: 0,
                        position: 'absolute',
                        zIndex: 11,
                        width: '38.39%'
                      }}
                    >
                      <img alt="mobile" src="/static/img/mobile.png" style={{ width: '100%' }} />
                    </MotionInView>
                  </HeroImageStyle>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </>
  );
}
