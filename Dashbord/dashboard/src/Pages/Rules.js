import React, {useState, useEffect} from "react";
import NavBar from "./Components/NavBar";
import RuleList from "./Components/RuleList";


function Rules() {
    const [eventData, seteventData] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch('http://localhost:9090/api/v1/rules', {
            'Access-Control-Allow-Origin': 'http://localhost:9090',
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
        <div className="Rules">
        <NavBar title={"Rules"}/>
          {eventData ? (
            <RuleList ruleList={eventData}/>
          ) : (
            <p>Loading...</p>
          )}
        </div>
    );
}

export default Rules;