import React, { useState } from 'react';
import { Grid, CssBaseline, ThemeProvider, createTheme } from '@mui/material'; // Add ThemeProvider and createTheme here
import Navbar from './Navbar';
import Calendar from './calendar/Calendar';
import Notes from './notes/Notes';
import ToDo from './toDo/ToDo';
import Options from './Options';
import { useThemeContext } from '../ThemeContext';

function Application() {
    const [activeComponent, setActiveComponent] = useState('Calendar'); // Default component
    const [isOptionsOpen, setIsOptionsOpen] = useState(false); // Modal visibility

    const openOptionsModal = () => setIsOptionsOpen(true); // Open options modal
    const closeOptionsModal = () => setIsOptionsOpen(false); // Close options modal

    const renderComponent = () => {
        switch (activeComponent) {
            case 'Calendar':
                return <Calendar />;
            case 'Notes':
                return <Notes />;
            case 'ToDo':
                return <ToDo />;
            default:
                return <ToDo />;
        }
    };

    const { darkMode } = useThemeContext(); // Get current theme mode

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light', // Use theme context value
            background: {
                default: darkMode ? '#000000' : '#ffffff', // Background color based on theme
            },
        },
    });

    return (
        <ThemeProvider theme={theme}> {/* Apply the theme based on context */}
            <CssBaseline /> {/* Reset global styles */}
            <Grid container>
                <Navbar setActiveComponent={setActiveComponent} openOptionsModal={openOptionsModal} />
                <Grid container>
                    {renderComponent()} {/* Render the selected component */}
                </Grid>
            </Grid>
            <Options open={isOptionsOpen} handleClose={closeOptionsModal} /> {/* Render options modal */}
        </ThemeProvider>
    );
}

export default Application;
