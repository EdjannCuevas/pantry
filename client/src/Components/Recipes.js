import { Card } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Ingredients from './Ingredients';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    
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
        setIngredients((ingredientsName) => {
            return <p>{ ingredientsName }</p>
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
            return  <Card className='recipe__data__container'>
                <img alt={name} src={image}/>
                <p>{ name }</p>
                <p>Servings: { servings }</p>
                <p>Calories/serving: { calories }</p>
                <p>Ingredients: { recipeIngredients }</p>
                <p>Cook time: { cookTime }minutes</p>
                <Link href={ source }>View Recipe</Link>
            </Card>
        });
        setRecipes(recipeList);
        console.log(recipeList);
    };
    

    return <div>
        <Ingredients/>
        <h1>Recipes</h1>
        <div className='recipes__container'>
        { recipes }
        </div>
    </div>
};

export default Recipes;