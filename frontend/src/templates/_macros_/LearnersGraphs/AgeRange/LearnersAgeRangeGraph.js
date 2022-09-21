import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';

import getLeanerAgeRangeGraph from '../../../../controllers/Graphs/getLearnerAgeRangeGraph';
import processAgeRangeGraphData from '../../../../helpers/processAgeRangeGraphData';

import './LearnersAgeRangeGraph.css';

function LearnersAgeRangeGraph(props) {
  // default props to remove errors
  LearnersAgeRangeGraph.defaultProps = {
    data: [],
  };
  LearnersAgeRangeGraph.propTypes = {
    data: PropTypes.array, // eslint-disable-line
  };

  const { data } = props;

  const [ageRanges, setAgeRanges] = useState({});
  const [barData, setBarData] = useState([]);
  const [processed, setProcessed] = useState(false);
  const [processedData, setProcessedData] = useState(false);

  // adds to state array for barData for graph
  const addToBarArray = (bar) => {
    // pushes to end of array
    setBarData(barData => [...barData, bar]); // eslint-disable-line
  };

  // adds label for bar graph on end with total and percentage
  const renderCustomBarLabel = ({
    x,
    y,
    width,
    value,
    index,
  }) => { // eslint-disable-line
    return (
      <text y={y} fill="#666" dy={23}>
        {/* x gives position of label on end of bar */}
        <tspan x={1.1 * x + width}>
          percentage:
          {value}
        </tspan>
        {/* dy 25 so total is below percentage */}
        <tspan x={1.1 * x + width} dy={25}>
          total:
          {barData[index].number}
        </tspan>
      </text>
    );
  };

  useEffect(() => {
    // processes gender data into males and females
    const ageRange = getLeanerAgeRangeGraph(data);
    // adds age range to array
    setAgeRanges({ ...ageRange });
    // sets flag for true so does not render infinitely
    setProcessed(true);
  }, []);

  // if ageRanges exists and has completed processing array
  if (ageRanges && processed) {
    // populates array with values for bar graph
    const dataToAdd = processAgeRangeGraphData(ageRanges);

    // if has not happened before
    if (!processedData) {
      // adds to state
      dataToAdd.forEach((eachData) => {
        addToBarArray(eachData);
      });
      // sets to true once completed processing data for bar graph
      setProcessedData(true);
    }
  }

  return (
    <div className="bar-chart">
      <ResponsiveContainer width="90%" height="90%">
        <BarChart
          width={600}
          height={300}
          data={barData}
          layout="vertical"
          barCategoryGap={10}
          margin={{
            top: 10,
            right: 200,
            left: 20,
            bottom: 30,
          }}
        >
          <XAxis type="number">
            <Label value="Percentage" dy={30} />
          </XAxis>
          <YAxis dataKey="name" type="category" width={150}>
            <Label value="Age Range" angle={-90} dx={-30} />
          </YAxis>
          <Tooltip />
          <Bar dataKey="percentage" fill="#339933" label={renderCustomBarLabel} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LearnersAgeRangeGraph;
