import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import AlisonLogo from '../../assets/AlisonLogo.png';
import HeadstartLogo from '../../assets/HeadstartLogo.png';
import Spreadsheet from '../_macros_/Spreadsheet/Spreadsheet';
import CourseGraphs from '../_macros_/CourseGraphs/CourseGraphs';
import getAlisonCatalogue from '../../controllers/AlisonCatalogue/get-alison-catalogue';

import './ReviewCourses.css';

function ReviewCourses() {
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState([]);
  const [getSpreadsheet, setGetSpreadsheet] = useState(false);
  const [getGraphs, setGetGraphs] = useState(false);

  // useEffect so only called once instead of spamming
  useEffect(() => {
    const getDataFromApi = () => {
      getAlisonCatalogue().then((response) => {
        if (response.length) {
          setCourseData(response);
        }
      });
    };

    getDataFromApi();
  }, []);

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
        <Button className="button-nav" onClick={() => { setGetSpreadsheet((prevState) => !prevState); setGetGraphs(() => false); }}>Get Courses</Button>
        <Button className="button-nav" onClick={() => { setGetGraphs((prevState) => !prevState); setGetSpreadsheet(() => false); }}>Get Graphs</Button>
      </div>

      <div className="spreadsheet-div">
        {getSpreadsheet ? <Spreadsheet whichSheet="get-courses" data={courseData} /> : null}
      </div>

      <div>
        {getGraphs ? <CourseGraphs data={courseData} /> : null}
      </div>
    </div>
  );
}

export default ReviewCourses;
