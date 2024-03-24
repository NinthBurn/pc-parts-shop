import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ButtonTheme from '../../styles/InputElementsThemes';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

function HomeButton(){
    const navigate = useNavigate(); 
  
    return(
      <ThemeProvider theme={ButtonTheme}>
      <Button 
      style={{position: "absolute", left: "10px", top: "10px"}}
      variant="contained" className="NavigationButton" color="buttonGreen"
      onClick={() => navigate("/")}>
        <ArrowBackIosIcon></ArrowBackIosIcon>Home
      </Button>
    </ThemeProvider>
    );
}

export default HomeButton;