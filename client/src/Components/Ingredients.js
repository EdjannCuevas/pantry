import '../Styles/Ingredients.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Ingredients = ({ change, setChange }) => {
    const [ingredientsList, setIngredientsList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getIngredients();
    },[change]);

    async function deleteIngredient (id) {
        try {
            await axios.delete(`ingredients/${id}`);
        } catch (error) {
            console.log(error);
        }
        setChange(change++);
    };

    async function addToPantry (id, name, time) {
        try {
            await axios.post('/pantry', { id : id, name : name, timestamp : time });
        } catch (error) {
            console.log(error)
        };
        setChange(change++);
    };

    async function getIngredients () {
        const fetchedIngredients = await axios.get('/ingredients');

        const list = fetchedIngredients.data.map((ingredient) => {
            const id = ingredient.pantry_id;
            const name = ingredient.name;
            const time = ingredient.timestamp;

            return <button
                    onClick={() => {
                        addToPantry(id, name, time);
                        deleteIngredient(id);
                        }
                }>x { name }</button>
        });
        setIngredientsList(list);
    };
    return <div className='ingredients__container'>
        <div className='ingredients__list__container'>
            <h3>INGREDIENTS</h3>
            <div>
            { ingredientsList }
            </div>
        </div>
        <div className='try__button__container' >
            <Button
                variant="contained"
                component="label"
                onClick={(e)=> {
                    e.preventDefault();
                    navigate('/recipes');
                    }
            }>Try</Button>
        </div>
    </div>
};

export default Ingredients;