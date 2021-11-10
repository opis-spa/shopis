import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Icon } from '@iconify/react';
import plusFill from '@iconify-icons/eva/plus-fill';
import PropTypes from 'prop-types';
import AddressItem from './AddressItem';

const propTypes = {
  formik: PropTypes.object,
  addresses: PropTypes.array,
  onNewAddress: PropTypes.func,
};
const defaultProps = {
  addresses: [],
  onNewAddress: () => {},
  onSelectedAddress: () => {},
};

const Address = (props) => {
  const {
    formik, addresses, onNewAddress, onSelectedAddress,
  } = props;
  const { touched, errors } = formik;

  const handleNewAddress = () => {
    onNewAddress();
  };

  const handleSelectedAddress = (value) => {
    onSelectedAddress(value);
  };

  useEffect(()=>{
    console.log(" == address == ");
    console.log(errors);
  }, [errors]);

  return (
    <>
      {addresses.map((address) => (
        <AddressItem
          key={address._id}
          address={{ ...address, fullAddress: address.address }}
          onSelectedAddress={handleSelectedAddress}
        />
      ))}

      {touched.address && errors.address && (
        <FormHelperText error>
          <Box component="span" sx={{ px: 2 }}>
            {touched.address && errors.address}
          </Box>
        </FormHelperText>
      )}

      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          type="button"
          size="small"
          onClick={handleNewAddress}
          startIcon={<Icon icon={plusFill} />}
        >
          Agregar dirección
        </Button>
      </Box>
    </>
  );
};

Address.propTypes = propTypes;
Address.defaultProps = defaultProps;

export default Address;
