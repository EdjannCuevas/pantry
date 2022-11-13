import React, { useState } from 'react';
import axios from 'axios';
import Pantry from './Pantry';

const Input = () => {

    const [name, setName] = useState('');
    const [signal, setSignal] = useState('');

    const onSubmitForm = async (e) => {
        try {
            e.preventDefault();
            await axios.post('/pantry', { name : name, timestamp : new Date() });

        } catch (error) {
            console.log(error)
        };
        setSignal(name);
    };

    return <>
        <h1>Input</h1>
        <form onSubmit={onSubmitForm}>
            <input 
                type='text'
                value={ name }
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