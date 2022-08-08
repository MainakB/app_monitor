import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TeamsStatusTable } from "~/components/HomeDashboardWidgets";
import { TeamsAggregateReportTable } from "./teamsAggregateReportTable";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const TabsPanel = (props: any) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  let tenantsList: string[] = Object.keys(props.data);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tenantsList.map((val: string, idx: number) => (
            <Tab
              key={`${val}-${idx}-landingaggtab`}
              label={val.toUpperCase()}
              {...a11yProps(idx)}
            />
          ))}
        </Tabs>
      </Box>
      {tenantsList.map((val: string, idx: number) => (
        <TabPanel
          key={`${val}-${idx}-landingaggtabpanel`}
          value={value}
          index={idx}
        >
          <TeamsAggregateReportTable
            tableData={props.data[tenantsList[value]]}
            tenant={tenantsList[value]}
            tenantList={tenantsList}
          />
          {/* <TeamsStatusTable data={props.data} /> */}
        </TabPanel>
        // <Tab
        //   key={`${val}-${idx}-landingaggtab`}
        //   label={val.toUpperCase()}
        //   {...a11yProps(idx)}
        // />
      ))}
    </Box>
  );
};
