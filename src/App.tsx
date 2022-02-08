import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CssBaseline} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import {theme} from "./theme";
import React from "react";
import CharacterPage from "./pages/CharacterPage";
import {QueryClient, QueryClientProvider} from "react-query";
import HomePage from "./pages/HomePage";
import EpisodePage from "./pages/EpisodePage";
import LocationPage from "./pages/LocationPage";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppOwnProps {}

const queryClient = new QueryClient();
const routes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/characters/:characterId" element={<CharacterPage/>} />
            <Route path="/episodes/:episodeId" element={<EpisodePage/>} />
            <Route path="/locations/:locationId" element={<LocationPage/>} />
        </Routes>
    );
};
    export const App: React.FC<AppOwnProps> = () => {
        return (
            <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>{routes()}</BrowserRouter>
            </ThemeProvider>
            </QueryClientProvider>
        );
    };