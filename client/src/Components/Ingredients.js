import '../Styles/Ingredients.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button'

const Ingredients = ({ change, setChange }) => {
    const [ingredientsList, setIngredientsList] = useState([]);
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

            return <tr>
                <td>
                    <button
                    onClick={() => {
                        addToPantry(id, name, time);
                        deleteIngredient(id);
                        }
                    }>-</button>
                </td>

                <td><p>{ name }</p></td>
            </tr>
        });
        setIngredientsList(list);
    };
    return <div className='ingredients__container'>
        <h1>Ingredients</h1>
        <table>
            <thead>
                <tr>
                    <th>-</th>
                    <th>INGREDIENTS</th>
                </tr>
            </thead>
            <tbody>
                {ingredientsList}
            </tbody>
            <Button href="/recipes" variant="contained">
            Try!
            </Button>
        </table>
    </div>
};

export default Ingredients;