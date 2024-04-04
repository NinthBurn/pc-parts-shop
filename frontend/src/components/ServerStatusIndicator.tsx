import React, { useState, useEffect } from "react";
import SignalCellular4BarIcon from '@mui/icons-material/SignalCellular4Bar';
import SignalCellularOffIcon from '@mui/icons-material/SignalCellularOff';
function ServerStatusIndicator() {
    const [status, setStatus] = useState(true);

    useEffect(() => {
        const webPing = setInterval(() => {
                fetch('//localhost:8080/api/v1/computer_components/status', {
                    mode: 'no-cors',
    
                })
                .then(() => {
                    setStatus(true);
                })
                .catch((error) => {
                    setStatus(false);
                  
                  });
                  
            
        }, 2000);
    }, []);

    return status ?
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