import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
    components:{
        MuiTypography:{
            styleOverrides:{
                root:{
                    fontFamily:"Futura"
          }
      }
  },
        MuiAppBar:{
            styleOverrides:{
                root:{
                    boxShadow:"none"
                }
            }
        }
    }

});
