import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AlisonLogo from '../../assets/AlisonLogo.png';
import HeadstartLogo from '../../assets/HeadstartLogo.png';

import './UploadDiplomaCodes.css';
import UploadFile from '../_macros_/UploadFile/UploadFile';

import { validateSession } from '../../controllers/Credentials/validateSession';

function UploadDiplomaCodes() {
  const navigate = useNavigate();

  useEffect(() => {
    const authorise = () => {
      validateSession().then((response) => {
        if (response !== 200) {
          navigate('/not-found');
        }
      });
    };

    authorise();
  }, []);

  return (
    <div className="Page">
      <div>
        <header className="image-align">
          <img src={AlisonLogo} className="Alison-logo" alt="Alison Logo" onClick={() => navigate('/dashboard')} />
          <img src={HeadstartLogo} className="Headstart-logo" alt="Headstart Logo" onClick={() => navigate('/dashboard')} />
        </header>
      </div>

      <div className="header">
        <h1 className="h1-style">Update Certificates</h1>
        <h2 className="h2-style">Please use this page to update diploma codes/allocations</h2>
        <h3 className="h3-style">Upload certificate file</h3>
        <h3 className="h3-style">Click upload button</h3>
        <h3 className="h3-style">Review if any errors</h3>
      </div>

      <div className="fileUploadSection">
        <UploadFile uploadType="diploma-codes" />
      </div>
    </div>
  );
}

export default UploadDiplomaCodes;
