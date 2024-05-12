import React from 'react';
import './RuleList.css'

function RuleList({ ruleList }) {
    return (
      <div className="container">
        <ul>
            {ruleList.map((rule, index) => (
                <li key={index}>
                    <p>Rule ID:<strong> {rule.RuleId}</strong></p>
                    <p>Description:<strong> {rule.Description}</strong></p>
                    <p>Severity:<strong> {rule.Severity}</strong></p>  
                </li>
            ))}
        </ul>
      </div>
    );
}

export default RuleList;
