import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
// material
import { styled, useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, TextField, Button, Box } from '@mui/material';
// route
import { PATH_AUTH } from '../../routes/paths';
// components
import { MotionInView, varFadeInUp, varFadeInDown } from '../animate';
import { MHidden } from '../@material-extend';

// ----------------------------------------------------------------------

const storeValidationSchema = Yup.object().shape({
  name: Yup.string().required('El nombre de la tienda es requerido')
});

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(15, 0),
  backgroundColor: theme.palette.primary.main,
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(20, 0)
  }
}));

const ButtonRegisterStyle = styled(Button)(({ theme }) => ({
  textTransform: 'uppercase',
  fontWeight: 900,
  fontSize: 14,
  color: theme.palette.secondary.main,
  backgroundColor: theme.palette.common.white,
  marginTop: theme.spacing(2.5),
  padding: theme.spacing(1.5, 1),
  [theme.breakpoints.up('md')]: {
    fontSize: 16
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'left',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    height: '100%',
    textAlign: 'left',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
}));

const TextFieldStyle = styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: theme.palette.common.white,
    fontSize: 20,
    [theme.breakpoints.up('md')]: {
      fontSize: 24
    }
  },
  '& .MuiInputBase-root': {
    marginTop: theme.spacing(4),
    color: theme.palette.common.white,
    fontSize: 24,
    [theme.breakpoints.up('md')]: {
      fontSize: 28,
      marginTop: theme.spacing(5)
    }
  },
  '& .MuiFormHelperText-root': {
    color: theme.palette.error.main,
    [theme.breakpoints.up('md')]: {
      fontSize: 14
    }
  },
  '& .MuiInput-input': {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 2),
    '::placeholder': {
      color: theme.palette.common.white,
      opacity: '0.3'
    }
  },
  '& .MuiInput-underline:after': {
    marginTop: theme.spacing(3),
    borderBottomColor: theme.palette.common.white
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.common.white
    },
    '&:hover fieldset': {
      borderColor: theme.palette.common.white
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.common.white
    }
  }
}));

// ----------------------------------------------------------------------

export default function LandingRegister() {
  const theme = useTheme();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: ''
    },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      console.log(values);
      try {
        setSubmitting(false);
        navigate(PATH_AUTH.register);
      } catch (error) {
        console.log();
        setErrors({ afterSubmit: error.code });
        setSubmitting(false);
      }
    },
    validationSchema: storeValidationSchema
  });

  const { handleSubmit, errors, touched, getFieldProps } = formik;
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: 20,
          [theme.breakpoints.up('sm')]: { height: 35 },
          [theme.breakpoints.up('md')]: { height: 50 }
        }}
      >
        <svg
          width="100%"
          preserveAspectRatio="none"
          height="100%"
          viewBox="0 0 320 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 20L320 0V20H0Z" fill={theme.palette.primary.main} />
        </svg>
      </Box>
      <RootStyle>
        <Box
          sx={{
            maxWidth: 380,
            margin: '0 auto',
            [theme.breakpoints.up('sm')]: { maxWidth: 550 },
            [theme.breakpoints.up('md')]: { maxWidth: 'unset' }
          }}
        >
          <Container maxWidth="lg" sx={{ position: 'relative' }}>
            <Grid container spacing={{ xs: 5 }} direction="row" justifyContent="center" alignItems="center">
              <Grid item xs={12} md={8}>
                <Grid container spacing={{ xs: 1, sm: 3, md: 5 }} direction="row" justifyContent="space-between">
                  <MHidden width="mdDown">
                    <Grid item xs={3} md={2} lg={2}>
                      <MotionInView threshold={0.5} variants={varFadeInDown}>
                        <Box component="img" alt="app less" src="/static/icons/ic_checked.svg" sx={{ width: 100 }} />
                      </MotionInView>
                    </Grid>
                  </MHidden>

                  <Grid item xs={9} md={10} lg={10}>
                    <ContentStyle>
                      <MotionInView variants={varFadeInUp}>
                        <Typography
                          component="p"
                          sx={{
                            color: 'common.white',
                            display: 'block',
                            fontSize: 16,
                            [theme.breakpoints.up('sm')]: {
                              fontSize: 24
                            },
                            [theme.breakpoints.up('md')]: {
                              fontSize: 36
                            }
                          }}
                        >
                          Regístrate ahora
                        </Typography>
                      </MotionInView>

                      <MotionInView variants={varFadeInUp}>
                        <Typography
                          variant="h3"
                          sx={{
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            color: 'common.white',
                            mb: 2,
                            [theme.breakpoints.up('sm')]: {
                              fontSize: 40
                            },
                            [theme.breakpoints.up('md')]: {
                              fontSize: 48
                            }
                          }}
                        >
                          Sin Descargar <br /> ningún App
                        </Typography>
                      </MotionInView>

                      <MotionInView variants={varFadeInUp}>
                        <Typography
                          sx={{
                            color: 'common.white',
                            fontSize: 16,
                            [theme.breakpoints.up('sm')]: { fontSize: 20 },
                            [theme.breakpoints.up('md')]: { fontSize: 24, maxWidth: 505 }
                          }}
                        >
                          El catálogo lo podrás crear, modificar y compartir desde la web.
                        </Typography>
                      </MotionInView>
                    </ContentStyle>
                  </Grid>

                  <MHidden width="mdUp">
                    <Grid item xs={3} md={2} lg={2}>
                      <MotionInView threshold={0.5} variants={varFadeInDown}>
                        <Box
                          component="img"
                          alt="app less"
                          src="/static/icons/ic_checked.svg"
                          sx={{ width: 56, [theme.breakpoints.up('sm')]: { width: 72 } }}
                        />
                      </MotionInView>
                    </Grid>
                  </MHidden>
                </Grid>
              </Grid>

              <Grid item xs={12} md={4}>
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={5} direction="row" justifyContent="flex-start">
                    <Grid item xs={12}>
                      <TextFieldStyle
                        fullWidth
                        variant="standard"
                        label="Escribe el nombre de tu tienda:"
                        focused
                        placeholder="El café de juana"
                        sx={{ mb: 2 }}
                        helperText={touched && (errors.name || '')}
                        {...getFieldProps('name')}
                      />
                      <ButtonRegisterStyle fullWidth type="submit" variant="contained">
                        Crear catálogo
                      </ButtonRegisterStyle>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </RootStyle>
      <Box
        sx={{
          width: '100%',
          height: 20,
          [theme.breakpoints.up('sm')]: { height: 35 },
          [theme.breakpoints.up('md')]: { height: 50 }
        }}
      >
        <svg
          width="100%"
          preserveAspectRatio="none"
          height="100%"
          viewBox="0 0 320 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0H320L0 20V0Z" fill={theme.palette.primary.main} />
        </svg>
      </Box>
    </>
  );
}
