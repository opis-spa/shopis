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
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  textAlign: 'left',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    marginTop: 0,
    marginLeft: theme.spacing(-15)
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
      <Box component="img" src="/static/img/shape.svg" sx={{ position: 'absolute' }} />
      <Container maxWidth="lg">
        <Grid container direction="row">
          <Grid item xs={12} md={7} lg={6}>
            <MotionInView variants={varFadeInUp}>
              <Typography
                variant="h3"
                sx={{
                  mb: 1,
                  fontWeight: 400,
                  color: 'text.primary',
                  textTransform: 'uppercase'
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
                      marginLeft: (2 - index) * 10
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box component="img" src={category.icon} sx={{ width: 40, heigth: 40 }} />
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 200,
                          textTransform: 'uppercase'
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
    </RootStyle>
  );
}
