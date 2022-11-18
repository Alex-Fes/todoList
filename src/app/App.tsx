import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@material-ui/icons";
import {ErrorSnackBar} from "../Components/ErrorSnackBar/ErrorSnackBar";
import {TodolistsList} from "../features/TodolistList/TodolistList";

function App() {
    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>
                        News
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
                <LinearProgress/>
                <ErrorSnackBar/>
            </AppBar>
            <Container fixed>
                <TodolistsList/>
            </Container>

        </div>
    );
}

export default App;
