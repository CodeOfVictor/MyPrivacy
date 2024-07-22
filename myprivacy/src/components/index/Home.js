import React from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';

function Home() {
  return (
    <Grid container justifyContent="center" alignItems="center" style={{ position: 'relative', height: '100vh', margin: 0, padding: 0 }}>
      <Grid item xs={12} style={{ height: '100%', overflow: 'hidden', margin: 0, padding: 0 }}>
        <img
          src={`${process.env.PUBLIC_URL}/pexels-edge-training-521332405-17668838.jpg`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', margin: 0, padding: 0 }}
          alt="Example"
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: { xs: 2, sm: 4, md: 6, lg: 8 },
            borderRadius: 1,
            textAlign: 'center',
            width: { xs: '90%', sm: '80%', md: '70%' },
          }}
        >
          <Typography variant="h2" sx={{ mb: 4 }}>
            MyPrivacy
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>
            Your management space
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Focused on privacy
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                px: 4,
                py: 2,
                fontSize: { xs: '14px', sm: '16px', md: '18px' },
              }}
            >
              Coming soon
            </Button>

            <Button
              variant="contained"
              color="secondary"
              sx={{
                px: 4,
                py: 2,
                fontSize: { xs: '14px', sm: '16px', md: '18px' },
              }}
              onClick={() => window.open('https://github.com/CodeOfVictor/MyPrivacy', '_blank')}
            >
              Github project
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Home;
