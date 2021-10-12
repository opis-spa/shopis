import React, { createContext } from 'react';
import PropTypes from 'prop-types';
// hooks
import useLocalStorage from '../hooks/useLocalStorage';
// theme
import palette from '../theme/palette';

// ----------------------------------------------------------------------

const PRIMARY_COLOR = [
  // DEFAULT
  {
    name: 'default',
    ...palette.light.primary
  },
  // PURPLE
  {
    name: 'rifopis',
    lighter: '#CCDFFF',
    light: '#6697FF',
    main: '#290E43',
    dark: '#0027B7',
    darker: '#00137A',
    contrastText: '#fff'
  }
];

const SECONDARY_COLOR = [
  // DEFAULT
  {
    name: 'default',
    ...palette.light.secondary
  },
  // PURPLE
  {
    name: 'rifopis',
    lighter: '#CCDFFF',
    light: '#6697FF',
    main: '#FF8800',
    dark: '#0027B7',
    darker: '#00137A',
    contrastText: '#fff'
  }
];

SetColor.propTypes = {
  themeColor: PropTypes.oneOf(['default', 'rifopis'])
};

function SetColor(themeColor) {
  let color;
  const DEFAULT = {
    primary: PRIMARY_COLOR[0],
    secondary: SECONDARY_COLOR[0]
  };
  const RIFOPIS = {
    primary: PRIMARY_COLOR[1],
    secondary: SECONDARY_COLOR[1],
    text: {
      primary: '#fff'
    },
    background: { paper: PRIMARY_COLOR[1].main, default: PRIMARY_COLOR[1].main, neutral: PRIMARY_COLOR[1].main }
  };

  switch (themeColor) {
    case 'rifopis':
      color = RIFOPIS;
      break;
    default:
      color = DEFAULT;
  }
  return color;
}

const initialState = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeColor: 'default',
  themeStretch: false,
  onChangeMode: () => {},
  onChangeDirection: () => {},
  onChangeColor: () => {},
  onToggleStretch: () => {},
  setColors: { primary: PRIMARY_COLOR[0], secondary: SECONDARY_COLOR[0] },
  colorOption: []
};

const SettingsContext = createContext(initialState);

SettingsProvider.propTypes = {
  children: PropTypes.node
};

function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage('settings', {
    themeMode: initialState.themeMode,
    themeDirection: initialState.themeDirection,
    themeColor: initialState.themeColor,
    themeStretch: initialState.themeStretch
  });

  const onChangeMode = (event) => {
    setSettings({
      ...settings,
      themeMode: event.target.value
    });
  };

  const onChangeDirection = (event) => {
    setSettings({
      ...settings,
      themeDirection: event.target.value
    });
  };

  const onChangeColor = (event) => {
    setSettings({
      ...settings,
      themeColor: event.target.value
    });
  };

  const onToggleStretch = () => {
    setSettings({
      ...settings,
      themeStretch: !settings.themeStretch
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        // Mode
        onChangeMode,
        // Direction
        onChangeDirection,
        // Color
        onChangeColor,
        setColors: SetColor(settings.themeColor),
        // Stretch
        onToggleStretch
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };
