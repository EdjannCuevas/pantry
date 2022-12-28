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
import AuthDetails from './auth/AuthDetails';

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
  const [uid, setUid] = useState('');
  
  return (
    <div className="App">
      <NavBar/>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path='/' element={ <SignIn setUid={setUid}/>}/>
          <Route path='/signup' element={ <SignUp/>}/>
          <Route path='/home' element={ <UserInput uid={uid}/> }/>
          <Route path='/recipes' element={ <Recipes uid={uid}/> }/>
          <Route path='/lists' element={ <GroceryList uid={uid}/> }/>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
