import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsCloudUpload } from 'react-icons/bs';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';

import Button from 'react-bootstrap/Button';
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
          console.log('aaaaaa');
        }
      };

      reader.readAsArrayBuffer(file);
    });
  }, []);

  // uploads file to database on button click
  const uploadFilesToDB = async () => {
    uploadFileToApi(fileContents, uploadType).then((response) => {
      // sets response status message
      setHasUploaded(response.message);
    });
  };

  let uploadButton;
  let uploadStatus;

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
    </div>
  );
}

export default UploadFile;
