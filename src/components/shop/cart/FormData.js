import React, { useState } from 'react';
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { TextField, FormControl, InputLabel, Select, MenuItem, Typography, FormHelperText, Grid } from '@mui/material';
import { regiones } from '../../../assets/data/regiones';

const COUNTRIES = [{ value: 'Chile', display: 'Chile' }];

const RootStyle = styled('div')(() => ({
  paddingTop: 20,
  paddingBottom: 10,
  marginLeft: 5,
  marginRight: 20
}));

const propTypes = {
  formik: PropTypes.object,
  loading: PropTypes.bool
};

function FormData(props) {
  const { formik, loading = false } = props;
  const [cities, setCities] = useState([]);
  const { values, errors, touched, getFieldProps, setFieldValue } = formik;
  const handleChangeState = (e) => {
    const { value } = e.target;
    setFieldValue('location.state', value);
    if (value) {
      const { comunas: citiesMap } = regiones.find((item) => item.region === value);
      setCities(citiesMap);
    } else {
      setCities([]);
    }
  };
  const handleChangeCity = (e) => {
    const { value } = e.target;
    setFieldValue('location.city', value);
  };
  const handleChangeCountry = (e) => {
    const { value } = e.target;
    setFieldValue('location.country', value);
  };

  return (
    <RootStyle>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Información de contacto
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            disabled={loading}
            variant="outlined"
            fullWidth
            required
            x-id="email"
            label="Correo electrónico"
            name="email"
            type="email"
            autoComplete="email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            disabled={loading}
            variant="outlined"
            fullWidth
            required
            x-id="phone"
            label="Teléfono"
            name="phone"
            type="string"
            autoComplete="phone"
            {...getFieldProps('phone')}
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
          />
        </Grid>
      </Grid>
      <Typography variant="h5" sx={{ mt: 4, mb: 4 }}>
        Despacho
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            disabled={loading}
            variant="outlined"
            fullWidth
            required
            x-id="identity"
            label="RUT"
            name="identity"
            type="text"
            autoComplete="identity"
            {...getFieldProps('identity')}
            error={Boolean(touched.identity && errors.identity)}
            helperText={touched.identity && errors.identity}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            disabled={loading}
            variant="outlined"
            fullWidth
            required
            x-id="name"
            label="Nombre y Apellido"
            name="name"
            type="text"
            autoComplete="name"
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <TextField
                fullWidth
                label="Dirección"
                {...getFieldProps('address')}
                error={Boolean(touched.address && errors.address)}
                helperText={touched.address && errors.address}
              />
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Información adicional"
                placeholder="Número de departamento por ejemplo"
                {...getFieldProps('addressMore')}
                error={Boolean(touched.addressMore && errors.addressMore)}
                helperText={touched.addressMore && errors.addressMore}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" style={{ display: 'flex', flex: 1 }}>
                <InputLabel htmlFor="outlined-age-native-simple">Región</InputLabel>
                <Select
                  fullWidth
                  variant="outlined"
                  value={values.location?.state || ''}
                  onChange={handleChangeState}
                  label="Región"
                  labelWidth={200}
                  error={Boolean(touched.location?.state && errors.location?.state)}
                  placeholder="Seleccione una región"
                >
                  {regiones.map((item) => (
                    <MenuItem key={item.region} value={item.region}>
                      {item.region}
                    </MenuItem>
                  ))}
                </Select>

                {Boolean(touched.location?.state && errors.location?.state) && (
                  <FormHelperText xs={{ color: 'error.main' }}>
                    {(touched.location?.state && errors.location?.state) || ''}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl disabled={cities.length === 0} variant="outlined" style={{ display: 'flex', flex: 1 }}>
                <InputLabel htmlFor="outlined-age-native-simple">Comuna</InputLabel>
                <Select
                  fullWidth
                  variant="outlined"
                  value={values.location?.city || ''}
                  onChange={handleChangeCity}
                  label="Comuna"
                  labelWidth={200}
                  error={Boolean(touched.location?.city && errors.location?.city && !(cities.length === 0))}
                  placeholder="Seleccione una comuna"
                >
                  {cities.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>

                {Boolean(touched.location?.city && errors.location?.city && !(cities.length === 0)) && (
                  <FormHelperText xs={{ color: 'error.main' }}>
                    {(touched.location?.city && errors.location?.city) || ''}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" style={{ display: 'flex', flex: 1 }}>
                <InputLabel htmlFor="outlined-age-native-simple">País</InputLabel>
                <Select
                  fullWidth
                  variant="outlined"
                  value={values.location?.country || ''}
                  onChange={handleChangeCountry}
                  label="País"
                  labelWidth={200}
                  placeholder="Seleccione un país"
                >
                  {COUNTRIES.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.display}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </RootStyle>
  );
}

FormData.propTypes = propTypes;

export default FormData;
