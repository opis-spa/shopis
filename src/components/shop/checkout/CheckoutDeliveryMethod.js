import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Radio,
  Typography,
  RadioGroup,
  CardHeader,
  CardContent,
  FormControlLabel,
  FormHelperText
} from '@mui/material';

// ----------------------------------------------------------------------

const OptionStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2.5),
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.grey['500_32']}`
}));

// ----------------------------------------------------------------------

CheckoutDelivery.propTypes = {
  formik: PropTypes.object,
  deliveryOptions: PropTypes.array,
  onApplyShipping: PropTypes.func
};

export default function CheckoutDelivery({ formik, deliveryOptions, onApplyShipping, ...other }) {
  const { values, setFieldValue, errors, touched } = formik;

  return (
    <Card {...other}>
      <CardHeader title="Tipo de entrega" />
      <CardContent>
        <RadioGroup
          name="delivery"
          value={values.deliveryType}
          onChange={(event) => {
            const { value } = event.target;
            setFieldValue('deliveryType', value);
            onApplyShipping(value);
          }}
        >
          <Grid container spacing={2}>
            {deliveryOptions.map((delivery) => {
              const { type, name, description } = delivery;
              return (
                <Grid key={type} item xs={12} md={6}>
                  <OptionStyle
                    sx={{
                      ...(values.deliveryType === type && {
                        boxShadow: (theme) => theme.customShadows.z8
                      })
                    }}
                  >
                    <FormControlLabel
                      value={type}
                      control={<Radio checkedIcon={<Icon icon={checkmarkCircle2Fill} />} />}
                      label={
                        <Box sx={{ ml: 1 }}>
                          <Typography variant="subtitle2">{name}</Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {description}
                          </Typography>
                        </Box>
                      }
                      sx={{ py: 3, flexGrow: 1, mr: 0 }}
                    />
                  </OptionStyle>
                </Grid>
              );
            })}
          </Grid>
        </RadioGroup>

        {errors.deliveryType && (
          <FormHelperText error>
            <Box component="span" sx={{ px: 2 }}>
              {touched.deliveryType && errors.deliveryType}
            </Box>
          </FormHelperText>
        )}
      </CardContent>
    </Card>
  );
}
