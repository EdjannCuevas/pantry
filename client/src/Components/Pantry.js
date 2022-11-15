import '../Styles/Pantry.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Pantry = ({ change, setChange }) => {
    const [pantryList, setPantryList] = useState([]);
  
    useEffect(() => {
        getPantry();
    },[change]);

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
        setChange(change++);
    };

    async function addToIngredients (id, name, time) {
        try {
            await axios.post('/ingredients', { pantry_id: id, name : name, timestamp : time });
        } catch (error) {
            console.log(error)
        };
        setChange(change++);
    };

    async function editItem (id, name) {
        try {
            await axios.put(`pantry/${id}`, {name: name});
        } catch (error) {
            console.log(error);
        }
        setChange(change++);
    };
    
    async function getPantry () {
        const fetchPantryList = await axios.get('/pantry');
        const list = fetchPantryList.data.map((item) => {
            const id = item.id;
            const name = item.name;
            const time = item.timestamp;

            return <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                    <Button 
                            variant='outlined'
                            onClick={() => {
                            addToIngredients(id, name, time);
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