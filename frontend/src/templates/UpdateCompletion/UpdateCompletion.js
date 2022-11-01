import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AlisonLogo from '../../assets/AlisonLogo.png';
import HeadstartLogo from '../../assets/HeadstartLogo.png';
import UploadFile from '../_macros_/UploadFile/UploadFile';

import { validateSession } from '../../controllers/Credentials/validateSession';

function UpdateCompletion() {
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
        <h1 className="h1-style">Update Completion</h1>
        <h2 className="h2-style">Please use this page to update individual course completion</h2>
        <h3 className="h3-style">Download Alison courses csv file</h3>
        <h3 className="h3-style">Open in notepad and save as and select ANSII or subline text and save as .txt in UTF-8</h3>
        <h3 className="h3-style">
          Open excel -
          {'>'}
          {' '}
          data -
          {'>'}
          {' '}
          import from text -
          {'>'}
          {' '}
          load -
          {'>'}
          {' '}
          save
        </h3>
        <h3 className="h3-style">Or data, get data (power query) and then from text</h3>
        <h3 className="h3-style">Upload converted file</h3>
        <h3 className="h3-style">Click upload button</h3>
        <h3 className="h3-style">Review if any errors</h3>
        <h3 className="h3-style">This page is not for tracking data</h3>
      </div>

      <div className="fileUploadSection">
        <UploadFile uploadType="course-completion" />
      </div>
    </div>
  );
}

export default UpdateCompletion;
