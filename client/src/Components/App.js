import '../Styles/App.css';
import React from 'react';
import NavBar from './Navbar';
import UserInput from './UserInput';
import Recipes from './Recipes.js';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#3FC060',
      darker: '#f50057',
    },
    neutral: {
      main: '#f50057',
      contrastText: '#f50057',
    },
  },
});

function App() {
  
  return (
    <div className="App">
      <NavBar/>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path='/' element={ <UserInput/> } />
          <Route path='/recipes' element={ <Recipes/> } />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
