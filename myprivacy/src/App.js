import './App.css';
import { Grid } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/index/Home';

function App() {
  return (
    <Grid className="App">
      <Router basename="/MyPrivacy">
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </Grid>
  );
}

export default App;
