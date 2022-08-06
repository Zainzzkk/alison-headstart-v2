import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './templates/MainPage/MainPage';
import UploadCourseCodes from './templates/UploadCourseCodes/UploadCourseCodes';
import ReviewCourses from './templates/ReviewCourses/ReviewCourses';
import ReviewLearners from './templates/ReviewLearners/ReviewLearners';
import ReviewProgress from './templates/ReviewProgress/ReviewProgress';
import UpdateCompletion from './templates/UpdateCompletion/UpdateCompletion';
import UpdateLearners from './templates/UpdateLearners/UpdateLearners';
import UpdateLearnersInfo from './templates/UpdateLearnersInfo/UpdateLearnersInfo';
import UploadDiplomaCodes from './templates/UploadDiplomaCodes/UploadDiplomaCodes';
import UploadCoursesCatalogue from './templates/UploadCoursesCatalogue/UploadCoursesCatalogue';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/upload-course-codes" element={<UploadCourseCodes />} />
        <Route path="/upload-diploma-codes" element={<UploadDiplomaCodes />} />
        <Route path="/upload-courses-catalogue" element={<UploadCoursesCatalogue />} />
        <Route path="/review-courses" element={<ReviewCourses />} />
        <Route path="/review-learners" element={<ReviewLearners />} />
        <Route path="/review-progress" element={<ReviewProgress />} />
        <Route path="/update-completion" element={<UpdateCompletion />} />
        <Route path="/update-learners" element={<UpdateLearners />} />
        <Route path="/update-learners-info" element={<UpdateLearnersInfo />} />
      </Routes>
    </div>
  );
}

export default App;
