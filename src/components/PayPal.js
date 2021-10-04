import { Helmet } from 'react-helmet-async';
import { paypalConfig } from '../config';

// ----------------------------------------------------------------------

const PAYPAL_CLIENT_ID = paypalConfig;

export default function PayPal() {
  return (
    <Helmet>
      <script async src={`https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}`} />
    </Helmet>
  );
}
