import React, {useContext, useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {ADMIN_ROUTE, ADMIN_USER_ROUTE, AUTH_ROUTE, HOME_ROUTE, NOTFOUND_ROUTE} from "../utils/consts";
import {authRoutes, publicRoutes} from "./routes";
import {StoreContext} from "../index";
import {observer} from "mobx-react-lite";
import AdminPage from "../pages/AdminPage/AdminPage";

const AppRouter = observer(() => {
    const {user} = useContext(StoreContext)

    return (<Routes>

        {user.isAuth && authRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={Component} exact/>)}

        {publicRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={Component} exact/>)}

        {user.isAuth && <Route path={ADMIN_ROUTE} element={<Navigate to={ADMIN_USER_ROUTE} exact/>}/>}

        {user.isAuth && <Route path="/" element={<Navigate to={HOME_ROUTE}/>}/>}

        {!user.isAuth && <Route path="*" element={<Navigate to={AUTH_ROUTE}/>}/>}
        <Route path="*" element={<Navigate to={NOTFOUND_ROUTE} replace/>}/>
    </Routes>);
})

export default AppRouter;