import moment from "moment";
import { DEFUALTTIMERANGE } from "~/data/constants/timeranges";

export const getPaginatedRows = (
  rowsPerPage: number,
  rows: any[] | null,
  page: number
) =>
  rows
    ? rowsPerPage > 0
      ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : rows
    : null;

export const applyOffsetToDate = (dateVal: Date) => {
  const offset = new Date().getTimezoneOffset();
  const returnDate = new Date(dateVal);
  returnDate.setMinutes(returnDate.getMinutes() - offset);
  return returnDate;
};

export const getDateStringFromTimestamp = (
  timestamp: Date,
  backdate?: number
): string => {
  const newDate = new Date(
    new Date().setDate(timestamp.getDate() - (backdate || 0))
  );

  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const day = newDate.getDate();
  const hours = timestamp.getHours();
  const mins = timestamp.getMinutes();
  const seconds = timestamp.getSeconds();
  const dateVal = new Date(new Date(year, month, day, hours, mins, seconds));
  return dateVal.toJSON();
};

export const getDefaultDate = ({ start }: { start: boolean }) => {
  const timeArgs: number[] = start ? [0, 0, 0, 0] : [23, 59, 59, 59];
  return getDateStringFromTimestamp(
    (() => {
      const d = new Date();
      d.setHours(timeArgs[0], timeArgs[1], timeArgs[2], timeArgs[3]);
      return d;
    })(),
    start ? DEFUALTTIMERANGE : 0
  );
};

export const setDateWithDayStartTime = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const formatDateToLocaleString = (dateVal: string) =>
  new Date(dateVal.replace(/-/g, "/")).toLocaleDateString();

export const formatXAxis = (tickItem: any) => {
  const dateValues = tickItem.split("-");
  let dayPart = dateValues[2].substring(0, 3);
  if (isNaN(Number(dayPart))) {
    let daySplit = dayPart.split("");
    daySplit.pop();
    dayPart = daySplit.join("");
  }

  const newDate = formatDateToLocaleString(
    new Date(
      dateValues[0],
      dateValues[1] ? dateValues[1] - 1 : dateValues[1],
      dayPart
    ).toDateString()
  );
  return newDate;
};

export const trimJobUrl = (jobUrl: string) => {
  const jobUrlArray = decodeURI(jobUrl).split("/");
  const jobTrimmed =
    jobUrlArray[jobUrlArray.length - 1] === ""
      ? jobUrlArray[jobUrlArray.length - 2]
      : jobUrlArray[jobUrlArray.length - 1];
  return jobTrimmed;
};

export const decrypt = (salt: string, encoded: string) => {
  const textToChars = (text: string) =>
    text.split("").map((c) => c.charCodeAt(0));

  const applySaltToChar = (code: any) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return encoded
    ?.match(/.{1,2}/g)
    ?.map((hex: any) => parseInt(hex, 16))
    ?.map(applySaltToChar)
    .map((charCode: any) => String.fromCharCode(charCode))
    .join("");
};

export const crypt = (salt: string, text: string) => {
  const textToChars = (text: string) =>
    text.split("").map((c: any) => c.charCodeAt(0));
  const byteHex = (n: string | number) =>
    ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code: any) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};

export const formatTimestampStrToDateStr = (timestamp: string) => {
  return moment(new Date(timestamp)).format("MM-DD-YYYY");
};
export const clickHandlerAddWidgetToCart = (
  cartVal: string[],
  id: string | null,
  name: string | null,
  type: string | null,
  startDate: string | null,
  endDate: string | null,
  widgetType: string | null
) => {
  if (!id || !type || !startDate || !endDate || !widgetType) {
    return cartVal;
  }

  if (type === "add") {
    return {
      ...cartVal,
      [id]: {
        id,
        range: `${formatTimestampStrToDateStr(
          startDate
        )} to ${formatTimestampStrToDateStr(endDate)}`,
        name,
        widgetType,
      },
    };
  } else {
    // let index = cartVal.indexOf(id);
    // let modifiedCart = [...cartVal];
    // modifiedCart.splice(index, 1);
    let modifiedCart = { ...cartVal };
    if ((modifiedCart as any)[id]) {
      delete (modifiedCart as any)[id];
    }

    return modifiedCart;
  }
};
