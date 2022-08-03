import { useContext, useEffect, useState } from 'react';
import './index.css';
import { Authcontext } from './Authcontext';
import {db} from './Firebase.jsx';
import {addDoc, collection, deleteDoc, doc, setDoc, query, onSnapshot, serverTimestamp, orderBy, } from 'firebase/firestore';

const Home = () => {
    const {googlesignin, user, logout} = useContext(Authcontext);
    const [text, setText] = useState('');
    const [editing, setEditing] = useState(false);
    const [editid, setEditid] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy("createdAt"))
        const unsub = onSnapshot(q, (snapshot) => {
            const docRef = doc(db, 'messages', snapshot.docs[0].id);
            if (snapshot.docs.length > 7) {
                deleteDoc(docRef);
            }
            let messagearray = [];
            snapshot.docs.forEach(message => {
                messagearray.push({...message.data(), id: message.id})
            });
            setMessages(messagearray);
        })
        return unsub;
    }, [])

    const addmessage = (e) => {
        e.preventDefault();

        if (text.length === 0) {
            return;
        }
        addDoc(collection(db, 'messages'), {
            text: text,
            createdAt: serverTimestamp()
        })
        setText('');
    }

    const deletemessage = (id) => {
        const docRef = doc(db, 'messages', id);
        deleteDoc(docRef);
    }

    const editmessage = (e) => {
        e.preventDefault();
        const docRef = doc(db, 'messages', editid);
        const payload = {text: text};
        setDoc(docRef, payload);
        setEditing(false);
    }
    const edit = (id) => {
        for (let i = 0; i < messages.length; i++) {
            if (messages[i].id === id) {
               setText(messages[i].text);
               setEditid(id);
               setEditing(true);
               return; 
            }
        }
    }


    return (
        <div className="home">
            <p>Home</p>
            <div style={{paddingLeft: '2rem'}}>
                {
                    user ? <div>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <img className='profilepic' src={user.photoURL}/>
                            <span style={{marginLeft: '1rem'}}>Welcome, {user.displayName}</span>
                        </div>
                        <button onClick={logout}>Log out</button>
                        <div className="messages">
                            <div className='messagesfromdb'>
                                {messages.map(message => {
                                    return <div className='msg' key={message.id}>
                                        {message.text}
                                        <p className='hover' onClick={() => edit(message.id)}>Edit</p>
                                        <p className='hover' onClick={() => deletemessage(message.id)}>Delete</p>
                                    </div>
                                })}
                            </div>
                            <form onSubmit={(e) => {
                                editing ? editmessage(e) : addmessage(e)
                            }} className="message_form">
                                <input value={text} onChange={(e) => setText(e.target.value)} style={{width: '80%'}} type="text" />
                                <input type="submit"></input>
                            </form>
                        </div>
                    </div> : 
                    <button onClick={googlesignin}>Sign in</button>
                }
            </div>
        </div>
    );
}
 
export default Home;