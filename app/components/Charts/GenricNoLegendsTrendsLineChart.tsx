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

interface IGenricNoLegendsTrendsLineChartProps {
  data: any[] | null;
  dataKeyXAxes: string;
  dataKeyYAxes: string;
  formatterUnit: string;
  domainValue: number[];
}
export const GenricNoLegendsTrendsLineChart = ({
  data,
  dataKeyXAxes,
  formatterUnit,
  dataKeyYAxes,
  domainValue,
}: IGenricNoLegendsTrendsLineChartProps) => {
  let dataToUse;
  
  const isBuildUnAvailable = !data || !data.length;

  if (!isBuildUnAvailable) {
    dataToUse = data;
  }

  return (
    <div style={{ width: "100%" }}>
      {dataToUse ? (
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
              dataKey={dataKeyXAxes}
              tickFormatter={formatXAxis}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              domain={domainValue}
              tickLine={false}
              tick={{ fontSize: 12 }}
            >
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
                `${value}${formatterUnit || ""}`
              }
            />

            <Line
              connectNulls
              isAnimationActive={false}
              type="monotone"
              dot={{ fill: "#8884d8" }}
              stroke="#8884d8"
              dataKey={dataKeyYAxes}
              activeDot={{ r: 1 }}
              // hide={hide.includes(id)}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : null}
    </div>
  );
};
