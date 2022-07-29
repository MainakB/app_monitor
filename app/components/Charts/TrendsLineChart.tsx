import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";
import { formatXAxis } from "~/lib";

import { CHARTCOLORS } from "~/data/constants/colors";

interface ItrendLineChartProps {
  data: any[] | null;
  legendsList: string[];
}
export const TrendLineChart = ({ data, legendsList }: ItrendLineChartProps) => {
  let dataToUse;
  const [hide, setHide] = useState<string[]>([]);
  const isBuildUnAvailable = !data || !data.length;

  const handleLegendsClick = (typesList: string[]) => (event: any) => {
    let value =
      event.dataKey === "All"
        ? hide.includes(event.dataKey)
          ? []
          : ["All", ...typesList]
        : hide.includes(event.dataKey)
        ? hide.length === 2 && hide.includes("All")
          ? []
          : hide.filter((datakey) => event.dataKey !== datakey)
        : [...hide, event.dataKey, "All"];

    setHide(value);
  };

  if (!isBuildUnAvailable) {
    dataToUse = data;
  }

  return (
    <div style={{ width: "100%" }}>
      {data ? (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            width={500}
            height={300}
            data={dataToUse}
            margin={{
              top: 15,
              right: 50,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis
              dataKey="created_date"
              tickFormatter={formatXAxis}
              tick={{ fontSize: 12 }}
            />
            <YAxis domain={[0, 100]} tickLine={false} tick={{ fontSize: 12 }}>
              <Label
                position="insideLeft"
                offset={10}
                angle={-90}
                style={{ textAnchor: "middle", fontWeight: "bold" }}
              />
            </YAxis>
            <Tooltip
              labelStyle={{
                fontWeight: "bold",
                opacity: "0.75",
                fontSize: "0.9em",
              }}
              contentStyle={{
                borderRadius: 8,
                backgroundColor: "#FBFBFB",
                fontSize: "0.8em",
              }}
              formatter={(value: string | number, name: string, props: any) =>
                `${value}%`
              }
            />
            <Legend
              iconType="circle"
              iconSize={10}
              onClick={handleLegendsClick(legendsList)}
              wrapperStyle={{
                padding: "5px 0px 5px 50px",
              }}
            />

            {["All", ...legendsList].map((id: string, idx: number) => {
              return (
                <Line
                  connectNulls
                  isAnimationActive={false}
                  type="monotone"
                  dot={{ fill: CHARTCOLORS[idx] }}
                  stroke={CHARTCOLORS[idx]}
                  key={`line_${id}`}
                  dataKey={`${id}`}
                  activeDot={{ r: 1 }}
                  hide={hide.includes(id)}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      ) : null}
    </div>
  );
};