import '../Styles/Pantry.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Button, Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Paper } from '@mui/material';
import { Delete } from '@mui/icons-material';


const Pantry = ({ change, setChange, uid }) => {
    const [pantryList, setPantryList] = useState([]);
    let count = 0;

    useEffect(() => {
        getPantry();
    },[change]);

    
    async function fetchImage(url) {
        const img = new Image();
        return new Promise((res, rej) => {
            img.onload = () => res(img);
            img.onerror = e => rej(e);
            img.src = url;
        });
    }

    function timeDuration (time) {
        const duration = moment(time).fromNow();
        return duration;
    };
    
    async function deleteItem (id) {
        try {
            await axios.delete(`pantry/${id}`);
        } catch (error) {
            console.log(error);
        }
        count++;
        setChange(count);
    };

    async function addToIngredients (uid, id, name, time) {
        try {
            await axios.post('/ingredients', { uid: uid, pantry_id: id, name : name, timestamp : time });
        } catch (error) {
            console.log(error)
        };
        change++
        setChange(count);
    };

    async function editItem (id, name) {
        try {
            await axios.put(`pantry/${id}`, {name: name});
        } catch (error) {
            console.log(error);
        }
        count++;
        setChange(count);
    };
    
    async function getPantry () {
        const fetchPantryList = await axios.get(`/pantry/${uid}`);
        const list = fetchPantryList.data.map((item) => {
            const uid = item.uid;
            const id = item.id;
            const name = item.name;
            const time = item.timestamp;

            return <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                    <Button 
                            variant='outlined'
                            onClick={() => {
                            addToIngredients(uid, id, name, time);
                            deleteItem(id);
                            }
                        }>+</Button>
                </TableCell>
                <TableCell><p>{ name }</p></TableCell>
                <TableCell>{timeDuration(time)}</TableCell>
                <TableCell>-</TableCell>
                <TableCell align='right'>
                    <Button 
                        variant='text'
                        startIcon={<Delete/>}
                        onClick={() => {
                            deleteItem(id);
                            }
                        }>
                    </Button>
                </TableCell>
            </TableRow>
        });
        setPantryList(list);
    };
    return <div className='pantry__container'>
        <h1>Pantry</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>+</TableCell>
                        <TableCell>PANTRY</TableCell>
                        <TableCell>BOUGHT</TableCell>
                        <TableCell>EXP. DATE</TableCell>
                        <TableCell align='right'>-</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { pantryList }
                </TableBody>
            </Table>
        </TableContainer>
    </div>
};

export default Pantry;