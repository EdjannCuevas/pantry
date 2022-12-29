import '../Styles/GroceryList.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Paper, Card, List, ListItem, ListItemIcon, ListItemText, Table, TableContainer } from '@mui/material';
import { CheckBox } from '@mui/icons-material';

const GroceryList = ({ uid }) => {
    const [groceryList, setGroceryList] = useState([]);
    const [checked, setChecked] = useState(true);
    let [toggle, setToggle] = useState(0)
    
    useEffect(() => {
        getGroceryList();
    },[toggle]);

    const handleChange = (event) => {
        setChecked(event.target.checked);
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
        const fetchedList = await axios.get(`/grocery_list/${uid}`);
        const list = fetchedList.data.map((list) => {
            const id = list.id;
            const name = list.name;
            const ingredientsArray = list.ingredients_array;
            const recipeSource = list.recipe_source;
            const imageSource = list.image_source;
            const ingredientsCheckList = ingredientsArray.map((ingredient) => {
                return <ListItem>
                            <ListItemIcon>
                                <CheckBox
                                    checked={checked}
                                    onChange={(e) => handleChange(e)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    color="primary"
                                />
                            </ListItemIcon>
                            <ListItemText primary={ ingredient } />
                    </ListItem>
            });
            
            
            return <div>
                <Card className='card__container'>
                    <img className='food__image' src = { imageSource } alt='recipe photo'/>
                    <p className='recipe__name'>{ name }</p>
                    <List 
                        className='list__container'
                        sx={{ width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                        overflow: 'auto',
                        maxHeight: 500
                        }}
                        >
                        { ingredientsCheckList }
                    </List>
                    <div className='buttons__container'>
                        <Button
                            onClick={() => openInNewTab(recipeSource)}
                            >Recipe
                        </Button>
                        <Button 
                            onClick={() => removeGroceryList(id)}
                            >Delete
                        </Button>
                    </div>
                </Card>

            </div>
            
        });
        setGroceryList(list);
        console.log(fetchedList);
        console.log(list);
    }


    return <div className='page__container'>
        <TableContainer
            elevation='5'
            sx={{width: '90%', height: '100%'}}
            component={Paper}
        >
            <Table>
                <div className="GroceryList__container">
                        { groceryList }
                </div>
            </Table>
        </TableContainer>
    </div>
};

export default GroceryList;