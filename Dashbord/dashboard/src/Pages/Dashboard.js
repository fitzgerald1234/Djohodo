import React from 'react';
import NavBar from './Components/NavBar';
import './Dashboard.css';

function Dashboard() {
    return (
      <div className="Dashboard">
        <NavBar title={"Dashboard"}/>
        <h1>
          Total agents
          <br/>
          <br/>
          1
        </h1>
        <h1>
          <br/>
          Agents Activated
          <br/>
          <br/>
          1
        </h1>
      </div>
    );
  }

  export default Dashboard;