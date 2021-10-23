import React from 'react';
// icons
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
// import discordFilled from '@iconify/icons-ic/baseline-discord';
import closeFill from '@iconify/icons-eva/close-fill';
import { useSnackbar } from 'notistack';
// material
import { styled } from '@mui/material/styles';
import {
  Alert,
  Box,
  Button,
  Tooltip,
  Container,
  Typography,
  InputAdornment,
  OutlinedInput,
  Link,
  FormHelperText,
  FormControl
} from '@mui/material';
// hooks
import useCountdown from '../../hooks/useCountdown';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { subscriptionNewsletter } from '../../redux/slices/user';
// components
import { MIconButton } from '../../components/@material-extend';
import Page from '../../components/Page';
import { ComingSoonIllustrationRifopis } from '../../assets';

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    uri: 'https://facebook.com/rifopis',
    name: 'Facebook',
    icon: <Icon icon={facebookFill} width={24} height={24} color="#ffffff" />
  },
  {
    uri: 'https://instagram.com/rifopis',
    name: 'Instagram',
    icon: <Icon icon={instagramFilled} width={24} height={24} color="#ffffff" />
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
  justifyContent: 'center',
  mb: 10
});

const SeparatorStyle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  [theme.breakpoints.up('sm')]: {
    margin: theme.spacing(0, 2.5)
  }
}));

// ----------------------------------------------------------------------

export default function ComingSoon() {
  const countdown = useCountdown(new Date('11/01/2021 00:00'));
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const { newsletter, isLoading } = useSelector((state) => state.user);
  const isSubscription = newsletter.indexOf('rifopis') >= 0;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const subscriptionValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('El formato del correo electrónico no es correcto')
      .required('El correo electrónico es requerido')
  });

  const formik = useFormik({
    initialValues: { email: '', channel: 'rifopis' },
    validationSchema: subscriptionValidationSchema,
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      try {
        await dispatch(subscriptionNewsletter(values));
        enqueueSnackbar('Subscripción realizada con exito', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        resetForm();
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: error.message });
        }
      }
    }
  });
  const { handleSubmit, getFieldProps, touched, errors } = formik;

  return (
    <RootStyle title="Falta poco | RIFOPIS">
      <Container>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: { sm: 'left', md: 'center' } }}>
          <Typography variant="h3" paragraph>
            Falta poco!
          </Typography>
          <Typography sx={{ mb: (theme) => theme.spacing(5) }}>
            Estamos trabajando fuertemente{' '}
            <span role="img" aria-label="strong">
              💪🏻
            </span>{' '}
            para que muy pronto puedas participar por increíbles premios!
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

          {isSubscription ? (
            <Alert severity="success" sx={{ my: (theme) => theme.spacing(5), justifyContent: 'center' }}>
              Te avisaremos cuando estemos listos!
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <Typography sx={{ textAlign: 'left', mt: (theme) => theme.spacing(5) }}>
                ¡Déjanos tu correo para recibir información!
              </Typography>
              <FormControl fullWidth sx={{ mt: (theme) => theme.spacing(2), mb: (theme) => theme.spacing(5) }}>
                <OutlinedInput
                  fullWidth
                  color="secondary"
                  disabled={isLoading}
                  placeholder="Correo electrónico"
                  {...getFieldProps('email')}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{
                          '&:hover': {
                            backgroundColor: (theme) => theme.palette.primary.main
                          }
                        }}
                      >
                        Avisame
                      </Button>
                    </InputAdornment>
                  }
                  sx={{
                    pr: 0.5,
                    transition: (theme) =>
                      theme.transitions.create('box-shadow', {
                        easing: theme.transitions.easing.easeInOut,
                        duration: theme.transitions.duration.shorter
                      }),
                    color: 'common.white',
                    '&.Mui-focused': {
                      backgroundColor: (theme) => theme.palette.secondary.dark
                    },
                    '&.MuiOutlinedInput-input': {
                      boxShadow: 'none',
                      backgroundColor: (theme) => theme.palette.secondary.dark
                    },
                    '& fieldset': {
                      borderWidth: `1px !important`
                    }
                  }}
                />
                {Boolean(touched.email && errors.email) && (
                  <FormHelperText error style={{ textAlign: 'left' }}>
                    {(touched.email && errors.email) || ''}
                  </FormHelperText>
                )}
              </FormControl>
            </form>
          )}

          <ComingSoonIllustrationRifopis sx={{ my: (theme) => theme.spacing(2), height: 200 }} />

          <Box sx={{ mt: (theme) => theme.spacing(4), textAlign: 'center', '& > *': { mx: 1 } }}>
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
