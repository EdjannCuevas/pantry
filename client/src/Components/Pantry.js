import '../Styles/Pantry.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Button, Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Paper } from '@mui/material';
import { AddCircle, Delete } from '@mui/icons-material';


const Pantry = ({ change, setChange, uid }) => {
    const [pantryList, setPantryList] = useState([]);
    let count = 0;

    useEffect(() => {
        getPantry();
    },[change]);

    const getPantry = async () => {
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
                        startIcon={<AddCircle/>}
                        onClick={() => {
                            addToIngredients(uid, id, name, time);
                            deleteItem(id);
                            }
                        }
                    ></Button>
                </TableCell>
                <TableCell><p>{ name }</p></TableCell>
                <TableCell>{timeDuration(time)}</TableCell>
                <TableCell>-</TableCell>
                <TableCell align='right'>
                    <Button 
                        variant='outlined'
                        startIcon={<Delete/>}
                        onClick={() => {
                            deleteItem(id);
                            }
                        }
                    ></Button>
                </TableCell>
            </TableRow>
        });
        setPantryList(list);
    };
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

    // async function editItem (id, name) {
    //     try {
    //         await axios.put(`pantry/${id}`, {name: name});
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     count++;
    //     setChange(count);
    // };
    
    return <div className='pantry__container'>
        <TableContainer elevation='5' sx={{height:'100%'}} className='table__container' component={Paper}>
            <Table stickyHeader={true} aria-label='simple table'>
                <TableHead sx={{ height: '5%',marginBottom: '5%'}}>
                    <TableRow>
                        <TableCell>Add to Ingredients</TableCell>
                        <TableCell>PANTRY</TableCell>
                        <TableCell>BOUGHT</TableCell>
                        <TableCell>EXP. DATE</TableCell>
                        <TableCell align='right'>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ height: '95%'}}>
                    { pantryList }
                </TableBody>
            </Table>
        </TableContainer>
    </div>
};

export default Pantry;