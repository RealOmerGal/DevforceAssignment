import { TableRow, styled } from "@mui/material";

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  //Provide darker color for every 2nd (odd) table row
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
