import React, {useContext, useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {
    appRoutes,
    AUTH_ROUTE,
    HOME_ROUTE,
    NOTFOUND_ROUTE,
    userRoles
} from "../utils/consts";
import {adminRoutes, authRoutes, managerRoutes, publicRoutes, workerRoutes} from "./routes";
import {StoreContext} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {user} = useContext(StoreContext)

    return (<Routes>

        {user.isAuth && authRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={Component} exact/>)}

        {user.isAuth && user.userRole === userRoles.admin && adminRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={Component} exact/>)}

        {user.isAuth && user.userRole === userRoles.manager && managerRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={Component} exact/>)}

        {user.isAuth && user.userRole === userRoles.worker && workerRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={Component} exact/>)}



        {publicRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={Component} exact/>)}

        {user.isAuth && <Route path={appRoutes.admin.ADMIN_ROUTE} element={<Navigate to={appRoutes.admin.ADMIN_USER_ROUTE} exact/>}/>}

        {user.isAuth && <Route path="/" element={<Navigate to={HOME_ROUTE}/>}/>}

        {!user.isAuth && <Route path="*" element={<Navigate to={AUTH_ROUTE}/>}/>}
        <Route path="*" element={<Navigate to={NOTFOUND_ROUTE} replace/>}/>
    </Routes>);
})

export default AppRouter;