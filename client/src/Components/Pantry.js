import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import '../Styles/Pantry.css'



const Pantry = ({ signal, setSignal }) => {
    const [list, setList] = useState([]);
  
    useEffect(() => {
        getList();
    },[signal]);

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
        setSignal(`${id}`);
    };

    async function editItem (id, name) {
        try {
            await axios.put(`pantry/${id}`, {name: name});
        } catch (error) {
            console.log(error);
        }
        setSignal(`${id}`);
    };
    
    async function getList () {
        const fetchList = await axios.get('/pantry');
        const list = fetchList.data.map((pantry) => {
            const id = pantry.id;
            const name = pantry.name;
            const time = pantry.timestamp;

            return <tr>
                <td>
                    <li>{ name }</li>
                </td>
                <td>{timeDuration(time)}</td>
                <td><button 
                    onClick={() => {
                        deleteItem(id);
                        }
                }>-</button>
                </td>
            </tr>
        })
        setList(list);
    };
    return <div className='pantry__container'>
        <h1>Pantry</h1>
        <table>
            <thead>
                <tr>
                    <th>PANTRY</th>
                    <th>BOUGHT</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {list}
            </tbody>
        </table>
    </div>
};

export default Pantry;