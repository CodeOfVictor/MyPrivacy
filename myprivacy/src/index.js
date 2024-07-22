import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Application from './components/Application';
import { ThemeProvider as ThemeContextProvider } from './ThemeContext';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeContextProvider> {/* Wrap the application with ThemeContextProvider */}
      <Application /> {/* Render your main application component */}
    </ThemeContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
