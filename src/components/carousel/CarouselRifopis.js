import React, { useState, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { paramCase } from 'change-case';
import { Link as RouteLink } from 'react-router-dom';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Container, Grid, Paper, Typography } from '@mui/material';
// hooks
import usePartnership from '../../hooks/usePartnership';
// routes
import { PATH_SHOP } from '../../routes/paths';
//
import { varFadeInRight, varZoomIn, MotionContainer } from '../animate';
import { CarouselControlsArrowsBasic2 } from './controls';
import { ButtonTicket } from '../rifopis';
import RifopisPolaroid from '../rifopis/RifopisPolaroid';

// ----------------------------------------------------------------------

const CardStyle = styled(Card)({
  borderRadius: 0
});

const CarouselImgStyle = styled('img')({
  width: '100vh',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  isActive: PropTypes.bool
};

function CarouselItem({ item, isActive, index }) {
  const { partnership } = usePartnership();
  const { nickname } = partnership;
  const theme = useTheme();
  const { photo, photos, name } = item;

  const rotateDeg = useMemo(() => {
    switch (index) {
      case 0:
        return 10;
      case 1:
        return -7;
      case 2:
        return 7;
      case 3:
        return -5;
      default:
        return 15;
    }
  }, [index]);

  return (
    <Box
      sx={{
        width: '100%',
        background: `url(${photo || photos[0]})`
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          width: '100%',
          color: 'common.white',
          py: (theme) => theme.spacing(20)
        }}
      >
        <Grid
          container
          sx={{
            height: '100%',
            display: 'flex',
            flex: 1,
            justifyContent: { xs: 'center', md: 'flex-start' },
            alignItems: 'center'
          }}
        >
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <MotionContainer open={isActive}>
              <motion.div variants={varFadeInRight}>
                <Typography variant="h3" gutterBottom sx={{ textTransform: 'uppercase' }}>
                  sorteos con proposito
                </Typography>
              </motion.div>
              <motion.div variants={varFadeInRight}>
                <Typography variant="h1" noWrap gutterBottom sx={{ textTransform: 'uppercase' }}>
                  Vuelve <br /> a viajar
                </Typography>
              </motion.div>
              <motion.div variants={varFadeInRight}>
                <ButtonTicket
                  fullWidth
                  component={RouteLink}
                  to={`${PATH_SHOP.root}/${nickname}/product/${paramCase(item.name)}`}
                  variant="contained"
                  title="Participar"
                  sx={{ mt: 3, zIndex: 100 }}
                >
                  Participar
                </ButtonTicket>
              </motion.div>
            </MotionContainer>
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
            <Box sx={{ transform: `rotate(${rotateDeg}deg)` }}>
              <MotionContainer open={isActive}>
                <motion.div variants={varZoomIn}>
                  <RifopisPolaroid
                    title="Primer lugar"
                    subtitle={name}
                    photo="/static/brand/rifopis.png"
                    sx={{ zIndex: 0 }}
                  />
                </motion.div>
              </MotionContainer>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default function CarouselAnimation() {
  const theme = useTheme();
  const carouselRef = useRef();
  const { products } = useSelector((state) => state.product);

  const productsList = useMemo(() => products.filter((item, i) => i < 4), [products]);
  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? productsList.length - 1 : 0);

  const settings = {
    speed: 1500,
    dots: false,
    arrows: false,
    autoplaySpeed: 6000,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setCurrentIndex(next)
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  return (
    <CardStyle>
      <Slider adaptiveHeight ref={carouselRef} {...settings}>
        {productsList.map((item, index) => (
          <CarouselItem key={item.name} item={item} index={index} isActive={index === currentIndex} />
        ))}
      </Slider>

      <CarouselControlsArrowsBasic2 onNext={handleNext} onPrevious={handlePrevious} />
    </CardStyle>
  );
}
