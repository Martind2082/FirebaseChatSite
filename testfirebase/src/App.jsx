import './index.css';
import React, { useContext } from 'react';
import { AuthContextProvider } from './Authcontext';
import { Authcontext } from './Authcontext';

function App() {
  const user = useContext(Authcontext);
  return (
      <div className="App">
        <AuthContextProvider>
        </AuthContextProvider>
      </div>  
  )
}

export default App;

