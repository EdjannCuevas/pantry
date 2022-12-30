import '../Styles/Ingredients.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Ingredients = ({ change, setChange, searchToggle, setSearchToggle, uid }) => {
    const [ingredientsList, setIngredientsList] = useState([]);
    const navigate = useNavigate();
    let count = 0;

    useEffect(() => {
        getIngredients();
    },[change]);

    async function deleteIngredient (id) {
        try {
            await axios.delete(`ingredients/${id}`);
        } catch (error) {
            console.log(error);
        }
        count++;
        setChange(count);
    };

    async function addToPantry (uid, id, name, time) {
        try {
            await axios.post('/pantry', { uid: uid, id : id, name : name, timestamp : time });
        } catch (error) {
            console.log(error)
        };
        count++;
        setChange(count);
    };

    async function getIngredients () {
        const fetchedIngredients = await axios.get(`/ingredients/${uid}`);

        const list = fetchedIngredients.data.map((ingredient) => {
            const uid = ingredient.uid;
            const id = ingredient.pantry_id;
            const name = ingredient.name;
            const time = ingredient.timestamp;

            return <Button
                    color='success'
                    variant='contained'
                    size='small'
                    onClick={() => {
                        addToPantry(uid, id, name, time);
                        deleteIngredient(id);
                        }
                }>x { name }</Button>
        });
        setIngredientsList(list);
    };
    return <div className='ingredients__container'>
        <h3>INGREDIENTS</h3>
        <div className='ingredients__list__container'>
            <div>
            { ingredientsList }
            </div>
        </div>
        {(ingredientsList.length > 0) ? (
            <div className='search__button__container' >
            <Button
                style={{marginTop: '2%'}}
                variant='contained'
                component='label'
                onClick={(e) => {
                    e.preventDefault();
                    navigate('/recipes');
                    setSearchToggle(false);
                }
            }>SEARCH</Button>
        </div>
        ) : (
            <div className='search__button__container' >
            <Button
                style={{marginTop: '2%'}}
                disabled
                variant='contained'
                component='label'
                onClick={(e) => {
                    e.preventDefault();
                    navigate('/recipes');
                    setSearchToggle(false);
                }
            }>SEARCH</Button>
        </div>
        )}
    </div>
};

export default Ingredients;