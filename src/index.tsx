import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from "react-router-dom";
import { Box, Typography } from "./molecules";
import styled from "styled-components";

const PageLink = styled(Link)`
    display: flex;
    text-decoration: none;
    color: #000;
    width: 369px;
    height: 165px;
    border-radius: 25px;
    border: 1px solid #00000026;
    margin-bottom: 24px;
    align-items: center;
    justify-content: center;
`
const Root = () => (
    <Box flexDirection='column'
        alignItems='center'
        justifyContent='center' mt='24px'>
        <PageLink to="/page-one"><Typography fontSize="36px" lineHeight="42.19px">Page One</Typography></PageLink>
        <PageLink to="/page-two"><Typography fontSize="36px" lineHeight="42.19px">Page Two</Typography></PageLink>
        <PageLink to="/page-three"><Typography fontSize="36px" lineHeight="42.19px">Page Three</Typography></PageLink>
    </Box>
);

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Root />
                </Route>
                <Route path="/:id">
                    <App />
                </Route>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
