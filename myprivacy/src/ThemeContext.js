import React, { createContext, useState, useContext } from 'react';

// Create the theme context
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useThemeContext = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true); // Default to dark mode

    const toggleTheme = (event) => {
        setDarkMode(event.target.checked); // Toggle theme based on switch
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
