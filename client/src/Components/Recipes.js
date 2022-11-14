import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    
    useEffect(() => {
        getRecipes();
    },[]);

    async function getRecipes () {
        const app_id = '59482d1c';
        const app_key = '6708bc487e05e9385e5d27f95ed728f3';
        const fetchedIngredients = await axios.get('/ingredients')
        const ingredients = fetchedIngredients.data.map((ingredient) => {
            return <li>{ ingredient.name }</li>
        });

        setIngredients(ingredients);
        const spacedIngredients = ingredients.join('%20and%20').toLowerCase();
        const fetchedRecipeList = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${spacedIngredients}&app_id=${app_id}&app_key=${app_key}`);
        const recipeList = fetchedRecipeList.data.hits.map((item) => {
            return  <p>{ item.recipe.label }</p>
        });
        setRecipes(recipeList);
        console.log(recipeList);
    };
    

    return <div>
        <h1>Recipes</h1>
        { ingredients }
        { recipes }
    </div>
};

export default Recipes;