import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import getAverageCourseTime from '../../../../controllers/LearnersStats/getAverageCourseTime';

import './AverageCourseTime.css';

function AverageCourseTime(props) {
  // default props to remove errors
  AverageCourseTime.defaultProps = {
    data: [],
  };
  AverageCourseTime.propTypes = {
    data: PropTypes.array, // eslint-disable-line
  };

  const { data } = props;

  const [averageTime, setAverageTime] = useState('');

  useEffect(() => {
    // gets average time string from data
    const averageTimeCalculated = getAverageCourseTime(data);

    // if equal then no need to set
    if (!_.isEqual(averageTimeCalculated, averageTime)) {
      setAverageTime(averageTimeCalculated);
    }
  });
  console.log('AAAAAA');
  return (
    <div className="average-time">
      Average course time:
      {' '}
      {averageTime}
    </div>
  );
}

export default AverageCourseTime;
