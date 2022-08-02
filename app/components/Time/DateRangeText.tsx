import React from "react";
import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DateRangePicker } from "./DateRangePicker";
import Box from "@mui/material/Box";

export const DateRangeText = () => {
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <StyledTypographyWrapper onClick={handleClickOpen}>
        Selected Range :{" "}
        <StyledTypography>(fromStub) to (targetStub)</StyledTypography>
      </StyledTypographyWrapper> */}
      <StyledRangeWrapper>
        Date range :{" "}
        <StyledDate component="a" onClick={handleClickOpen}>
          10/20/2022
        </StyledDate>{" "}
        to{" "}
        <StyledDate component="a" onClick={handleClickOpen}>
          10/27/2022
        </StyledDate>
      </StyledRangeWrapper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Pick a date range</DialogTitle>
        <StyledDialogContent>
          <StyledDateRangeSelector>
            <DateRangePicker
              placeholderText="Select start date"
              value={startDate}
              setValue={setStartDate}
            />
            <Box sx={{ mx: 2, display: "flex", alignItems: "center" }}>to</Box>
            <DateRangePicker
              placeholderText="Select end date"
              value={endDate}
              setValue={setEndDate}
            />
          </StyledDateRangeSelector>
          <StyleddButtonWrapper>
            <Button onClick={handleClose}>Cancel</Button>
            <Button>Apply</Button>
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
}));

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
