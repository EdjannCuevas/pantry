import '../Styles/Navbar.css'
import React from "react";
import stirfry from '../Styles/stirfry.gif';
import { useNavigate } from 'react-router-dom';
import { Home, LocalGroceryStoreOutlined, Logout, LogoutOutlined, LogoutRounded, Search } from '@mui/icons-material';
import { AppBar, Box, Button, Card, Toolbar } from '@mui/material';
const Navbar = () => {
    const navigate = useNavigate();

    return <Box sx={{flexGrow: 1}}>
        <AppBar color='primary' className='navBar' elevatoin= '2'>
            <Toolbar>
                <Home
                    onClick={() => {
                        navigate('/home');
                    }}
                    sx={{ fontSize: 40 }}
                />
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
                <Logout 
                    color="inherit"
                    sx={{ fontSize: 40}}
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                />
            </Toolbar>
        </AppBar>
    </Box>
};

export default Navbar;