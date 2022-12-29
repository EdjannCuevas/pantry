import '../Styles/Navbar.css'
import React, { useState, useEffect } from "react";
import stirfry from '../Styles/stirfry.gif';
import { useNavigate } from 'react-router-dom';
import { Home, LocalGroceryStoreOutlined, Logout, Search } from '@mui/icons-material';
import { AppBar, Box, Toolbar, InputBase } from '@mui/material';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = ({search, setSearch}) => {
    const navigate = useNavigate();
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            }
            else {
                setAuthUser(null);
            }

        });
        return () => {
            listen();
        }
    }, [])

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('sign out was successful')
        }).catch(err => console.log(err));
    }

      const handleInputChange = () => {
        search.length > 0 ? navigate('/recipes') : console.log('no input');
      }

    return <Box sx={{flexGrow: 1}}>
        <AppBar color='primary' className='navBar' elevatoin= '2'>
            <Toolbar sx={{justifyContent: 'spaceBetweed'}}>
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
                <h1
                    id='app__name'
                    style={{cursor:'pointer'}}
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/home');
                    }
                    }>PANTRY
                </h1>
                <img id='stirfry__gif' alt='stirfry_gif' src={stirfry}/>
                <Search
                    onClick={handleInputChange}
                />
                <InputBase
                    variant='filled'
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                >
                </InputBase>
                <Logout 
                    color="inherit"
                    sx={{ fontSize: 40}}
                    onClick={(e) => {
                        e.preventDefault();
                        userSignOut();
                        navigate('/');
                    }}
                />
            </Toolbar>
        </AppBar>
    </Box>
};

export default Navbar;