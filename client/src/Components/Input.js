import React, { useState } from 'react';
import axios from 'axios';
import Pantry from './Pantry';

const Input = () => {

    const [name, setName] = useState('');
    const [signal, setSignal] = useState('');

    const onSubmitForm = async () => {
        if (signal !== name) { 
            try {
                await axios.post('/pantry', { name : name, timestamp : new Date() });
            } catch (error) {
                console.log(error)
            };
            setSignal(name);
        } else {
            console.log('Change input')
        }
    };

    return <>
        <form onSubmit={onSubmitForm}>
        <h1>Input</h1>
            <input 
                type= 'text'
                value= { name }
                onChange={(e) => {
                    e.preventDefault();
                    setName(e.target.value);
                    }
                }
            />
            <button>Add</button>
        </form>
        <Pantry setSignal = { setSignal } signal = { signal }/>
    </>
    ;
};

export default Input;