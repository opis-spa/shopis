import React from 'react';
// icons
import { Icon } from '@iconify/react';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import discordFilled from '@iconify/icons-ic/baseline-discord';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Tooltip, Container, Typography, InputAdornment, OutlinedInput, Link } from '@mui/material';
// hooks
import useCountdown from '../hooks/useCountdown';
// components
import { MIconButton } from '../components/@material-extend';
import Page from '../components/Page';

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    uri: 'https://facebook.com/shopiscl',
    name: 'Facebook',
    icon: <Icon icon={facebookFill} width={24} height={24} color="#1877F2" />
  },
  {
    uri: 'https://instagram.com/shopiscl',
    name: 'Instagram',
    icon: <Icon icon={instagramFilled} width={24} height={24} color="#D7336D" />
  },
  {
    uri: 'https://discord.gg/3PAtee5XRx',
    name: 'Discord',
    icon: <Icon icon={discordFilled} width={24} height={24} color="#006097" />
  }
];

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10)
}));

const CountdownStyle = styled('div')({
  display: 'flex',
  justifyContent: 'center'
});

const SeparatorStyle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  [theme.breakpoints.up('sm')]: {
    margin: theme.spacing(0, 2.5)
  }
}));

// ----------------------------------------------------------------------

export default function ComingSoon() {
  const countdown = useCountdown(new Date('10/01/2021 07:57'));

  return (
    <RootStyle title="Falta poco | shopis">
      <Container>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            Ya casi!
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: (theme) => theme.spacing(10) }}>
            Estamos trabajando fuertemente{' '}
            <span role="img" aria-label="rocket">
              🚀
            </span>{' '}
            para estar listos próximamente.
          </Typography>

          <CountdownStyle>
            <div>
              <Typography variant="h2">{countdown.days}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Días</Typography>
            </div>

            <SeparatorStyle variant="h2">:</SeparatorStyle>

            <div>
              <Typography variant="h2">{countdown.hours}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Horas</Typography>
            </div>

            <SeparatorStyle variant="h2">:</SeparatorStyle>

            <div>
              <Typography variant="h2">{countdown.minutes}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Minutos</Typography>
            </div>

            <SeparatorStyle variant="h2">:</SeparatorStyle>

            <div>
              <Typography variant="h2">{countdown.seconds}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Segundos</Typography>
            </div>
          </CountdownStyle>

          <OutlinedInput
            fullWidth
            placeholder="Ingresa tu correo electrónico"
            endAdornment={
              <InputAdornment position="end">
                <Button variant="contained" size="large">
                  Notificame
                </Button>
              </InputAdornment>
            }
            sx={{
              my: 5,
              pr: 0.5,
              transition: (theme) =>
                theme.transitions.create('box-shadow', {
                  easing: theme.transitions.easing.easeInOut,
                  duration: theme.transitions.duration.shorter
                }),
              '&.Mui-focused': {
                boxShadow: (theme) => theme.customShadows.z8
              },
              '& fieldset': {
                borderWidth: `1px !important`,
                borderColor: (theme) => `${theme.palette.grey[500_32]} !important`
              }
            }}
          />

          <Box sx={{ textAlign: 'center', '& > *': { mx: 1 } }}>
            {SOCIALS.map((social) => (
              <Link key={social.name} href={social.uri} target="_blank">
                <Tooltip title={social.name}>
                  <MIconButton>{social.icon}</MIconButton>
                </Tooltip>
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
    </RootStyle>
  );
}
