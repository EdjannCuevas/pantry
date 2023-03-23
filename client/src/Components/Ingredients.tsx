import '../Styles/Ingredients.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '@mui/material';
import { getUid } from './userTokenManager';
import { IngredientsObj } from '../globals';

interface IngredientsProps {
    change: boolean;
    setChange: (arg0: boolean) => void;
};

const Ingredients: React.FC<IngredientsProps> = ({ change, setChange }) => {
    const [ingredientsList, setIngredientsList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getIngredients () {
            const fetchedIngredients = await axios.get(`/ingredients/${getUid()}`);
    
            const list = fetchedIngredients.data.map((ingredient: IngredientsObj) => {
                const uid = ingredient.uid;
                const id = ingredient.pantry_id;
                const name = ingredient.name;
                const time = ingredient.timestamp;
    
                return <div style={{marginLeft: '5px'}}>
                    <Button
                        color='success'
                        variant='contained'
                        size='small'
                        onClick={() => {
                            addToPantry(uid, id, name, time);
                            deleteIngredient(id);
                            }
                    }>x { name }</Button>
                </div>
            });
            setIngredientsList(list);
        };
        async function deleteIngredient (id: string) {
            try {
                await axios.delete(`ingredients/${id}`);
            } catch (error) {
                console.log(error);
            }
            setChange(!change);
        };
        async function addToPantry (uid: string, id: string, name: string, time: string) {
            try {
                await axios.post('/pantry', { uid: uid, id : id, name : name, timestamp : time });
            } catch (error) {
                console.log(error)
            };
            setChange(!change);
        };
        getIngredients();
    },[change]);



    return <Card
    elevation={5}
    className='ingredients__container'
    style={{width: '70%', height: '100%'}}
    >
        <h3>INGREDIENTS</h3>
        <div className='ingredients__list__container'>
            { ingredientsList }
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
                }
            }>SEARCH</Button>
        </div>
        )}
    </Card>
};

export default Ingredients;