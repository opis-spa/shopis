// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// hooks
import useAuth from './hooks/useAuth';
// analytis
import FacebookPixel from './components/FacebookPixel';
import GoogleAnalytics from './components/GoogleAnalytics';
import Hotjar from './components/Hotjar';
// components
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import PayPal from './components/PayPal';
import ThemePrimaryColor from './components/ThemePrimaryColor';
import NotistackProvider from './components/NotistackProvider';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import LoadingScreen, { ProgressBarStyle } from './components/LoadingScreen';
// configs
import { isProduction } from './config';

// ----------------------------------------------------------------------

export default function App() {
  const { isInitialized } = useAuth();
  console.log('isProduction');
  console.log(isProduction);
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
            {isProduction && (
              <>
                <FacebookPixel />
                <GoogleAnalytics />
                <Hotjar />
              </>
            )}
            {isInitialized ? <Router /> : <LoadingScreen />}
          </NotistackProvider>
        </RtlLayout>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
