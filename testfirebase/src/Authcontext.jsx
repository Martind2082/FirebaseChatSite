import {GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import {auth, db} from './Firebase.jsx';
import {addDoc, collection, doc, onSnapshot, query} from 'firebase/firestore';

export const Authcontext = createContext();

export const AuthContextProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const [messages, setMessages] = useState([]);

    const googlesignin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
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

    useEffect(() => {
        const q = query(collection(db, 'messages'))
        const unsub = onSnapshot(q, (snapshot) => {
            let messagearray = [];
            snapshot.forEach(message => {
                messagearray.push({...message.data(), id: message.id})
            });
            setMessages(messagearray);
        })
        return () => unsub();
    }, [])

    return (
        <Authcontext.Provider value={{googlesignin, logout, user, messages}}>
            {!loading && children}
        </Authcontext.Provider>
    )
}