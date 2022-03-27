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
// Некритично, но почему-то в ButtonAppBar.tsx используются именованные функции, а здесь arrow-функции - лучше не мешать стили объявления компонентов без видимой на то причины
export const CharactersCards = ({filters, pageNum, pageHandler}: Props): any => {
    const navigate = useNavigate();
    // Закомментированный код лучше стирать
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
            // Здесь в целом решение недостаточно обобщенное. Я бы подумал над следующим
            /**
             * 1)Заместо проверки каждого из 3-х полей по отдельности(status, gender, name) использовать for..in loop - например
             * for (let key in filters)
             * Подумай, как можно это реализовать
             * 2)Некритично, но заместо filters.status !== "" и тому подобных, использовать неявные преобразования
             * if (filters[key] && filters[key] !== "None") - это то же самое, что if (Boolean(filters[key]) && filters[key] !== "None") - при этом обработается проверка на пустую строку.
             * 3)Если реализовать предыдущие пункты, то переменная queryString не нужна
             */
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
            // Не забывай вырезать логи в рабочем проекте - некритично, но в реальной работе лучше за этим следить
            console.log(pageNum);
            return axios.get(`https://rickandmortyapi.com/api/character/?page=${pageNum}${queryString}`)
                .then((response) => response.data);

        }
    );

    if (isLoading) return <span>Загрузка</span>;
    if (isError) return <span>Ошибка</span>;
    // Можно как if (!data). Так же я бы вместо выброса исключения рендерил <span>Ошибка</span>, чтобы приложение не ломалось из-за одного компонента.
    if (data === undefined) {
        throw new Error("Unexpected type");
    }
    const characters = data.results;
    const information = data.info;

    const renderCharacters = () => {
        return characters.map((character: Character, index) => {
            // Не рекомендуется использовать key={index} - если будешь показывать, как проект в портфолио докопаются. Подробности вот тут -
            // https://reactjs.org/docs/lists-and-keys.html?msclkid=6913533aadec11ec9395edf832d32555#keys
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
                                // При сдаче на код ревью не забывай удалять логи и комментарии нерабочие.
                                console.log(value);

                                // navigate({pathname: "/",search:`?page=${value}&gender=${filter.gender}&status=${filter.status}&name=${filter.name}`});
                                // В search переменную запишется `?` даже, если URLSearchParams выражение вернет пустую строку. Если строка никогда не будет пустой, то можно закрыть глаза
                                navigate({pathname: "/",search:"?" + new URLSearchParams({...filters, page: String(value)}).toString()});

                                pageHandler(value);
                            }}/>
            </Stack>
        </Grid>
    </Grid>;
    
};