import { TextField } from '@mui/material';
import React, { useContext, useState } from 'react'
import { DataContext } from '../App';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { TextFieldTheme } from '../styles/InputElementsThemes';

function FilterField() {
	const { DataList, changeData } = useContext(DataContext);
    const [ filterText, changeFilterText ] = useState("");

    
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        changeFilterText(event.target.value);
    }

    return(
        <ThemeProvider theme={TextFieldTheme}>
            <TextField label="Filter by" variant="outlined" color="textFieldWhite" value={filterText} onChange={(event) => handleTextChange(event)}
                sx={{ 
                input: { fontSize: "1vmax", fontFamily:'Franklin Gothic Medium', color: 'white' }}} size="small"
              />
        </ThemeProvider>

    );
}

export default FilterField;