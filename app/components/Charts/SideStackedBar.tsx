import React, { useState } from "react";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  LabelList,
} from "recharts";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CHARTCOLORS, FONT_COLORS } from "~/data/constants/colors";

interface ItrendLineChartProps {
  data: any[] | null;
  legendsList: string[] | object;
  dataKeyXAxes: string;
  formatterUnit: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <StyledBox>
        <StyledTypographyWrapperHeader>{`${label}`}</StyledTypographyWrapperHeader>
        <StyledTypographyWrapper fill={payload[0].fill}>
          Pipeline : {payload[0].value}%
        </StyledTypographyWrapper>
        <StyledTypographyWrapper
          fill={payload[0].fill}
        >{`Pipeline Count: ${payload[0].payload.pipeline_count}`}</StyledTypographyWrapper>
        <StyledTypographyWrapper
          fill={payload[1].fill}
        >{`Non Pipeline : ${payload[1].value}%`}</StyledTypographyWrapper>
        <StyledTypographyWrapper
          fill={payload[1].fill}
        >{`Non Pipeline Count: ${payload[0].payload.non_pipeline_count}`}</StyledTypographyWrapper>
      </StyledBox>
    );
  }

  return null;
};

export const SideStackedBar = ({
  data,
  legendsList,
  dataKeyXAxes,
  formatterUnit,
}: ItrendLineChartProps) => {
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

  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, height, value, fill } = props;
    const radius = 10;
    return (
      <g>
        <circle cx={x + width / 2} cy={y - radius} r={radius} fill={fill} />
        <text
          x={x + width / 2}
          y={y - radius}
          fontSize="0.8em"
          fill="#fff"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {value}
        </text>
      </g>
    );
  };

  return dataToUse ? (
    <ResponsiveContainer width="100%" height="100%">
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
        <XAxis
          dataKey={dataKeyXAxes}
          //   tickFormatter={formatXAxis}
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
          //   formatter={(value: string | number, name: string, props: any) =>
          //     `${value}${formatterUnit || ""}`
          //   }
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
            <Bar
              name={Array.isArray(legendsList) ? id : (legendsList as any)[id]}
              radius={[5, 5, 0, 0]}
              isAnimationActive={false}
              type="monotone"
              fill={(CHARTCOLORS as any)[id]}
              key={`line_${id}`}
              dataKey={id}
              hide={hide.includes(id)}
            >
              {id !== "All" ? (
                <LabelList
                  position="center"
                  dataKey={
                    id === "pipeline_success_rate"
                      ? "pipeline_count"
                      : "non_pipeline_count"
                  }
                  content={({ x, y, width, height, value }) =>
                    renderCustomizedLabel({
                      x,
                      y,
                      width,
                      height,
                      value,
                      fill: (CHARTCOLORS as any)[id],
                    })
                  }
                />
              ) : null}
            </Bar>
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  ) : null;
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
