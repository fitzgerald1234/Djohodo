import React from 'react';
import NavBar from './Components/NavBar';
import './Dashboard.css';

function Dashboard() {
    return (
      <div className="Dashboard">
        <NavBar title={"Dashboard"}/>
        <h2>
          Total agents
          <br/>
          <br/>
          1
        </h2>
        <h2>
          <br/>
          Agents Activated
          <br/>
          <br/>
          1
        </h2>
      </div>
    );
  }

  export default Dashboard;