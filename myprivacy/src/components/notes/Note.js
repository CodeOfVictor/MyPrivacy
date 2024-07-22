import * as React from 'react';
import { Box, Typography, Card, CardContent, CardActionArea } from '@mui/material';

function Note({ title, date, description, onClick }) {
  return (
    <Box sx={{ minWidth: 275, marginBottom: '1%', marginLeft: '1%' }}>
      <Card variant="outlined" style={{ textAlign: 'center' }}>
        <CardActionArea onClick={onClick}> {/* Handle click event */}
          <CardContent>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              {date}
            </Typography>
            <Typography variant="body2">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}

export default Note;
