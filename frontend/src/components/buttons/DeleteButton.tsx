import '../../styles/button_styles.css';
import React from 'react';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Button from '@mui/material/Button';
import ButtonTheme from '../../styles/InputElementsThemes.tsx';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { NotificationBoxContext } from '../../pages/AdminPage.tsx';
import { displayNotification } from '../DisplayNotification.tsx';
import DeleteElement from '../../services/DataOperations.tsx';
import { DataContext } from '../../App.tsx';
import axios from 'axios';

interface ButtonProps {
    element_id: number;
}
function DeleteButton(props: ButtonProps) {
    const { changeNotification } = React.useContext(NotificationBoxContext);
    const { DataList, changeData } = React.useContext(DataContext);

    const [open, setOpen] = React.useState(false);

    function handleClose(identifier: number, option: number) {
        setOpen(false);

        if (option === 0)
            return;

        async function modifyData() {
            await axios.post("/api/v1/computer_components/delete/" + identifier);
            changeData(arrayAfterDeletion);
        }
        
        const arrayAfterDeletion = DeleteElement(DataList, identifier);
        if (arrayAfterDeletion.length < DataList.length) {
            modifyData();
            displayNotification(changeNotification, "Entry with ID " + identifier + " has been successfully deleted.", "success");
        }
    }

    const deleteClicked = () => {
        setOpen(true);
    }

    return (<ThemeProvider theme={ButtonTheme}><Button variant="contained" color="buttonRed"
        onClick={(event) => { deleteClicked(); event.stopPropagation(); event.preventDefault(); }}
        className="DeleteButton"><DeleteForeverIcon style={{ fontSize: "1.4em" }} />DELETE</Button>
        <DeleteDialog open={open} element_id={props.element_id} handleClose={handleClose} />
    </ThemeProvider>);
}

function DeleteDialog(props: { open: boolean, element_id: number, handleClose: (identifier: number, option: number) => void }) {
    return (
        <Dialog
            onClick={(event) => { event.stopPropagation(); event.preventDefault(); }}
            style={{ bottom: "5vh" }} open={props.open} onClose={() => props.handleClose(0, 0)}>
            <div className="DeleteDialog">
                <DialogContent>
                    <DialogContentText style={{ color: "aliceblue", fontSize: "18px" }} id="alert-dialog-description">Delete selected entry?</DialogContentText>
                </DialogContent>
                <DialogActions style={{ justifyContent: "space-evenly" }}>
                    <Button color="buttonRed" variant="contained"
                        onClick={(event) => { props.handleClose(props.element_id, 0); event.stopPropagation(); event.preventDefault(); }}
                    >No</Button>
                    <Button color="buttonGreen" variant="contained"
                        onClick={(event) => { props.handleClose(props.element_id, 1); event.stopPropagation(); event.preventDefault(); }}
                        autoFocus>Yes</Button>
                </DialogActions>
            </div>
        </Dialog>);
}
export default DeleteButton;