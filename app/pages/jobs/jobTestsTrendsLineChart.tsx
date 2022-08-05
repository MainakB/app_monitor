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

import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { formatXAxis } from "~/lib";

import { PICKCOLOR, FONT_COLORS } from "~/data/constants/colors";
import { PlaylistAddOutlined } from "@mui/icons-material";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    console.log(active, payload, label);
    return (
      // <StyledBox>
      //   <StyledTypographyWrapper
      //     fill={payload[0].stroke}
      //     key={`${payload[0].dataKey}-${0}`}
      //   >
      //     {payload[0].dataKey}
      //   </StyledTypographyWrapper>
      // </StyledBox>
      <StyledBox>
        <StyledTypographyWrapperHeader>{`${label}`}</StyledTypographyWrapperHeader>
        {payload.map((val: any, idx: number) => (
          <StyledTypographyWrapper
            fill={payload[idx].stroke}
            key={`${val.dataKey}-${idx}`}
          >
            {`${val.dataKey} : ${val.value}% (${
              val.payload[`${val.dataKey}-count`]
            })`}
          </StyledTypographyWrapper>
        ))}
      </StyledBox>
    );
  }

  return null;
};

interface IJobTestsTrendsLineChartProps {
  data: any[] | null;
  legendsList: string[] | object;
  dataKeyXAxes: string;
  setToolContext: Function;
  formatterUnit: string;
}
export const JobTestsTrendsLineChart = ({
  data,
  legendsList,
  dataKeyXAxes,
  formatterUnit,
  setToolContext,
}: IJobTestsTrendsLineChartProps) => {
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

  const legendKeys = Array.isArray(legendsList)
    ? legendsList
    : Object.keys(legendsList);

  if (!isBuildUnAvailable) {
    dataToUse = data;
  }

  console.log("job data to use, ", dataToUse);
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
              content={<CustomTooltip />}
              // formatter={(value: string | number, name: string, props: any) =>
              //   `${value}${formatterUnit || ""}`
              // }
            />
            <Legend
              iconType="circle"
              iconSize={10}
              onClick={handleLegendsClick(legendKeys)}
              wrapperStyle={{
                padding: "5px 0px 5px 50px",
              }}
            />

            {["All", ...legendKeys].map((id: string, idx: number) => {
              return (
                <Line
                  name={id}
                  connectNulls
                  isAnimationActive={false}
                  type="monotone"
                  dot={{ fill: (PICKCOLOR as any)[idx] }}
                  stroke={(PICKCOLOR as any)[idx]}
                  key={`line_${id}`}
                  dataKey={id}
                  activeDot={{
                    onClick: (e, payload) => {
                      setToolContext(
                        `${payload.dataKey} - ${payload.payload.created_timestamp}`
                      );
                    },
                    r: 1,
                  }}
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

const StyledTypographyWrapperHeader = styled(Typography)(({ theme }) => ({
  alignSelf: "center",
  fontWeight: theme.typography.fontWeightBold,
  padding: "0px 5px 0px 5px",
  fontSize: "12px",
  color: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
}));

const StyledTypographyWrapper = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "fill",
})<{ fill?: string }>(({ theme, fill }) => ({
  alignSelf: "center",

  padding: "5px",
  fontSize: "11.5px",
  color: fill || FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  //   alignSelf: "center",
  fontWeight: theme.typography.fontWeightMedium,
  backgroundColor: FONT_COLORS.DOCUMENT_TOOLTIPS,
  padding: "10px 15px 15px 15px",
  border: `0.4px solid ${FONT_COLORS.INACTIVES_DISABLED_PRIMARY}`,
  borderRadius: "8%",
}));
