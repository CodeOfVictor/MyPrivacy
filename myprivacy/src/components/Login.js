import React, { useState, useEffect } from 'react';
import { Box, Modal, TextField, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 400,
    bgcolor: 'background.paper',
    border: '2px solid #1976d2',
    boxShadow: 24,
    p: 4,
};

function Login({ open, handleClose, loginError }) {
    const { t } = useTranslation();
    const [enteredPassword, setEnteredPassword] = useState('');
    const [showReset, setShowReset] = useState(false);
    const [resetMessage, setResetMessage] = useState('');

    useEffect(() => {
        const events = localStorage.getItem('events');
        const notes = localStorage.getItem('notes');
        const tasks = localStorage.getItem('tasks');

        setShowReset(events || notes || tasks);
        setResetMessage('');
    }, [open]);

    const handlePasswordChange = (event) => {
        setEnteredPassword(event.target.value);
        setResetMessage('');
    };

    const handleLoginClick = () => {
        handleClose(enteredPassword, false);
    };

    const handleResetClick = () => {
        handleClose('', true);
        setResetMessage(t('ClearData'));
    };

    return (
        <Modal
            open={open}
            onClose={() => {}}
            aria-labelledby="modal-modal-title-login"
            aria-describedby="modal-modal-description-login"
        >
            <Box sx={modalStyle}>
                <TextField
                    fullWidth
                    label={t('Password')}
                    type="password"
                    variant="outlined"
                    value={enteredPassword}
                    onChange={handlePasswordChange}
                    margin="normal"
                />
                {loginError && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        {loginError}
                    </Typography>
                )}
                {resetMessage && (
                    <Typography color="textSecondary" sx={{ mb: 2 }}>
                        {resetMessage}
                    </Typography>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLoginClick}
                    fullWidth
                    sx={{ mb: 1 }}
                >
                    {t('Login')}
                </Button>
                {showReset && (
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleResetClick}
                        fullWidth
                    >
                        {t('Reset')}
                    </Button>
                )}
            </Box>
        </Modal>
    );
}

export default Login;
