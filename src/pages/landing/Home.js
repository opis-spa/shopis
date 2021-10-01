import React from 'react';
import { styled } from '@mui/material/styles';
import Page from '../../components/Page';
import {
  LandingHero,
  LandingShared,
  LandingPricingPlans,
  LandingFaqs,
  LandingRegister,
  LandingOrdersAllTime,
  LandingMethodPayment,
  LandingCategories
} from '../../components/landing';

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

const Landing = () => (
  <RootStyle title="shopis">
    <LandingHero />
    <ContentStyle>
      <LandingShared />
      <LandingCategories />
      <LandingOrdersAllTime />
      <LandingMethodPayment />
      <LandingRegister />
      <LandingPricingPlans />
      <LandingFaqs />
    </ContentStyle>
  </RootStyle>
);

export default Landing;
