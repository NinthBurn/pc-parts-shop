import React from 'react';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import ButtonTheme from '../../styles/InputElementsThemes.tsx';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import PreviewIcon from '@mui/icons-material/Preview';
import '../../styles/button_styles.css';

export function ViewButton(props: {link: string}){
  const navigate = useNavigate();
  return (<ThemeProvider theme={ButtonTheme}>
      <Button variant="contained" 
      color="buttonGreen" 
      className="EditButton"
      onClick={() => navigate(props.link)}>
      <PreviewIcon style={{fontSize: "1.4em"}}/>
        VIEW
      </Button>
    </ThemeProvider>);
}
