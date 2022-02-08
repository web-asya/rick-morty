import {Character, Episode, LocationInfo, parseIds} from "../api";
import {useQuery} from "react-query";
import axios from "axios";
import React from "react";
import {Typography} from "@mui/material";

interface Props {
    episode: Episode
}

interface Props2{
    location:LocationInfo
}

export const CharactersList = ({episode}: Props): any => {
    const characterIds = parseIds(episode.characters).join(",");
    const {isLoading, data, isError} = useQuery<Character[]>(
        "getCharactersMultiple",
        () =>
            axios.get(`https://rickandmortyapi.com/api/character/${characterIds}`)
                .then((response) => response.data)
    );
    if (isLoading) return <span>Загрузка...</span>;
    if (isError) return <span>Ошибка</span>;

    const characters = data;
    if (characters === undefined) {
        throw new Error("Unexpected logic");
    }

    return characters.map((character, index) => {
        return (
            <Typography key={index} variant="body2" color="text.secondary">{character.name}</Typography>
        );
    });
};

export const CharactersList2 = ({location}: Props2): any => {
    const characterIds = parseIds(location.residents).join(",");
    const {isLoading, data, isError} = useQuery<Character[]>(
        "getCharactersMultiple",
        () =>
            axios.get(`https://rickandmortyapi.com/api/character/${characterIds}`)
                .then((response) => response.data)
    );
    if (isLoading) return <span>Загрузка...</span>;
    if (isError) return <span>Ошибка</span>;

    const characters = data;
    if (characters === undefined) {
        throw new Error("Unexpected logic");
    }
    console.log(characters[0].name);
    return characters.map((character, index) => {
        return (<Typography key={index} variant="body2" color="text.secondary">{character.name}</Typography>);
    });
};