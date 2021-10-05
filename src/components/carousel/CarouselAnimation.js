import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { paramCase } from 'change-case';
import { Link as RouteLink } from 'react-router-dom';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Paper, Button, Typography, CardContent } from '@mui/material';
// hooks
import usePartnership from '../../hooks/usePartnership';
// routes
import { PATH_SHOP } from '../../routes/paths';
//
import { varFadeInRight, MotionContainer } from '../animate';
import { CarouselControlsArrowsIndex } from './controls';

// ----------------------------------------------------------------------

const MOCK_CAROUSELS = [...Array(5)].map((_, index) => ({
  id: index,
  title: 'Diego',
  image: '',
  description: 'Description'
}));

const CardStyle = styled(Card)({
  borderRadius: 0
});

const CarouselImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object,
  isActive: PropTypes.bool
};

function CarouselItem({ item, isActive }) {
  const { partnership } = usePartnership();
  const { nickname } = partnership;
  const theme = useTheme();
  const { photo, photos, name } = item;

  return (
    <Paper
      sx={{
        position: 'relative',
        paddingTop: {
          xs: '100%',
          md: '50%'
        }
      }}
    >
      <CarouselImgStyle alt={name} src={photo || photos[0]} />
      <Box
        sx={{
          top: 0,
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundImage: `linear-gradient(to top, ${theme.palette.grey[900]} 0%,${alpha(
            theme.palette.grey[900],
            0
          )} 100%)`
        }}
      />
      <CardContent
        sx={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          textAlign: 'center',
          position: 'absolute',
          color: 'common.white'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%'
          }}
        >
          <MotionContainer open={isActive}>
            <motion.div variants={varFadeInRight}>
              <Typography variant="h3" gutterBottom>
                {item.name}
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInRight}>
              <Typography variant="body2" noWrap gutterBottom>
                {item.description}
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInRight}>
              <Button
                component={RouteLink}
                to={`${PATH_SHOP.root}/${nickname}/product/${paramCase(item.name)}`}
                variant="contained"
                sx={{ mt: 3 }}
              >
                Lo quiero
                <span role="img" aria-label="fire">
                  🔥
                </span>
              </Button>
            </motion.div>
          </MotionContainer>
        </Box>
      </CardContent>
    </Paper>
  );
}

export default function CarouselAnimation() {
  const theme = useTheme();
  const carouselRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? MOCK_CAROUSELS.length - 1 : 0);
  const { products } = useSelector((state) => state.product);

  const settings = {
    speed: 800,
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
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
      <Slider ref={carouselRef} {...settings}>
        {products
          .filter((item, i) => i < 4)
          .map((item, index) => (
            <CarouselItem key={item.name} item={item} isActive={index === currentIndex} />
          ))}
      </Slider>

      <CarouselControlsArrowsIndex
        index={currentIndex}
        total={MOCK_CAROUSELS.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </CardStyle>
  );
}
