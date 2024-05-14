import React, { useState, useEffect } from 'react';
import toggleImage from '../assets/controls.png';
import './Events.css';
import RuleList from './Components/RuleList'
import NavBar from './Components/NavBar';


function Events() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [eventData, seteventData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
    fetch('http://localhost:9090/api/v1/events', {
        'Access-Control-Allow-Origin': 'http://localhost:9090',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        seteventData(data);
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
        <NavBar title={"Events"}/>
        <div className={`menu ${menuOpen ? 'open' : ''}`}>
              <ul>
                <li><a href ="/">Dashboard</a></li>
                <li><a href="/agents">Agents</a></li>
                <li><a href="/events">All Events</a></li>
                <li><a href="/rules">All Rules</a></li>
              </ul>
          {eventData ? (
            <RuleList ruleList={eventData}/>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    );
  }

export default Events;