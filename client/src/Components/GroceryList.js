import '../Styles/GroceryList.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Paper, Card, List, ListItem, ListItemIcon, ListItemText, Table, TableContainer, TableBody, TableRow, ListItemButton } from '@mui/material';
import { CheckBox } from '@mui/icons-material';
import { getUid } from './userTokenManager';

const GroceryList = () => {
    const [groceryList, setGroceryList] = useState([]);
    const [checked, setChecked] = useState([0]);
    let [toggle, setToggle] = useState(0)
    
    useEffect(() => {
        getGroceryList();
    },[toggle]);

    const handleChange = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        console.log(newChecked)
    };

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    async function removeGroceryList (id) {
        try {
            await axios.delete(`/grocery_list/${id}`)
        } catch (error) {
            console.log(error);
        };
        setToggle(toggle++);
    };
    
    async function getGroceryList () {
        const fetchedList = await axios.get(`/grocery_list/${getUid()}`);
        const list = fetchedList.map((list) => {
            const id = list.id;
            const name = list.name;
            const ingredientsArray = list.ingredients_array;
            const recipeSource = list.recipe_source;
            const imageSource = list.image_source;
            const ingredientsCheckList = ingredientsArray.map((ingredient) => {
                const value = ingredientsArray.indexOf(ingredient)
                return <ListItem
                        sx={{maxHeight: '90%'}}
                        disablePadding
                        >
                            <ListItemButton onClick={(e) => {
                                e.preventDefault();
                                handleChange(value);
                            }}>
                                <ListItemIcon>
                                    <CheckBox
                                        disableRipple
                                        edge="start"
                                        tabIndex={-1}
                                        checked={checked.indexOf(value) !== -1}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        color="primary"
                                    />
                                </ListItemIcon>
                                <ListItemText primary={ ingredient } />

                            </ListItemButton>
                    </ListItem>
            });
            
            
            return <div className='list__card__container'>
                <Card
                    elevation={5}
                    className='list__card'
                    sx={{height: '100%'}}
                >
                    <div className='recipe__image__container'>
                        <img className='recipe__image' src = { imageSource } alt='recipe'/>
                        <p className='recipe__name'>{ name }</p>
                    </div>
                    <List 
                        sx={{
                            maxHeight: '60%',
                            width: '90%',
                            bgcolor: 'background.paper',
                            overflow: 'auto',
                        }}
                        >
                        { ingredientsCheckList }
                    </List>
                    <div className='buttons__container'>
                        <Button
                            variant='contained'
                            onClick={() => openInNewTab(recipeSource)}
                            >Recipe
                        </Button>
                        <Button 
                            variant='contained'
                            onClick={() => removeGroceryList(id)}
                            >Delete
                        </Button>
                    </div>
                </Card>
            </div>
            
        });
        setGroceryList(list);
    }


    return <div className='page__container'>
        <TableContainer
            elevation='5'
            sx={{width: '90%', height: '97%'}}
            component={Paper}
        >
            <Table>
                <TableRow>
                    <div className="grocery__lists__container">
                            { groceryList }
                    </div>
                </TableRow>
            </Table>
        </TableContainer>
    </div>
};

export default GroceryList;