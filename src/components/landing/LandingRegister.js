import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography, TextField, Button } from '@mui/material';
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
  padding: theme.spacing(28, 0),
  backgroundColor: theme.palette.primary.main
}));

const ButtonRegisterStyle = styled(Button)(({ theme }) => ({
  textTransform: 'uppercase',
  fontWeight: 900,
  color: theme.palette.secondary.main,
  backgroundColor: theme.palette.common.white
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'left',
  position: 'relative',
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    height: '100%',
    marginBottom: 0,
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
    fontSize: 14
  },
  '& .MuiInputBase-root': {
    marginTop: theme.spacing(5),
    color: theme.palette.common.white,
    fontSize: 28
  },
  '& .MuiInput-input': {
    marginBottom: theme.spacing(2)
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
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Grid container spacing={5} direction="row" justifyContent="space-between">
          <Grid item xs={12} md={8}>
            <Grid container spacing={5} direction="row" justifyContent="space-between">
              <MHidden width="mdDown">
                <Grid item xs={3} md={2} lg={2}>
                  <MotionInView threshold={0.5} variants={varFadeInDown}>
                    <img alt="app less" src="/static/icons/ic_checked.svg" />
                  </MotionInView>
                </Grid>
              </MHidden>

              <Grid item xs={9} md={10} lg={10}>
                <ContentStyle>
                  <MotionInView variants={varFadeInUp}>
                    <Typography component="p" sx={{ color: 'common.white', display: 'block' }}>
                      Regístrate ahora
                    </Typography>
                  </MotionInView>

                  <MotionInView variants={varFadeInUp}>
                    <Typography
                      variant="h1"
                      sx={{ fontWeight: 900, textTransform: 'uppercase', color: 'common.white' }}
                    >
                      Sin Descargar <br /> ningún App
                    </Typography>
                  </MotionInView>

                  <MotionInView variants={varFadeInUp}>
                    <Typography sx={{ color: 'common.white', mb: 5 }}>
                      El catálogo lo podrás crear, modificar y compartir desde la web.
                    </Typography>
                  </MotionInView>
                </ContentStyle>
              </Grid>

              <MHidden width="mdUp">
                <Grid item xs={3} md={2} lg={2}>
                  <MotionInView threshold={0.5} variants={varFadeInDown}>
                    <img alt="app less" src="/static/icons/ic_checked.svg" />
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
    </RootStyle>
  );
}
