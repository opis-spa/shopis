import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import editFill from '@iconify-icons/eva/edit-fill';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  Button,
  Typography,
  CardHeader,
  CardContent
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

const propTypes = {
  billing: PropTypes.object,
  onChange: PropTypes.func,
  className: PropTypes.string
};

function AddressSelected({ address, onChange, className }) {
  const classes = useStyles();
  const { name, fullAddress, city } = address;

  return (
    <Card className={clsx(classes.root, className)}>
      <CardHeader
        title="Dirección de entrega"
        action={
          <Button
            size="small"
            type="button"
            startIcon={<Icon icon={editFill} />}
            onClick={onChange}
          >
            Cambiar
          </Button>
        }
      />
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          {name}
        </Typography>

        <Typography variant="body2" gutterBottom>
          {fullAddress}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {city}
        </Typography>
      </CardContent>
    </Card>
  );
}

AddressSelected.propTypes = propTypes;

export default AddressSelected;
