import '.././styles/input_panel_styles.css';
import React, {useState} from 'react';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { TextFieldTheme } from '../styles/InputElementsThemes.tsx';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import SaveButton from './buttons/SaveButton.tsx';

interface InputPanelProps{
  labels: string[];
}

function InputPanel(props: InputPanelProps) {
  const [text, textChange] = useState(["", "", "", "", "", "", ""]);
    InputTextChanged = (oldText: string[], newText: string, index: number) => {
      const t = oldText.map((x) => x);
      t[index] = newText;
      textChange(t);
    }
  
    return (
      <Box className="InputBoxPanel" sx={{width: "40%"}}>
        <Box sx={{borderColor: 'black', borderWidth: '59px'}}>
        <Stack sx={{width: "100%", height: "100%", alignSelf:"center", rowGap:"3px", justifyContent:"center"}}>
          {props.labels.map((value, key) => {
            const index = key;
            
            return (
              <StackItem key={key}>
                  <ThemeProvider theme={TextFieldTheme}><TextField className="InputEntryBox" color="textFieldWhite"
                  sx={{
                  input: { fontSize: "1vmax", fontFamily:'Franklin Gothic Medium', color: 'white' }}} size="small" label={value} 
                  variant="filled" value={text[index]} onChange={e => InputTextChanged(text, e.target.value, index)}/>
                  </ThemeProvider>
              </StackItem>
          )})}

          <br/>
          <StackItem >
          <SaveButton InputData={text}/>
          </StackItem>
          
          </Stack>
        </Box></Box>
    );
}

export let InputTextChanged: (oldText: string[], newText: string, index: number) => void;

const StackItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'theme.palette.text.secondary',
  boxShadow: "none"
}));

export default InputPanel;