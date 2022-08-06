import React from 'react';
import { useNavigate } from 'react-router-dom';
import AlisonLogo from '../../assets/AlisonLogo.png';
import HeadstartLogo from '../../assets/HeadstartLogo.png';

function UpdateLearners() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <header className="image-align">
          <img src={AlisonLogo} className="Alison-logo" alt="Alison Logo" onClick={() => navigate('/')} />
          <img src={HeadstartLogo} className="Headstart-logo" alt="Headstart Logo" onClick={() => navigate('/')} />
        </header>
      </div>
    </div>
  );
}

export default UpdateLearners;
