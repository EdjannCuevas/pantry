import axios from "axios";
import React, { useEffect, useState } from "react";



const Pantry = ({ signal, setSignal }) => {
    const [list, setList] = useState([]);
    const [toggle, setToggle] = useState(true);
    const [text, setText] = useState("");
  
    function toggleInput() {
        setToggle(false);
    }
    
    useEffect(() => {

        async function deleteItem(id) {
            try {
                await axios.delete(`pantry/${id}`);
            } catch (error) {
                console.log(error);
            }
            setSignal('delete');
        };

        async function editItem (id, name) {
            try {
                await axios.put(`pantry/${id}`, {name: name});
            } catch (error) {
                console.log(error);
            }
            setText(name);
            setSignal('edit');
        }
        
        async function getList () {
            try {
                console.log(text)
                const fetchList = await axios.get('/pantry');

                const list = fetchList.data.map((pantry) => {
                    return <tr key = {pantry.id}>
                        <td>{toggle ? (
                             <li onDoubleClick={toggleInput}>{ pantry.name }</li>
                        ) : (
                            <form onSubmit={editItem(pantry.id, text)}>
                                <input
                                    type="text"
                                    value= { pantry.name }
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setText(e.target.value)
                                        }
                                    }
                                />
                                <button>Edit</button>
                            </form>
                            )}
                        </td>
                        <td>{pantry.date}</td>
                        <td><button 
                            onClick={() => {
                                deleteItem(pantry.id);
                                }
                        }>x</button>
                        </td>
                    </tr>
                })
                setList(list);
            } catch (error) {
                console.log(error);
            };
        };
        getList();
    },[signal, toggle]);
    
    return <form>
        <h1>Pantry</h1>
        <table>
            <thead>
                <tr>
                    <th>Pantry</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {list}
            </tbody>
        </table>
    </form>
};

export default Pantry;