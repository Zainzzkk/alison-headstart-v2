import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import getSpreadSheetDatafromApi from '../../../controllers/Spreadsheet';

import './Spreadsheet.css';

function Spreadsheet(props) {
  // default props to remove errors
  Spreadsheet.defaultProps = {
    whichSheet: null,
  };
  Spreadsheet.propTypes = {
    whichSheet: PropTypes.string,
  };

  // defines which api to call
  const { whichSheet } = props;

  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  // useEffect so only called once instead of spamming
  useEffect(() => {
    const getDataFromApi = () => {
      getSpreadSheetDatafromApi(whichSheet).then((response) => {
        // if rows then populate rows
        if (response.rows) {
          setRows(response.rows);
        }
        // if columns then populate columns
        if (response.columns) {
          setColumns(response.columns);
        }
      });
    };

    getDataFromApi();
  }, []);

  return (
    <div>
      {whichSheet}
      <div style={{ height: '60vh', width: '80vw' }} className="spreadsheet">
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
}

export default Spreadsheet;
