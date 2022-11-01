import React from 'react';
import { useNavigate } from 'react-router-dom';

import AlisonLogo from '../../assets/AlisonLogo.png';
import HeadstartLogo from '../../assets/HeadstartLogo.png';

import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div>
        <header className="image-align">
          <img src={AlisonLogo} className="Alison-logo" alt="Alison Logo" />
          <img src={HeadstartLogo} className="Headstart-logo" alt="Headstart Logo" />
        </header>
      </div>

      <div className="not-found">
        <h1 className="Headstart-h1">Page not found or not authorised</h1>
        <h2 className="Headstart-h2" onClick={() => navigate('/')}>Go to login page</h2>
      </div>
    </div>
  );
}

export default NotFound;
