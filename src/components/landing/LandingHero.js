import React from 'react';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import flashFill from '@iconify/icons-eva/flash-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Button, Box, Container, Typography, Stack, Grid } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
//
import { MotionInView, varFadeIn, varFadeInUp, varWrapEnter, varFadeInRight, varFadeInDown } from '../animate';
import { Background } from '../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '50vh',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '80vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center'
  }
}));

const ContentStyle = styled((props) => <Stack {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 800,
  textAlign: 'left',
  position: 'relative',
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    margin: 'unset'
  }
}));

const HeroOverlayStyle = styled(motion.div)({
  zIndex: 9,
  width: '100%',
  height: '100%',
  position: 'absolute'
});

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
  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <HeroOverlayStyle variants={varFadeIn}>
          <Background sx={{ height: '100%' }} />
        </HeroOverlayStyle>

        <Container maxWidth="lg">
          <Grid container spacing={5} justifyContent="center">
            <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
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
            <Grid item xs={12} md={7}>
              <MotionInView
                threshold={0.5}
                variants={varFadeInUp}
                sx={{ bottom: 0, right: 100, position: 'absolute', zIndex: 11 }}
              >
                <img alt="dashboarde" src="/static/img/panel-dashboard-shopis.png" />
              </MotionInView>
              <MotionInView
                threshold={0.5}
                variants={varFadeInDown}
                sx={{ bottom: 0, right: 0, position: 'absolute', zIndex: 10 }}
              >
                <img alt="mobile" src="/static/img/mobile.png" style={{ height: 250 }} />
              </MotionInView>
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}
