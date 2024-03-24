import '../../styles/button_styles.css';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Button from '@mui/material/Button';
import ButtonTheme from '../../styles/InputElementsThemes.tsx';

import { displayNotification } from '../DisplayNotification.tsx';
import { InputTextChanged } from '../InputPanel.tsx';
import { ComputerComponent, ComputerComponentToStringArray } from '../ComputerComponent.tsx';
import { NotificationBoxContext } from '../../pages/AdminPage.tsx';
import { DataContext } from '../../App.tsx';


interface ButtonProps{
    element_id: number;
}

function EditButton(props: ButtonProps){   
    const {DataList} = React.useContext(DataContext);
    const {changeNotification} = React.useContext(NotificationBoxContext);  

    const editClicked = (identifier: number) => {
        const pcPart: ComputerComponent = DataList.filter((p) => {return p.productID === identifier;})[0];
        const selectedComputerComponent: string[] = ComputerComponentToStringArray(pcPart);

        displayNotification(changeNotification, "Entry with ID " + identifier + " has been selected.", "info"); 
        InputTextChanged(selectedComputerComponent, selectedComputerComponent[0], 0);
    }

    return <ThemeProvider theme={ButtonTheme}><Button variant="contained" color="buttonBlue" onClick={() => editClicked(props.element_id)} className="EditButton"><EditIcon style={{fontSize: "1.2em"}}/>EDIT</Button></ThemeProvider>;
}
export default EditButton;