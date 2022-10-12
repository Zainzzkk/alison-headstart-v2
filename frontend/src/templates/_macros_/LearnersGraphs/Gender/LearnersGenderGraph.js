import {
  PieChart, Pie, ResponsiveContainer, Sector,
} from 'recharts';
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useCurrentPng } from 'recharts-to-png';
import FileSaver from 'file-saver';

import getLearnersGenderData from '../../../../controllers/Graphs/getLearnerGenderGraph';

import './LearnersGenderGraph.css';

function LearnersGenderGraph(props) {
  // default props to remove errors
  LearnersGenderGraph.defaultProps = {
    data: [],
  };
  LearnersGenderGraph.propTypes = {
    data: PropTypes.array, // eslint-disable-line
  };

  const { data } = props;

  const [males, setMales] = useState(0);
  const [females, setFemales] = useState(0);
  const [getPng, { ref, isLoading }] = useCurrentPng();

  const handleDownload = useCallback(async () => {
    const png = await getPng();

    // Verify that png is not undefined
    if (png) {
      // Download with FileSaver
      FileSaver.saveAs(png, `gender-chart.png`);
    }
  }, [getPng]);

  useEffect(() => {
    // processes gender data into males and females
    const processGraphData = () => {
      const genders = getLearnersGenderData(data);

      setMales(genders.males);
      setFemales(genders.females);
    };

    processGraphData();
  }, []);

  // data for pie charts
  const pieChartData = [
    { name: 'Male', value: males, fill: '#034FF1' },
    { name: 'Female', value: females, fill: '#0F7202' },
  ];

  // renders the outer label and line
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    name,
    value,
  }) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    // calculates the percentage
    const total = males + females;
    const percentage = (value / total) * 100;
    return (
      <g>
        {/* For line around the outside */}
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          paddingAngle={20}
          fill={fill}
        />
        {/* for the line and dot arrow thing */}
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        {/* the text */}
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill={fill}>
          {`${(name)} - ${percentage.toFixed(0)}%`}
        </text>
      </g>
    );
  };

  return (
    <div className="pie-chart">
      <ResponsiveContainer height="90%" width="90%">
        <PieChart
          ref={ref}
        >
          <Pie
            data={pieChartData}
            dataKey="value"
            cx={400}
            cy={275}
            outerRadius={150}
            paddingAngle={2}
            fill="#8884d8"
            label={renderCustomizedLabel}
          />
        </PieChart>
      </ResponsiveContainer>

      <button type="button" onClick={handleDownload}>
        {isLoading ? 'Downloading...' : 'Download Chart'}
      </button>
    </div>
  );
}

export default LearnersGenderGraph;
