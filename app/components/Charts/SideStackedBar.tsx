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
} from "recharts";
import { formatXAxis } from "~/lib";
import { CHARTCOLORS } from "~/data/constants/colors";


interface ItrendLineChartProps {
  data: any[] | null;
  legendsList: string[] | object;
  dataKeyXAxes: string;
  formatterUnit: string;
}

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
  //   dataToUse = null;

  return dataToUse ? (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={dataToUse}
        barGap={0}
        margin={{
          top: 5,
          right: 30,
          left: 20,
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
          formatter={(value: string | number, name: string, props: any) =>
            `${value}${formatterUnit || ""}`
          }
        />
        <Legend
          iconType="circle"
          iconSize={10}
          onClick={handleLegendsClick(legendKeys)}
          wrapperStyle={{
            padding: "5px 0px 5px 50px",
          }}
        />
        {/* <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" /> */}
        {["All", ...legendKeys].map((id: string, idx: number) => {
          return (
            <Bar
              name={Array.isArray(legendsList) ? id : (legendsList as any)[id]}
              isAnimationActive={false}
              type="monotone"
              fill={(CHARTCOLORS as any)[id]}
              key={`line_${id}`}
              dataKey={`${id}`}
              hide={hide.includes(id)}
            />
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  ) : (
    <div>hello</div>
  );
};

// import React, { useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   Label,
//   ResponsiveContainer,
// } from "recharts";
// import { formatXAxis } from "~/lib";

// import { CHARTCOLORS } from "~/data/constants/colors";

// interface ItrendLineChartProps {
//   data: any[] | null;
//   legendsList: string[] | object;
//   dataKeyYAxes: string;
//   formatterUnit: string;
// }
// export const TrendLineChart = ({
//   data,
//   legendsList,
//   dataKeyYAxes,
//   formatterUnit,
// }: ItrendLineChartProps) => {
//   let dataToUse;
//   const [hide, setHide] = useState<string[]>([]);
//   const isBuildUnAvailable = !data || !data.length;

//   const handleLegendsClick = (typesList: string[]) => (event: any) => {
//     let value =
//       event.dataKey === "All"
//         ? hide.includes(event.dataKey)
//           ? []
//           : ["All", ...typesList]
//         : hide.includes(event.dataKey)
//         ? hide.length === 2 && hide.includes("All")
//           ? []
//           : hide.filter((datakey) => event.dataKey !== datakey)
//         : [...hide, event.dataKey, "All"];

//     setHide(value);
//   };

//   const legendKeys = Array.isArray(legendsList)
//     ? legendsList
//     : Object.keys(legendsList);

//   if (!isBuildUnAvailable) {
//     dataToUse = data;
//   }

//   return (
//     <div style={{ width: "100%" }}>
//       {data ? (
//         <ResponsiveContainer width="100%" height={200}>
//           <LineChart
//             width={500}
//             height={300}
//             data={dataToUse}
//             margin={{
//               top: 15,
//               right: 50,
//               left: 0,
//               bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="2 2" />
//             <XAxis
//               dataKey={dataKeyYAxes}
//               tickFormatter={formatXAxis}
//               tick={{ fontSize: 12 }}
//             />
//             <YAxis domain={[0, 100]} tickLine={false} tick={{ fontSize: 12 }}>
//               <Label
//                 position="insideLeft"
//                 offset={10}
//                 angle={-90}
//                 style={{ textAnchor: "middle", fontWeight: "bold" }}
//               />
//             </YAxis>
//             <Tooltip
//               labelStyle={{
//                 fontWeight: "bold",
//                 opacity: "0.75",
//                 fontSize: "0.9em",
//               }}
//               contentStyle={{
//                 borderRadius: 8,
//                 backgroundColor: "#FBFBFB",
//                 fontSize: "0.8em",
//               }}
//               formatter={(value: string | number, name: string, props: any) =>
//                 `${value}${formatterUnit || ""}`
//               }
//             />
//             <Legend
//               iconType="circle"
//               iconSize={10}
//               onClick={handleLegendsClick(legendKeys)}
//               wrapperStyle={{
//                 padding: "5px 0px 5px 50px",
//               }}
//             />

//             {["All", ...legendKeys].map((id: string, idx: number) => {
//               return (
//                 <Line
//                   name={
//                     Array.isArray(legendsList) ? id : (legendsList as any)[id]
//                   }
//                   connectNulls
//                   isAnimationActive={false}
//                   type="monotone"
//                   dot={{ fill: (CHARTCOLORS as any)[id] }}
//                   stroke={(CHARTCOLORS as any)[id]}
//                   key={`line_${id}`}
//                   dataKey={`${id}`}
//                   activeDot={{ r: 1 }}
//                   hide={hide.includes(id)}
//                 />
//               );
//             })}
//           </LineChart>
//         </ResponsiveContainer>
//       ) : null}
//     </div>
//   );
// };
