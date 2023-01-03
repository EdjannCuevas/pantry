import '../Styles/Navbar.css'
import React, { useState, useEffect } from "react";
import stirfry from '../Styles/stirfry.gif';
import { useNavigate } from 'react-router-dom';
import { Home, LocalGroceryStoreOutlined, Logout, Search } from '@mui/icons-material';
import { AppBar, Box, Toolbar, InputBase, Dialog, Button, DialogTitle, DialogActions } from '@mui/material';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { setUid } from './userTokenManager';

const Navbar = ({authUser, search, setSearch}) => {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };
  
    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleLogOut = () => {
        userSignOut();
        setOpenDialog(false);
        navigate('/');
    };

    const userSignOut = async () => {
        await signOut(auth).then(() => {
            setUid('');
            console.log('sign out was successful')
        }).catch(err => console.log(err));
    };

    const handleInputChange = () => {
        search.length > 0 ? navigate('/recipes') : console.log('no input');
    };

    return <Box sx={{flexGrow: 1}}>
        <AppBar color='primary' className='navBar' elevation= '2'>
            <Toolbar sx={{width: '100%'}}>
                {
                    (authUser) ? (
                        <Toolbar sx={{width: '100%'}}>
                        <div className='button__container'>
                            <Home
                                style={{cursor:'pointer'}}
                                onClick={() => {
                                    navigate('/home');
                                }}
                                sx={{ fontSize: 30, marginRight: 2}}
                            />
                            <LocalGroceryStoreOutlined
                                style={{cursor:'pointer'}}
                                onClick={() => {
                                    navigate('/lists');
                                }}
                                sx={{ fontSize: 30 }}
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

                        </div>
                        <div className='search__logout'>

                            <Search
                                style={{cursor:'pointer'}}
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
                                style={{cursor:'pointer'}}
                                color="inherit"
                                sx={{ fontSize: 30}}
                                onClick={(e) => {
                                    e.preventDefault();
                                    authUser ? handleClickOpen() : navigate('/');
                                }}
                            />
                            <Dialog
                                open={openDialog}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {`Are you sure you want to log out, ${authUser ? authUser.email : '🔥'}?`}
                                </DialogTitle>
                                <DialogActions>
                                    <Button variant='standard' onClick={handleClose}>cancel</Button>
                                    <Button variant='contained' onClick={handleLogOut} autoFocus>
                                        Logout
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        
                        </div>
                        </Toolbar>
                    ) : (
                        <Toolbar sx={{width: '100%', justifyContent: 'center'}}>
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
                        </Toolbar>
                    )
                }
            </Toolbar>
        </AppBar>
    </Box>
};

export default Navbar;