import { Box, Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0)
}));

const PageNotFound = () => {
  return (
    <Container>
      <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
        <Box
          component='img'
          src='/assets/images/illustration_404.svg'
          sx={{ height: 100, mx: 'auto' }}
        />
        <Typography sx={{ color: 'text.secondary', my: { xs: 5 } }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
          sure to check your spelling.
        </Typography>
        <Button to='/' size='large' variant='contained' component={RouterLink}>
          Go to Home
        </Button>
      </ContentStyle>
    </Container>
  );
};

export default PageNotFound;
