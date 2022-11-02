import * as React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { styled } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import moment from "moment";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";

import { FONT_COLORS } from "~/data/constants/colors";
import { TeamsAggregateReportTable } from "./teamsAggregateReportTable";
import { WidgetAddToCartFetcher } from "~/components/Fetchers";

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
          <Box>{children}</Box>
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

interface ITabsPanelProps {
  data: any;
  startDate: string;
  endDate: string;
  pdfDwldCart: any;
}

export const TabsPanel = (props: ITabsPanelProps) => {
  const [value, setValue] = React.useState(0);
  const tableEl = React.useRef(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  let tenantsList: string[] = Object.keys(props.data);

  const formatDate = (date: string) => {
    return moment(date).format("MM-DD-YYYY");
  };
  const reportDatetext = `${formatDate(props.startDate)} to ${formatDate(
    props.endDate
  )}`;

  const downloadPdfHandler = (event: any) => {
    event?.preventDefault();
    // const pdf = new jsPDF("l", "mm", [305, 250]);
    const pdf = new jsPDF();
    autoTable(pdf, {
      html: "#statusByDate",
      theme: "grid",
      startY: 40,

      styles: { halign: "center", cellPadding: 2, overflow: "linebreak" },
      showHead: "everyPage",
      headStyles: {
        valign: "middle",
        cellPadding: 2,
      },
      didDrawPage: function (data) {
        // Header
        pdf.setFontSize(20);
        pdf.setTextColor(40);
        let textX =
          (pdf.internal.pageSize.getWidth() -
            pdf.getTextWidth("Test Automation Report")) /
          2;
        pdf.text("Test Automation Report", textX, 25);
        textX =
          (pdf.internal.pageSize.getWidth() -
            pdf.getTextWidth(reportDatetext)) /
          2;
        pdf.setFontSize(12);
        pdf.text(reportDatetext, textX + 15, 35);
      },
    });
    pdf.save(
      `Report_${formatDate(props.startDate)}_to_${formatDate(
        props.endDate
      )}.pdf`
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <StyledGenericTitleDateRangeWrapper>
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
          <StyledDateRangeFilter>
            <StyledRangeWrapper>
              <Tooltip title="Download as a report">
                <StyledFileDownloadOutlinedIcon onClick={downloadPdfHandler} />
              </Tooltip>
              <WidgetAddToCartFetcher
                startDate={props.startDate}
                endDate={props.endDate}
                pdfDwldCart={props.pdfDwldCart}
                redirectPath="/update-download-cart"
                widgetId={`statusByDate${tenantsList[value]}`}
                widgetName="Status by date"
                widgetType="table_square_mini"
              >
                {Object.keys(props.pdfDwldCart).includes(
                  `statusByDate${tenantsList[value]}`
                ) ? (
                  <StyledAddTaskOutlinedIcon />
                ) : (
                  <StyledAddToDownloadIcon />
                )}
              </WidgetAddToCartFetcher>
            </StyledRangeWrapper>
          </StyledDateRangeFilter>
        </StyledGenericTitleDateRangeWrapper>
      </Box>
      {tenantsList.map((val: string, idx: number) => (
        <TabPanel
          key={`${val}-${idx}-landingaggtabpanel`}
          value={value}
          index={idx}
        >
          <TeamsAggregateReportTable
            idValue={`statusByDate${tenantsList[value]}`}
            tableData={props.data[tenantsList[value]]}
            tenant={tenantsList[value]}
            tenantList={tenantsList}
            tableRef={tableEl}
          />
        </TabPanel>
      ))}
    </Box>
  );
};

const StyledGenericTitleDateRangeWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0px 15px 0px 15px",
}));

const StyledDateRangeFilter = styled(Box)(({ theme }) => ({
  padding: "10px",
  fontSize: "0.8125rem",
}));

const StyledRangeWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
  fontSize: "0.8125rem",
}));

const StyledFileDownloadOutlinedIcon = styled(FileDownloadOutlinedIcon)(
  ({ theme }) => ({
    cursor: "pointer",
    color: FONT_COLORS.PRIMARY_TEXT,
    transition: "all 0.5s step-start",
    "&:hover": {
      opacity: "70%",
    },
    "&:active": {
      opacity: "50%",
    },
  })
);

const StyledAddTaskOutlinedIcon = styled(AddTaskOutlinedIcon)(({ theme }) => ({
  color: theme.palette.success.main,
  cursor: "pointer",
  transition: "all 0.5s step-start",
  "&:hover": {
    opacity: "70%",
  },
  "&:active": {
    opacity: "50%",
  },
}));

const StyledAddToDownloadIcon = styled(AddCircleOutlineOutlinedIcon)(
  ({ theme }) => ({
    cursor: "pointer",
    color: FONT_COLORS.PRIMARY_TEXT,
    transition: "all 0.5s step-start",
    "&:hover": {
      opacity: "70%",
    },
    "&:active": {
      opacity: "50%",
    },
  })
);
