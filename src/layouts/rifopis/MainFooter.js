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
  Grid,
  Divider,
  Container,
  Box,
  IconButton,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon as IconMaterial
} from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
//
import LogoRifopis from '../../components/LogoRifopis';
import PowerBy from '../../components/PowerBy';

// ----------------------------------------------------------------------

const SOCIALS = [
  { name: 'FaceBook', icon: facebookFill },
  { name: 'Linkedin', icon: linkedinFill },
  { name: 'Instagram', icon: instagramFill },
  { name: 'Telegram', icon: telegramFill }
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

          <Grid item xs={12} md={3}>
            <List>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Icon icon={emailOutline} width={20} height={20} />
                </ListItemIcon>
                <ListItemText primary="hola@shopis.cl" sx={{ fontWeight: 900 }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Icon icon={whatsappFill} width={20} height={20} />
                </ListItemIcon>
                <ListItemText primary="+56 9 7977 7557" sx={{ fontWeight: 900 }} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1.5} direction="row" justifyContent="center">
              {SOCIALS.map((social) => (
                <IconButton key={social.name} sx={{ p: 1, color: 'text.primary' }}>
                  <Icon icon={social.icon} width={40} height={40} />
                </IconButton>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <List>
              <ListItem disablePadding>
                <ListItemIcon>
                  <IconMaterialStyle>
                    <ArrowForwardRoundedIcon color="primary" sx={{ fontSize: 12 }} />
                  </IconMaterialStyle>
                </ListItemIcon>
                <ListItemText primary="Bases del sorteo" sx={{ fontWeight: 900 }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <IconMaterialStyle>
                    <ArrowForwardRoundedIcon color="primary" sx={{ fontSize: 12 }} />
                  </IconMaterialStyle>
                </ListItemIcon>
                <ListItemText primary="Politica de privacidad" sx={{ fontWeight: 900 }} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'center', mx: 'auto', py: 5 }}>
          <PowerBy />
        </Box>
      </Container>
    </RootStyle>
  );
}
