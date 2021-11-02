import React from 'react';
import PropTypes from 'prop-types';
// material
import { Box, Stack, useMediaQuery } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StackStyle = styled(Stack)(() => ({
  justifyContent: 'center',
  alignItems: 'center'
}));

const propTypes = {
  avatar: PropTypes.bool,
  diapo: PropTypes.bool,
  sx: PropTypes.shape({})
};

const defaultProps = {
  avatar: false,
  diapo: false,
  sx: {}
};

function LogoShopis({ avatar, diapo, sx }) {
  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const factor = mobile ? 0.8 : 1;

  return (
    <Box sx={{ width: 136, height: 24, ...sx }}>
      <StackStyle direction="row" spacing={2} sx={sx}>
        <Box
          component="img"
          src={diapo ? '/static/brand/avatar-diapo.svg' : '/static/brand/avatar.svg'}
          sx={{
            width: 30 * factor,
            height: 25 * factor
          }}
        />
        {!avatar && (
          <Box
            component="img"
            src={diapo ? '/static/brand/logo-diapo.svg' : '/static/brand/logo.svg'}
            sx={{
              width: 104 * factor,
              height: 35 * factor
            }}
          />
        )}
      </StackStyle>
    </Box>
  );
}

LogoShopis.propTypes = propTypes;
LogoShopis.defaultProps = defaultProps;

export default LogoShopis;
