import '../Styles/Input.css'
import React, { useState } from 'react';
import axios from 'axios';
import Pantry from './Pantry';
import Ingredients from './Ingredients';
import { Button, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';


const Input = () => {

    const [name, setName] = useState('');
    const [change, setChange] = useState(0);

    const onSubmitForm = async () => {
            try {
                await axios.post('/pantry', { name : name, timestamp : new Date() });
            } catch (error) {
                console.log(error)
            };
            setChange(change++);
    };

    return <div className='input__container'>
        <form onSubmit={onSubmitForm}>
        <h2>Add Items</h2>
            <input 
                type= 'text'
                value= { name }
                onChange={(e) => {
                    e.preventDefault();
                    setName(e.target.value);
                    }
                }
            />
            <Button variant='contained' >Add</Button>
            <Button variant="contained" component="label">
                Upload
                <input hidden accept="image/*" multiple type="file" />
            </Button>
            <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" />
                <PhotoCamera />
            </IconButton>
        </form>
        <div className='items__container'>
            <Pantry setChange = { setChange } change = { change }/>
            <Ingredients
                setChange = { setChange }
                change = { change }
            />
        </div>
    </div>
    ;
};

export default Input;