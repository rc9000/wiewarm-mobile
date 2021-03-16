import React, { useState } from 'react';
import List from "./List.js";
import './App.css';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from "@material-ui/core/Typography";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import GeoLoc from "./GeoLoc.js";
import AppBar from "./AppBar.js";

function App() {


    const [sortBy, setSortBy] = useState("SORT_DIST");

    const onSortByChange = event => {
        console.log("changeFromBelow: ", event.target.value);
        setSortBy(event.target.value);
    };

    //https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=FDD835&secondary.color=C62828
    const themeInstance = createMuiTheme({
        palette: {
            primary: {
                main: '#fdd835',
            },
            secondary: {
                main: '#c62828',
            },
            background: {
                default: "#ffffff"
            }
        },
    });

    return (
        <React.Fragment>
            <CssBaseline />
            <ThemeProvider theme={themeInstance}>
                    <AppBar position="sticky" sortBy={sortBy} onSortByChange={onSortByChange} />
                <Container maxwidth="sm" color="primary.main" >
                    {/*
                    <Typography variant="h4" color="textSecondary">händy.wiewarm.ch</Typography>
                    */}

                    <GeoLoc sortBy={sortBy} onSortByChange={onSortByChange} />
                    <List maxitems="10" sortBy={sortBy} onSortByChange={onSortByChange} />
                </Container>
            </ThemeProvider>
        </React.Fragment>
    );

}

export default App;
