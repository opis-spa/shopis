import React, { useEffect } from 'react';
import { scroller } from 'react-scroll';
import { useLocation } from 'react-router-dom';
// materials
import { styled } from '@mui/material/styles';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
// components
import Page from '../../components/Page';
import {
  LandingHero,
  LandingShared,
  LandingPricingPlans,
  LandingFaqs,
  LandingRegister,
  LandingOrdersAllTime,
  LandingMethodPayment,
  LandingCategories,
  LandingContact
} from '../../components/landing';

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

const Landing = () => {
  const location = useLocation();
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    const { hash } = location;
    if (isMountedRef.current === true) {
      if (hash) {
        // Somewhere else, even another file
        scroller.scrollTo(hash.replace('#', ''), {
          duration: 1500,
          delay: 100,
          smooth: true,
          offset: 50 // Scrolls to element + 50 pixels down the page
        });
      }
    }
  }, [isMountedRef, location]);

  return (
    <RootStyle title="shopis">
      <LandingHero />
      <ContentStyle>
        <LandingCategories />
        <LandingShared />
        <LandingOrdersAllTime />
        <LandingMethodPayment />
        <LandingRegister />
        <LandingPricingPlans />
        <LandingFaqs />
        <LandingContact />
      </ContentStyle>
    </RootStyle>
  );
};

export default Landing;
