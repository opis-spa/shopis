import PropTypes from 'prop-types';
import { useMemo } from 'react';
// material
import { alpha, ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
//
import componentsOverride from '../theme/overrides';

// ----------------------------------------------------------------------

ThemePrimaryColor.propTypes = {
  children: PropTypes.node
};

export default function ThemePrimaryColor({ children }) {
  const defaultTheme = useTheme();
  const { setColors } = useSettings();

  const themeOptions = useMemo(
    () => ({
      ...defaultTheme,
      palette: {
        ...defaultTheme.palette,
        ...setColors
      },
      customShadows: {
        ...defaultTheme.customShadows,
        primary: `0 8px 16px 0 ${alpha(
          setColors.primary || false ? setColors.primary.main : defaultTheme.palette.primary.main,
          0.24
        )}`
      }
    }),
    [setColors, defaultTheme]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
