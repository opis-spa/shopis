import React from 'react';
import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled, useTheme } from '@mui/material/styles';
import { Grid, Box, Link, Container, Typography, IconButton, Stack } from '@mui/material';
//
import LogoShopis from '../../components/LogoShopis';
import PowerBy from '../../components/PowerBy';

// ----------------------------------------------------------------------

const SOCIALS = [
  { name: 'FaceBook', icon: facebookFill },
  { name: 'Google', icon: googleFill },
  { name: 'Linkedin', icon: linkedinFill },
  { name: 'Twitter', icon: twitterFill }
];

const LINKS = [
  {
    headline: 'Acceso directo',
    children: [
      { name: '¿Qué te ofrecemos?', href: '/' },
      { name: 'Precios', href: '/' },
      { name: 'Preguntas frecuentes', href: '#faqs' },
      { name: 'Contacto', href: '/' }
    ]
  },
  {
    headline: 'Legal',
    children: [
      { name: 'Terms and Condition', href: '#' },
      { name: 'Privacy Policy', href: '#' }
    ]
  },
  {
    headline: 'Contacto',
    children: [
      { name: 'hola@shopis.cl', href: '#' },
      { name: '+56 9 7977 7557', href: '#' }
    ]
  }
];

const RootStyle = styled('div')(() => ({
  position: 'relative',
  backgroundColor: '#1D1D20',
  color: '#fff'
}));

const CopyRigthStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3, 0)
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
  const theme = useTheme();

  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ padding: theme.spacing(10, 0) }}>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          {/* <Grid item xs={12} sx={{ mb: 3 }}>
            
          </Grid> */}
          <Grid item xs={8} md={3}>
            <ScrollLink to="move_top" spy smooth>
              <LogoShopis diapo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />
            </ScrollLink>
            <Typography
              variant="body2"
              sx={{ pr: { md: 5 }, mt: 2, fontSize: 14, [theme.breakpoints.up('sm')]: { fontSize: 16 } }}
            >
              Hacemos que la digitalización de tu negocio sea tan simple y fácil como sonreir!
            </Typography>

            <Stack
              spacing={1.5}
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{ mt: 2, mb: { xs: 5, md: 0 } }}
            >
              {SOCIALS.map((social) => (
                <IconButton key={social.name} sx={{ p: 1, color: theme.palette.common.white }}>
                  <Icon icon={social.icon} width={20} height={20} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack spacing={5} direction={{ xs: 'column', md: 'row' }} justifyContent="space-between">
              {LINKS.map((list) => {
                const { headline, children } = list;
                return (
                  <Stack key={headline} spacing={2}>
                    <Typography
                      component="p"
                      variant="overline"
                      sx={{ fontSize: 14, [theme.breakpoints.up('sm')]: { fontSize: 16 } }}
                    >
                      {headline}
                    </Typography>
                    {children.map((link) => (
                      <Link
                        to={link.href}
                        key={link.name}
                        color="inherit"
                        variant="body2"
                        component={RouterLink}
                        sx={{ display: 'block', fontSize: 14, [theme.breakpoints.up('sm')]: { fontSize: 16 } }}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </Stack>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ borderTop: '.5px solid #343A62' }}>
        <Container>
          <CopyRigthStyle>
            <Grid
              container
              justifyContent={{ xs: 'center', md: 'space-between' }}
              direction={{ xs: 'column', md: 'row' }}
              alignItems="center"
              spacing={{ xs: 1, sm: 1.5 }}
            >
              <Grid item>
                <Typography sx={{ fontSize: 14, [theme.breakpoints.up('sm')]: { fontSize: 16 } }}>
                  Copyright &copy; 2021 Opis Wallet
                </Typography>
              </Grid>
              <Grid item>
                <PowerBy />
              </Grid>
            </Grid>
          </CopyRigthStyle>
        </Container>
      </Box>
    </RootStyle>
  );
}
