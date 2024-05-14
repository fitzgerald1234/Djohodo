import React, { useState, useEffect } from 'react';
import toggleImage from '../assets/controls.png';
import './Events.css';
import RuleList from './Components/RuleList'
import NavBar from './Components/NavBar';


function Events() {
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

    return (
      <div className="Events">
        <NavBar title={"Events"}/>
          {eventData ? (
            <RuleList ruleList={eventData}/>
          ) : (
            <p>Loading...</p>
          )}
      </div>
    );
  }

export default Events;