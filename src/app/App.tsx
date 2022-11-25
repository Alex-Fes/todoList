import React from 'react';
import './App.css';
import {AppBar, Box, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@material-ui/icons";
import {ErrorSnackBar} from "../Components/ErrorSnackBar/ErrorSnackBar";
import {TodolistsList} from "../features/TodolistList/TodolistList";
import {useAppSelector} from "./hooks/hooks";



function App() {
    const status = useAppSelector(state => state.app.status)
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
                {status ==='loading' && <LinearProgress />}
                <ErrorSnackBar/>
            </AppBar>
            <Container fixed>
                <TodolistsList/>
            </Container>

        </div>
    );
}

export default App;
