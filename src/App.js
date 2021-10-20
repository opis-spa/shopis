// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// hooks
import useAuth from './hooks/useAuth';
// components
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import GoogleAnalytics from './components/GoogleAnalytics';
import PayPal from './components/PayPal';
import Hotjar from './components/Hotjar';
import ThemePrimaryColor from './components/ThemePrimaryColor';
import NotistackProvider from './components/NotistackProvider';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import LoadingScreen, { ProgressBarStyle } from './components/LoadingScreen';
// configs
import { isProduction } from './config';

// ----------------------------------------------------------------------

export default function App() {
  const { isInitialized } = useAuth();

  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <RtlLayout>
          <NotistackProvider>
            <GlobalStyles />
            <PayPal />
            <ProgressBarStyle />
            <BaseOptionChartStyle />
            <ScrollToTop />
            {isProduction && <GoogleAnalytics />}
            {isProduction && <Hotjar />}
            {isInitialized ? <Router /> : <LoadingScreen generic />}
          </NotistackProvider>
        </RtlLayout>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
