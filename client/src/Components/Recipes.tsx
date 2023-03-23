import '../Styles/Recipes.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Table, TableBody, TableCell, TableContainer, TableRow, Paper, IconButton } from '@mui/material';
import { LocalGroceryStore, HourglassTop, Restaurant, Scale } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getUid } from './userTokenManager';
import { IngredientsObj, ResponseObj } from '../globals';

interface RecipesProps {
    search: string;
}

const Recipes: React.FC<RecipesProps> = ({ search }) => {
    const [recipes, setRecipes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        async function getRecipes () {
            const app_id = '59482d1c';
            const app_key = '6708bc487e05e9385e5d27f95ed728f3';
            const fetchedIngredientsList = await axios.get(`/ingredients/${getUid()}`);
            const ingredientsList = fetchedIngredientsList.data.map((ingredient: IngredientsObj) => {
                return ingredient.name 
            });
            setIngredients(ingredientsList.map((ingredient: string) => {
                return <Button
                        disabled
                        color='success'
                        variant='contained'
                        size='small'
                        >x { ingredient }</Button>
            }));
    
            const spacedIngredients = (search ? search : ingredientsList).join('%20and%20').toLowerCase();
            const fetchedRecipeList = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${spacedIngredients}&app_id=${app_id}&app_key=${app_key}`);
            const recipeList = fetchedRecipeList.data.hits.map((item: ResponseObj) => {
                const recipe = item.recipe;
    
                const name = recipe.label;
                const image = recipe.image;
                const recipeIngredients = recipe.ingredientLines;
                const cookTime = recipe.totalTime;
                const servings = recipe.yield;
                const calories = Math.floor(recipe.calories/servings);
                const source = recipe.url;
    
                return  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                    <Card>
                        <div className='recipe__container'>
                            <div className='food__image__container'>

                            <img className='food__image'  alt='dish' src={ image }/>
                            </div>
                            <div className='raw__data__container'>
                                <h2 className='recipe__name'>{ name }</h2>
                                <div className='ingredientsList__container'>
                                    <p>
                                        <b>Ingredients:</b>
                                        { recipeIngredients.join(', ') }
                                    </p>
                                </div>
                                <div className='icons__container'>
                                    <Card className='icon__data'>
                                        <HourglassTop sx={{ fontSize: 45 }}/>
                                        <b>Cooking Time: { cookTime } min/s</b>
                                    </Card>
                                    <Card className='icon__data'>
                                        <Restaurant sx={{ fontSize: 45 }}/>
                                        <b>Servings: { servings } </b>
                                    </Card>
                                    <Card className='icon__data'>
                                        <Scale sx={{ fontSize: 45 }}/>
                                        <b>Calories: { calories }</b>
                                    </Card>
                                </div>
 
                            </div>
                            <div className='recipe__buttons__container'>
                                <Button className='view__button'
                                    variant='contained'
                                    color='primary'
                                    onClick={() => openInNewTab( source )}
                                    >Recipe
                                </Button>
                                <IconButton
                                    color="primary"
                                    aria-label="add to shopping cart"
                                    onClick={() => {
                                        addToGroceryList(name, calories, image, recipeIngredients, source);
                                        navigate('/lists');
                                        }
                                    }>
                                    <LocalGroceryStore color='primary' sx={{ fontSize: 45 }}/>
                                </IconButton>
                            </div>
                        </div>
                    </Card>
                </TableCell>
            </TableRow>
            });
            setRecipes(recipeList);
        };
        getRecipes();
    },[]);

    const openInNewTab = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    async function addToGroceryList (name: string, calories: number, image: string, recipeIngredients: string[], source: string) {
        try {
            await axios.post('grocery_list', {
                    uid: getUid(),
                    name: name,
                    calories: calories,
                    ingredients_array: recipeIngredients,
                    recipe_source: source,
                    image_source: image
                });
        } catch (error) {
            console.log(error);
        }
    };

    

    return <div className='recipes__page'>
        <div className='ingredients__container__plus'>
            <Button
                variant='contained'
                component='label'
                onClick={(e) =>{
                    e.preventDefault();
                    navigate('/');
                }
            }>BACK</Button>
            {ingredients}
        </div>
        <div className='recipes__container' >
            <TableContainer elevation={5} sx={{height:'100%'}} component={Paper}>
                <Table>
                    <TableBody>
                        { recipes }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </div>
};

export default Recipes;