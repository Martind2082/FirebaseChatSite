import { useContext, useState } from 'react';
import './index.css';
import { Authcontext } from './Authcontext';
import {db} from './Firebase.jsx';
import {addDoc, collection, deleteDoc, doc, setDoc} from 'firebase/firestore';

const Home = () => {
    const {googlesignin, user, logout, messages} = useContext(Authcontext);
    const [text, setText] = useState('');
    const [editing, setEditing] = useState(false);
    const [editid, setEditid] = useState('');

    const addmessage = async (e) => {
        e.preventDefault();

        if (text.length === 0) {
            return;
        }
        await addDoc(collection(db, 'messages'), {
            text: text
        })
        setText('');
    }

    const deletemessage = async (id) => {
        const docRef = doc(db, 'messages', id);
        await deleteDoc(docRef);
    }

    const editmessage = async(e) => {
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