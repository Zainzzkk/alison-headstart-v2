import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import getTotalStarted from '../../../../controllers/LearnersStats/getTotalStarted';

import './TotalLoggedIn.css';

function TotalLoggedIn(props) {
  // default props to remove errors
  TotalLoggedIn.defaultProps = {
    data: [],
  };
  TotalLoggedIn.propTypes = {
    data: PropTypes.array, // eslint-disable-line
  };

  const { data } = props;

  const [totalLoggedIn, setTotalLoggedIn] = useState('');
  const [totalStarted, setTotalStarted] = useState('');

  useEffect(() => {
    setTotalLoggedIn(data.length);
    // gets average time string from data
    const totalStartedCalculated = getTotalStarted(data);

    // if equal then no need to set
    if (!_.isEqual(totalStartedCalculated, totalStarted)) {
      setTotalStarted(totalStartedCalculated);
    }
  });

  return (
    <div>
      <div className="totals">
        Total logged in:
        {' '}
        {totalLoggedIn}
      </div>
      <div className="totals">
        Total started:
        {' '}
        {totalStarted}
      </div>
    </div>
  );
}

export default TotalLoggedIn;
