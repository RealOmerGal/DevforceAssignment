import { useStopwatch } from "react-timer-hook";
import { useEffect } from "react";
import React from "react";
import { Server } from "../types/server";
import { calculateTotalSeconds } from "../utils/calculate-total-seconds";
import { convertTimeToMinutes } from "../utils/convert-time-to-minutes";

interface Props {
  isRunning: boolean;
  totalRuntimeInMilis: Server["totalRuntimeInMilis"];
  isOn: boolean;
  lastActivated: Server["lastActivated"];
  setMinutePassed: (amount: number) => void;
}

const Timer = ({
  isRunning,
  totalRuntimeInMilis,
  isOn,
  lastActivated,
  setMinutePassed,
}: Props) => {
  //Calculate total history runtime for time offset
  const totalTimeInSeconds = calculateTotalSeconds(
    totalRuntimeInMilis,
    isRunning,
    lastActivated
  );
  const offSet = new Date();
  offSet.setSeconds(offSet.getSeconds() + totalTimeInSeconds);

  const { seconds, minutes, hours, start, pause, days } = useStopwatch({
    autoStart: isRunning,
    offsetTimestamp: offSet,
  });
  // Set minutesPassed state for the total time in offset as minutes
  useEffect(() => {
    const totalTimeInMinutes = Math.floor(totalTimeInSeconds / 60);
    setMinutePassed(totalTimeInMinutes);
  }, []);

  useEffect(() => {
    if (isOn) start();
    else pause();
  }, [isOn]);

  // Every time min,hour or day changes, add it to minutesPassed state
  useEffect(() => {
    if (isOn) {
      const mins = convertTimeToMinutes(minutes, hours, days);
      setMinutePassed(mins);
    }
  }, [minutes, hours, days]);
  return (
    <>
      {days ? <span>{days}d </span> : null}
      {hours ? <span>{hours}h </span> : null}
      {minutes ? <span>{minutes}m </span> : null}
      {seconds ? <span>{seconds}s</span> : <span>0s</span>}
    </>
  );
};

export default React.memo(Timer);
