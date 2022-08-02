import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface IDateRangePicker {
  placeholderText: string;
  value: Date | null;
  setValue: Function;
}
export const DateRangePicker = (props: IDateRangePicker) => {
  return (
    // <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker
      label={props.placeholderText}
      value={props.value}
      onChange={(newValue: any) => {
        props.setValue(newValue);
      }}
      renderInput={(params: any) => <TextField {...params} />}
    />
    // </LocalizationProvider>
  );
};
