import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import Button from 'react-bootstrap/Button';
import './UploadFile.css';

function UploadFile() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <Button variant="primary">
        <input {...getInputProps()} />
        <p>Either drag or drop files here</p>
      </Button>

    </div>
  );
}

export default UploadFile;
