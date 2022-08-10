import React from "react";
import { styled } from "@mui/material";
import { useFetcher, useLocation } from "@remix-run/react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DateRangePicker } from "./DateRangePicker";
import Box from "@mui/material/Box";
import moment from "moment";
interface IDateRangeTextProps {
  startDate: string;
  endDate: string;
  redirectPath: string;
}
export const DateRangeText = ({
  startDate,
  endDate,
  redirectPath,
}: IDateRangeTextProps) => {
  const { pathname, search } = useLocation();
  const fetcher = useFetcher();

  const [open, setOpen] = React.useState(false);

  const [startDateState, setStartDateState] = React.useState<string>("");
  const [endDateState, setEndDateState] = React.useState<string>("");

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // React.useEffect(() => {
  //   // setStartDateState(startDate);
  //   // setEndDateState(endDate);
  // }, [startDate, endDate]);

  return (
    <div>
      <StyledRangeWrapper component="div">
        Date range :{" "}
        <StyledDate component="a" onClick={handleClickOpen}>
          {moment(new Date(startDate)).format(`MM-DD-YYYY`)}
        </StyledDate>{" "}
        to{" "}
        <StyledDate component="a" onClick={handleClickOpen}>
          {moment(new Date(endDate)).format(`MM-DD-YYYY`)}
        </StyledDate>
      </StyledRangeWrapper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Pick a date range</DialogTitle>
        <StyledDialogContent>
          <StyledDateRangeSelector>
            <DateRangePicker
              placeholderText="Select start date"
              value={new Date(startDateState || startDate)}
              setValue={setStartDateState}
            />
            <Box sx={{ mx: 2, display: "flex", alignItems: "center" }}>to</Box>
            <DateRangePicker
              placeholderText="Select end date"
              value={new Date(endDateState || endDate)}
              setValue={setEndDateState}
            />
          </StyledDateRangeSelector>
          <StyleddButtonWrapper>
            <Button onClick={handleClose}>Cancel</Button>
            <fetcher.Form method="post" action={redirectPath}>
              <input
                hidden
                name="redirectUrl"
                value={pathname + search}
                readOnly
              />
              <input
                hidden
                name="startDate"
                value={startDateState || startDate}
                readOnly
              />
              <input
                hidden
                name="endDate"
                value={endDateState || endDate}
                readOnly
              />
              <Button type="submit" onClick={handleClose}>
                Apply
              </Button>
            </fetcher.Form>
          </StyleddButtonWrapper>
        </StyledDialogContent>
      </Dialog>
    </div>
  );
};

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const StyledDateRangeSelector = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: "10px",
  flexDirection: "row",
}));

const StyleddButtonWrapper = styled(Box)(({ theme }) => ({
  marginTop: "10px",
  display: "flex",
  justifyContent: "right",
  flexDirection: "row",
}));

const StyledRangeWrapper = styled(Typography)(({ theme }) => ({
  fontSize: "0.8125rem",
})) as typeof Typography;

const StyledDate = styled(Typography)(({ theme }) => ({
  fontSize: "0.8125rem",
  cursor: "pointer",
  color: theme.palette.primary.light,
  "&:hover": {
    opacity: "75%",

    transition: "all 0.5s step-start",
  },
  "&:active": {
    opacity: "40%",
    transition: "all 0.5s step-start",
  },
})) as typeof Typography;
