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
import { InputTextChanged } from '../InputPanel.tsx';
import ValidateData from '../../services/DataValidationService.tsx';
interface SaveButtonProps {
    InputData: string[];
}

export function SaveButton(props: SaveButtonProps) {
    const { changeNotification } = React.useContext(NotificationBoxContext);
    const { DataList, changeData } = React.useContext(DataContext);

    const saveClicked = (inputData: string[]) => {
        const insertedComponent = ComputerComponentFromStringArray(inputData);
        let insertStatus: string = "added";
        let existingComponent: ComputerComponent | null;
        let notificationText: string, notificationType: string = "error";

        const dataValidation = ValidateData(insertedComponent);
	    if (dataValidation === ""){
            async function checkForElementExistance() {
                return await axios.get("/api/v1/computer_components/id/" + insertedComponent.productID)
                    .then((res) => {
                        existingComponent = res.data;
                    })
                    .catch((err) => {
                        console.log("Could not fetch item from server")
                    });
            }
    
            checkForElementExistance().then((result) => {
                modifyElementInBackend(insertedComponent, changeData);
                InputTextChanged(["", "", "", "", "", "", ""], "", 0);
            });

            async function modifyElementInBackend(insertedComponent: ComputerComponent,
                changeData: React.Dispatch<React.SetStateAction<ComputerComponent[]>>,) {

            
                console.log(existingComponent)

                if(existingComponent !== null)
                    insertStatus = "updated";
            
                if (insertStatus === "added") {
                    notificationText = "Entry successfully added!";
                    notificationType = "success";
                }
                else if (insertStatus === "updated") {
                    notificationText = "Entry successfully updated!";
                    notificationType = "success";
                }
                else notificationText = insertStatus;
            
                const newDate = new Date(insertedComponent.releaseDate);
                newDate.setDate(newDate.getDate() + 1);
    
                if (insertStatus === "added") {
                    await axios.post("/api/v1/computer_components/insert",
                        {
                            productID: insertedComponent.productID,
                            manufacturer: insertedComponent.manufacturer,
                            productName: insertedComponent.productName,
                            category: insertedComponent.category,
                            price: insertedComponent.price,
                            releaseDate: newDate,
                            quantity: insertedComponent.quantity,
                        }).then(() => {
                            changeData([...DataList]);
                            displayNotification(changeNotification, notificationText, notificationType);

                        })
                        .catch(() => {
                            displayNotification(changeNotification, "Server could not respond to the request. Change prevented.", "error");
                        });
    
                } else {
                    await axios.put("/api/v1/computer_components/edit/" + insertedComponent.productID,
                        {
                            productID: insertedComponent.productID,
                            manufacturer: insertedComponent.manufacturer,
                            productName: insertedComponent.productName,
                            category: insertedComponent.category,
                            price: insertedComponent.price,
                            releaseDate: newDate,
                            quantity: insertedComponent.quantity,
                        }).then(() => {
                            changeData([...DataList]);
                            displayNotification(changeNotification, notificationText, notificationType);

                        })
                        .catch(() => {
                            displayNotification(changeNotification, "Server could not respond to the request. Change prevented.", "error");
                        });
    
                }
            }


        }else{
            notificationText = dataValidation;
            displayNotification(changeNotification, notificationText, notificationType);
        }
    }

    return <ThemeProvider theme={ButtonTheme}><Button variant="contained" color="buttonGreen" onClick={() => saveClicked(props.InputData)} className="InsertButton"><AppRegistrationIcon />SAVE</Button></ThemeProvider>;
}

export default SaveButton;