import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import { NoDataInRootTableMessage } from "~/pages/NoData";

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy * 0.95} dy={8} textAnchor="middle" fill={payload.fill}>
        {payload.name}
      </text>
      <text x={cx} y={cy * 0.95} dy={25} textAnchor="middle" fill="#000">
        {`(Total: ${payload.count})`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={payload.fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={payload.fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={payload.fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={payload.fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill={payload.fill}
      >
        {value}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill={payload.fill}
      >
        {`(Passing: ${(value * 100) / payload.count}%)`}
      </text>
    </g>
  );
};

export const AllJobsTestAnalyticsPie = (props: any) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return !props.data ? (
    <div className="error-message all-reports ds-jobs-pie">
      <NoDataInRootTableMessage
        key="allReports_dspie"
        headers={{ job_name: "Job Name" }}
        jobString="test case"
        parentType="segment"
      />
    </div>
  ) : (
    <ResponsiveContainer width={"99%"} height={285}>
      <PieChart width={800} height={400}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={props.data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          //   fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
