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
