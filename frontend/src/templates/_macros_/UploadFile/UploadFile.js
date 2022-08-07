import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import Button from 'react-bootstrap/Button';
import './UploadFile.css';

import open from '../../../controllers/UploadFiles';

function UploadFile() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = async () => {
        // converts file to binary version which can be read to open
        const binaryStr = reader.result;
        // opens file and returns data
        const fileContents = await open(binaryStr);
        console.log(fileContents);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <Button variant="upload">
        <input {...getInputProps()} />
        <p>Either drag or drop files here</p>
      </Button>

    </div>
  );
}

export default UploadFile;
