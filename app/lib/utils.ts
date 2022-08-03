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
): Date => {
  const newDate = new Date(
    new Date().setDate(timestamp.getDate() - (backdate || 0))
  );
  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const day = newDate.getDate();
  const hours = timestamp.getHours();
  const mins = timestamp.getMinutes();
  const seconds = timestamp.getSeconds();
  const dateVal = backdate
    ? new Date(new Date(year, month, day, hours, mins, seconds))
    : timestamp;
  return dateVal;
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
