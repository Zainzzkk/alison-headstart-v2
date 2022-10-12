import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbarExport } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import getSpreadSheetDatafromData from '../../../controllers/Spreadsheet';

import './Spreadsheet.css';

function CustomToolbar() {
  return (
    <GridToolbarExport sx={{ height: '5vh' }} />
  );
}

function Spreadsheet(props) {
  // default props to remove errors
  Spreadsheet.defaultProps = {
    whichSheet: null,
    data: [],
  };
  Spreadsheet.propTypes = {
    whichSheet: PropTypes.string,
    data: PropTypes.array, // eslint-disable-line
  };

  // defines which sheet to process and data
  const { whichSheet, data } = props;

  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  // useEffect so only called once instead of spamming
  useEffect(() => {
    const getDataFromController = () => {
      const response = getSpreadSheetDatafromData(whichSheet, data);
      // populates rows and columns if they exist
      if (response.rows) {
        setRows(response.rows);
      }
      if (response.columns) {
        setColumns(response.columns);
      }
    };

    getDataFromController();
  }, []);

  // to hide id column only on completion spreadsheets
  const columnVisibilityModel = {
    id: false,
  };

  return (
    <div>
      <div style={{ height: '60vh', width: '95vw' }} className="spreadsheet">
        <DataGrid
          rows={rows}
          columns={columns}
          columnVisibilityModel={
            (
              whichSheet.includes('completion') || whichSheet === 'seventy' || whichSheet === 'ninety'
            ) ? columnVisibilityModel : {}
          }
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </div>
    </div>
  );
}

export default Spreadsheet;
