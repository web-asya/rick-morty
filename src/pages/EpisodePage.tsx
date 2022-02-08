import React, {ReactElement} from "react";
import {Grid} from "@mui/material";
import {styled} from "@mui/system";
import Typography from "@mui/material/Typography";
import {useQuery} from "react-query";
import axios from "axios";
import {Episode} from "../api";
import {useParams} from "react-router-dom";
import {CharactersList} from "../components/CharactersList";
import ButtonAppBar from "../components/ButtonAppBar";

type RouteParams = {
    episodeId: string;
};

const EpisodeCard = styled(Grid)({
    padding: 8,
    borderRadius: 8,
    background: "#e8d2ff",
    margin: 20,
    boxShadow: "none",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    width: "100%"

});




const EpisodePage = (): ReactElement=> {
    const {episodeId} = useParams<RouteParams>();
    const {isLoading, data, isError} = useQuery<Episode>(
        "getEpisode",
        () =>
            axios.get(`https://rickandmortyapi.com/api/episode/${episodeId}`)
                .then((response) => response.data)
    );
    if (isLoading) return <span>Загрузка...</span>;
    if (isError) return <span>Ошибка</span>;
    const episode = data;

    if (episode === undefined) {
        throw new Error("Unexpected logic");
    }



    const renderEpisode = () => {
        const date = new Date(episode.created);
        const dt = date.toLocaleDateString("RU-ru");

        return (
            <EpisodeCard sx={{maxWidth: 700}}>
                <Typography gutterBottom variant="h5" component="div">
                    {episode.name}
                </Typography>
                <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                        <span style={{fontWeight:700}}>Air date: </span>
                            {episode.air_date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <span style={{fontWeight:700}}>Code: </span>
                            {episode.episode}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <span style={{fontWeight:700}}>Created: </span>
                        {dt}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{fontWeight:700}}>
                        Characters:
                    </Typography>
                    <Grid item style={{columnCount:4}}><CharactersList episode={episode}/></Grid>
                </Grid>

            </EpisodeCard>
        );
    };



    return (
        <Grid container>
            <ButtonAppBar/>
        <Grid container style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            {renderEpisode()}
        </Grid>
        </Grid>
    );
};



export default EpisodePage;
