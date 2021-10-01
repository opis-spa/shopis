import React from 'react';
import { Box } from '@mui/material';

export default function NotFound() {
  return (
    <Box
      component="img"
      alt="empty content"
      src="/static/illustrations/illustration_page_not_found.svg"
      sx={{ height: 240, mb: 3 }}
    />
  );
}
