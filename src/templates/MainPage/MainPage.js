import AlisonLogo from '../../assets/AlisonLogo.png';
import HeadstartLogo from '../../assets/HeadstartLogo.png';
import './MainPage.css';

import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div>
        <header class="image-align">
          <img src={AlisonLogo} className="Alison-logo" alt="Alison Logo" />
          <img src={HeadstartLogo} className="Headstart-logo" alt="Headstart Logo" />
        </header>
      </div>

      <div class="Header-title">
        <h1 class="Headstart-h1">Alison Headstart Database</h1>
        <h2 class="Headstart-h2">Please use the buttons below for the relevant actions</h2>
      </div>
      
      <div>
        <h3 class="Button-title-h3">Upload files / Update database</h3>
        <div class="Button-row">
          <Button variant="secondary" onClick={() => navigate('/upload-course-codes')}>UPDATE CERTIFICATE CODES</Button>
          <Button variant="secondary" onClick={() => navigate('/upload-diploma-codes')}>UPDATE DIPLOMA CODES</Button>
          <Button variant="success" onClick={() => navigate('/update-completion')}>UPDATE COMPLETION</Button>
          <Button variant="warning" onClick={() => navigate('/upload-courses-catalogue')}>UPDATE COURSES CATALOGUE</Button>
        </div>
      </div>

      <div>
        <h3 class="Button-title-h3">Certificate/Courses Actions</h3>
        <div class="Button-row">
          <Button variant="primary" onClick={() => navigate('/review-courses')}>REVIEW COURSES</Button>
          <Button variant="primary" onClick={() => navigate('/review-progress')}>REVIEW PROGRESS</Button>
        </div>
      </div>

      <div>
        <h3 class="Button-title-h3">Learners/Reporting Tool</h3>
        <div class="Button-row">
          <Button variant="danger" onClick={() => navigate('/update-learners')}>UPDATE LEARNERS</Button>
          <Button variant="dark" onClick={() => navigate('/review-learners')}>REVIEW LEARNERS</Button>
        </div>
      </div>

      <div>
        <h3 class="Button-title-h3">Learners info</h3>
        <div class="Button-row">
          <Button variant="info" onClick={() => navigate('/update-learners-info')}>UPDATE LEARNERS INFO</Button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
