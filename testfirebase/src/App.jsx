import './index.css';
import React from 'react';
import { AuthContextProvider } from './Authcontext';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './Home';

function App() {
  return (
      <div className="App">
        <AuthContextProvider>
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />}/>
            </Routes>
          </Router>
        </AuthContextProvider>
      </div>  
  )
}

export default App;

