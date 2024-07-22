import * as React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

function Note({ title, date, description }) {
  return (
    <Box sx={{ minWidth: 275, marginBottom: '1%', marginLeft: '1%' }}>
      <Card variant="outlined" style={{ textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {date}
          </Typography>
          <Typography variant="body2">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Note;
