import '../Styles/App.css';
import React, { useState } from 'react';
import NavBar from './Navbar';
import UserInput from './UserInput';
import Recipes from './Recipes.js';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GroceryList from './GroceryList';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import ProtectedRoutes from './ProtectedRoutes';

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
  const [search, setSearch] = useState('');
  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NavBar search={search} setSearch={setSearch}/>
        <Routes>
          <Route path='/' element={ <SignIn/>}/>
          <Route path='/signup' element={ <SignUp/>}/>
          <Route path='/home' element={ <ProtectedRoutes> <UserInput/> </ProtectedRoutes> }/>
          <Route path='/recipes' element={ <ProtectedRoutes> <Recipes search={search}/> </ProtectedRoutes> }/>
          <Route path='/lists' element={ <ProtectedRoutes> <GroceryList/> </ProtectedRoutes> }/>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
