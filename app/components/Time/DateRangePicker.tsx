import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface IDateRangePicker {
  placeholderText: string;
  value: Date | null;
  setValue: Function;
}
export const DateRangePicker = (props: IDateRangePicker) => {
  return (
    <DatePicker
      label={props.placeholderText}
      value={props.value}
      onChange={(newValue: any) => {
        props.setValue(newValue.toUTCString());
      }}
      renderInput={(params: any) => <TextField {...params} />}
    />
  );
};
