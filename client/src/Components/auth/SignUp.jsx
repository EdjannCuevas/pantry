import { Alert, Button, Card, CardHeader, FormControl, TextField } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import '../../Styles/SignIn.css';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const navigate = useNavigate();

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            setIsValid(true);
            setIsRegistered(true);
            console.log(userCredentials)
        })
        .catch((err) => {
            setIsValid(false);
            console.log(err)
        })
    }

    return (
        <div className="sign__in__container">
            <Card raised='true' className="sign__in__form">
                <CardHeader title='Sign up'/>
                {
                    (isValid && isRegistered) ? (
                        <Alert variant="outlined" severity="success">Success! You can can now sign in.</Alert>
                    ) : (!isValid) ? (
                        <Alert variant="outlined" severity="error">Invalid email or password.</Alert>
                    ) : (<p>    </p>)
                }
                <FormControl>
                    <TextField
                        variant="filled"
                        type='text'
                        label='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></TextField>
                    <TextField 
                        variant='filled'
                        type='password'
                        label='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></TextField>
                    <Button variant="contained" type="submit" onClick={signUp}>Sign up</Button>
                </FormControl>
                    <p>Already have an account?</p>
                    <Button type="submit" onClick={(e) => {
                        e.preventDefault();
                        navigate('/');
                        }
                    }>Sign in</Button>
            </Card>
        </div>
    )
}

export default SignUp;