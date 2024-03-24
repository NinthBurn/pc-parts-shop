import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
      buttonGreen: Palette['primary'];
      buttonBlue: Palette['primary'];
      buttonRed: Palette['primary'];
      textFieldWhite: Palette['primary'];
    }
  
    interface PaletteOptions {
      buttonGreen?: PaletteOptions['primary'];
      buttonBlue?: PaletteOptions['primary'];
      buttonRed?: PaletteOptions['primary'];
      textFieldWhite?: PaletteOptions['primary'];
    }
  }

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
      buttonGreen: true;
      buttonBlue: true;
      buttonRed: true;
    }
  }

declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    textFieldWhite: true;
  }
}

const ButtonTheme = createTheme({
    palette: {
      buttonGreen: {
        main: '#66bb6a',
        dark: '#81c784',
        contrastText: '#ffffff',
      },
  
      buttonBlue: {
        main: '#42a5f5',
        dark: '#90caf9',
        contrastText: '#ffffff',
      },

      buttonRed: {
        main: '#f44336',
        dark: '#e57373',
        contrastText: '#ffffff',
      },
    },
  });

export const TextFieldTheme = createTheme ({
  components: {
    MuiInputBase: {
        styleOverrides: {
            input: {
                color: 'white',
                borderColor: 'white',
            }
        }
    }
  },
  typography: {
    allVariants: {
        color: 'white',
        fontSize: '2vmin',
        borderColor: 'white',
    },
},
  palette: {
    textFieldWhite: {
      main: '#ffffff',
      dark: '#ffffff',
      light: '#ffffff',
      contrastText: '#ffffff',
    }
  }
})

export const AlertTheme = createTheme ({
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "filled" && {
            color: "#fff"
          })
        })
      }
    }
  },
  typography: {
    allVariants: {
        color: 'white',
    },
  },
  palette: {
    success: {
      main: "#66bb6a",
    },
    error: {
      main: "#f44336",
    },
    info: {
      main: "#42a5f5",
    },
    warning: {
      main: "#FF6A31",
    }
  }
});
  
export default ButtonTheme;