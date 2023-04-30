import { useCallback, useEffect, useState } from "react";
import { Server } from "../types/server";
import { StyledTableCell } from "./Table/StyledTableCell";
import { StyledTableRow } from "./Table/StyledTableRow";
import { Button, Switch } from "@mui/material";
import { useServerStore } from "../stores/server-store";
import Timer from "./Timer";
import { useCurrencyStore } from "../stores/currency-store";

interface Props {
  server: Server;
  index: number;
}

const TableRow = ({ server, index }: Props) => {
  const { deleteServer, toggleServer } = useServerStore();
  const { currencyCode, currencies } = useCurrencyStore();
  const [totalPrice, setTotalPrice] = useState(0);
  const [minutesPassed, setMinutesPassed] = useState(0);
  const [timerStatus, setTimerStatus] = useState(server.isRunning);
  const currency = currencies[currencyCode];
  useEffect(() => {
    //Calculate total price, consider currency
    const price = minutesPassed * server.type.pricePerMinute * currency?.rate;
    setTotalPrice(parseFloat(price.toFixed(2)));
  }, [minutesPassed, server.type.pricePerMinute, currency]);

  const handleToggle = useCallback(() => {
    //Toggles server state on/off
    toggleServer(server.id, index);
    setTimerStatus((prevStatus) => !prevStatus);
  }, [server.id, index, toggleServer]);

  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row">
        {server.ipAddress}
      </StyledTableCell>
      <StyledTableCell align="center">{server.name}</StyledTableCell>
      <StyledTableCell align="center">
        <Timer
          isRunning={server.isRunning}
          totalRuntimeInMilis={server.totalRuntimeInMilis}
          isOn={timerStatus}
          lastActivated={server.lastActivated}
          setMinutePassed={setMinutesPassed}
        />
      </StyledTableCell>
      <StyledTableCell align="center">
        <Switch
          defaultChecked={server.isRunning}
          value={server.isRunning}
          onClick={handleToggle}
        />
      </StyledTableCell>
      <StyledTableCell align="center">{server.type.name}</StyledTableCell>
      <StyledTableCell align="center">
        {totalPrice + currency?.symbol_native || "..."}
      </StyledTableCell>
      <StyledTableCell align="center">
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => deleteServer(server.id, index)}
        >
          Delete
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TableRow;
