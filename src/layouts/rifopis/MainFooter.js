import React from 'react';
import { Icon } from '@iconify/react';
import instagramFill from '@iconify/icons-jam/instagram';
import telegramFill from '@iconify/icons-jam/telegram';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import emailOutline from '@iconify/icons-eva/email-outline';
import whatsappFill from '@iconify/icons-ic/outline-whatsapp';
import { Link as ScrollLink } from 'react-scroll';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon as IconMaterial,
  Stack,
  Typography
} from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
//
import LogoRifopis from '../../components/LogoRifopis';
import PowerBy from '../../components/PowerBy';
import { MHidden } from '../../components/@material-extend';

// ----------------------------------------------------------------------

const SOCIALS = [
  { name: 'FaceBook', icon: facebookFill, uri: 'https://www.facebook.com/rifopis' },
  { name: 'Linkedin', icon: linkedinFill, uri: 'https://www.linkedin.com/company/rifopis' },
  { name: 'Instagram', icon: instagramFill, uri: 'https://www.instagram.com/rifopis' }
];

const RootStyle = styled('div')(() => ({
  position: 'relative',
  color: '#fff'
}));

const IconMaterialStyle = styled(IconMaterial)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: 15,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 15,
  height: 15
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <RootStyle>
      <Divider />
      <Container maxWidth="md" sx={{ pt: 10 }}>
        <Grid container justifyContent="center" alignItems="center" sx={{ textAlign: 'left' }}>
          <Grid item xs={12} sx={{ mb: 3 }}>
            <ScrollLink to="move_top" spy smooth>
              <LogoRifopis diapo sx={{ mx: 'auto' }} />
            </ScrollLink>
          </Grid>

          <MHidden width="mdUp">
            <Stack spacing={2} sx={{ mt: 1 }} alignItems={{ xs: 'center', md: 'flex-start' }}>
              <Stack direction="row" spacing={2}>
                <IconMaterialStyle>
                  <ArrowForwardRoundedIcon color="primary" sx={{ fontSize: 12 }} />
                </IconMaterialStyle>
                <Typography>Bases del sorteo</Typography>
              </Stack>

              <Stack direction="row" spacing={2}>
                <IconMaterialStyle>
                  <ArrowForwardRoundedIcon color="primary" sx={{ fontSize: 12 }} />
                </IconMaterialStyle>
                <Typography sx={{ fontWeight: 900 }}>Política de privacidad</Typography>
              </Stack>
            </Stack>
          </MHidden>

          <Grid item xs={12} sx={{ my: 3, display: 'flex', justifyContent: 'center', py: { xs: 3, md: 1 } }}>
            <Typography variant="h3" sx={{ textTransform: 'uppercase', borderBottom: '1px solid white' }}>
              Contáctanos
            </Typography>
          </Grid>

          <Grid item xs={12} md={3} display="flex" justifyContent={{ xs: 'center', md: 'flex-start' }}>
            <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
              <Stack direction="row" spacing={2}>
                <Icon icon={emailOutline} width={20} height={20} />
                <Typography sx={{ fontWeight: 900 }}>hola@shopis.cl</Typography>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Icon icon={whatsappFill} width={20} height={20} />
                <Typography sx={{ fontWeight: 900 }}>+56 9 7977 7557</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} sx={{ mt: { xs: 2, md: 0 } }}>
            <Stack spacing={1.5} direction="row" justifyContent="center">
              {SOCIALS.map((social) => (
                <Link key={social.name} href={social.uri} target="_blank">
                  <IconButton key={social.name} sx={{ p: 1, color: 'text.primary' }}>
                    <Icon icon={social.icon} width={40} height={40} />
                  </IconButton>
                </Link>
              ))}
            </Stack>
          </Grid>

          <MHidden width="mdDown">
            <Grid item xs={12} md={3}>
              <Stack alignItems={{ xs: 'center', md: 'flex-start' }}>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <IconMaterialStyle>
                    <ArrowForwardRoundedIcon color="primary" sx={{ fontSize: 12 }} />
                  </IconMaterialStyle>
                  <Typography>Bases del sorteo</Typography>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <IconMaterialStyle>
                    <ArrowForwardRoundedIcon color="primary" sx={{ fontSize: 12 }} />
                  </IconMaterialStyle>
                  <Typography>Política de privacidad</Typography>
                </Stack>
              </Stack>
            </Grid>
          </MHidden>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', mx: 'auto', py: 5 }}>
          <PowerBy />
        </Box>
      </Container>
    </RootStyle>
  );
}
