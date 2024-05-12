import React, { useState, useEffect } from 'react';
import toggleImage from '../assets/controls.png';
import './Events.css';

function Events() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [agentData, setAgentData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
    fetch('http://localhost:9090/api/v1/agents', {
        'Access-Control-Allow-Origin': 'http://localhost:9090',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setAgentData(data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
    return (
      <div className="Events">
        <header className="Events-header">
        <nav>
            <div className="toggle" onClick={toggleMenu}>
              <img src={toggleImage} alt="Toggle Menu" style={{ width: '50px', height: '50px' }}/>
            </div>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <h1>
                Events
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
        <div>
        <h2>Event Information</h2>
          {agentData ? (
            <div>
              <p><strong>RuleId:</strong> </p>
              <p><strong>Description:</strong> </p>
              <p><strong>Severity:</strong> </p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        </header>
      </div>
    );
  }

export default Events;