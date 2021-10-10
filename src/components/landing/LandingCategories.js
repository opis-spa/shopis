import React from 'react';
// material
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Box, Grid, Container, Typography, Stack, Paper } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../animate';

// ----------------------------------------------------------------------

const CATEGORIES = [
  {
    title: 'Arreglos Florales',
    icon: '/static/icons/ic_categories-1.svg'
  },
  {
    title: 'Canasta Frutales',
    icon: '/static/icons/ic_categories-2.svg'
  },
  {
    title: 'Dulces',
    icon: '/static/icons/ic_categories-3.svg'
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(20),
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(25)
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  textAlign: 'left',
  marginTop: theme.spacing(2),
  paddingBottom: theme.spacing(15),
  paddingLeft: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    marginTop: 0,
    marginLeft: theme.spacing(-15),
    paddingBottom: theme.spacing(25)
  }
}));

const PaperStyle = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  marginBottom: theme.spacing(1),
  maxWidth: 500
}));

// ----------------------------------------------------------------------

export default function LandingCategories() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle>
      <Box
        component="img"
        src="/static/img/shape.svg"
        sx={{
          position: 'absolute',
          width: '100%',
          top: -250,
          left: 0,
          zIndex: 1,
          display: 'none',
          height: 'calc(100% + 250px)',
          [theme.breakpoints.up('md')]: {
            display: 'block'
          }
        }}
      />
      <Box
        component="img"
        src="/static/img/shape-mobile.svg"
        sx={{
          position: 'absolute',
          width: '100%',
          top: -250,
          left: 0,
          zIndex: 1,
          display: 'block',
          height: 'calc(100% + 250px)',
          [theme.breakpoints.up('md')]: {
            display: 'none'
          }
        }}
      />
      <Box sx={{ overflow: 'hidden' }}>
        <Container sx={{ position: 'relative', zIndex: 3, maxWidth: '900px !important' }}>
          <Grid container direction="row">
            <Grid item xs={12} md={7} lg={6}>
              <MotionInView variants={varFadeInUp}>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 1,
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    paddingLeft: (theme) => theme.spacing(1),
                    color: '#609FBF'
                  }}
                >
                  organiza tus productos en
                </Typography>
              </MotionInView>

              <MotionInView variants={varFadeInUp}>
                <Typography
                  variant="h2"
                  paragraph
                  sx={{
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    color: 'secondary.main',
                    paddingLeft: (theme) => theme.spacing(1),
                    ...(!isLight && {
                      textShadow: (theme) => `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`
                    })
                  }}
                >
                  Categorías
                </Typography>
              </MotionInView>
            </Grid>

            <Grid item xs={12} md={5} lg={6}>
              <ContentStyle>
                {CATEGORIES.map((category, index) => (
                  <MotionInView key={index} variants={varFadeInUp}>
                    <PaperStyle
                      elevation={2}
                      sx={{
                        width: '100%',
                        maxWidth: 533.33,
                        position: 'relative',
                        marginLeft: 10 + 10 - 5 * index,
                        height: 65,
                        marginBottom: 2,
                        [theme.breakpoints.up('md')]: {
                          height: 83
                        }
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center" sx={{ height: '100%' }}>
                        <Box component="img" src={category.icon} sx={{ width: 40, heigth: 40 }} />
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 200,
                            textTransform: 'uppercase',
                            color: '#677CAB',
                            letterSpacing: '0.14em'
                          }}
                        >
                          {category.title}
                        </Typography>
                      </Stack>
                    </PaperStyle>
                  </MotionInView>
                ))}
              </ContentStyle>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </RootStyle>
  );
}
