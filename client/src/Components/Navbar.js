import '../Styles/Navbar.css'
import React from "react";
import stirfry from '../Styles/stirfry.gif';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();

    return <div className="navbar__container">
        <h1
            id='app__name'
            style={{cursor:'pointer'}}
            onClick={(e) => {
                e.preventDefault();
                navigate('/');
            }
        }>PANTRY</h1>
        <img id='stirfry__gif' alt='stirfry_gif' src={stirfry}/>
    </div>
};

export default Navbar;