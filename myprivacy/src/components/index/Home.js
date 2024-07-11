import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import Button from '@mui/material/Button';

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
            padding: 10,
            borderRadius: 1,
            textAlign: 'center',
          }}
        >
            <Typography variant="h1" style={{marginBottom: '40px'}}>MyPrivacy</Typography>
            
            <Typography variant="h4">Your management space</Typography>
            <Typography variant="h4">Focused on privacy</Typography>

            <Button variant="contained" 
                style={{
                    marginTop: '40px', 
                    padding: '16px 32px',
                    fontSize: '18px'
                }}
            >Coming soon</Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Home;
