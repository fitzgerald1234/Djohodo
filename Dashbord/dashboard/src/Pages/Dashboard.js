import React, { useState } from 'react';
import toggleImage from '../assets/controls.png';
import './Dashboard.css';

function Dashboard() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
    return (
      <div className="Dashboard">
        <header className="Dashboard-header">
        <nav>
            <div className="toggle" onClick={toggleMenu}>
              <img src={toggleImage} alt="Toggle Menu" style={{ width: '50px', height: '50px' }}/>
            </div>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <h1>
              Dashboard
            </h1>
        </nav>
        <div className={`menu ${menuOpen ? 'open' : ''}`}>
              <ul>
                <li><a href ="/">Dashboard</a></li>
                <li><a href="/agents">Agents</a></li>
                <li><a href="/events">All Events</a></li>
                <li><a href="/rules">All Rules</a></li>
              </ul>
        </div>
          {/* <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
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
        </header>
      </div>
    );
  }

  export default Dashboard;