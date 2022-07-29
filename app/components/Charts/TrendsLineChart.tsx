import React, { PureComponent } from "react";
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
  { name: "Page A", uv: 4000 },
  { name: "Page B", uv: 3000 },
  { name: "Page C", uv: 2000 },
  { name: "Page D" },
  { name: "Page E", uv: 1890 },
  { name: "Page F", uv: 2390 },
  { name: "Page G", uv: 3490 },
];

export class TrendLineChart extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/line-chart-connect-nulls-sqp96";

  render() {
    return (
      <div style={{ width: "100%" }}>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            width={500}
            height={200}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              connectNulls
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

// import React from 'react';
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
// } from 'recharts';
// import { formatXAxis } from '../../../util';
// import { NoDataInRootTableMessage } from '../../CommonComponents';

// import { STATUSCOLORS } from '../../../constants/keys';

// export default class TrendLineChart extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       hide: [],
//     };
//   }

//   format = (v) => `${v}%`;

//   handleLegendsClick = (tenantsList) => (event) => {
//     let value =
//       event.dataKey === 'All'
//         ? this.state.hide.includes(event.dataKey)
//           ? []
//           : ['All', ...tenantsList]
//         : this.state.hide.includes(event.dataKey)
//         ? this.state.hide.length === 2 && this.state.hide.includes('All')
//           ? []
//           : this.state.hide.filter((datakey) => event.dataKey !== datakey)
//         : [...this.state.hide, event.dataKey, 'All'];
//     this.setState({
//       hide: value,
//     });
//   };

//   render() {
//     let dataToUse;
//     let statusList;
//     const isBuildUnAvailable =
//       !this.props.getAllDsJobsReportLineData ||
//       !this.props.getAllDsJobsReportLineData.data ||
//       !this.props.getAllDsJobsReportLineData.data.length;
//     if (!isBuildUnAvailable) {
//       dataToUse = this.props.getAllDsJobsReportLineData.data;
//       statusList = this.props.getAllDsJobsReportLineData.statusList;
//     }

//     return isBuildUnAvailable ? (
//       <div className="error-message all-reports ds-jobs-line">
//         <NoDataInRootTableMessage
//           keyName="allReports_dsline"
//           headers={{ job_name: 'Job Name' }}
//           jobString="downstream job"
//           parentType="segment"
//         />
//       </div>
//     ) : (
//       <ResponsiveContainer width={'99%'} height={285}>
//         <LineChart
//           width={400}
//           height={400}
//           data={dataToUse}
//           margin={{
//             top: 50,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="2 2" />
//           <XAxis
//             dataKey="timestamp"
//             tickFormatter={formatXAxis}
//             tick={{ fontSize: 12 }}
//           />
//           <YAxis domain={[0, 100]} tickLine={false} tick={{ fontSize: 12 }}>
//             <Label
//               value="Build Result %"
//               position="insideLeft"
//               offset={10}
//               angle={-90}
//               style={{ textAnchor: 'middle', fontWeight: 'bold' }}
//             />
//           </YAxis>
//           <Tooltip
//             labelStyle={{
//               fontWeight: 'bold',
//               opacity: '0.75',
//               fontSize: '0.9em',
//             }}
//             contentStyle={{
//               borderRadius: 8,
//               backgroundColor: '#FBFBFB',
//               fontSize: '0.8em',
//             }}
//             formatter={(value, name, props) => `${value}%`}
//           />
//           <Legend
//             iconType="circle"
//             iconSize={10}
//             onClick={this.handleLegendsClick(statusList)}
//             wrapperStyle={{
//               padding: '5px 0px 5px 50px',
//             }}
//           />
//           {['All', ...statusList].map((id, idx) => {
//             return (
//               <Line
//                 connectNulls
//                 isAnimationActive={false}
//                 type="monotone"
//                 dot={{ fill: STATUSCOLORS[id] }}
//                 stroke={STATUSCOLORS[id]}
//                 key={`line_${id}`}
//                 dataKey={`${id}`}
//                 activeDot={{ r: 7 }}
//                 hide={this.state.hide.includes(id)}
//               />
//             );
//           })}
//         </LineChart>
//       </ResponsiveContainer>
//     );
//   }
// }
