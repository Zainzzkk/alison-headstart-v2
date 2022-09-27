import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import AlisonLogo from '../../assets/AlisonLogo.png';
import HeadstartLogo from '../../assets/HeadstartLogo.png';

import getRawCompletion from '../../controllers/Completion/getRawCompletion';
import getFilteredCompletion from '../../controllers/Completion/getFilteredCompletion';
import getCourseCertificateTracker from '../../controllers/Completion/getCourseCertificateTracker';
import getCertificateCodes from '../../controllers/CourseCodes/getCertificateCodes';
import getDiplomaCodes from '../../controllers/DiplomaCodes/getDiplomaCodes';
import combineCodeData from '../../helpers/combineCodeData';
import getTotalCompletedCourses from '../../helpers/getTotalCompletedCourses';
import getTotalCodesUsed from '../../helpers/getTotalCodesUsed';
import calculateAverageTime from '../../helpers/calculateAverageTime';

import Spreadsheet from '../_macros_/Spreadsheet/Spreadsheet';

import './ReviewProgress.css';

function ReviewProgress() {
  const navigate = useNavigate();

  const [progressButtons, setProgressButtons] = useState(false);
  const [completionButtons, setCompletionButtons] = useState(false);
  const [allocationButtons, setAllocationButtons] = useState(false);
  const [getRawSpreadsheet, setGetRawSpreadsheet] = useState(false);
  const [filterCompletionSpreadsheet, setFilteredCompletionSpreadsheet] = useState(false);
  const [courseCertificateSpreadsheet, setCourseCertificateSpreadsheet] = useState(false);
  const [completedSpreadsheet, setCompletedSpreadsheet] = useState(false);
  const [codeTrackingSpreadsheet, setCodeTrackingSpreadsheet] = useState(false);
  const [progressStats, setProgressStats] = useState(false);
  const [rawCompletion, setRawCompletion] = useState([]);
  const [filteredCompletion, setFilteredCompletion] = useState([]);
  const [courseCertificateTracker, setCourseCertificateTracker] = useState([]);
  const [certificateCodes, setCertificateCodes] = useState([]);
  const [diplomaCodes, setDiplomaCodes] = useState([]);

  // useEffect so only called once instead of spamming
  useEffect(() => {
    // gets all completion data and puts it in state
    const getDataFromApi = () => {
      getRawCompletion().then((response) => {
        if (response.length) {
          setRawCompletion(response);
        }
      });

      getFilteredCompletion().then((response) => {
        if (response.length) {
          setFilteredCompletion(response);
        }
      });

      getCourseCertificateTracker().then((response) => {
        if (response.length) {
          setCourseCertificateTracker(response);
        }
      });

      getCertificateCodes().then((response) => {
        if (response.length) {
          setCertificateCodes(response);
        }
      });

      getDiplomaCodes().then((response) => {
        if (response.length) {
          setDiplomaCodes(response);
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
        <h1 className="h1-style">Review Progress</h1>
        <h2 className="h2-style">Please use this page to review Headstart Alison Learner Course Progress (progress of completion)</h2>
        <h3 className="h3-style">Press on button to view content (please wait to render). Press button again to hide</h3>
      </div>

      <div className="button-div">
        <Button
          className="button-nav"
          onClick={() => {
            setProgressButtons((prevState) => !prevState);
            setCompletionButtons(() => false);
            setAllocationButtons(() => false);
            setGetRawSpreadsheet(() => false);
            setFilteredCompletionSpreadsheet(() => false);
            setCompletedSpreadsheet(() => false);
            setCourseCertificateSpreadsheet(() => false);
            setCodeTrackingSpreadsheet(() => false);
            setProgressStats(() => false);
          }}
        >
          Get Progress Data
        </Button>
        <Button
          className="button-nav"
          onClick={() => {
            setCompletionButtons((prevState) => !prevState);
            setProgressButtons(() => false);
            setAllocationButtons(() => false);
            setGetRawSpreadsheet(() => false);
            setFilteredCompletionSpreadsheet(() => false);
            setCompletedSpreadsheet(() => false);
            setCourseCertificateSpreadsheet(() => false);
            setCodeTrackingSpreadsheet(() => false);
            setProgressStats(() => false);
          }}
        >
          Completion Data
        </Button>

        <Button
          className="button-nav"
          onClick={() => {
            setAllocationButtons((prevState) => !prevState);
            setProgressButtons(() => false);
            setCompletionButtons(() => false);
            setGetRawSpreadsheet(() => false);
            setFilteredCompletionSpreadsheet(() => false);
            setCompletedSpreadsheet(() => false);
            setCourseCertificateSpreadsheet(() => false);
            setCodeTrackingSpreadsheet(() => false);
            setProgressStats(() => false);
          }}
        >
          Certificate Allocation
        </Button>
      </div>

      {
        progressButtons
          ? (
            <div className="secondary-button-div">
              <Button
                className="button-nav-sub"
                onClick={() => {
                  setGetRawSpreadsheet((prevState) => !prevState);
                  setFilteredCompletionSpreadsheet(() => false);
                  setCompletedSpreadsheet(() => false);
                }}
              >
                Raw Progress Data
              </Button>

              <Button
                className="button-nav-sub"
                onClick={() => {
                  setGetRawSpreadsheet(() => false);
                  setFilteredCompletionSpreadsheet((prevState) => !prevState);
                  setCompletedSpreadsheet(() => false);
                }}
              >
                Filtered Data
              </Button>

              <Button
                className="button-nav-sub"
                onClick={() => {
                  setGetRawSpreadsheet(() => false);
                  setFilteredCompletionSpreadsheet(() => false);
                  setCompletedSpreadsheet((prevState) => !prevState);
                }}
              >
                Completion Spreadsheet
              </Button>
            </div>
          )
          : null
      }

      {
        completionButtons
          ? (
            <div className="secondary-button-div">
              <Button
                className="button-nav-sub"
                onClick={() => {
                  setCourseCertificateSpreadsheet(() => false);
                  setProgressStats(() => false);
                }}
              >
                Insert Certficate Tracker Data
              </Button>

              <Button
                className="button-nav-sub"
                onClick={() => {
                  setCourseCertificateSpreadsheet((prevState) => !prevState);
                  setProgressStats(() => false);
                }}
              >
                Review All Certificate Tracking
              </Button>

              <Button
                className="button-nav-sub"
                onClick={() => {
                  setCourseCertificateSpreadsheet(() => false);
                  setProgressStats((prevState) => !prevState);
                }}
              >
                Progress Stats
              </Button>
            </div>
          )
          : null
      }

      {
        allocationButtons
          ? (
            <div className="secondary-button-div">
              <Button
                className="button-nav-sub"
                onClick={() => {
                  setCodeTrackingSpreadsheet(() => false);
                }}
              >
                Certificate Allocation
              </Button>

              <Button
                className="button-nav-sub"
                onClick={() => {
                  setCodeTrackingSpreadsheet((prevState) => !prevState);
                }}
              >
                Certificate Allocation Spreadsheet
              </Button>
            </div>
          )
          : null
      }

      <div className="spreadsheet-div">
        {getRawSpreadsheet ? <Spreadsheet whichSheet="completion" data={rawCompletion} /> : null}
        {filterCompletionSpreadsheet ? <Spreadsheet whichSheet="completion" data={filteredCompletion} /> : null}
        {completedSpreadsheet ? <Spreadsheet whichSheet="completion-completed" data={filteredCompletion} /> : null}
        {courseCertificateSpreadsheet ? <Spreadsheet whichSheet="completion-certificate-tracker" data={courseCertificateTracker} /> : null}
        {codeTrackingSpreadsheet ? <Spreadsheet whichSheet="completion-code-tracker" data={combineCodeData(certificateCodes, diplomaCodes, courseCertificateTracker)} /> : null}
      </div>

      {
        progressStats
          ? (
            <div>
              <div>
                Total Certificates:
                {' '}
                {getTotalCodesUsed(courseCertificateTracker)}
              </div>
              <div>
                Total Completed:
                {' '}
                {getTotalCompletedCourses(filteredCompletion)}
              </div>

              <div>
                Average Completion:
                {' '}
                {`${calculateAverageTime(filteredCompletion)}%`}
              </div>
            </div>
          )
          : null
      }
    </div>
  );
}

export default ReviewProgress;
