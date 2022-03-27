// Много неиспользуемых импортов. Не критично, но на реальных проектах приходится следить и удалять их, тк в некоторых местах за этим цепляются.
import React, {ChangeEvent, memo, ReactElement, SyntheticEvent} from "react";
import SearchIcon from "@mui/icons-material/Search";
import {useQuery} from "react-query";
import axios from "axios";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
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
    const search = useLocation().search;
    const [filters, setFilters] = React.useState<Filter>({
        status: new URLSearchParams(search).get("status") ? String(new URLSearchParams(search).get("status")) : "",
        gender: new URLSearchParams(search).get("gender") ? String(new URLSearchParams(search).get("gender")) : "",
        name: new URLSearchParams(search).get("name") ? String(new URLSearchParams(search).get("name")) : "",
    });
    const navigate = useNavigate();

    console.log(search);
    const pageQuery = new URLSearchParams(search).get("page") ? Number(new URLSearchParams(search).get("page")) : 1;

    const [page, setPage] = React.useState(pageQuery);

    const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement> | SelectChangeEvent, filterName: string) => {
        const newFilters = {...filters, [filterName]: e.target.value};
        setFilters(newFilters);
        setPage(1);
        navigate("/?" + (new URLSearchParams({...newFilters, page: String(page)}).toString()));
    };
    return (
        <Grid container>
            <ButtonAppBar/>
            <Grid container style={{justifyContent: "space-between", padding: "30px 60px 30px 60px"}}>
                <Grid item xs={3}>
                    {/* Лучше удалить закомментированный код. А то, что Formik задействовала - круто! */}
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
                                   handleChangeFilter(e, "name");
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
                                handleChangeFilter(e, "status");
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
                                handleChangeFilter(e, "gender");
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
            <CharactersCards filters={filters} pageNum={page} pageHandler={setPage}/>
        </Grid>
    );
};

export default HomePage;