import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import Ingredients from './Ingredients';
import '../Styles/Recipes.css'

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    
    useEffect(() => {
        getRecipes();
    },[]);

    async function getRecipes () {
        const app_id = '59482d1c';
        const app_key = '6708bc487e05e9385e5d27f95ed728f3';
        const fetchedIngredientsList = await axios.get('/ingredients');
        const ingredientsList = fetchedIngredientsList.data.map((ingredient) => {
            return ingredient.name 
        });

        const spacedIngredients = ingredientsList.join('%20and%20').toLowerCase();
        const fetchedRecipeList = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${spacedIngredients}&app_id=${app_id}&app_key=${app_key}`);
        const recipeList = fetchedRecipeList.data.hits.map((item) => {
            console.log(item.recipe)
            const recipe = item.recipe
            const name = recipe.label;
            const calories = recipe.calories;
            const image = recipe.image;
            const recipeIngredients = recipe.ingredientLines;
            const cookTime = recipe.totalTime;
            const servings = recipe.yield;
            const source = recipe.url;

            return  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                    <Card className='recipe__data__container'>
                        <div className='recipe__info'>
                            <img className='food__image'  alt={name} src={image}/>
                            <Card>
                                <h3>{ name }</h3>
                                <p>Servings: { servings }</p>
                                <p>Calories/serving: { Math.floor(calories) }</p>
                                <p>Cook time: { cookTime } minutes</p>
                                <p>Ingredients: { recipeIngredients }</p>
                            </Card>
                        </div>
                        <div className='recipe__button__container'></div>
                        <Button
                            variant='contained'
                            href={ source }
                            >View Recipe
                        </Button>
                    </Card>
                </TableCell>
            </TableRow>
        });
        setRecipes(recipeList);
        console.log(recipeList);
    };
    

    return <div className='recipes__page'>
        <Ingredients/>
        <div className='recipes__container'>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>RESULTS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { recipes }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </div>
};

export default Recipes;