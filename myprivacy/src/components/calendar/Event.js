import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, AccordionActions, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';

function Event({ date, title, description, defaultExpanded, onEdit, onDelete }) {
  const { t } = useTranslation();

    return (
        <Accordion defaultExpanded={defaultExpanded}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${title}-content`}
                id={`${title}-header`}
            >
                <Typography variant="h6">{date}: {title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{description}</Typography>
            </AccordionDetails>
            <AccordionActions>
                {/* Edit button */}
                <Button color="info" startIcon={<EditIcon />} onClick={(e) => { e.stopPropagation(); onEdit(); }}>
                    {t('Edit')}
                </Button>
                {/* Delete button */}
                <Button color="error" startIcon={<DeleteIcon />} onClick={(e) => { e.stopPropagation(); onDelete(); }}>
                    {t('Delete')}
                </Button>
            </AccordionActions>
        </Accordion>
    );
}

export default Event;
