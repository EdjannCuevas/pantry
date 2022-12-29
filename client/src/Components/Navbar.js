import '../Styles/Navbar.css'
import React from "react";
import stirfry from '../Styles/stirfry.gif';
import { useNavigate } from 'react-router-dom';
import { Home, LocalGroceryStoreOutlined, Search } from '@mui/icons-material';
import { Card } from '@mui/material';
const Navbar = () => {
    const navigate = useNavigate();

    return <Card elevatoin= '2' className="navbar__container">
        <div>
            <Home
                onClick={() => {
                    navigate('/home');
                }}
                sx={{ fontSize: 40 }}
            />
        </div>
        <div className='logo__container'>
            <h1
                id='app__name'
                style={{cursor:'pointer'}}
                onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                }
                }>PANTRY
            </h1>
            <img id='stirfry__gif' alt='stirfry_gif' src={stirfry}/>
        </div>
        <div className='button__container'>
            <LocalGroceryStoreOutlined
                onClick={() => {
                    navigate('/lists');
                }}
                sx={{ fontSize: 40 }}
            />
            <Search
                onClick={() => {
                    navigate('/recipes');
                }}
                sx={{ fontSize: 40 }}
            />
        </div>
    </Card>
};

export default Navbar;