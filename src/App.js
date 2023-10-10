import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <CssBaseline />
     
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      
    </Router>
  );
}

export default App;
