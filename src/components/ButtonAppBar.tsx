import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {styled} from "@mui/system";
// Проблема: Не совсем понятно, что название импортированной переменной - это svg в виде React-компонента
// Решение: Переименовать в PascalCase + указать, что это SVG - например RickAndMortyLogoSVG - как-то так
import rick_morty from "../Rick_and_Morty.svg";
import {IconButton} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import {Link, useNavigate} from "react-router-dom";

const StyledAppBar = styled(AppBar)({
    background: "#7d45c0",
});
// Некритично, но обычно пропуск в 1 строку между функцией и переменной при объявлении
export default function ButtonAppBar() {
    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <StyledAppBar position="static">
                <Toolbar style={{justifyContent:"space-between"}}>
                    {/* о5 же некритично, но ()=>navigate({pathname: "/" - можно опустить `{}` - по идее дефолтные настройки компилятора должны пропустить */}
                   <img src={rick_morty} onClick={()=>{navigate({pathname: "/"} );}} alt="rick" style={{width:190}}/>
                    <IconButton color="inherit">
                        <Link
                            to={"/"}
                            style={{
                                color: "inherit",
                                textDecoration: "inherit",
                            }}
                        >
                        <HomeIcon fontSize="large" />
                        </Link>
                    </IconButton>
                </Toolbar>
            </StyledAppBar>
        </Box>
    );
}