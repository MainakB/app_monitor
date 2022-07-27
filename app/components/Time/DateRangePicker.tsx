import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface IDateRangePicker {
  placeholderText: string;
}
export const DateRangePicker = (props: IDateRangePicker) => {
  const [value, setValue] = React.useState<Date | null>(null);

  return (
    // <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker
      label={props.placeholderText}
      value={value}
      onChange={(newValue: any) => {
        setValue(newValue);
      }}
      renderInput={(params: any) => <TextField {...params} />}
    />
    // </LocalizationProvider>
  );
};
