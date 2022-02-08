import React, {ReactElement} from "react";
import {Card, CardContent, Grid} from "@mui/material";
import {styled} from "@mui/system";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {useQuery} from "react-query";
import axios from "axios";
import {Character, parseId} from "../api";
import {Link, useParams} from "react-router-dom";
import ButtonAppBar from "../components/ButtonAppBar";

type RouteParams = {
    characterId: string;
};

const CharacterCard = styled(Card)({
    padding: 20,
    borderRadius: 10,
    background: "#e8d2ff",
    margin: 20,
    boxShadow: "none",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    width:"100%"

});


const CharacterPage = (): ReactElement => {
    const {characterId} = useParams<RouteParams>();
    const {isLoading, data, isError} = useQuery<Character>(
        "getCharacter",
        () =>
            axios.get(`https://rickandmortyapi.com/api/character/${characterId}`)
                .then((response) => response.data)
    );
    if (isLoading) return <span>Загрузка...</span>;
    if (isError) return <span>Ошибка</span>;
    const character = data;

    if (character === undefined) {
        throw new Error("Unexpected logic");
    }

    const renderEpisodes = () => {
        return character.episode.map((episodeApiUrl:string,index)=>{
            const episodeId = parseId(episodeApiUrl);
            return (
                <Link
            to={`/episodes/${episodeId}`}
            key={index}
            style={{

                    textDecoration: "inherit",
            }}
        >
                    {episodeId}, {" "}
                </Link>
            );
        });
    };

    const renderLocations = (character:Character) => {

            const locationId = parseId(character.location.url);
            if (character.location.name === "unknown"){
                return character.location.name;
            }
            return (
                <Link
                    to={`/locations/${locationId}`}
                    style={{

                        textDecoration: "inherit",
                    }}
                >
                    {character.location.name}
                </Link>
            );

    };
    const renderCharacterType=()=>{
       return character.type === ""
           ? ""
           : <Typography variant="body2" color="text.secondary" >Type: {character.type}</Typography>;
    };
    const renderCharacter = () => {
        const date = new Date(character.created);
        const dt = date.toLocaleDateString("RU-ru");
        return (
            <CharacterCard sx={{maxWidth: 700}}>
                <CardMedia
                    component="img"
                    image={character.image}
                    style={{width:300, height:300}}
                    alt="green iguana"
                />
                <Grid item xs={12} >
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {character.name}
                        </Typography>
                    <Typography variant="body2" color="text.secondary" >
                        <span style={{fontWeight:700}}>Status: </span>
                        {character.status}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                        <span style={{fontWeight:700}}>Species: </span>
                            {character.species}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                        <span style={{fontWeight:700}}>Gender: </span>
                            {character.gender}
                    </Typography>
                        {renderCharacterType()}
                    <Typography variant="body2" color="text.secondary" >
                        <span style={{fontWeight:700}}>Origin location: </span>
                            {character.origin.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                        <span style={{fontWeight:700}}>Last known location: </span>
                            {renderLocations(character)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                        <span style={{fontWeight:700}}>Episodes: </span>
                            {renderEpisodes()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                        <span style={{fontWeight:700}}>Created: </span>
                            {dt}
                    </Typography>
                    </CardContent>
                </Grid>

            </CharacterCard>
        );
    };

    return (
        <Grid container>
            <ButtonAppBar/>
            <Grid container sm={12} style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                {renderCharacter()}
            </Grid>
        </Grid>
    );
};
export default CharacterPage;
