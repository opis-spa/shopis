import React from 'react';
import PropTypes from 'prop-types';
// materials
import { styled } from '@mui/material/styles';
import { Box, Stack, Typography } from '@mui/material';

const StyledStack = styled(Stack)(() => ({
  boxShadow: `0px 0px 50px 20px rgba(51, 63, 114, 0.15)`,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start'
}));

const propTypes = {
  photo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  small: PropTypes.bool,
  sx: PropTypes.shape({})
};

const defaultProps = {
  small: false,
  sx: {}
};

function RifopisPolaroid({ photo, title, subtitle, small, sx }) {
  return (
    <StyledStack direction="column" sx={{ maxWidth: 400, ...sx }}>
      <Box
        sx={{
          display: 'flex',
          border: 20,
          width: '100%',
          height: small ? 215 : 350,
          borderStyle: 'solid',
          borderColor: '#fff',
          borderTopRightRadius: 3,
          borderTopLeftRadius: 3,
          overflow: 'hidden',
          justifyContent: 'center'
        }}
      >
        <Box component="img" src={photo} sx={{ height: small ? 215 : 350 }} />
      </Box>
      <Box
        sx={{
          marginTop: -1,
          width: '100%',
          minHeight: 85,
          backgroundColor: '#fff',
          borderBottomRightRadius: 3,
          borderBottomLeftRadius: 3,
          pb: (theme) => theme.spacing(1),
          px: (theme) => theme.spacing(2)
        }}
      >
        <Stack spacing={1}>
          <Typography color="primary" sx={{ textTransform: 'uppercase', fontWeight: 900 }}>
            {title}
          </Typography>
          <Typography
            sx={{ fontSize: '1.5rem', textTransform: 'uppercase', color: 'black', fontFamily: 'Permanent Marker' }}
          >
            {subtitle}
          </Typography>
        </Stack>
      </Box>
    </StyledStack>
  );
}

RifopisPolaroid.propTypes = propTypes;
RifopisPolaroid.defaultProps = defaultProps;

export default RifopisPolaroid;
