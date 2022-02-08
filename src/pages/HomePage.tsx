import React, {ReactElement} from "react";
import {useQuery} from "react-query";
import axios from "axios";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import {styled} from "@mui/system";
import Card from "@mui/material/Card";
import {Grid, Pagination, Stack} from "@mui/material";
import {Character, CharactersData} from "../api";
import ButtonAppBar from "../components/ButtonAppBar";


const CharacterCard = styled(Card)({
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


const HomePage = (): ReactElement => {
    const [page, setPage] = React.useState(1);
    const {isLoading, data, isError} = useQuery<CharactersData>(
        ["getCharacters", page],
        () =>
            axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
                .then((response) => response.data)
    );
    console.log(page);
    if (isLoading) return <span>Загрузка...</span>;
    if (isError) return <span>Ошибка</span>;

    const renderCharacter = () => {
        const characters = data ? data.results : [];
        return characters.map((character: Character, index) => {
            return (
                <Grid item key={index}>
                    <Link
                        to={`/characters/${character.id}`}
                        key={index}
                        style={{
                            color: "inherit",
                            textDecoration: "inherit",
                        }}
                    >
                        <CharacterCard key={index}>
                            <CardMedia
                                component="img"
                                image={character.image}
                                alt="green iguana"
                            />
                            <CardContent style={{padding: 0, marginTop: 10,}}>
                                <Typography gutterBottom component="div" style={{fontSize: 14, display: "flex", justifyContent: "center",}}>
                                    {character.name}
                                </Typography>
                            </CardContent>
                        </CharacterCard>
                    </Link>
                </Grid>
            );
        });
    };

    return (
        <Grid container>
        <ButtonAppBar/>
            <Grid container style={{display: "flex", flexWrap: "wrap", justifyContent: "center", background:"#ffffff"}}>
                {renderCharacter()}
                <Grid item sm={12} style={{display:"flex", justifyContent:"center"}}>
                <Stack spacing={2} style={{marginBottom:25}}>
                    <Pagination count={42}
                                color="secondary"
                                variant="outlined"
                                page={page}
                                onChange={(e,value) => {
                        setPage(value);
                    }}/>
                </Stack>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default HomePage;