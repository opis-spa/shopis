import { googleAnalyticsConfig, facebookPixelConfig } from '../config';

// ----------------------------------------------------------------------

const gaMeasurement = (...args) => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  if (!window.gtag) {
    return;
  }
  window.gtag(...args);
};

const pixelMeasurement = (...args) => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  if (!window.fbq) {
    return;
  }
  window.fbq(...args);
};

const track = {
  pageview: (props) => {
    gaMeasurement('config', googleAnalyticsConfig, props);
    pixelMeasurement('init', facebookPixelConfig, props);
  },
  event: (type, props) => {
    gaMeasurement('event', type, props);
    pixelMeasurement('track', props);
  }
};

export default track;
