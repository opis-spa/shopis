import React from 'react';
import { Icon } from '@iconify/react';
import emailFill from '@iconify/icons-ic/outline-email';
import whatsappFill from '@iconify/icons-ic/baseline-whatsapp';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Container, Typography, Paper, Grid, Box } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../animate';
import LogoShopis from '../LogoShopis';

// ----------------------------------------------------------------------

const BackgroundImgStyle = styled('div')(({ theme }) => ({
  position: 'absolute',
  zIndex: 1,
  left: '-40%',
  top: 0,
  height: '90%',
  width: '120%',
  maxWidth: 750,
  [theme.breakpoints.up('md')]: {
    left: '-20%',
    width: '100%',
    maxWidth: 1000,
    height: '90%'
  },
  [theme.breakpoints.up('lg')]: {
    left: 0,
    width: 1010,
    height: 756,
    maxWidth: 'unset'
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  maxWidth: 430,
  marginLeft: 'auto',
  marginRight: 'auto',
  zIndex: 3,
  position: 'relative',
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('sm')]: {
    maxWidth: 655
  },
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(20)
  },
  [theme.breakpoints.up('lg')]: {
    paddingTop: theme.spacing(25),
    paddingBottom: theme.spacing(25)
  }
}));

const PaperStyle = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4)
  }
}));

// ----------------------------------------------------------------------

export default function LandingOrdersAllTime() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const CHANNEL = [
    {
      id: 'whatsapp',
      icon: (
        <Box
          sx={{
            marginBottom: 1,
            height: 30,
            '& *': {
              fontSize: 30,
              [theme.breakpoints.up('sm')]: {
                fontSize: 50
              },
              [theme.breakpoints.up('md')]: {
                fontSize: 72
              }
            },
            [theme.breakpoints.up('sm')]: {
              height: 50
            },
            [theme.breakpoints.up('md')]: {
              height: 72
            }
          }}
        >
          <Icon icon={whatsappFill} style={{ color: '#4ac959' }} />
        </Box>
      ),
      title: 'Whatsapp'
    },
    {
      id: 'email',
      icon: (
        <Box
          sx={{
            marginBottom: 1,
            height: 30,
            '& *': {
              fontSize: 30,
              [theme.breakpoints.up('sm')]: {
                fontSize: 50
              },
              [theme.breakpoints.up('md')]: {
                fontSize: 72
              }
            },
            [theme.breakpoints.up('sm')]: {
              height: 50
            },
            [theme.breakpoints.up('md')]: {
              height: 72
            }
          }}
        >
          <Icon icon={emailFill} style={{ color: theme.palette.secondary.main }} />
        </Box>
      ),
      title: 'Correo'
    },
    {
      id: 'shopis',
      icon: (
        <LogoShopis
          sx={{
            height: 30,
            marginBottom: 1,
            '& img': {
              [theme.breakpoints.up('sm')]: {
                height: '100%',
                width: '100%'
              }
            },
            [theme.breakpoints.up('sm')]: {
              height: 50,
              width: 50
            },
            [theme.breakpoints.up('md')]: {
              height: 72,
              width: 72
            }
          }}
          avatar
        />
      ),
      title: 'Dashboard'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ position: 'relative' }}>
      <BackgroundImgStyle>
        <img
          alt="hero"
          src="/static/img/shape-2.svg"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      </BackgroundImgStyle>

      <ContentStyle>
        <MotionInView variants={varFadeInUp}>
          <Typography
            variant="h3"
            sx={{
              color: 'secondary.main',
              fontWeight: 900,
              textTransform: 'uppercase',
              mb: 2,
              [theme.breakpoints.up('sm')]: {
                fontSize: 40,
                mb: 3
              },
              [theme.breakpoints.up('md')]: {
                fontSize: 48,
                mb: 2
              }
            }}
          >
            Recibe pedidos 24/7
          </Typography>
        </MotionInView>

        <MotionInView variants={varFadeInUp}>
          <Typography
            sx={{
              mb: 4,
              color: isLight ? '#609FBF' : 'common.white',
              fontWeight: 700,
              display: 'flex',
              textAlign: 'left',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 16,
              position: 'relative',
              [theme.breakpoints.up('sm')]: {
                fontSize: 20
              },
              [theme.breakpoints.up('md')]: {
                fontSize: 24,
                mb: 2
              }
            }}
          >
            <Box
              component="span"
              sx={{
                maxWidth: 225,
                [theme.breakpoints.up('sm')]: { maxWidth: 290 },
                [theme.breakpoints.up('md')]: { maxWidth: 'unset' }
              }}
            >
              Tus clientes pueden realizar sus pedidos a cualquier hora
            </Box>
            <Box
              component="span"
              sx={{
                width: 30,
                height: 30,
                [theme.breakpoints.up('sm')]: { width: 40, height: 40 },
                [theme.breakpoints.up('md')]: { width: 43, height: 43, position: 'absolute', top: 0, right: -50 }
              }}
            >
              <img alt="Emoji" style={{ width: '100%', height: '100%' }} src="/static/img/emojione_winking-face.png" />
            </Box>
          </Typography>
        </MotionInView>

        <MotionInView variants={varFadeInUp}>
          <Typography
            sx={{
              mb: 2,
              textTransform: 'uppercase',
              color: isLight ? '#609FBF' : 'common.white',
              fontWeight: 700,
              fontSize: 14,
              [theme.breakpoints.up('sm')]: {
                fontSize: 18,
                mb: 3
              },
              [theme.breakpoints.up('md')]: {
                mb: 4,
                fontSize: 22
              }
            }}
          >
            TE NOTIFICAMOS COMO TE CONVENGA MEJOR
          </Typography>
        </MotionInView>
        <Grid container spacing={1}>
          {CHANNEL.map((channel) => (
            <Grid item xs={4} key={channel.id}>
              <PaperStyle key={channel.id} elevation={1}>
                {channel.icon}
                <Typography
                  color="#609FBF"
                  sx={{
                    [theme.breakpoints.up('sm')]: { fontSize: 20 },
                    [theme.breakpoints.up('md')]: { fontSize: 24 }
                  }}
                >
                  {channel.title}
                </Typography>
              </PaperStyle>
            </Grid>
          ))}
        </Grid>
      </ContentStyle>
    </Container>
  );
}
