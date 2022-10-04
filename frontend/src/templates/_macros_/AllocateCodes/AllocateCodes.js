import React, { useState, useEffect } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import DeleteIcon from '@mui/icons-material/Delete';

import findNotAllocated from '../../../helpers/findNotAllocated';
import convertSecondsToTimestamp from '../../../helpers/convertSecondsToTimestamp';
import getTotalCertificatesUser from '../../../helpers/getTotalCertificatesUser';
import allocateCodeController from '../../../controllers/Completion/allocateCode';
import unallocate from '../../../controllers/Completion/unallocate';
import determineCourseType from '../../../helpers/getCourseType';

import './AllocateCodes.css';

function AllocateCodes(props) {
  // default props to remove errors
  AllocateCodes.defaultProps = {
    data: [],
  };
  AllocateCodes.propTypes = {
    data: PropTypes.array, // eslint-disable-line
  };

  const { data } = props;

  const [rows, setRows] = useState([]);
  const [emailShow, setEmailShow] = useState(false);
  const [emailData, setEmailData] = useState({});

  // controller for email button
  const makeEmail = (rowToAllocate) => {
    const { row: rowToChange } = rowToAllocate;

    return (
      // if code exists for allocation (if not blank or error)
      rowToChange.code !== '' && rowToChange.code !== 'error'
        ? (
          <Button
            variant="contained"
            onClick={async () => {
              setEmailShow(true);
              // sets email data to row
              setEmailData(rowToChange);
            }}
          >
            Email
          </Button>
        )
        : null
    );
  };

  // handles button for allocating code
  const allocateCode = (rowToAllocate) => {
    const { row: rowToChange } = rowToAllocate;

    return (
      // if YES selected for allocation
      rowToChange.status === 'YES'
        ? (
          <Button
            variant="contained"
            onClick={() => {
              // allocates codes in controller and adds to row
              allocateCodeController(rowToChange).then((result) => {
                // copy of rows array
                const changedRows = [...rows];
                // finds index for row in question in state rows
                const rowIndex = changedRows.findIndex((eachRow) => eachRow.id === rowToChange.id && eachRow.learnerid === rowToChange.learnerid);
                // allocates code to array copy
                changedRows[rowIndex].code = result;
                // changes status
                changedRows[rowIndex].status = 'ALLOCATED';
                // overwrites row with change
                setRows(changedRows);
              });
            }}
          >
            Allocate
          </Button>
        )
        : null
    );
  };

  // columns for ID
  const columns = [
    { field: 'id' },
    { field: 'learnerid', headerName: 'Learner ID', width: 100 },
    { field: 'courseid', headerName: 'Course ID', width: 100 },
    { field: 'coursename', headerName: 'Course Name', width: 500 },
    { field: 'time', headerName: 'Time', width: 125 },
    { field: 'numcourses', headerName: 'Num of Courses', width: 125 },
    {
      field: 'status',
      headerName: 'Status',
      editable: true,
      width: 200,
      type: 'singleSelect',
      // options for drop down
      valueOptions: ['YES', 'UNWANTED', 'NO AS MAX RECEIVED', 'UNSURE'],
    },
    { field: 'code', headerName: 'Code', width: 250 },
    {
      field: 'submit',
      headerName: 'Submit',
      width: 150,
      // renders button for allocation
      renderCell: allocateCode,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
      // renders button for email template
      renderCell: makeEmail,
    },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            // to unallocate code
            unallocate(params.row).then((response) => {
              // if successful gets this message back as response
              if (response.message === 'Unallocated the course tracker successfully') {
                // copy of rows
                const changedRows = [...rows];
                const rowIndex = changedRows.findIndex((eachRow) => eachRow.id === params.row.id && eachRow.learnerid === params.row.learnerid);
                // removes code from state row
                changedRows[rowIndex].code = '';
                // changes status to unsure
                changedRows[rowIndex].status = 'UNSURE';
                // overwrites state
                setRows(changedRows);
              }
            });
          }}
        />,
      ],
    },
  ];

  useEffect(() => {
    const getDataFromController = () => {
      // finds unallocated from all tracker (includes those which are allocated)
      const unallocated = findNotAllocated(data);
      const rowsToAdd = [];

      // for id and ignored
      let counter = 0;

      unallocated.forEach((completion) => {
        const completionToAdd = {
          id: counter,
          learnerid: completion.LearnerID,
          courseid: completion.CourseID,
          coursename: completion.CourseName,
          // total number of codes allocated to user
          numcourses: getTotalCertificatesUser(data, completion.LearnerID),
          time: convertSecondsToTimestamp(completion.Time),
          status: '',
          code: '',
          submit: '',
          email: '',
        };
        rowsToAdd.push(completionToAdd);
        // add to counter so unique
        counter += 1;
      });

      // populates rows if they exist
      if (rowsToAdd) {
        setRows(rowsToAdd);
      }
    };

    getDataFromController();
  }, []);

  // hides id field as not needed
  const columnVisibilityModel = {
    id: false,
  };

  return (
    <div>
      <div style={{ height: '60vh', width: '95vw' }} className="spreadsheet">
        <DataGrid rows={rows} columns={columns} columnVisibilityModel={columnVisibilityModel} />
        <Modal
          show={emailShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={() => {
            setEmailShow(false);
            // removes email data
            setEmailData({});
          }}
        >
          <Modal.Header
            closeButton
            onClick={() => {
              setEmailShow(false);
              setEmailData({});
            }}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              Email template
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <h4>Copy and paste below email</h4>
            <div className="email-text">
              <br />
              Email Address:
              <br />
              Subject: Alison course completion
              <br />
              <br />
              Dear ,
              <br />
              <br />
              On behalf of AKEB Headstart we would like to offer our mubaraki&apos;s in your successful completion of the following course:
              <br />

              <b>
                {emailData.coursename}
              </b>
              <br />

              <br />
              We would like to offer you a code to redeem your certificate for no cost.
              <br />
              <b>
                Code:
                {' '}
                {emailData.code}
              </b>
              <br />
              <br />
              Please note that this code is only for a digital
              {' '}
              {determineCourseType(emailData.coursename)}
              .
              <br />
              <br />
              I have attached a how-to-guide to help you with the process.
              <br />
              <br />
              If you have any issues redeeming your certificate, please email us here and we will get back to you within 72hrs. Please do not contact Alison directly.
              <br />
              <br />
              We also request that you please fill in this survey regarding the course you have just completed which can be found here : https://survey.iiuk.org/index.php/176183
              <br />
              <br />
              We wish you the best of luck with this.
              <br />
              <br />

              Kind regards,
              <br />
              Headstart Team - Alison online courses
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="close"
              onClick={() => {
                setEmailShow(false);
                setEmailData({});
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AllocateCodes;
