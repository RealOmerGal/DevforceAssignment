import { Server } from "../types/server";

export const calculateTotalSeconds = (totalRuntimeInMilis: Server["totalRuntimeInMilis"], isRunning: boolean, lastActivated: Server["lastActivated"]) => {

    let totalTime = new Date(totalRuntimeInMilis).getTime() / 1000;
    if (isRunning) {
        const currentOnlineTime =
            (Date.now() - new Date(lastActivated).getTime()) / 1000;
        totalTime += currentOnlineTime;
    }
    return totalTime;
}