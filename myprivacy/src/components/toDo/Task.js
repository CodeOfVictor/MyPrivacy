import * as React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

function Task({ state, title, date, description, onClick, onCheckboxChange }) {
    return (
        <Box sx={{ minWidth: 275, marginBottom: '1%', marginLeft: '1%' }}>
            <Card variant="outlined" onClick={onClick}>
                <CardContent style={{ textAlign: 'center' }}>
                    <Box display="flex" alignItems="center">
                        <Checkbox
                            checked={state}
                            onChange={onCheckboxChange} // Trigger the function when checkbox is changed
                            onClick={(event) => event.stopPropagation()} // Prevent click event from propagating to the card
                        />
                        <Typography variant="h5" component="div">
                            {title}
                        </Typography>
                    </Box>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
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
