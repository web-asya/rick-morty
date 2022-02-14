import React, {memo, ReactElement} from "react";
import {useQuery} from "react-query";
import axios from "axios";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {BrowserRouter, Link, useLocation, useParams, useSearchParams} from "react-router-dom";
import {styled} from "@mui/system";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import {
    FormControl,
    Grid,
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

interface Props {
    filter: Filter
}

export interface Filter {
    status: string;
    gender: string;
    name: string;
}
type RouteParams = {
    page: string;
};
const CharacterCard = styled(Card)({ //todo
    padding: 8,
    borderRadius: 8,
    background: "#e8d2ff",
    margin: 20,
    boxShadow: "none",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    height: 250,
    width: 200,
});

export const CharactersCards = ({filter}: Props): any => {
    const search = useLocation().search;
    const page = new URLSearchParams(search).get("page");

    const [pageNumber, setPageNumber] = React.useState(Number(page));
    const navigate = useNavigate();
    const {isLoading, data, isError} = useQuery<CharactersData>(
        ["getCharacters", pageNumber, filter.name, filter.status, filter.gender],
        () => {
            let queryString = "";
            if (filter.status !== "" && filter.status !== "None") {
                queryString += `&status=${filter.status}`;
            }

            if (filter.gender !== "" && filter.gender !== "None") {
                queryString += `&gender=${filter.gender}`;
            }

            if (filter.name !== "" && filter.name.length >= 3) {
                queryString += `&name=${filter.name}`;
            }

            console.log(queryString);

            return axios.get(`https://rickandmortyapi.com/api/character/?page=${pageNumber}${queryString}`)
                .then((response) => response.data);

        }
    );

    if (isLoading) return <span>Загрузка</span>;
    if (isError) return <span>Ошибка</span>;
    if (data === undefined) {
        throw new Error("Unexpected type");
    }
    const characters = data.results;
    const information = data.info;

    const renderCharacters = () => {
        return characters.map((character: Character, index) => {
            return (
                <Grid item key={index} onClick={() => navigate(`/characters/${character.id}`)}>
                    {/*<Link*/}
                    {/*    to={`/characters/${character.id}`}*/}
                    {/*    key={index}*/}
                    {/*    style={{*/}
                    {/*        color: "inherit",*/}
                    {/*        textDecoration: "inherit",*/}
                    {/*    }}*/}
                    {/*>*/}
                        <CharacterCard key={index}>
                            <CardMedia
                                component="img"
                                image={character.image}
                                alt="green iguana"
                            />
                            <CardContent style={{padding: 0, marginTop: 10,}}>
                                <Typography gutterBottom component="div"
                                            style={{fontSize: 14, display: "flex", justifyContent: "center",}}>
                                    {character.name}
                                </Typography>
                            </CardContent>
                        </CharacterCard>
                    {/*</Link>*/}
                </Grid>
            );
        });
    };


    return <Grid container
                 style={{display: "flex", flexWrap: "wrap", justifyContent: "center", background: "#ffffff"}}>
        {renderCharacters()}
        <Grid item sm={12} style={{display: "flex", justifyContent: "center"}}>
            <Stack spacing={2} style={{marginBottom: 25}}>
                <Pagination count={information.pages}
                            color="secondary"
                            variant="outlined"
                            page={pageNumber}
                            onChange={(e, value) => {
                                navigate({pathname: "/",search:`?page=${value}`});
                                setPageNumber(value);
                            }}/>
            </Stack>
        </Grid>
    </Grid>;
    
};