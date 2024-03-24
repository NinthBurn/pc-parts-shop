import React, { ReactElement } from 'react'
import Alert from '@mui/material/Alert';
import { AlertTheme } from '../styles/InputElementsThemes';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

let timeout: null | ReturnType<typeof setTimeout> = null;

export function displayNotification(changeNotification: React.Dispatch<React.SetStateAction<ReactElement>>, alertMessage: string, alertType: string) {

  let alert = (
  <ThemeProvider theme={AlertTheme}>
  <Alert className="AlertNotification" variant="filled" severity={alertType === "success" ? "success" : alertType === "error" ? "error" : alertType === "info" ? "info" : "warning"}>
    {alertMessage}
  </Alert>
  </ThemeProvider>);

  if (timeout != null) {
    changeNotification(<></>)
    clearTimeout(timeout);

    // this is stupid but I have to do it
    // there is probably a better way to do this
    setTimeout(() => { changeNotification(alert) }, 10);

    timeout = setTimeout(() => { changeNotification(<></>) }, 7000);

  } else {
    timeout = setTimeout(() => { changeNotification(<></>) }, 7000);
    changeNotification(alert);
  }

  return;
}
