import React, { useState, useEffect } from 'react';
import { Grid, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './Navbar';
import Calendar from './calendar/Calendar';
import Notes from './notes/Notes';
import ToDo from './toDo/ToDo';
import Options from './Options';
import { useThemeContext } from '../ThemeContext';
import Login from './Login';
import CryptoJS from 'crypto-js';
import { useTranslation } from 'react-i18next';

function Application() {
    const { t } = useTranslation();
    const [activeComponent, setActiveComponent] = useState('Calendar');
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [masterKey, setMasterKey] = useState('');

    const openOptionsModal = () => setIsOptionsOpen(true);
    const closeOptionsModal = () => setIsOptionsOpen(false);

    const handleLogin = (enteredPassword, reset = false) => {
        if (reset) {
            localStorage.removeItem('events');
            localStorage.removeItem('notes');
            localStorage.removeItem('tasks');
            localStorage.removeItem('storedPassword');
            setIsAuthenticated(false);
            setIsLoginOpen(true);
            setLoginError('');
            setMasterKey(''); // Clear masterKey
            return;
        }

        const events = localStorage.getItem('events');
        const notes = localStorage.getItem('notes');
        const tasks = localStorage.getItem('tasks');
        const storedPasswordEncrypted = localStorage.getItem('storedPassword');

        try {
            if (events && notes && tasks) {
                CryptoJS.AES.decrypt(events, enteredPassword).toString(CryptoJS.enc.Utf8);
                CryptoJS.AES.decrypt(notes, enteredPassword).toString(CryptoJS.enc.Utf8);
                CryptoJS.AES.decrypt(tasks, enteredPassword).toString(CryptoJS.enc.Utf8);
            }
            if (storedPasswordEncrypted) {
                const decryptedPassword = CryptoJS.AES.decrypt(storedPasswordEncrypted, enteredPassword).toString(CryptoJS.enc.Utf8);
                if (enteredPassword === decryptedPassword) {
                    setIsAuthenticated(true);
                    setIsLoginOpen(false);
                    setLoginError('');
                    setMasterKey(enteredPassword); // Set masterKey on successful login
                } else {
                    setLoginError(t('ErrorPassword'));
                }
            } else {
                localStorage.setItem('storedPassword', CryptoJS.AES.encrypt(enteredPassword, enteredPassword).toString());
                setIsAuthenticated(true);
                setIsLoginOpen(false);
                setLoginError('');
                setMasterKey(enteredPassword); // Set masterKey on successful login
            }
        } catch (error) {
            setLoginError(t('ErrorPassword'));
        }
    };

    useEffect(() => {
        const storedPasswordEncrypted = localStorage.getItem('storedPassword');
        if (storedPasswordEncrypted) {
            setIsLoginOpen(true);
        } else {
            setIsAuthenticated(true);
        }
    }, []);

    const renderComponent = () => {
        if (!isAuthenticated) {
            return null;
        }

        switch (activeComponent) {
            case 'Calendar':
                return <Calendar masterKey={masterKey} />;
            case 'Notes':
                return <Notes masterKey={masterKey} />;
            case 'ToDo':
                return <ToDo masterKey={masterKey} />;
            default:
                return <ToDo masterKey={masterKey} />;
        }
    };

    const { darkMode } = useThemeContext();

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            background: {
                default: darkMode ? '#000000' : '#ffffff',
            },
            text: {
                primary: darkMode ? '#ffffff' : '#000000',
                secondary: '#1976D2',
            },
        },
    });
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid container>
                <Navbar setActiveComponent={setActiveComponent} openOptionsModal={openOptionsModal} />
                <Grid container>
                    {renderComponent()}
                </Grid>
            </Grid>
            <Options open={isOptionsOpen} handleClose={closeOptionsModal} />
            <Login open={isLoginOpen} handleClose={handleLogin} loginError={loginError} />
        </ThemeProvider>
    );
}

export default Application;
