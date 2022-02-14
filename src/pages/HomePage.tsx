import React, {memo, ReactElement} from "react";
import SearchIcon from "@mui/icons-material/Search";
import {useQuery} from "react-query";
import axios from "axios";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Link, useParams} from "react-router-dom";
import {styled} from "@mui/system";
import Card from "@mui/material/Card";
import {
    FormControl,
    Grid, InputAdornment,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    SelectChangeEvent,
    Stack,
    TextField
} from "@mui/material";
import {Character, CharactersData, Info} from "../api";
import ButtonAppBar from "../components/ButtonAppBar";
import {Formik, useFormik} from "formik";
import {CharactersCards, Filter} from "../components/CharactersCards";




interface State {
    status: string;
    gender: string;
    name: string;
}
type RouteParams = {
    page: string;
};

const HomePage = (): ReactElement => {
    const [filters, setFilters] = React.useState<Filter>({
        status: "",
        gender: "",
        name: "",
    });


    return (
        <Grid container>
            <ButtonAppBar/>
            <Grid container style={{justifyContent:"space-between", padding:"30px 60px 30px 60px"}}>
                <Grid item xs={3}>
                    {/*<Formik initialValues={{ name: "" }}*/}
                    {/*        onSubmit={(values, actions) => {*/}
                    {/*            setTimeout(() => {*/}
                    {/*                alert(JSON.stringify(values, null, 2));*/}
                    {/*                actions.setSubmitting(false);*/}
                    {/*            }, 1000);*/}
                    {/*        }}*/}
                    {/*>*/}
                    {/*    {({values, handleChange, handleSubmit }) => (*/}
                    {/*        <form onSubmit={handleSubmit}>*/}
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" value={filters.name}
                               onChange={(e) => {
                                   setFilters({
                                       ...filters,
                                       name: e.target.value,
                                   });
                               }}
                               fullWidth
                               InputProps={{
                                   endAdornment: <InputAdornment position="end"><SearchIcon/></InputAdornment>,
                               }}
                    />
                    {/*        </form>)}*/}
                    {/*</Formik>*/}

                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filters.status}
                            label="Status"
                            onChange={(e) => {
                                setFilters({
                                    ...filters,
                                    status: e.target.value,
                                });
                            }}
                        >
                            <MenuItem value={"Alive"}>Alive</MenuItem>
                            <MenuItem value={"Dead"}>Dead</MenuItem>
                            <MenuItem value={"Unknown"}>Unknown</MenuItem>
                            <MenuItem value={"None"}>None</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filters.gender}
                            label="Gender"
                            onChange={(e) => {
                                setFilters({
                                    ...filters,
                                    gender: e.target.value,
                                });
                            }}
                        >
                            <MenuItem value={"Female"}>Female</MenuItem>
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Unknown"}>Unknown</MenuItem>
                            <MenuItem value={"Genderless"}>Genderless</MenuItem>
                            <MenuItem value={"None"}>None</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>

            </Grid>
            <CharactersCards filter={filters} />
        </Grid>
    );
};

export default HomePage;