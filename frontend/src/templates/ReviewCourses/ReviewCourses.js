import React from 'react';
import { useNavigate } from 'react-router-dom';
import DataGrid from 'react-data-grid';
import AlisonLogo from '../../assets/AlisonLogo.png';
import HeadstartLogo from '../../assets/HeadstartLogo.png';

import './ReviewCourses.css';

function ReviewCourses() {
  const navigate = useNavigate();

  const columns = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' },
  ];

  const rows = [
    { id: 0, title: 'Example' },
    { id: 1, title: 'Demo' },
  ];

  return (
    <div>
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

      <DataGrid columns={columns} rows={rows} className="rdg-light" />

    </div>
  );
}

export default ReviewCourses;
