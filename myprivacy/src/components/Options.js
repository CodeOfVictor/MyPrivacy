import * as React from 'react';
import { Box, Typography, Modal, Switch, Button, InputLabel, MenuItem, FormControl, Select, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useThemeContext } from '../ThemeContext';
import { useTranslation } from 'react-i18next';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 600,
    bgcolor: 'background.paper',
    border: '2px solid #1976d2',
    boxShadow: 24,
    p: 4,
};

function Options({ open, handleClose }) {
    const { darkMode, toggleTheme } = useThemeContext();
    const { i18n } = useTranslation();
    const [language, setLanguage] = React.useState(i18n.language || 'en');

    const handleChangeLanguage = (event) => {
        const selectedLanguage = event.target.value;
        setLanguage(selectedLanguage);
        i18n.changeLanguage(selectedLanguage);
        localStorage.setItem('i18nextLng', selectedLanguage); // Save the selected language to localStorage
    };

    const handleDeleteAll = () => {
        localStorage.removeItem('events');
        localStorage.removeItem('notes');
        localStorage.removeItem('tasks');
        window.location.reload();
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
                    {i18n.t('Options')}
                </Typography>

                <Stack spacing={2} sx={{ mt: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography>{i18n.t('Dark theme')}</Typography>
                        <Switch checked={darkMode} onChange={toggleTheme} />
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography>{i18n.t('Language')}</Typography>
                        <FormControl fullWidth>
                            <InputLabel id="language-select-label">{i18n.t('Language')}</InputLabel>
                            <Select
                                labelId="language-select-label"
                                id="language-select"
                                value={language}
                                onChange={handleChangeLanguage}
                                label={i18n.t('Language')}
                            >
                                <MenuItem value="en">{i18n.t('English')}</MenuItem>
                                <MenuItem value="es">{i18n.t('Spanish')}</MenuItem>
                                <MenuItem value="de">{i18n.t('German')}</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography>{i18n.t('Delete All')}</Typography>
                        <Button color="error" endIcon={<DeleteIcon />} onClick={handleDeleteAll}>
                            {i18n.t('DELETE')}
                        </Button>
                    </Stack>
                </Stack>

                <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleClose}>
                    {i18n.t('Save and close')}
                </Button>
            </Box>
        </Modal>
    );
}

export default Options;
