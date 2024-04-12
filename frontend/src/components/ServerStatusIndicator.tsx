import React, { useState, useEffect } from "react";
import SignalCellular4BarIcon from '@mui/icons-material/SignalCellular4Bar';
import SignalCellularOffIcon from '@mui/icons-material/SignalCellularOff';
function ServerStatusIndicator(props: {status: boolean}) {
    return props.status ?
        <div style={{ position: "absolute", top: "99.5%", right: "99.5%", transform: "translate(100%, -100%)", textAlign: "center", color: "aliceblue", fontSize: "10px" }}>
            Server online
            <SignalCellular4BarIcon />
        </div> :
        <div style={{ position: "absolute", top: "99.5%", right: "99.5%", transform: "translate(100%, -100%)", textAlign: "center", color: "aliceblue", fontSize: "10px" }}>
            Server offline
            <SignalCellularOffIcon />
        </div>
};

export default ServerStatusIndicator;