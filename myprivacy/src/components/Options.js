import * as React from 'react';
import { Box, Typography, Modal, Switch, Button, InputLabel, MenuItem, FormControl, Select, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #1976d2',
    boxShadow: 24,
    p: 4,
};

function Options({ open, handleClose }) {
    const [language, setLanguage] = React.useState('English');
    const [darkMode, setDarkMode] = React.useState(true);

    const handleChangeLanguage = (event) => {
        setLanguage(event.target.value);
    };

    const handleChangeTheme = (event) => {
        setDarkMode(event.target.checked);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Options
                </Typography>

                <Stack spacing={2} sx={{ mt: 2 }}>
                    {/* Dark Theme Switch */}
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography>Dark Theme</Typography>
                        <Switch checked={darkMode} onChange={handleChangeTheme} />
                    </Stack>

                    {/* Language Selector */}
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography>Language</Typography>
                        <FormControl fullWidth>
                            <InputLabel id="language-select-label">Language</InputLabel>
                            <Select
                                labelId="language-select-label"
                                id="language-select"
                                value={language}
                                onChange={handleChangeLanguage}
                                label="Language"
                            >
                                <MenuItem value={'English'}>English</MenuItem>
                                <MenuItem value={'Spanish'}>Spanish</MenuItem>
                                <MenuItem value={'German'}>German</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>

                    {/* Delete Button */}
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography>Delete All</Typography>
                        <Button color="error" endIcon={<DeleteIcon />}>Delete</Button>
                    </Stack>
                </Stack>

                {/* Save and Close Button */}
                <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleClose}>
                    Save and Close
                </Button>
            </Box>
        </Modal>
    );
}

export default Options;
