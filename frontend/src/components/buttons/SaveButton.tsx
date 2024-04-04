import '../../styles/button_styles.css';
import React from 'react';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Button from '@mui/material/Button';
import ButtonTheme from '../../styles/InputElementsThemes.tsx';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { NotificationBoxContext } from '../../pages/AdminPage.tsx';
import { DataContext } from '../../App.tsx';
import { ComputerComponent, ComputerComponentFromStringArray } from '../ComputerComponent.tsx';
import { displayNotification } from '../DisplayNotification.tsx';
import { InsertOrUpdateElement } from '../../services/DataOperations.tsx';
import axios from 'axios';

interface SaveButtonProps {
    InputData: string[];
}

export function SaveButton(props: SaveButtonProps) {
    const { changeNotification } = React.useContext(NotificationBoxContext);
    const { DataList, changeData } = React.useContext(DataContext);
    
    const saveClicked = (inputData: string[]) => {
        const insertedComponent = ComputerComponentFromStringArray(inputData);
        const result = InsertOrUpdateElement(DataList, insertedComponent);
        let newData: ComputerComponent[], insertStatus: string;
        newData = result.newData;
        insertStatus = result.status;

        let notificationText: string, notificationType: string = "error";

        if (insertStatus === "added") {
            notificationText = "Entry successfully added!";
            notificationType = "success";
        }
        else if (insertStatus === "updated") {
            notificationText = "Entry successfully updated!";
            notificationType = "success";
        }
        else notificationText = insertStatus;


        async function modifyElementInBackend(insertedComponent: ComputerComponent,
            changeData: React.Dispatch<React.SetStateAction<ComputerComponent[]>>,
            newData: ComputerComponent[]) {
        
            const newDate = new Date(insertedComponent.releaseDate);
            newDate.setDate(newDate.getDate() + 1);
        
            await axios.post("/api/v1/computer_components/save",
                {
                    productID: insertedComponent.productID,
                    manufacturer: insertedComponent.manufacturer,
                    productName: insertedComponent.productName,
                    category: insertedComponent.category,
                    price: insertedComponent.price,
                    releaseDate: newDate,
                    quantity: insertedComponent.quantity,
                }).then(() => {
                    changeData(newData);
                    displayNotification(changeNotification, notificationText, notificationType);

                })
                .catch(() => {
                    displayNotification(changeNotification, "Server could not respond to the request. Change prevented.", "error");
                });
        
        }

        if (newData.length > 0)
            modifyElementInBackend(insertedComponent, changeData, newData);
            
    }

    return <ThemeProvider theme={ButtonTheme}><Button variant="contained" color="buttonGreen" onClick={() => saveClicked(props.InputData)} className="InsertButton"><AppRegistrationIcon />SAVE</Button></ThemeProvider>;
}

export default SaveButton;