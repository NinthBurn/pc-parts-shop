import '../../styles/button_styles.css';
import React from 'react';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Button from '@mui/material/Button';
import ButtonTheme from '../../styles/InputElementsThemes.tsx';

import { NotificationBoxContext } from '../../pages/AdminPage.tsx';
import { displayNotification } from '../DisplayNotification.tsx';
import DeleteElement from '../../services/DataOperations.tsx';
import { DataContext } from '../../App.tsx';

const itemsPerPage = 7;
const pageIndex = 1;

interface ButtonProps{
    element_id: number;
}

function PreviousDataPageButton(props: ButtonProps){
    const {DataList, changeData} = React.useContext(DataContext);

    const clicked = () => {
        
    }

    return (<ThemeProvider theme={ButtonTheme}><Button variant="contained" color="buttonGreen" 
        onClick={(event) => {clicked()}} 
        className="DeleteButton">Back</Button>
    </ThemeProvider>);
}

export default PreviousDataPageButton;