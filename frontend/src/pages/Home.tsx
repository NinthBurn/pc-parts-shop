import React from "react";
import '../styles/Home.css';
import { useNavigate } from "react-router-dom";
import '../styles/button_styles.css';
import { Button } from "@mui/material";
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import ButtonTheme from "../styles/InputElementsThemes";
import ThemeProvider from '@mui/material/styles/ThemeProvider';

function Home(){
    const navigate = useNavigate(); 

    return (
        <div className="HomeBody">
            <div className="HomePanel">
                <h1>Welcome to the Adminstration Panel</h1>
                <ThemeProvider theme={ButtonTheme}>
                    <Button variant="contained" color="buttonBlue" className="NavigationButton" onClick={() => navigate("/admin")}><AddToQueueIcon></AddToQueueIcon><div style={{color: "rgb(0,0,0,0)"}}>a</div>Admin</Button>
                </ThemeProvider>
            </div>
        </div>
    );
};
 
export default Home;