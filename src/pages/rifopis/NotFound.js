import React from 'react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// components
import { MotionContainer, varBounceIn } from '../../components/animate';
import Page from '../../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <RootStyle title="Shopis - No encontramos la tienda">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                No encontramos la tienda que estabas buscando{' '}
                <span role="img" aria-label="not_found">
                  🥺
                </span>
                .
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'text.secondary' }}>
              Es posible que esta tienda ya no exista o tenga otro nombre.
            </Typography>

            <motion.div variants={varBounceIn}>
              <Box
                component={motion.img}
                whileTap="tap"
                whileHover="hover"
                variants={{
                  hover: { scale: 1.02 },
                  tap: { scale: 0.98 }
                }}
                src="/static/illustrations/illustration_page_not_found.svg"
              />
            </motion.div>

            <Button to="/" size="large" variant="contained" component={RouterLink}>
              Explorar
            </Button>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}
