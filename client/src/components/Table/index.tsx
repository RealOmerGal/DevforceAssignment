import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import MuiTableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableCell } from "./StyledTableCell";
import { Box, MenuItem, Select, Stack } from "@mui/material";
import TableRow from "../TableRow";
import { useServerStore } from "../../stores/server-store";
import { useEffect, useMemo } from "react";
import { useCurrencyStore } from "../../stores/currency-store";

const Table = () => {
  const { servers, getServers } = useServerStore();
  const { changeCurrency, currencyCode, currencies, getCurrencies } =
    useCurrencyStore();
  useEffect(() => {
    getServers();
    getCurrencies();
  }, []);

  const memorizedServers = useMemo(() => servers, [servers]);

  return (
    memorizedServers && (
      <Stack
        width={{ xs: "100vw", sm: "70vw" }}
        sx={{ alignSelf: "center", mt: 5 }}
      >
        <TableContainer component={Paper}>
          <MuiTable sx={{ minWidth: 700 }}>
            <TableHead>
              <MuiTableRow>
                <StyledTableCell>IP</StyledTableCell>
                <StyledTableCell align="center">Server name</StyledTableCell>
                <StyledTableCell align="center">Time running</StyledTableCell>
                <StyledTableCell align="center">Toggle</StyledTableCell>
                <StyledTableCell align="center">Type</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
              </MuiTableRow>
            </TableHead>
            <TableBody>
              {memorizedServers.map((server, index) => (
                <TableRow key={server.id} server={server} index={index} />
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
        <Box alignSelf={"flex-end"} mt={1} mr={{ sm: 0, xs: 1 }}>
          <Select
            defaultValue={currencyCode}
            value={currencyCode}
            onChange={(e) => changeCurrency(e.target.value)}
          >
            {Object.keys(currencies).map((curr) => (
              <MenuItem key={curr} value={curr}>
                {curr}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Stack>
    )
  );
};
export default Table;
