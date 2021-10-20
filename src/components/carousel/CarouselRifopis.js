import React, { useState, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { paramCase } from 'change-case';
import { Link as RouteLink } from 'react-router-dom';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Container, Grid, Paper, Typography, Stack } from '@mui/material';
// hooks
import usePartnership from '../../hooks/usePartnership';
// routes
import { PATH_SHOP } from '../../routes/paths';
//
import { varFadeInRight, varZoomIn, MotionContainer } from '../animate';
import { CarouselControlsArrowsBasic2 } from './controls';
import { ButtonTicket } from '../rifopis';

// ----------------------------------------------------------------------

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

      <Container
        maxWidth="lg"
        sx={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          position: 'absolute',
          color: 'common.white'
        }}
      >
        <Grid
          container
          sx={{
            height: '100%',
            display: 'flex',
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexWrap: 'wrap-reverse'
          }}
        >
          <Grid item xs={6}>
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
                  sx={{ mt: 3 }}
                >
                  Participar
                </ButtonTicket>
              </motion.div>
            </MotionContainer>
          </Grid>
          <Grid item xs={6} justifyContent="center" alignItems="center">
            <Box sx={{ transform: `rotate(${rotateDeg}deg)` }}>
              <MotionContainer open={isActive}>
                <motion.div variants={varZoomIn}>
                  <Box
                    sx={{
                      border: 20,
                      maxWidth: 350,
                      height: '100%',
                      minHeight: 300,
                      borderStyle: 'solid',
                      borderColor: '#fff',
                      borderTopRightRadius: 3,
                      borderTopLeftRadius: 3
                    }}
                  />
                  <Box
                    sx={{
                      marginTop: -1,
                      maxWidth: 350,
                      minHeight: 85,
                      backgroundColor: '#fff',
                      borderBottomRightRadius: 3,
                      borderBottomLeftRadius: 3,
                      px: (theme) => theme.spacing(2)
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography color="primary" sx={{ textTransform: 'uppercase', fontWeight: 900 }}>
                        Primer lugar
                      </Typography>
                      <Typography sx={{ textTransform: 'uppercase', color: 'black', fontFamily: 'Permanent Marker' }}>
                        {name}
                      </Typography>
                    </Stack>
                  </Box>
                </motion.div>
              </MotionContainer>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Paper>
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
        {productsList.map((item, index) => (
          <CarouselItem key={item.name} item={item} index={index} isActive={index === currentIndex} />
        ))}
      </Slider>

      <CarouselControlsArrowsBasic2 onNext={handleNext} onPrevious={handlePrevious} />
    </CardStyle>
  );
}
