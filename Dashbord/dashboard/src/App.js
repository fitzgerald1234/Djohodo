//import logo from './logo.svg';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Agents from './Pages/Agents';
import Events from './Pages/Events';

// import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path='/Dashboard' element={<Dashboard/>} />
      <Route path='/Agents' element={<Agents/>} />
      <Route path='/Events' element={<Events/>} />
      {/* <Route path='/SignUpPage' element={<SignUpPage/>} />
      <Route path='/signup-success' element={<ValidateUserInfo/>} />
      <Route path='/userhome' element={<UserHome/>} />
      <Route path='/explore' element={<ExploreServices/>} /> */}
      </Routes>
    </div>
  );
}

export default App;
