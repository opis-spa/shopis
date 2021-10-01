import React from 'react';
import { Icon } from '@iconify/react';
import emailFill from '@iconify/icons-ic/outline-email';
import whatsappFill from '@iconify/icons-ic/baseline-whatsapp';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Container, Typography, Stack, Paper } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../animate';
import LogoShopis from '../LogoShopis';

// ----------------------------------------------------------------------

const BackgroundImgStyle = styled('div')(() => ({
  position: 'absolute',
  zIndex: 1,
  left: 0,
  right: 0
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  zIndex: 3,
  position: 'relative',
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10)
}));

const PaperStyle = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center'
}));

// ----------------------------------------------------------------------

export default function LandingOrdersAllTime() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const CHANNEL = [
    {
      id: 'whatsapp',
      icon: <Icon icon={whatsappFill} style={{ fontSize: 30, color: '#4ac959' }} />,
      title: 'Whatsapp'
    },
    {
      id: 'email',
      icon: <Icon icon={emailFill} style={{ fontSize: 30, color: theme.palette.secondary.main }} />,
      title: 'Correo'
    },
    { id: 'shopis', icon: <LogoShopis avatar />, title: 'Dashboard' }
  ];

  return (
    <Container maxWidth="lg">
      <BackgroundImgStyle>
        <img alt="hero" src="/static/img/shape-2.svg" style={{ margin: 'auto', maxHeight: 500 }} />
      </BackgroundImgStyle>

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
            Recibe pedidos 24/7
          </Typography>
        </MotionInView>

        <MotionInView variants={varFadeInUp}>
          <Typography
            sx={{
              mb: 1,
              color: isLight ? 'text.secondary' : 'common.white'
            }}
          >
            Tus clientes pueden realizar sus pedidos a cualquier hora
          </Typography>
        </MotionInView>

        <MotionInView variants={varFadeInUp}>
          <Typography
            sx={{
              mb: 5,
              textTransform: 'uppercase',
              color: isLight ? 'text.secondary' : 'common.white'
            }}
          >
            Los pedidos los podrás recibir por múltiples canales.
          </Typography>
        </MotionInView>

        <Stack direction="row" justifyContent="center" spacing={2}>
          {CHANNEL.map((channel) => (
            <PaperStyle key={channel.id} elevation={1}>
              {channel.icon}
              <Typography>{channel.title}</Typography>
            </PaperStyle>
          ))}
        </Stack>
      </ContentStyle>
    </Container>
  );
}
