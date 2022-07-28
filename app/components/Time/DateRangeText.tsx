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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <StyledTypographyWrapper onClick={handleClickOpen}>
        Selected Range :{" "}
        <StyledTypography>(fromStub) to (targetStub)</StyledTypography>
      </StyledTypographyWrapper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Pick a date range</DialogTitle>
        <StyledDialogContent>
          <StyledDateRangeSelector>
            <DateRangePicker placeholderText="Select start date" />
            <Box sx={{ mx: 2 }}> to </Box>
            <DateRangePicker placeholderText="Select end date" />
          </StyledDateRangeSelector>
          <StyleddButtonWrapper>
            <Button>Cancel</Button>
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

const StyledTypographyWrapper = styled(Typography)(({ theme }) => ({
  // color: "#999",
}));

const StyledTypography = styled("span")(({ theme }) => ({
  cursor: "pointer",
  "&:hover": {
    opacity: "80%",
  },
}));
