/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */
import React, { PureComponent } from "react";
import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "07-26-2022",
    qa: 30,
    dev: 90,
    preprod: 50,
    prod: 100,
  },
  {
    name: "07-27-2022",
    qa: 25,
    dev: 83,
    preprod: 100,
    prod: 90,
  },
  {
    name: "07-28-2022",
    qa: 85,
    dev: 15,
    preprod: 88,
    prod: 0,
  },
  {
    name: "07-29-2022",
    qa: 30,
    dev: 90,
    preprod: 50,
    prod: 100,
  },
  {
    name: "07-30-2022",
    qa: 30,
    dev: 90,
    preprod: 50,
    prod: 100,
  },
  {
    name: "08-01-2022",
    qa: 0,
    dev: 0,
    preprod: 77,
    prod: 96,
  },
  {
    name: "08-02-2022",
    qa: 0,
    dev: 10,
    preprod: 40,
    prod: 20,
  },
];

const CustomizedLabel = (props: any) => {
  const { x, y, stroke, value } = props;

  return (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
      {value}
    </text>
  );
};

const CustomizedAxisTick = (props: any) => {
  const { x, y, stroke, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
};

export const StackedAreaChart = () => {
  return (
    <div style={{ width: "800px" }}>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 15,
            right: 50,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis
            dataKey="name"
            // tick={<CustomizedAxisTick />}
            tick={{ fontSize: 14 }}
            // tickFormatter={(unixTime) => moment(unixTime).format("HH:mm")}
          />
          <YAxis domain={[0, 100]} tickLine={false} tick={{ fontSize: 14 }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="qa"
            stroke="#8884d8"
            // label={<CustomizedLabel />}
          />
          <Line type="monotone" dataKey="dev" stroke="#82ca9d" />
          <Line type="monotone" dataKey="preprod" stroke="#bac74a" />
          <Line type="monotone" dataKey="prod" stroke="#ce59af" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
