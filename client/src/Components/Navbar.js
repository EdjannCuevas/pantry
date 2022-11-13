import React from "react";
import stirfry from '../Styles/stirfry.gif';
import '../Styles/Navbar.css'
const Navbar = () => {
    return <div className="navbar__container">
        <img src={stirfry}/>
        <h1>Navbar</h1>
    </div>
};

export default Navbar;