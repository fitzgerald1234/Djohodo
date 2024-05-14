import React, { useState } from 'react'
import toggleImage from '../../assets/controls.png';
import './NavBar.css'

function NavBar({ title }) {
    const [menuOpen, setMenuOpen] = useState(false);
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <div className="NavBar">
            <div className="toggle" onClick={toggleMenu}>
              <img src={toggleImage} alt="Toggle Menu" style={{ width: '40px', height: '40px' }}/>
            </div>
            <h1>
              {title}
            </h1>
          <div className={`menu ${menuOpen ? 'open' : ''}`}>
                <ul>
                  <li><a href ="/">Dashboard</a></li>
                  <li><a href="/agents">Agents</a></li>
                  <li><a href="/events">All Events</a></li>
                  <li><a href="/rules">All Rules</a></li>
                </ul>
          </div>
        </div>
    );
}

export default NavBar;