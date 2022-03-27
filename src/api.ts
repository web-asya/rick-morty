export interface Info {
    count: number;
    pages: number;
    next: string;
    prev?: any;
}

export interface Origin {
    name: string;
    url: string;
}

export interface Location {
    name: string;
    url: string;
}

export interface LocationInfo {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: string;
    created: Date;
}

export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: Date;
}

export interface CharactersData {
    info: Info;
    results: Character[];
}

export interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[],
    url: string;
    created: string;
}


export const parseIds = (apiUrls: string[]) => {
    // Не критично, но можно проще - apiUrls.map(parseId);
    return apiUrls.map((url: string) => {
        return parseId(url);
    });
};

export const parseId = (apiUrl: string) => {
    // Очень изящно. Круто!
    return apiUrl.split("/").pop();
};
