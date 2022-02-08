import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {styled} from "@mui/system";
import rick_morty from "../Rick_and_Morty.svg";
import {IconButton} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import {Link} from "react-router-dom";

const StyledAppBar = styled(AppBar)({
    background: "#7d45c0",
});
export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <StyledAppBar position="static">
                <Toolbar style={{justifyContent:"space-between"}}>
                    <Link
                        to={"/"}
                        style={{
                            color: "inherit",
                            textDecoration: "inherit",
                        }}
                    ><img src={rick_morty}  alt="rick" style={{width:190}}/>
                    </Link>
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