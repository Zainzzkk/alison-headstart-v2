import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import AlisonLogo from '../../assets/AlisonLogo.png';
import HeadstartLogo from '../../assets/HeadstartLogo.png';
import Spreadsheet from '../_macros_/Spreadsheet/Spreadsheet';
import LearnersGenderGraph from '../_macros_/LearnersGraphs/Gender/LearnersGenderGraph';
import LearnersAgeRangeGraph from '../_macros_/LearnersGraphs/AgeRange/LearnersAgeRangeGraph';
import getAllLearners from '../../controllers/LearnersStats/getAllLearners';
import JamatkhanaGraph from '../_macros_/LearnersGraphs/Jamatkhana/JamatkhanaGraph';
import AverageCourseTime from '../_macros_/LearnersStats/AverageCourseTime/AverageCourseTime';
import TotalLoggedIn from '../_macros_/LearnersStats/TotalLoggedIn/TotalLoggedIn';

import './ReviewLearners.css';

function ReviewLearners() {
  const navigate = useNavigate();

  const [learnersData, setLearnersData] = useState([]);
  const [getFullLearnerSpreadsheet, setGetFullLearnerSpreadsheet] = useState(false);
  const [graphButtons, setGraphButtons] = useState(false);
  const [otherButtons, setOtherButtons] = useState(false);
  const [getGenderGraph, setGetGenderGraph] = useState(false);
  const [getAgeGraph, setGetAgeGraph] = useState(false);
  const [getJamatKhanaGraph, setGetJamatkhanaGraph] = useState(false);
  const [getAverageCourse, setAverageCourse] = useState(false);
  const [getTotalLearners, setTotalLearners] = useState(false);
  const [getTotalLoggedIn, setTotalLoggedIn] = useState(false);
  const [getJamatkhanaSpreadsheet, setJamatkhanaSpreadsheet] = useState(false);

  // useEffect so only called once instead of spamming
  useEffect(() => {
    // gets all learner data and puts it in state
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
        <Button
          className="button-nav"
          onClick={() => {
            setGetFullLearnerSpreadsheet((prevState) => !prevState);
            setGetAgeGraph(() => false);
            setGetGenderGraph(() => false);
            setGraphButtons(() => false);
            setGetJamatkhanaGraph(() => false);
            setOtherButtons(() => false);
          }}
        >
          Get Learners
        </Button>
        <Button
          className="button-nav"
          onClick={() => {
            setGetFullLearnerSpreadsheet(() => false);
            setGraphButtons((prevState) => !prevState);
            setOtherButtons(() => false);
            setTotalLearners(() => false);
            setTotalLoggedIn(() => false);
            setJamatkhanaSpreadsheet(() => false);
            setAverageCourse(() => false);
            setGetAgeGraph(() => false);
            setGetGenderGraph(() => false);
            setGetJamatkhanaGraph(() => false);
          }}
        >
          Get Graphs
        </Button>

        <Button
          className="button-nav"
          onClick={() => {
            setGetFullLearnerSpreadsheet(() => false);
            setGraphButtons(() => false);
            setGetAgeGraph(() => false);
            setGetGenderGraph(() => false);
            setGraphButtons(() => false);
            setGetJamatkhanaGraph(() => false);
            setOtherButtons((prevState) => !prevState);
            setTotalLearners(() => false);
            setTotalLoggedIn(() => false);
            setJamatkhanaSpreadsheet(() => false);
            setAverageCourse(() => false);
          }}
        >
          Get Other
        </Button>

        <Button
          className="button-nav"
          onClick={() => {
            setGetFullLearnerSpreadsheet(() => false);
            setGraphButtons(() => false);
            setGetAgeGraph(() => false);
            setGetGenderGraph(() => false);
            setGraphButtons(() => false);
            setGetJamatkhanaGraph(() => false);
            setOtherButtons(() => false);
            setTotalLearners(() => false);
            setTotalLoggedIn(() => false);
            setJamatkhanaSpreadsheet(() => false);
            setAverageCourse(() => false);
          }}
        >
          Get Tracking Change
        </Button>
      </div>

      {
        graphButtons
          ? (
            <div className="secondary-button-div">
              <Button
                className="button-nav-sub"
                onClick={() => {
                  setGetFullLearnerSpreadsheet(() => false);
                  setGetAgeGraph(() => false);
                  setGetJamatkhanaGraph(() => false);
                  setGetGenderGraph((prevState) => !prevState);
                }}
              >
                Gender Chart
              </Button>

              <Button
                className="button-nav-sub"
                onClick={() => {
                  setGetFullLearnerSpreadsheet(() => false);
                  setGetGenderGraph(() => false);
                  setGetJamatkhanaGraph(() => false);
                  setGetAgeGraph((prevState) => !prevState);
                }}
              >
                Age Range Chart
              </Button>

              <Button
                className="button-nav-sub"
                onClick={() => {
                  setGetFullLearnerSpreadsheet(() => false);
                  setGetGenderGraph(() => false);
                  setGetAgeGraph(() => false);
                  setGetJamatkhanaGraph((prevState) => !prevState);
                }}
              >
                Jamatkhana Chart
              </Button>
            </div>
          )
          : null
      }

      {
        otherButtons
          ? (
            <div className="secondary-button-div">
              <Button
                className="button-nav-sub"
                onClick={() => {
                  setTotalLearners(() => false);
                  setTotalLoggedIn(() => false);
                  setJamatkhanaSpreadsheet(() => false);
                  setAverageCourse((prevState) => !prevState);
                }}
              >
                Average Course Time
              </Button>

              <Button
                className="button-nav-sub"
                onClick={() => {
                  setAverageCourse(() => false);
                  setTotalLoggedIn(() => false);
                  setJamatkhanaSpreadsheet(() => false);
                  setTotalLearners((prevState) => !prevState);
                }}
              >
                Total Learners
              </Button>

              <Button
                className="button-nav-sub"
                onClick={() => {
                  setAverageCourse(() => false);
                  setTotalLearners(() => false);
                  setJamatkhanaSpreadsheet(() => false);
                  setTotalLoggedIn((prevState) => !prevState);
                }}
              >
                Total Logged In
              </Button>

              <Button
                className="button-nav-sub"
                onClick={() => {
                  setAverageCourse(() => false);
                  setTotalLearners(() => false);
                  setTotalLoggedIn(() => false);
                  setJamatkhanaSpreadsheet((prevState) => !prevState);
                }}
              >
                Jamatkhana Data
              </Button>
            </div>

          )
          : null
      }

      <div className="spreadsheet-div">
        {getFullLearnerSpreadsheet ? <Spreadsheet whichSheet="all-learners" data={learnersData} /> : null}
      </div>

      <div>
        {getGenderGraph ? <LearnersGenderGraph data={learnersData} /> : null}
      </div>

      <div>
        {getAgeGraph ? <LearnersAgeRangeGraph data={learnersData} /> : null}
      </div>

      <div>
        {getJamatKhanaGraph ? <JamatkhanaGraph data={learnersData} /> : null}
      </div>

      <div>
        {getAverageCourse ? <AverageCourseTime data={learnersData} /> : null}
      </div>

      {getTotalLearners ? (// eslint-disable-line
        <div className="total-learners">
          Total learners:
          {' '}
          {learnersData.length}
        </div>
      )
        : null}

      <div>
        {getTotalLoggedIn ? <TotalLoggedIn data={learnersData} /> : null}
      </div>

      <div className="spreadsheet-div">
        {getJamatkhanaSpreadsheet ? <Spreadsheet whichSheet="all-jks" data={learnersData} /> : null}
      </div>

    </div>
  );
}

export default ReviewLearners;
