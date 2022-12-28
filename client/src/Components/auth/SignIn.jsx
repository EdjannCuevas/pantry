import { Button } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import '../../Styles/SignIn.css';

const SignIn = ({ setUid }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            setUid(userCredentials.user.uid);
            navigate('/home')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="sign__in__container">
            <form onSubmit={signIn}>
                <h1>Log in</h1>
                <input
                    type='text'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input 
                    type='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button type="submit">Log in</button>
            </form>
            <p>Don't have and account?</p>
            <Button onClick={(e) => {
                e.preventDefault();
                navigate('/signUp');
                }
            }>Sign Up</Button>
        </div>
    )
}

export default SignIn;