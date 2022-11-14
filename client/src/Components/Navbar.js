import '../Styles/Navbar.css'
import React from "react";
import stirfry from '../Styles/stirfry.gif';
const Navbar = () => {
    return <div className="navbar__container">
        <h1>PANTRY</h1>
        <img alt='stirfry_logo' src={stirfry}/>
    </div>
};

export default Navbar;