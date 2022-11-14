import '../Styles/Navbar.css'
import React from "react";
import stirfry from '../Styles/stirfry.gif';
const Navbar = () => {
    return <div className="navbar__container">
        <h1 id='app__name' >PANTRY</h1>
        <img id='stirfry__gif' alt='stirfry_gif' src={stirfry}/>
    </div>
};

export default Navbar;