import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Navbar from './Navbar';
import Calendar from './calendar/Calendar';
import Notes from './notes/Notes';
import ToDo from './toDo/ToDo';
import Options from './Options';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#000000'
        },
    },
});

function Application() {
    const [activeComponent, setActiveComponent] = useState('Calendar');
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    const openOptionsModal = () => setIsOptionsOpen(true);
    const closeOptionsModal = () => setIsOptionsOpen(false);

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

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Grid container>
                <Navbar setActiveComponent={setActiveComponent} openOptionsModal={openOptionsModal} />
                <Grid container>
                    {renderComponent()}
                </Grid>
            </Grid>
            <Options open={isOptionsOpen} handleClose={closeOptionsModal} />
        </ThemeProvider>
    );
}

export default Application;
