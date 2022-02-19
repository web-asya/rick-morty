import React, {memo, ReactElement, useEffect} from "react";
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


interface Props {
    filters: Filter,
    pageNum: number,
    pageHandler: any //todo
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
    height: 270,
    width: 210,
});

export const CharactersCards = ({filters, pageNum, pageHandler}: Props): any => {
    const navigate = useNavigate();
    // const a = false;

    // useEffect(() => {
    //     // addEventListener("popstate",function(e){
    //     //     alert("yeees!");
    //     // },false);
    //     setPageNumber(1);
    //     console.log(filter.gender);
    //     navigate({pathname: "/",search:`?page=${page}&gender=${filter.gender}&status=${filter.status}`});
    // }, [filter.gender, filter.status, filter.name]);

    const {isLoading, data, isError} = useQuery<CharactersData>(
        ["getCharacters", pageNum, filters.name, filters.status, filters.gender],
        () => {
            let queryString = "";
            if (filters.status !== "" && filters.status !== "None") {
                // navigate({pathname: "/",search:`?page=${pageNum}&gender=${filter.gender}&status=${filter.status}`});
                queryString += `&status=${filters.status}`;
            }
            if (filters.gender !== "" && filters.gender !== "None") {
                // navigate({pathname: "/",search:`?page=${pageNum}&gender=${filter.gender}&status=${filter.status}`});
                queryString += `&gender=${filters.gender}`;
                // navigate({pathname: "/",search:`?page=1&gender=${filter.gender}`} );
                // if (!a){
                //     setPageNumber(1);
                //     a = true;
                //     console.log(a);
                // }

            }

            if (filters.name !== "" && filters.name !== "None" && filters.name.length >= 3) {
                queryString += `&name=${filters.name}`;

            }
            console.log(pageNum);
            return axios.get(`https://rickandmortyapi.com/api/character/?page=${pageNum}${queryString}`)
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
                            page={pageNum}
                            onChange={(e, value) => {
                                console.log(value);

                                // navigate({pathname: "/",search:`?page=${value}&gender=${filter.gender}&status=${filter.status}&name=${filter.name}`});
                                navigate({pathname: "/",search:"?" + new URLSearchParams({...filters, page: String(value)}).toString()});

                                pageHandler(value);
                            }}/>
            </Stack>
        </Grid>
    </Grid>;
    
};