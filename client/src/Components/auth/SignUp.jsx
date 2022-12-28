import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import '../../Styles/SignIn.css';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            console.log(userCredentials)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="sign__in__container">
            <form onSubmit={signUp}>
                <h1>Create Account</h1>
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;