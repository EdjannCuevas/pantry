import '../Styles/Input.css'
import React, { useState } from 'react';
import axios from 'axios';
import Pantry from './Pantry';
import Ingredients from './Ingredients';

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