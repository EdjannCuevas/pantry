import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import '../Styles/Pantry.css'



const Pantry = ({ change, setChange }) => {
    const [pantryList, setPantryList] = useState([]);
  
    useEffect(() => {
        getPantry();
    },[change]);

    function timeDuration (time) {
        const duration = moment(time).fromNow();
        return duration;
    };
    
    async function deleteItem (id) {
        try {
            await axios.delete(`pantry/${id}`);
        } catch (error) {
            console.log(error);
        }
        setChange(change++);
    };

    async function addToIngredients (id, name, time) {
        try {
            await axios.post('/ingredients', { pantry_id: id, name : name, timestamp : time });
        } catch (error) {
            console.log(error)
        };
        setChange(change++);
    };

    async function editItem (id, name) {
        try {
            await axios.put(`pantry/${id}`, {name: name});
        } catch (error) {
            console.log(error);
        }
        setChange(change++);
    };
    
    async function getPantry () {
        const fetchPantryList = await axios.get('/pantry');
        const list = fetchPantryList.data.map((item) => {
            const id = item.id;
            const name = item.name;
            const time = item.timestamp;

            return <tr>
                <td>
                    <button 
                    onClick={() => {
                        addToIngredients(id, name, time);
                        deleteItem(id);
                        }
                    }>+</button>
                </td>
                <td><p>{ name }</p></td>
                <td>{timeDuration(time)}</td>
                <td>
                    <button 
                    onClick={() => {
                        deleteItem(id);
                        }
                }>-</button>
                </td>
            </tr>
        });
        setPantryList(list);
    };
    return <div className='pantry__container'>
        <h1>Pantry</h1>
        <table>
            <thead>
                <tr>
                    <th>+</th>
                    <th>PANTRY</th>
                    <th>BOUGHT</th>
                    <th>-</th>
                </tr>
            </thead>
            <tbody>
                {pantryList}
            </tbody>
        </table>
    </div>
};

export default Pantry;