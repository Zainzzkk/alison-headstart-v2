import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import AlisonLogo from '../../assets/AlisonLogo.png';
import HeadstartLogo from '../../assets/HeadstartLogo.png';
import Spreadsheet from '../_macros_/Spreadsheet/Spreadsheet';
// import LearnersGenderGraph from '../_macros_/LearnersGraphs/Gender/LearnersGenderGraph';
import getAllLearners from '../../controllers/LearnersStats/getAllLearners';

import './ReviewLearners.css';

function ReviewLearners() {
  const navigate = useNavigate();

  const [learnersData, setLearnersData] = useState([]);
  const [getFullLearnerSpreadsheet, setGetFullLearnerSpreadsheet] = useState(false);
  const [graphButtons, setGraphButtons] = useState(false);

  // useEffect so only called once instead of spamming
  useEffect(() => {
    const getDataFromApi = () => {
      getAllLearners().then((response) => {
        if (response.length) {
          setLearnersData(response);
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
        <h1 className="h1-style">Review Learners</h1>
        <h2 className="h2-style">Please use this page to review Headstart Alison Learners (progress of learners for reporting)</h2>
        <h3 className="h3-style">Press on button to view content (please wait to render). Press button again to hide</h3>
      </div>

      <div className="button-div">
        <Button className="button-nav" onClick={() => { setGetFullLearnerSpreadsheet((prevState) => !prevState); }}>Get Learners</Button>
        <Button
          className="button-nav"
          onClick={() => {
            setGetFullLearnerSpreadsheet(() => false);
            setGraphButtons((prevState) => !prevState);
          }}
        >
          Get Graphs
        </Button>
      </div>

      {
        graphButtons
          ? (
            <div className="secondary-button-div">
              <Button className="button-nav">Gender Chart</Button>
            </div>
          )
          : null
      }

      <div className="spreadsheet-div">
        {getFullLearnerSpreadsheet ? <Spreadsheet whichSheet="all-learners" data={learnersData} /> : null}
      </div>

      <div>
        {/* <LearnersGenderGraph /> */}
      </div>

    </div>

  );
}

export default ReviewLearners;
