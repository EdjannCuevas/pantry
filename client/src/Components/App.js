import '../Styles/App.css';
import React from 'react';
import NavBar from './Navbar';
import UserInput from './UserInput';
import Recipes from './Recipes.js';
import { Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={ <UserInput/> } />
        <Route path='/recipes' element={ <Recipes/> } />
      </Routes>
    </div>
  );
}

export default App;
