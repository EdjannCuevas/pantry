import '../Styles/UserInput.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pantry from './Pantry';
import Ingredients from './Ingredients';
import { Button, IconButton, FormHelperText , InputLabel, OutlinedInput, Card } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { getUid } from './userTokenManager';

const UserInput = () => {
    const [name, setName] = useState('');
    const [searchToggle, setSearchToggle] = useState(true);
    let [change, setChange] = useState(0);
    let count = 0;

    const onSubmitForm = async () => {
            try {
                const test = await axios.post('/pantry', { uid: getUid(), name : name, timestamp : new Date() });
                console.log(test);
            } catch (error) {
                console.log(error)
            };
    };

    return <div className='home__top'>
        <Card raised='true' className='user__input__container'>
            <div className='input__and__buttons__container'>
                <InputLabel htmlFor="my-input">Input food item</InputLabel>
                <OutlinedInput
                    // color='white'
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
                <div className='buttons__container'>
                    <Button
                        onClick={(e) => {
                            count++;
                            setChange(count);
                            onSubmitForm();
                        }}
                        variant='contained'
                        style={{marginRight: '3%'}}
                        component="label">
                        Add
                    </Button>
                    <Button 
                        variant='contained'
                        component="label">
                        Receipt
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
                </div>
            </div>
            <Ingredients
                setChange = { setChange }
                change = { change }
                setSearchToggle = { setSearchToggle }
                searchToggle = { searchToggle }
            />
        </Card>
        <Pantry setChange = { setChange } change = { change }/>
    </div>
    ;
};

export default UserInput;