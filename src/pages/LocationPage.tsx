import React, {ReactElement} from "react";
import {Grid} from "@mui/material";
import {styled} from "@mui/system";
import Typography from "@mui/material/Typography";
import {useQuery} from "react-query";
import axios from "axios";
import {useParams} from "react-router-dom";
import {LocationInfo} from "../api";
import {CharactersList2} from "../components/CharactersList";
import ButtonAppBar from "../components/ButtonAppBar";


type RouteParams = {
    locationId: string;
};

const LocationCard = styled(Grid)({
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




const LocationPage = (): ReactElement => {

    const {locationId} = useParams<RouteParams>();
    const {isLoading, data, isError} = useQuery<LocationInfo>(
        "getLocation",
        () =>
            axios.get(`https://rickandmortyapi.com/api/location/${locationId}`)
                .then((response) => response.data)
    );
    if (isLoading) return <span>Загрузка...</span>;
    if (isError) return <span>Ошибка</span>;
    const location = data;
    console.log(location);
    if (location === undefined) {
        throw new Error("Unexpected logic");
    }

    const renderLocation = () => {
        const date = new Date(location.created);
        const dt = date.toLocaleDateString("RU-ru");
        return (
            <LocationCard sx={{maxWidth: 1000}}>
                <Typography gutterBottom variant="h5" component="div">
                    {location.name}
                </Typography>
                <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                        <span style={{fontWeight:700}}>Type: </span>
                        {location.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <span style={{fontWeight:700}}>Created: </span>
                            {dt}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <span style={{fontWeight:700}}>Dimension: </span>
                        {location.dimension}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{fontWeight:700}}>
                        Residents:
                        </Typography>
                    <Grid item style={{columnCount:4}}><CharactersList2 location={location}/></Grid>
                </Grid>
            </LocationCard>
        );
    };



    return (
        <Grid container>
            <ButtonAppBar/>
        <Grid container style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            {renderLocation()}
        </Grid>
        </Grid>
    );
};



export default LocationPage;
