import React, { useState, useEffect } from "react";
import WifiOffIcon from '@mui/icons-material/WifiOff';
import WifiIcon from '@mui/icons-material/Wifi';

function NetworkStatusIndicator() {
    const [status, setStatus] = useState(true);

    useEffect(() => {
        const webPing = setInterval(() => {
            fetch('//google.com', {
                mode: 'no-cors',
            })
            .then(() => {
                setStatus(true);
            })
            .catch(() => {
                    if(status)
                        console.log("User lost connection to the Internet");
                    
                    setStatus(false);
                })
        }, 2000);
    }, []);

    return status ? 
    <div style={{ position: "absolute", top: "99.5%", left: "99.5%", transform: "translate(-100%, -100%)", textAlign: "center", color: "aliceblue", fontSize: "10px" }}>
        <div style={{}}>Connection online</div>
        <WifiIcon />
    </div> :
    
    <div style={{ position: "absolute", top: "99.5%", left: "99.5%", transform: "translate(-100%, -100%)", textAlign: "center", color: "aliceblue", fontSize: "10px" }}>
        <div style={{}}>Connection offline</div>
        <WifiOffIcon />
    </div>
};

export default NetworkStatusIndicator;