import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ButtonTheme from '../../styles/InputElementsThemes';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

function StatisticsButton(){
    const navigate = useNavigate(); 
  
    return(
      <ThemeProvider theme={ButtonTheme}>
      <Button 
      style={{position: "absolute", left: "calc(100vw - 145px)", top: "10px"}}
      variant="contained" className="NavigationButton" color="buttonBlue"
      onClick={() => navigate("/admin/statistics")}>
        Statistics
        <ArrowForwardIosIcon/>
      </Button>
    </ThemeProvider>
    );
}

export default StatisticsButton;