import React from 'react';
// material
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function Background({ ...other }) {
  const theme = useTheme();
  const PRIMARY_MAIN = theme.palette.primary.main;
  const SECONDARY_MAIN = theme.palette.secondary.main;

  return (
    <Box {...other}>
      <svg
        height="100%"
        viewBox="0 0 1440 547"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
      >
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Rectangle-2" fill={PRIMARY_MAIN} fillRule="nonzero">
            <polygon id="Path" points="0 0 1440 0 1440 451 0 546.5" />
          </g>
          <g id="Rectangle-40" fill={SECONDARY_MAIN} transform="translate(342.000000, 0.000000)" fillRule="nonzero">
            <polygon id="Path" points="0 0 1098 0 1098 451 738 474.875" />
          </g>
        </g>
      </svg>
    </Box>
  );
}
