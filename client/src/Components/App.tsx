import '../Styles/App.css';
import React, { useEffect, useState } from 'react';
import NavBar from './Navbar';
import UserInput from './UserInput';
import Recipes from './Recipes';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GroceryList from './GroceryList';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import ProtectedRoutes from './ProtectedRoutes';
import { auth } from '../firebase';
import { setUid } from './userTokenManager';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from '../globals';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3FC060',
    },
  },
});

function App() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user: User | null) => {
        if (user) {
            setUid(user.uid);
            setAuthUser(user);
        }
        else {
            setAuthUser(null);
        }

    });
    return () => {
        listen();
    }
  }, []);
  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NavBar authUser={authUser} search={search} setSearch={setSearch}/>
        <Routes>
          <Route path='/login' element={ <SignIn/>}/>
          <Route path='/signup' element={ <SignUp/>}/>
          <Route path='/' element={ <ProtectedRoutes authUser={authUser}> <UserInput/> </ProtectedRoutes> }/>
          <Route path='/recipes' element={ <ProtectedRoutes authUser={authUser}> <Recipes search={search}/> </ProtectedRoutes> }/>
          <Route path='/lists' element={ <ProtectedRoutes authUser={authUser}> <GroceryList/> </ProtectedRoutes> }/>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
