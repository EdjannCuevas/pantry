import '../Styles/UserInput.css'
import React, { useState } from 'react';
import axios from 'axios';
import Pantry from './Pantry';
import Ingredients from './Ingredients';
import { Button, IconButton, FormHelperText ,InputLabel, OutlinedInput } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';


const UserInput = () => {

    const [name, setName] = useState('');
    let [change, setChange] = useState(0);

    const onSubmitForm = async () => {
            try {
                await axios.post('/pantry', { name : name, timestamp : new Date() });
            } catch (error) {
                console.log(error)
            };
            setChange(change++);
    };

    return <div className='home__top'>
        <div className='input__container'>
            <form onSubmit={onSubmitForm}>
                <InputLabel htmlFor="my-input">Input food item</InputLabel>
                <OutlinedInput
                    variant="outlined"
                    onChange={(e) => {
                        e.preventDefault();
                        setName(e.target.value);
                        }
                    } 
                    id="my-input"
                    aria-describedby="my-helper-text"
                    />
                <FormHelperText id="my-helper-text">Add items to your Pantry</FormHelperText>
                <Button 
                    variant="contained"
                    component="label">
                    Upload Recipt
                    <input hidden accept="image/*" multiple type="file" />
                </Button>
                <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label">
                    <input
                        hidden accept="image/*"
                        type="file" />
                    <PhotoCamera />
                </IconButton>
            </form>
            <Ingredients
                setChange = { setChange }
                change = { change }
            />
        </div>
            <Pantry setChange = { setChange } change = { change }/>
    </div>
    ;
};

export default UserInput;