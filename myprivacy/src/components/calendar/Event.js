import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, AccordionActions, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

function Event({ title, description, defaultExpanded }) {
    return (
        <Accordion defaultExpanded={defaultExpanded}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${title}-content`}
                id={`${title}-header`}
            >
                <Typography variant="h6">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{description}</Typography>
            </AccordionDetails>
            <AccordionActions>
                <Button>Edit</Button>
                <Button color="error" endIcon={<DeleteIcon />}>Delete</Button>
            </AccordionActions>
        </Accordion>
    );
}

export default Event;
