import './App.css';
import { Grid } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/index/Home';
import Application from './components/Application';
import './i18n';

function App() {
  return (
    <Grid className="App">
      <Router basename="/MyPrivacy">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<Application />} />
        </Routes>
      </Router>
    </Grid>
  );
}

export default App;
