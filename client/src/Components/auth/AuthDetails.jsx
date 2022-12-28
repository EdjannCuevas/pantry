import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            }
            else {
                setAuthUser(null);
            }

        });
        return () => {
            listen();
        }
    }, [])

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('sign out was successful')
        }).catch(err => console.log(err));
    }
    return (
        <div>
            { authUser  ? <><p>Signed In</p><button onClick={userSignOut}>Sign Out</button></>: <p>Signed Out</p> }
        </div>
    )
}

export default AuthDetails;