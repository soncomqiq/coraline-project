import React from 'react';
import { Route, Switch } from "react-router-dom";
import allowRoute from "../config/route";
import Navbar from './Navbar';

function PrivateRoutes(props) {
    const { setIsLogin, isLogin } = props;
    let role = isLogin ? "user" : "guest";

    return (
        <>
            {role === "user" ? <Navbar setIsLogin={setIsLogin} /> : null}
            <Switch>
                {allowRoute[role].map(({ path, component: CP }) => <Route key={path} exact path={path}><CP setIsLogin={setIsLogin} /></Route>)}
            </Switch>
        </>
    );
}

export default PrivateRoutes;
