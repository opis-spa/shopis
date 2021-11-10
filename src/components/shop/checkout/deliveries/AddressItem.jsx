import React from 'react';
import {makeStyles} from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Label from '../../Label';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    position: 'relative',
    marginBottom: theme.spacing(3)
  },
  action: {
    display: 'flex',
    marginTop: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      right: theme.spacing(3),
      bottom: theme.spacing(3)
    }
  }
}));

const propTypes = {
  address: PropTypes.object,
  onSelectedAddress: PropTypes.func
};
const defaultProps = {
  onSelectedAddress: () => {},
}

function AddressItem({ address, onSelectedAddress }) {
  const classes = useStyles();
  const { name, fullAddress, state, isDefault } = address;

  const handleSelectedAddress = () => {
    onSelectedAddress(address);
  };

  return (
    <Card className={classes.item}>
      <CardContent>
        <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle1">{name}</Typography>
          {isDefault && (
            <Label color="info" sx={{ ml: 1 }}>
              Default
            </Label>
          )}
        </Box>
        <Typography variant="body2" gutterBottom>
          {fullAddress}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {state}
        </Typography>

        <div className={classes.action}>
          {!isDefault && (
            <Button
              type="button"
              variant="outlined"
              size="small"
              color="inherit"
            >
              Eliminar
            </Button>
          )}
          <Box sx={{ mx: 0.5 }} />
          <Button
            type="button"
            variant="outlined"
            size="small"
            onClick={handleSelectedAddress}
          >
            Usar esta dirección
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

AddressItem.propTypes = propTypes;
AddressItem.defaultProps = defaultProps;

export default AddressItem;