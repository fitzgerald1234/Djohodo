import React, { useState, useEffect } from 'react';
import toggleImage from '../assets/controls.png';
import NavBar from './Components/NavBar';
import './Agents.css';

function Agents() {
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
      <div className="Agents">
        <NavBar title={"Agents"}/>
        <h1>Agent Information</h1>
          {agentData ? (
            <div>
              <p>Agent Name: <strong>{agentData.agent_name}</strong></p>
              <p>IP: <strong>{agentData.ip}</strong></p>
              <p>Key <strong>{agentData.key}:</strong></p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
      </div>
    );
  }

export default Agents;