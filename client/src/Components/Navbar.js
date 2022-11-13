import '../Styles/Navbar.css'
import React from "react";
import stirfry from '../Styles/stirfry.gif';
const Navbar = () => {
    return <div className="navbar__container">
        <img src={stirfry}/>
        <h1>PANTRY</h1>
    </div>
};

export default Navbar;