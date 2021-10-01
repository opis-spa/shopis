import { Helmet } from 'react-helmet-async';
import { hotjarConfig } from '../config';

// ----------------------------------------------------------------------

const HOTJAR_ID = hotjarConfig;

export default function Hotjar() {
  return (
    <Helmet>
      <script>
        {`(function(h,o,t,j,a,r){
             h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
             h._hjSettings={hjid:'${HOTJAR_ID}',hjsv:6};
             a=o.getElementsByTagName('head')[0];
             r=o.createElement('script');r.async=1;
             r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
             a.appendChild(r);
         })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
      </script>
    </Helmet>
  );
}
