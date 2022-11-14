import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    
    useEffect(() => {
        getRecipes();
    },[]);

    async function getRecipes () {
        console.log(1);
        const app_id = '59482d1c';
        const app_key = '6708bc487e05e9385e5d27f95ed728f3';
        const fetchedIngredientsList = await axios.get('/ingredients');
        console.log(2);
        const ingredientsList = fetchedIngredientsList.data.map((ingredient) => {
            return ingredient.name 
        });
        setIngredients((ingredientsName) => {
            return <p>{ ingredientsName }</p>
        });

        const spacedIngredients = ingredientsList.join('%20and%20').toLowerCase();
        console.log(3);
        const fetchedRecipeList = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${spacedIngredients}&app_id=${app_id}&app_key=${app_key}`);
        const recipeList = fetchedRecipeList.data.hits.map((item) => {
            return  <p>{ item.recipe.label }</p>
        });
        setRecipes(recipeList);
        console.log(recipeList);
    };
    

    return <div>
        <h1>Recipes</h1>
        { recipes }
    </div>
};

export default Recipes;