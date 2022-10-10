import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import _ from 'lodash';
import PropTypes from 'prop-types';

import getJamatKhanaGraph from '../../../../controllers/Graphs/getJamatKhanaGraph';
import processJamatkhanaGraphData from '../../../../helpers/processJamatkhanaGraphData';
import { EUROPE_CITIES } from '../../../../constants';

import './JamatkhanaGraph.css';

function JamatkhanaGraph(props) {
  // default props to remove errors
  JamatkhanaGraph.defaultProps = {
    data: [],
  };
  JamatkhanaGraph.propTypes = {
    data: PropTypes.array, // eslint-disable-line
  };

  const { data } = props;

  const [jamatkhanaCount, setJamatkhanaCount] = useState({});
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
      <text y={y} fill="#666" dy={10}>
        {/* x gives position of label on end of bar */}
        <tspan x={1.05 * x + width} className="label-size">
          percentage:
          {value}
        </tspan>
        {/* dy 25 so total is below percentage */}
        <tspan x={1.05 * x + width} dy={25} className="label-size">
          total:
          {barData[index].number}
        </tspan>
      </text>
    );
  };

  useEffect(() => {
    // populates totals for each jk
    const counts = getJamatKhanaGraph(data);

    if (!_.isEqual(counts, jamatkhanaCount)) {
      setJamatkhanaCount({ ...counts });
    }

    // sets flag for true so does not render infinitely
    setProcessed(true);
  });

  // only if processed and data present
  if (jamatkhanaCount && processed) {
    const dataToAdd = processJamatkhanaGraphData(jamatkhanaCount, EUROPE_CITIES, 'graph');

    if (!processedData) {
      // adds to state
      dataToAdd.forEach((eachData) => {
        addToBarArray(eachData);
      });
      setProcessedData(true);
    }
  }

  return (
    <div className="bar-chart">
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={1200}
          height={300}
          data={barData}
          layout="vertical"
          barCategoryGap={10}
          margin={{
            top: 10,
            right: 50,
            left: 50,
            bottom: 30,
          }}
        >
          <XAxis type="number">
            <Label value="Percentage" dy={30} />
          </XAxis>
          <YAxis dataKey="name" type="category" width={150}>
            <Label value="Jamatkhana" angle={-90} dx={-100} />
          </YAxis>
          <Tooltip />
          <Bar dataKey="percentage" label={renderCustomBarLabel}>
            {
              barData.map((entry) => (
                <Cell key={`cell-${entry.id}`} fill={EUROPE_CITIES.includes(entry.name) ? '#99ff99' : '#339933'} />
              ))
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default JamatkhanaGraph;
