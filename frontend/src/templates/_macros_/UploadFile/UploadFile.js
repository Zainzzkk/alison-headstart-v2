import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsCloudUpload } from 'react-icons/bs';
import { FcUpload } from 'react-icons/fc';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './UploadFile.css';

import { open, uploadFileToApi } from '../../../controllers/UploadFiles';

function UploadFile(props) {
  // default props to remove errors
  UploadFile.defaultProps = {
    uploadType: null,
  };
  UploadFile.propTypes = {
    uploadType: PropTypes.string,
  };

  // state constants for buttons and file contents
  const [hasFile, setHasFile] = useState(false);
  const [fileContents, setFileContents] = useState(null);
  const [hasUploaded, setHasUploaded] = useState(null);
  const [inputLearnerID, setInputLearnerID] = useState('');
  const [inputCourseID, setInputCourseID] = useState('');
  const [inputCourseName, setInputCourseName] = useState('');
  const [inputCompletion, setInputCompletion] = useState('');
  const [inputTime, setInputTime] = useState('');
  const [inputType, setInputType] = useState('');
  const [inputStatus, setInputStatus] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [trackerModalShow, setTrackerModalShow] = useState(false);

  const { uploadType } = props;

  // uploads files by dropping or uploading and sets hasFile and fileContents to values
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.error('file reading was aborted');
      reader.onerror = () => console.error('file reading has failed');
      reader.onload = async () => {
        // converts file to binary version which can be read to open
        const binaryStr = reader.result;
        // opens file and returns data
        const fileContentsOpened = await open(binaryStr);

        if (fileContentsOpened) {
          setHasFile(true);
          setFileContents(fileContentsOpened);
        }
      };

      reader.readAsArrayBuffer(file);
    });
  }, []);

  // uploads file to database on button click
  const uploadFilesToDB = async () => {
    uploadFileToApi(fileContents, uploadType).then((response) => {
      if (uploadType === 'learners-stats') {
        console.log(response);
      }
      // sets response status message
      setHasUploaded(response.message);
    });
  };

  let uploadButton;
  let uploadStatus;

  const onManualInputSubmit = async () => {
    const courseToUpload = {
      'IIUK ID': inputLearnerID,
      'Course ID': inputCourseID,
      'Course Name': inputCourseName,
      Completed: inputCompletion,
      'Total Duration': inputTime,
    };
    uploadFileToApi(courseToUpload, 'course-completion-manual').then((response) => {
      console.log(response);
      // sets response status message
      setHasUploaded(response.message);
    });
    setModalShow(false);

    if (hasUploaded) {
      uploadStatus = (
        <div className="upload-status">
          Upload status:
          {' '}
          {hasUploaded}
          !
        </div>
      );
    }
  };

  // manual upload of certificate tracker info
  const onManualInputTrackerSubmit = async () => {
    const trackerToUpload = {
      LearnerID: inputLearnerID,
      CourseID: inputCourseID,
      CourseName: inputCourseName,
      Time: inputTime,
      Completion: inputCompletion,
      Code: inputCode,
      Status: inputStatus,
      Type: inputType,
    };

    uploadFileToApi(trackerToUpload, 'insert-certificate-tracker-manual').then((response) => {
      console.log(response);
      // sets response status message
      setHasUploaded(response.message);
    });
    // hides once has response back
    setTrackerModalShow(false);
    // shows upload status
    if (hasUploaded) {
      uploadStatus = (
        <div className="upload-status">
          Upload status:
          {' '}
          {hasUploaded}
          !
        </div>
      );
    }
  };

  // if file uploaded then shows button which can upload to db
  if (hasFile) {
    uploadButton = (
      <div className="upload-div">
        <IconButton aria-label="upload" onClick={() => uploadFilesToDB()}>
          <BsCloudUpload className="upload-button" />
        </IconButton>
      </div>
    );

    // if has a response from database then prints status
    if (hasUploaded) {
      uploadStatus = (
        <div className="upload-status">
          Upload status:
          {' '}
          {hasUploaded}
          !
        </div>
      );
    }
  } else {
    uploadButton = '';
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      {uploadType}
      <div>
        <Button variant="upload" {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Either drag or drop files here</p>
        </Button>
      </div>
      {uploadButton}
      {uploadStatus}

      {uploadType === 'course-completion'
        ? (
          <div className="course-input-div">
            <form>
              <label htmlFor="learner-id">
                Learner ID:
                <input type="text" id="learner-id" value={inputLearnerID} onChange={(event) => setInputLearnerID(event.target.value)} />
              </label>

              <label htmlFor="course-id">
                Course ID:
                <input type="text" id="course-id" value={inputCourseID} onChange={(event) => setInputCourseID(event.target.value)} />
              </label>

              <label htmlFor="course-name">
                Course Name:
                <input type="text" id="course-name" value={inputCourseName} onChange={(event) => setInputCourseName(event.target.value)} />
              </label>

              <label htmlFor="completion">
                Completion:
                <input type="text" id="completion" value={inputCompletion} onChange={(event) => setInputCompletion(event.target.value)} />
              </label>

              <label htmlFor="time">
                Time (in seconds):
                <input type="text" id="time" value={inputTime} onChange={(event) => setInputTime(event.target.value)} />
              </label>

              <IconButton onClick={() => setModalShow(true)}>
                <FcUpload />
              </IconButton>

              <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setModalShow(false)}
              >
                <Modal.Header closeButton onClick={() => setModalShow(false)}>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Confirm upload
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                  <h4>Please review and click confirm to send to db</h4>
                  <p className="firstModalItem">
                    Learner ID:
                    {' '}
                    {inputLearnerID}
                  </p>
                  <p>
                    Course ID:
                    {' '}
                    {inputCourseID}
                  </p>
                  <p>
                    Course Name:
                    {' '}
                    {inputCourseName}
                  </p>
                  <p>
                    Completion:
                    {' '}
                    {inputCompletion}
                  </p>
                  <p>
                    Time (in seconds):
                    {' '}
                    {inputTime}
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="confirm-button" onClick={() => onManualInputSubmit()}>Confirm</Button>
                  <Button onClick={() => setModalShow(false)}>Cancel</Button>
                </Modal.Footer>
              </Modal>
            </form>
          </div>
        ) : null}

      {uploadType === 'insert-certificate-tracker'
        ? (
          <div className="course-input-div">
            <form>
              <div>
                <label htmlFor="learner-id">
                  Learner ID:
                  <input type="text" id="learner-id" value={inputLearnerID} onChange={(event) => setInputLearnerID(parseInt(event.target.value, 10))} />
                </label>

                <label htmlFor="course-id">
                  Course ID:
                  <input type="text" id="course-id" value={inputCourseID} onChange={(event) => setInputCourseID(parseInt(event.target.value, 10))} />
                </label>

                <label htmlFor="course-name">
                  Course Name:
                  <input type="text" id="course-name" value={inputCourseName} onChange={(event) => setInputCourseName(event.target.value)} />
                </label>

                <label htmlFor="type">
                  Type:
                  <input type="text" id="type" value={inputType} onChange={(event) => setInputType(event.target.value)} />
                </label>
              </div>

              <div className="second-row">
                <label htmlFor="completion">
                  Completion:
                  <input type="text" id="completion" value={inputCompletion} onChange={(event) => setInputCompletion(parseInt(event.target.value, 10))} />
                </label>

                <label htmlFor="time">
                  Time (in seconds):
                  <input type="text" id="time" value={inputTime} onChange={(event) => setInputTime(parseInt(event.target.value, 10))} />
                </label>

                <label htmlFor="type">
                  Status:
                  <input type="text" id="type" value={inputStatus} onChange={(event) => setInputStatus(event.target.value)} />
                </label>

                <label htmlFor="code">
                  Code:
                  <input type="text" id="code" value={inputCode} onChange={(event) => setInputCode(event.target.value)} />
                </label>
              </div>

              <IconButton onClick={() => setTrackerModalShow(true)}>
                <FcUpload />
              </IconButton>

              <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setModalShow(false)}
              >
                <Modal.Header closeButton onClick={() => setModalShow(false)}>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Confirm upload
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                  <h4>Please review and click confirm to send to db</h4>
                  <p className="firstModalItem">
                    Learner ID:
                    {' '}
                    {inputLearnerID}
                  </p>
                  <p>
                    Course ID:
                    {' '}
                    {inputCourseID}
                  </p>
                  <p>
                    Course Name:
                    {' '}
                    {inputCourseName}
                  </p>
                  <p>
                    Completion:
                    {' '}
                    {inputCompletion}
                  </p>
                  <p>
                    Time (in seconds):
                    {' '}
                    {inputTime}
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="confirm-button" onClick={() => onManualInputSubmit()}>Confirm</Button>
                  <Button onClick={() => setModalShow(false)}>Cancel</Button>
                </Modal.Footer>
              </Modal>

              <Modal
                show={trackerModalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setTrackerModalShow(false)}
              >
                <Modal.Header closeButton onClick={() => setTrackerModalShow(false)}>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Confirm manual upload
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                  <h4>Please review and click confirm to send to db</h4>
                  <p className="firstModalItem">
                    Learner ID:
                    {' '}
                    {inputLearnerID}
                  </p>
                  <p>
                    Course ID:
                    {' '}
                    {inputCourseID}
                  </p>
                  <p>
                    Course Name:
                    {' '}
                    {inputCourseName}
                  </p>
                  <p>
                    Type:
                    {' '}
                    {inputType}
                  </p>
                  <p>
                    Completion:
                    {' '}
                    {inputCompletion}
                  </p>
                  <p>
                    Time(in seconds):
                    {' '}
                    {inputTime}
                  </p>
                  <p>
                    Status:
                    {' '}
                    {inputStatus}
                  </p>
                  <p>
                    Code:
                    {' '}
                    {inputCode}
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="confirm-button" onClick={() => onManualInputTrackerSubmit()}>Confirm</Button>
                  <Button onClick={() => setModalShow(false)}>Cancel</Button>
                </Modal.Footer>
              </Modal>
            </form>
          </div>
        ) : null}
    </div>
  );
}

export default UploadFile;
