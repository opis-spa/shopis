import clsx from 'clsx';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import checkmarkCircle2Fill from '@iconify-icons/eva/checkmark-circle-2-fill';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Address from './Address';
import NewAddress from './NewAddress';
import AddressSelected from './AddressSelected';
import { setCheckoutDelivery, setUpdateCart } from '~/redux/actions/CartActions';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {},
  option: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2.5),
    justifyContent: 'space-between',
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create('all'),
    border: `solid 1px ${theme.palette.grey[500_32]}`
  },
  label: {
    flexGrow: 1,
    marginRight: 0,
    padding: theme.spacing(3, 0)
  },
  isSelected: { boxShadow: theme.shadows[25].z8 }
}));

// ----------------------------------------------------------------------
const parseValue = (value) => {
  switch (value) {
    case "Delivery":
      return {
        value: "delivery",
        description: "Te despacharemos la orden a una dirección",
      };
    case "Retiro":
      return {
        value: "takeaway",
        description: "Retiraras la orden en nuestro local",
      };
    case "Local":
      return {
        value: "eatin",
        description: "Consumo o uso en local",
      };
    default:
      return "others";
  }
}

const selectDeliveries = createSelector(
  state => state.deliveries.list,
  (_, deliveryMethods) => deliveryMethods,
  (deliveries, deliveryMethods) =>
    deliveries.filter(item => (deliveryMethods.indexOf(item._id) >= 0))
    .map((item)=>({...item, ...parseValue(item.name)}))
);

const fullAddress = (addressParse) => {
  const {address, addressMore} = addressParse;
  return (`${address} ${addressMore}`).trim();
}

Deliveries.propTypes = {
  formik: PropTypes.object,
  loading: PropTypes.object,
  deliveryOptions: PropTypes.array,
  onApplyShipping: PropTypes.func,
  className: PropTypes.string
};

function Deliveries(props) {
  const { formik, className, loading } = props;
  const classes = useStyles();
  const { values, setFieldValue, getFieldProps, touched, errors } = formik;
  const dispatch = useDispatch();
  const deliveries = useSelector((state)=>selectDeliveries(state, state.client.deliveryMethods));
  const { deliveryProviders, nickname, location } = useSelector((state)=>state.client);
  const {locationAddress: addresses} = useSelector((state)=>(state.user));
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState(null);

  const handleSelectedAddress = (value) => {
    if (value) {
      const { address } = value;
      if (deliveryProviders.length){
        const deliveryProvider = deliveryProviders[0]._id; 
        console.log(" == default == ");
        console.log(deliveryProvider);
        setFieldValue('deliveryProvider', deliveryProvider);
      }
      setFieldValue('address', address || '');
      setFieldValue('fullAddress', value);
      setAddress({...value, fullAddress: fullAddress(value) });
      setNewAddress(false);
    }else{
      setFieldValue('address', '');
      setAddress(value);
    }
  }

  const handleSelectDeliveryProvider = (e) => {
    const value = e.target.value;
    setFieldValue('deliveryProvider', value);
    // setAddress({...address, deliveryProvider: value});
  }

  useEffect(()=>{
    // init firts value type delivery of the list
    if (deliveries.length) {
      setFieldValue('type', deliveries[0].value);
    }
  }, [deliveries, setFieldValue]);
  useEffect(()=>{
    // init firts value type address of the list users
    dispatch(setCheckoutDelivery(values.type));
    dispatch(setUpdateCart());
    if (values.type === 'delivery' && addresses.length === 0 && address === null) {
      setNewAddress(true);
    }
  }, [addresses, values.type, address]);
  return (
    <>
        <RadioGroup
          name="delivery"
          {...getFieldProps('type')}
        >
          <Grid container spacing={2}>
            {deliveries.map(delivery => {
              const { value, name, description } = delivery;
              return (
                <Grid key={value} item xs={12} md={6}>
                  <div
                    className={clsx(classes.option, {
                      [classes.isSelected]: values.type === value
                    })}
                  >
                    <FormControlLabel
                      value={value}
                      control={
                        <Radio
                          color="primary"
                          checkedIcon={<Icon icon={checkmarkCircle2Fill} />}
                        />
                      }
                      label={
                        <Box sx={{ ml: 1 }}>
                          <Typography variant="subtitle2">{name}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {description}
                            {location && location.address !== '' && value === 'takeaway' && (
                              <Typography variant="body2" color="textSecondary">
                                {`${location.address} ${location.addressMore}  ${location.city}  ${location.state}`}
                              </Typography>
                            )}
                          </Typography>
                        </Box>
                      }
                      className={classes.label}
                    />
                  </div>
                </Grid>
              );
            })}
          </Grid>

          <Box sx={{ mb: 3 }} />

          {!address && !newAddress && values.type === 'delivery' && (
            <Address
              formik={formik}
              addresses={addresses}
              onNewAddress={()=>{setNewAddress(true)}}
              onSelectedAddress={handleSelectedAddress}
            />
          )}

          {newAddress && values.type === 'delivery' && (
            <>
              <NewAddress
                cancel={addresses.length>0}
                onSelect={handleSelectedAddress}
                onClose={()=>{setNewAddress(false)}}
              />
            </>
          )}

          {address && (
            <>
              <AddressSelected
                address={address}
                onChange={()=>{handleSelectedAddress(null)}}
              />
              {touched.address && errors.address && (
                <FormHelperText error>
                  <Box component="span" sx={{ px: 2 }}>
                    {touched.address && errors.address}
                  </Box>
                </FormHelperText>
              )}
            </>
          )}

          {!newAddress && address !== '' && values.type === 'delivery' && deliveryProviders.length > 0 && (
            <>
              <TextField
                select
                fullWidth
                label="Proveedor de entrega"
                placeholder="Proveedor de entrega"
                SelectProps={{ native: true }}
                onChange={handleSelectDeliveryProvider}
                error={Boolean(touched.deliveryProvider && errors.deliveryProvider)}
                helperText={touched.deliveryProvider && errors.deliveryProvider || nickname === 'daliasbelloscolores' ? 'Los envíos se realizan todos los días martes' : ''}
              >
                {deliveryProviders.map((provider)=>(
                  <option value={provider._id}>
                    {provider.name}
                  </option>
                ))}
              </TextField>
            </>
          )}

          {values.type === 'eatin' && (
            <TextField
              disabled={loading}
              variant="outlined"
              fullWidth
              required
              x-id="email"
              label="Dirección"
              name="address"
              type="text"
              autoComplete="address"
              {...getFieldProps('address')}
              error={Boolean(touched.address && errors.address)}
              helperText={touched.address && errors.address}
            />
          )}

        </RadioGroup>
    </>
  );
}

export default Deliveries;
