import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {AUTH_ROUTE, NOTFOUND_ROUTE} from "../utils/consts";
import {routes} from "./routes";

function AppRouter(props) {
    // const {showPreloader} = usePreloader()
    // useEffect(() => {
    //     showPreloader()
    // }, [])
    return (
        <Routes>
            {routes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component} exact/>
            )}
            <Route path="*" element={<Navigate to={NOTFOUND_ROUTE} replace/>}/>
        </Routes>
    );
}

export default AppRouter;