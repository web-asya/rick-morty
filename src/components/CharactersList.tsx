import {Character, Episode, LocationInfo, parseIds} from "../api";
import {useQuery} from "react-query";
import axios from "axios";
import React from "react";
import {Typography} from "@mui/material";

interface Props {
    episode: Episode
}
// Лучше как-то по-другому назвать. Например LocationProps
interface Props2{
    location:LocationInfo
}

export const CharactersList = ({episode}: Props): any => {
    const characterIds = parseIds(episode.characters).join(",");
    const {isLoading, data, isError} = useQuery<Character[]>(
        "getCharactersMultiple",
        () =>
        // Корень URL'а лучше вынести в отдельную константу в каком-нибудь config.ts - например const API_URL = `https://rickandmortyapi.com/api/`
        // Зачем? Чтобы не приходилось менять его во всем проекте при потребности
            axios.get(`https://rickandmortyapi.com/api/character/${characterIds}`)
                .then((response) => response.data)
    );
    if (isLoading) return <span>Загрузка...</span>;
    if (isError) return <span>Ошибка</span>;

    const characters = data;
    // Лучше проверку условия перенести в if (isError) - будет if (isError || !characters) - исключения в компонентах лучше не выбрасывать
    // Еще не обрабатывается проверка на characters.length === 0 - под это дело тоже нужно вывести заглушку типа <span>Список пуст</span>
    if (characters === undefined) {
        throw new Error("Unexpected logic");
    }

    return characters.map((character, index) => {
        // key={index} неок - в предыдущем файле отписал ссылку на доку почему так делать не стоит
        return (
            <Typography key={index} variant="body2" color="text.secondary">{character.name}</Typography>
        );
    });
};

// Лучше не использовать именования типа CharactersList2 - как-то по-другому назови. Например LocationCharactersList или еще как-то. Названия типа CharactersList2 можно в библиотеках использовать, когда переписываешь костыльную первую версию(пример - renderer2 в Angular).
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

    // То же самое, что в предыдущем компоненте
    const characters = data;
    if (characters === undefined) {
        throw new Error("Unexpected logic");
    }
    // Убираем логи
    console.log(characters[0].name);
    // А если массив пуст?
    return characters.map((character, index) => {
        return (<Typography key={index} variant="body2" color="text.secondary">{character.name}</Typography>);
    });
};