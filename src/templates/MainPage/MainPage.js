import AlisonLogo from '../../assets/AlisonLogo.png';
import HeadstartLogo from '../../assets/HeadstartLogo.png';
import './MainPage.css';

import Button from 'react-bootstrap/Button';


function MainPage() {
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
          <Button variant="secondary">UPDATE CERTIFICATE CODES</Button>
          <Button variant="secondary">UPDATE DIPLOMA CODES</Button>
          <Button variant="success">UPDATE COMPLETION</Button>
          <Button variant="warning">UPDATE COURSES CATALOGUE</Button>
        </div>
      </div>

      <div>
        <h3 class="Button-title-h3">Certificate/Courses Actions</h3>
        <div class="Button-row">
          <Button variant="primary">REVIEW COURSES</Button>
          <Button variant="primary">REVIEW PROGRESS</Button>
        </div>
      </div>

      <div>
        <h3 class="Button-title-h3">Learners/Reporting Tool</h3>
        <div class="Button-row">
          <Button variant="danger">UPDATE LEARNERS</Button>
          <Button variant="dark">REVIEW LEARNERS</Button>
        </div>
      </div>

      <div>
        <h3 class="Button-title-h3">Learners info</h3>
        <div class="Button-row">
          <Button variant="info">UPDATE LEARNERS INFO</Button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
