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
    <>
      <Box {...other} sx={{ ...other.sx, display: 'none', [theme.breakpoints.up('md')]: { display: 'block' } }}>
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
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
      <Box {...other} sx={{ ...other.sx, display: 'block', [theme.breakpoints.up('md')]: { display: 'none' } }}>
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          viewBox="0 0 320 454"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0H320V308.5L240 344.875L160 381.25L0 454V0Z" fill={PRIMARY_MAIN} />
          <path d="M118.5 0H320V270.5L118.5 0Z" fill={SECONDARY_MAIN} />
        </svg>
      </Box>
    </>
  );
}
