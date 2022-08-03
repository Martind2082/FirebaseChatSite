import {GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import {auth} from './Firebase.jsx';
import Home from './Home';
import Signin from './Signin';

export const Authcontext = createContext();

export const AuthContextProvider = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();

    function googlesignin() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    }
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            setUser(user);
            setLoading(false);
        })
        return unsub;
    })
    const logout = () => {
        signOut(auth);
    }



    return (
        <Authcontext.Provider value={{googlesignin, logout, user}}>
            {!loading &&           <div>
          {
            user ? <Home /> : <Signin />
          }
          </div>}
        </Authcontext.Provider>
    )
}