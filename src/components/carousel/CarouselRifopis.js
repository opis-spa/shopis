import React, { useState, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, Container, Grid, Typography } from '@mui/material';
//
import { varFadeInRight, varZoomIn, MotionContainer } from '../animate';
import { CarouselControlsArrowsBasic2 } from './controls';
import { ButtonTicket } from '../rifopis';
import RifopisPolaroid from '../rifopis/RifopisPolaroid';

// ----------------------------------------------------------------------

const CardStyle = styled(Card)({
  borderRadius: 0
});

// ----------------------------------------------------------------------

const propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  isActive: PropTypes.bool,
  onSelectProduct: PropTypes.func
};

const defaultProps = {
  onSelectProduct: () => {}
};

function ChristmasCarouselItem({ isActive }) {
  return (
    <Box
      sx={{
        width: '100%',
        background: `url(https://firebasestorage.googleapis.com/v0/b/dreampay-73a3a.appspot.com/o/rifopis%2Fbackground-christmas.png?alt=media&token=f0875bdd-9754-450b-868e-c5739efb12b1)`,
        backgroundPosition: 'center'
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
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
            <MotionContainer open={isActive}>
              <motion.div variants={varZoomIn}>
                <Box
                  component="img"
                  src="https://firebasestorage.googleapis.com/v0/b/dreampay-73a3a.appspot.com/o/rifopis%2Frifopis-christmas.png?alt=media&token=52e6571d-7799-468b-875c-39c7aac90846"
                  sx={{ height: 460, objectFit: 'contain' }}
                />
              </motion.div>
            </MotionContainer>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

ChristmasCarouselItem.propTypes = { isActive: PropTypes.bool.isRequired };

function CarouselItem({ item, isActive, index, onSelectProduct }) {
  const { photo, photos, name } = item;

  const isCrypto = !(name.indexOf('san') >= 0);

  const handleSelectProduct = () => {
    onSelectProduct(item);
  };
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
        background: `url(${photo || photos[0]})`,
        backgroundPosition: 'center'
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
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' }, zIndex: 100 }}>
            <MotionContainer open={isActive}>
              <motion.div variants={varFadeInRight}>
                <Typography variant="h3" gutterBottom sx={{ textTransform: 'uppercase' }}>
                  {isCrypto ? 'Aceleremos la adopción' : 'Reactivemos el turismo'}
                </Typography>
              </motion.div>
              <motion.div variants={varFadeInRight}>
                <Typography variant="h1" noWrap gutterBottom sx={{ fontWeight: 900, textTransform: 'uppercase' }}>
                  {isCrypto ? `Gana \n cripto` : `Vuelve \n a viajar`}
                </Typography>
              </motion.div>
              <motion.div variants={varFadeInRight}>
                <ButtonTicket
                  fullWidth
                  isBanner
                  onClick={handleSelectProduct}
                  variant="contained"
                  title="Participar"
                  fontSize={28}
                  sx={{ mt: 3, width: 240, zIndex: 100 }}
                >
                  Participar
                </ButtonTicket>
              </motion.div>
            </MotionContainer>
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
            <Box sx={{ transform: isCrypto ? `none` : `rotate(${rotateDeg}deg)`, zIndex: 1 }}>
              <MotionContainer open={isActive}>
                <motion.div variants={varZoomIn}>
                  {isCrypto ? (
                    <Box
                      component="img"
                      src="/static/brand/rifopis_lentes.png"
                      sx={{ height: 460, objectFit: 'contain' }}
                    />
                  ) : (
                    <RifopisPolaroid
                      title="Primer lugar"
                      subtitle={name}
                      photo="/static/brand/rifopis.png"
                      sx={{ zIndex: 0 }}
                    />
                  )}
                </motion.div>
              </MotionContainer>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

CarouselItem.propTypes = propTypes;
CarouselItem.defaultProps = defaultProps;

const propsCarouselRifopis = {
  onSelectProduct: PropTypes.func
};
const defaultsCarouselRifopis = {
  onSelectProduct: () => {}
};

function CarouselRifopis({ onSelectProduct }) {
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
        <ChristmasCarouselItem onSelectProduct={onSelectProduct} item={{}} index={0} isActive={currentIndex === 0} />
        {productsList.map((item, index) => (
          <CarouselItem
            onSelectProduct={onSelectProduct}
            key={item.name}
            item={item}
            index={index + 1}
            isActive={index + 1 === currentIndex}
          />
        ))}
      </Slider>

      <CarouselControlsArrowsBasic2 onNext={handleNext} onPrevious={handlePrevious} />
    </CardStyle>
  );
}

CarouselRifopis.propTypes = propsCarouselRifopis;
CarouselRifopis.propTypes = defaultsCarouselRifopis;

export default CarouselRifopis;
