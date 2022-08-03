import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  ResponsiveContainer,
  LabelList,
} from "recharts";

interface IGenricNoLegendsBarChartProps {
  data: any[] | null;
  dataKeyXAxes: string;
  dataKeyYAxes: string;
  formatterUnit: string;
  domainValue: number[];
  labelDataKey?: string;
  hasLabel?: boolean;
}
export const GenricNoLegendsBarChart = ({
  data,
  dataKeyXAxes,
  formatterUnit,
  dataKeyYAxes,
  domainValue,
  labelDataKey,
  hasLabel,
}: IGenricNoLegendsBarChartProps) => {
  let dataToUse;

  const isBuildUnAvailable = !data || !data.length;

  if (!isBuildUnAvailable) {
    dataToUse = data;
  }

  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, height, value, fill } = props;
    const radius = 10;
    console.log("Value123", props);
    return (
      <g>
        <circle cx={x + width / 2} cy={y - radius} r={radius} fill={fill} />
        <text
          x={x + width / 2}
          y={y - radius}
          font-size="0.8em"
          fill="#fff"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {value}
        </text>
      </g>
    );
  };

  console.log("HELLO BAR", dataToUse);
  return (
    <div style={{ width: "100%" }}>
      {dataToUse ? (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            width={500}
            height={300}
            data={dataToUse}
            barGap={0}
            margin={{
              top: 25,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey={dataKeyXAxes} tick={{ fontSize: 12 }} />
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

            <Bar
              radius={[5, 5, 0, 0]}
              isAnimationActive={false}
              type="monotone"
              fill="#8884d8"
              dataKey={dataKeyYAxes}
            >
              {hasLabel && labelDataKey ? (
                <LabelList
                  position="center"
                  dataKey={labelDataKey}
                  content={({ x, y, width, height, value }) =>
                    renderCustomizedLabel({
                      x,
                      y,
                      width,
                      height,
                      value,
                      fill: "#8884d8",
                    })
                  }
                />
              ) : null}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : null}
    </div>
  );
};
