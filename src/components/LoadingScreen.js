import NProgress from 'nprogress';
import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
// material
import { styled, useTheme } from '@mui/material/styles';
import { CircularProgress, GlobalStyles } from '@mui/material';
//
import LogoShopis from './LogoShopis';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export function ProgressBarStyle() {
  const theme = useTheme();

  return (
    <GlobalStyles
      styles={{
        '#nprogress': {
          pointerEvents: 'none',
          '& .bar': {
            top: 0,
            left: 0,
            height: 2,
            width: '100%',
            position: 'fixed',
            zIndex: theme.zIndex.snackbar,
            backgroundColor: theme.palette.primary.main,
            boxShadow: `0 0 2px ${theme.palette.primary.main}`
          },
          '& .peg': {
            right: 0,
            opacity: 1,
            width: 100,
            height: '100%',
            display: 'block',
            position: 'absolute',
            transform: 'rotate(3deg) translate(0px, -4px)',
            boxShadow: `0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`
          }
        }
      }}
    />
  );
}

function ProgressBar() {
  NProgress.configure({
    showSpinner: false
  });

  useMemo(() => {
    NProgress.start();
  }, []);

  useEffect(() => {
    NProgress.done();
  }, []);

  return null;
}

export default function LoadingScreen({ ...other }) {
  const DOMAIN_HOST = window.location.host;
  const isRifopis = DOMAIN_HOST.indexOf('rifopis.cl') >= 0;

  return (
    <>
      <ProgressBar />

      <RootStyle {...other}>
        <motion.div
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeatDelay: 1,
            repeat: Infinity
          }}
        >
          {isRifopis ? <CircularProgress /> : <LogoShopis sx={{ width: 64, height: 64 }} />}
        </motion.div>
      </RootStyle>
    </>
  );
}
