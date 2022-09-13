import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import AlisonLogo from '../../assets/AlisonLogo.png';
import HeadstartLogo from '../../assets/HeadstartLogo.png';
import Spreadsheet from '../_macros_/Spreadsheet/Spreadsheet';

import './ReviewCourses.css';

function ReviewCourses() {
  const navigate = useNavigate();

  const [getSpreadsheet, setGetSpreadsheet] = useState(false);

  return (
    <div className="Page">
      <div>
        <header className="image-align">
          <img src={AlisonLogo} className="Alison-logo" alt="Alison Logo" onClick={() => navigate('/')} />
          <img src={HeadstartLogo} className="Headstart-logo" alt="Headstart Logo" onClick={() => navigate('/')} />
        </header>
      </div>
      <div className="header">
        <h1 className="h1-style">Review Courses</h1>
        <h2 className="h2-style">Please use this page to review Headstart Alison courses (from the alison course catalogue)</h2>
        <h3 className="h3-style">Press on button to view content (please wait to render). Press button again to hide</h3>
      </div>

      <div className="button-div">
        <Button className="button-nav" onClick={() => { setGetSpreadsheet((prevState) => !prevState); }}>Get Courses</Button>
        <Button className="button-nav">Get Graphs</Button>
      </div>

      <div className="spreadsheet-div">
        {getSpreadsheet ? <Spreadsheet whichSheet="get-courses" /> : null}
      </div>

      <div>
        Test
      </div>
    </div>
  );
}

export default ReviewCourses;
