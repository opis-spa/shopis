import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
// material
import { Stack, Button, Divider, Typography } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

const propTypes = {
  onHasError: PropTypes.func
};

const defaultProps = {
  onHasError: () => {}
};

function AuthFirebaseSocials(props) {
  const { onHasError } = props;
  const { loginWithGoogle, loginWithFaceBook } = useAuth();

  const handleLoginGoogle = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      const { code, message } = error;
      if (code !== 'auth/popup-closed-by-user') {
        onHasError(message);
      }
    }
  };

  const handleLoginFaceBook = async () => {
    try {
      await loginWithFaceBook();
    } catch (error) {
      const { code, message } = error;
      if (code !== 'auth/popup-closed-by-user') {
        onHasError(message);
      }
    }
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleLoginGoogle}>
          <Icon icon={googleFill} color="#DF3E30" height={24} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleLoginFaceBook}>
          <Icon icon={facebookFill} color="#1877F2" height={24} />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          O
        </Typography>
      </Divider>
    </>
  );
}

AuthFirebaseSocials.propTypes = propTypes;
AuthFirebaseSocials.defaultProps = defaultProps;

export default AuthFirebaseSocials;
