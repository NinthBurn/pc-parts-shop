import React from 'react';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import ButtonTheme from '../../styles/InputElementsThemes.tsx';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import '../../styles/button_styles.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export function NavigationButton(props: { link: string, label: string, direction: "back" | "forward", style: any }) {
    const navigate = useNavigate();
    let icon;

    if (props.direction === "back")
        icon = <ArrowBackIosIcon style={{ fontSize: "1.4em" }}/>;
    else icon = <ArrowForwardIosIcon style={{ fontSize: "1.4em" }}/>;

    return (<ThemeProvider theme={ButtonTheme}>
        <Button variant="contained" style={props.style}
            color="buttonGreen"
            onClick={() => navigate(props.link)}>
            {props.direction === "back" ? icon : null}
            {props.label}
            {props.direction === "forward" ? icon : null}
        </Button>
    </ThemeProvider>);
}
