import '../Styles/GroceryList.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Paper, Card, List, ListItem, ListItemIcon, ListItemText, Table, TableContainer, TableRow, ListItemButton } from '@mui/material';
import { CheckBox } from '@mui/icons-material';
import { getUid } from './userTokenManager';
import { ListObj } from '../globals';

const GroceryList = () => {
    const [groceryList, setGroceryList] = useState([]);
    const [checked, setChecked] = useState([0]);
    let [toggle, setToggle] = useState(true)
    
    useEffect(() => {        
        async function getGroceryList () {
            const fetchedList = await axios.get(`/grocery_list/${getUid()}`);
            const list = fetchedList.data.map((list: ListObj) => {
                const id = list.id;
                const name = list.name;
                const ingredientsArray = list.ingredients_array;
                const recipeSource = list.recipe_source;
                const imageSource = list.image_source;
                const ingredientsCheckList = ingredientsArray.map((ingredient: string) => {
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
        };
        const handleChange = (value: number) => {
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
        async function removeGroceryList (id: string) {
            try {
                await axios.delete(`/grocery_list/${id}`)
            } catch (error) {
                console.log(error);
            };
            setToggle(!toggle);
        };
        getGroceryList();
    },[toggle]);

    const openInNewTab = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return <div className='page__container'>
        <TableContainer
            elevation={5}
            sx={{width: '98%', height: '97%'}}
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