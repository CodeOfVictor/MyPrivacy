import * as React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

function Task({ state, title, date, description }) {
    return (
        <Box sx={{ minWidth: 275, marginBottom: '1%', marginLeft: '1%' }}>
            <Card variant="outlined">
                <CardContent>
                    {/* Wrap the title in a Box to center it */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h5" component="div">
                            <Checkbox />
                            {title}
                        </Typography>
                    </Box>
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

export default Task;
