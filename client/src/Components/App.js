import '../Styles/App.css';
import React from 'react';
import NavBar from './Navbar';
import Input from './Input';
import Recipes from './Recipes.js';

function App() {
  
  return (
    <div className="App">
      <NavBar/>
      <Input/>
      <Recipes/>
    </div>
  );
}

export default App;
