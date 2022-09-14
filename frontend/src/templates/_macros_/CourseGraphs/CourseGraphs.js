import {
  PieChart, Pie, ResponsiveContainer, Sector,
} from 'recharts';
import React, { useState, useEffect } from 'react';
import getCourseCatalogueData from '../../../controllers/Graphs/getCourseGraphs';

import './CourseGraphs.css';

function CourseGraphs() {
  const [certificates, setCertificates] = useState(0);
  const [diplomas, setDiplomas] = useState(0);

  // only calls api once
  useEffect(() => {
    const getDataFromApi = () => {
      getCourseCatalogueData().then((response) => {
        // sets certificate total and diploma total
        setCertificates(response.certificates);
        setDiplomas(response.diplomas);
      });
    };
    getDataFromApi();
  }, []);

  // data for pie charts
  const data = [
    { name: 'Diplomas', value: diplomas, fill: '#034FF1' },
    { name: 'Certificates', value: certificates, fill: '#0F7202' },
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
    const total = certificates + diplomas;
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
      <ResponsiveContainer height="100%" width="100%">
        <PieChart>
          <Pie
            data={data}
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
    </div>
  );
}

export default CourseGraphs;
