import React from 'react';
import { useNavigate } from 'react-router-dom';
import AlisonLogo from '../../assets/AlisonLogo.png';
import HeadstartLogo from '../../assets/HeadstartLogo.png';
import UploadFile from '../_macros_/UploadFile/UploadFile';

import './UploadCourseCodes.css';

function UploadCourseCodes() {
  const navigate = useNavigate();

  return (
    <div className="Page">
      <div>
        <header className="image-align">
          <img src={AlisonLogo} className="Alison-logo" alt="Alison Logo" onClick={() => navigate('/')} />
          <img src={HeadstartLogo} className="Headstart-logo" alt="Headstart Logo" onClick={() => navigate('/')} />
        </header>
      </div>

      <div className="header">
        <h1 className="h1-style">Update Certificates</h1>
        <h2 className="h2-style">Please use this page to update certificate codes/allocations</h2>
        <h3 className="h3-style">Upload certificate file</h3>
        <h3 className="h3-style">Click upload button</h3>
        <h3 className="h3-style">Review if any errors</h3>
      </div>

      <div className="fileUploadSection">
        <UploadFile uploadType="course-codes" />
      </div>
    </div>
  );
}

export default UploadCourseCodes;
